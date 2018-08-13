import React, { Component } from 'react';
import { Alert, StatusBar, WebView, Image, View, Dimensions } from 'react-native';
import { Font, AppLoading } from 'expo';
import { Container, Header, Content, Footer, FooterTab, Button, Body,Left, Right, Icon, Text, Title, Card, CardItem, Col, Row, Grid, H3, H1, List, ListItem, Thumbnail} from 'native-base';

import FeaturedArticle from "./FeaturedArticle";


export default class News_Picture extends React.Component {
  state = {
    fontsAreLoaded: false,
  };

  async componentWillMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
    });

    this.setState({ fontsAreLoaded: true});
  }

    componentDidMount() {
    return fetch(
      'https://www.criptonoticias.com/wp-json/wp/v2/posts?per_page=1&_embed&page=2'
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
            title:this.props.article.title.rendered,
            date:this.props.article.date.replace("T","/"),
            picture:this.props.article._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url,
            category: this.props.article._embedded['wp:term'][0][0].name,
            excerpt :this.props.article.excerpt.rendered,
            link: this.props.article.link +"amp"
          },
          function() {
            //console.log(this.state.link);
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  };


  render() {
    let deviceWidth = Dimensions.get('window').width;
    let devideHeight = Dimensions.get('window').height;

    if (!this.state.fontsAreLoaded) {
      return <AppLoading />;
    }

    return (
          <Card style={{justifyContent: 'center'}} >
          <CardItem cardbody button onPress={() => this.props._onClick(this.state.link)}>
            <Grid>
              <Col style= {{width: deviceWidth/3, height: null}}>
                <Image source={{uri: this.state.picture}} resizeMode="stretch" style={{width: deviceWidth/3 , height:devideHeight/5, marginTop:10}}/>
              </Col>
              <Col style= {{width: 2*deviceWidth/3 - 10}}>
                <Row>
                  <Text style= {{margin:10}} >{this.state.title}</Text>
                </Row>
                <Row>
                  <Col style={{flex: 1}}>
                    <Text note style = {{margin:10, fontSize: 9}}>{this.state.date}</Text>
                  </Col >
                  <Col style={{flexDirection: "row"}}>
                    <Button transparent>
                      <Icon  type = "Entypo" name='export' />
                    </Button>
                    <Button transparent>
                      <Icon  name='bookmark' />
                  </Button>
                  </Col>
                </Row>
              </Col>
            </Grid>
            </CardItem>
          </Card>
    );
  }
}