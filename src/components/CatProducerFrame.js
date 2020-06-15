import React, { Component } from 'react';
import CatProducer from './CatProducer'

class CatProducerFrame extends Component {
    render() {
        return (
            <div id="catProducers" className="tabMenu" style={{display: "none"}}>
                <CatProducer />
                <CatProducer />
                <CatProducer />
                <CatProducer />
                <CatProducer />
                <CatProducer />
                <CatProducer />
                <CatProducer />
                <CatProducer />
                <div id="catMultiHolder" className="catMultiHolder">
                    You have <span id="catMultiAmt" /> cats. Providing a <span id="catMultiVal" />x multiplier to gold.
                </div>

                <span id="catUpgrade" className="upgradeHolder" />
                <span id="catUpgradeBought" className="upgradeHolderBought" />
            </div>
        )
    }
}

export default CatProducerFrame
