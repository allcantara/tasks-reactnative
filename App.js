// @ts-nocheck
import React from 'react';
import { StatusBar, YellowBox, ActivityIndicator } from 'react-native';
import { AppLoading } from "expo";
import * as Font from 'expo-font'
import Agenda from './src/screens/Agenda';

// YellowBox.ignoreWarnings([
//   'Warning: DatePickerAndroid has been merged',
// ]);

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      fontLoaded: false
    }
  }

  componentWillMount() {
    this._loadAssetsAsync();
  }

  _loadAssetsAsync = async () => {
    await Font.loadAsync({
      'lato-regular': require('./assets/fonts/Lato-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  };

  async componentDidMount() {
    await Font.loadAsync({
      'lato-regular': require('./assets/fonts/Lato-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }

    return (
        <>
        <StatusBar backgroundColor="#FFF" barStyle="light-content" />
        {this.state.fontLoaded ? <Agenda /> : <ActivityIndicator size="large" />}
        <Agenda />
      </>
    );
  }
}

