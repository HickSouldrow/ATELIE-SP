import { SideMenuSection } from './types';

// Itens do menu compartilhados entre Web e Android.
export const SIDE_MENU_SECTIONS: SideMenuSection[] = [
    {
        key: 'explorar',
        title: 'Explorar',
        items: [
            { key: 'inicio', label: 'Início', icon: 'home-outline', activeIcon: 'home', route: '/dashboard' },
            {
                key: 'mapa',
                label: 'Mapa de obras',
                icon: 'map-outline',
                activeIcon: 'map',
                route: '/map',
                nativeOnly: true,
            },
            {
                key: 'registrar',
                label: 'Registrar obra',
                icon: 'camera-outline',
                activeIcon: 'camera',
                route: '/register-artwork',
                nativeOnly: true,
            },
            {
                key: 'minhas-obras',
                label: 'Minhas obras',
                icon: 'images-outline',
                activeIcon: 'images',
                route: '/my-artworks',
                matches: ['/artwork/'],
                nativeOnly: true,
            },
        ],
    },
    {
        key: 'ateliesp',
        title: 'AteliêSP',
        items: [
            {
                key: 'sobre',
                label: 'Sobre nós',
                icon: 'information-circle-outline',
                activeIcon: 'information-circle',
                route: '/about',
            },
        ],
    },
    {
        key: 'em-breve',
        title: 'Em breve',
        items: [
            { key: 'comunidade', label: 'Comunidade', icon: 'people-outline', soon: true },
            { key: 'favoritos', label: 'Favoritos', icon: 'heart-outline', soon: true },
            { key: 'config', label: 'Configurações', icon: 'settings-outline', soon: true },
        ],
    },
];
