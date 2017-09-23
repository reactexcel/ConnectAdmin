import { StyleSheet, Platform } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

module.exports = StyleSheet.create({
  OuterContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  InsideContainer: {
    flex: 1,
    margin: 10,
    flexDirection: 'column',
  },
  touch: {
    width,
  },
  TextInput: {
    flex: 1,
    padding: 8,
    height: 37,
  },
  TextHolder: {
    borderWidth: 1,
    flexDirection: 'row',
  },
  SecondInput: {
    padding: 8,
    height: 37,
    width: 311,
  },
  InputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    flexDirection: 'row',
    borderColor: '#a3aab1',
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
    marginBottom: (Platform.OS === 'ios') ? 15 : 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#a3aab1',
  },
  errorInput: {
    borderWidth: 1,
    borderColor: '#b22222',
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
  },
  errorborder: {
    marginBottom: 10,
    borderColor: '#b22222',
    borderWidth: 1,
    borderRadius: 5,
  },
  Conatiner: {
    flex: 1,
  },
  text: {
    marginTop: 17,
    textAlign: 'center',
    fontSize: 19,
    color: 'white',
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#3c3c3c',
    flexDirection: 'row',
    height: 58,
  },
  errorbutton: {
    justifyContent: 'center',
    backgroundColor: '#F22613',
    flexDirection: 'row',
    height: 58,
  },
});
