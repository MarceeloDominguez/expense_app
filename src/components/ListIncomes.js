import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useGlobalAppContext} from '../context/GlobalAppContext';
import {formatDate, formatHours, formatQuantity} from '../helpers';

const ListIncomes = () => {
  const {incomes, handleEditIncome} = useGlobalAppContext();

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.title}>
        {incomes.length === 0 ? 'Sin ingresos' : 'Lista de ingresos'}
      </Text>
      {incomes?.map((item, index) => (
        <TouchableOpacity
          onPress={() => handleEditIncome(item)}
          key={index}
          style={styles.wrapperItem}>
          <View>
            <Text style={styles.income}>{item.income}</Text>
            <Text style={styles.date}>
              {formatDate(item.fecha)}
              {' - '}
              <Text style={styles.date}>{formatHours(item.hora)} hs</Text>
            </Text>
          </View>
          <Text style={styles.amount}>{formatQuantity(item.amount)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ListIncomes;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    marginTop: 22,
  },
  line: {
    borderTopWidth: 0.5,
    borderTopColor: '#5007c8',
  },
  title: {
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    letterSpacing: 0.5,
    marginVertical: 20,
  },
  wrapperItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    alignItems: 'center',
    height: 55,
    borderBottomWidth: 0.5,
    marginBottom: 10,
    borderBottomColor: '#5007c8',
  },
  income: {
    textTransform: 'capitalize',
    letterSpacing: 0.5,
    fontWeight: 'bold',
    color: '#000',
  },
  date: {
    fontSize: 10,
    color: '#000',
    opacity: 0.5,
    lineHeight: 15,
    fontWeight: 'bold',
  },
  amount: {
    color: '#000',
    fontWeight: 'bold',
    opacity: 0.5,
  },
});
