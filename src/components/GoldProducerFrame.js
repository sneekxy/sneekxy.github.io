import React, { Component } from "react";
import GoldProducer from './GoldProducer';

class GoldProducerFrame extends Component {
    render() {
        return (
            <div id="goldProducers" className="tabMenu" >
                <GoldProducer />
                <GoldProducer />
                <GoldProducer />
                <GoldProducer />
                <GoldProducer />
                <GoldProducer />
                <GoldProducer />
                <GoldProducer />
                <GoldProducer />
                <GoldProducer />
                <span id="goldUpgrade" className="upgradeHolder" />
                <span id="goldUpgradeBought" className="upgradeHolderBought" />
            </div>
        )
    }
}

export default GoldProducerFrame;