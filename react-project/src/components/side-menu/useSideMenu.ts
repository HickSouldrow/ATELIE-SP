import { usePathname, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Platform } from 'react-native';

import { useAuth } from '@/contexts/AuthContext';
import { logout } from '@/integration/authIntegration';

import { SIDE_MENU_SECTIONS } from './items';
import { SideMenuItem, SideMenuSection } from './types';

export function useSideMenu(onClose: () => void, sections: SideMenuSection[] = SIDE_MENU_SECTIONS) {
    const router = useRouter();
    const pathname = usePathname();
    const { auth, setAuth } = useAuth();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const visibleSections = useMemo(() => {
        const isWeb = Platform.OS === 'web';

        return sections
            .map((section) => ({
                ...section,
                items: section.items.filter((item) => !(isWeb && item.nativeOnly)),
            }))
            .filter((section) => section.items.length > 0);
    }, [sections]);

    function isActive(item: SideMenuItem) {
        if (!item.route) {
            return false;
        }

        return (
            pathname === item.route || !!item.matches?.some((prefix) => pathname.startsWith(prefix))
        );
    }

    function handleSelect(item: SideMenuItem) {
        if (item.soon || !item.route) {
            return;
        }

        onClose();

        if (item.route !== pathname) {
            router.navigate(item.route as any);
        }
    }

    async function handleLogout() {
        if (isLoggingOut) {
            return;
        }

        setIsLoggingOut(true);
        await logout().catch(() => {});
        setAuth(null);
        setIsLoggingOut(false);
        onClose();
        router.replace('/');
    }

    return {
        username: auth?.username ?? null,
        sections: visibleSections,
        isActive,
        handleSelect,
        handleLogout,
        isLoggingOut,
    };
}
