import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {AuthContext} from './src/context/AuthContext';
import {GlobalAppContext} from './src/context/GlobalAppContext';
import Navigation from './src/navigation/Navigation';

const App = () => {
  return (
    <GlobalAppContext>
      <AuthContext>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </AuthContext>
    </GlobalAppContext>
  );
};

export default App;
