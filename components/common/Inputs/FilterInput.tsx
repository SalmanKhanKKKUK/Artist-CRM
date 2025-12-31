import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

// Interfaces for strict type checking
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
            <Text style={styles.headerText}>{title}</Text>
          </View>

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
                    
                    // Style objects define separately to avoid TS array merging errors
                    const chipStyle: ViewStyle[] = [
                      styles.chip,
                      isSelected ? styles.chipSelected : {}
                    ];
                    
                    const chipTextStyle: TextStyle[] = [
                      styles.chipText,
                      isSelected ? styles.chipTextSelected : {}
                    ];

                    return (
                      <TouchableOpacity
                        key={option.value}
                        activeOpacity={0.8}
                        onPress={() => handleSelect(section.id, option.value)}
                        style={chipStyle}
                      >
                        <Text style={chipTextStyle}>{option.label}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Footer with SafeAreaView for bottom notch devices */}
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
              <Text style={styles.resetBtnText}>Reset</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
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
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    width: '100%',
  },
  header: {
    backgroundColor: '#333333',
    paddingVertical: 18,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  scrollBody: {
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#444',
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#D4AF37',
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#FFF',
  },
  chipSelected: {
    backgroundColor: '#D4AF37',
  },
  chipText: {
    color: '#333',
    fontSize: 13,
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#FFF',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  applyBtn: {
    backgroundColor: '#E53935',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  applyBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  resetBtn: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  resetBtnText: {
    color: '#777',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default FilterInput;

// ye reusable component hai
// s ko hum ne filter k reusable banaya hai
// ye project k andar search k sath ane wali filter k liye used hoga
// s ko project k andar home page k searching, and setting page k searching k liye used kia hoa hai.
