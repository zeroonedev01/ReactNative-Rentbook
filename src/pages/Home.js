/* eslint-disable react-native/no-inline-styles */
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
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Bookcard from '../components/Bookcard';
import Genrecard from '../components/GenreCard';
import {connect} from 'react-redux';
import {getBook, searchBook} from '../Publics/actions/book';
import {getGenre} from '../Publics/actions/genre';
import CardBookAll from '../components/CardBookAll';
const {height, width} = Dimensions.get('window');
import jwt from 'react-native-pure-jwt';
import AsyncStorage from '@react-native-community/async-storage';

class Explore extends Component {
  constructor(props) {
    super(props);
    this.handlePage = this.handlePage.bind(this);
    this.state = {
      books: [],
      user: null,
      searchField: '',
      sort: '',
      carousel: [],
      filter: '',
      i: 0,
      getGen: [],
      color: [
        '#00b894',
        '#00cec9',
        '#0984e3',
        '#6c5ce7',
        '#b2bec3',
        '#fdcb6e',
        '#e17055',
        '#d63031',
        '#e84393',
        '#2d3436',
      ],

      urlGambar: [
        'https://img.icons8.com/clouds/100/000000/book.png',
        'https://img.icons8.com/clouds/100/000000/love-book.png',
        'https://img.icons8.com/clouds/100/000000/password-book.png',
        'https://img.icons8.com/clouds/100/000000/book-shelf.png',
        'https://img.icons8.com/clouds/100/000000/travel-book.png',
        'https://img.icons8.com/clouds/100/000000/phone-book.png',
        'https://img.icons8.com/clouds/100/000000/math-book.png',
        'https://img.icons8.com/clouds/100/000000/law-book.png',
        'https://img.icons8.com/clouds/100/000000/book-philosophy.png',
        'https://img.icons8.com/clouds/100/000000/bookmark.png',
        'https://img.icons8.com/clouds/100/000000/books.png',
      ],
      quoteText: [
        '“A reader lives a thousand lives before he dies . . . The man who never reads lives only one.” – George R.R. Martin',
        '“Until I feared I would lose it, I never loved to read. One does not love breathing.” – Harper Lee',
        '“Never trust anyone who has not brought a book with them.” – Lemony Snicket',
        '“You can never get a cup of tea large enough or a book long enough to suit me.” – C.S. Lewis',
        '“Reading is essential for those who seek to rise above the ordinary.” – Jim Rohn',
        '“I find television very educating. Every time somebody turns on the set, I go into the other room and read a book.” – Groucho Marx',
        '“‘Classic’ – a book which people praise and don’t read.” – Mark Twain',
        '“You don’t have to burn books to destroy a culture. Just get people to stop reading them.” – Ray Bradbury',
        '"So please, oh please, we beg, we pray, go throw your TV set away, and in its place you can install a lovely bookshelf on the wall." – Roald Dahl',
        '“Think before you speak. Read before you think.” – Fran Lebowitz',
      ],
    };
  }
  componentWillMount() {
    this.startHeaderHeight = 80;
    if (Platform.OS === 'android') {
      this.startHeaderHeight = 80 + StatusBar.currentHeight;
    }
  }
  componentDidMount = async () => {
    await this.props.dispatch(getBook());
    const cleanData = this.cleanData(this.props.book);
    console.log(cleanData);
    this.setState({carousel: cleanData, books: cleanData});
    console.log('getBooks =', this.state.books);
    await this.props.dispatch(getGenre());
    this.setState({getGen: this.props.genre.genre});
    console.log('getGen =', this.state.getGen);
    let toe = await AsyncStorage.getItem('token', (err, res) => {
      console.log(err, res);
    });
    const objJwt = await jwt.decode(
      toe, // the token
      '23r3f-W3155m4n', // the secret
      {
        skipValidation: true, // to skip signature and exp verification
      },
    );
    this.setState({user: objJwt.payload});
    console.log('User JWT', this.state.user);
  };
  searchBook = async e => {
    if (e.key === 'Enter') {
      console.log(this.state.searchField);
      await this.props.dispatch(searchBook(this.state.searchField));
      const cleanData = this.cleanData(this.props.book);
      console.log('sdsdds121', cleanData);
      this.setState({books: cleanData});
    }
  };
  handleChange1 = e => {
    // console.log(e.target.value)
    this.setState({searchField: e.target.value});
  };
  handleSort = e => {
    console.log(e.target.value);
    this.setState({sort: e.target.value});
  };
  handleFilter = e => {
    console.log(e.target.value);
    this.setState({filter: e.target.value});
  };
  handlePage = e => {
    this.setState({
      i: e,
    });
  };
  cleanData = res => {
    const cleanData = res.bookList.map(book => {
      book.DateReleased = new Date(book.DateReleased)
        .toISOString()
        .split('T')[0];
      if (book.Image === null || book.Image === '') {
        book.Image =
          'https://icon-library.net/images/no-image-available-icon/no-image-available-icon-6.jpg';
      }
      return book;
    });
    return cleanData;
  };
  render() {
    console.log('User', this.props.auth.userData);
    console.log('State', this.state.books);
    let filterCarousel = this.state.carousel.filter(
      function(item) {
        if (this.count < 5 && item.available === 'true') {
          this.count++;
          return true;
        }
        return false;
      },
      {count: 0},
    );
    let filterNewest = this.state.carousel
      .sort((a, b) => {
        return new Date(b.DateReleased) - new Date(a.DateReleased);
      })
      .filter(
        function(item) {
          if (this.count < 1 && item.available === 'true') {
            this.count++;
            return true;
          }
          return false;
        },
        {count: 0},
      );
    let filteredBooks = this.state.books
      .filter(bookFil => {
        if (this.state.filter === '') {
          return bookFil;
        }
        return bookFil.genre === this.state.filter;
      })
      .sort((a, b) => {
        if (this.state.sort === 'Newest') {
          console.log('in newest');
          return new Date(b.DateReleased) - new Date(a.DateReleased);
        } else if (this.state.sort === 'Oldest') {
          return new Date(a.DateReleased) - new Date(b.DateReleased);
        }

        return true;
      });
    let randImage = () => {
      return this.state.urlGambar[
        Math.floor(Math.random() * this.state.urlGambar.length)
      ];
    };
    let randQuote = () => {
      return this.state.quoteText[
        Math.floor(Math.random() * this.state.quoteText.length)
      ];
    };
    let randColor1 = this.state.color[
      Math.floor(Math.random() * this.state.color.length)
    ];
    let randColor = () => {
      return this.state.color[
        Math.floor(Math.random() * this.state.color.length)
      ];
    };

    // console.log(randImage);
    // console.log(randColor);

    // console.log(
    //   'Random',
    //   this.state.urlgambar[Math.floor(Math.random() * this.state.length)],
    // );

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
            <View style={{paddingHorizontal: 20}}>
              <View
                style={{
                  width: width - 40,
                  height: 200,
                  marginTop: 20,
                  backgroundColor: `${randColor1}`,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: 'white',
                    margin: 5,
                  }}>
                  Quote:
                </Text>
                <View
                  style={{
                    flex: 1,
                    // justifyContent: 'center',
                    alignItems: 'center',
                    // marginHorizontal: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '700',
                      color: 'white',
                      textAlign: 'center',
                      alignSelf: 'center',
                    }}>
                    {randQuote()}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{height: 130, marginTop: 20}}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {this.state.getGen.map((gen, i) => (
                  <Genrecard
                    imageUri={randImage()}
                    name={gen.name}
                    color={randColor()}
                  />
                ))}
              </ScrollView>
            </View>
            <View style={{flex: 1, backgroundColor: 'white', paddingTop: 20}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  paddingHorizontal: 20,
                }}>
                Recommended
              </Text>

              <View style={{height: 130, marginTop: 20}}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {filterCarousel.map((book, i) => (
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('Detail')}>
                      <Bookcard imageUri={book.Image} name={book.Title} />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
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
                {this.state.books.map((book, i) => (
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Detail')}>
                    <CardBookAll
                      width={width}
                      name={book.Title}
                      type={book.status}
                      genre={book.genre}
                      image={book.Image}
                      rating={4}
                      key={i}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

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
const mapStateToProps = state => {
  return {
    book: state.book,
    genre: state.genre,
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(Explore);
