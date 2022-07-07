import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function CustomButton({
  containerStyle,
  text,
  textStyle,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={{...styles.container, ...containerStyle}}
      activeOpacity={0.8}
      onPress={onPress}>
      <Text style={{...styles.text, ...textStyle}}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 130,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    color: '#000',
  },
});
