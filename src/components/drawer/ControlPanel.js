import {
  PropTypes,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ControlPanel extends Component {
  render() {
    const { closeDrawer } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.controlText}>[ ADMIN ]</Text>
        <TouchableOpacity style={styles.button} onPress={() => { this.props.profileUpdate(); }}>
          <Text style={styles.text}>
            <Icon name="user" size={22} color="white" />  PROFILE
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { this.props.onSignOut(); }}>
          <Text style={styles.text}>
            <Icon name="sign-out" size={22} color="white" /> SIGN OUT
            </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#3c3c3c',
  },
  controlText: {
    textAlign: 'center',
    fontSize: 22,
    color: 'white',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#3c3c3c',
    padding: 10,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});
