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

class ChatPage extends Component {
  lastAddId = null;
  constructor(props) {
    super(props);
    this.state = { messages: [], typingText: null, set: false, length:'' };
    this.onSend = this.onSend.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
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
    const userId = this.props.loggedIn.user.uid;

    //const avatar = this.props.user.data['dvSXndNBB4ZTLaUj8nSi563AbZq1'].profile.avatar || 'https://lradius.s3.amazonaws.com/media/bell.png';
    const avatar = 'https://lradius.s3.amazonaws.com/media/bell.png';

    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello, how can I help you today?',
          createdAt: new Date(),
          user: {
            _id: 'tGox8hCZLfZFHlFl12JUrZGMXmy2',
            name: 'Admin Bellwethr',
            avatar: avatar,
          },
        },
      ],
    });
    const msgID = this.props.chatdata.userData[this.props.loggedIn.user.uid];
    if (msgID) {
      Object.keys(msgID).map((key, i) => {
        Object.keys(msgID[key]).map((k, index) => {
          if (msgID[key][k].text) {
            this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, {
                _id: msgID[key][k]._id,
                text: msgID[key][k].text,
                createdAt: new Date(msgID[key][k].user.createdTime),
                user: {
                  _id: msgID[key][k].user._id,
                  name: msgID[key][k].user.firstname,
                  avatar: avatar,
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
                  avatar: avatar,
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
                  avatar: avatar,
                },
              }),
            }));
          }
        });
      });
    }
  }
  componentWillReceiveProps(props) {
    FCM.setBadgeNumber(0);

    //const avatar = this.props.user.data['dvSXndNBB4ZTLaUj8nSi563AbZq1'].profile.avatar || 'https://lradius.s3.amazonaws.com/media/bell.png';
    const avatar = 'https://lradius.s3.amazonaws.com/media/bell.png';

    const msg = this.state.messages;
    // const Msg = props.chatdata.data[0];
    const id = this.props.loggedIn.user.uid;
    const Msg = props.chatdata.userData[id];
    const msgarray = [];
    if (Msg) {
      Object.keys(Msg).map((key, index) => {
        if (Object.keys(Msg).length - 1 === index) {
          msgarray.push(Msg[key][0]);
        }
      });
      if (msgarray[0]._id === msg[0]._id) {
        return;
      }

      //added by David - start
      console.log('add Id', msgarray[0]._id);

      if (msgarray[0]._id.length > 24) {
        console.log('>24 return');
        return;
      }

      if (msgarray[0]._id == this.lastAddId) {
        console.log('SAME id return');
        return;
      }

      this.lastAddId = msgarray[0]._id;
      //added by David - end

      if (msgarray[0]._id !== msg[0]._id ) {
        if (msgarray[0].text) {
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, {
              _id: msgarray[0]._id,
              text: msgarray[0].text,
              createdAt: new Date(msgarray[0].user.createdTime),
              user: {
                _id: msgarray[0].user._id,
                name: msgarray[0].user.firstname,
                avatar: avatar
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
                avatar: avatar
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
                avatar: avatar
              },
            }),
          }));
        }
      }
    }
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
  onSend(messages = []) {
    const token = this.props.user.data.dvSXndNBB4ZTLaUj8nSi563AbZq1.profile.cstoken;
    const userId = this.props.loggedIn.user.uid;
    this.sendNotificationWithData(token, messages[0].text, messages[0].user.firstname);
    this.props.onSendMsg(userId, messages);

    //const avatar = this.props.user.data['dvSXndNBB4ZTLaUj8nSi563AbZq1'].profile.avatar || 'https://lradius.s3.amazonaws.com/media/bell.png';
    //const avatar = 'https://lradius.s3.amazonaws.com/media/bell.png';

    let msgarray = messages;
    if (msgarray[0].text) {
      console.log(msgarray[0].text);
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
    const name = 'null';
    return (
      <View style={style.OuterContainer} >
        <GiftedChat
          messages={this.state.messages}
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
          onSend={this.onSend}
          renderBubble={this.renderBubble}
          user={{
            _id: `${userId}`,
            to:`${this.props.loggedIn.user.uid}`,
            firstname: `${this.props.user.data[userId] === undefined ? 'null' : this.props.user.data[userId].profile.firstname} ${this.props.user.data[userId] === undefined ? 'null' : this.props.user.data[userId].profile.lastname}`,
            time: new Date().toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' }),
            createdTime: `${new Date()}`,
            timeStamp: new Date().getTime(),
            status: false,
            avatar: `${this.props.user.data[userId] === undefined ? 'null' : this.props.user.data[userId].profile.avatar || 'https://lradius.s3.amazonaws.com/media/bell.png'}`
          }}
        />
      </View>
    );
  }
}
function mapStateToProps(state) {
  return { loader: state.loader.toJS(), loggedIn: state.userauth.toJS(), chatdata: state.chatdata.toJS(), user: state.usertoken.toJS() };
}
const mapDispatchToProps = dispatch => ({
  getUserInfo: userID => dispatch(get.getUserInfo(userID)),
  fetchMessages: () => dispatch(action.getmessages()),
  onSendMsg: (userid, messages) => dispatch(action.sendMessages(userid, messages)),
  onSendNotification: (data, type) => dispatch(push.sendNotification(data, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
