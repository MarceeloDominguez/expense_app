import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomInput = ({
  label,
  placeholder,
  keyboardType,
  secureTextEntry,
  iconVisible,
  stylesContainer,
  stylesLabel,
  stylesInput,
  value,
  onChangeText,
  errorMessage,
  asterisk,
  onSubmitEditing,
  customRef,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={{...styles.container, ...stylesContainer}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{...styles.label, ...stylesLabel}}>{label}</Text>
        {asterisk && (
          <Text style={{color: errorMessage ? 'red' : '#5d60ce'}}>*</Text>
        )}
      </View>
      {iconVisible && (
        <View style={styles.containerIcon}>
          <Icon
            name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color="rgba(255,255,255,0.2)"
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        </View>
      )}
      <TextInput
        placeholder={placeholder}
        style={{
          ...styles.input,
          ...stylesInput,
          borderColor: errorMessage ? '#FE0A49' : '#ffffff32',
        }}
        placeholderTextColor="rgba(255,255,255,0.2)"
        keyboardType={keyboardType}
        secureTextEntry={passwordVisible ? false : secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        ref={customRef}
      />
      <Text style={styles.error}>{errorMessage}</Text>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    color: '#5d60ce',
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 10,
    color: '#fff',
  },
  containerIcon: {
    position: 'absolute',
    right: 10,
    top: 40,
    zIndex: 1,
  },
  error: {
    marginTop: 4,
    fontSize: 12,
    letterSpacing: 0.5,
    fontStyle: 'italic',
    color: '#FE0A49',
  },
});
