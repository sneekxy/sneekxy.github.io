function populateUpgrades(){
	$("#goldUpgrade").empty();
	$("#goldUpgradeBought").empty();
	$("#catUpgrade").empty();
	$("#catUpgradeBought").empty();
	var upgCopy = playerStats.goldUpgrades.slice();
	upgCopy.forEach(function(value, index){
		var showUpg = true;
		if(playerStats.unlockGUpgrades[index] != 1)
			showUpg = false;
		if(showUpg){
			if(value == 0){
				var upgSt = gUpgrades[index];
				upgSt = upgSt.split(";");
				var costType = getCostType(upgSt[4]);
				var st = "<div id='upgrade"+index+"' class='upgradeItem' style='background-image:url(\"art/gUpg"+index+".png\");' onClick='buyUpgrade("+upgSt[0]+","+upgSt[3]+",\""+upgSt[4]+"\")'>"
				+"<span class='tooltip'>"+upgSt[1]+"<hr class='black'><br>"+upgSt[2]+"<br>Cost: "+formatNumber(Number(upgSt[3]))+" "+costType+"</span></div>";
				var oldVal = $("#goldUpgrade").html();
				$("#goldUpgrade").html(oldVal+st);
			}
			else{
				var upgSt = gUpgrades[index];
				upgSt = upgSt.split(";");
				var st = "<div id='upgrade"+index+"holder' class='upgradeItemBoughtHolder'><span id='upgrade"+index+"' class='upgradeItemBought' style='background-image:url(\"art/gUpg"+index+".png\");'>"
				+"</span><span class='tooltip'>"+upgSt[1]+"<hr class='black'><br>"+upgSt[2]+"</span></div>";
				var oldVal = $("#goldUpgradeBought").html();
				$("#goldUpgradeBought").html(oldVal+st);
			}
		}
	});
	
	var upgCopy = playerStats.catUpgrades.slice();
	upgCopy.forEach(function(value, index){
		var showUpg = true;
		if(playerStats.unlockCUpgrades[index] != 1)
			showUpg = false;
		if(showUpg){
			if(value == 0){
				var upgSt = cUpgrades[index];
				upgSt = upgSt.split(";");
				var costType = getCostType(upgSt[4]);
				var st = "<div id='catupgrade"+index+"' class='upgradeItem' style='background-image:url(\"art/cUpg"+index+".png\");' onClick='buyUpgrade("+upgSt[0]+","+upgSt[3]+",\""+upgSt[4]+"\")'>"
				+"<span class='tooltip'>"+upgSt[1]+"<hr class='black'><br>"+upgSt[2]+"<br>Cost: "+formatNumber(Number(upgSt[3]))+" "+costType+"</span></div>";
				var oldVal = $("#catUpgrade").html();
				$("#catUpgrade").html(oldVal+st);
			}
			else{
				var upgSt = cUpgrades[index];
				upgSt = upgSt.split(";");
				var st = "<div id='catupgrade"+index+"holder' class='upgradeItemBoughtHolder'><span id='catupgrade"+index+"' class='upgradeItemBought' style='background-image:url(\"art/cUpg"+index+".png\");'>"
				+"</span><span class='tooltip'>"+upgSt[1]+"<hr class='black'><br>"+upgSt[2]+"</span></div>";
				var oldVal = $("#catUpgradeBought").html();
				$("#catUpgradeBought").html(oldVal+st);
			}
			}
	});
	
}

function buyUpgrade(id, cost, costType){
	if(costType == "g"){
		if(playerStats.gold >= cost){
			playerStats.gold -= cost;
			playerStats.goldUpgrades[id] = 1;
			if(id==11){
				$('#catCurrencyHolder').show();
				createRandomCard(2);
				playerStats.unlockGUpgrades[10] = 1;
				showGlowMenu("gold");
			}
			if(id==10){
				playerStats.unlockCUpgrades[1] = 1;
				showGlowMenu("cat");
			}
			if(id==0 || id==17){
				backFillCards();
			}
			
		}
	}
	if(costType == "c"){
		if(playerStats.cat >= cost){
			playerStats.cat -= cost;
			playerStats.catUpgrades[id] = 1;
			if(id==0){
				playerStats.unlockGUpgrades[12] = 1;
				playerStats.unlockGUpgrades[17] = 1;
				showGlowMenu("gold");
			}
			if(id == 10){
				backFillCards();
			}
		}
	}
	populateUpgrades();
	updateGameDisplay();
}
function getCostType(s){
	var retVal = "";
	switch(s){
		case("g"): retVal = "Gold"; break;
		case("c"): retVal = "Cats"; break;
	}
	return retVal;
}

var gUpgrades = [
"0;Stacking Cards;Buying cards give an additional card (get a free card for every previous card purchase);300;g",
"1;Inflation;Gold generated from all 'Coin' cards is doubled;800;g",
"2;Weighted Face;Fliping coins have an extra 5% chance to have a positive outcome;1400;g",
"3;Two Random;When too random isn't enough you go to two! Too Random coins have an extra outcome;2000;g",
"4;Better Mint;Increses the lower range of Counterfeit Coins based on the upper end;3300;g",
"5;Expansion Pack;Unlocks more gold cards when you Buy.More.Cards.;4500;g",
"6;Luck++;Lucky COins are a tiny bit luckier and have better luck scaling. Don't know what luck is? me neither..;10000;g",
"7;Double up;When you use your Duplication spell the first use is free! (100% chance and no reduction) Is this too strong?;25000;g",
"8;AHHHHHH I WON YESSSSSSSSSS LUCKY NUMBERS!;Lottery Tickets generate an extra line;60000;g",
"9;Ring ring, tax man, ma'am;Tax Collection coins are a bit stronger;100000;g",
"10;Hire Marty;Marty will be unlocked as a card type. He evalulates your other gold cards giving an increase to their value. Note: Marty is rarer than other cards;300000;g",
"11;Buy Cat Food;Buying cat food will give you a cat card. Cats provide you with more gold. Also unlocks uncommon cards.;300000;g",

"12;Wrath of the Crusade;The second expansion to the all time favorite. Unlocks more uncommon gold cards!;3000000;g",
"13;Increased Supply;An influx of cards being printed reduces the scaling cost of cards by 10%;2000000;g",
"14;Holographic Card;What luck! You're luckier now! +1 luck(what does luck do again?);5000000;g",
"15;Bird Flavored Food;Bird flavor attracts more cats. When you get cats, you have a 15% chance to get 20% more cats;8000000;g",
"16;Bunkers;Hiding in a bunker keeps the Eagles from finding your gold so easily. Delays their approach by 125%;10000000;g",
"17;Stealing;Buying cards will give another additional card!Shame on you (get a free card for every previous card purchase);400000;g",
"18;More Gold;Buy more gold? Why didn't I think of that! Gives you 20% more gold each turn!;150000;g",

];
var cUpgrades = [
"0;Herd the Pack;Why stop at just cat food? Unlocks more cat producing cards!;1000;c",
"1;Feeding Time;Cat food is more powerful based on the number of Marty you own;2800;c",
"2;Cat finger discount;Cats are great negotiators and give you a 15% base card cost reduction;4000;c",
"3;Rare Cats;Increases the chance of getting higher rarity cards by 5%;6500;c",
"4;Cat Merge;By following cat bending techniques you're able to merge cards at a 10% reduced price now;8000;c",
"5;1,000,000 yard stare;Cats keep on the lookout and help warn you about incoming Eagles reducing their effectiveness by half;10000;c",
"6;Feet side down;Is it luck that makes cats always land on their feet? No but you get +1 luck!(notice anything yet?);12000;c",
"7;Claw the Rate;Cats are good persuaders, they let you buy cards as if you've bought 10% less already;2000;c",
"8;Mechanical Knees; Cats can jump higher and deter Eagles better. Eagles are half as effective;100000;c",
"9;Aerodynamics;Cats are less air-disabled and can fight off Eagles better. Eagles effectiveness is reduced by owned cats;1000000;c",
"10;Cat Army;Buying cards will give ANOTHER additional card. And each time you buy 1 card is guarenteed to be an uncommon cat card!(get a free card for every previous card purchase);1000000;c",
];