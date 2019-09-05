import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class AddDonation extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>AddDonation</Text>
      </View>
    );
  }
}
export default AddDonation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
