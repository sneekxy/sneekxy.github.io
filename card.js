function createRandomCard(){
	var rarity = getRandomRarity();
	var cardRarity;
	var cardLimit;
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
	this.name = res[2];
	this.rarity = Number(res[3]);
	this.description = res[4];
	this.effect = res[5];
	this.upgradeLine = Number(res[0]);
	this.id = Number(res[1]);
	this.getRarity = function(){
		var retVal = "Common";
		switch(this.rarity){
			case(2): retVal = "Uncommon"; break;
			case(3): retVal = "Rare"; break;
			case(4): retVal = "Fabled"; break;
			case(5): retVal = "Exquisite"; break;
			case(6): retVal = "Legendary"; break;
			case(7): retVal = "Illustrious"; break;
			case(8): retVal = "Mythic"; break;
			case(9): retVal = "Exalted"; break;
		}
		return retVal;
	}
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
	if(playerStats.unlockUncommon == 1){
		while(pass){
			if(doLuck(playerStats.upgradeChance)){
				retVal++
			}
			else{
				pass = false;
			}
		}
		if(retVal > 2)
			retVal = 2;
	}
	
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