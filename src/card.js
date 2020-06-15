function createRandomCard(spec){
	var rarity;
	var cardRarity;
	var cardLimit;
	if(!(spec > 0)){
		rarity = getRandomRarity();
		switch(rarity){
			case(0): cardRarity = commonCards; break;
			case(1): cardRarity = uncommonCards; break;
			case(2): cardRarity = rareCards; break;
		}
		var cardNum = Math.floor(Math.random() * cardRarity.length);
		
		if(playerStats.goldUpgrades[5] == 0 && rarity == 0)
			cardNum = cardNum%4;
		if(rarity == 1){
			if(cardNum == 0 && playerStats.goldUpgrades[10] == 0){
				cardNum = 1;
			}
			if(cardNum > 5){
				cardNum -= 4;
			}
		}
		var c = new card(cardRarity[cardNum]);
		addCards(c, 1);
	}
	else{
		if(spec == 1)
			var c = new card(commonCards[0]);
		if(spec == 2)
			var c = new card(uncommonCards[1]);
		addCards(c, 1);
	}
	
	
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
	if(playerStats.goldUpgrades[11] == 1){
		while(pass){
			if(doLuck(playerStats.upgradeChance)){
				retVal++
				pass = false;
			}
			else{
				pass = false;
			}
		}
		if(retVal > 1)
			retVal = 1;
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