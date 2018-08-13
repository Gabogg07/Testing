import React, { Component } from 'react';
import { Alert, StatusBar, WebView, Image, View, Dimensions } from 'react-native';
import { Font, AppLoading } from 'expo';
import {  Container, Header, Content, Footer, FooterTab, Button, Body,Left, Right, Icon, Text, Title, Card, CardItem, Col, Grid, H3, H1, List, ListItem, Thumbnail} from 'native-base';
import HTML from 'react-native-render-html';

export default class FeaturedArticle extends React.Component {
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
  };

  componentDidMount() {
    return fetch(
      'https://www.criptonoticias.com/wp-json/wp/v2/posts?per_page=1&_embed&page=1'
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
            title:responseJson[0].title.rendered,
            date:responseJson[0].date.replace("T","/"),
            picture:responseJson[0]._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url,
            category: responseJson[0]._embedded['wp:term'][0][0].name,
            excerpt : responseJson[0].excerpt.rendered,
            link:  responseJson[0].link +"amp"
          },
          function() {
            this.setState({excerpt: this.removePTags(this.state.excerpt)})
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  searchInResponse(data){
       var article = data
       //var title = data.title.rendered;
       return data;
  };

  removePTags(data){
    var extracted = data.split('<p>');
    extracted = extracted[1].split('</p>');
    var newData = extracted[0];
    return newData 
  }


  title = this.searchInResponse(this.state.title);
  

  render() {
    let deviceWidth = Dimensions.get('window').width;
    let devideHeight = Dimensions.get('window').height;

    if (!this.state.fontsAreLoaded) {
      return <AppLoading />;
    }
    return (
        <Card>
          <CardItem cardBody button onPress={() => this.props._onClick(this.state.link)}>
            <Image source={{uri: this.state.picture}} style={{height: devideHeight/3, width: deviceWidth, flex: 1}}/>
          </CardItem>
          <CardItem cardBody button onPress={() => this.props._onClick(this.state.link)}>
              <Text> {this.state.category} </Text>
          </CardItem>
          <CardItem cardBody button onPress={() => this.props._onClick(this.state.link)}>
            <H3>{this.state.title}</H3>
          </CardItem>
          <CardItem cardBody button onPress={() => this.props._onClick(this.state.link)}>
            <Text>{this.state.excerpt}</Text>
          </CardItem>
          <CardItem style={{flexDirection: "row"}}>
            <Text>{this.state.date}</Text>
            <Button transparent onPress={() => Alert.alert('hi')}>
              <Icon  type = "Entypo" name='export' />
            </Button>
            <Button transparent>
              <Icon  name='bookmark' />
            </Button>
          </CardItem>
        </Card>
    );
  }
}