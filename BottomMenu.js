import React, { Component } from 'react';
import { StatusBar, WebView } from 'react-native';
import { Font, AppLoading } from 'expo';
import { View, Examples,NavigationBar } from '@shoutem/ui';
import { Container, Header, Content, Footer, FooterTab, Button, Body,Left, Right, Icon, Text, Title } from 'native-base';

export default class BottomMenu extends React.Component {
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
        <Footer>
          <FooterTab>
            <Button vertical>
              <Icon name="home" />
              <Text style={{fontSize: 6.5}}>Home</Text>
            </Button>
            <Button vertical>
              <Icon name="bookmark" />
              <Text style={{fontSize: 6.5}}>Favoritos</Text>
            </Button>
            <Button vertical active>
              <Icon active type="Entypo" name="line-graph" />
              <Text style={{fontSize: 6.5}}>Mercado</Text>
            </Button>
            <Button vertical>
              <Icon name="play" />
              <Text style={{fontSize: 6.5}}>Videos</Text>
            </Button>
            <Button vertical  onPress={console.log("xx")}>
              <Icon name="ios-menu" />
              <Text style={{fontSize: 6.5}}>Menu</Text>
            </Button>
          </FooterTab>
        </Footer>
    );
  }
}