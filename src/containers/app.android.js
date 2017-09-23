import React, { Component } from 'react';
import Root from './router';
import { BackAndroid } from 'react-native';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import * as messages from '../actions/chatroom';
// import * as Token from '../actions/usertoken';
import * as loginAction from '../actions/authcheck';
import { bindActionCreators } from 'redux';

class AppNavigator extends Component {
  constructor(props) {
    super(props);
    // this.props.dispatch((Token.getToken()));
    // this.props.dispatch((messages.getmessages()));
    this.props.dispatch((loginAction.verifyAuth()));
  }
  componentDidMount(props) {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const { dispatch, nav } = this.props;
      if (nav.index === 0) {
        return false;
      }

      dispatch(NavigationActions.back());
      return true;
    });
  }
  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress');
  }
  render() {
    return (
      <Root
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
        })}
      />
    );
  }
}

function mapStateToProps(state) {
  return { nav: state.nav, loggedIn: state.userauth.toJS() };
}
function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators(dispatch));
}
export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
