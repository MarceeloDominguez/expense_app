import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View, ScrollView, Modal} from 'react-native';
import {useGlobalAppContext} from '../context/GlobalAppContext';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';
import {useFormik} from 'formik';
import * as Yup from 'yup';

const initialValues = {
  income: '',
  amount: '',
};
const SCHEME_VALIDATION = Yup.object().shape({
  income: Yup.string().required('campo requerido'),
  amount: Yup.number()
    .typeError('valor invalido')
    .required('campo requerido')
    .positive('el valor tiene que ser positivo'),
});

const IncomeForm = () => {
  const amountRef = useRef();
  const {
    setModalVisible,
    modalVisible,
    handleIncome,
    setIncomeEdit,
    incomeEdit,
    handleDeleteIncome,
  } = useGlobalAppContext();
  const {handleChange, handleSubmit, values, errors, resetForm, setValues} =
    useFormik({
      initialValues,
      validationSchema: SCHEME_VALIDATION,
      onSubmit: values => {
        handleIncome(values);
        resetForm();
      },
    });

  useEffect(() => {
    if (incomeEdit.income) {
      setValues(incomeEdit);
    }
  }, [incomeEdit]);

  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: 'rgba(0,0,0,0.8)',
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.containerModal}>
          <Text style={styles.title}>
            {values.id ? 'Editar o eliminar ingreso' : 'Agregar un ingreso'}
          </Text>
          <CustomInput
            label="Nombre del ingreso"
            placeholder="Ej: sueldo"
            value={values.income}
            onChangeText={handleChange('income')}
            errorMessage={errors.income}
            onSubmitEditing={() => amountRef.current.focus()}
          />
          <CustomInput
            label="Monto del ingreso"
            placeholder="$ 0.00"
            value={values.amount}
            onChangeText={handleChange('amount')}
            errorMessage={errors.amount}
            keyboardType="numeric"
            customRef={amountRef}
            onSubmitEditing={handleSubmit}
          />
          <View style={styles.wrapperButton}>
            <CustomButton
              text={values.id ? 'Editar' : 'Agregar'}
              containerStyle={styles.containerStyleAdd}
              onPress={() => handleSubmit()}
              textStyle={styles.textStyle}
            />
            {values.id && (
              <CustomButton
                text="Eliminar"
                containerStyle={styles.containerStyleDelete}
                onPress={() => {
                  handleDeleteIncome(values.id, setValues);
                }}
                textStyle={styles.textStyle}
              />
            )}
            <CustomButton
              text="Cancelar"
              containerStyle={styles.containerStyleCancel}
              onPress={() => {
                setModalVisible(false), setIncomeEdit({}), setValues({});
              }}
              textStyle={styles.textStyle}
            />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default IncomeForm;

const styles = StyleSheet.create({
  containerModal: {
    backgroundColor: '#000',
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 20,
    marginTop: 160,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  wrapperButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  containerStyleAdd: {
    backgroundColor: '#5d60ce',
    width: 100,
  },
  containerStyleDelete: {
    backgroundColor: '#FE0A49',
    width: 100,
  },
  containerStyleCancel: {
    backgroundColor: '#7B938E',
    width: 100,
  },
  textStyle: {
    color: '#fff',
  },
});
