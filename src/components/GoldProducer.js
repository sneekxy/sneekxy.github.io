import React, { Component } from "react";

class GoldProducer extends Component{
    render() {
        return (
            <div id="gold0" className="buildingLine">
              <span className="tooltipHolder">
                <span id="gold0BuildingName" className="buildingLineName"/><span id="gold0TT" className="tooltip"/>
              </span>
                <span id="gold0BuildingOwned" className="buildingLineAmount"/>
                <span id="gold0BuildingEarned" className="buildingLineEarned"/>
                <span id="gold0Merge" className="buildingMerge">Merge Cards<span id="gold0MergeTT" className="tooltip"/></span>
            </div>
        )
    }
}

export default GoldProducer;