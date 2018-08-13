import React, { Component } from 'react';
import { StatusBar, WebView } from 'react-native';
import { Font, AppLoading } from 'expo';
import { View, Examples,NavigationBar } from '@shoutem/ui';
import { Container, Header, Content, Footer, FooterTab, Button, Body,Left, Right, Icon, Text, Title } from 'native-base';


export default class Article extends React.Component {
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

  render() {
    if (!this.state.fontsAreLoaded) {
      return <AppLoading />;
    }

    return (
      <Container style={{flex:1}}>
        <Header>
          <Left>
            <Button transparent onPress={this.props._hideModal()}>
                <Icon name='close' />
            </Button>
          </Left>
          <Body>
            <Title>Artículo</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Container>
          <Content contentContainerStyle={{ flex: 1 }}>
            <WebView 
            startInLoadingState={true}
            source={{ uri: this.props.viewLink }}  />
          </Content>
        </Container>

      </Container>

    );
  }
}