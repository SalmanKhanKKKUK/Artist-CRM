import Help from '@/components/screens/Help/Help';
import React from 'react';
import { useRouter } from 'expo-router';
import { useSmartBackHandler } from '../../hooks/useSmartBackHandler';

export default function HelpScreen() {
    const router = useRouter();

    useSmartBackHandler(() => {
        router.back();
    });

    return <Help />;
}
