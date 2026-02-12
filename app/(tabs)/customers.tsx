import { useRouter } from 'expo-router';
import React from 'react';
import Customers from '../../components/screens/Customers/Customers';
import { useSmartBackHandler } from '../../hooks/useSmartBackHandler';

export default function CustomersScreen() {
    const router = useRouter();

    useSmartBackHandler(() => {
        router.back();
    });

    return (
        <Customers onBack={() => router.back()} />
    );
}
