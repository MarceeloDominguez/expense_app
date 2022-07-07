import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useGlobalAppContext} from '../context/GlobalAppContext';

import IncomeForm from './IncomeForm';
import ListIncomes from './ListIncomes';

const Income = () => {
  const {setModalVisible} = useGlobalAppContext();

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.containerButton}
          activeOpacity={0.7}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textButton}>Agregar ingresos</Text>
        </TouchableOpacity>
      </View>
      <IncomeForm />
      <ListIncomes />
    </View>
  );
};

export default Income;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  containerButton: {
    width: 160,
    alignItems: 'center',
    marginTop: 20,
  },
  textButton: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    color: '#5007c8',
  },
});
