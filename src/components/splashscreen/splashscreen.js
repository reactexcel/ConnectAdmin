import React, { Component } from 'react';
import { Text, StyleSheet, View, ActivityIndicator, Image} from 'react-native';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    marginBottom: 33,
  },
  imageMiddle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom:20,
  },
});

class SplashScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../img/bell.png')}
          style={styles.imageMiddle}
        />
        <Text style={styles.heading}>Talking To Admin</Text>
        <ActivityIndicator size="small" />
      </View>
    );
  }
}

export default SplashScreen;
