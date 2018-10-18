import React from "react";
import {connect} from "react-redux";
import {BeerList} from "./BeersList";
import {cancel, search} from "../reducers/beersActions";

export function Beers(props) {
    const {data, messages, status, search, cancel} = props;
    return (
        <>
            <div className="App-inputs">
                <input
                    type="text"
                    placeholder="Search beers"
                    onChange={(evt) => search(evt.target.value)}
                />
                {status === "pending" && (
                    <>
                    <button type="button" onClick={cancel}>Cancel</button>
                    <span className="App-spinner">
                        <img src={"/ajax-loader.gif"} alt="spinner"/>
                    </span>
                    </>
                )}
            </div>
            {status === "success" && (
                <div className="App-content">
                    <BeerList beers={data}/>
                </div>
            )}
            {status === "failure" && (
                <div className="App-messages">
                    <p>Oops! {messages[0].text}</p>
                </div>
            )}
        </>
    )
}

export default connect(state => state.beers, {search, cancel})(Beers);
