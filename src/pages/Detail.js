import React, {Component} from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Left,
  Body,
  Button,
  Icon,
  Title,
  Card,
  CardItem,
  Spinner,
  Text as NbText,
} from 'native-base';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import jwt from 'react-native-pure-jwt';
import {
  getBorrowStatus,
  borrowBook,
  returnBook,
} from '../Publics/actions/borrow';

class Detail extends Component {
  constructor(props) {
    super(props);
    // this.navigationWillFocusListener = props.navigation.addListener(
    //   'willFocus',
    //   async () => {},
    // );
    this.state = {
      curentUser: null,
      books: [],
      data: [],
      isLogin: null,
      user: [],
    };
    this.handleBorrow = this.handleBorrow.bind(this);
    // this.handleReturn = this.handleReturn.bind(this);
  }
  // componentWillUnmount() {
  //   this.navigationWillFocusListener.remove();
  // }
  async componentDidMount() {
    let toe = await AsyncStorage.getItem('token', (err, res) => {
      console.log(err, res);
    });

    this.setState({isLogin: toe});
    console.log(this.state.isLogin);
    const objJwt = await jwt.decode(
      toe, // the token
      '23r3f-W3155m4n', // the secret
      {
        skipValidation: true, // to skip signature and exp verification
      },
    );
    this.setState({user: objJwt.payload});
    console.log('User JWT', this.state.user);
    console.log(this.state.isLogin, '-------------------------');
    const bookid = this.props.navigation.getParam('bookid');
    let book = this.props.book.bookList.filter(item => item.id === bookid)[0];
    if (this.state.isLogin !== null) {
      await this.props.dispatch(
        getBorrowStatus(book.statusid, book.id, this.state.isLogin),
      );
      console.log('Status Borrow', this.props.borrow.borrowStat);
    }
  }
  handleBorrow = async () => {
    let date = new Date();
    date.setDate(date.getDate() + 7);
    let date2 = date.toISOString().split('T')[0];
    const token = this.state.isLogin;
    const data1 = {
      id_book: this.props.navigation.getParam('bookid'),
      daterent: new Date(),
      datereturn: date2,
      datereturnuser: null,
      user_id: this.state.user.id,
    };
    console.log(data1);
    await this.props
      .dispatch(borrowBook(data1, token))
      .then(async res => {
        if (res.action.payload.data.status === 410) {
          Alert.alert('Information', `${res.action.payload.data.message}`);
        } else if (res.action.payload.data.status === 500) {
          Alert.alert('Information', `${res.action.payload.data.message}`);
        } else {
          this.props.navigation.navigate('History');
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  render() {
    const bookid = this.props.navigation.getParam('bookid');
    let book = this.props.book.bookList.filter(item => item.id === bookid)[0];
    console.log(bookid, book);

    let borrowing = this.props.borrow.borrowStat.filter(
      s =>
        s.datereturnuser === null ||
        (s.req_stat === 'pending' && s.req_name === 'return'),
    );
    console.log('GetBorrow', borrowing[0]);

    return (
      <SafeAreaView>
        <ScrollView>
          <Image
            style={styles.imageHeader}
            source={{
              uri: `${book.Image}`,
            }}
          />
          <View span transparent>
            <Left style={styles.backButton}>
              <Button
                rounded
                dark
                onPress={() => this.props.navigation.goBack()}>
                <Icon style={{color: 'white'}} name="arrow-back" />
              </Button>
            </Left>
            <Body style={styles.headerText}>
              <Title style={styles.headerTitle}>{book.Title}</Title>
              <Text style={styles.headerDate}>{book.DateReleased}</Text>
            </Body>
          </View>
          <View style={styles.cardBook}>
            <Card>
              <CardItem cardBody>
                <Image
                  style={styles.cardBookImage}
                  source={{
                    uri: `${book.Image}`,
                  }}
                />
              </CardItem>
            </Card>
          </View>
          <View style={styles.detail}>
            <View>
              <Text style={styles.detailText} justifyContent>
                {book.Description}
              </Text>
              <View>
                {this.state.isLogin !== null ? (
                  book.available === 'true' ? (
                    <Button
                      style={styles.actionButton}
                      onPress={this.handleBorrow}>
                      <Text style={styles.actionButtonText}>Borrow</Text>
                    </Button>
                  ) : borrowing[0] ? (
                    borrowing[0].userid === this.state.user.id ? (
                      borrowing[0].req_stat === 'pending' ? (
                        borrowing[0].req_name === 'borrow' ? (
                          <Text style={{color: 'red'}}>
                            borrow request waiting for approval
                          </Text>
                        ) : (
                          <Text style={{color: 'red'}}>
                            return request waiting for approval
                          </Text>
                        )
                      ) : (
                        <>
                          <Button
                            style={styles.actionButton}
                            onPress={this.handleReturn}>
                            <Text style={styles.actionButtonText}>Return</Text>
                          </Button>
                          <Text style={{color: 'red'}}>
                            Dont Forget to Return the Book before->
                            {
                              new Date(borrowing[0].datereturn)
                                .toISOString()
                                .split('T')[0]
                            }
                          </Text>
                        </>
                      )
                    ) : (
                      <>
                        <Text style={{color: 'red'}}>
                          Borrowed by {borrowing[0].username}
                        </Text>
                        <Text style={{color: 'red'}}>
                          Estimated Book Returned
                          {
                            new Date(borrowing[0].datereturn)
                              .toISOString()
                              .split('T')[0]
                          }
                        </Text>
                      </>
                    )
                  ) : (
                    <Spinner color="red" />
                  )
                ) : (
                  <Button
                    style={styles.actionButton1}
                    onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.actionButtonText}> Sign In</Text>
                  </Button>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  imageHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 280,
    backgroundColor: 'black',
  },
  backButton: {
    position: 'absolute',
    left: 19,
    top: 20,
  },
  headerText: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginTop: 200,
    marginLeft: -200,
  },
  headerTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white',
  },
  headerDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  cardBook: {
    position: 'absolute',
    right: 20,
    top: 160,
  },
  cardBookImage: {
    width: 120,
    height: 170,
    borderRadius: 5,
  },
  detail: {
    // position: 'absolute',
    // width: 'auto',
    // left: 29,
    // right: 29,
    // top: 350,
    marginTop: 100,
    marginHorizontal: 29,
  },
  detailText: {
    fontSize: 16,
    textAlign: 'justify',
    color: 'grey',
  },
  actionButton: {
    width: 164,
    height: 39,
    backgroundColor: '#F4CF5D',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 20,
    marginVertical: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  actionButton1: {
    width: 164,
    height: 39,
    backgroundColor: '#303952',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 20,
    marginVertical: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  actionButtonText: {
    fontFamily: 'Airbnb Cereal App',
    fontSize: 15,
    lineHeight: 20,
    color: '#FFFFFF',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

const mapStateToProps = state => {
  return {
    book: state.book,
    borrow: state.borrow,
  };
};
export default connect(mapStateToProps)(Detail);
