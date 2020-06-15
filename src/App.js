import React, { Component } from 'react';
import GoldProducerFrame from './components/GoldProducerFrame';
import CatProducerFrame from './components/CatProducerFrame';

const currencyHolderStyle = {
  position: 'absolute',
  left: '150px',
  display: 'none'
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {render: 'gold'}
  }

  changeMenu(menuName){
    this.setState({render: menuName});
  }

  renderProducerFrame() {
    switch (this.state.render) {
      case 'gold': return <GoldProducerFrame/>;
      case 'cats': return <CatProducerFrame/>;
    }
  }

  render() {
    return (
        <div id="wholeDocument">
          Cards:
          <span id="cardList"/>
          <span id="catCurrencyHolder" style={currencyHolderStyle}>
		  Cats: <span id="cats"/>
		</span>
          <br/>
          Gold: <span id="gold"/>
          <div id="buyPackHolder" className="buyPackHolder">
            <div id="buyPack" className="buyPack">
              <span id="buyPackButton" className="buyPackButton" onClick="buyPacks()">Buy More Cards</span>
              <span id="buyAmount" className="buyAmount" onClick="changeBuyAmount()">x1</span>
              <span id="packCost" className="packCost">Cost 100 gold</span>
            </div>
          </div>
          {this.renderProducerFrame()}

          <div id="menuSelector" className="menuSelectorHolder">
            <div id="goldMenuSelector" className="menuSelector" onClick={this.changeMenu.bind(this, 'gold')}>Gold</div>
            <div id="catMenuSelector" className="menuSelector" onClick={this.changeMenu.bind(this, 'cats')}>Cat</div>
          </div>
        </div>
    )
  }
}
export default App
