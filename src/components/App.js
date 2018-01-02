import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import firebase from 'firebase';
import Login from './Login';
import Loader from './Loader';
import Navigation from './Navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers/PeopleReducer';
import Thunk from 'redux-thunk';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
applyMiddleware(Thunk));

export default class App extends Component<{}> {
  state = {
    loggedIn: null
  };
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyAWwIEeEwNwBkYZyQCbqLDLC00Yky5TEXQ",
      authDomain: "crm-react-native-61cb4.firebaseapp.com",
      databaseURL: "https://crm-react-native-61cb4.firebaseio.com",
      projectId: "crm-react-native-61cb4",
      storageBucket: "crm-react-native-61cb4.appspot.com",
      messagingSenderId: "706051852860"
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }
  renderInitialView() {
    switch(this.state.loggedIn) {
      case true:
        return <Navigation />;
      case false:
        return <Login />;
      default:
        return <Loader size="large" />;
    }
  }
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {this.renderInitialView()}
        </View>
      </Provider>
    );
  }
}
