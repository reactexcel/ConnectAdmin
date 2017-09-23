import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Avatar, Badge, Divider } from 'react-native-elements';
import style from './style';
// import { Divider } from 'react-native-elements';

class UserList extends Component {
  render() {
    const { onPress, key, data, userdata } = this.props;
    const id = this.props.data.user.to === undefined ? this.props.data.user.userId : this.props.data.user.to;

    let profile = null;
    if (this.props.userInfo[id]) {
      profile = this.props.userInfo[id].profile;
    }

    return (
      <View style={style.OuterContainer}>
        <TouchableOpacity
          style={style.touch} key={key} onPress={() => {
            this.props.onPress(id);
          }}
        >
          <Avatar
            width={57}
            height={57}
            rounded
            source={{ uri: (!!profile) ? profile.avatar || 'https://lradius.s3.amazonaws.com/media/bell.png' : 'https://lradius.s3.amazonaws.com/media/bell.png' }}
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
            containerStyle={Platform.OS === 'ios' ? null : { width: 60, height: 60, marginTop: 5 }}
          />
          <View style={style.InsideContainer}>
            <View style={style.NameContainer}>
              <Text style={style.name} >
                {/* {this.props.data.user.userName} */}
                {profile ? profile.firstname : 'unknown'} {profile ? profile.lastname : 'unknown'}
              </Text>
              <Text style={style.timetext}>
                {this.props.data.user.time}
              </Text>
            </View>
            <View style={{ marginTop: 7, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={style.msgtext} >
                {this.props.data.text === undefined ? <Text>Image</Text> : this.props.data.text.substring(0, 29)}...
              </Text>
              {/* {this.props.data.user.status === false ?
                <Badge
                  containerStyle={{ backgroundColor: '#00e68a' }}
                  textStyle={{ color: 'white' }}
                /> : null} */}
            </View>
          </View>
        </TouchableOpacity>
        <View style={style.divider} />
      </View>

    );
  }
}
export default UserList;
