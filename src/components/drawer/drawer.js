import React, { Component } from 'react';
import {
  PropTypes,
  StyleSheet,
  navigator,
  View,
  Button,
  Platform,
  ActivityIndicator
} from 'react-native';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
import AdminChatpage from '../admin/adminpage';
import ControlPanel from './ControlPanel';
import Main from './Main';
import AdminChat from '../adminchat/adminchat';
import * as loginAction from '../../actions/login';
import UserProfile from '../userprofile/userprofile';
import * as getSignup from '../../actions/signup';
import ChatPage from '../chatpage/chatpage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation';

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawer: false,
      user: '',
      loader: false,
    };
    this._saveDetails = this._saveDetails.bind(this);
    this.handleChat = this.handleChat.bind(this);
    this.signOut = this.signOut.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }
  drawerColse() {
    this.setState({ drawer: false });
    this.props.onDrawerClose();
  }
  handleChat(id) {
    this.props.navigation.navigate('AdminChat', { cilentId: id });
  }
  componentDidMount() {
    this.props.navigation.setParams({ handleSave: this._saveDetails });
    this.setState({ user: this.props.loggedIn.user.email});
  }
  componentWillReceiveProps(props) {
    if (props.drawer.open === true) {
      this.setState({ drawer: true });
    }
  }
  signOut() {
    this.setState({ drawer: false });
    this.props.onDrawerClose();
    this.props.onSignout();
  }
  updateProfile() {
    this.setState({ drawer: false });
    this.props.onDrawerClose();
    this.props.navigation.navigate('Profile');
  }
  _saveDetails() {
    this.setState({ drawer: true });
  }
  static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: '[ Admin ]',
            headerTitleStyle :{color:'#fff'},
            headerStyle: {backgroundColor:'#3c3c3c'},
            headerLeft: <Icon style={{ marginLeft:15,color:'#fff' }} name={'bars'} size={25} onPress={() => params.handleSave()} />
        };
    };
  render() {
    return (
      <View style={{flex:1}} >
        {this.props.chatdata.isSuccess?<Drawer
          type="overlay"
          open={this.state.drawer}
          content={<ControlPanel onSignOut={this.signOut} profileUpdate={this.updateProfile} />}
          tapToClose
          onClose={() => { this.drawerColse(); }}
          openDrawerOffset={0.3} // 20% gap on the right side of drawer
          panCloseMask={0.2}
          closedDrawerOffset={-3}
          styles={drawerStyles}
          tweenHandler={ratio => ({
            main: { opacity: (2 - ratio) / 2 },
          })}
        >
          {
            this.state.user === 'admin@gmail.com' ? <AdminChatpage onPress={this.handleChat} /> : <ChatPage />
          }
        </Drawer>:
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" />
          </View>}
        </View>
    );
  }
}
const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
  main: { paddingLeft: 3 },
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  loader: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 8,
  },
});
function mapStateToProps(state) {
  return { drawer: state.login.toJS(),loggedIn: state.userauth.toJS(), chatdata: state.chatdata.toJS() };
}
const mapDispatchToProps = dispatch => ({
  onSignout: () => dispatch(getSignup.signout()),
  onDrawerClose: () => dispatch(loginAction.closeDrawer()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Application);
