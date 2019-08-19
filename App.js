import React, {Component} from 'react';
import {Image, View} from 'react-native';
import Routes from './src/routes/navigator/nav';
import store from './src/config/store';
import { Provider } from 'react-redux';
import './src/reducers';
import { LoginChker } from './src/config/AppMethod';

export default class App extends Component{

  constructor(props) {
    super(props)
    this.state = { 
        isLogged: null
      };
}

  componentDidMount(){

    var datathis = this;

    LoginChker(datathis)
    
  }

  render() {
    return (
            this.state.isLogged == null ? 
            <View style={{ flex:1,alignItems:'center',justifyContent:'center',backgroundColor: '#1b2129' }}>
                <Image source={require('./src/assets/load.gif')} style={{height:60, width:60}}></Image>
            </View>
            : 
            <Provider store={store}>
              <Routes status={this.state.isLogged}/>
            </Provider>
    );
  }
}
