import { Ionicons } from '@expo/vector-icons';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppTopBar } from '@/components/app-top-bar';
import { Button } from '@/components/button';
import { Colors } from '@/constants/colors';
import { formatCoordinates, formatDateTime } from '@/utils/format';

import { styles } from './styles.android';
import { useArtworkDetails } from './useArtworkDetails';

const ArtworkDetailsAndroid: React.FC = () => {
    const vm = useArtworkDetails();

    if (!vm.auth) {
        return <Redirect href="/" />;
    }

    const artwork = vm.artwork;

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar style="light" />

            <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
                <AppTopBar title="Detalhes da obra" onBackPress={vm.goBack} />

                {vm.isLoading ? (
                    <View style={styles.center}>
                        <ActivityIndicator color={Colors.primaryLight} />
                    </View>
                ) : !artwork ? (
                    <View style={styles.center}>
                        <View style={styles.notFound}>
                            <Ionicons name="help-circle-outline" size={34} color={Colors.accent} />
                            <Text style={styles.notFoundTitle}>Obra não encontrada</Text>
                            <Text style={styles.notFoundText}>
                                Ela pode ter sido excluída deste aparelho.
                            </Text>
                            <Button title="Voltar" variant="secondary" icon="arrow-back" onPress={vm.goBack} />
                        </View>
                    </View>
                ) : (
                    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                        <View style={styles.photoFrame}>
                            {vm.photoFailed ? (
                                <View style={styles.photoFallback}>
                                    <Ionicons name="image-outline" size={36} color={Colors.textSubtle} />
                                    <Text style={styles.photoFallbackText}>A foto não está mais no aparelho.</Text>
                                </View>
                            ) : (
                                <Image
                                    source={{ uri: artwork.photoUri }}
                                    style={styles.photo}
                                    resizeMode="cover"
                                    accessibilityLabel={`Foto de ${artwork.title}`}
                                    onError={() => vm.setPhotoFailed(true)}
                                />
                            )}
                        </View>

                        <View style={styles.header}>
                            <Text style={styles.title} accessibilityRole="header">
                                {artwork.title}
                            </Text>
                            <Text style={styles.meta}>
                                {vm.isOwner ? 'Registrada por você' : `Registrada por @${artwork.username}`} ·{' '}
                                {formatDateTime(artwork.createdAt)}
                            </Text>
                        </View>

                        {artwork.description ? (
                            <Text style={styles.description}>{artwork.description}</Text>
                        ) : (
                            <Text style={styles.descriptionEmpty}>Sem descrição.</Text>
                        )}

                        <View style={styles.infoCard}>
                            <View style={styles.infoIcon}>
                                <Ionicons name="location" size={20} color={Colors.accent} />
                            </View>
                            <View style={styles.infoBody}>
                                <Text style={styles.infoTitle}>{artwork.address ?? 'Local registrado'}</Text>
                                <Text style={styles.infoText}>
                                    {formatCoordinates(artwork.latitude, artwork.longitude)}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.actions}>
                            <Button title="Ver no mapa do AteliêSP" icon="map-outline" onPress={vm.openOnMap} />
                            <Button
                                title="Abrir no app de mapas"
                                icon="navigate-outline"
                                variant="secondary"
                                onPress={vm.openInMapsApp}
                            />
                            {vm.isOwner && (
                                <Button
                                    title="Excluir obra"
                                    icon="trash-outline"
                                    variant="danger"
                                    loading={vm.isDeleting}
                                    onPress={vm.confirmDelete}
                                />
                            )}
                        </View>
                    </ScrollView>
                )}
            </SafeAreaView>
        </>
    );
};

export default ArtworkDetailsAndroid;
