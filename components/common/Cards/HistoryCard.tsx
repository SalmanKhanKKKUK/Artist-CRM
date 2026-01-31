import { useTheme } from '@/contexts/ThemeContext';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';

export interface HistoryCardProps {
  customer: {
    name: string;
    phone: string;
    img?: string;
  };
  services: string[];
  tags: string[];
  notes?: string;
  photos?: string[];
  date: string;
  time: string;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  shadowColor?: string;
  elevation?: number;
  titleColor?: string;
  phoneColor?: string;
  noteColor?: string;
  dateColor?: string;
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
  titleColor = '#1E293B',
  phoneColor = '#64748B',
  noteColor = '#475569',
  dateColor = '#5152B3',
}) => {
  const { isDark } = useTheme();
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
      <View style={styles.contentContainer}>

        {/* 1. Header: Name & Phone (More Compact) */}
        <View style={styles.headerRow}>
          <View style={styles.nameBlock}>
            <Text style={[styles.nameText, { color: titleColor }]} numberOfLines={1}>
              {customer.name}
            </Text>
            <Text style={[styles.phoneText, { color: phoneColor }]}>{customer.phone}</Text>
          </View>
        </View>

        {/* 2. Services Line (Smaller Gaps) */}
        <View style={styles.chipsRow}>
          {services.map((service, index) => (
            <View key={`s-${index}`} style={[
              styles.serviceChip,
              isDark && { backgroundColor: '#312e81', borderColor: '#4338ca' }
            ]}>
              <Text style={[
                styles.serviceChipText,
                isDark && { color: '#e0e7ff' }
              ]}>{service}</Text>
            </View>
          ))}
        </View>

        {/* 3. Tags Line */}
        <View style={styles.chipsRow}>
          {tags.map((tag, index) => (
            <View key={`t-${index}`} style={[
              styles.tagChip,
              isDark && { backgroundColor: '#064e3b', borderColor: '#065f46' }
            ]}>
              <Text style={[
                styles.tagChipText,
                isDark && { color: '#d1fae5' }
              ]}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* 4. Notes (Compact Text) */}
        {notes ? (
          <Text style={[styles.notesText, { color: noteColor }]} numberOfLines={1}>
            <Text style={[styles.noteLabel, isDark && { color: '#e2e8f0' }]}>Note: </Text>
            {notes}
          </Text>
        ) : null}

        {/* 5. Mini Photos Row (Adjusted Size) */}
        {photos && photos.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.photoScroll}
            contentContainerStyle={styles.photoScrollContent}
          >
            {photos.map((photo, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image source={{ uri: photo }} style={styles.miniPhoto} />
              </View>
            ))}
          </ScrollView>
        )}

        {/* 6. Footer: Date & Time (Aligned Bottom) */}
        <View style={styles.footerRow}>
          <View style={styles.dateBlock}>
            <Text style={[styles.dateText, { color: dateColor }]}>{date}</Text>
            <Text style={[styles.timeText, { color: phoneColor }]}>{time}</Text>
          </View>
        </View>

      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15, // Slightly smaller radius
    backgroundColor: '#FFFFFF',
    padding: 14, // Reduced padding from 18 to 14
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  contentContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8, // Reduced margin
  },
  nameBlock: {
    flex: 1,
    paddingRight: 35,
  },
  nameText: {
    fontSize: 16, // Reduced from 18
    fontWeight: 'bold',
    color: '#1E293B',
  },
  phoneText: {
    fontSize: 12, // Reduced from 13
    color: '#64748B',
    marginTop: 1,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6, // Reduced gap
    marginBottom: 6, // Reduced margin
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
    fontSize: 10, // More compact font
    color: '#5152B3',
    fontWeight: '600',
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
    fontWeight: '600',
  },
  noteLabel: {
    fontWeight: 'bold',
    color: '#334155',
  },
  notesText: {
    fontSize: 12, // Reduced from 13
    color: '#475569',
    fontWeight: '500',
    marginBottom: 8,
  },
  photoScroll: {
    marginBottom: 5,
  },
  photoScrollContent: {
    gap: 8,
  },
  imageWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  miniPhoto: {
    width: 60, // Reduced from 70 to 60 for compact look
    height: 60,
    backgroundColor: '#F1F5F9',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  dateBlock: {
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 10, // Compact date
    fontWeight: '800',
    color: '#5152B3',
  },
  timeText: {
    fontSize: 9,
    color: '#94A3B8',
    marginTop: 1,
  },
});

export default HistoryCard;