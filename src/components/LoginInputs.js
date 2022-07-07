import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import CustomInput from './CustomInput';

const LoginInputs = ({handleChange, values, errors, handleSubmit}) => {
  const passwordRef = useRef();

  return (
    <View style={styles.container}>
      <CustomInput
        label="Email"
        placeholder="Ingresa tu email"
        keyboardType="email-address"
        value={values.email}
        onChangeText={handleChange('email')}
        errorMessage={errors.email}
        onSubmitEditing={() => passwordRef.current.focus()}
      />
      <CustomInput
        label="Contraseña"
        placeholder="***********"
        secureTextEntry={true}
        iconVisible={true}
        value={values.password}
        onChangeText={handleChange('password')}
        errorMessage={errors.password}
        customRef={passwordRef}
        onSubmitEditing={handleSubmit}
      />
    </View>
  );
};

export default LoginInputs;

const styles = StyleSheet.create({
  container: {
    //marginTop: 32,
    paddingHorizontal: 30,
    marginTop: 55,
  },
});
