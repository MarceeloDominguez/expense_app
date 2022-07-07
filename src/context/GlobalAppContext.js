import React, {createContext, useState, useContext, useEffect} from 'react';
import {Alert} from 'react-native';

const GlobalContext = createContext();

export const GlobalAppContext = ({children}) => {
  const [appLoading, setAppLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [budget, setBudget] = useState(0);
  const [gastosTotales, setGastosTotales] = useState(0);
  const [available, setAvailable] = useState(0);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [incomeEdit, setIncomeEdit] = useState({});
  const [expenseEdit, setExpenseEdit] = useState({});
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const incomeTotal = incomes.reduce(
      (total, income) => Number(income.amount) + total,
      0,
    );

    const expenseTotal = expenses.reduce(
      (total, expense) => Number(expense.amount) + total,
      0,
    );
    const totalAvailable = incomeTotal - expenseTotal;

    if (incomeTotal !== 0 && expenseTotal !== 0) {
      const nuevoPorcentaje =
        ((incomeTotal - totalAvailable) / incomeTotal) * 100;

      setTimeout(() => {
        setPorcentaje(nuevoPorcentaje);
      }, 1000);
    } else {
      setPorcentaje(0);
    }

    setBudget(incomeTotal);
    setGastosTotales(expenseTotal);
    setAvailable(totalAvailable);
  }, [incomes, expenses]);

  //INGRESOS

  const handleIncome = values => {
    if (values.id) {
      const incomeUpdated = incomes.map(i => (i.id === values.id ? values : i));
      setIncomes(incomeUpdated);
    } else {
      const random = Math.random().toString(36).substring(2, 11);
      values.id = random;
      values.fecha = Date.now();
      values.hora = Date.now();
      setIncomes([...incomes, values]);
    }

    setModalVisible(!modalVisible);
  };

  const handleEditIncome = item => {
    setIncomeEdit(item);
    setModalVisible(!modalVisible);
  };

  const handleDeleteIncome = (id, setValues) => {
    Alert.alert(
      '¿Deseas eliminar este ingreso?',
      'Un ingreso eliminado no se puede recuperar',
      [
        {text: 'No', style: 'cancel'},
        {
          text: 'Sí, Eliminar',
          onPress: () => {
            const incomeDelete = incomes.filter(income => income.id !== id);

            setIncomes(incomeDelete);
            setModalVisible(!modalVisible);
            setIncomeEdit({});
            setValues({});
          },
        },
      ],
    );
  };

  //GASTOS

  const handleExpense = values => {
    if (values.id) {
      const expenseUpdated = expenses.map(e =>
        e.id === values.id ? values : e,
      );
      setExpenses(expenseUpdated);
    } else {
      const random = Math.random().toString(36).substring(2, 11);
      values.id = random;
      values.fecha = Date.now();
      values.hora = Date.now();
      setExpenses([...expenses, values]);
    }

    setModalVisible(!modalVisible);
  };

  const handleEditExpense = item => {
    setExpenseEdit(item);
    setModalVisible(!modalVisible);
  };

  const handleDeleteExpense = (id, setValues) => {
    Alert.alert(
      '¿Deseas eliminar este gasto?',
      'Un gasto eliminado no se puede recuperar',
      [
        {text: 'No', style: 'cancel'},
        {
          text: 'Sí, Eliminar',
          onPress: () => {
            const expenseDelete = expenses.filter(expense => expense.id !== id);

            setExpenses(expenseDelete);
            setModalVisible(!modalVisible);
            setExpenseEdit({});
            setValues({});
          },
        },
      ],
    );
  };

  return (
    <GlobalContext.Provider
      value={{
        appLoading,
        setAppLoading,
        modalVisible,
        setModalVisible,
        budget,
        gastosTotales,
        available,
        handleIncome,
        handleExpense,
        incomes,
        expenses,
        setIncomes,
        setExpenses,
        handleEditIncome,
        handleEditExpense,
        setIncomeEdit,
        setExpenseEdit,
        incomeEdit,
        expenseEdit,
        handleDeleteIncome,
        handleDeleteExpense,
        porcentaje,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalAppContext = () => {
  const {
    appLoading,
    setAppLoading,
    modalVisible,
    setModalVisible,
    budget,
    gastosTotales,
    available,
    handleIncome,
    handleExpense,
    incomes,
    expenses,
    setIncomes,
    setExpenses,
    handleEditIncome,
    handleEditExpense,
    setIncomeEdit,
    setExpenseEdit,
    incomeEdit,
    expenseEdit,
    handleDeleteIncome,
    handleDeleteExpense,
    porcentaje,
  } = useContext(GlobalContext);

  return {
    appLoading,
    setAppLoading,
    modalVisible,
    setModalVisible,
    budget,
    gastosTotales,
    available,
    handleIncome,
    handleExpense,
    incomes,
    expenses,
    setIncomes,
    setExpenses,
    handleEditIncome,
    handleEditExpense,
    setIncomeEdit,
    setExpenseEdit,
    incomeEdit,
    expenseEdit,
    handleDeleteIncome,
    handleDeleteExpense,
    porcentaje,
  };
};
