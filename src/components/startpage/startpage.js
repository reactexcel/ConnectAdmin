import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Platform, Image, Linking, AlertIOS, Navigator, StatusBar,ActivityIndicator } from 'react-native';
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';
import style from './styles';
import SignupPage from '../signuppage/signuppage';
import LoginPage from '../loginpage/loginpage';
import { connect } from 'react-redux';
import { StackNavigator, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AsyncStorage } from 'react-native';
const RNFS = require('react-native-fs');

class StartPage extends Component {
  static navigationOptions = {
    title: '[ADMIN]',
    headerTitleStyle :{ alignSelf:'center', color:'#fff'},
    headerStyle: {backgroundColor:'#3c3c3c'},
  };
  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }
  componentWillMount() {
    FCM.requestPermissions();
    FCM.getFCMToken().then((token) => {
      this.setState({ token });
    });
    this.notificationListner = FCM.on(FCMEvent.Notification, (notif) => {
      if (notif.local_notification) {
        return;
      }
      if (notif.opened_from_tray) {
        return;
      }

      if (Platform.OS === 'ios') {
        switch (notif._notificationType) {
          case NotificationType.Remote:
            notif.finish(RemoteNotificationResult.NewData);
            break;
          case NotificationType.NotificationResponse:
            notif.finish();
            break;
          case NotificationType.WillPresent:
            notif.finish(WillPresentNotificationResult.All);
            break;
        }
      }
      this.showLocalNotification(notif);
    });
  }
  componentWillUnmount() {
    this.notificationListner.remove();
  }
  showLocalNotification(notif) {
    FCM.presentLocalNotification({
      title: notif.title,
      body: notif.body,
      priority: 'high',
      'large_icon': "ic_launcher",
      click_action: notif.click_action,
      show_in_foreground: true,
      local: true,
      lights: true,
      badge: notif.badge,
    });
  }
  handleSignUp() {
    this.props.navigation.navigate('SignUp', { token: this.state.token });
  }
  handleSignIn() {
    this.props.navigation.navigate('LogIn', { token: this.state.token, needVerifyEmail: false });
  }
  render() {
    return (
      <View style={style.OuterContainer}>
        <StatusBar backgroundColor="#3C3C3F" barStyle="light-content" />
        {this.props.user !== undefined && this.props.user =='admin' ?
          <View style={style.loader}>
            <ActivityIndicator
              animating={true}
              style={{ height: 80 }}
              size="large"
              color="grey"
            />
          </View>:<View style={{flex:1}}><View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
          <Text style={{ fontSize: 16 }}>
            THE ANALYTICS ASSISTANT
          </Text>
          <Image
            source={require('../../img/giphy.gif')}
            style={style.imageMiddle}
          />
        </View>
        <View style={style.bottom}>
          <View style={style.button}>
            <TouchableOpacity onPress={() => { this.handleSignUp(); }} style={style.touch1}>
              <Text style={style.text}>
                <Icon name="user-plus" size={20} color="#fff" /> SIGN UP
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.handleSignIn(); }} style={style.touch2}>
              <Text style={style.text}>
                <Icon name="sign-in" size={20} color="#fff" /> SIGN IN
                </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>}
      </View>

    );
  }
}
function mapStateToProps(state) {
  return { loader: state.loader.toJS(), chatdata: state.chatdata.toJS() };
}
const mapDispatchToProps = dispatch => ({
  onGetUserToken: () => dispatch(getToken.getToken()),
  onDrawer: () => dispatch(loginAction.openDrawer()),
  onSetToken: (userID, token) => dispatch(loginAction.sendToken(userID, token)),
  onfetchMessages: () => dispatch(actionchat.getmessages()),
  onLogin: (email, password) => dispatch(loginAction.login(email, password)),
  onSignout: () => dispatch(signoutAction.signout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);
