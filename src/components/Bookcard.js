/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

class Bookcard extends Component {
  render() {
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: 130,
          width: 200,
          marginLeft: 20,
          borderRadius: 10,
          borderWidth: 0.5,
          borderColor: '#dddddd',
        }}>
        <View style={{flex: 2}}>
          <Image
            source={{
              uri: `${this.props.imageUri}`,
            }}
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: 'cover',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />
        </View>
        <View
          style={{
            flex: 0.8,
            paddingLeft: 10,
            paddingTop: 10,
          }}>
          <Text>{this.props.name}</Text>
        </View>
      </View>
    );
  }
}
export default Bookcard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
