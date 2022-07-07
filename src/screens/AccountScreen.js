import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useContextAuth} from '../context/AuthContext';

const AccountScreen = () => {
  const {logout} = useContextAuth();

  return (
    <View>
      <TouchableOpacity onPress={logout} style={styles.containerButton}>
        <Text style={styles.textButton}>Cerrar sesion</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  containerButton: {
    height: 35,
    backgroundColor: '#5d60ce',
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 6,
    marginTop: 20,
  },
  textButton: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
