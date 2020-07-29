function buyGemCard(){
	if(playerStats.gems >= gemCardCost()){
		playerStats.gems -= gemCardCost();
		for(var x=0; x < playerStats.gemBuyAmt; x++){
			var c = new card(gemCards[Math.floor(Math.random() * gemCards.length)]);
			addCards(c,1);
		}
		playerStats.gemsBought++;
		populateUpgrades();
		updateGameDisplay();
	}
}
function gemCardCost(){
	var gBVal = playerStats.gemsBought;
	var baseVal = 100;
	if(playerStats.catUpgrades[14] == 1){
		baseVal *= .5;
		gBVal *= .85;
	}
	var retVal = Math.floor(baseVal*(Math.pow(1.0395,gBVal)));
	return retVal;
}
function backFillGemCards(){
	for(var x=0; x<playerStats.gemsBought; x++){
		var c = new card(gemCards[Math.floor(Math.random() * gemCards.length)]);
		addCards(c,1);
	}
}
function getGems(){
	var c = playerStats.cat/playerStats.gemCatsNeeded;
	var gems = 0;
	if(c >= 1){
		var iter = c;
		var cc = 1;
		if(c > 50){
			iter = 50;
			cc = c/50;
		}
		for(var x = 0; x <iter; x++){
			if(doLuck(playerStats.gemChance)){
				gems+=cc;
			}
		}
	}
	return Math.floor(gems);
}