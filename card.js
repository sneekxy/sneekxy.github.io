function createRandomCard(){
	var rarity = getRandomRarity();
	var cardRarity;
	switch(rarity){
		case(0): cardRarity = commonCards; break;
		case(1): cardRarity = uncommonCards; break;
		case(2): cardRarity = rareCards; break;
	}
	var c = new card(cardRarity[Math.floor(Math.random() * cardRarity.length)]);
	addCards(c, 1);
	
}
function card(card){
	var res = card.split(":");
	this.name = res[1];
	this.rarity = res[2];
	this.description = res[3];
	this.effect = res[4];
	this.id = res[0];
}
var cardHolder = [];
var cardHolderAmt = new Object();
function addCards(c, num){
	if(!(c.id in cardHolderAmt)){
			cardHolderAmt[c.id] = num;
			cardHolder.push(c);
		}
		else{
			cardHolderAmt[c.id] += num;
		}
};

function getRandomRarity(){
	var retVal = 0;
	var pass = true;
	while(pass){
		if(doLuck(20)){
			retVal++
		}
		else{
			pass = false;
		}
	}
	if(retVal > 2)
		retVal = 2;
	
	return retVal;
}

function getCardAmt(id){
	var retVal = 0;
	if(id in cardHolderAmt){
		retVal = cardHolderAmt[id];
	}
	return retVal;
}

function getCardCount(){
	var retVal = 0;
	for(var key in cardHolderAmt){
		retVal += cardHolderAmt[key];
	}
	return retVal;
}