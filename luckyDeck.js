var endTime;
var ver_num = 0.1;
var bil = 1000000000;
var timeValue = [0, "none"];
var higherTax = 1;
var higherMort = 1;
var attriArray=["Str","Dex","Stam","End","luck","Hp","HpRegen","Dmg","Spd","Crit","CDmg","Armor","Resist"];

var playerStats = {
	turns: 0,
	gold: 90,
	cat: 0,
	eagle: 1,
	lastEagle: 1,
	cat_multi: 1,
	cps: 0,
	cps_multi: 1,
	gps: 0,
	gps_multi: 1,
	gems: 0,
	geps: 0,
	gemsBought: 0,
	gemBuyAmt: 1,
	cardsOwned: 0,
	cardsOwnedTotal: 0,
	rareEnable: 0,
	luck: 1,
	Str: 1,
	End: 1,
	Dex: 1,
	Stam: 1,
	gluck: 0,
	gstr: 0,
	gend: 0,
	gdex: 0,
	gstam: 0,
	Hp: 10,
	HpMax: 10,
	gHp: 0,
	gHpMax: 0,
	HpRegen: 1,
	gRegen: 0,
	Dmg: 1,
	gDmg: 0,
	Spd: 1,
	gAs: 0,
	Crit: 5,
	CDmg: 0,
	cd: 150,
	Gcd: 0,
	Armor: 1,
	gArmor: 0,
	Resist: 1,
	gResist: 0,
	rubyFragment: 0,
	onyxFragment: 0,
	emeraldFragment: 0,
	topazFragment: 0,
	amethystFragment: 0,
	helmet:[],
	sword:[],
	chest:[],
	shoulder:[],
	gloves:[],
	pants:[],
	belt:[],
	boots:[],
	trinket:[],
	gold1Earned: 0,
	goldUpgrades: [0,0,0,0,0,0,0,0,0,0,
				   0,0,0,0,0,0,0,0,0,0,
				   0,0,0,0,0,0,0,0,0,0,
				   0],
	catUpgrades: [0,0,0,0,0,0,0,0,0,0,
				  0,0,0,0,0,0],
	unlockGUpgrades: [1,1,0,0,0,1,0,0,0,0,
				      0,0,0,0,0,0,0,0,0,0,
					  0,0,0,0,0,0,0,0,0,0,
					  0],
	unlockCUpgrades: [1,0,1,1,0,0,1,0,0,0,
					  0,0,0,0,0,0],
	unlockChecker:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
	buyAmount: 1,
	packMulti: 1.03,
	packsBought: 0,
	packSize: 1,
	cardsMerged: 0,
	upgradeChance: 30,
	totalGold1Earned: 0,
	gold2Earned: 0,
	totalGold2Earned: 0,
	gold3Earned: 0,
	totalGold3Earned: 0,
	gold4Earned: 0,
	totalGold4Earned: 0,
	gold5Earned: 0,
	totalGold5Earned: 0,
	gold6Earned: 0,
	totalGold6Earned: 0,
	gold7Earned: 0,
	totalGold7Earned: 0,
	gold8Earned: 0,
	totalGold8Earned: 0,
	gold9Earned: 0,
	totalGold9Earned: 0,
	totalGoldEarned: 0,
	
	cat1Earned: 0,
	totalCat1Earned: 0,
	cat2Earned: 0,
	totalCat2Earned: 0,
	cat3Earned: 0,
	totalCat3Earned: 0,
	cat4Earned: 0,
	totalCat4Earned: 0,
	cat5Earned: 0,
	totalCat5Earned: 0,
	cat6Earned: 0,
	totalCat6Earned: 0,

	totalCatEarned: 0,
	lastCatEarned: 0,
	catEagleReduc: 1,
	
	gem1Earned: 0,
	gem2Earned: 0,
	gem3Earned: 0,
	gem4Earned: 0,
	gem5Earned: 0,
	gem6Earned: 0,
	gem7Earned: 0,
	
	
	gemChance: .1,
	gemCatsNeeded: 1000000,
	gemCatGain: 1,
	gemCatMulti: 1,
	gemGoldGain: 1,
	gemEagleVal : 1,
	gemCardCost: 1,
};

var targetProxy = new Proxy(playerStats, {
	set: function (target, key, value){
		console.log(`${key} set to ${value}`);
		target[key] = value;
		return true;
	}
});

function pageInit(){
	endTime = Date.now() + 1000;
	loadGame();
	saveLoop(10);
	startGame();
	createRandomCard(1);
//	oneOfEvery();
	populateUpgrades();
	updateGameDisplay();
}
function startGame(){
	mainTick(1);
}
function saveLoop(x){
	var saveTime = Date.now() + (x * 1000);
	var interr = setInterval(function() {
		var elapsedTime = saveTime - Date.now();
		if(elapsedTime < 0){
			saveGame();
			clearInterval(interr);
			saveLoop(x);
		}
	}, 100);
}
function mainLoop(){
	updateGainsThisTick();
	applyGainsThisTick();
	updateGameDisplay();
	checkUpgrades();
}
function mainLoopNoDisplay(tr){
	if(tr < 25){
		for(var x =0; x < tr; x++){
			updateGainsThisTick();
			applyGainsThisTick();
		}
	}
	else{
		var currG = playerStats.gold;
		var currC = playerStats.cat;
		var currGm = playerStats.gems
		for(var x =0; x < 25; x++){
			updateGainsThisTick();
			applyGainsThisTick();
		}
		var diffG = playerStats.gold - currG;
		var diffC = playerStats.cat - currC;
		var diffGm = playerStats.gems - currGm;
		tr -= 25;
		playerStats.gold += (diffG/25 * tr);
		playerStats.cat += (diffC/25 * tr);
		playerStats.gems += (diffGm/25 * tr);
	}
}

function doTest(){
var d = new Date();
var ts = d.getTime();
for(var z = 0; z < 100000; z++){

mainLoop();

}
var t = new Date();
var ts2 = t.getTime();
console.log(ts2 - ts);
}

function mainTick(x){
	interval = setInterval(function() {
		if(isNaN(endTime))
			endTime = Date.now();
		var elapsedTime = endTime - Date.now();
		if(elapsedTime < 0){
			var timesRan = 1+Math.floor(Math.abs(elapsedTime)/(x*1000));
			if(timesRan > 232000)
				timesRan = 232000;
			if(timesRan >= 10){
				mainLoopNoDisplay(timesRan);
				updateGameDisplay();
				checkUpgrades();
			}
			else{
				mainLoop();
			}
			clearInterval(interval);
			endTime = Date.now() + (x*1000);
			mainTick(x);
		}
	}, 100);
}

function updateGameDisplay(){
	$('#cardList').text(formatNumber(playerStats.cardsOwned));
	$('#gold').text(formatNumber(playerStats.gold));
	if(playerStats.eagle != 1){
		$('#eagleHolder').show();
	}
	if($('#eagleHolder').is(':visible')){
		$('#eagle').text(((1-playerStats.eagle)*100).toFixed(2)+"%");
	}
	showGoldBuildings();
	if(playerStats.goldUpgrades[11] == 1){
		$('#cats').text(formatNumber(playerStats.cat));
		$('#catMenuSelector').show();
		$('#goldMenuSelector').show();
		showCatBuildings();
		$('#catMultiAmt').text(formatNumber(playerStats.cat));
		$('#catMultiVal').text(getCatMulti());
	}
	if(playerStats.catUpgrades[12] == 1){
		$('#gems').text(formatNumber(playerStats.gems));
		$('#gemMenuSelector').show();
		showGemBuildings();
	}
	if(playerStats.catUpgrades[15] == 1 && playerStats.goldUpgrades[30] == 1){
		showPlayerBuildings();
	}
	
	calculatePackCost();
}
function oneOfEvery(){
	for(var x=0; x < 8; x++){
		addCards(new card(commonCards[x]), 1200);
	}
//	for(var x=7; x < 15; x++){
//		addCards(new card(uncommonCards[x]), 400);
//	}
}
function showStats(){
	for(var x = 1; x < 10; x++){
		console.log((playerStats["totalGold"+x+"Earned"]/playerStats.totalGoldEarned)+" : "+playerStats["totalGold"+x+"Earned"]);
	}
	console.log(playerStats.totalGoldEarned);
}
function calculateEagle(gs){
	var retVal = 1;
	var minVal = 2500;
	if(playerStats.goldUpgrades[16]==1)
		minVal *= 6;
	if(gs > minVal){
		var reduc = 2500;
		var powDif = String(Math.round(gs/minVal));
		powDif = Number(powDif.length);
		if(playerStats.catUpgrades[5] == 1)
			reduc *= 2.15;
		if(playerStats.catUpgrades[8] == 1)
			reduc *= 2;
		if(playerStats.catUpgrades[9] == 1){
			reduc *= (1+Math.pow(playerStats.cat,.03)*(playerStats.cat/1000000)) * playerStats.catEagleReduc;
		}
		reduc *= playerStats.gemEagleVal;
		if(powDif >= 2){
			reduc /= 20;
		}
		if(powDif >= 3){
			reduc /= 25;
		}
		var effGS = (gs-(minVal))/reduc;
		retVal = Math.round(Math.pow(.999,(effGS))*10000)/10000;
	}
	if(retVal == 0)
		retVal = .00001;
	return retVal;
}


function applyGainsThisTick(){
	if(higherTax > 1){
		playerStats.gps_multi *= higherTax;
		applyGoldBucket(((higherTax-1)*100), 8, 1);
	}
	if(higherMort > 1){
		playerStats.gps_multi *= higherMort;
		applyGoldBucket(((higherMort-1)*100),9,1);
	}
	playerStats.gps_multi = Number(playerStats.gps_multi * playerStats.cat_multi * playerStats.gemGoldGain);
	playerStats.gps = Number(Math.floor(playerStats.gps * playerStats.gps_multi));
	playerStats.eagle = calculateEagle(Number(playerStats.gps));
	var eaglePerc = playerStats.eagle;
	playerStats.lastEagle = eaglePerc;
	playerStats.gps *= eaglePerc;
	
	playerStats.cps_multi *= playerStats.gemCatGain;
	playerStats.cps = Math.floor((playerStats.cps * playerStats.cps_multi));
	
	playerStats.totalGold1Earned += Math.floor(playerStats.gold1Earned * playerStats.gps_multi * eaglePerc);
	playerStats.totalGold2Earned += Math.floor(playerStats.gold2Earned * playerStats.gps_multi * eaglePerc);
	playerStats.totalGold3Earned += Math.floor(playerStats.gold3Earned * playerStats.gps_multi * eaglePerc);
	playerStats.totalGold4Earned += Math.floor(playerStats.gold4Earned * playerStats.gps_multi * eaglePerc);
	playerStats.totalGold5Earned += Math.floor(playerStats.gold5Earned * playerStats.gps_multi * eaglePerc);
	playerStats.totalGold6Earned += Math.floor(playerStats.gold6Earned * playerStats.gps_multi * eaglePerc);
	playerStats.totalGold7Earned += Math.floor(playerStats.gold7Earned * playerStats.gps_multi * eaglePerc);
	
	playerStats.gold1Earned *= eaglePerc;
	playerStats.gold2Earned *= eaglePerc;
	playerStats.gold3Earned *= eaglePerc;
	playerStats.gold4Earned *= eaglePerc;
	playerStats.gold5Earned *= eaglePerc;
	playerStats.gold6Earned *= eaglePerc;
	playerStats.gold7Earned *= eaglePerc;
	
	playerStats.totalCat1Earned += Math.floor(playerStats.cat1Earned * playerStats.cps_multi);
	playerStats.totalCat2Earned += Math.floor(playerStats.cat2Earned * playerStats.cps_multi);
	playerStats.totalCat3Earned += Math.floor(playerStats.cat3Earned * playerStats.cps_multi);
	playerStats.totalCat4Earned += Math.floor(playerStats.cat4Earned * playerStats.cps_multi);
	playerStats.totalCat5Earned += Math.floor(playerStats.cat5Earned * playerStats.cps_multi);
	
	
//	playerStats.totalGold8Earned += playerStats.gold8Earned;
	
	playerStats.gold += Number(playerStats.gps);
	playerStats.totalGoldEarned += Number(playerStats.gps);
	
	playerStats.cat += Number(playerStats.cps);
	playerStats.totalCatEarned += Number(playerStats.cps);
	playerStats.lastCatEarned = Math.floor((Number(playerStats.cps)-playerStats.cat4Earned)/playerStats.cps_multi);
	
	if(playerStats.catUpgrades[12]==1)
		playerStats.gems += playerStats.geps;
}

function updateGainsThisTick(){
	playerStats.turns += 1;
	playerStats.gps = playerStats.cps = 0;
	playerStats.gps_multi = playerStats.cps_multi = playerStats.luck = higherTax = higherMort = playerStats.catEagleReduc =
	playerStats.Str = playerStats.Dex = playerStats.End = playerStats.Stam = playerStats.HpRegen = playerStats.Dmg = playerStats.Spd = playerStats.Armor = 
	playerStats.Resist = 1;
	
	playerStats.Hp = playerStats.HpMax = 10;
	playerStats.CDmg = 150;
	playerStats.Crit = 5;
	
	playerStats.gemCatGain = playerStats.gemCatMulti = playerStats.gemGoldGain = playerStats.gemEagleVal = playerStats.gemCardCost = 1;
	playerStats.gemCatsNeeded = 1000000;
	playerStats.gemChance = .1;
	playerStats.gemBuyAmt = 1 + playerStats.catUpgrades[13];
	
	updateStats();
	
	playerStats.gps_multi = 1;
	
	playerStats.gold1Earned = playerStats.gold2Earned = playerStats.gold3Earned = 0
	playerStats.gold4Earned = playerStats.gold5Earned = playerStats.gold6Earned = 0
	playerStats.gold7Earned = playerStats.gold8Earned = playerStats.gold9Earned = 0
	playerStats.cat1Earned = playerStats.cat2Earned = playerStats.cat3Earned = playerStats.cat4Earned = playerStats.cat5Earned = playerStats.cat6Earned = 0
	playerStats.gem1Earned = playerStats.gem2Earned = playerStats.gem3Earned = playerStats.gem4Earned = 0
	playerStats.gem5Earned = playerStats.gem6Earned = playerStats.gem7Earned =	0;
	cardHolder.forEach(updateFunction);
	function updateFunction(index){
		var effect = index.effect;
		var curDate = new Date();
		var timeStamp = curDate.getTime();
		applyEffect(effect, getCardAmt(index.id), index.upgradeLine, index.id);
		var curDate2 = new Date();
		var timeStamp2 = curDate2.getTime();
		var differ = timeStamp2 - timeStamp;
		if(differ > timeValue[0]){
			timeValue[0] = differ;
			timeValue[1] = effect;
		}
	}
	playerStats.cardsOwned = getCardCount();
	playerStats.cat_multi = getCatMulti();
	playerStats.geps = getGems();
}
function getCatMulti(x){
	var retVal = 1;
	var retVal2 = 1;
	var cats = Number(playerStats.cat);
	if(cats > 0){
		retVal = Math.floor(playerStats.gemCatMulti * cats*.65/(3000+(Math.pow(cats,.78)))*1000)/1000;
		retVal = ((retVal*1000)+1000)/1000;
	//	retVal = Math.floor((1+(Math.log10(cats)/10))*1000)/1000;
	//	retVal = Math.floor(1+Math.pow(cats,0.6)*Math.pow((Math.log10(cats)),1.2))/1000;
	}
	return retVal;
}
function applyGoldBucket(v, ugl, t){
	if(t != 1){
		if(playerStats.goldUpgrades[18] == 1){
			v = Math.floor(v*1.2);
		}
		playerStats.gps += v;
	}
	playerStats["gold"+ugl+"Earned"] += v;
}
function applyCatBucket(v, ugl){
	if(playerStats.goldUpgrades[15] == 1){
		if(ugl != 15){
			if(doLuck(25)){
				v = Math.floor(v*1.1);
			}
		}
	}
	playerStats.cps += v;
	playerStats["cat"+(ugl-9)+"Earned"] += v;
}
function applyGemBucket(v, ugl){
	playerStats["gem"+(ugl-15)+"Earned"] += v;
}


function calcLottery(numHolder){
	var counts = {};
	numHolder.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
	var sum = 0;
	for(var x in counts){
		if(counts[x] != numHolder.length){
			sum += (Number(x) * (counts[x]-1));
		}
		else{
			sum += (Number(x) * counts[x]);
		}
	}
	return sum;
}

function getLuckReroll(){
	return Math.floor(1+playerStats.luck/3);
}
function getLuckPercent(percent){
	return Math.floor(Number(percent) + (playerStats.luck/2));
}

function showGoldBuildings(){
	if($('#goldProducers').is(":visible")){
		for(var x = 0; x < 9; x++){
			var c = getHighestRarityOfLine(x+1);
			if(typeof c !== 'undefined'){
				if($('#gold'+x+'Merge').is(':hidden')){
					var cardList = getAllOfLine(x+1);
					if(getMergeCost(cardList) > 0)
						$('#gold'+x+'Merge').show();
				}
				$('#gold'+x).show();
				$('#gold'+x+"TT").html(getBuildingTooltip(x+1));
				$('#gold'+x+"MergeTT").html(getMergeTooltip(x+1));
				$('#gold'+x+'BuildingName').text(c.name);
				$('#gold'+x+'BuildingOwned').text(formatNumber(getCardAmt(c.id)));
				if(x != 7 && x != 8){
					$('#gold'+x+'BuildingEarned').text(formatNumber(playerStats["gold"+(x+1)+"Earned"] * playerStats.gps_multi));
				}
				else{
					$('#gold'+x+'BuildingEarned').text(formatNumber(playerStats["gold"+(x+1)+"Earned"])+"%");
				}
			}
		}
	}
}

function getMergeTooltip(ugl){
	var retVal = " Merge your lower quality cards into higher quality cards. Merge rate is: 3:1, 4:1, 5:1, etc... for each higher tier<br>You must own at least 1 card of a rarity to merge into it.<br>";
	var cardList = getAllOfLine(ugl);
	var cost = getMergeCost(cardList);
	retVal += "Merging all of your cards will <br>cost: "+formatNumber(cost)+" gold";
	return retVal;
}

function getMergeCost(cardList){
	var retVal = 0;
	var prevCombin = 0;
	for(var x = 0; x < cardList.length-1; x++){
		var amt = getCardAmt(cardList[x].id) + prevCombin;
		var rr = cardList[x].rarity;
		var combins = Math.floor(amt/(rr+2));
		prevCombin = combins;
		retVal += Math.floor(combins * Math.pow((rr+2), 4)*(Math.pow(rr+1,3))*(rr))*1000;
	}
	if(playerStats.catUpgrades[4] == 1)
		retVal = Math.floor(retVal *.9);
	return retVal;
}

function mergeCards(ugl){
	var cardList = getAllOfLine(ugl);
	var cost = getMergeCost(cardList);
	if(playerStats.gold >= cost){
		playerStats.gold -= cost;
		for(var x = 0; x < cardList.length-1; x++){
			var amt = getCardAmt(cardList[x].id);
			var rr = cardList[x].rarity;
			var id = cardList[x].id;
			var combins = Math.floor(amt/(rr+2));
			cardHolderAmt[id] -= (combins * (rr+2));
			cardHolderAmt[cardList[x+1].id] += combins;
			playerStats.cardsMerged += combins;
		}
		populateUpgrades();
		updateGameDisplay();
	}
}

function getBuildingTooltip(ugl){
	var retVal = "";
	var cardList = getAllOfLine(ugl);
	if(cardList.length > 1){
		for(var x=cardList.length-1; x >= 0; x--){
			if(x == cardList.length-1){
				retVal += "<span style='position:absolute;left:0px;'>"+cardList[x].getRarity()+"</span> "+cardList[x].name+" <span style='right:50px;position:absolute'>x"+getCardAmt(cardList[x].id)+"</span><hr class='black'>"+cardList[x].description+"<hr class='black'>";
			}
			else{
				retVal += "<br>"+cardList[x].name+" <span style='right:50px;position:absolute'>x"+getCardAmt(cardList[x].id)+"</span>";
			}
		}
	}
	else{
		retVal = "<span style='position:absolute;left:0px;'>"+cardList[0].getRarity()+"</span> "+cardList[0].name+" <span style='right:50px;position:absolute'>x"+getCardAmt(cardList[0].id)+"</span><hr class='black'>"+cardList[0].description;
	}
	return retVal;
}

function showCatBuildings(){
	$('#catCurrencyHolder').show();
	if($('#catProducers').is(":visible")){
		for(var x = 0; x < 6; x++){
			var c = getHighestRarityOfLine(x+10);
			if(typeof c !== 'undefined'){
				if($('#cat'+x+'Merge').is(':hidden')){
					var cardList = getAllOfLine(c.upgradeLine);
					if(getMergeCost(cardList) > 0)
						$('#cat'+x+'Merge').show();
				}
				$('#cat'+x).show();
				$('#cat'+x+'BuildingName').text(c.name);
				$('#cat'+x+"TT").html(getBuildingTooltip(c.upgradeLine));
				$('#cat'+x+"MergeTT").html(getMergeTooltip(c.upgradeLine));
				$('#cat'+x+'BuildingOwned').text(formatNumber(getCardAmt(c.id)));
				if(x != 5){
					$('#cat'+x+'BuildingEarned').text(formatNumber(playerStats["cat"+(x+1)+"Earned"] * playerStats.cps_multi));
				}
				else{
					$('#cat'+x+'BuildingEarned').text(formatNumber(playerStats["cat"+(x+1)+"Earned"]*100)+"%");
				}
			}
		}
	}
}
function showGemBuildings(){
	$('#gemCurrencyHolder').show();
	var gc = playerStats.gemChance;
	if(gc < 1)
		gc = formatNumber(gc*100)/100;
	$('#gemTT').text("Every "+formatNumber(playerStats.gemCatsNeeded)+" cats have a "+gc+"% chance to find a gem each turn");
	if($('#gemProducers').is(":visible")){
		$('#gemCost').text(formatNumber(gemCardCost()));
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

function showPlayerBuildings(){
	if($('#playerProducers').is(":visible")){
		for(var x =0; x<9; x++){
			var c = getHighestRarityOfLine(x+23);
			if(typeof c !== 'undefined'){
				$('#player'+x).show();
				$('#player'+x+'BuildingName').text(c.name);
				$('#player'+x+"TT").html(getBuildingTooltip(c.upgradeLine));
				$('#player'+x+'BuildingOwned').text(formatNumber(getCardAmt(c.id)));
			}
		}
		for(key in attriArray){
			var x = attriArray[key];
			$('#p'+x+'Val').text(playerStats[x]);
			$('#statTT'+x).html(getStatTT(x));
		}
	}
	if($('#jewelProducers').is(":visible")){
		$('#jewel0BuildingEarned').text(formatNumber(playerStats.rubyFragment));
		$('#jewel1BuildingEarned').text(formatNumber(playerStats.emeraldFragment));
		$('#jewel2BuildingEarned').text(formatNumber(playerStats.topazFragment));
		$('#jewel3BuildingEarned').text(formatNumber(playerStats.amethystFragment));
		$('#jewel4BuildingEarned').text(formatNumber(playerStats.onyxFragment));
		$('#breakCost').text(formatNumber(getBreakCost()));
	}
}
function getBreakCost(){
	var retVal = 0;
	for(var x = 23; x < 32; x++){
		var holder = getCardAmtOfLineFull(x);
		for(var y = 0; y < holder.length; y++){
			var amtSplit = holder[y].split(";");
			if(y == holder.length-1){
				retVal += ((Number(amtSplit[0])-1) * Math.pow(Number(amtSplit[1]),5));
			}
			else{
				retVal += ((Number(amtSplit[0])) * Math.pow(Number(amtSplit[1]),5));
			}
		}
	}
	retVal = Math.floor(retVal);
	return retVal;
}
function breakGearDown(){
	var breakCost = getBreakCost();
	if(playerStats.gems > breakCost){
		playerStats.gems -= breakCost;
		for(var x=23; x<32; x++){
			var fragAmt = 0;
			var holder = getCardAmtOfLineFull(x);
			for(var y = 0; y < holder.length; y++){
				var amtSplit = holder[y].split(";");
				if(y == holder.length-1){
					fragAmt += ((Number(amtSplit[0])-1) * (100+(25*Number(amtSplit[1]))) * getFact(Number(amtSplit[1])));
					cardHolderAmt[Number(amtSplit[2])] = 1;
				}
				else{
					fragAmt += ((Number(amtSplit[0])) * (100+(25*Number(amtSplit[1]))) * getFact(Number(amtSplit[1])));
					cardHolderAmt[Number(amtSplit[2])] = 0;
				}
			}
			fragAmt = Math.floor(fragAmt * (doRangeLuck(0,(playerStats.luck/2)*100 ,true)/100));
			if(x == 23 || x == 27)
				playerStats.rubyFragment += fragAmt;
			if(x == 24 || x == 28)
				playerStats.topazFragment += fragAmt;
			if(x == 25 || x == 29)
				playerStats.amethystFragment += fragAmt;
			if(x == 26 || x == 30)
				playerStats.emeraldFragment += fragAmt;
			if(x == 31)
				playerStats.onyxFragment += Math.floor(fragAmt/2);
		}
	}
	updateGameDisplay();
}
function getFact(x){
	var retVal = 1;
	switch(x){
		case(3): retVal = 6; break;
		case(4): retVal = 24; break;
		case(5): retVal = 120; break;
		case(6): retVal = 720; break;
		case(7): retVal = 5040; break;
		case(8): retVal = 40320; break;
		case(9): retVal = 362880; break;
		case(10): retVal = 3628800; break;
	}
	return retVal;
}

function getStatTT(x){
	var retVal = "";
	switch(x){
		case("Str"):retVal = "Your Strength increases your Damage and your Crit Damage. BE STRONG!"; break;
		case("Dex"):retVal = "Dexterity is a measure of your speeeed. It increases your Attack Speed and Crit Chance!"; break;
		case("Stam"):retVal = "Stamina will let you last longer in battle. It increases your HP and its regeneration rate"; break;
		case("End"):retVal = "You might think Endurance would let you last longer in battle.... and it does, by giving you more Armor and Resist?";break;
		case("luck"):retVal ="Luck makes most random things have a better outcome. It's probably the most important attribute in this game";break;
		case("Hp"):retVal ="Health Points. If this hits 0 you die and the game is over (if you're on hardcore mode), otherwise you just have to wait for it to recover before you can continue exploring.";break;
		case("HpRegen"):retVal = "How much HP you recover a turn. It helps you keep exploring faster"; break;
		case("Dmg"):retVal = "How much damage you do on each attack. The higher this is the more <span style='color:red'>dangerous</span> you are."; break;
		case("Spd"):retVal = "How fast you can attack. This number is how many attacks a turn you do."; break;
		case("Crit"):retVal = "You know when you hit someone's weak spot and you do extra damage? That's a Critical Hit. This is how often you'll land one of those hits.";break;
		case("CDmg"):retVal = "What good is a Critical Hit if the damage is the same? This makes those Critical Hits juice!";break;
		case("Armor"):retVal = "Armor reduces the damage you take by a flat amount. This is applied after Resist.";break;
		case("Resist"):retVal = "Resist redcues the damage you take by a percentage. This is applied before Armor.";break;
	}
	return retVal;
}

function getAllOfLine(ugl){
	var cardList = cardHolder.slice();
	cardList = cardList.filter(card => card.upgradeLine == ugl);
	cardList.sort(function(a,b){
		if(a.rarity > b.rarity){
			return 1;
		}
		return -1;
	});
	return cardList;
}

function buyPacks(){
	if(playerStats.gold >= nPackCost()){
		if(playerStats.buyAmount == 1){
			playerStats.gold -= nPackCost();
			playerStats.packsBought++;
			for(var x = 0; x < (playerStats.packSize + playerStats.goldUpgrades[0] + playerStats.goldUpgrades[17]); x++){
				createRandomCard();
			}
			if(playerStats.catUpgrades[10] == 1){
				createRandomCard(3);
			}
		}
		else{
			var maxPacks = maxPackCost();
			if(maxPacks > 0){
				playerStats.gold -= totalPackCost(maxPacks);
				playerStats.packsBought += maxPacks;
				for(var x = 0; x < ((playerStats.packSize + playerStats.goldUpgrades[0] + playerStats.goldUpgrades[17]) * maxPacks); x++){
					createRandomCard();
				}
				if(playerStats.catUpgrades[10] == 1){
					for(var x = 0; x < maxPacks; x++){
						createRandomCard(3);
					}
				}
			}
		}
	checkUpgrades();
	populateUpgrades();
	updateGameDisplay();
	}
	
}
function changeBuyAmount(){
	if(playerStats.buyAmount == 1){
		playerStats.buyAmount = 0;
		$('#buyAmount').text("x Max");
	}
	else{
		playerStats.buyAmount = 1;
		$('#buyAmount').text("x1");
	}
	calculatePackCost();
}
function calculatePackCost(){
	var totalCost = 0;
	if(playerStats.buyAmount == 1){
		totalCost = nPackCost();
		$('#packCost').text("Cost "+formatNumber(totalCost)+" gold");
	}
	else{
		var maxPacks = maxPackCost();
		totalCost = totalPackCost(maxPacks);
		$('#packCost').text("Cost: "+formatNumber(totalCost)+" gold ("+maxPacks+" packs)");
	}
	
}
function backFillCards(){
	for(var x = 0; x < playerStats.packsBought; x++){
		createRandomCard();
	}
	populateUpgrades();
}

function maxPackCost(){
	var goldHolder = playerStats.gold;
	var retVal = 0;
	var n = playerStats.packsBought;
	while(goldHolder > 0){
		goldHolder -= nPackCost(n);
		n++;
		if(goldHolder >= 0)
			retVal++;
	}
	return retVal;
}
function totalPackCost(n){
	var retVal = 0;
	var h = 0;
	for(var x = 0; x < n; x++){
		h = nPackCost(playerStats.packsBought+x);
		retVal += h;
	}
	return retVal;
}
function nPackCost(n){
	if(n == undefined)
		n = playerStats.packsBought;
	var packVal = n;
	if(packVal <= 3){
		packVal = 1;
	}
	if(packVal > 3 && packVal <= 8){
		packVal = (packVal/3.5);
	}
	if(packVal > 8 && packVal <= 14){
		packVal = (packVal/2.5);
	}
	if(packVal > 14 && packVal <= 22){
		packVal = (packVal/1.5);
	}
	var cardMult = playerStats.packMulti;
	if(playerStats.goldUpgrades[13] == 1){
		var h = cardMult - 1;
		cardMult = 1+(h*.9)
	}
	var baseCost = 100;
	if(playerStats.catUpgrades[2] == 1){
		baseCost *= .85;
	}
	if(playerStats.catUpgrades[7] == 1){
		n = Math.floor(n*.9);
	}
	if(playerStats.catUpgrades[11] == 1){
		n = Math.floor(n*.8);
	}
	var retVal = Math.floor(baseCost*(packVal))*(Math.pow((cardMult/1.015),n));
	if(n >= 100)
		retVal = Math.floor((baseCost * (packVal)) * Math.pow(cardMult, n));
	retVal *= playerStats.gemCardCost;
	return retVal;
}


function doLuck(percent){
	var retVal = false;
	
	for(var x = 0; x < getLuckReroll(); x++){
		if((Math.random()*100) <= getLuckPercent(percent)){
			
			retVal = true;
			break;
		}
	}
	return retVal;
}
function doRangeLuck(lower, upper, type){
	//type = true when higher number is more favorable. 
	var retVal = lower;
	if(!type)
		retVal = upper;
	var holder;
	for(var x = 0; x < getLuckReroll(); x++){
		var holder = Math.floor(Math.random() * (upper - lower + 1))+lower;
		if(type){
			if(holder >= retVal){
				retVal = holder;
				if(retVal == upper){
					break;
				}
			}
		}
		else{
			if(holder <= retVal){
				retVal = holder;
				if(retVal == lower){
					break;
				}
			}
		}
		
	}
	return retVal;
}

function showGlowMenu(t){
	if(t == "cat"){
		if(!$('#catProducers').is(':visible')){
			$('#catMenuGlow').show();
		}
	}
	if(t == "gold"){
		if(!$('#goldProducers').is(':visible')){
			$('#goldMenuGlow').show();
		}
	}
}

function changeMenu(x){
	hideAllMenu();
	$('#'+x+'Producers').show();
	$('#'+x+'MenuGlow').hide();
	updateGameDisplay();
}
function hideAllMenu(){
	$('#catProducers').hide();
	$('#goldProducers').hide();
	$('#gemProducers').hide();
	$('#playerProducers').hide();
	$('#jewelProducers').hide();
}
function updateStats(){
	playerStats.luck += playerStats.goldUpgrades[14];
	playerStats.luck += playerStats.catUpgrades[6];
	
	playerStats.luck += playerStats.gluck;
	
	playerStats.Str += playerStats.gstr;
	
	playerStats.End += playerStats.gend;
	
	playerStats.Stam += playerStats.gstam;
	
	playerStats.Dex += playerStats.gdex;
	
	
	playerStats.Dmg = Math.floor(playerStats.Str/2);
	playerStats.Hp = Math.floor(10 + (playerStats.Stam));
	playerStats.HpRegen = Math.floor(playerStats.Stam/2);
	playerStats.Spd = 1+(playerStats.Dex/20);
	playerStats.Crit = 5+(playerStats.Dex/15);
	playerStats.CDmg = 150+(playerStats.Str/5);
	playerStats.Armor = Math.floor(playerStats.End * 1.5);
	playerStats.Resist = 1+(playerStats.End/3);
	
	
	playerStats.gdex = playerStats.gstam = playerStats.gend = playerStats.gstr = playerStats.gluck = 
	playerStats.gHp = playerStats.gHpMax = playerStats.gRegen = playerStats.gDmg = playerStats.gAs = 
	playerStats.gCc = playerStats.Gcd = playerStats.gArmor = playerStats.gResist = 0;


}

function saveGame(){
	localStorage.setItem("player", JSONfn.stringify(playerStats));
//	localStorage.setItem("card", JSONfn.stringify(cardHolder));
	localStorage.setItem("cardH", JSONfn.stringify(cardHolderAmt));
	localStorage.setItem("lastTick", JSONfn.stringify(endTime));
	localStorage.setItem("version", JSONfn.stringify(ver_num));
}
function loadGame(){
	var ver_hold = "";
	if(localStorage.getItem("player")){
		
		var ps = JSONfn.parse(localStorage.getItem("player"));
		var holder = Object.assign({}, playerStats, ps);
		playerStats = holder;
		
	}
//	if(localStorage.getItem("card"))
//		cardHolder = JSONfn.parse(localStorage.getItem("card"));
	if(localStorage.getItem("cardH"))
		cardHolderAmt = JSONfn.parse(localStorage.getItem("cardH"));
	if(localStorage.getItem("lastTick"))
		endTime = JSONfn.parse(localStorage.getItem("lastTick"));
	if(localStorage.getItem("version"))
		ver_hold = JSONfn.parse(localStorage.getItem("version"));
	
	if(ver_num != ver_hold){
		applyVersionUpdates(ver_hold);
	}
	buildCardHolder(cardHolderAmt);
}
function resetGame(){
	localStorage.clear();
	location.reload();
}

function applyVersionUpdates(vh){
	playerStats.unlockChecker.push(25);
}


var JSONfn;
if (!JSONfn) {
    JSONfn = {};
}

(function () {
  JSONfn.stringify = function(obj) {
    return JSON.stringify(obj,function(key, value){
            return (typeof value === 'function' ) ? value.toString() : value;
        });
  }

  JSONfn.parse = function(str) {
    return JSON.parse(str,function(key, value){
        if(typeof value != 'string') return value;
        return ( value.substring(0,8) == 'function') ? eval('('+value+')') : value;
    });
  }
}());

function formatNumber(x){
	var retVal = x;
	if(x > bil){
		retVal = expo(x, 2);
	}
	else{
		retVal = x.formatMoney();
	}
	return retVal;
}
function expo(x,f){
	return Number.parseFloat(x).toExponential(f);
}

Number.prototype.formatMoney = function(c, d, t){
	var n = this, 
	c = isNaN(c = Math.abs(c)) ? 0 : c, 
	d = d == undefined ? "." : d, 
	t = t == undefined ? "," : t, 
	s = n < 0 ? "-" : "", 
	i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
	j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };