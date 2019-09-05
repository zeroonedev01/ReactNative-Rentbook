import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import StarRating from 'react-native-star-rating';
class CardBookAll extends Component {
  render() {
    return (
      <View
        style={{
          width: this.props.width / 2 - 30,
          height: 250,
          borderWidth: 0.5,
          borderColor: '#dddddd',
          marginBottom: 20,
          borderRadius: 10,
        }}>
        <View style={{flex: 1}}>
          <Image
            style={{
              flex: 1.5,
              width: null,
              height: null,
              resizeMode: 'cover',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            source={require('../assets/dilan.jpg')}
          />
        </View>
        <View
          style={{
            flex: 0.5,
            alignItems: 'flex-start',
            justifyContent: 'space-evenly',
            paddingLeft: 10,
          }}>
          <Text style={{fontSize: 10, color: '#00b894'}}>
            {this.props.type}
          </Text>
          <Text style={{fontSize: 12, fontWeight: 'bold'}}>
            {this.props.name}
          </Text>
          <Text style={{fontSize: 10, color: 'grey'}}>{this.props.price}</Text>
          <StarRating
            disable={true}
            maxStars={5}
            rating={this.props.rating}
            starSize={10}
            fullStarColor="#fdcb6e"
            emptyStarColor="#ffeaa7"
          />
        </View>
      </View>
    );
  }
}
export default CardBookAll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
