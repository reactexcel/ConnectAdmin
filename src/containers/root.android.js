import { Provider } from 'react-redux';
import React from 'react';
import store from '../store/configure-store';
import AppNavigator from './app.android';
import * as firebase from 'firebase';
import { config } from '../config/config';
import { AsyncStorage } from 'react-native';

const FbApp = firebase.initializeApp(config);
module.exports.FBApp = FbApp.database();
// firebase.getDefaultConfig().setPersistenceEnabled(true);

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
