import React, { Component } from 'react';
import { StatusBar, WebView, Image, View } from 'react-native';
import { Font, AppLoading } from 'expo';
import { Container, Header, Content, Footer, FooterTab, Button, Body,Left, Right, Icon, Text, Title, Card, CardItem, Col, Grid, H3, H1, List, ListItem, Thumbnail} from 'native-base';

export default class Home extends React.Component {
  state = {
    fontsAreLoaded: false,
    articulo:'https://www.criptonoticias.com/adopcion/escritor-padre-rico-padre-pobre-asegura-criptomonedas-reemplazaran-dolar/amp/'
  };

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
          <Card>
            <CardItem cardBody>
              <Image source={{uri: 'https://i2.wp.com/www.criptonoticias.com/wp-content/uploads/2018/08/Robert-Kiyosaki-criptomonedas-d%C3%B3lar.jpg?resize=800%2C449&ssl=1'}}
               style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
                <Text> Categoria </Text>
            </CardItem>
            <CardItem cardBody>
              <H3>'ESCRITOR DE “PADRE RICO, PADRE POBRE” ASEGURA QUE CRIPTOMONEDAS REEMPLAZARÁN AL DÓLAR'</H3>
            </CardItem>
            <CardItem>
              <Text>Fecha/Hora</Text>
              <Body style={{flexDirection: "row"}} >
                  <Button transparent>
                    <Icon  type = "Entypo" name='export' />
                  </Button>
                  <Button transparent>
                    <Icon  name='bookmark' />
                  </Button>
              </Body>
            </CardItem>
          </Card>

          <Grid>
            <Col style={{ backgroundColor: '#635DB7', height: 100 }}> <Text>ACTIVO</Text></Col>
            <Col style={{ backgroundColor: '#00CE9F', height: 100 }}><Text>ACTIVO</Text></Col>
            <Col style={{ backgroundColor: '#635DB7', height: 100 }}><Text>ACTIVO</Text></Col>
          </Grid>

          <H1> ULTIMAS NOTICIAS </H1>
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: 'Image URL' }} />
              </Left>
              <Body>
                <Text>Sankhadeep</Text>
                <Text note numberOfLines={1}>Its time to build a difference . .</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: 'Image URL' }} />
              </Left>
              <Body>
                <Text>Sankhadeep</Text>
                <Text note numberOfLines={1}>Its time to build a difference . .</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{uri: 'https://i2.wp.com/www.criptonoticias.com/wp-content/uploads/2018/08/Robert-Kiyosaki-criptomonedas-d%C3%B3lar.jpg?resize=800%2C449&ssl=1'}} />
              </Left>
              <Body>
                <Text>Sankhadeep</Text>
                <Text note numberOfLines={1}>Its time to build a difference . .</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
        </Content>

        <Footer>
          <FooterTab>
            <Button vertical>
              <Icon name="apps" />
              <Text>Apps</Text>
            </Button>
            <Button vertical>
              <Icon name="camera" />
              <Text>Camera</Text>
            </Button>
            <Button vertical active>
              <Icon active name="navigate" />
              <Text>Navigate</Text>
            </Button>
          </FooterTab>
        </Footer>

      </Container>

    );
  }
}