import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useGlobalAppContext} from '../context/GlobalAppContext';
import {formatQuantity} from '../helpers';
import CircularProgress from 'react-native-circular-progress-indicator';

const Budget = () => {
  const {budget, gastosTotales, available, porcentaje} = useGlobalAppContext();

  return (
    <View style={styles.container}>
      <View style={styles.containerResult}>
        <Text style={styles.budget}>{formatQuantity(available)}</Text>
        <View style={{...styles.wrapperInfo, marginBottom: 5}}>
          <Text style={styles.available}>Ingresos:</Text>
          <Text style={{...styles.available, opacity: 0.5}}>
            {formatQuantity(budget)}
          </Text>
        </View>
        <View style={styles.wrapperInfo}>
          <Text style={styles.expense}>Gastado:</Text>
          <Text style={{...styles.expense, opacity: 0.5}}>
            {formatQuantity(gastosTotales)}
          </Text>
        </View>
      </View>
      <View style={styles.containerCircle}>
        <CircularProgress
          value={porcentaje}
          duration={1000}
          valueSuffix={'%'}
          title="Gastado"
          titleStyle={styles.titleCircle}
          inActiveStrokeOpacity={porcentaje > 100 ? 1 : 0.5}
          progressValueFontSize={16}
          activeStrokeColor={porcentaje > 100 ? '#FE0A49' : '#2465FD'}
          activeStrokeSecondaryColor={porcentaje > 100 ? '#FE0A49' : '#5007c8'}
          inActiveStrokeColor={porcentaje > 100 ? '#FE0A49' : '#ccc'}
        />
      </View>
    </View>
  );
};

export default Budget;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 180,
    transform: [{translateY: 20}],
    borderRadius: 10,
    elevation: 12,
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  containerResult: {
    justifyContent: 'center',
    flex: 1,
  },
  budget: {
    fontSize: 22,
    fontWeight: 'bold',
    top: -15,
    textAlign: 'center',
    letterSpacing: 0.4,
    color: '#2465FD',
  },
  wrapperInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  available: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: 0.4,
  },
  expense: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: 0.4,
  },
  containerCircle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleCircle: {
    fontSize: 12,
    bottom: 6,
    fontWeight: 'bold',
    letterSpacing: 0.4,
  },
});
