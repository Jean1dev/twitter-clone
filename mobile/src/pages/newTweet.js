import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    SafeAreaView,
    Text,
    TouchableOpacity,
    TextInput,
    AsyncStorage
} from 'react-native';

import api from '../services/api'
import Icon from 'react-native-vector-icons/MaterialIcons'
// import styles from './styles';

export default class NewTweet extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        new: ''
    }

    goBack = () => {
        this.props.navigation.pop()
    }

    handleTweet = async () => {
        const content = this.state.new
        const author = await AsyncStorage.getItem(`@Username`)
        await api.post('tweets', {author, content})
        this.goBack()
    }

    handleInputChange = (text) => {
        this.setState({ new: text })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>

                    <TouchableOpacity onPress={this.goBack}>
                        <Icon name="close" size={24} color="#4BB0EE"></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.handleTweet}>
                        <Text style={styles.buttonText}>Tweetar</Text>
                    </TouchableOpacity>
                </View>

                <TextInput
                    style={styles.input}
                    multiline
                    placeholder="Oque esta acontecendo?"
                    placeholderTextColor="#999"
                    value={this.state.new}
                    returnKeyType="send"
                    onSubmitEditing={this.handleTweet}
                    onChangeText={this.handleInputChange}></TextInput>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },

    header: {
        paddingTop: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    button: {
        height: 32,
        paddingHorizontal: 20,
        borderRadius: 16,
        backgroundColor: "#4BB0EE",
        justifyContent: "center",
        alignItems: "center"
    },

    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold"
    },

    input: {
        margin: 20,
        fontSize: 16,
        color: "#333"
    }
});
