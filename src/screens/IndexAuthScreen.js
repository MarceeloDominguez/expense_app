import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import CustomButton from '../components/CustomButton';

const IndexAuthScreen = ({navigation}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <StatusBar backgroundColor="#0f0f0f" />
      <View style={styles.containerImg}>
        <Image source={require('../images/login.png')} style={styles.img} />
        <Text style={styles.title}>
          Una manera fácil de controlar tus gastos
        </Text>
        <Text style={styles.subtitle}>
          Asegure su futuro administrando sus gastos ahora mismo
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={styles.containerButton}>
          <CustomButton
            text="Iniciar sesión"
            textStyle={styles.textStyle}
            containerStyle={styles.buttonLogin}
            onPress={() => navigation.navigate('LoginScreen')}
          />
          <CustomButton
            text="Regístrate"
            containerStyle={styles.buttonRegister}
            textStyle={styles.textButton}
            onPress={() => navigation.navigate('RegisterScreen')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default IndexAuthScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f0f0f',
    flexGrow: 1,
  },
  containerImg: {
    alignItems: 'center',
    marginTop: 20,
  },
  img: {
    width: 320,
    height: 320,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    maxWidth: 250,
    textAlign: 'center',
    alignSelf: 'center',
    letterSpacing: 1,
    lineHeight: 24,
    marginBottom: 20,
  },
  subtitle: {
    color: '#fff',
    opacity: 0.5,
    maxWidth: 270,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    lineHeight: 18,
  },
  containerButton: {
    flexDirection: 'row',
    borderRadius: 14,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  buttonLogin: {
    backgroundColor: '#5d60ce',
  },
  buttonRegister: {
    backgroundColor: '#000000',
  },
  textStyle: {
    color: '#fff',
  },
  textButton: {
    color: '#fff',
  },
});
