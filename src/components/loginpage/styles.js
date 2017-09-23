import { StyleSheet, Platform } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

module.exports = StyleSheet.create({
  OuterContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  InsideContainer: {
    flex: 0.3,
    margin: 10,
    flexDirection: 'column',
  },
  TextInput: {
    flex: 1,
    height: 40,
  },
  TextHolder: {
    borderWidth: 0,
    flex: 1,
    flexDirection: 'row',
  },
  SecondInput: {
    padding: 8,
    height: 37,
    width: 311,
  },
  InputContainer: {
    flexDirection: 'row',
    borderColor: '#b22222',
  },
  bottom: {
    flex: 0.15,
    justifyContent: 'flex-end',
  },
  loader: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 8,
  },
  border: {
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#a3aab1',

  },
  errorborder: {
    marginBottom: 10,
    borderColor: '#b22222',
    borderWidth: 1,
    borderRadius: 5,
  },
  touch: {
    width,
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#3c3c3c',
    flexDirection: 'row',
    height: 58,
  },
  text: {
    marginTop: 17,
    textAlign: 'center',
    fontSize: 19,
    color: 'white',
  },
});
