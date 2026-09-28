import { Ionicons } from '@expo/vector-icons';
import { CameraView } from 'expo-camera';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppTopBar } from '@/components/app-top-bar';
import { Button } from '@/components/button';
import { FeedbackAlert } from '@/components/feedback-alert';
import { Input } from '@/components/input';
import { SideMenu } from '@/components/side-menu';
import { Colors } from '@/constants/colors';
import { formatCoordinates } from '@/utils/format';

import { styles } from './styles.android';
import { LocationState } from './types';
import { DESCRIPTION_MAX_LENGTH, TITLE_MAX_LENGTH, useRegisterArtwork } from './useRegisterArtwork';

const STEPS = [
    { icon: 'camera-outline' as const, title: 'Fotografe', text: 'Enquadre a obra inteira, com boa luz.' },
    { icon: 'location-outline' as const, title: 'Marque o local', text: 'Usamos o GPS para colocar a obra no mapa.' },
    { icon: 'create-outline' as const, title: 'Conte a história', text: 'Dê um título e, se quiser, uma descrição.' },
];

const LocationCard: React.FC<{
    location: LocationState;
    onRetry: () => void;
    onOpenAppSettings: () => void;
    onOpenLocationSettings: () => void;
}> = ({ location, onRetry, onOpenAppSettings, onOpenLocationSettings }) => {
    if (location.status === 'idle' || location.status === 'loading') {
        return (
            <View style={styles.locationCard}>
                <ActivityIndicator color={Colors.primaryLight} />
                <Text style={styles.locationText}>Obtendo sua localização…</Text>
            </View>
        );
    }

    if (location.status === 'ready') {
        return (
            <View style={[styles.locationCard, styles.locationCardReady]}>
                <Ionicons name="location" size={22} color={Colors.success} />
                <View style={styles.locationBody}>
                    <Text style={styles.locationTitle}>{location.address ?? 'Localização capturada'}</Text>
                    <Text style={styles.locationCoords}>
                        {formatCoordinates(location.coords.latitude, location.coords.longitude)}
                    </Text>
                </View>
                <Pressable
                    onPress={onRetry}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel="Atualizar localização"
                    style={styles.locationRefresh}>
                    <Ionicons name="refresh" size={18} color={Colors.textMuted} />
                </Pressable>
            </View>
        );
    }

    const settingsAction =
        location.reason === 'blocked'
            ? onOpenAppSettings
            : location.reason === 'services-off'
              ? onOpenLocationSettings
              : null;

    return (
        <View style={[styles.locationCard, styles.locationCardError]}>
            <Ionicons name="warning-outline" size={22} color={Colors.error} />
            <View style={styles.locationBody}>
                <Text style={styles.locationErrorText}>{location.message}</Text>
                <View style={styles.locationActions}>
                    <Pressable onPress={onRetry} hitSlop={6} accessibilityRole="button">
                        <Text style={styles.linkText}>Tentar de novo</Text>
                    </Pressable>
                    {settingsAction && (
                        <Pressable onPress={settingsAction} hitSlop={6} accessibilityRole="button">
                            <Text style={styles.linkText}>Abrir configurações</Text>
                        </Pressable>
                    )}
                </View>
            </View>
        </View>
    );
};

const RegisterArtworkAndroid: React.FC = () => {
    const vm = useRegisterArtwork();
    const insets = useSafeAreaInsets();
    const [menuOpen, setMenuOpen] = useState(false);
    const [descriptionFocused, setDescriptionFocused] = useState(false);
    const descriptionRef = useRef<TextInput>(null);

    if (!vm.auth) {
        return <Redirect href="/" />;
    }

    // ---------- Câmera (tela cheia) ----------
    if (vm.step === 'camera') {
        return (
            <>
                <Stack.Screen options={{ headerShown: false }} />
                <StatusBar style="light" />

                <View style={styles.cameraScreen}>
                    <CameraView
                        ref={vm.cameraRef}
                        style={styles.camera}
                        facing={vm.facing}
                        mode="picture"
                        animateShutter
                        onCameraReady={() => vm.setIsCameraReady(true)}
                        onMountError={vm.handleCameraMountError}
                    />

                    {/* O CameraView não aceita filhos: os controles são irmãos por cima dele. */}
                    <View style={[styles.cameraTopBar, { paddingTop: insets.top + 8 }]}>
                        <Pressable
                            onPress={vm.closeCamera}
                            hitSlop={8}
                            accessibilityRole="button"
                            accessibilityLabel="Fechar câmera"
                            style={styles.cameraIconButton}>
                            <Ionicons name="close" size={24} color={Colors.white} />
                        </Pressable>
                        <Text style={styles.cameraHint}>Enquadre a obra inteira</Text>
                        <Pressable
                            onPress={vm.toggleFacing}
                            hitSlop={8}
                            accessibilityRole="button"
                            accessibilityLabel="Trocar câmera"
                            style={styles.cameraIconButton}>
                            <Ionicons name="camera-reverse-outline" size={24} color={Colors.white} />
                        </Pressable>
                    </View>

                    {!!vm.cameraError && (
                        <View style={[styles.cameraError, { top: insets.top + 72 }]}>
                            <Text style={styles.cameraErrorText}>{vm.cameraError}</Text>
                        </View>
                    )}

                    <View style={[styles.cameraBottomBar, { paddingBottom: insets.bottom + 28 }]}>
                        <Pressable
                            onPress={vm.takePicture}
                            disabled={!vm.isCameraReady || vm.isCapturing}
                            accessibilityRole="button"
                            accessibilityLabel="Tirar foto"
                            accessibilityState={{ disabled: !vm.isCameraReady || vm.isCapturing }}
                            style={({ pressed }) => [
                                styles.shutterOuter,
                                (!vm.isCameraReady || vm.isCapturing) && styles.shutterDisabled,
                                pressed && styles.shutterPressed,
                            ]}>
                            {vm.isCapturing || !vm.isCameraReady ? (
                                <ActivityIndicator color={Colors.background} />
                            ) : (
                                <View style={styles.shutterInner} />
                            )}
                        </Pressable>
                    </View>
                </View>
            </>
        );
    }

    // ---------- Prévia ----------
    if (vm.step === 'preview' && vm.photo) {
        const aspectRatio = vm.photo.width && vm.photo.height ? vm.photo.width / vm.photo.height : 3 / 4;

        return (
            <>
                <Stack.Screen options={{ headerShown: false }} />
                <StatusBar style="light" />

                <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
                    <AppTopBar
                        title="Prévia da foto"
                        onBackPress={() => {
                            vm.discardPhoto();
                            vm.setStep('intro');
                        }}
                    />

                    <View style={styles.previewBody}>
                        <View style={styles.previewFrame}>
                            <Image
                                source={{ uri: vm.photo.uri }}
                                style={[styles.previewImage, { aspectRatio }]}
                                resizeMode="contain"
                                accessibilityLabel="Foto da obra"
                            />
                        </View>
                        <Text style={styles.previewHint}>A obra aparece inteira e nítida?</Text>
                    </View>

                    <View style={styles.actionsRow}>
                        <Button
                            title="Refazer"
                            icon="refresh"
                            variant="secondary"
                            onPress={vm.retakePhoto}
                            style={styles.actionButton}
                        />
                        <Button
                            title="Usar foto"
                            icon="checkmark"
                            onPress={vm.confirmPhoto}
                            style={styles.actionButton}
                        />
                    </View>
                </SafeAreaView>
            </>
        );
    }

    // ---------- Localização + título/descrição ----------
    if (vm.step === 'details' && vm.photo) {
        return (
            <>
                <Stack.Screen options={{ headerShown: false }} />
                <StatusBar style="light" />

                <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
                    <AppTopBar title="Sobre a obra" onBackPress={() => vm.setStep('preview')} />

                    <KeyboardAvoidingView style={styles.flex} behavior="padding">
                        <ScrollView
                            contentContainerStyle={styles.detailsContent}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}>
                            <View style={styles.photoRow}>
                                <Image
                                    source={{ uri: vm.photo.uri }}
                                    style={styles.photoThumb}
                                    resizeMethod="resize"
                                    accessibilityLabel="Foto da obra"
                                />
                                <View style={styles.flex}>
                                    <Text style={styles.photoRowTitle}>Foto pronta</Text>
                                    <Pressable onPress={vm.retakePhoto} hitSlop={6} accessibilityRole="button">
                                        <Text style={styles.linkText}>Refazer foto</Text>
                                    </Pressable>
                                </View>
                            </View>

                            <Text style={styles.label}>Localização</Text>
                            <LocationCard
                                location={vm.location}
                                onRetry={vm.fetchLocation}
                                onOpenAppSettings={vm.openAppSettings}
                                onOpenLocationSettings={vm.openLocationSettings}
                            />

                            <View style={styles.field}>
                                <Text style={styles.label}>Título</Text>
                                <Input
                                    placeholder="Ex.: Mural do Beco do Batman"
                                    icon="brush-outline"
                                    value={vm.title}
                                    onChangeText={vm.setTitle}
                                    maxLength={TITLE_MAX_LENGTH}
                                    returnKeyType="next"
                                    submitBehavior="submit"
                                    onSubmitEditing={() => descriptionRef.current?.focus()}
                                    hasError={!!vm.fieldErrors.title}
                                />
                                {!!vm.fieldErrors.title && (
                                    <Text style={styles.fieldError}>{vm.fieldErrors.title}</Text>
                                )}
                            </View>

                            <View style={styles.field}>
                                <Text style={styles.label}>Descrição (opcional)</Text>
                                <TextInput
                                    ref={descriptionRef}
                                    value={vm.description}
                                    onChangeText={vm.setDescription}
                                    placeholder="Artista, técnica, a história daquela parede…"
                                    placeholderTextColor={Colors.textSubtle}
                                    selectionColor={Colors.primaryLight}
                                    cursorColor={Colors.primaryLight}
                                    multiline
                                    maxLength={DESCRIPTION_MAX_LENGTH}
                                    textAlignVertical="top"
                                    onFocus={() => setDescriptionFocused(true)}
                                    onBlur={() => setDescriptionFocused(false)}
                                    style={[
                                        styles.textArea,
                                        descriptionFocused && styles.textAreaFocused,
                                        !!vm.fieldErrors.description && styles.textAreaError,
                                    ]}
                                />
                                <View style={styles.fieldFooter}>
                                    <Text style={styles.fieldError}>{vm.fieldErrors.description ?? ''}</Text>
                                    <Text style={styles.counter}>
                                        {vm.description.length}/{DESCRIPTION_MAX_LENGTH}
                                    </Text>
                                </View>
                            </View>

                            {!!vm.saveError && (
                                <Text style={styles.saveError} aria-live="polite">
                                    {vm.saveError}
                                </Text>
                            )}

                            <Button
                                title="Salvar obra"
                                icon="save-outline"
                                loading={vm.isSaving}
                                disabled={vm.location.status !== 'ready'}
                                onPress={vm.handleSave}
                            />
                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>

                <FeedbackAlert
                    visible={!!vm.savedArtwork}
                    type="success"
                    title="Obra registrada!"
                    message={`"${vm.savedArtwork?.title ?? ''}" foi salva no aparelho e já aparece no mapa.`}
                    confirmText="Ver no mapa"
                    onConfirm={vm.handleSuccessConfirm}
                />
            </>
        );
    }

    // ---------- Início ----------
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar style="light" />

            <View style={styles.screen}>
                <SafeAreaView style={styles.flex} edges={['top', 'bottom']}>
                    <AppTopBar
                        title="Registrar obra"
                        subtitle="Murais e grafites pela cidade"
                        onMenuPress={() => setMenuOpen(true)}
                    />

                    <ScrollView contentContainerStyle={styles.introContent} showsVerticalScrollIndicator={false}>
                        <View style={styles.heroCard}>
                            <View style={styles.heroIcon}>
                                <Ionicons name="camera" size={34} color={Colors.accent} />
                            </View>
                            <Text style={styles.heroTitle}>Achou uma obra pela cidade?</Text>
                            <Text style={styles.heroText}>
                                Fotografe e o AteliêSP marca o lugar no mapa. A foto fica guardada no seu
                                aparelho.
                            </Text>
                        </View>

                        <View style={styles.steps}>
                            {STEPS.map((item, index) => (
                                <View key={item.title} style={styles.stepRow}>
                                    <View style={styles.stepNumber}>
                                        <Text style={styles.stepNumberText}>{index + 1}</Text>
                                    </View>
                                    <View style={styles.flex}>
                                        <Text style={styles.stepTitle}>{item.title}</Text>
                                        <Text style={styles.stepText}>{item.text}</Text>
                                    </View>
                                    <Ionicons name={item.icon} size={20} color={Colors.textSubtle} />
                                </View>
                            ))}
                        </View>

                        {!!vm.cameraIssue && (
                            <View style={styles.noticeBox} aria-live="polite">
                                <Ionicons name="alert-circle-outline" size={22} color={Colors.error} />
                                <View style={styles.flex}>
                                    <Text style={styles.noticeTitle}>Sem acesso à câmera</Text>
                                    <Text style={styles.noticeText}>
                                        {vm.cameraIssue === 'blocked'
                                            ? 'O acesso foi bloqueado. Libere a câmera nas configurações do aparelho para registrar obras.'
                                            : 'Precisamos da câmera para fotografar a obra. Toque em "Abrir câmera" e permita o acesso.'}
                                    </Text>
                                    {vm.cameraIssue === 'blocked' && (
                                        <Pressable
                                            onPress={vm.openAppSettings}
                                            hitSlop={6}
                                            accessibilityRole="button">
                                            <Text style={styles.linkText}>Abrir configurações</Text>
                                        </Pressable>
                                    )}
                                </View>
                            </View>
                        )}

                        <Button title="Abrir câmera" icon="camera-outline" onPress={vm.openCamera} />
                    </ScrollView>
                </SafeAreaView>
            </View>

            <SideMenu visible={menuOpen} onClose={() => setMenuOpen(false)} />
        </>
    );
};

export default RegisterArtworkAndroid;
