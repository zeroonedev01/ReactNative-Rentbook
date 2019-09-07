import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Spinner} from 'native-base';

class AddDonation extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading Form</Text>
        <Spinner color="red" />
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
