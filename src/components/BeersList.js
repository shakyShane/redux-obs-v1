import React from "react";
import {connect} from "react-redux";

export function BeerList(props) {
    const {data, loading} = props;
    return (
        <div>
            {loading && (
                <p>Please wait...</p>
            )}
            {!loading && (
                <div>
                    <p>Got {data.length} beer(s)</p>
                </div>
            )}
        </div>
    )
}

export default connect(state => state.beers)(BeerList);
