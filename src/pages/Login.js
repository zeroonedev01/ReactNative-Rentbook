import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Icon,
} from 'native-base';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  render() {
    return (
      <Container>
        <Text style={styles.header}>Here To Get Welcomed !</Text>
        <Content style={styles.form}>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
          </Form>
        </Content>
        <Text style={styles.title}>SIGN IN</Text>
        <Button rounded dark style={styles.signInButton}>
          <Icon type="MaterialIcons" name="arrow-forward" />
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
    top: 225,
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

export default Login;
