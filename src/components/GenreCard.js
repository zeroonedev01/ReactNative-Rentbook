/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

class Genrecard extends Component {
  render() {
    return (
      <View
        style={{
          height: 130,
          width: 241,
          marginLeft: 20,
          borderRadius: 10,
          borderWidth: 0.5,
          flexDirection: 'row',
          borderColor: '#dddddd',
          backgroundColor: `${this.props.color}`,
        }}>
        <View
          style={{
            flex: 0.7,
            paddingLeft: 10,
            paddingTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
            {this.props.name}
          </Text>
        </View>
        <Image
          source={{
            uri: `${this.props.imageUri}`,
          }}
          style={{
            flex: 1.3,
            width: 150,
            height: 111.68,
            resizeMode: 'cover',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            margin: 10,
          }}
        />
      </View>
    );
  }
}
export default Genrecard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
