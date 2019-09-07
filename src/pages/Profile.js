import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {logout} from '../Publics/actions/auth';
import jwt from 'react-native-pure-jwt';
class UserProfileView extends Component {
  constructor(props) {
    super(props);
    this.navigationWillFocusListener = props.navigation.addListener(
      'willFocus',
      async () => {
        let toe = await AsyncStorage.getItem('token', (err, res) => {
          console.log(err, res);
        });

        this.setState({isLogin: toe});
        console.log(this.state.isLogin);
        if (this.state.isLogin === null) {
          this.props.navigation.navigate('Login');
        }
        const objJwt = await jwt.decode(
          toe, // the token
          '23r3f-W3155m4n', // the secret
          {
            skipValidation: true, // to skip signature and exp verification
          },
        );
        this.setState({user: objJwt.payload});
        console.log('User JWT', this.state.user);
      },
    );
    this.state = {
      modalVisible: false,
      userSelected: [],
      isLogin: null,
      user: [],
      data: [
        {
          id: 1,
          name: 'Borrow',
          image: 'https://img.icons8.com/clouds/100/000000/book.png',
          count: 20,
        },
        {
          id: 2,
          name: 'Contribution',
          image: 'https://img.icons8.com/clouds/100/000000/trust.png',
          count: 234.722,
        },
        {
          id: 3,
          name: 'Fine',
          image: 'https://img.icons8.com/clouds/100/000000/money.png',
          count: 100000,
        },
      ],
    };
  }
  handleLogOut = () => {
    Alert.alert(
      'Confirm',
      'Are you sure want to Log out?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.afterLogOut()},
      ],
      {cancelable: false},
    );
  };
  afterLogOut = async () => {
    console.log('LogoUt');
    this.setState({isLogin: null, user: []});
    // await this.props.dispatch(logout());
    await AsyncStorage.removeItem('token', err => console.log(err));
    this.props.navigation.navigate('Login');
  };
  componentWillUnmount() {
    this.navigationWillFocusListener.remove();
  }
  async componentDidMount() {
    // let toe = await AsyncStorage.getItem('token', (err, res) => {
    //   console.log(err, res);
    // });
    // this.setState({isLogin: toe});
    // console.log(this.state.isLogin);
    // if (this.state.isLogin === null) {
    //   this.props.navigation.navigate('Login');
    // }
  }
  clickEventListener = item => {
    Alert.alert('Message', 'Item clicked. ' + item.name);
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <ImageBackground
            blurRadius={3}
            resizeMode={'cover'}
            style={{flex: 1}}
            source={{
              uri: 'https://wallpapercave.com/wp/wp4190888.jpg',
            }}>
            <View style={styles.headerContent}>
              <Image
                style={styles.avatar}
                source={{
                  uri: 'https://i.pravatar.cc/300',
                }}
              />

              <Text style={styles.name}>{this.state.user.username}</Text>
              <Text style={styles.userInfo}>{this.state.user.email}</Text>
              <TouchableOpacity
                style={styles.followButton}
                onPress={this.handleLogOut}>
                <Text style={styles.followButtonText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.body}>
          <FlatList
            style={styles.contentList}
            columnWrapperStyle={styles.listContainer}
            data={this.state.data}
            keyExtractor={item => {
              return item.id;
            }}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => {
                    this.clickEventListener(item);
                  }}>
                  <Image style={styles.image} source={{uri: item.image}} />
                  <View style={styles.cardContent}>
                    <Text style={styles.name1}>{item.name}</Text>
                    <Text style={styles.count}>{item.count}</Text>
                    <TouchableOpacity
                      style={styles.followButton}
                      onPress={() => this.clickEventListener(item)}>
                      <Text style={styles.followButtonText}>Explore now</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00BFFF',
    height: 280,
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: '#ffffff',
    fontWeight: '600',
  },
  userInfo: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
  body: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  item: {
    flexDirection: 'row',
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: 'grey',
  },
  container: {
    flex: 1,

    backgroundColor: '#ebf0f7',
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#546de5',
  },

  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    borderRadius: 30,
  },

  name1: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: '#3399ff',
    fontWeight: 'bold',
  },
  count: {
    fontSize: 14,
    flex: 1,
    alignSelf: 'center',
    color: '#6666ff',
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
  },
  followButtonText: {
    color: 'black',
    fontSize: 12,
  },
});
const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(UserProfileView);
