import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TextInput, AlertIOS, VibrationIOS, Dimensions, ActivityIndicator, Text, TouchableHighlight, Platform, Picker, ScrollView,ToastAndroid } from 'react-native';
import style from './style';
import FCM from 'react-native-fcm';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as updateProfileAction from '../../actions/updateProfile';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
const { height, width } = Dimensions.get('window');
import { Avatar } from 'react-native-elements';

class UserProfile extends Component {
  // static navigationOptions = {
  //   title: 'Profile',
  //   headerTitleStyle :{ marginRight: 53, alignSelf:'center', color:'#fff'},
  //   headerStyle: {backgroundColor:'#3c3c3c'},
  // };
  constructor(props) {
    super(props);
    this.state = {
      FirstName: '',
      LastName: '',
      BusinessName: '',
      Reporting: 'Daily',
      avatar: 'https://image.shutterstock.com/z/stock-vector-male-profile-picture-placeholder-vector-illustration-design-social-profile-template-avatar-228952291.jpg',
      token: '',
    };
    this.updateProfile = this.updateProfile.bind(this);
  }
  static navigationOptions = {
    title: 'Profile',

    headerTintColor: 'white',
    headerTitleStyle :{ color:'#fff'},
    headerStyle: {backgroundColor:'#3c3c3c'},
  };
  componentWillMount(props) {
    FCM.getFCMToken().then((token) => {
      this.setState({ token });
    });
    const id = this.props.loggedIn.user.uid;
    this.setState({
      FirstName: this.props.user.data[id].profile.firstname,
      LastName: this.props.user.data[id].profile.lastname,
      BusinessName: this.props.user.data[id].profile.businessname,
      avatar: this.props.user.data[id].profile.avatar,
      Reporting: this.props.user.data[id].profile.reporting,
    });
  }
  updateProfile() {
    const userId = this.props.loggedIn.user.uid;
    const fname = this.state.FirstName;
    const lname = this.state.LastName;
    const token = this.state.token;
    const avatar = this.state.avatar;
    const businessname = this.state.BusinessName;
    const reporting = this.state.Reporting;
    if (userId && fname && lname && token && avatar && businessname && reporting) {

      this.props.onUpdateUserProfile(userId, fname, lname, token, avatar, businessname, reporting).then((val) => {
        this.props.navigation.goBack();
      });
    } else {
      if (Platform.OS === 'ios') {
        AlertIOS.alert('All Fields Are Required');
        VibrationIOS.vibrate();
      }else {
        ToastAndroid.show('All Fields Are Required', ToastAndroid.SHORT);
      }
    }
  }
  focusNextField(nextField) {
    this.refs[nextField].focus();
  }
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // const source = { uri: response.uri };

        // You can also display the image using data:
        const firebasesource = { uri: `data:image/jpeg;base64,${response.data}` };
        this.setState({ avatar: firebasesource.uri });
      }
    });
  }
  render() {
    const id = this.props.loggedIn.user.uid;
    return (
      <View style={style.OuterContainer}>
        {this.props.loader.isLoading ?
          <View style={style.loader}>
            <ActivityIndicator
              animating={this.props.loader.isLoading}
              style={{ height: 80 }}
              size="small"
              color="grey"
            />
          </View> : <View style={{ flex: 1,  }}>
            <View style={{ marginLeft: 10, flexDirection: 'row' }} >
              <Avatar
                large
                rounded
                source={{ uri: this.state.avatar }}
                onPress={() => { this.selectPhotoTapped(); }}
                containerStyle={Platform.OS === 'ios' ? { marginTop: 18 } : { width: 78, height: 78, marginTop: 18, marginLeft: 5 }}
                activeOpacity={0.7}
              />
              <View style={style.InsideContainer}>
                <View style={style.border}>
                  <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    {/* <View style={{ width: 40, backgroundColor: '#3c3c3c', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>
                    <Icon name="user" size={18} color="#fff" />
                  </View> */}

                    <TextInput
                      ref="1"
                      autoFocus
                      enablesReturnKeyAutomatically
                      style={style.SeInput}
                      onChangeText={FirstName => this.setState({ FirstName })}
                      returnKeyType="next"
                      keyboardType="email-address"
                      underlineColorAndroid="transparent"
                      value={this.state.FirstName}
                      placeholder="FirstName"
                      onSubmitEditing={() => this.focusNextField('2')}
                    />
                    <TextInput
                      ref="2"
                      enablesReturnKeyAutomatically
                      style={style.SeInput}
                      onChangeText={LastName => this.setState({ LastName })}
                      returnKeyType="next"
                      underlineColorAndroid="transparent"
                      value={this.state.LastName}
                      placeholder="LastName"
                      onSubmitEditing={() => this.focusNextField('3')}
                    />
                  </View>
                </View>
                <View style={style.border}>
                  <View style={{ flexDirection: 'row' }}>
                    {/* <View style={{ width: 40, backgroundColor: '#3c3c3c', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>
                    <Icon name="briefcase" size={16} color="#fff" />
                  </View> */}
                    <TextInput
                      ref="3"
                      enablesReturnKeyAutomatically
                      style={style.SecondInput}
                      underlineColorAndroid="transparent"
                      onChangeText={BusinessName => this.setState({ BusinessName })}
                      returnKeyType="go"
                      value={this.state.BusinessName}
                      placeholder="Business Name"
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={style.divider} />
            <View style={{ marginLeft: 4 }}>
              <Text style={{ fontWeight: 'bold', marginLeft: 9, marginTop: 13, marginRight: 12, fontSize: 15.5, color: 'black' }}>Select Your Reporting Options</Text>
              <Picker
                style={{ width: width - 20}}

                selectedValue={this.state.Reporting}
                onValueChange={report => this.setState({ Reporting: report })}
              >
                <Picker.Item label="Daily" value="Daily" />
                <Picker.Item label="Weekly" value="Weekly" />
                <Picker.Item label="Daily & Weekly" value="Both" />
              </Picker>
            </View>
            <View style={style.bottom}>
              <TouchableHighlight onPress={() => { this.updateProfile(); }} style={style.touch}>
                <View style={style.button}>
                  <Text style={style.text}>
                  UPDATE PROFILE
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
  return { loader: state.loader.toJS(), userId: state.signup.toJS(), userUID: state.login.toJS(), chatdata: state.chatdata.toJS(), user: state.usertoken.toJS(), loggedIn: state.userauth.toJS() };
}
const mapDispatchToProps = dispatch => ({
  onUpdateUserProfile: (userId, fname, lname, token, avatar, businessname, reporting) => dispatch(updateProfileAction.userInfoUpdate(userId, fname, lname, token, avatar, businessname, reporting)),
  onUploadImage: uri => dispatch(updateProfileAction.upload(uri)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
