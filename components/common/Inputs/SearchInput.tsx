import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native';

import { Feather } from '@expo/vector-icons';

interface SearchInputProps extends TextInputProps {
  containerStyle?: ViewStyle;
}

const SearchInput: React.FC<SearchInputProps> = ({ containerStyle, placeholder, ...rest }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Feather name="search" size={20} color="#888" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder || "Search by Name or Phone..."}
        placeholderTextColor="#888"
        // TextInput ki baaki props yahan aayengi
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White background jaisa screenshot mein hai
    borderRadius: 30, // Rounded edges
    paddingHorizontal: 15,
    height: 50,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

export default SearchInput;

// ye reusable component hai
// s ko hum ne Search k liye reusbale bana ya hai
// s ko humne home page k andar jo search wali option hai logo k sath os k liye banai hai.