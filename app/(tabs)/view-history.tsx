import { useRouter } from 'expo-router';
import React from 'react';
import ViewHistory from '../../components/screens/ViewHistory/ViewHistory';
import { useSmartBackHandler } from '../../hooks/useSmartBackHandler';

export default function ViewHistoryModal() {
    const router = useRouter();

    // Handle Android back button
    const handleBack = React.useCallback(() => {
        router.back();
    }, [router]);

    useSmartBackHandler(handleBack);

    return (
        <ViewHistory
            onBack={() => router.back()}
        />
    );
}
