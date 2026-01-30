import { useTheme } from '@/contexts/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavHeader from '../../common/Buttons/NavHeader';

const Notification = () => {
    const { colors } = useTheme();
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
            <NavHeader title="Notifications" showProfileIcon={false} />
            <View style={styles.content}>
                <Text style={[styles.text, { color: colors.textSecondary }]}>No new notifications</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        color: '#64748B',
    },
});

export default Notification;
