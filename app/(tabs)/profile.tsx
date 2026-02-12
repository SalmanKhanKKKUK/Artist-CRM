import { useRouter } from 'expo-router';
import React from 'react';
import Profile from '../../components/screens/Profile/Profile';

import { useSmartBackHandler } from '../../hooks/useSmartBackHandler';

export default function ProfileScreen() {
    const router = useRouter();

    useSmartBackHandler(() => {
        router.back();
    });

    return (
        <Profile
            onBack={() => router.back()}
        />
    );
}
