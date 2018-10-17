import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from "react-redux";
import Beers from "./components/Beers";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Beers />
            </div>
        );
    }
}

export default connect(state => state.app)(App);
