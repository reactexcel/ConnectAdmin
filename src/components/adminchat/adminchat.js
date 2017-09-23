import React, { Component } from 'react';
import { View, Platform, Text } from 'react-native';
import style from './styles';
import { GiftedChat, Actions, Bubble } from 'react-native-gifted-chat';
import CustomActionsIOS from './CustomActions.ios';
import CustomActionsAndroid from './CustomActions.android';
import CustomView from './CustomView';
import { connect } from 'react-redux';
import * as action from '../../actions/chatroom';
import * as get from '../../actions/getuserprofile';
import * as push from '../../actions/pushnotification';
import FCM from 'react-native-fcm';


class AdminChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      typingText: null,
      id: '',
      length:'',
    };
    this.onSend = this.onSend.bind(this);
    this.sendNotificationWithData = this.sendNotificationWithData.bind(this);
  }
  static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: '[ Admin ]',
            headerTitleStyle :{color:'#fff'},
            headerTintColor: 'white',
            headerStyle: {backgroundColor:'#3c3c3c'},
        };
    };
  componentWillMount() {

    FCM.setBadgeNumber(0);
    const id =  this.props.navigation.state.params.cilentId;
    const avatar  = this.props.user.data[id].profile.avatar || 'https://lradius.s3.amazonaws.com/media/bell.png'
    const userId = this.props.loggedIn.user.uid;
    const msgID = this.props.chatdata.userData[id];
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'New User Registered.',
          createdAt: new Date(),
          user: {
            _id: 'dvSXndNBB4ZTLaUj8nSi563AbZq1',
            name: 'Admin Bellwethr',
            avatar: 'https://lradius.s3.amazonaws.com/media/bell.png',
          },
        },
      ],
    });
    if (msgID) {
      Object.keys(msgID).map((key, i) => {
        Object.keys(msgID[key]).map((k, index) => {
          if (!msgID[key][k].user.status) {
            this.props.onSeen(id, key);
          }
          if (msgID[key][k].text) {
            this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, {
                _id: msgID[key][k]._id,
                text: msgID[key][k].text,
                createdAt: new Date(msgID[key][k].user.createdTime),
                user: {
                  _id: msgID[key][k].user._id,
                  name: msgID[key][k].user.firstname,
                  // avatar: avatar,

                },
              }),
            }));
          } else if (msgID[key][k].source) {
            this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, {
                _id: msgID[key][k]._id,
                source: msgID[key][k].source,
                createdAt: new Date(msgID[key][k].user.createdTime),
                user: {
                  _id: msgID[key][k].user._id,
                  name: msgID[key][k].user.firstname,
                  //  avatar: avatar,
                },
              }),
            }));
          } else if (msgID[key][k].location) {
            this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, {
                _id: msgID[key][k]._id,
                location: msgID[key][k].location,
                createdAt: new Date(msgID[key][k].user.createdTime),
                user: {
                  _id: msgID[key][k].user._id,
                  name: msgID[key][k].user.firstname,
                  // avatar: avatar,
                },
              }),
            }));
          }
        });
      });
    }
  }
  componentWillReceiveProps(props) {
    const msg = this.state.messages;
    const id = this.props.navigation.state.params.cilentId;
    const avatar  = this.props.user.data[id].profile.avatar || 'https://lradius.s3.amazonaws.com/media/bell.png' ;
    const Msg = props.chatdata.userData[id];
    const msgarray = [];
    if (Msg) {
      Object.keys(Msg).map((key, index) => {
        if (Object.keys(Msg).length - 1 === index) {
          msgarray.push(Msg[key][0]);
        }
      });
        if (msgarray[0]._id === msg[0]._id ) {
          return;
        }
        console.log(msgarray[0].text);
        // if (msgarray[0]._id !== msg[0]._id ) {
          if (msgarray[0].text) {
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, {
              _id: msgarray[0]._id,
              text: msgarray[0].text,
              createdAt: new Date(msgarray[0].user.createdTime),
              user: {
                _id: msgarray[0].user._id,
                name: msgarray[0].user.firstname,
                // avatar: avatar,
              },
            }),
          }));
        } else if (msgarray[0].source) {
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, {
              _id: msgarray[0]._id,
              source: msgarray[0].source,
              createdAt: new Date(msgarray[0].user.createdTime),
              user: {
                _id: msgarray[0].user._id,
                name: msgarray[0].user.firstname,
                // avatar:avatar,
              },
            }),
          }));
        } else if (msgarray[0].location) {
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, {
              _id: msgarray[0]._id,
              location: msgarray[0].location,
              createdAt: new Date(msgarray[0].user.createdTime),
              user: {
                _id: msgarray[0].user._id,
                name: msgarray[0].user.firstname,
                // avatar: avatar,
              },
            }),
          }));
        }
        // }
    }
  }
  onSend(messages = []) {
    const msg = this.state.messages;
    const msgarray = messages;
    const userId = this.props.loggedIn.user.uid;
    const id = this.props.navigation.state.params.cilentId;
    const token = this.props.user.data[id].profile.cstoken;
    this.props.onMsgSend(id, messages);
    const avatar  = this.props.user.data[id].profile.avatar || 'https://lradius.s3.amazonaws.com/media/bell.png';
    this.sendNotificationWithData(token, messages[0].text, messages[0].user.firstname);
}
  sendNotificationWithData(token, text, name) {
    const body = {
      to: token,
      notification: {
        title: name,
        body: text,
        sound: 'default',
        'icon': "../../img/ic_stat_bell.png",
        click_action: 'fcm.ACTION.HELLO',
        badge: 1,
      },
      priority: 'high',
    };
    this.props.onSendNotification(JSON.stringify(body), 'notification-data');
  }
  renderCustomView(props) {
    return (
      <CustomView
        {...props}
      />
    );
  }
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2c3e50',
          },
        }}
      />
    );
  }
  renderCustomActions(props) {
    if (Platform.OS === 'ios') {
      return (
        <CustomActionsIOS
          {...props}
        />
      );
    }
    return (
      <CustomActionsAndroid
        {...props}
      />
    );
  }
  render() {
    const userId = this.props.loggedIn.user.uid;
    return (
      <View style={style.OuterContainer} >
        <GiftedChat
          messages={this.state.messages}
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
          renderBubble={this.renderBubble}
          onSend={this.onSend}
          user={{
            _id: `${userId}`,
            to:`${this.props.navigation.state.params.cilentId}`,
            firstname: `${this.props.user.data[userId].profile.firstname} ${this.props.user.data[userId].profile.lastname}`,
            time: new Date().toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' }),
            createdTime: `${new Date()}`,
            timeStamp: new Date().getTime(),
            status: true,
            avatar: `${this.props.user.data[userId] === undefined ? 'null' : this.props.user.data[userId].profile.avatar}`
          }}
        />
      </View>
    );
  }
}
function mapStateToProps(state) {
  return { loader: state.loader.toJS(), userId: state.signup.toJS(), userUID: state.login.toJS(), chatdata: state.chatdata.toJS(), user: state.usertoken.toJS(),loggedIn: state.userauth.toJS() };
}
const mapDispatchToProps = dispatch => ({
  getUserInfo: userID => dispatch(get.getUserInfo(userID)),
  onMsgSend: (userid, messages) => dispatch(action.sendMessages(userid, messages)),
  onSendNotification: (data, type) => dispatch(push.sendNotification(data, type)),
  onSeen: (cilentId, key) => dispatch(push.seenMsg(cilentId, key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminChat);
