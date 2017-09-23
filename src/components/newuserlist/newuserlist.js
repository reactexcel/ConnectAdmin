import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Avatar, Badge, Divider } from 'react-native-elements';
import style from './style';

class NewUserList extends Component {
  render() {
    const { onPress, key, data } = this.props;
    return (
      <View style={style.OuterContainer}>
        <TouchableOpacity
          key={key} onPress={() => {
            this.props.onPress(data.id);
          }} style={style.touch}
        >
          <Avatar
            width={57}
            height={57}
            rounded
            source={{ uri: data.avatar || 'https://lradius.s3.amazonaws.com/media/bell-favicon.png' }}
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
            containerStyle={Platform.OS === 'ios' ? null : { width: 60, height: 60, marginTop: 6, marginLeft: 6 }}
          />
          <View style={style.InsideContainer}>
            <View style={style.NameContainer}>
              <Text style={style.name} >
                {data.firstname} {data.lastname}
              </Text>
              <Text style={style.timetext}>
                {data.reporting || 'Nope'}
              </Text>
            </View>
            <View style={{ marginTop: 7, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={style.msgtext} >
                {data.businessname !== undefined ? data.businessname : 'Nope'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={style.divider} />
      </View>

    );
  }
}
export default NewUserList;
