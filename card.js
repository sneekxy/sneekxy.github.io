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
			if((cardNum > 1 && cardNum < 7) && playerStats.catUpgrades[0] == 0)
				cardNum = 1;
			if((cardNum > 4 && cardNum < 7) && playerStats.goldUpgrades[29] == 0)
				cardNum = 1;
			if(cardNum > 10 && playerStats.goldUpgrades[12] == 0){
				cardNum -= 4;
			}
		}
		if(rarity == 2){
			if(cardNum > 14 && (playerStats.catUpgrades[15] != 1 || playerStats.goldUpgrades[30] != 1))
				cardNum = Math.floor(Math.random() * 15);
			if(cardNum < 9 && playerStats.goldUpgrades[30] == 0)
				cardNum = 9;
			if(cardNum > 8 && cardNum < 15 && playerStats.catUpgrades[15] == 0)
				cardNum = 1;
			
		}
		var c = new card(cardRarity[cardNum]);
		addCards(c, 1);
	}
	else{
		if(spec == 1)
			var c = new card(commonCards[0]);
		if(spec == 2)
			var c = new card(uncommonCards[1]);
		if(spec == 3){
			var rng = 4;
			if(playerStats.goldUpgrades[29] == 1){
				rng = 6;
			}
			var c = new card(uncommonCards[Math.floor(Math.random() * (rng)+1)]);
		}
		addCards(c, 1);
	}
	playerStats.cardsOwned = getCardCount();
	playerStats.cardsOwnedTotal++;
	
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
			case(10): retVal = "Gem"; break;
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

function buildCardHolder(cha){
	for(key in cha){
		var c = getCardByID(key);
		if(c != ""){
			cardHolder.push(c);
		}
	}
}
function getCardByID(id){
	var retVal = "";
	for(var x = 0; x < cardDB.length; x++){
		var holder = cardDB[x];
		var holderID = Number(holder[holder.length-1].split(":")[1]);
		if(id <= holderID){
			for(var y = 0; y < holder.length; y++){
				var holdID = Number(holder[y].split(":")[1]);
				if(id == holdID){
					retVal = new card(holder[y]);
					break;
				}
			}
			break;
		}
		else{
			continue;
		}
	}
	return retVal;
}
function getRandomRarity(){
	var retVal = 0;
	var pass = true;
	if(playerStats.goldUpgrades[11] == 1){
		while(pass){
			if(doLuck(playerStats.upgradeChance+(playerStats.catUpgrades[3]*5))){
				retVal++
			}
			else{
				pass = false;
			}
		}
		if(retVal > 2)
			retVal = 2;
		
		if(playerStats.rareEnable == 0){
			if(retVal > 1)
				retVal = 1;
		}
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

function getHighestRarityOfLine(ugl){
	var cardList = cardHolder.slice();
	cardList = cardList.filter(card => card.upgradeLine == ugl);
	cardList.sort(function(a,b){
		if(a.rarity > b.rarity){
			return -1;
		}
		if( a.rarity < b.rarity){
			return 1;
		}
		return 0;
	});
	return cardList[0];
}
function getCardAmtOfLine(ugl){
	var retVal = 0;
	var cl = cardHolder.slice();
	cl = cl.filter(card => card.upgradeLine == ugl);
	for(var key in cl){
		retVal += getCardAmt(cl[key].id);
	}
	return retVal;
}

function hasCardOfLine(ugl){
	var retVal = false;
	if(cardHolder.some(e => e.upgradeLine == ugl)){
		retVal = true;
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