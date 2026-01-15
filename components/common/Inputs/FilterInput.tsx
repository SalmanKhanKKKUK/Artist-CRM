import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';

// Interfaces
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
      [sectionId]: value,
    }));
  };

  const handleReset = () => {
    setSelections({});
    onReset();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modalContent}>
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.dragHandle} />
            <Text style={styles.headerText}>{title}</Text>
          </View>

          {/* Body Section */}
          <ScrollView 
            style={styles.scrollBody} 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {sections.map((section) => (
              <View key={section.id} style={styles.section}>
                <Text style={styles.sectionLabel}>{section.title}</Text>
                <View style={styles.optionsContainer}>
                  {section.options.map((option) => {
                    const isSelected = selections[section.id] === option.value;
                    return (
                      <TouchableOpacity
                        key={option.value}
                        activeOpacity={0.7}
                        onPress={() => handleSelect(section.id, option.value)}
                        style={[
                          styles.chip, 
                          isSelected ? styles.chipSelected : styles.chipUnselected
                        ]}
                      >
                        <Text style={[
                          styles.chipText, 
                          isSelected ? styles.chipTextSelected : styles.chipTextUnselected
                        ]}>
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Footer Section with Fixed Visibility */}
          <SafeAreaView style={styles.footer}>
            <TouchableOpacity 
              style={styles.applyBtn} 
              onPress={() => onApply(selections)}
            >
              <Text style={styles.applyBtnText}>Apply Filters</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.resetBtn} 
              onPress={handleReset}
            >
              <Text style={styles.resetBtnText}>Reset Selections</Text>
            </TouchableOpacity>
            
            {/* Extra spacer for Android/iOS bottom bars */}
            <View style={styles.bottomSpacer} />
          </SafeAreaView>
        </View>
      </Pressable>
    </Modal>
  );
};

// Proper CSS-like Structured Styles
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
  },
  header: {
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#CBD5E1',
    borderRadius: 3,
    marginBottom: 10,
  },
  headerText: {
    color: '#5152B3',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  scrollBody: {
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  chipUnselected: {
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  chipSelected: {
    borderColor: '#5152B3',
    backgroundColor: '#5152B3',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  chipTextUnselected: {
    color: '#64748B',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
  footer: {
    paddingHorizontal: 25,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  applyBtn: {
    backgroundColor: '#5152B3',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 4,
    shadowColor: '#5152B3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  applyBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  resetBtn: {
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 5,
  },
  resetBtnText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  bottomSpacer: {
    height: Platform.OS === 'ios' ? 30 : 20, // Reset button ke neeche proper margin
  },
});

export default FilterInput;

// ye reusable component hai
// s ko hum ne filter k reusable banaya hai
// ye project k andar search k sath ane wali filter k liye used hoga
// s ko project k andar home page k searching, and setting page k searching k liye used kia hoa hai.
