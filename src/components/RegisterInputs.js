import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import CustomInput from './CustomInput';

const RegisterInputs = ({handleChange, values, errors, handleSubmit}) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  return (
    <View style={styles.containerInputs}>
      <CustomInput
        label="Nombre"
        placeholder="Ingrese su nombre"
        asterisk={true}
        onChangeText={handleChange('name')}
        value={values.name}
        errorMessage={errors.name}
        onSubmitEditing={() => emailRef.current.focus()}
      />
      <CustomInput
        label="Email"
        placeholder="Ingrese su email"
        asterisk={true}
        keyboardType="email-address"
        onChangeText={handleChange('email')}
        value={values.email}
        errorMessage={errors.email}
        customRef={emailRef}
        onSubmitEditing={() => passwordRef.current.focus()}
      />
      <CustomInput
        label="Contraseña"
        placeholder="Ingrese su contraseña"
        asterisk={true}
        secureTextEntry={true}
        iconVisible={true}
        onChangeText={handleChange('password')}
        value={values.password}
        errorMessage={errors.password}
        customRef={passwordRef}
        onSubmitEditing={handleSubmit}
      />
    </View>
  );
};

export default RegisterInputs;

const styles = StyleSheet.create({
  containerInputs: {
    marginTop: 55,
    paddingHorizontal: 30,
  },
});
