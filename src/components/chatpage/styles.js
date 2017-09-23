import { StyleSheet, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Dimensions } from 'react-native';

module.exports = StyleSheet.create({
  OuterContainer: {
    height: (Platform.OS === 'ios') ? height - 65 : height - 80,
  },
  leftButtonTitle: {
    color: 'red',
  },
});
