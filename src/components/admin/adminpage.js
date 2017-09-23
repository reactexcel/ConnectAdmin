import React, { Component } from 'react';
import { View, ScrollView, FlatList, Text, Keyboard, ActivityIndicator } from 'react-native';
import style from './styles';
import UserList from '../userlist/userlist';
import NewUserList from '../newuserlist/newuserlist';
import { connect } from 'react-redux';
import AdminChat from '../adminchat/adminchat';
import { Divider } from 'react-native-elements';
import FCM from 'react-native-fcm';
import * as signoutAction from '../../actions/signup';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome';
const _ = require('lodash');

class AdminChatpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedTab: 'ChatPage',
      newuser: [],
    };
    // this.handleChat = this.handleChat.bind(this);
  }

  componentWillMount() {
    const newUser = this.props.user.data;
    const UserArray = [];
    Object.keys(newUser).map((key, i) => {
      if (key !== 'dvSXndNBB4ZTLaUj8nSi563AbZq1') {
        UserArray.push(newUser[key].profile);
      }
    });
    const latestmsg = _.orderBy(UserArray, ['timestamp'], ['desc']);
    this.setState({ newuser: latestmsg });
    FCM.setBadgeNumber(0);
  }
  renderSeparator() {
    return (
      <Divider style={style.divider} />
    );
  }
  render() {
    const tabBarHeight = 0;
    return (
      <View style={style.OuterContainer}>
        <TabNavigator
          tabBarStyle={{ height: 52, overflow: 'hidden', backgroundColor: '#3c3c3c' }}
          sceneStyle={{ paddingBottom: tabBarHeight }}
        >
          <TabNavigator.Item
            selected={this.state.selectedTab === 'ChatPage'}
            title="Chat Page"
            renderIcon={() => <Icon name={'commenting-o'} color={'#00e68a'} size={18} />}
            renderSelectedIcon={() => <Icon name={'commenting-o'} color={'white'} size={20} />}
            titleStyle={{ fontSize: 15, fontWeight: 'bold', color: '#00e68a' }}
            selectedTitleStyle={{ color: 'white' }}
            onPress={() => this.setState({ selectedTab: 'ChatPage' })}
          >
            {this.props.chatdata.isSuccess ? this.props.chatdata.data.length >= 1 ? <ScrollView style={{ marginBottom: 51 }} automaticallyAdjustContentInsets>
              <FlatList
                keyExtractor={item => item._id}
                data={this.props.chatdata.data}
                renderItem={({ item, key }) =>
                  <UserList data={item} key={key} userInfo={this.props.user.data} {...this.props} />}
              />
            </ScrollView> : <Text style={style.text}>WAIT FOR USER MSG</Text>
              :<ActivityIndicator size="large" />
            }
          </TabNavigator.Item>


          <TabNavigator.Item
            selected={this.state.selectedTab === 'New Users'}
            title="New User"
            renderIcon={() => <Icon name={'user-plus'} color={'#00e68a'} size={16} />}
            renderSelectedIcon={() => <Icon name={'user-plus'} color={'white'} size={18} />}
            titleStyle={{ fontSize: 15, fontWeight: 'bold', color: '#00e68a' }}
            selectedTitleStyle={{ color: 'white' }}
            onPress={() => this.setState({ selectedTab: 'New Users' })}
          >
            {this.state.newuser.length > 0 ? <ScrollView style={{ marginBottom: 51 }} automaticallyAdjustContentInsets>
              <FlatList
                keyExtractor={item => item.id}
                data={this.state.newuser}
                renderItem={({ item, key }) =>
                  <NewUserList data={item} key={key} {...this.props} />
                }
              />
            </ScrollView> : <Text style={style.text}>WAIT FOR USER MSG</Text>}
          </TabNavigator.Item>
        </TabNavigator>

      </View>
    );
  }
}
function mapStateToProps(state) {
  return { loader: state.loader.toJS(), chatdata: state.chatdata.toJS(), user: state.usertoken.toJS() };
}
const mapDispatchToProps = dispatch => ({
  onSignout: () => dispatch(signoutAction.signout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminChatpage);
