import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import style from './styles';

export class Error extends Component {
  render() {
    return (
      <View style={style.OuterContainer}>
        <Text style={style.Text}>{this.props.text}</Text>
      </View>
    );
  }
}
