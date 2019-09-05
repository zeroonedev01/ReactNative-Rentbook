import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Bookcard from '../components/Bookcard';
import CardBookAll from '../components/CardBookAll';

const {height, width} = Dimensions.get('window');

class Explore extends Component {
  componentWillMount() {
    this.startHeaderHeight = 80;
    if (Platform.OS === 'android') {
      this.startHeaderHeight = 80 + StatusBar.currentHeight;
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.setflex}>
        <View style={styles.setflex}>
          <View style={styles.viewheader}>
            <Text style={styles.brand}>ZEREF BOOK</Text>
            <View style={styles.viewsearch}>
              <Icon name="ios-search" size={20} style={styles.iconseacrh} />
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Search"
                placeholderTextColor="grey"
                style={styles.searchinput}
                // maxLength={40}
                width={160}
              />
            </View>
          </View>
          <ScrollView scrollEventThrottle={36}>
            <View style={{flex: 1, backgroundColor: 'white', paddingTop: 20}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  paddingHorizontal: 20,
                }}>
                Popular Books
              </Text>

              <View style={{height: 130, marginTop: 20}}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  <Bookcard
                    imageUri={require('../assets/dilan.jpg')}
                    name="Home"
                  />
                  <Bookcard
                    imageUri={require('../assets/dilan.jpg')}
                    name="Experiences"
                  />
                  <Bookcard
                    imageUri={require('../assets/dilan.jpg')}
                    name="Resturant"
                  />
                </ScrollView>
              </View>
              <View style={{marginTop: 40, paddingHorizontal: 20}}>
                <Text style={{fontSize: 20, fontWeight: '700'}}>
                  The Newest BOOK
                </Text>
                <Text style={{fontWeight: '100', marginTop: 10}}>
                  Perjalanan Dilan mencari Kitab sunbokong
                </Text>
                <View style={{width: width - 40, height: 200, marginTop: 20}}>
                  <Image
                    style={{
                      flex: 1,
                      height: null,
                      width: null,
                      resizeMode: 'cover',
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: '#dddddd',
                    }}
                    source={require('../assets/dilan.jpg')}
                  />
                </View>
              </View>
            </View>
            <View style={{marginTop: 40}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  paddingHorizontal: 20,
                }}>
                All Books
              </Text>
              <View
                style={{
                  paddingHorizontal: 20,
                  marginTop: 20,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}>
                <CardBookAll
                  width={width}
                  name="The Cozy Place"
                  type="PRIVATE ROOM - 2 BEDS"
                  price={82}
                  rating={4}
                />
                <CardBookAll
                  width={width}
                  name="The Cozy Place dsjdsk skdjskd ksdjsk dsdjsk"
                  type="PRIVATE ROOM - 2 BEDS"
                  price={82}
                  rating={4}
                />
                <CardBookAll
                  width={width}
                  name="The Cozy Place"
                  type="PRIVATE ROOM - 2 BEDS"
                  price={82}
                  rating={4}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  setflex: {flex: 1},
  viewheader: {
    height: 70,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    flexDirection: 'row',
  },
  brand: {
    marginLeft: 15,
    alignSelf: 'center',
    // color: 'grey',
    fontWeight: 'bold',
    fontSize: 22,
  },
  viewsearch: {
    flexDirection: 'row',
    padding: 3,
    backgroundColor: '#E5E6EE',
    marginHorizontal: 20,
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 1,
    marginTop: Platform.OS === 'android' ? 15 : null,
    marginBottom: Platform.OS === 'android' ? 10 : null,
    borderRadius: 15,
  },
  iconseacrh: {marginTop: 10, marginRight: 5, marginLeft: 5, color: 'grey'},
  seacrhinput: {
    flex: 1,
    fontWeight: '300',
    backgroundColor: 'white',
  },
});
