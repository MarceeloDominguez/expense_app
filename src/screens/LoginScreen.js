import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import LoginInputs from '../components/LoginInputs';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useContextAuth} from '../context/AuthContext';

const WIDTH = Dimensions.get('screen').width;

const initialValues = {
  email: '',
  password: '',
};

const SCHEME_VALIDATION = Yup.object().shape({
  email: Yup.string()
    .email('Introduzca un email valido')
    .required('Este campo no puede estar vacio'),
  password: Yup.string()
    .min(6, 'La contraseña tiene que tener 6 caracteres como min')
    .required('Este campo no puede estar vacio'),
});

const LoginScreen = ({navigation}) => {
  const {singIn, state} = useContextAuth();

  useEffect(() => {
    if (state.error) {
      Alert.alert(
        'Error',
        'El email o password son incorrectos.',
        state.error[{text: 'Ok'}],
      );
    }
  }, [state.error]);

  const {handleChange, values, errors, handleSubmit} = useFormik({
    validationSchema: SCHEME_VALIDATION,
    initialValues,
    onSubmit: values => {
      singIn({values});
    },
  });

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Iniciar Sesión</Text>
      </View>
      <View style={styles.circleShapeView} />
      <LoginInputs
        handleChange={handleChange}
        values={values}
        errors={errors}
        handleSubmit={handleSubmit}
      />
      <View style={styles.containerAccount}>
        <View style={styles.containerHaveAccount}>
          <Text style={styles.haveAccount}>
            No tienes una cuenta?
            <TouchableOpacity
              onPress={() => navigation.navigate('RegisterScreen')}>
              <Text
                style={[
                  styles.haveAccount,
                  {
                    opacity: 1,
                    fontWeight: 'bold',
                    top: 3,
                    left: 4,
                    color: '#5d60ce',
                  },
                ]}>
                Regístrate
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
        <View style={styles.containerButtonLogin}>
          <CustomButton
            text="Iniciar sesión"
            textStyle={styles.textStyle}
            containerStyle={styles.containerStyle}
            onPress={() => handleSubmit()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0f0f0f',
  },
  containerTitle: {
    marginTop: 22,
    paddingLeft: 30,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    letterSpacing: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex: 1,
  },
  circleShapeView: {
    width: WIDTH,
    height: WIDTH,
    borderRadius: WIDTH / 2,
    backgroundColor: '#5d60ce',
    transform: [{scaleX: 2}, {translateY: -280}],
    position: 'absolute',
  },
  containerAccount: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  containerHaveAccount: {
    alignSelf: 'center',
    marginBottom: 20,
    width: 220,
  },
  haveAccount: {
    color: '#fff',
    fontSize: 12,
    letterSpacing: 0.5,
    opacity: 0.5,
  },
  containerButtonLogin: {
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  containerStyle: {
    width: '100%',
    backgroundColor: '#5d60ce',
  },
  textStyle: {
    color: '#fff',
  },
});
