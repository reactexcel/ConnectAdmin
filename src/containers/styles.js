import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');


module.exports = StyleSheet.create({
  OuterContainer: {
    flex: 1,
  },
  bottom: {
    flex: 0.3,
    justifyContent: 'flex-end',
  },
  touch1: {
    justifyContent: 'center',
    width: width / 2,
    marginTop: 5,
    marginBottom: 5,
    borderRightWidth: 0.5,
    borderRightColor: '#a3aab1',
  },
  touch2: {
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'center',
    width: width / 2,
  },
  button: {
    backgroundColor: '#3c3c3c',
    flexDirection: 'row',
    height: 63,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
  imageMiddle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
  },
});
