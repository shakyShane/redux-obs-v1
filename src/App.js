import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from "react-redux";
import BeerList from "./components/BeersList";

class App extends Component {
    render() {
        return (
            <div className="App">
                <BeerList />
            </div>
        );
    }
}

export default connect(state => state.app)(App);
