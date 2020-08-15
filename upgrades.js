function populateUpgrades(){
	$("#goldUpgrade").empty();
	$("#goldUpgradeBought").empty();
	$("#catUpgrade").empty();
	$("#catUpgradeBought").empty();
	$("#gemUpgrade").empty();
	$("#gemUpgradeBought").empty();
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
				if(index == 21){
					var te = upgSt[1];
					te.replace("x",Math.floor(Math.random()*100));
					upgSt[1] = te;
				}
				var st = "<div id='upgrade"+index+"' class='upgradeItem' style='background-image:url(\"art/upg/gUpg"+index+".png\");' onClick='buyUpgrade("+upgSt[0]+","+upgSt[3]+",\""+upgSt[4]+"\")'>"
				+"<span class='tooltip'>"+upgSt[1]+"<hr class='black'><br>"+upgSt[2]+"<br>Cost: "+formatNumber(Number(upgSt[3]))+" "+costType+"</span></div>";
				var oldVal = $("#goldUpgrade").html();
				$("#goldUpgrade").html(oldVal+st);
			}
			else{
				var upgSt = gUpgrades[index];
				upgSt = upgSt.split(";");
				var st = "<div id='upgrade"+index+"holder' class='upgradeItemBoughtHolder'><span id='upgrade"+index+"' class='upgradeItemBought' style='background-image:url(\"art/upg/gUpg"+index+".png\");'>"
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
				var st = "<div id='catupgrade"+index+"' class='upgradeItem' style='background-image:url(\"art/upg/cUpg"+index+".png\");' onClick='buyUpgrade("+upgSt[0]+","+upgSt[3]+",\""+upgSt[4]+"\")'>"
				+"<span class='tooltip'>"+upgSt[1]+"<hr class='black'><br>"+upgSt[2]+"<br>Cost: "+formatNumber(Number(upgSt[3]))+" "+costType+"</span></div>";
				var oldVal = $("#catUpgrade").html();
				$("#catUpgrade").html(oldVal+st);
			}
			else{
				var upgSt = cUpgrades[index];
				upgSt = upgSt.split(";");
				var st = "<div id='catupgrade"+index+"holder' class='upgradeItemBoughtHolder'><span id='catupgrade"+index+"' class='upgradeItemBought' style='background-image:url(\"art/upg/cUpg"+index+".png\");'>"
				+"</span><span class='tooltip'>"+upgSt[1]+"<hr class='black'><br>"+upgSt[2]+"</span></div>";
				var oldVal = $("#catUpgradeBought").html();
				$("#catUpgradeBought").html(oldVal+st);
			}
		}
	});
	
	var upgCopy = playerStats.gemUpgrades.slice();
	upgCopy.forEach(function(value, index){
		var showUpg = true;
		if(playerStats.unlockGemUpgrades[index] != 1)
			showUpg = false;
		if(showUpg){
			if(value == 0){
				var upgSt = gemUpgrades[index];
				upgSt = upgSt.split(";");
				var costType = getCostType(upgSt[4]);
				var st = "<div id='gemupgrade"+index+"' class='upgradeItem' style='background-image:url(\"art/upg/gemUpg"+index+".png\");' onClick='buyUpgrade("+upgSt[0]+","+upgSt[3]+",\""+upgSt[4]+"\")'>"
				+"<span class='tooltip'>"+upgSt[1]+"<hr class='black'><br>"+upgSt[2]+"<br>Cost: "+formatNumber(Number(upgSt[3]))+" "+costType+"</span></div>";
				var oldVal = $("#gemUpgrade").html();
				$("#gemUpgrade").html(oldVal+st);
			}
			else{
				var upgSt = gemUpgrades[index];
				upgSt = upgSt.split(";");
				var st = "<div id='gemupgrade"+index+"holder' class='upgradeItemBoughtHolder'><span id='gemupgrade"+index+"' class='upgradeItemBought' style='background-image:url(\"art/upg/gemUpg"+index+".png\");'>"
				+"</span><span class='tooltip'>"+upgSt[1]+"<hr class='black'><br>"+upgSt[2]+"</span></div>";
				var oldVal = $("#gemUpgradeBought").html();
				$("#gemUpgradeBought").html(oldVal+st);
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
				createRandomCard(2);
				playerStats.unlockGUpgrades[10] = 1;
				showGlowMenu("gold");
			}
			if(id==0 || id==17){
				backFillCards();
			}
			if(id==27){
				playerStats.unlockGUpgrades[28] = 1;
				showGlowMenu("gold");
			}
			if(id==28){
				addCards(new card(uncommonCards[1]),2);
				addCards(new card(uncommonCards[2]),2);
				addCards(new card(uncommonCards[3]),2);
				addCards(new card(uncommonCards[4]),2);
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
			if(id == 13){
				backFillGemCards();
			}
			if(id == 16){
				playerStats.catArmor = 1;
			}
			if(id == 19){
				playerStats.questReward *= 1.5;
			}
		}
	}
	if(costType == "m"){
		if(playerStats.gems >= cost){
			playerStats.gems -= cost;
			playerStats.gemUpgrades[id] = 1;
			if(id == 5)
				playerStats.questTimer *= .9;
			if(id == 7)
				playerStats.fragVal *= .5;
			if(id == 12){
				playerStats.tnl = Math.floor(playerStats.tnl * .9);
				gainXP(0);
			}
			if(id == 13)
				playerStats.questTimer *= .85;
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
		case("m"): retVal = "Gems"; break;
	}
	return retVal;
}

function checkUpgrades(){
	var catU = 0;
	var goldU = 0;
	var gemU = 0;
	for(var x = playerStats.unlockChecker.length-1; x >= 0; x--){
		switch(playerStats.unlockChecker[x]){
			case(1): if(hasCardOfLine(2)){ playerStats.unlockGUpgrades[2] = 1; goldU+=1;playerStats.unlockChecker.splice(x,1);} break; 
			case(2): if(hasCardOfLine(3)){ playerStats.unlockGUpgrades[3] = 1; goldU+=1;playerStats.unlockChecker.splice(x,1);} break; 
			case(3): if(hasCardOfLine(4)){ playerStats.unlockGUpgrades[4] = 1; goldU+=1;playerStats.unlockChecker.splice(x,1);} break; 
			case(4): if(hasCardOfLine(5)){ playerStats.unlockGUpgrades[6] = 1; goldU+=1;playerStats.unlockChecker.splice(x,1);} break; 
			case(5): if(hasCardOfLine(6)){ playerStats.unlockGUpgrades[7] = 1; goldU+=1;playerStats.unlockChecker.splice(x,1);} break; 
			case(6): if(hasCardOfLine(7)){ playerStats.unlockGUpgrades[8] = 1; goldU+=1;playerStats.unlockChecker.splice(x,1);} break; 
			case(7): if(hasCardOfLine(8)){ playerStats.unlockGUpgrades[9] = 1; goldU+=1;playerStats.unlockChecker.splice(x,1);} break; 
			case(8): if(playerStats.cardsOwnedTotal >= 130){ playerStats.unlockGUpgrades[11] = 1; goldU+=1;playerStats.unlockChecker.splice(x,1);} break;
			case(9): if(playerStats.eagle != 1){playerStats.unlockCUpgrades[5] = 1; playerStats.unlockGUpgrades[16] = 1; goldU+=1; catU+=1;playerStats.unlockChecker.splice(x,1);} break;
			case(10): if(playerStats.cardsOwnedTotal >= 275){ playerStats.unlockGUpgrades[13] = 1; playerStats.unlockGUpgrades[14] = 1; playerStats.unlockGUpgrades[15] = 1; goldU+=1;playerStats.unlockChecker.splice(x,1);} break;
			case(11): if(playerStats.cardsMerged >= 100){ playerStats.unlockCUpgrades[4] = 1; catU+=1;playerStats.unlockChecker.splice(x,1);} break;
			case(12): if(hasCardOfLine(9)){ playerStats.unlockCUpgrades[1] = 1; catU+=1;playerStats.unlockChecker.splice(x,1);} break;
			case(13): if(playerStats.cardsOwnedTotal >= 200){ playerStats.unlockCUpgrades[7] = 1; catU+=1;playerStats.unlockChecker.splice(x,1);}break;
			case(14): if(playerStats.totalGoldEarned >= 800000){ playerStats.unlockGUpgrades[18] = 1; goldU+=1;playerStats.unlockChecker.splice(x,1);}break;
			case(15): if(playerStats.eagle <= .5){playerStats.unlockCUpgrades[9] = 1; catU+=1;playerStats.unlockChecker.splice(x,1);} break;
			case(16): if(playerStats.totalGoldEarned >= 100000000){ playerStats.unlockCUpgrades[8] = 1; catU+=1;playerStats.unlockChecker.splice(x,1);}break;
			case(17): if(playerStats.cat >= 1000000){ playerStats.unlockCUpgrades[10] = 1; catU+=1; playerStats.unlockChecker.splice(x,1);} break;
			case(18): if(playerStats.cat >= 200000){ 
				for(var y = 19; y< 28;y ++){
				playerStats.unlockGUpgrades[y] = 1;
			} goldU+=1; playerStats.unlockChecker.splice(x,1);}break;
			case(19): if(playerStats.cardsOwned >= 1000){playerStats.unlockCUpgrades[12] = 1; catU+=1; playerStats.unlockChecker.splice(x,1);} break;
			case(20): if(playerStats.totalCatEarned >= 2000000){playerStats.unlockCUpgrades[11] = 1; catU+=1; playerStats.unlockChecker.splice(x,1);} break;
			case(21): if(playerStats.gemsBought >= 10){playerStats.unlockCUpgrades[13] = 1; catU+=1; playerStats.unlockGUpgrades[29] = 1; goldU+=1; playerStats.unlockChecker.splice(x,1);} break;
			case(22): if(playerStats.gemsBought >= 50){playerStats.unlockCUpgrades[14] = 1; catU+=1; playerStats.unlockChecker.splice(x,1);} break;
			case(23): if(playerStats.gemsBought >= 150){playerStats.unlockGUpgrades[30] = 1; goldU+=1; playerStats.unlockCUpgrades[15] = 1; catU+=1; playerStats.unlockChecker.splice(x,1);} break;
			case(24): if(playerStats.goldUpgrades[30] == 1 || playerStats.catUpgrades[15] == 1){playerStats.rareEnable = 1; playerStats.unlockChecker.splice(x,1);} break;
			case(25): if(playerStats.goldUpgrades[30] == 1 && playerStats.catUpgrades[15] == 1){createRandomCard(4);playerStats.canQuest = true; playerStats.Hp = playerStats.HpMax; $('#firstQuestMessage').show();
			showGlowMenu("player");showGlowMenu("jewel");showGlowMenu("quest"); playerStats.unlockChecker.splice(x,1)
			$('#playerMenuSelector').show();
			$('#jewelMenuSelector').show();
			$('#questMenuSelector').show();}break;
			case(26): if(playerStats.level >= 10){playerStats.unlockGemUpgrades[0] = 1;playerStats.unlockGemUpgrades[1] = 1;playerStats.unlockGemUpgrades[2] = 1;playerStats.unlockGemUpgrades[3] = 1; gemU+=1; playerStats.unlockChecker.splice(x,1);}break;
			case(27): if(playerStats.qcompleted >= 50 && playerStats.level >= 20){playerStats.unlockGemUpgrades[5] = 1;playerStats.unlockGemUpgrades[6] = 1;playerStats.unlockGemUpgrades[7] = 1;playerStats.unlockGemUpgrades[8] = 1;gemU+=1; playerStats.unlockChecker.splice(x,1);}break;
			case(28): if(playerStats.qcompleted >= 100 && playerStats.level >= 33){playerStats.unlockGemUpgrades[9] = 1;gemU+=1; playerStats.unlockChecker.splice(x,1);}break;
			case(29): if(playerStats.qcompleted >= 250 && playerStats.level >= 65){playerStats.unlockGemUpgrades[10] = 1;gemU+=1; playerStats.unlockGemUpgrades[11] = 1; playerStats.unlockGemUpgrades[12] = 1; playerStats.unlockGemUpgrades[13] = 1; playerStats.unlockGemUpgrades[14] = 1; playerStats.unlockChecker.splice(x,1);}break;
			case(30): if(playerStats.level >= 15){gemU+=1; playerStats.unlockGemUpgrades[4] = 1; playerStats.unlockChecker.splice(x,1);}break;
			case(31): if(playerStats.level >= 2){catU+=1; playerStats.unlockCUpgrades[16] = 1; playerStats.unlockChecker.splice(x,1);} break;
			case(32): if(playerStats.level >= 25){catU+=1; playerStats.unlockCUpgrades[17] = 1; playerStats.unlockChecker.splice(x,1);} break;
			case(33): if(playerStats.level >= 35){catU+=1; playerStats.unlockCUpgrades[18] = 1; playerStats.unlockChecker.splice(x,1);} break;
			case(34): if(playerStats.level >= 45){catU+=1; playerStats.unlockCUpgrades[19] = 1; playerStats.unlockChecker.splice(x,1);} break;
			case(35): if(playerStats.level >= 55){catU+=1; playerStats.unlockCUpgrades[20] = 1; playerStats.unlockChecker.splice(x,1);} break;
			
		
		}
		

	}
	if(catU > 0 || goldU > 0 || gemU > 0){	
		if(catU > 0){
			showGlowMenu("cat");
		}
		if(goldU > 0){
			showGlowMenu("gold");
		}
		if(gemU > 0){
			showGlowMenu("gem");
		}
		populateUpgrades();
	}
	
}

var gUpgrades = [
"0;Stacking Cards;Buying cards give an additional card (get a free card for every previous card purchase);300;g",
"1;Inflation;Gold generated from all 'Coin' cards is doubled;800;g",
"2;Weighted Face;Fliping coins have an extra 10% chance to have a positive outcome;1400;g",
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
"14;Holographic Card;What luck! You're luckier now! +1 luck(notice anything yet?);5000000;g",
"15;Bird Flavored Food;Bird flavor attracts more cats. When you get cats, you have a 25% chance to get 10% more cats;8000000;g",
"16;Bunkers;Hiding in a bunker keeps the Eagles from finding your gold so easily. Delays their approach by 500%;10000000;g",
"17;Stealing;Buying cards will give another additional card!Shame on you (get a free card for every previous card purchase);400000;g",
"18;More Gold;Buy more gold? Why didn't I think of that! Gives you 20% more gold each turn!;150000;g",

"19;+1 Karat;All 'Coin' cards are 50% more effective;10000000;g",
"20;Flip, flip, flip it up;The first time a Flip coin fails, it'll flip again!;20000000;g",
"21;Your lucky number is: x;Too Random coins have 50% increased value;30000000;g",
"22;Near Perfect copy;The upper end of Counterfeit coins is increased by 35%;40000000;g",
"23;Lucky..trinkets;Lucky coins have 20% increased base value;50000000;g",
"24;Division is hard;Duplications have 25% less reduction;60000000;g",
"25;Psychic powers;Lottery tickets have +1 to their lower range;70000000;g",
"26;Sales Tax;Tax collection get a small bonus based on total cards bought;80000000;g",
"27;New Shades;Marty has .10% more effectiveness per level;90000000;g",
"28;Better RNG;Gives 8 cat cards. Just in case you aren't lucky;200000000;g",
"29;Buy More Cats;Unlocks two new cat cards! Time to buy more cards!;10000000000;g",
"30;Rare Cards;Unlocks RARE gold cards! When combined with Rare Cats, new cards will be unlocked!(You get one for free!);500000000000;g",
];
var cUpgrades = [
"0;Herd the Pack;Why stop at just cat food? Unlocks more cat producing cards!;1000;c",
"1;Feeding Time;Cat food is more powerful based on the number of Marty you own;2800;c",
"2;Cat finger discount;Cats are great negotiators and give you a 15% base card cost reduction;4000;c",
"3;Uncommon Cats;Increases the chance of getting higher rarity cards by 5%;6500;c",
"4;Cat Merge;By following cat bending techniques you're able to merge cards at a 10% reduced price now;8000;c",
"5;1,000,000 yard stare;Cats keep on the lookout and help warn you about incoming Eagles reducing their effectiveness;10000;c",
"6;Feet side down;Is it luck that makes cats always land on their feet? No but you get +1 luck!(what does luck do again?);12000;c",
"7;Claw the Rate;Cats are good persuaders, they let you buy cards as if you've bought 10% less already;2000;c",
"8;Mechanical Knees; Cats can jump higher and deter Eagles better. Eagles are half as effective;100000;c",
"9;Aerodynamics;Cats are less air-disabled and can fight off Eagles better. Eagles effectiveness is reduced by owned cats;1000000;c",
"10;Cat Army;Buying cards will give ANOTHER additional card. And each time you buy cards, 1 card is guarenteed to be an uncommon cat card!(get a free card for every previous card purchase);1000000;c",
"11;Claw the Rate 2!;Cats are on an electric boogaloo and act as if you've bought 20% less cards;500000;c",
"12;Scavenge;Cats will bring home gems. Maybe gems can be exchanged for some really nice stuff? or not only one way to find out;2000000;c",
"13;Diamond Cats;Buying Gem cards now give an extra Gem card(You gain an additional Gem card for each previously bought Gem card too!);10000000;c",
"14;Diamond Claws;Sharp claws make sharp deals. Gem cards are half price and scale slower!!;250000000;c",
"15;Rare Cats;Unlocks RARE cats. When combined with Rare Cards, new cards will be unlocked!(You get one for free!);700000000;c",
"16;Cat Mercenaries;Turn your cats into mercenaries that fight for you! The first time you are defeated on a quest the mercenaries will sacrifice themselves for you.;4000000000;c",
"17;Cat Alchemists;Train some cats to become Alchemists that increase the effect of potions by 100%!;6000000000;c",
"18;Cat Explorer;These cats are master explorers and will teach you their secrets! You have a 10% chance of finding extra Keys, Big Keys, Maps, Bombs, and Potions!;8000000000;c",
"19;Cat Merchants;Teach some cats the masterful art of selling. They will increase the yield from quest rewards(excluding Jewel Fragments) by 50%!;10000000000;c",
"20;Cat Sensei;Train cats to become your trainer??? They will show you how to properly utilize your attributes, increasing their effect!;12000000000;c",
];
var gemUpgrades = [
"0;Strength Injection;Use your Gems to buy some legal drugs that give you +2 Strength!;4000000;m",
"1;Stamina Powder;One sniff of this 'approved' powder will give you huge burst of Stamina! +2 Stamina infect.;4000000;m",
"2;Endurance Pill;Take 1 pill every day for long lasting endurance everywhere! Do not take more than 1 pill a day! +2 Endurance.;4000000;m",
"3;Dexterity Juice;One sip is all it takes to speed you up so fast everything else seems to slow down! +2 Dexterity, don't tell anyone you have this.;4000000;m",
"4;Wonder Stick;Light this up and suck in the fumes. If you're into that kind of thing. It'll give you a pretty big boost though! +2 to all Attributes!;20000000;m",
"5;Better Shoes;Upgrade your shoes so you can quest faster! Questing is 10% faster;50000000;m",
"6;Anvil; With an anvil you'll be more efficient in breaking down armor cards. Thus giving you more fragments!;60000000;m",
"7;Super Glue;Putting jewel fragments together is a pain, but with Super Glue you'll be able to create more powerful jewels with less fragments!;70000000;m",
"8;EXP Stone;This magical stone will increase the amount of Experience Points you gain by 25%.;80000000;m",
"9;Combat Expertise;All this time questing has made you an effective battling machine. Eagles are reduced based on the number of completed quests.;90000000;m",
"10;Deeper Dungeons;Dungeons deeper underground give better rewards. Now your rewards within dungeons are increased by 20%.;300000000;m",
"11;Crown of Wonder;Spooky powerful crown will make you spooky powerful! +10 to all Attributes.;500000000;m",
"12;Power Leveling;Reduces the Experience Points required per level by 15%, this is retroactive!;700000000;m",
"13;Running in the;Why walk when you can run? Questing is 15% faster!;900000000;m",
"14;Mimic Detection;You're better at telling which treasure chests have better rewards! (Did you know quest rewards are tiered?) +1 to the minimum tier of quest rewards!;1500000000;m",
];