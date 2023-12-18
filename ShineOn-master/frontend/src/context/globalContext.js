import React, { useContext, useState } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_API + '/api/v1/';
const BASE_URL2 = "http://localhost:4001/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  //calculate incomes
  const addIncome = async (income) => {
    await axios.post(`${BASE_URL}add-income`, income).catch((err) => {
      setError(err.response.data.message);
    });
    getIncomes();
  };

  const getIncomes = async () => {
    const response = await axios.get(`${BASE_URL}get-incomes`);
    setIncomes(response.data);
  };

  const deleteIncome = async (id) => {
    await axios.delete(`${BASE_URL}delete-income/${id}`);
    getIncomes();
  };

  const updateIncome = async (id) => {
    await axios.patch(`${BASE_URL}update-income/${id}`);
    getIncomes();
  };

  
  const searchHandle = async (event) =>{
    let key1 = event.target.value;
    if(key1){
        let result = await fetch(`${BASE_URL2}search-income/${key1}`);
        result = await result.json()
    if(result){
        setIncomes(result)
    }
    }else{
        getIncomes();
    }
    
}

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  //calculate incomes
  const addExpense = async (income) => {
    await axios.post(`${BASE_URL}add-expense`, income).catch((err) => {
      setError(err.response.data.message);
    });
    getExpenses();
  };

  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}get-expenses`);
    setExpenses(response.data);
    console.log(response.data);
  };

  const deleteExpense = async (id) => {
    await axios.delete(`${BASE_URL}delete-expense/${id}`);
    getExpenses();
  };
  const updateExpense = async (id) => {
    await axios.patch(`${BASE_URL}update-expense/${id}`);
    getExpenses();
  };

  const searchHandle2 = async(event) =>{
    let key2 = event.target.value;
    if(key2){
        let result = await fetch(`${BASE_URL2}search-expense/${key2}`);
        result = await result.json()
    if(result){
        setExpenses(result)
    }
    }else{
        getExpenses();
    
    }
  }

  const totalExpenses = () => {
    let totalIncome = 0;
    expenses.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
        updateIncome,
        updateExpense,
        searchHandle,
        searchHandle2
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

