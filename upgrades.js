function populateUpgrades(){
	$("#goldUpgrade").empty();
	$("#goldUpgradeBought").empty();
	var upgCopy = playerStats.goldUpgrades.slice();
	upgCopy.forEach(function(value, index){
		if(value == 0){
			var upgSt = gUpgrades[index];
			upgSt = upgSt.split(";");
			var costType = getCostType(upgSt[4]);
			var st = "<div id='upgrade"+index+"' class='upgradeItem' style='background-image:url(\"art/gUpg"+index+".png\");' onClick='buyUpgrade("+upgSt[0]+","+upgSt[3]+",\""+upgSt[4]+"\")'>"
			+"<span class='tooltip'>"+upgSt[1]+"<br>"+upgSt[2]+".<br>Cost: "+upgSt[3]+" "+costType+"</span></div>";
			var oldVal = $("#goldUpgrade").html();
			$("#goldUpgrade").html(oldVal+st);
		}
		else{
			var upgSt = gUpgrades[index];
			upgSt = upgSt.split(";");
			var st = "<div id='upgrade"+index+"' class='upgradeItemBought' style='background-image:url(\"art/gUpg"+index+".png\");'>"
			+"<span class='tooltip'>"+upgSt[1]+"<br>"+upgSt[2]+"</span></div>";
			var oldVal = $("#goldUpgradeBought").html();
			$("#goldUpgradeBought").html(oldVal+st);
		}
	});
	
}

function buyUpgrade(id, cost, costType){
	if(costType == "g"){
		if(playerStats.gold >= cost){
			playerStats.gold -= cost;
			playerStats.goldUpgrades[id] = 1;
			populateUpgrades();
		}
	}
}
function getCostType(s){
	var retVal = "";
	switch(s){
		case("g"): retVal = "Gold"; break;
	}
	return retVal;
}

var gUpgrades = [
"0;Stacking Cards;Buying cards give an additional card;500;g",
"1;Inflation;Gold generated from all 'Coin' cards is doubled;1300;g",
"2;Weighted Face;Fliping coins have an extra 5% chance to have a positive outcome;2000;g",
"3;Two Random;When too random isn't enough you go to two! Too Random coins have an extra outcome;2500;g",
"4;Better Mint;Increses the lower range of Counterfeit Coins based on the upper end;3300;g",
"5;Expansion Pack;Unlocks more gold cards when you Buy.More.Cards.;5000;g",
"6;Luck++;Lucky COins are a tiny bit luckier and have better luck scaling. Don't know what luck is? me neither..;10000;g",
"7;Double up;When you use your Duplication spell the first use is free! (100% chance and no reduction) Is this too strong?;25000;g",
"8;AHHHHHH I WON YESSSSSSSSSS LUCKY NUMBERS!;Lottery Tickets generate an extra line;60000;g",
"9;Ring ring, tax man, ma'am;Tax Collection coins are a bit stronger;100000;g",
];