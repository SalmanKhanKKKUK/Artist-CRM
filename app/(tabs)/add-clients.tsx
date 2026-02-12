import { useRouter } from 'expo-router';
import React from 'react';
import AddClients from '../../components/screens/AddClients/AddClients';
import { useSmartBackHandler } from '../../hooks/useSmartBackHandler';

export default function AddClientsScreen() {
    const router = useRouter();

    useSmartBackHandler(() => {
        router.back();
    });

    return (
        <AddClients
            onBack={() => router.back()}
            onNavigateToWelcome={() => { }}
        />
    );
}
