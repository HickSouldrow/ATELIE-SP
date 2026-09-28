import * as Linking from 'expo-linking';
import { useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';

import { Developer } from './types';

function buildDeveloper(github: string, role: string): Developer {
    return {
        name: github,
        github,
        role,
        avatarUrl: `https://github.com/${github}.png?size=240`,
        profileUrl: `https://github.com/${github}`,
    };
}

const DEVELOPERS: Developer[] = [
    buildDeveloper('HickSouldrow', 'Desenvolvedor'),
    buildDeveloper('CassioEgidio', 'Desenvolvedor'),
];

export function useAbout() {
    const { auth } = useAuth();
    const [failedAvatars, setFailedAvatars] = useState<Record<string, boolean>>({});

    function openProfile(url: string) {
        Linking.openURL(url).catch(() => {});
    }

    function markAvatarFailed(github: string) {
        setFailedAvatars((prev) => ({ ...prev, [github]: true }));
    }

    return { auth, developers: DEVELOPERS, failedAvatars, openProfile, markAvatarFailed };
}
