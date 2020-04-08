import React, { Component } from 'react'
import './Login.css'
import logo from '../twitter.svg'

export default class Login extends Component {
    state = {
        username: '',

    }

    handleInputChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    submit = (event) => {
        event.preventDefault()
        const { username } = this.state
        if(!username.length) return

        localStorage.setItem('@User', username)
        this.props.history.push('/timeline')
    }

    render() {
        return (
            <div className="login-wrapper">
                <img src={logo} alt="GoTwitter"></img>
                <form onSubmit={this.submit}>
                    <input
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        placeholder="usuario"></input>
                    <button type="submit">Entrar</button>
                </form>
            </div>
        )
    }
}
