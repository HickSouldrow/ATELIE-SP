import { Ionicons } from '@expo/vector-icons';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Artwork } from '@/@types/artwork';
import { AppTopBar } from '@/components/app-top-bar';
import { Button } from '@/components/button';
import { SideMenu } from '@/components/side-menu';
import { Colors } from '@/constants/colors';
import { formatCoordinates, formatDate } from '@/utils/format';

import { styles } from './styles.android';
import { useMyArtworks } from './useMyArtworks';

const ArtworkRow: React.FC<{
    artwork: Artwork;
    deleting: boolean;
    onOpen: () => void;
    onDelete: () => void;
}> = ({ artwork, deleting, onOpen, onDelete }) => (
    <Pressable
        onPress={onOpen}
        android_ripple={{ color: Colors.primarySoft }}
        accessibilityRole="button"
        accessibilityLabel={`${artwork.title}, registrada em ${formatDate(artwork.createdAt)}`}
        accessibilityHint="Abre os detalhes da obra"
        style={styles.row}>
        <Image
            source={{ uri: artwork.photoUri }}
            style={styles.rowPhoto}
            resizeMethod="resize"
        />

        <View style={styles.rowBody}>
            <Text style={styles.rowTitle} numberOfLines={1}>
                {artwork.title}
            </Text>
            <View style={styles.rowMeta}>
                <Ionicons name="calendar-outline" size={13} color={Colors.textSubtle} />
                <Text style={styles.rowMetaText}>{formatDate(artwork.createdAt)}</Text>
            </View>
            <View style={styles.rowMeta}>
                <Ionicons name="location-outline" size={13} color={Colors.textSubtle} />
                <Text style={styles.rowMetaText} numberOfLines={1}>
                    {artwork.address ?? formatCoordinates(artwork.latitude, artwork.longitude)}
                </Text>
            </View>
        </View>

        <Pressable
            onPress={onDelete}
            disabled={deleting}
            hitSlop={6}
            accessibilityRole="button"
            accessibilityLabel={`Excluir ${artwork.title}`}
            android_ripple={{ color: Colors.errorPressed, borderless: true }}
            style={styles.deleteButton}>
            {deleting ? (
                <ActivityIndicator size="small" color={Colors.error} />
            ) : (
                <Ionicons name="trash-outline" size={20} color={Colors.error} />
            )}
        </Pressable>
    </Pressable>
);

const MyArtworksAndroid: React.FC = () => {
    const vm = useMyArtworks();
    const insets = useSafeAreaInsets();
    const [menuOpen, setMenuOpen] = useState(false);

    if (!vm.auth) {
        return <Redirect href="/" />;
    }

    const count = vm.artworks.length;

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar style="light" />

            <View style={styles.screen}>
                <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
                    <AppTopBar
                        title="Minhas obras"
                        subtitle={
                            vm.isLoading
                                ? 'Carregando…'
                                : `${count} ${count === 1 ? 'obra registrada' : 'obras registradas'} por @${vm.auth.username}`
                        }
                        onMenuPress={() => setMenuOpen(true)}
                    />

                    {vm.isLoading ? (
                        <View style={styles.center}>
                            <ActivityIndicator color={Colors.primaryLight} />
                        </View>
                    ) : (
                        <FlatList
                            data={vm.artworks}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={[styles.list, count === 0 && styles.listEmpty]}
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={vm.isRefreshing}
                                    onRefresh={vm.refresh}
                                    colors={[Colors.primary]}
                                    progressBackgroundColor={Colors.surface}
                                />
                            }
                            renderItem={({ item }) => (
                                <ArtworkRow
                                    artwork={item}
                                    deleting={vm.deletingId === item.id}
                                    onOpen={() => vm.openDetails(item.id)}
                                    onDelete={() => vm.confirmDelete(item)}
                                />
                            )}
                            ListEmptyComponent={
                                <View style={styles.emptyCard}>
                                    <View style={styles.emptyIcon}>
                                        <Ionicons
                                            name={vm.loadError ? 'cloud-offline-outline' : 'images-outline'}
                                            size={30}
                                            color={Colors.accent}
                                        />
                                    </View>
                                    <Text style={styles.emptyTitle}>
                                        {vm.loadError || 'Você ainda não registrou nenhuma obra'}
                                    </Text>
                                    <Text style={styles.emptyText}>
                                        {vm.loadError
                                            ? 'Puxe para baixo ou toque abaixo para tentar de novo.'
                                            : 'Achou um mural ou grafite pela cidade? Fotografe e ele entra na sua coleção.'}
                                    </Text>
                                    <Button
                                        title={vm.loadError ? 'Tentar de novo' : 'Registrar obra'}
                                        icon={vm.loadError ? 'refresh' : 'camera-outline'}
                                        onPress={vm.loadError ? vm.reload : vm.goToRegister}
                                    />
                                </View>
                            }
                        />
                    )}
                </SafeAreaView>

                {!vm.isLoading && count > 0 && (
                    <Pressable
                        onPress={vm.goToRegister}
                        accessibilityRole="button"
                        accessibilityLabel="Registrar obra"
                        android_ripple={{ color: Colors.whiteAlpha['30'], borderless: true }}
                        style={[styles.fab, { bottom: insets.bottom + 20 }]}>
                        <Ionicons name="camera" size={26} color={Colors.onPrimary} />
                    </Pressable>
                )}
            </View>

            <SideMenu visible={menuOpen} onClose={() => setMenuOpen(false)} />
        </>
    );
};

export default MyArtworksAndroid;
