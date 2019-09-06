import React, {Component} from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  Left,
  Body,
  Button,
  Icon,
  Title,
  Card,
  CardItem,
  Text as NbText,
} from 'native-base';

class Detail extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <Image
            style={styles.imageHeader}
            source={{
              uri:
                'https://images-na.ssl-images-amazon.com/images/I/81c3IwhrRtL.__BG0,0,0,0_FMpng_AC_UL270_SR180,270_.jpg',
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
              <Title style={styles.headerTitle}>The Promise</Title>
              <Text style={styles.headerDate}>02-20-2020</Text>
            </Body>
          </View>
          <View style={styles.cardBook}>
            <Card>
              <CardItem cardBody>
                <Image
                  style={styles.cardBookImage}
                  source={{
                    uri:
                      'https://images-na.ssl-images-amazon.com/images/I/81c3IwhrRtL.__BG0,0,0,0_FMpng_AC_UL270_SR180,270_.jpg',
                  }}
                />
              </CardItem>
            </Card>
          </View>
          <View style={styles.detail}>
            <View>
              <Text style={styles.detailText} justifyContent>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat
                sapiente nostrum unde architecto cumque totam accusamus. Maiores
                ad itaque aspernatur quisquam. Ipsam, vitae ad. Beatae similique
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat
                sapiente nostrum unde architecto cumque totam accusamus. Maiores
                ad itaque aspernatur quisquam. Ipsam, vitae ad. Beatae similique
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat
                sapiente nostrum unde architecto cumque totam accusamus. Maiores
                ad itaque aspernatur quisquam. Ipsam, vitae ad. Beatae similique
              </Text>
              <View>
                <Button style={styles.actionButton}>
                  <Text style={styles.actionButtonText}> Borrow </Text>
                </Button>
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
  actionButtonText: {
    fontFamily: 'Airbnb Cereal App',
    fontSize: 15,
    lineHeight: 20,
    color: '#FFFFFF',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default Detail;
