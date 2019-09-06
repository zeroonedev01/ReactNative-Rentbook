import React, {Component} from 'react';
import {Text, StyleSheet, Alert} from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Icon,
  Spinner,
} from 'native-base';
import {login} from '../Publics/actions/auth';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
// import {setToken, getToken} from '../helpers/token';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  handleLogin = async () => {
    const body = {
      email: this.state.username,
      password: this.state.password,
    };
    await this.props
      .dispatch(login(body))
      .then(async res => {
        if (res.action.payload.data.status === 403) {
          this.setState({username: '', password: ''});
          Alert.alert('Login Failed', `${res.action.payload.data.message}`);
        } else if (res.action.payload.data.status === 404) {
          this.setState({username: '', password: ''});
          Alert.alert('Login Failed', `${res.action.payload.data.message}`);
        } else {
          console.log('yuserData', this.props.auth.userData);
          const token = this.props.auth.userData.accessToken;
          await AsyncStorage.setItem('token', token, err => console.log(err));
          // console.log(token);
          // Alert.alert('Login Success', 'Success');
          this.props.navigation.navigate('Home');
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  async componentDidMount() {
    let toe = await AsyncStorage.getItem('token', (err, res) => {
      console.log(err, res);
    });
    if (toe !== null) {
      this.props.navigation.navigate('Home');
    }
  }
  render() {
    const {isLoading} = this.props.auth;
    return (
      <Container>
        <Text style={styles.header}>Here To Get Welcomed !</Text>
        <Content style={styles.form}>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
                autoFocus={true}
                onChangeText={text =>
                  this.setState({
                    username: text,
                  })
                }
                value={this.state.username}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                onChangeText={text =>
                  this.setState({
                    password: text,
                  })
                }
                value={this.state.password}
              />
            </Item>
          </Form>
        </Content>
        <Text style={styles.title}>SIGN IN</Text>
        <Button
          rounded
          dark
          style={styles.signInButton}
          onPress={this.handleLogin}>
          {isLoading ? (
            <Spinner style={{marginLeft: 3}} color="white" />
          ) : (
            <Icon type="MaterialIcons" name="arrow-forward" />
          )}
        </Button>
        <Text
          style={styles.signup}
          onPress={() => this.props.navigation.navigate('Register')}>
          Sign Up
        </Text>
        <Text style={styles.forgotPassword}>Forgot Password ?</Text>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    position: 'absolute',
    width: 126,
    height: 43,
    left: 36,
    top: 388,
    fontSize: 23,
    fontWeight: '700',
    color: '#4B4C72',
  },
  header: {
    position: 'absolute',
    width: 214,
    height: 70,
    left: 33,
    top: 110,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B4C72',
  },
  form: {
    position: 'absolute',
    width: 284,
    left: 36,
    top: 200,
  },
  signInButton: {
    position: 'absolute',
    width: 54,
    height: 54,
    left: 266,
    top: 390,
    backgroundColor: '#090B28',
  },
  signup: {
    position: 'absolute',
    width: 126,
    height: 43,
    left: 36,
    top: 507,
    fontSize: 13,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  forgotPassword: {
    position: 'absolute',
    width: 126,
    height: 43,
    left: 225,
    top: 507,
    fontSize: 13,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: '#4B4C72',
  },
});

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Login);
