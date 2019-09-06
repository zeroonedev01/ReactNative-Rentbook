import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {Provider} from 'react-redux';
import React, {Component} from 'react';
import Home from './src/pages/Home';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Detail from './src/pages/Detail';
import History from './src/pages/History';
import Profile from './src/pages/Profile';
import {Container, Header, Content, Icon} from 'native-base';
import {StyleSheet, Text, View, Image} from 'react-native';
import AddDonation from './src/pages/AddDonation';

// import store from './src/Publics/store';
const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => ({header: null}),
    },
    Login: {
      screen: Login,
      navigationOptions: ({navigation}) => ({}),
    },
    Register: {
      screen: Register,
      navigationOptions: ({navigation}) => ({}),
    },
    Detail: {
      screen: Detail,
      navigationOptions: ({navigation}) => ({}),
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const HomeBottom = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'EXPLORE',
        tabBarIcon: ({tintColor}) => (
          <Icon
            type="MaterialIcons"
            name="explore"
            style={{fontSize: 20, color: tintColor}}
          />
        ),
      },
    },
    History: {
      screen: Login,
      navigationOptions: {
        tabBarLabel: 'HISTORY',
        tabBarIcon: ({tintColor}) => (
          <Icon
            type="MaterialIcons"
            name="history"
            style={{fontSize: 20, color: tintColor}}
          />
        ),
      },
    },
    Donation: {
      screen: AddDonation,
      navigationOptions: {
        tabBarLabel: 'DONATE BOOK',
        tabBarIcon: ({tintColor}) => (
          <Icon
            type="MaterialIcons"
            name="library-books"
            style={{fontSize: 20, color: tintColor}}
          />
        ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'PROFIE',
        tabBarIcon: ({tintColor}) => (
          <Icon
            type="EvilIcons"
            name="user"
            style={{fontSize: 20, color: tintColor}}
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#f39c12',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: {width: 5, height: 3},
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5,
      },
    },
  },
);

const AppNavi = createStackNavigator(
  {
    Home: {
      screen: HomeBottom,
      navigationOptions: ({navigation}) => ({}),
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    defaultNavigationOptions: ({navigation}) => ({}),
  },
);

const AppRoot = createAppContainer(AppNavi);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default class App extends Component {
  render() {
    return (
      // <Provider store={store}>
      <AppRoot />
      // </Provider>
    );
  }
}
