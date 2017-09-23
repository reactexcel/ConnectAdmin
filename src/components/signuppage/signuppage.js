import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TextInput, ActivityIndicator, TouchableHighlight, Text, TouchableOpacity, Linking, AlertIOS, Platform } from 'react-native';
import style from './styles';
import { Error } from '../error/error';
import { CheckBox } from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as getSignup from '../../actions/signup';
import ChatPage from '../chatpage/chatpage';
import * as action from '../../api/api';
import * as actionchat from '../../actions/chatroom';
import FCM from 'react-native-fcm';
import Icon from 'react-native-vector-icons/FontAwesome';
import { URL } from '../../config/config';
import Application from '../drawer/drawer';
import * as loginAction from '../../actions/login';
import * as getToken from '../../actions/usertoken';
import * as push from '../../actions/pushnotification';


class SignupPage extends Component {
  static navigationOptions = {
    title: 'Sign Up',
    headerTintColor: 'white',
    headerTitleStyle :{ color:'#fff'},
    headerStyle: {backgroundColor:'#3c3c3c'},
  };
  constructor(props) {
    super(props);
    this.state = {
      FirstName: '',
      LastName: '',
      Email: '',
      Password: '',
      error: false,
      checked: false,
      errormsg: '',
      token: '',
      drawerIcon: '',
      Keyboard: true,
    };
  }
  componentWillMount() {
    Icon.getImageSource('bars', 30).then(source => this.setState({ drawerIcon: source }));
    FCM.getFCMToken().then((token) => {
      this.setState({ token });
    });
  }
  sendNotificationWithData(firstname, lastname, email) {
    const token = this.props.user.data.dvSXndNBB4ZTLaUj8nSi563AbZq1.profile.cstoken;
    const name = (`${firstname} ${lastname}`);
    const body = {
      to: token,
      notification: {
        title: name,
        body: email,
        sound: 'default',
        icon: '../../img/ic_stat_bell.png',
        click_action: 'fcm.ACTION.HELLO',
        badge: 1,
      },
      priority: 'high',
    };
    this.props.onSendNotification(JSON.stringify(body), 'notification-data');
  }
  handleSignUp() {
    this.setState({ Keyboard: false });
    const firstname = this.state.FirstName;
    const lastname = this.state.LastName;
    const email = this.state.Email;
    const password = this.state.Password;
    const checkbox = this.state.checked;
    const token = this.state.token;
    if (firstname && lastname && email && password && checkbox === true) {
      if (action.validateEmail(email)) {
        this.props.onSignup(firstname, lastname, email, password, token).then((val) => {
          if (val.uid) {
            this.props.onUserProfile(val.uid, firstname, lastname, token);
              this.props.fetchMessages().then(() => {
                this.sendNotificationWithData(firstname, lastname, email);
              });
          } else {
            this.setState({ errormsg: val, error: true });
            this.setState({ FirstName: '', LastName: '', Email: '', Password: '' });
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
  handleCheckbox() {
    if (this.state.checked === true) {
      this.setState({ checked: false });
    } else if (this.state.checked === false) {
      this.setState({ checked: true });
    }
  }
  _signOut() {
    this.props.onSignout();
    this.props.navigator.popToTop({});
  }
  handleDrawer() {
    this.props.onDrawer();
  }
  openPolicies() {
    Linking.canOpenURL(URL).then((supported) => {
      if (supported) {
        Linking.openURL(URL);
      } else {
        AlertIOS.alert(
              'WARNING',
              `Don't know how to open URI: ${URL}`,
            );
      }
    });
  }
  learnMore() {
    Linking.canOpenURL(URL).then((supported) => {
      if (supported) {
        Linking.openURL(URL);
      } else {
        AlertIOS.alert(
              'WARNING',
              `Don't know how to open URI: ${URL}`,
            );
      }
    });
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
          </View> :
          <View style={{ flex: 1 }}>
            <View style={style.InsideContainer}>
              <View style={style.InputContainer}>
                <View style={{ width: 40, backgroundColor: '#3c3c3c', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>
                  <Icon name="user" size={22} color="#fff" />
                </View>
                <TextInput
                  ref="1"
                  autoFocus={this.state.Keyboard}
                  enablesReturnKeyAutomatically
                  style={style.TextInput}
                  onChangeText={FirstName => this.setState({ FirstName })}
                  returnKeyType="next"
                  placeholderTextColor={'grey'}
                  value={this.state.FirstName}
                  placeholder="FirstName"
                  onSubmitEditing={() => this.focusNextField('2')}
                />
                <TextInput
                  ref="2"
                  enablesReturnKeyAutomatically
                  style={style.TextInput}
                  onChangeText={LastName => this.setState({ LastName })}
                  returnKeyType="next"
                  value={this.state.LastName}
                  placeholder="LastName"
                  placeholderTextColor={'grey'}
                  onSubmitEditing={() => this.focusNextField('3')}
                />
              </View>
              <View style={style.border}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: 40, backgroundColor: '#3c3c3c', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>
                    <Icon name="envelope-o" size={20} color="#fff" />
                  </View>
                  <TextInput
                    ref="3"
                    autoCapitalize="none"
                    enablesReturnKeyAutomatically
                    style={style.SecondInput}
                    onChangeText={Email => this.setState({ Email })}
                    returnKeyType="next"
                    keyboardType="email-address"
                    value={this.state.Email}
                    placeholder="Email"
                    placeholderTextColor={'grey'}
                    onSubmitEditing={() => this.focusNextField('4')}
                  />
                </View>
              </View>
              <View style={style.border}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: 40, backgroundColor: '#3c3c3c', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>
                    <Icon name="unlock-alt" size={22} color="#fff" />
                  </View>
                  <TextInput
                    ref="4"
                    enablesReturnKeyAutomatically
                    style={style.SecondInput}
                    secureTextEntry
                    onChangeText={Password => this.setState({ Password })}
                    returnKeyType="go"
                    placeholderTextColor={'grey'}
                    value={this.state.Password}
                    placeholder="Password"
                  />
                </View>
              </View>
              <Error text={this.state.errormsg} />
              <View style={{ margin: 2 }} />
              <TouchableOpacity onPress={() => { this.handleCheckbox(); }}>
                <View style={{ flexDirection: 'row' }}>
                  <CheckBox
                    containerStyle={{ marginLeft: 10, width: 28, backgroundColor: 'transparent', borderWidth: 0, padding: 1 }}
                    title=" "
                    checkedIcon="check-square-o"
                    uncheckedIcon="square-o"
                    checkedColor="#3c3c3c"
                    uncheckedColor={this.state.error ? 'red' : 'grey'}
                    onPress={() => { this.handleCheckbox(); }}
                    checked={this.state.checked}
                  />
                  <View style={{ marginTop: 8, flexDirection: 'row' }}>
                    <Text style={{ fontSize: 15, marginRight: 3 }} >
                    I agree with the Admin
                  </Text>
                    <TouchableOpacity onPress={() => { this.openPolicies(); }}>
                      <Text style={{ fontSize: 15, color: '#22A7F0' }} >
                       Terms & Policies
                    </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={[Platform.OS === 'ios' ? { alignItems: 'center', justifyContent: 'center', marginLeft: 8 } : { alignItems: 'center', justifyContent: 'center', marginLeft: 14 }]}>
                <View style={[Platform.OS === 'ios' ? { margin: 8, flexDirection: 'row' } : { margin: 5, flexDirection: 'row' }]}>
                  <Text style={{ fontSize: 15 }}>
                  Learn more about Admin ?
                </Text>
                  <TouchableOpacity onPress={() => { this.learnMore(); }}>
                    <Text style={{ fontSize: 15, color: '#22A7F0', marginLeft: 3 }}>
                      CLICK HERE
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={style.bottom}>
              <TouchableHighlight onPress={() => { this.handleSignUp(); }} style={style.touch}>
                <View style={style.button}>
                  <Text style={style.text}>
                    <Icon name="user-plus" size={20} color="#fff" /> SIGN UP
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
            {Platform.OS === 'ios' ? <KeyboardSpacer /> : null}
          </View>}
      </View>
    );
  }
}
function mapStateToProps(state) {
  return { loader: state.loader.toJS(), user: state.usertoken.toJS() };
}
const mapDispatchToProps = dispatch => ({
  onUserProfile: (id, firstname, lastname, token) => dispatch(getSignup.userProfile(id, firstname, lastname, token)),
  onGetUserToken: () => dispatch(getToken.getToken()),
  onDrawer: () => dispatch(loginAction.openDrawer()),
  fetchMessages: () => dispatch(actionchat.getmessages()),
  onSignup: (firstname, lastname, email, password, token) => dispatch(getSignup.signup(firstname, lastname, email, password, token)),
  onSignout: () => dispatch(getSignup.signout()),
  onSendNotification: (data, type) => dispatch(push.sendNotification(data, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
