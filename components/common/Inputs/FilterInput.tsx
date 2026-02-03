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
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  UIManager,
  View,
} from 'react-native';

// Android LayoutAnimation enable karne ke liye
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
  const [expandedSection, setExpandedSection] = useState<string | null>(sections[0]?.id || null);

  // Search query state for each section
  const [searchQueries, setSearchQueries] = useState<Record<string, string>>({});

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

  const handleSearchChange = (sectionId: string, text: string) => {
    setSearchQueries((prev) => ({
      ...prev,
      [sectionId]: text
    }));
  };

  const handleReset = () => {
    setSelections({});
    setSearchQueries({});
    onReset();
  };

  const handleApply = () => {
    onApply(selections);
    onClose();
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
        <TouchableWithoutFeedback>
          <View style={[styles.modalContent, { backgroundColor }]}>

            {/* Header Section */}
            <View style={[styles.header, { backgroundColor, borderBottomColor: '#E2E8F0' }]}>
              <View style={styles.dragHandle} />
              <Text style={[styles.headerText, { color: textColor }]}>
                {title}
              </Text>
            </View>

            {/* Scrollable Body */}
            <ScrollView
              style={[styles.scrollBody, { backgroundColor }]}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {sections.map((section) => {
                const query = searchQueries[section.id] || "";
                
                // Filter logic based on current search query
                const filteredOptions = section.options.filter((opt) =>
                  opt.label.toLowerCase().includes(query.toLowerCase())
                );

                return (
                  <View
                    key={section.id}
                    style={[styles.sectionWrapper, { borderColor: '#E2E8F0' }]}
                  >
                    {/* Section Header (Accordion) */}
                    <TouchableOpacity
                      style={styles.accordionHeader}
                      onPress={() => toggleSection(section.id)}
                      activeOpacity={0.7}
                    >
                      <View>
                        <Text style={[styles.sectionLabel, { color: textColor }]}>
                          {section.title}
                        </Text>
                        {selections[section.id] ? (
                          <Text style={styles.activeSelectionText}>
                            Selected: {selections[section.id]}
                          </Text>
                        ) : null}
                      </View>
                      <Ionicons
                        name={expandedSection === section.id ? "chevron-up" : "chevron-down"}
                        size={20}
                        color={textColor}
                      />
                    </TouchableOpacity>

                    {/* Section Content (Search + Options) */}
                    {expandedSection === section.id && (
                      <View style={styles.expandedContent}>
                        {/* Search Input for the specific section */}
                        <View
                          style={[
                            styles.searchContainer,
                            {
                              backgroundColor: backgroundColor === '#FFFFFF' ? '#F8FAFC' : '#334155'
                            }
                          ]}
                        >
                          <Ionicons name="search" size={16} color="#94A3B8" />
                          <TextInput
                            style={[styles.searchInput, { color: textColor }]}
                            placeholder={`Search ${section.title}...`}
                            placeholderTextColor="#94A3B8"
                            value={query}
                            onChangeText={(text) => handleSearchChange(section.id, text)}
                          />
                        </View>

                        {/* Chips / Options Grid */}
                        <View style={styles.optionsWrapper}>
                          {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => {
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
                                      : [
                                          styles.chipInactive,
                                          {
                                            backgroundColor: chipInactiveBackgroundColor,
                                            borderColor: '#E2E8F0'
                                          }
                                        ]
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
                            })
                          ) : (
                            <Text style={styles.noResultsText}>
                              No results found
                            </Text>
                          )}
                        </View>
                      </View>
                    )}
                  </View>
                );
              })}
            </ScrollView>

            {/* Footer Action Buttons */}
            <View style={[styles.footer, { backgroundColor }]}>
              <TouchableOpacity activeOpacity={0.8} onPress={handleApply}>
                <LinearGradient
                  colors={THEME_COLORS.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.primaryBtnGradient}
                >
                  <Text style={styles.primaryBtnText}>
                    Apply Filters
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryBtn} onPress={handleReset}>
                <Text style={styles.secondaryBtnText}>
                  Reset All
                </Text>
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
    maxHeight: '85%',
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
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 18,
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
  activeSelectionText: {
    fontSize: 11,
    color: '#5152B3',
    fontWeight: '600',
    marginTop: 2,
  },
  expandedContent: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 12,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },
  optionsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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
  noResultsText: {
    fontSize: 12,
    color: '#94A3B8',
    fontStyle: 'italic',
    paddingLeft: 5,
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
    height: Platform.OS === 'ios' ? 40 : 50,
  },
});

export default FilterInput;


// ye reusable component hai
// s ko hum ne filter k reusable banaya hai
// ye project k andar search k sath ane wali filter k liye used hoga
// s ko project k andar home page k searching, and setting page k searching k liye used kia hoa hai.
