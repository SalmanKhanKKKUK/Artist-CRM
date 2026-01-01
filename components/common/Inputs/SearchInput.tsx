import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View, ViewStyle } from 'react-native';

import { Feather, MaterialIcons } from '@expo/vector-icons';

export interface FilterOption {
  label: string;
  value: string;
}

export interface SortOption {
  label: string;
  value: string;
}

export interface SearchTypeOption {
  label: string;
  value: string;
}

export interface DateFilterOption {
  label: string;
  value: string;
}

export interface ServiceFilterOption {
  label: string;
  value: string;
}

interface SearchInputProps extends TextInputProps {
  containerStyle?: ViewStyle;
  onFilterChange?: (filter: string) => void;
  onSortChange?: (sort: string) => void;
  onSearchTypeChange?: (searchType: string) => void;
  onDateFilterChange?: (dateFilter: string) => void;
  onServiceFilterChange?: (serviceFilter: string) => void;
  onFilterIconPress?: () => void;
  filterOptions?: FilterOption[];
  sortOptions?: SortOption[];
  searchTypeOptions?: SearchTypeOption[];
  dateFilterOptions?: DateFilterOption[];
  serviceFilterOptions?: ServiceFilterOption[];
  showFilterSort?: boolean;
  showSearchType?: boolean;
  showDateFilter?: boolean;
  showServiceFilter?: boolean;
  showFilterIcon?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  containerStyle, 
  placeholder, 
  onFilterChange,
  onSortChange,
  onSearchTypeChange,
  onDateFilterChange,
  onServiceFilterChange,
  onFilterIconPress,
  filterOptions = [],
  sortOptions = [],
  searchTypeOptions = [],
  dateFilterOptions = [],
  serviceFilterOptions = [],
  showFilterSort = false,
  showSearchType = false,
  showDateFilter = false,
  showServiceFilter = false,
  showFilterIcon = false,
  ...rest 
}) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [showSearchTypeModal, setShowSearchTypeModal] = useState(false);
  const [showDateFilterModal, setShowDateFilterModal] = useState(false);
  const [showServiceFilterModal, setShowServiceFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedSort, setSelectedSort] = useState('name-asc');
  const [selectedSearchType, setSelectedSearchType] = useState('name');
  const [selectedDateFilter, setSelectedDateFilter] = useState('all');
  const [selectedServiceFilter, setSelectedServiceFilter] = useState('all');

  const handleFilterSelect = (value: string) => {
    setSelectedFilter(value);
    onFilterChange?.(value);
    setShowFilterModal(false);
  };

  const handleSortSelect = (value: string) => {
    setSelectedSort(value);
    onSortChange?.(value);
    setShowSortModal(false);
  };

  const handleSearchTypeSelect = (value: string) => {
    setSelectedSearchType(value);
    onSearchTypeChange?.(value);
    setShowSearchTypeModal(false);
  };

  const handleDateFilterSelect = (value: string) => {
    setSelectedDateFilter(value);
    onDateFilterChange?.(value);
    setShowDateFilterModal(false);
  };

  const handleServiceFilterSelect = (value: string) => {
    setSelectedServiceFilter(value);
    onServiceFilterChange?.(value);
    setShowServiceFilterModal(false);
  };

  const getFilterLabel = () => {
    const option = filterOptions.find(opt => opt.value === selectedFilter);
    return option ? option.label : 'Filter';
  };

  const getSortLabel = () => {
    const option = sortOptions.find(opt => opt.value === selectedSort);
    return option ? option.label : 'Sort';
  };

  const getDateFilterLabel = () => {
    const option = dateFilterOptions.find(opt => opt.value === selectedDateFilter);
    return option ? option.label : 'Date';
  };

  const getServiceFilterLabel = () => {
    const option = serviceFilterOptions.find(opt => opt.value === selectedServiceFilter);
    return option ? option.label : 'Service';
  };

  const getSearchTypeLabel = () => {
    const option = searchTypeOptions.find(opt => opt.value === selectedSearchType);
    return option ? option.label : 'Search';
  };

  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    switch (selectedSearchType) {
      case 'name':
        return 'Search by First/Last Name...';
      case 'phone':
        return 'Search by Phone (Last 4 digits)...';
      case 'instagram':
        return 'Search by Instagram Handle...';
      case 'whatsapp':
        return 'Search by WhatsApp Handle...';
      case 'number':
        return 'Search by Number (1-4 digits)...';
      case 'date':
        return 'Search by Last Visit Date...';
      default:
        return 'Search...';
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.inputContainer}>
        <Feather name="search" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={getPlaceholder()}
          placeholderTextColor="#888"
          {...rest}
        />
      </View>
      
      {/* Filter Icon - Fixed position outside input container */}
      {showFilterIcon && (
        <TouchableOpacity 
          style={styles.filterIconButton} 
          onPress={onFilterIconPress}
        >
          <MaterialIcons name="filter-list" size={20} color="#888" />
        </TouchableOpacity>
      )}
      
      {/* Search Type Button */}
      {showSearchType && (
        <TouchableOpacity 
          style={styles.searchTypeButton} 
          onPress={() => setShowSearchTypeModal(true)}
        >
          <MaterialIcons name="search" size={16} color="#888" />
          <Text style={styles.buttonText}>{getSearchTypeLabel()}</Text>
        </TouchableOpacity>
      )}
      
      {/* Date Filter Button */}
      {showDateFilter && (
        <TouchableOpacity 
          style={styles.dateFilterButton} 
          onPress={() => setShowDateFilterModal(true)}
        >
          <MaterialIcons name="event" size={16} color="#888" />
          <Text style={styles.buttonText}>{getDateFilterLabel()}</Text>
        </TouchableOpacity>
      )}
      
      {/* Service Filter Button */}
      {showServiceFilter && (
        <TouchableOpacity 
          style={styles.serviceFilterButton} 
          onPress={() => setShowServiceFilterModal(true)}
        >
          <MaterialIcons name="palette" size={16} color="#888" />
          <Text style={styles.buttonText}>{getServiceFilterLabel()}</Text>
        </TouchableOpacity>
      )}
      
      {showFilterSort && (
        <View style={styles.filterSortContainer}>
          <TouchableOpacity 
            style={styles.filterButton} 
            onPress={() => setShowFilterModal(true)}
          >
            <MaterialIcons name="filter-list" size={20} color="#888" />
            <Text style={styles.buttonText}>{getFilterLabel()}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.sortButton} 
            onPress={() => setShowSortModal(true)}
          >
            <MaterialIcons name="sort" size={20} color="#888" />
            <Text style={styles.buttonText}>{getSortLabel()}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Search Type Modal */}
      <Modal
        visible={showSearchTypeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSearchTypeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Search By</Text>
            <FlatList
              data={searchTypeOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => handleSearchTypeSelect(item.value)}
                >
                  <Text style={[
                    styles.optionText,
                    selectedSearchType === item.value && styles.selectedOptionText
                  ]}>
                    {item.label}
                  </Text>
                  {selectedSearchType === item.value && (
                    <MaterialIcons name="check" size={20} color="#007AFF" />
                  )}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowSearchTypeModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Date Filter Modal */}
      <Modal
        visible={showDateFilterModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDateFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter By Date</Text>
            <FlatList
              data={dateFilterOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => handleDateFilterSelect(item.value)}
                >
                  <Text style={[
                    styles.optionText,
                    selectedDateFilter === item.value && styles.selectedOptionText
                  ]}>
                    {item.label}
                  </Text>
                  {selectedDateFilter === item.value && (
                    <MaterialIcons name="check" size={20} color="#007AFF" />
                  )}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowDateFilterModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Service Filter Modal */}
      <Modal
        visible={showServiceFilterModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowServiceFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter By Service</Text>
            <FlatList
              data={serviceFilterOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => handleServiceFilterSelect(item.value)}
                >
                  <Text style={[
                    styles.optionText,
                    selectedServiceFilter === item.value && styles.selectedOptionText
                  ]}>
                    {item.label}
                  </Text>
                  {selectedServiceFilter === item.value && (
                    <MaterialIcons name="check" size={20} color="#007AFF" />
                  )}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowServiceFilterModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter By</Text>
            <FlatList
              data={filterOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => handleFilterSelect(item.value)}
                >
                  <Text style={[
                    styles.optionText,
                    selectedFilter === item.value && styles.selectedOptionText
                  ]}>
                    {item.label}
                  </Text>
                  {selectedFilter === item.value && (
                    <MaterialIcons name="check" size={20} color="#007AFF" />
                  )}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowFilterModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Sort Modal */}
      <Modal
        visible={showSortModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSortModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sort By</Text>
            <FlatList
              data={sortOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => handleSortSelect(item.value)}
                >
                  <Text style={[
                    styles.optionText,
                    selectedSort === item.value && styles.selectedOptionText
                  ]}>
                    {item.label}
                  </Text>
                  {selectedSort === item.value && (
                    <MaterialIcons name="check" size={20} color="#007AFF" />
                  )}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowSortModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 50,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  searchTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    marginLeft: 8,
  },
  dateFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    marginLeft: 4,
  },
  serviceFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    marginLeft: 4,
  },
  filterSortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#888',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    maxHeight: '50%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 15,
    paddingVertical: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#888',
  },
  filterIconButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});

export default SearchInput;

// ye reusable component hai
// s ko hum ne Search k liye reusbale bana ya hai
// s ko humne home page k andar jo search wali option hai logo k sath os k liye banai hai.