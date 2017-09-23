import React, { Component } from 'react';
import { View, TextInput, TouchableHighlight, Text, ActivityIndicator, Image, Platform, AsyncStorage, Keyboard, Alert } from 'react-native';
import style from './styles';
import { NavigationActions } from 'react-navigation';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { connect } from 'react-redux';
import * as loginAction from '../../actions/login';
import * as signupAction from '../../actions/signup';
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

class ForgotPasswordPage extends Component {
  static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Forgot password',
            headerTitleStyle :{ color:'#fff'},
            headerStyle: { backgroundColor:'#3c3c3c'},
            headerTintColor: 'white',
        };
    };
  constructor(props) {
    super(props);
    this.state = {
      Email: '',
      errormsg: '',
      error: false,
      token: '',
      drawerIcon: '',
      Keyboard: true,
    };
    this.handleResetPassword = this.handleResetPassword.bind(this);
  }

  componentWillMount() {
    FCM.getFCMToken().then((token) => {
      this.setState({ token });
    });
    Icon.getImageSource('bars', 30).then(source => this.setState({ drawerIcon: source }));
  }

  handleResetPassword() {
    this.setState({ Keyboard: false });
    const email = this.state.Email;

    if (email ) {
      if (action.validateEmail(email)) {
        this.props.onResetPassword(email).then((val) => {
          Alert.alert(
            'INFO',
            `Please check your email for password reset`,
          );

          this.props.navigation.goBack();
        }, err => {
          this.setState({ errormsg: err, error: true });
        });
      } else {
        this.setState({ errormsg: 'Please enter a valid email', error: true });
        this.setState({ Email: '' });
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
  render() {
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
              <Error text={this.state.errormsg} />
            </View>
            <View style={style.bottom}>
              <TouchableHighlight onPress={() => { this.handleResetPassword(); }} style={style.touch}>
                <View style={style.button}>
                  <Text style={style.text}>
                    <Icon name="sign-in" size={20} color="#fff" /> SEND EMAIL
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
  return { loader: state.loader.toJS(), chatdata: state.chatdata.toJS() };
}

const mapDispatchToProps = dispatch => ({
  onGetUserToken: () => dispatch(getToken.getToken()),
  onDrawer: () => dispatch(loginAction.openDrawer()),
  onSetToken: (userID, token) => dispatch(loginAction.sendToken(userID, token)),
  onResetPassword: (email) => dispatch(signupAction.resetPassword(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);
