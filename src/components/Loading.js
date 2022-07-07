import React from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';
import {useGlobalAppContext} from '../context/GlobalAppContext';

const Loading = () => {
  const {appLoading} = useGlobalAppContext();

  return (
    <Modal visible={appLoading} transparent={true}>
      <View style={styles.containerIndicator}>
        <ActivityIndicator size="large" color="#5007c8" />
      </View>
    </Modal>
  );
};

export default Loading;

const styles = StyleSheet.create({
  containerIndicator: {
    flex: 1,
    //backgroundColor: 'rgba(34,34,34,0.6)',
    justifyContent: 'center',
    backgroundColor: '#5d60ce',
  },
});
