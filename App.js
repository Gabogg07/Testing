import React, { Component } from 'react';
import { StatusBar, WebView } from 'react-native';
import { Font, AppLoading } from 'expo';
import { View, Examples,NavigationBar } from '@shoutem/ui';
import { Container, Header, Content, Footer, FooterTab, Button, Body, Icon, Text, Title } from 'native-base';

import Article from './Article'
import Home from './Home'
import FeaturedArticle from './FeaturedArticle'
import News_Picture from './News_Picture'
import BottomMenu from "./BottomMenu";

export default class App extends React.Component {

 render() {
        return (<Home/>);
  }
}
