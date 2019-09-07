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
import {register} from '../Publics/actions/auth';
import {connect} from 'react-redux';
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
    };
  }

  onFormSubmit = async () => {
    const body = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      role_id: 2,
    };
    await this.props
      .dispatch(register(body))
      .then(res => {
        if (res.action.payload.data.status === 409) {
          Alert.alert('Register Failed', `${res.action.payload.data.message}`);
        } else {
          this.props.navigation.navigate('Login');
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  render() {
    const {isLoading} = this.props.auth;

    return (
      <Container>
        <Text style={styles.header}>Let's Get Started</Text>
        <Content style={styles.form}>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
                value={this.state.username}
                onChangeText={text =>
                  this.setState({
                    username: text,
                  })
                }
              />
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                value={this.state.email}
                onChangeText={text =>
                  this.setState({
                    email: text,
                  })
                }
              />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={text =>
                  this.setState({
                    password: text,
                  })
                }
              />
            </Item>
          </Form>
        </Content>
        <Text style={styles.title}>REGISTER</Text>
        <Button
          rounded
          dark
          style={styles.signUpButton}
          onPress={this.onFormSubmit}>
          {isLoading ? (
            <Spinner style={{marginLeft: 3}} color="white" />
          ) : (
            <Icon type="MaterialIcons" name="arrow-forward" />
          )}
        </Button>
        <Text
          style={styles.login}
          onPress={() => this.props.navigation.navigate('Login')}>
          Login
        </Text>
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
    top: 420,
    fontSize: 23,
    fontWeight: '700',
    color: '#4B4C72',
  },
  screen: {
    position: 'relative',
  },
  header: {
    position: 'absolute',
    width: 214,
    height: 70,
    left: 33,
    top: 110,
    fontSize: 24,
    lineHeight: 31,
    fontWeight: 'bold',
    color: '#4B4C72',
    fontFamily: 'Airbnb Cereal App',
  },
  form: {
    position: 'absolute',
    width: 284,
    left: 36,
    top: 150,
  },
  signUpButton: {
    position: 'absolute',
    width: 54,
    height: 54,
    left: 266,
    top: 410,
    backgroundColor: '#090B28',
  },
  login: {
    position: 'absolute',
    width: 126,
    height: 43,
    left: 36,
    top: 507,
    fontFamily: 'Airbnb Cereal App',
    fontSize: 13,
    fontWeight: 'bold',
    lineHeight: 17,
    textDecorationLine: 'underline',
  },
  remark: {
    position: 'absolute',
    width: 100,
    height: 43,
    left: 225,
    top: 507,
    fontFamily: 'Airbnb Cereal App',
    fontSize: 13,
    lineHeight: 17,
    fontWeight: 'bold',
    color: '#4B4C72',
  },
});
const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Register);
