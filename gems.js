function showGemBuildings(){
	$('#gemCurrencyHolder').show();
	var gc = playerStats.gemChance;
	if(gc < 1)
		gc = formatNumber(gc*100)/100;
	$('#gemTT').text("Every "+formatNumber(playerStats.gemCatsNeeded)+" cats have a "+gc+"% chance to find a gem each turn");
	if($('#gemProducers').is(":visible")){
		$('#gemCost').text(formatNumber(gemCardCost()));
		$('#gemCost2').text(formatNumber(totalGemCost(maxGemCost())));
		$('#gemCost3').text(formatNumber(maxGemCost()));
		for(var x =0; x<7; x++){
			var c = getHighestRarityOfLine(x+16);
			if(typeof c !== 'undefined'){
				$('#gem'+x).show();
				$('#gem'+x+'BuildingName').text(c.name);
				$('#gem'+x+"TT").html(getBuildingTooltip(c.upgradeLine));
				$('#gem'+x+'BuildingOwned').text(formatNumber(getCardAmt(c.id)));
				if(x != 0){
					$('#gem'+x+'BuildingEarned').text(formatNumber(playerStats["gem"+(x+1)+"Earned"])+"%");
				}
				else{
					var gc = playerStats["gem"+(x+1)+"Earned"];
					if(gc < 1000)
						gc = formatNumber(gc)/100;
					$('#gem'+x+'BuildingEarned').text(gc+"%");
				}
			}
		}
	}
}
function buyGemCard(n){
	var cost = gemCardCost();
	if(playerStats.gems >= cost){
		if(n == 0){
			playerStats.gems -= cost;
			for(var x=0; x < playerStats.gemBuyAmt; x++){
				var c = new card(gemCards[Math.floor(Math.random() * gemCards.length)]);
				addCards(c,1);
			}
			playerStats.gemsBought++;
		}
		else{
			var maxGems = maxGemCost();
			if(maxGems > 0){
				playerStats.gems -= totalGemCost(maxGems);
				playerStats.gemsBought += maxGems;
				for(var x=0; x < playerStats.gemBuyAmt * maxGems; x++){
					var c = new card(gemCards[Math.floor(Math.random() * gemCards.length)]);
					addCards(c,1);
				}
			}
		}
		
		populateUpgrades();
		updateGameDisplay();
	}
}
function gemCardCost(n){
	if(n == undefined)
		n = playerStats.gemsBought;
	var baseVal = 100;
	var retVal = 0;
	if(playerStats.catUpgrades[14] == 1){
		baseVal *= .5;
		n *= .85;
	}
	retVal = Math.floor(baseVal*(Math.pow(1.0395,n)));

	return retVal;
}
function maxGemCost(){
	var gemHolder = playerStats.gems;
	var retVal = 0;
	var n = playerStats.gemsBought;
	while(gemHolder > 0){
		gemHolder -= gemCardCost(n);
		n++;
		if(gemHolder >= 0)
			retVal++
	}
	return retVal;
}
function totalGemCost(n){
	var retVal = 0;
	for(var x=0; x < n; x++){
		retVal += gemCardCost(playerStats.gemsBought+x);
	}
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