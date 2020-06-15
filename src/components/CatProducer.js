import React, { Component } from "react";

class CatProducer extends Component{
    render() {
        return (
            <div id="cat0" className="buildingLine">
                <span id="cat0BuildingName" className="buildingLineName" />
                <span id="cat0BuildingOwned" className="buildingLineAmount" />
                <span id="cat0BuildingEarned" className="buildingLineEarned" />
            </div>
        )
    }
}

export default CatProducer;