import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import Budget from '../components/Budget';
import Expense from '../components/Expense';
import Income from '../components/Income';
import {useContextAuth} from '../context/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useGlobalAppContext} from '../context/GlobalAppContext';

const titles = ['Ingresos', 'Gastos'];

const HomeScreen = () => {
  const {
    state: {name},
  } = useContextAuth();
  const {incomes, setIncomes, expenses, setExpenses} = useGlobalAppContext();

  const [selectedOption, setSelectedOption] = useState(0);

  //guardar y obtener los ingresos del storage

  useEffect(() => {
    const obtenerIngresosStorage = async () => {
      try {
        const ingresosStorage = await AsyncStorage.getItem('control_ingresos');
        setIncomes(ingresosStorage ? JSON.parse(ingresosStorage) : []);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerIngresosStorage();
  }, []);

  useEffect(() => {
    const guardarIngresosLocalStorage = async () => {
      try {
        await AsyncStorage.setItem('control_ingresos', JSON.stringify(incomes));
      } catch (error) {
        console.log(error);
      }
    };
    guardarIngresosLocalStorage();
  }, [incomes]);

  //guardar y obtener los gastos del storage

  useEffect(() => {
    const obtenerGastosStorage = async () => {
      try {
        const gastosStorage = await AsyncStorage.getItem('control_gastos');
        setExpenses(gastosStorage ? JSON.parse(gastosStorage) : []);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerGastosStorage();
  }, []);

  useEffect(() => {
    const guardarGastosLocalStorage = async () => {
      try {
        await AsyncStorage.setItem('control_gastos', JSON.stringify(expenses));
      } catch (error) {
        console.log(error);
      }
    };
    guardarGastosLocalStorage();
  }, [expenses]);

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <StatusBar backgroundColor="#5d60ce" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        contentContainerStyle={{flexGrow: 1}}>
        <LinearGradient
          start={{x: 1, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#5d60ce', 'transparent']}>
          <View style={styles.containerHeader}>
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>¡Bienvenido!</Text>
                <Text style={styles.name}>{name}</Text>
              </View>
              <Image
                source={require('../images/face.png')}
                style={styles.avatar}
              />
            </View>
            <Budget />
          </View>
        </LinearGradient>
        <View style={styles.containerButton}>
          {titles.map((item, index) => (
            <TouchableOpacity
              activeOpacity={1}
              key={index}
              onPress={() => setSelectedOption(index)}
              style={{
                ...styles.button,
                backgroundColor: selectedOption === index ? '#5d60ce' : '#fff',
              }}>
              <Text
                style={{
                  ...styles.textButton,
                  color: selectedOption === index ? '#fff' : '#5d60ce',
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {selectedOption === 1 ? <Expense /> : <Income />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  containerHeader: {
    paddingTop: 15,
    paddingHorizontal: 22,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    letterSpacing: 1,
    fontWeight: 'bold',
    color: '#fff',
    paddingBottom: 5,
  },
  name: {
    fontSize: 12,
    textTransform: 'capitalize',
    fontWeight: '700',
    letterSpacing: 0.5,
    color: '#fff',
  },
  avatar: {
    width: 42,
    height: 42,
    alignSelf: 'center',
    borderRadius: 21,
    borderWidth: 2,
    borderColor: '#5007c8',
  },
  containerButton: {
    marginTop: 50,
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 6,
    height: 50,
    borderRadius: 10,
    marginHorizontal: 22,
    alignItems: 'center',
  },
  button: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
  },
  textButton: {
    textAlign: 'center',
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 0.5,
    color: '#000',
  },
});
