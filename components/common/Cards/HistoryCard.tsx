import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

export interface HistoryCardProps {
    customer: { name: string; phone: string; img?: string };
    services: string[];
    tags: string[];
    notes?: string;
    photos?: string[];
    date: string;
    time: string;
    onPress?: () => void;
    containerStyle?: ViewStyle;
    backgroundColor?: string;
    shadowColor?: string;
    elevation?: number;
}

const HistoryCard: React.FC<HistoryCardProps> = ({
    customer,
    services,
    tags,
    notes,
    photos,
    date,
    time,
    onPress,
    containerStyle,
    backgroundColor = '#FFFFFF',
    shadowColor = '#000',
    elevation = 2,
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={[
                styles.container,
                {
                    backgroundColor,
                    shadowColor,
                    elevation,
                },
                containerStyle,
            ]}
        >
            {/* Left Side - Customer Image (Avatar) */}
            <View style={styles.imageContainer}>
                <Image
                    source={customer.img ? { uri: customer.img } : { uri: 'https://i.pravatar.cc/150' }}
                    style={styles.avatar}
                    resizeMode="cover"
                />
            </View>

            {/* Right Side - Details */}
            <View style={styles.contentContainer}>
                {/* Header: Name & Date */}
                <View style={styles.headerRow}>
                    <View style={{ flex: 1, paddingRight: 30 }}>
                        {/* paddingRight to avoid overlap with existing 3-dot menu from parent which is absolute positioned */}
                        <Text style={styles.nameText} numberOfLines={1}>{customer.name}</Text>
                        <Text style={styles.phoneText}>{customer.phone}</Text>
                    </View>
                    <View style={styles.dateBlock}>
                        <Text style={styles.dateText}>{date}</Text>
                        <Text style={styles.timeText}>{time}</Text>
                    </View>
                </View>

                {/* Services & Tags Chips */}
                <View style={styles.chipsRow}>
                    {services.slice(0, 3).map((service, index) => (
                        <View key={`s-${index}`} style={styles.serviceChip}>
                            <Text style={styles.serviceChipText}>{service}</Text>
                        </View>
                    ))}
                    {tags.slice(0, 2).map((tag, index) => (
                        <View key={`t-${index}`} style={styles.tagChip}>
                            <Text style={styles.tagChipText}>{tag}</Text>
                        </View>
                    ))}
                    {(services.length > 3 || tags.length > 2) && (
                        <Text style={styles.moreText}>+{services.length + tags.length - 5} more</Text>
                    )}
                </View>

                {/* Notes (Truncated) */}
                {notes ? (
                    <Text style={styles.notesText} numberOfLines={2}>
                        <Text style={{ fontWeight: '600' }}>Note: </Text>{notes}
                    </Text>
                ) : null}

                {/* Photos (Small Row) */}
                {photos && photos.length > 0 && (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoScroll}>
                        {photos.map((photo, index) => (
                            <Image key={index} source={{ uri: photo }} style={styles.miniPhoto} />
                        ))}
                    </ScrollView>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        padding: 15,
        marginBottom: 0, // Parent handles margin/gap
        // Shadow props are passed via style or defaults
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    imageContainer: {
        marginRight: 15,
        justifyContent: 'flex-start',
        paddingTop: 5,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: '#F1F5F9',
    },
    contentContainer: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E293B', // Slate 800
    },
    phoneText: {
        fontSize: 12,
        color: '#64748B', // Slate 500
        marginTop: 2,
    },
    dateBlock: {
        alignItems: 'flex-end',
        minWidth: 70,
    },
    dateText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#5152B3',
    },
    timeText: {
        fontSize: 10,
        color: '#94A3B8',
    },
    chipsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        marginBottom: 8,
    },
    serviceChip: {
        backgroundColor: '#F5F3FF',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#DDD6FE',
    },
    serviceChipText: {
        fontSize: 10,
        color: '#5152B3',
        fontWeight: '500',
    },
    tagChip: {
        backgroundColor: '#ECFDF5',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#A7F3D0',
    },
    tagChipText: {
        fontSize: 10,
        color: '#059669',
        fontWeight: '500',
    },
    moreText: {
        fontSize: 10,
        color: '#64748B',
        alignSelf: 'center',
    },
    notesText: {
        fontSize: 12,
        color: '#475569',
        fontStyle: 'italic',
        marginBottom: 8,
    },
    photoScroll: {
        marginTop: 4,
    },
    miniPhoto: {
        width: 40,
        height: 40,
        borderRadius: 6,
        marginRight: 6,
        backgroundColor: '#F1F5F9',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
});

export default HistoryCard;
