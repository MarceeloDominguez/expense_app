import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config';

const baseUrl = config.BASE_URL;

export const fetchPost = (endpoint, data, method) => {
  const url = `${baseUrl}/${endpoint}`;

  return fetch(url, {
    method,
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const fetchGet = async (endpoint, method) => {
  const url = `${baseUrl}/${endpoint}`;
  const token = await AsyncStorage.getItem('token');

  return fetch(url, {
    method,
    headers: {
      'x-token': token,
    },
  });
};
