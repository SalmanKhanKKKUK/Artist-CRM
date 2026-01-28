import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { THEME_COLORS } from '@/constants/Colors';

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
}

const FilterInput: React.FC<FilterInputProps> = ({
  title = "Filters",
  sections,
  onApply,
  onReset,
  isVisible,
  onClose,
}) => {
  const [selections, setSelections] = useState<Record<string, string>>({});

  const handleSelect = (sectionId: string, value: string) => {
    setSelections((prev) => ({
      ...prev,
      // Agar user wahi option dobara select kare to unselect ho jaye
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
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            
            <View style={styles.header}>
              <View style={styles.dragHandle} />
              <Text style={styles.headerText}>{title}</Text>
            </View>

            <ScrollView 
              style={styles.scrollBody} 
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {sections.map((section) => (
                <View key={section.id} style={styles.sectionContainer}>
                  <Text style={styles.sectionLabel}>{section.title}</Text>
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
                            isSelected ? styles.chipActive : styles.chipInactive
                          ]}
                        >
                          <Text 
                            style={[
                              styles.chipText, 
                              isSelected ? styles.textActive : styles.textInactive
                            ]}
                          >
                            {option.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={styles.footer}>
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
    backgroundColor: '#F8FAFC',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    maxHeight: '80%',
    width: '100%',
    paddingBottom: Platform.OS === 'android' ? 10 : 0, 
  },
  header: {
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#E2E8F0',
    borderRadius: 10,
    marginBottom: 10,
  },
  headerText: {
    color: '#5152B3',
    fontSize: 18,
    fontWeight: '800',
  },
  scrollBody: {
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 30,
  },
  sectionContainer: {
    marginBottom: 25,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 12,
  },
  optionsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  chipInactive: {
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  chipActive: {
    borderColor: '#5152B3',
    backgroundColor: '#5152B3',
  },
  chipText: {
    fontSize: 13,
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
    backgroundColor: '#FFFFFF',
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
    height: Platform.OS === 'ios' ? 40 : 40,
  },
});

export default FilterInput;


// ye reusable component hai
// s ko hum ne filter k reusable banaya hai
// ye project k andar search k sath ane wali filter k liye used hoga
// s ko project k andar home page k searching, and setting page k searching k liye used kia hoa hai.
