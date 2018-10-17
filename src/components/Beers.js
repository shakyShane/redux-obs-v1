import React from "react";
import {connect} from "react-redux";
import {BeerList} from "./BeersList";
import {search} from "../reducers/beersActions";

export function Beers(props) {
    const {data, status, search} = props;
    return (
        <>
            <div className="App-inputs">
                <input
                    type="text"
                    placeholder="Search beers"
                    onChange={(evt) => search(evt.target.value)}
                />
                {status === "pending" && (
                    <span className="App-spinner">
                        <img src={"/ajax-loader.gif"} alt="spinner"/>
                    </span>
                )}
            </div>
            {status === "success" && (
                <div className="App-content">
                    <BeerList beers={data}/>
                </div>
            )}
        </>
    )
}

export default connect(state => state.beers, {search})(Beers);
