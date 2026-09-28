import { Ionicons } from '@expo/vector-icons';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppTopBar } from '@/components/app-top-bar';
import { ArtworkMarker } from '@/components/artwork-marker';
import { Button } from '@/components/button';
import { SideMenu } from '@/components/side-menu';
import { Colors } from '@/constants/colors';
import { formatDate } from '@/utils/format';

import { darkMapStyle, styles } from './styles.android';
import { MapFilter } from './types';
import { SAO_PAULO_REGION, useArtworkMap } from './useArtworkMap';

const FILTERS: { key: MapFilter; label: string; icon: 'earth-outline' | 'person-outline' }[] = [
    { key: 'all', label: 'Todas', icon: 'earth-outline' },
    { key: 'mine', label: 'Minhas', icon: 'person-outline' },
];

const ArtworkMapAndroid: React.FC = () => {
    const vm = useArtworkMap();
    const insets = useSafeAreaInsets();
    const [menuOpen, setMenuOpen] = useState(false);

    if (!vm.auth) {
        return <Redirect href="/" />;
    }

    const selected = vm.selectedArtwork;
    const count = vm.artworks.length;
    const subtitle = vm.isLoading
        ? 'Carregando…'
        : `${count} ${count === 1 ? 'obra' : 'obras'} ${vm.filter === 'mine' ? 'suas' : 'no mapa'}`;

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar style="light" />

            <View style={styles.screen}>
                <MapView
                    ref={vm.mapRef}
                    style={StyleSheet.absoluteFill}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={SAO_PAULO_REGION}
                    customMapStyle={darkMapStyle}
                    showsUserLocation={vm.showsUserLocation}
                    showsMyLocationButton={false}
                    toolbarEnabled={false}
                    onMapReady={() => vm.setIsMapReady(true)}
                    onPress={(event) => {
                        if (event.nativeEvent.action !== 'marker-press') {
                            vm.clearSelection();
                        }
                    }}>
                    {vm.artworks.map((artwork) => (
                        <ArtworkMarker
                            key={artwork.id}
                            artwork={artwork}
                            selected={artwork.id === selected?.id}
                            onPress={() => vm.selectArtwork(artwork.id)}
                        />
                    ))}
                </MapView>

                {/* Camadas por cima do mapa: box-none deixa o toque passar para o mapa. */}
                <View style={[styles.topOverlay, { paddingTop: insets.top }]}>
                    <View style={styles.topBarCard}>
                        <AppTopBar
                            title="Mapa de obras"
                            subtitle={subtitle}
                            onMenuPress={() => setMenuOpen(true)}
                        />
                    </View>

                    <View style={styles.filters} accessibilityRole="tablist">
                        {FILTERS.map((item) => {
                            const active = vm.filter === item.key;
                            return (
                                <Pressable
                                    key={item.key}
                                    onPress={() => vm.changeFilter(item.key)}
                                    accessibilityRole="tab"
                                    accessibilityState={{ selected: active }}
                                    style={[styles.chip, active && styles.chipActive]}>
                                    <Ionicons
                                        name={item.icon}
                                        size={15}
                                        color={active ? Colors.onPrimary : Colors.textMuted}
                                    />
                                    <Text style={[styles.chipLabel, active && styles.chipLabelActive]}>
                                        {item.label}
                                    </Text>
                                </Pressable>
                            );
                        })}
                        {vm.isLoading && <ActivityIndicator size="small" color={Colors.primaryLight} />}
                    </View>
                </View>

                {!vm.isLoading && (!!vm.loadError || count === 0) && (
                    <View style={styles.emptyWrap}>
                        <View style={styles.emptyCard}>
                            <Ionicons
                                name={vm.loadError ? 'cloud-offline-outline' : 'images-outline'}
                                size={30}
                                color={Colors.accent}
                            />
                            <Text style={styles.emptyTitle}>
                                {vm.loadError
                                    ? vm.loadError
                                    : vm.filter === 'mine'
                                      ? 'Você ainda não registrou obras'
                                      : 'Nenhuma obra no mapa ainda'}
                            </Text>
                            <Text style={styles.emptyText}>
                                {vm.loadError
                                    ? 'Tente carregar de novo.'
                                    : 'Fotografe um mural ou grafite e ele aparece aqui, no lugar certinho.'}
                            </Text>
                            <Button
                                title={vm.loadError ? 'Tentar de novo' : 'Registrar obra'}
                                icon={vm.loadError ? 'refresh' : 'camera-outline'}
                                onPress={vm.loadError ? vm.reload : vm.goToRegister}
                            />
                        </View>
                    </View>
                )}

                <View
                    style={[
                        styles.fabColumn,
                        { bottom: insets.bottom + (selected ? styles.card.height + 28 : 24) },
                    ]}>
                    <Pressable
                        onPress={vm.centerOnUser}
                        accessibilityRole="button"
                        accessibilityLabel="Mostrar minha localização"
                        android_ripple={{ color: Colors.whiteAlpha['12'], borderless: true }}
                        style={styles.fabSecondary}>
                        <Ionicons name="locate" size={22} color={Colors.text} />
                    </Pressable>
                    <Pressable
                        onPress={vm.goToRegister}
                        accessibilityRole="button"
                        accessibilityLabel="Registrar obra"
                        android_ripple={{ color: Colors.whiteAlpha['30'], borderless: true }}
                        style={styles.fab}>
                        <Ionicons name="camera" size={26} color={Colors.onPrimary} />
                    </Pressable>
                </View>

                {selected && (
                    <View style={[styles.card, { bottom: insets.bottom + 16 }]}>
                        <Image
                            source={{ uri: selected.photoUri }}
                            style={styles.cardPhoto}
                            resizeMethod="resize"
                            accessibilityLabel={`Foto de ${selected.title}`}
                        />
                        <View style={styles.cardBody}>
                            <Text style={styles.cardTitle} numberOfLines={1}>
                                {selected.title}
                            </Text>
                            <Text style={styles.cardMeta} numberOfLines={1}>
                                {selected.userId === vm.auth.userId ? 'por você' : `por @${selected.username}`} ·{' '}
                                {formatDate(selected.createdAt)}
                            </Text>
                            {!!selected.address && (
                                <Text style={styles.cardAddress} numberOfLines={1}>
                                    {selected.address}
                                </Text>
                            )}
                            <Pressable
                                onPress={() => vm.openDetails(selected.id)}
                                hitSlop={6}
                                accessibilityRole="link"
                                style={styles.cardLink}>
                                <Text style={styles.cardLinkText}>Ver detalhes</Text>
                                <Ionicons name="arrow-forward" size={15} color={Colors.primaryLight} />
                            </Pressable>
                        </View>
                        <Pressable
                            onPress={vm.clearSelection}
                            hitSlop={8}
                            accessibilityRole="button"
                            accessibilityLabel="Fechar"
                            style={styles.cardClose}>
                            <Ionicons name="close" size={18} color={Colors.textMuted} />
                        </Pressable>
                    </View>
                )}
            </View>

            <SideMenu visible={menuOpen} onClose={() => setMenuOpen(false)} />
        </>
    );
};

export default ArtworkMapAndroid;
