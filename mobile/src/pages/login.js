import React, { Component } from 'react';

import {
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  View, 
  StyleSheet,
  AsyncStorage
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'
// import styles from './styles';

export default class pages extends Component {

  state = {
    username: ''
  }

  handleInputChange = (username) => {

  }

  handleLogin = async () => {
    const { username } = this.state
    if(!username.length) return
    await AsyncStorage.setItem('@Username', username)
    this.props.navigation.navigate('App')
  }

  async componentDidMount() {
    const _username = await AsyncStorage.getItem('@Username')
    if(_username){
      this.props.navigation.navigate('App')
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.content}>
          <View>
            <Icon name="twitter" size={64} color="#$BB0EE"></Icon>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            returnKeyType="send"
            value={this.state.username}
            onSubmitEditing={ this.handleLogin }
            onChangeText={this.handleInputChange}
          ></TextInput>
          <TouchableOpacity onPress={() => { this.handleLogin }} style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    height: 44,
    paddingHorizontal: 15,
    alignSelf: "stretch",
    marginTop: 30
  },

  button: {
    height: 44,
    alignSelf: "stretch",
    marginTop: 10,
    backgroundColor: "#4BB0EE",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  }
});
