import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  OuterContainer: {
    flex: 1,
  },
  loader: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 8,
  },
  divider: {
    marginTop: 10,
    marginLeft: 86,
    marginRight: 10,
    backgroundColor: 'grey',
    height: 0.3,
  },
  text: {
    marginTop: 70,
    textAlign: 'center',
  },
});
