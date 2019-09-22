import React from "react";
import {connect} from "react-redux";
import {BeerList} from "./BeersList";
import {fetchData} from "../reducers/beersActions";

export function Beers(props) {
    const {data, status, fetchData} = props;
    return (
        <>
            <div className="App-inputs">
                <button type="button" onClick={fetchData} disabled={status === "pending"}>
                    Fetch Beers!
                </button>
                {status === "pending" && (
                    <span className="App-spinner">
                        <img src={"/ajax-loader.gif"} />
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

export default connect(state => state.beers, {fetchData})(Beers);
