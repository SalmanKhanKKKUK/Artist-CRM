import { useRouter } from 'expo-router';
import React from 'react';
import Invite from '../../components/screens/Invite/Invite';
import { useSmartBackHandler } from '../../hooks/useSmartBackHandler';

export default function InviteScreen() {
    const router = useRouter();

    // Handle Android back button - go to previous page instead of quitting
    useSmartBackHandler(() => {
        router.back();
    });

    return (
        <Invite
            onBack={() => router.back()}
        />
    );
}
