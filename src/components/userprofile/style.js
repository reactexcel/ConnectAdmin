import { StyleSheet, Platform } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

module.exports = StyleSheet.create({
  OuterContainer: {
    flex: 1,
    flexDirection: 'column',
    // borderWidth: 1,
    backgroundColor: 'white',
    // marginBottom: 50,
  },
  InsideContainer: {
    flex: 0.3,
    //borderWidth: 1,
    marginTop: 10,
    marginRight: 10,
    marginLeft: (Platform.OS === 'ios')?74:10,
    flexDirection: 'column',
  },
  TextInput: {
    flex: 1,
    height: 40,
  },
  TextHolder: {
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
  },
  SecondInput: {
    paddingTop: 6,
    paddingBottom: 6,
    height: 32,
    width: 200,
  },
  SeInput: {
    paddingTop: 6,
    paddingBottom: 6,
    height: 32,
    width: 100,
  },
  InputContainer: {
    flexDirection: 'row',
  },
  bottom: {
    flex: 0.110,
    // borderWidth: 1,
    justifyContent: 'flex-end',
  },
  loader: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 8,
  },
  border: {
    marginBottom: 5,
    // borderWidth: 1,
    // borderBottomWidth: 1,
    // borderRadius: 5,
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
  divider: {
    marginTop: 10,
    borderWidth: 0.3,
    borderColor: 'grey',
    // marginTop: 1,
    marginLeft: 15,
    marginRight: 15,
    // backgroundColor: 'red',
    // height: 0.1,
  },
});
