import React, { Component } from 'react';
import { StatusBar, WebView, Image, View } from 'react-native';
import { Font, AppLoading } from 'expo';
import { Container, Header, Content, Footer, FooterTab, Button, Body,Left, Right, Icon, Text, Title, Card, CardItem, Col, Grid, H3, H1, List, ListItem, Thumbnail} from 'native-base';
import HTML from 'react-native-render-html';

export default class FeaturedArticle extends React.Component {
  state = {
    fontsAreLoaded: false,
    articulo:'https://www.criptonoticias.com/adopcion/escritor-padre-rico-padre-pobre-asegura-criptomonedas-reemplazaran-dolar/amp/'
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
      'https://www.criptonoticias.com/wp-json/wp/v2/posts?per_page=1&_embed&page=4'
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
            title:responseJson[0].title.rendered,
            date:responseJson[0].date,
            picture:responseJson[0]._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url,
            category: responseJson[0]._embedded['wp:term'][0][0].name,
            excerpt : responseJson[0].excerpt.rendered
          },
          function() {
            this.setState({excerpt: this.removePTags(this.state.excerpt)})
            console.log(this.state.excerpt);
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
    console.log(data);
    var extracted = data.split('<p>');
    extracted = extracted[1].split('</p>');
    var newData = extracted[0];
    console.log(newData);
    return newData 
  }


  title = this.searchInResponse(this.state.title);
  

  render() {
    if (!this.state.fontsAreLoaded) {
      return <AppLoading />;
    }
    return (
        <Card>
          <CardItem cardBody>
            <Image source={{uri: this.state.picture}} style={{height: 200, width: null, flex: 1}}/>

          </CardItem>
          <CardItem cardBody>
              <Text> {this.state.category} </Text>
          </CardItem>
          <CardItem cardBody>
            <H3>{this.state.title}</H3>
          </CardItem>
          <CardItem cardBody>
            <Text>{this.state.excerpt}</Text>
          </CardItem>
          <CardItem style={{flexDirection: "row"}}>
            <Text>{this.state.date}</Text>
            
                <Button transparent>
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