import React, { Component } from 'react';
import { View, TextInput, TouchableHighlight, Text, ActivityIndicator, Image, Platform, AsyncStorage, Keyboard, alert, TouchableOpacity, Alert } from 'react-native';
import style from './styles';
import { NavigationActions } from 'react-navigation';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { connect } from 'react-redux';
import * as loginAction from '../../actions/login';
import * as signoutAction from '../../actions/signup';
import * as action from '../../api/api';
import { Error } from '../error/error';
import ChatPage from '../chatpage/chatpage';
import AdminChatpage from '../admin/adminpage';
import Application from '../drawer/drawer';
import * as actionchat from '../../actions/chatroom';
import FCM from 'react-native-fcm';
import UserProfile from '../userprofile/userprofile';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as getToken from '../../actions/usertoken';

class LoginPage extends Component {
  static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Sign In',
            headerTitleStyle :{ color:'#fff'},
            headerStyle: { backgroundColor:'#3c3c3c'},
            headerTintColor: 'white',
        };
    };
  constructor(props) {
    super(props);
    this.state = {
      Email: '',
      Password: '',
      errormsg: '',
      error: false,
      token: '',
      drawerIcon: '',
      Keyboard: true,
    };
    this.handleSignIn = this.handleSignIn.bind(this);
  }
  componentWillMount() {
    FCM.getFCMToken().then((token) => {
      this.setState({ token });
    });
    Icon.getImageSource('bars', 30).then(source => this.setState({ drawerIcon: source }));
  }

  componentDidMount() {
    if (this.props.userauth.needVerifyEmail) {
      setTimeout(()=> {
        Alert.alert(
          'INFO',
          `Sorry, please check your email and verify your email address and then login again !`,
        );
      }, 50);
    }
  }

  handleSignIn() {
    this.setState({ Keyboard: false });
    const email = this.state.Email;
    const password = this.state.Password;
    if (email && password) {
      if (action.validateEmail(email)) {
        this.props.onLogin(email, password).then((val) => {
          if (val.uid) {
            this.props.onSetToken(val.uid, this.state.token);
/*
              this.props.onfetchMessages().then((val) => {
              });
*/
          } else {
            this.setState({ errormsg: val });
            this.setState({ Email: '', Password: '', error: true });
          }
        });
      } else {
        this.setState({ errormsg: 'Please enter a valid email', error: true });
        this.setState({ Email: '', Password: '' });
      }
    } else {
      this.setState({ errormsg: 'ALL FIELDS ARE REQUIRED', error: true });
    }
  }
  focusNextField(nextField) {
    this.refs[nextField].focus();
  }
  handleDrawer() {
    this.props.onDrawer();
  }
  handleDrawer2() {
    this.props.onDrawer();
  }

  goForgetPasswordPage = () => {
    this.props.navigation.navigate('ForgotPass');
  };

  render() {
    const params = this.props.navigation.state.params;
    console.log('params', params);

    return (
      <View style={style.OuterContainer}>
        {this.props.loader.isLoading ?
          <View style={style.loader}>
            <ActivityIndicator
              animating={this.props.loader.isLoading}
              style={{ height: 80 }}
              size="large"
              color="grey"
            />
          </View> : <View style={{ flex: 1 }}>
            <View style={style.InsideContainer}>
              <View style={style.border}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: 40, backgroundColor: '#3c3c3c', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>
                    <Icon name="envelope-o" size={20} color="#fff" />
                  </View>
                  <TextInput
                    ref="1"
                    autoFocus={this.state.Keyboard}
                    autoCapitalize="none"
                    // nablesReturnKeyAutomatically
                    style={style.SecondInput}
                    onChangeText={Email => this.setState({ Email })}
                    returnKeyType="next"
                    underlineColorAndroid="transparent"
                    keyboardType="email-address"
                    value={this.state.Email}
                    placeholderTextColor={'grey'}
                    placeholder="Email"
                    onSubmitEditing={() => this.focusNextField('2')}
                  />
                </View>
              </View>
              <View style={style.border}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: 40, backgroundColor: '#3c3c3c', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>
                    <Icon name="unlock-alt" size={22} color="#fff" />
                  </View>
                  <TextInput
                    ref="2"
                    autoCapitalize="none"
                    // enablesReturnKeyAutomatically
                    style={style.SecondInput}
                    secureTextEntry
                    underlineColorAndroid="transparent"
                    placeholderTextColor={'grey'}
                    onChangeText={Password => this.setState({ Password })}
                    returnKeyType="done"
                    value={this.state.Password}
                    placeholder="Password"
                    onSubmitEditing={Keyboard.dismiss}
                  />
                </View>
              </View>
              <View style={[Platform.OS === 'ios' ? { alignItems: 'center', justifyContent: 'center', marginLeft: 8 } : { alignItems: 'center', justifyContent: 'center', marginLeft: 14 }]}>
                <View style={[Platform.OS === 'ios' ? { margin: 8, flexDirection: 'row' } : { margin: 5, flexDirection: 'row' }]}>
                  <Text style={{ fontSize: 15 }}>
                    Forget password ?
                  </Text>
                  <TouchableOpacity onPress={() => { this.goForgetPasswordPage(); }}>
                    <Text style={{ fontSize: 15, color: '#22A7F0', marginLeft: 3 }}>
                      CLICK HERE
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Error text={this.state.errormsg} />
            </View>
            <View style={style.bottom}>
              <TouchableHighlight onPress={() => { this.handleSignIn(); }} style={style.touch}>
                <View style={style.button}>
                  <Text style={style.text}>
                    <Icon name="sign-in" size={20} color="#fff" /> SIGN IN
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>}
        {Platform.OS === 'ios' ? <KeyboardSpacer /> : null}
      </View>
    );
  }
}
function mapStateToProps(state) {
  return { loader: state.loader.toJS(), chatdata: state.chatdata.toJS(), userauth: state.userauth.toJS() };
}
const mapDispatchToProps = dispatch => ({
  onGetUserToken: () => dispatch(getToken.getToken()),
  onDrawer: () => dispatch(loginAction.openDrawer()),
  onSetToken: (userID, token) => dispatch(loginAction.sendToken(userID, token)),
  onfetchMessages: () => dispatch(actionchat.getmessages()),
  onLogin: (email, password) => dispatch(loginAction.login(email, password)),
  onSignout: () => dispatch(signoutAction.signout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
