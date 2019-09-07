import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Spinner} from 'native-base';
class History extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>History</Text>
        <Spinner color="red" />
      </View>
    );
  }
}
export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
