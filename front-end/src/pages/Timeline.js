import React, { Component } from 'react'
import './Timeline.css'
import logo from '../twitter.svg'
import api from '../services/api'
import Tweet from '../components/Tweet'
import socket from 'socket.io-client'

export default class Timeline extends Component {
    state = {
        tweets: [],
        newTweet: ''
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
        console.log(res)
        this.setState({ tweets: res.data })
    }

    handleInputChange = (event) => {
        this.setState({ newTweet: event.target.value })
    }

    handleNewTweet = async (event) => {
        if (event.keyCode != 13) return

        const content = this.state.newTweet
        const author = localStorage.getItem(`@User`)
        await api.post('tweets', { content, author })
        this.setState({ newTweet: '' })
    }

    render() {
        return (
            <div className="timeline-wrapper">
                <img height={24} src={logo} alt="GoTitter"></img>
                <form>
                    <textarea
                        value={this.state.newTweet}
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleNewTweet}
                        placeholder='O que esta acontecendo'
                    ></textarea>

                </form>
                <ul className="tweet-list">
                    {this.state.tweets.map(item => (
                        <Tweet key={item._id} tweet={item}></Tweet>
                    ))}
                </ul>
            </div>
        )
    }
}
