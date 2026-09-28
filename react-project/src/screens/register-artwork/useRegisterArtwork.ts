import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as Linking from 'expo-linking';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { BackHandler } from 'react-native';

import { Artwork } from '@/@types/artwork';
import { useAuth } from '@/contexts/AuthContext';
import { deletePhotoFile, saveArtwork } from '@/integration/artworkIntegration';
import { formatAddress } from '@/utils/format';

import {
    ArtworkFormErrors,
    CapturedPhoto,
    LocationState,
    PermissionIssue,
    RegisterArtworkStep,
} from './types';

export const TITLE_MIN_LENGTH = 3;
export const TITLE_MAX_LENGTH = 60;
export const DESCRIPTION_MAX_LENGTH = 280;

const LOCATION_TIMEOUT_MS = 15000;
const LAST_KNOWN_MAX_AGE_MS = 2 * 60 * 1000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('timeout')), ms);
        promise.then(
            (value) => {
                clearTimeout(timer);
                resolve(value);
            },
            (error) => {
                clearTimeout(timer);
                reject(error);
            },
        );
    });
}

export function useRegisterArtwork() {
    const router = useRouter();
    const { auth } = useAuth();
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();

    const cameraRef = useRef<CameraView>(null);
    const [step, setStep] = useState<RegisterArtworkStep>('intro');
    const [cameraIssue, setCameraIssue] = useState<PermissionIssue | null>(null);
    const [cameraError, setCameraError] = useState('');
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [isCapturing, setIsCapturing] = useState(false);
    const [facing, setFacing] = useState<CameraType>('back');
    const [photo, setPhoto] = useState<CapturedPhoto | null>(null);

    const [location, setLocation] = useState<LocationState>({ status: 'idle' });
    const [title, setTitleValue] = useState('');
    const [description, setDescriptionValue] = useState('');
    const [fieldErrors, setFieldErrors] = useState<ArtworkFormErrors>({});
    const [saveError, setSaveError] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [savedArtwork, setSavedArtwork] = useState<Artwork | null>(null);

    // Foto tirada e ainda não salva: é apagada do cache se o usuário desistir.
    const pendingPhotoRef = useRef<string | null>(null);
    // Ignora respostas de GPS antigas quando o usuário pede de novo.
    const locationRequestRef = useRef(0);

    useEffect(() => {
        return () => {
            if (pendingPhotoRef.current) {
                deletePhotoFile(pendingPhotoRef.current);
            }
        };
    }, []);

    function discardPhoto() {
        if (pendingPhotoRef.current) {
            deletePhotoFile(pendingPhotoRef.current);
            pendingPhotoRef.current = null;
        }
        setPhoto(null);
    }

    // ---------- Câmera ----------

    async function openCamera() {
        setCameraIssue(null);
        setCameraError('');

        let permission = cameraPermission;

        if (!permission?.granted) {
            permission = await requestCameraPermission();
        }

        if (permission.granted) {
            setIsCameraReady(false);
            setStep('camera');
            return;
        }

        setCameraIssue(permission.canAskAgain ? 'denied' : 'blocked');
    }

    function openAppSettings() {
        Linking.openSettings().catch(() => {});
    }

    function openLocationSettings() {
        Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS').catch(openAppSettings);
    }

    function closeCamera() {
        setCameraError('');
        setStep(photo ? 'preview' : 'intro');
    }

    function toggleFacing() {
        setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
    }

    function handleCameraMountError() {
        setCameraError('Não foi possível iniciar a câmera. Feche e tente de novo.');
    }

    async function takePicture() {
        if (!cameraRef.current || !isCameraReady || isCapturing) {
            return;
        }

        setIsCapturing(true);
        setCameraError('');

        try {
            const picture = await cameraRef.current.takePictureAsync({ quality: 0.7 });

            // Refazendo: a foto anterior não serve mais.
            discardPhoto();
            pendingPhotoRef.current = picture.uri;
            setPhoto({ uri: picture.uri, width: picture.width, height: picture.height });
            setStep('preview');
        } catch {
            setCameraError('Não foi possível tirar a foto. Tente novamente.');
        } finally {
            setIsCapturing(false);
        }
    }

    function retakePhoto() {
        setIsCameraReady(false);
        setCameraError('');
        setStep('camera');
    }

    function confirmPhoto() {
        setStep('details');

        if (location.status !== 'ready') {
            fetchLocation();
        }
    }

    // ---------- Localização ----------

    async function fetchLocation() {
        const requestId = ++locationRequestRef.current;
        const update = (next: LocationState) => {
            if (requestId === locationRequestRef.current) {
                setLocation(next);
            }
        };

        update({ status: 'loading' });

        try {
            const permission = await Location.requestForegroundPermissionsAsync();

            if (!permission.granted) {
                const blocked = !permission.canAskAgain;
                update({
                    status: 'error',
                    reason: blocked ? 'blocked' : 'denied',
                    message: blocked
                        ? 'O acesso à localização está bloqueado. Libere nas configurações do aparelho para marcar a obra no mapa.'
                        : 'Precisamos da sua localização para marcar a obra no mapa.',
                });
                return;
            }

            if (!(await Location.hasServicesEnabledAsync())) {
                update({
                    status: 'error',
                    reason: 'services-off',
                    message: 'A localização (GPS) do aparelho está desligada. Ative e tente de novo.',
                });
                return;
            }

            // Em lugares fechados o GPS pode demorar: depois do tempo limite,
            // usa a última posição conhecida (se for recente).
            const position =
                (await withTimeout(
                    Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High }),
                    LOCATION_TIMEOUT_MS,
                ).catch(() => null)) ??
                (await Location.getLastKnownPositionAsync({ maxAge: LAST_KNOWN_MAX_AGE_MS }));

            if (!position) {
                throw new Error('Sem posição');
            }

            const coords = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            };

            update({ status: 'ready', coords, address: null });

            // O endereço é um extra: se a geocodificação falhar, fica só a coordenada.
            Location.reverseGeocodeAsync(coords)
                .then((results) => {
                    const address = formatAddress(results[0]);
                    if (address) {
                        update({ status: 'ready', coords, address });
                    }
                })
                .catch(() => {});
        } catch {
            update({
                status: 'error',
                reason: 'unavailable',
                message: 'Não conseguimos obter sua localização agora. Vá para um lugar aberto e tente de novo.',
            });
        }
    }

    // ---------- Formulário ----------

    function setTitle(value: string) {
        setTitleValue(value);
        setSaveError('');
        setFieldErrors((prev) => ({ ...prev, title: undefined }));
    }

    function setDescription(value: string) {
        setDescriptionValue(value);
        setSaveError('');
        setFieldErrors((prev) => ({ ...prev, description: undefined }));
    }

    function validate(): ArtworkFormErrors {
        const errors: ArtworkFormErrors = {};
        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
            errors.title = 'Dê um título para a obra.';
        } else if (trimmedTitle.length < TITLE_MIN_LENGTH) {
            errors.title = `O título deve ter pelo menos ${TITLE_MIN_LENGTH} caracteres.`;
        } else if (trimmedTitle.length > TITLE_MAX_LENGTH) {
            errors.title = `O título deve ter no máximo ${TITLE_MAX_LENGTH} caracteres.`;
        }

        if (description.trim().length > DESCRIPTION_MAX_LENGTH) {
            errors.description = `A descrição deve ter no máximo ${DESCRIPTION_MAX_LENGTH} caracteres.`;
        }

        return errors;
    }

    async function handleSave() {
        if (isSaving || !photo || !auth) {
            return;
        }

        setSaveError('');

        const errors = validate();
        setFieldErrors(errors);

        if (errors.title || errors.description) {
            return;
        }

        if (location.status !== 'ready') {
            setSaveError('Precisamos da localização para colocar a obra no mapa.');
            return;
        }

        setIsSaving(true);

        try {
            const artwork = await saveArtwork({
                userId: auth.userId,
                username: auth.username,
                title: title.trim(),
                description: description.trim(),
                tempPhotoUri: photo.uri,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                address: location.address,
            });

            // A foto agora pertence à obra: não apagar ao sair da tela.
            pendingPhotoRef.current = null;
            setSavedArtwork(artwork);
        } catch {
            setSaveError('Não foi possível salvar a obra no aparelho. Tente novamente.');
        } finally {
            setIsSaving(false);
        }
    }

    function handleSuccessConfirm() {
        const id = savedArtwork?.id;
        setSavedArtwork(null);
        router.replace(id ? `/map?focus=${id}` : '/map');
    }

    // Voltar do Android anda um passo para trás no fluxo.
    useEffect(() => {
        if (step === 'intro') {
            return;
        }

        const sub = BackHandler.addEventListener('hardwareBackPress', () => {
            if (step === 'camera') {
                closeCamera();
            } else if (step === 'preview') {
                discardPhoto();
                setStep('intro');
            } else if (step === 'details') {
                setStep('preview');
            }
            return true;
        });

        return () => sub.remove();
    }, [step, photo]);

    return {
        auth,
        step,
        setStep,

        cameraRef,
        cameraIssue,
        cameraError,
        isCameraReady,
        setIsCameraReady,
        isCapturing,
        facing,
        photo,
        openCamera,
        openAppSettings,
        openLocationSettings,
        closeCamera,
        toggleFacing,
        handleCameraMountError,
        takePicture,
        retakePhoto,
        confirmPhoto,
        discardPhoto,

        location,
        fetchLocation,

        title,
        setTitle,
        description,
        setDescription,
        fieldErrors,
        saveError,
        isSaving,
        savedArtwork,
        handleSave,
        handleSuccessConfirm,
    };
}
