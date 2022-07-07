import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useGlobalAppContext} from '../context/GlobalAppContext';
import ExpenseForm from './ExpenseForm';
import ListExpenses from './ListExpenses';

const Expense = () => {
  const {setModalVisible} = useGlobalAppContext();

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.containerButton}
          activeOpacity={0.7}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textButton}>Agregar gastos</Text>
        </TouchableOpacity>
      </View>
      <ExpenseForm />
      <ListExpenses />
    </View>
  );
};

export default Expense;

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
