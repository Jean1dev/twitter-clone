import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    FlatList
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons'
import api from '../services/api'
import Tweet from '../components/tweet'
import socket from 'socket.io-client'

export default class TimeLine extends Component {
    static navigationOptions = ({ navigation }) =>  ({
        title: 'Tweets',
        headerRight: (
            <TouchableOpacity onPress={() => navigation.navigate('New')}>
                <Icon name="add-circle-outline" size={24} color="#$BB0EE" style={{ marginRight: 20 }}></Icon>
            </TouchableOpacity>
        ),
    })

    state = {
        tweets: [],
    }

    subscribeToEvents = () => {
        const io = socket('http://localhost:8080')
        io.on('tweet', data => {
            this.setState({
                tweets: [data, ...this.state.tweets]
            })
        })
        io.on('like', data => {
            this.setState({
                tweets: this.state.tweets.map(tweet =>
                    tweet._id == data._id ? data : tweet
                )
            })
        })
    }

    async componentDidMount() {
        this.subscribeToEvents()
        const res = await api.get('tweets')
        this.setState({ tweets: res.data })
    }

    render() {
        return (
            <View style={styles.container} >
                <FlatList
                    data={this.state.tweets}
                    keyExtractor={tweet => tweet._id}
                    renderItem={({ item }) => <Tweet tweet={item}></Tweet>}
                ></FlatList>
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    }
});
