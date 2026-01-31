import { THEME_COLORS } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  LayoutAnimation,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  UIManager,
  View,
} from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterSection {
  id: string;
  title: string;
  options: FilterOption[];
}

interface FilterInputProps {
  title?: string;
  sections: FilterSection[];
  onApply: (selections: Record<string, string>) => void;
  onReset: () => void;
  isVisible: boolean;
  onClose: () => void;
  backgroundColor?: string;
  textColor?: string;
  chipInactiveBackgroundColor?: string;
}

const FilterInput: React.FC<FilterInputProps> = ({
  title = "Filters",
  sections,
  onApply,
  onReset,
  isVisible,
  onClose,
  backgroundColor = '#FFFFFF',
  textColor = '#334155',
  chipInactiveBackgroundColor = '#FFFFFF',
}) => {
  const [selections, setSelections] = useState<Record<string, string>>({});
  // Track kounsa section open hai (bilkul NewVisit ki tarah)
  const [expandedSection, setExpandedSection] = useState<string | null>(sections[0]?.id || null);

  const toggleSection = (sectionId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleSelect = (sectionId: string, value: string) => {
    setSelections((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId] === value ? "" : value
    }));
  };

  const handleReset = () => {
    setSelections({});
    onReset();
  };

  const handleApply = () => {
    onApply(selections);
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide" // Slide animation is better for bottom sheets
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <TouchableWithoutFeedback>
          <View style={[styles.modalContent, { backgroundColor }]}>
            
            {/* Header */}
            <View style={[styles.header, { backgroundColor, borderBottomColor: Platform.OS === 'ios' ? '#E2E8F0' : 'transparent' }]}>
              <View style={styles.dragHandle} />
              <Text style={[styles.headerText, { color: textColor }]}>{title}</Text>
            </View>

            <ScrollView
              style={[styles.scrollBody, { backgroundColor }]}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {sections.map((section) => (
                <View key={section.id} style={[styles.sectionWrapper, { borderColor: Platform.OS === 'ios' ? '#F1F5F9' : '#E2E8F0' }]}>
                  {/* Dropdown Header */}
                  <TouchableOpacity 
                    style={styles.accordionHeader} 
                    onPress={() => toggleSection(section.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.sectionLabel, { color: textColor }]}>{section.title}</Text>
                    <Ionicons 
                      name={expandedSection === section.id ? "chevron-up" : "chevron-down"} 
                      size={20} 
                      color={textColor} 
                    />
                  </TouchableOpacity>

                  {/* Dropdown Body */}
                  {expandedSection === section.id && (
                    <View style={styles.optionsWrapper}>
                      {section.options.map((option) => {
                        const isSelected = selections[section.id] === option.value;
                        return (
                          <TouchableOpacity
                            key={option.value}
                            activeOpacity={0.7}
                            onPress={() => handleSelect(section.id, option.value)}
                            style={[
                              styles.chip,
                              isSelected
                                ? styles.chipActive
                                : [styles.chipInactive, { backgroundColor: chipInactiveBackgroundColor, borderColor: textColor }]
                            ]}
                          >
                            <Text
                              style={[
                                styles.chipText,
                                isSelected ? styles.textActive : [styles.textInactive, { color: textColor }]
                              ]}
                            >
                              {option.label}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>

            {/* Footer Actions */}
            <View style={[styles.footer, { backgroundColor }]}>
              <TouchableOpacity activeOpacity={0.8} onPress={handleApply}>
                <LinearGradient
                  colors={THEME_COLORS.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.primaryBtnGradient}
                >
                  <Text style={styles.primaryBtnText}>Apply Filters</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryBtn} onPress={handleReset}>
                <Text style={styles.secondaryBtnText}>Reset Selections</Text>
              </TouchableOpacity>

              <View style={styles.safeBottomSpacer} />
            </View>

          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    maxHeight: '80%',
    width: '100%',
  },
  header: {
    paddingVertical: 15,
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomWidth: 1,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#E2E8F0',
    borderRadius: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '800',
  },
  scrollBody: {
    flex: 0,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  sectionWrapper: {
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 15,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: '700',
  },
  optionsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  chipInactive: {
    borderColor: '#E2E8F0',
  },
  chipActive: {
    borderColor: '#5152B3',
    backgroundColor: '#5152B3',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  textInactive: {
    color: '#64748B',
  },
  textActive: {
    color: '#FFFFFF',
  },
  footer: {
    paddingHorizontal: 25,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  primaryBtnGradient: {
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryBtn: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  secondaryBtnText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  safeBottomSpacer: {
    height: Platform.OS === 'ios' ? 40 : 20,
  },
});

export default FilterInput;

// ye reusable component hai
// s ko hum ne filter k reusable banaya hai
// ye project k andar search k sath ane wali filter k liye used hoga
// s ko project k andar home page k searching, and setting page k searching k liye used kia hoa hai.
