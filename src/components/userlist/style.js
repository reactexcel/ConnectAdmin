import { StyleSheet, Platform } from 'react-native';

module.exports = StyleSheet.create({
  OuterContainer: {
    flexDirection: 'column',
  },
  msgtext: {
    fontWeight: 'bold',
    color: 'grey',
    fontSize: 14,
  },
  timetext: {
    marginTop: 6,
    color: 'grey',
    fontSize: 11.5,
    fontWeight: 'bold',
  },
  InsideContainer: {
    marginLeft: (Platform.OS === 'ios') ? 64 : 15,
    flex: 1,
    marginTop: 6,
    flexDirection: 'column',
  },
  NameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  touch: {
    flex: 1,
    // borderWidth: 1,
    margin: 8,
    flexDirection: 'row',
    marginRight: 10,
  },
  divider: {
    borderWidth: 0.3,
    marginTop: 1,
    marginLeft: (Platform.OS === 'ios') ? 82 : 83,
    marginRight: 10,
    backgroundColor: 'grey',
    // height: 0.1,
  },
});
