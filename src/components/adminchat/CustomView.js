import React from 'react';
import {
  Linking,
  MapView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';
const Lightbox = require('react-native-lightbox');
const { width, height } = Dimensions.get('window');
export default class CustomView extends React.Component {
  constructor(props) {
    super(props);
    this.handleImageClick = this.handleImageClick.bind(this);
  }
  handleImageClick() {
    return (
      <View style={{ flex: 1 }}>
        <Image source={this.props.currentMessage.source} style={{ flex: 1, justifyContent: 'center' }} />
      </View>
    );
  }
  render() {
    if (this.props.currentMessage.location) {
      return (
        <TouchableOpacity
          style={[styles.container, this.props.containerStyle]} onPress={() => {
            const url = Platform.select({
              ios: `http://maps.apple.com/?ll=${this.props.currentMessage.location.latitude},${this.props.currentMessage.location.longitude}`,
              android: `http://maps.google.com/?q=${this.props.currentMessage.location.latitude},${this.props.currentMessage.location.longitude}`,
            });
            Linking.canOpenURL(url).then((supported) => {
              if (supported) {
                return Linking.openURL(url);
              }
            }).catch((err) => {
              console.error('An error occurred', err);
            });
          }}
        >
          <MapView
            style={[styles.mapView, this.props.mapViewStyle]}
            region={{
              latitude: this.props.currentMessage.location.latitude,
              longitude: this.props.currentMessage.location.longitude,
            }}
            annotations={[{
              latitude: this.props.currentMessage.location.latitude,
              longitude: this.props.currentMessage.location.longitude,
            }]}
            scrollEnabled={false}
            zoomEnabled={false}
          />
        </TouchableOpacity>
      );
    } else if (this.props.currentMessage.source) {
      return (
        <Lightbox
          activeProps={{
            style: [styles.imageActive, { width, height }],
          }}
          {...this.props.lightboxProps}
        >
          <Image source={this.props.currentMessage.source} style={styles.image} />
        </Lightbox>
      );
    } else if (this.props.currentMessage.videoSource) {
      return (
        <TouchableOpacity style={[styles.container, this.props.containerStyle]} >
          {this.props.currentMessage.videoSource}
        </TouchableOpacity>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
  },
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover',
  },
  imageActive: {
    resizeMode: 'contain',
  },
});

CustomView.defaultProps = {
  currentMessage: {},
  containerStyle: {},
  mapViewStyle: {},
};

CustomView.propTypes = {
  currentMessage: React.PropTypes.object,
  containerStyle: View.propTypes.style,
  mapViewStyle: View.propTypes.style,
};
