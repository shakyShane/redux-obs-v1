import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from "react-redux";

class App extends Component {
    render() {
        console.log(this.props);
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/> <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                > Learn React </a>
                </header>
            </div>
        );
    }
}

export default connect(state => state.app)(App);
