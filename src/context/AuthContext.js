import React, {createContext, useReducer, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchGet, fetchPost} from '../helpers/fetch';
import {TYPES} from './authAction';
import {authReducer} from './authReducer';
import {useGlobalAppContext} from './GlobalAppContext';

export const authInitialState = {
  isAuthenticated: false,
  token: null,
  name: null,
  error: false,
};

const ContextAuth = createContext({});

export const AuthContext = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);
  const {setAppLoading} = useGlobalAppContext();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    setAppLoading(true);

    if (!token) {
      setAppLoading(false);
      return authInitialState;
    }

    try {
      const resp = await fetchGet('auth/registernew', 'GET').then(res =>
        res.json(),
      );

      if (resp.ok) {
        await AsyncStorage.setItem('token', resp.token);
        setAppLoading(false);
        dispatch({
          type: TYPES.SING_IN_SUCCESS,
          payload: {
            uid: resp.uid,
            name: resp.name,
          },
        });
      } else {
        setAppLoading(false);
        dispatch({
          type: TYPES.SING_IN_FAIL,
        });
      }
    } catch (error) {
      console.log(error);
      setAppLoading(false);
      dispatch({
        type: TYPES.SING_IN_FAIL,
      });
    }
  };

  const singIn = async ({values}) => {
    const {email, password} = values;

    setAppLoading(true);

    dispatch({
      type: TYPES.SING_IN_POST,
    });

    try {
      const resp = await fetchPost('auth', {email, password}, 'POST').then(
        res => res.json(),
      );

      if (resp.ok) {
        await AsyncStorage.setItem('token', resp.token);
        setAppLoading(false);
        dispatch({
          type: TYPES.SING_IN_SUCCESS,
          payload: {
            uid: resp.uid,
            name: resp.name,
          },
        });
      } else {
        setAppLoading(false);
        dispatch({
          type: TYPES.SING_IN_FAIL,
        });
      }
    } catch (error) {
      console.log(error);
      setAppLoading(false);
      dispatch({
        type: TYPES.SING_IN_FAIL,
      });
    }
  };

  const register = async ({values}) => {
    const {name, email, password} = values;

    setAppLoading(true);

    dispatch({
      type: TYPES.SING_IN_POST,
    });

    try {
      const resp = await fetchPost(
        'auth/register',
        {name, email, password},
        'POST',
      ).then(res => res.json());

      if (resp.ok) {
        await AsyncStorage.setItem('token', resp.token);
        setAppLoading(false);
        dispatch({
          type: TYPES.SING_IN_SUCCESS,
          payload: {
            uid: resp.uid,
            name: resp.name,
          },
        });
      } else {
        setAppLoading(false);
        dispatch({
          type: TYPES.SING_IN_FAIL,
        });
      }
    } catch (error) {
      console.log(error);
      setAppLoading(false);
      dispatch({
        type: TYPES.SING_IN_FAIL,
      });
    }
  };

  const logout = async () => {
    //setAppLoading(true);
    await AsyncStorage.removeItem('token');

    dispatch({
      type: TYPES.LOGOUT,
    });
  };

  return (
    <ContextAuth.Provider value={{register, singIn, logout, state}}>
      {children}
    </ContextAuth.Provider>
  );
};

export const useContextAuth = () => {
  const {register, state, singIn, logout} = useContext(ContextAuth);

  return {register, state, singIn, logout};
};
