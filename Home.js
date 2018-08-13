import React, { Component } from 'react';
import { StatusBar, WebView, Image, View, FlatList, Modal } from 'react-native';
import { Font, AppLoading } from 'expo';
import { Container, Header, Content, Footer, FooterTab, Button, Body,Left, Right, Icon, Text, Title, Card, CardItem, Col, Grid, H3, H1, List, ListItem, Thumbnail} from 'native-base';

import BottomMenu from "./BottomMenu";
import FeaturedArticle from "./FeaturedArticle";
import News_Picture from "./News_Picture";
import Article from "./Article";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        fontsAreLoaded: false,
        news: false,
        isLoading: true,
        isModalVisible: false,
        viewLink: 'https://www.google.com'
      }; 
    this.fetchCategories = this.fetchCategories.bind(this);
    this.fetchLatestNews = this.fetchLatestNews.bind(this);
    this._onArticleClick = this._onArticleClick.bind(this);
  }

  async componentWillMount() {
    await Font.loadAsync({
      'Rubik-Black': require('./node_modules/@shoutem/ui/fonts/Rubik-Black.ttf'),
      'Rubik-BlackItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf'),
      'Rubik-Bold': require('./node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf'),
      'Rubik-BoldItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf'),
      'Rubik-Italic': require('./node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf'),
      'Rubik-Light': require('./node_modules/@shoutem/ui/fonts/Rubik-Light.ttf'),
      'Rubik-LightItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf'),
      'Rubik-Medium': require('./node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf'),
      'Rubik-MediumItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf'),
      'Rubik-Regular': require('./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
      'rubicon-icon-font': require('./node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf'),

      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
    });

  this.fetchCategories();
  this.fetchLatestNews();
  this.setState({ 
                  fontsAreLoaded: true});

  //console.log(this.state);
  }


  async fetchCategories(){
    let categories_request = await fetch(
      'https://www.criptonoticias.com/wp-json/wp/v2/categories'
    );
    let categories_response = await categories_request.json();
    this.setState(
          {
            categoriesData: categories_response,
            isLoading: false
          }
    );

    //this.getCategoriesId();
    //console.log(this.state);
  }

  getCategoriesId = () =>{
    let categoriesData = this.state.categoriesData;
    let i;
    let categoriesId = [];
    for(i=0; i < categoriesData.length; i++){
      //console.log(categoriesData[i].name);
      categoriesId.push(categoriesData[i].id)
    }
    //console.log(categoriesId);
    this.setState = {categoriesId: categoriesId};
    //console.log(this.state);
  }

  _showModal = (link) => {
    this.setState({ 
      isModalVisible: true,
      viewLink: link
    })

  }

  _hideModal = () => {
    this.setState({
       isModalVisible: false,
       viewLink:"",
    })
  }

  _handler = () => {
    this._showModal(link)
  }

  async fetchLatestNews() {
    let news_request = await fetch(
      'https://www.criptonoticias.com/wp-json/wp/v2/posts?per_page=10&_embed&page=2'
    );
    let news_response = await news_request.json();
    this.setState(
          {
              news: news_response,
          }
        );
  }

  _onArticleClick = (articleLink) => {
    this._showModal();
    this.setState = ({
      viewLink: articleLink,
    }, function(){
      //console.log(this.state.viewLink);
    });

  }

  render() {
    if (!this.state.fontsAreLoaded || this.state.isLoading || !this.state.news) {
      return <AppLoading />;
    }


    //console.log(this.state.categoriesData.length)
    let newsList = this.state.news.map((item) =>  <News_Picture key={item.id} article={item} _onClick={this._showModal}/>);

    return (
      <Container style={{flex:1}}>
        //Code for the modal displaying a WebView for the pressed article
        <Modal animationType = {"slide"} transparent = {false}
               visible = {this.state.isModalVisible}
               onRequestClose = {() => { console.log("Modal has been closed.") } }>
              <Header>
                <Left>
                  <Button transparent onPress={this._hideModal}>
                      <Icon name='close' />
                  </Button>
                </Left>
                <Body>
                  <Title>Artículo</Title>
                </Body>
                <Right>
                </Right>
              </Header>
              <Container style={{flex:1}}>
                <Container>
                  <Content contentContainerStyle={{ flex: 1 }}>
                    <WebView 
                    startInLoadingState={true}
                    source={{ uri: this.state.viewLink }}  />
                  </Content>
                </Container>
              </Container>
        </Modal>

        //Body for the permanent screen
        <Header>
          <Left>
            <Button transparent >
              <Icon name='search' />
            </Button>
          </Left>
          <Body>
              <Title>CriptoNoticias</Title>
          </Body>
          <Right>
            <Button transparent >
              <Icon active name='moon' />
            </Button>
          </Right>
        </Header>

        
        <Content>
          <FeaturedArticle _onClick={this._showModal}/>

          <Grid>
            <Col style={{ backgroundColor: '#635DB7', height: 100 }}> <Text>ACTIVO</Text></Col>
            <Col style={{ backgroundColor: '#00CE9F', height: 100 }}><Text>ACTIVO</Text></Col>
            <Col style={{ backgroundColor: '#635DB7', height: 100 }}><Text>ACTIVO</Text></Col>
          </Grid>

          <H1> ULTIMAS NOTICIAS </H1>
          <List>
            {newsList}
          </List>
        </Content>

        <BottomMenu />

      </Container>

    );
  }
}