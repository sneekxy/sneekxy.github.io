var endTime;
var bil = 1000000000;
var timeValue = [0, "none"];
var playerStats = {
	gold: 90,
	gps: 0,
	gps_multi: 1,
	cardsOwned: 0,
	luck: 1,
	gold1Earned: 0,
	goldUpgrades: [0,0,0,0,0,0,0,0,0,0],
	buyAmount: 1,
	packMulti: 1.03,
	packsBought: 0,
	packSize: 1,
	unlockUncommon: 0,
	unlockRare: 0,
	upgradeChance: 20,
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
	totalGoldEarned: 0,
};
function pageInit(){
	endTime = Date.now() + 1000;
	startGame();
	createRandomCard(1);
	updateGameDisplay();
}
function startGame(){
	mainTick(1);
}
function mainLoop(){
	updateGainsThisTick();
	applyGainsThisTick();
	updateGameDisplay();
	populateUpgrades();
}

function doTest(){
var d = new Date();
var ts = d.getTime();
for(var z = 0; z < 1000000; z++){

mainLoop();

}
var t = new Date();
var ts2 = t.getTime();
console.log(ts2 - ts);
}

function mainTick(x){
	interval = setInterval(function() {
		var elapsedTime = endTime - Date.now();
		if(elapsedTime < 0){
			var timesRan = 1+Math.floor(Math.abs(elapsedTime)/(x*1000));
			mainLoop();
			clearInterval(interval);
			endTime = Date.now() + (x*1000);
			mainTick(x);
		}
	}, 100);
}

function updateGameDisplay(){
	$('#cardList').text(formatNumber(playerStats.cardsOwned));
	$('#gold').text(formatNumber(playerStats.gold));
	showGoldBuildings();
	calculatePackCost();
}
function oneOfEvery(){
	for(var x=0; x < 8; x++){
		addCards(new card(commonCards[x]), 10000);
	}
}
function showStats(){
	for(var x = 1; x < 9; x++){
		console.log((playerStats["totalGold"+x+"Earned"]/playerStats.totalGoldEarned)+" : "+playerStats["totalGold"+x+"Earned"]);
	}
}

function applyGainsThisTick(){
	playerStats.gps = Number(Math.floor(playerStats.gps * playerStats.gps_multi));
	playerStats.totalGold1Earned += playerStats.gold1Earned;
	playerStats.totalGold2Earned += playerStats.gold2Earned;
	playerStats.totalGold3Earned += playerStats.gold3Earned;
	playerStats.totalGold4Earned += playerStats.gold4Earned;
	playerStats.totalGold5Earned += playerStats.gold5Earned;
	playerStats.totalGold6Earned += playerStats.gold6Earned;
	playerStats.totalGold7Earned += playerStats.gold7Earned;
//	playerStats.totalGold8Earned += playerStats.gold8Earned;
	playerStats.gold += Number(playerStats.gps);
	playerStats.totalGoldEarned += Number(playerStats.gps);
}

function updateGainsThisTick(){
	playerStats.gps = 0;
	playerStats.gps_multi = 1;
	playerStats.gold1Earned = playerStats.gold2Earned = playerStats.gold3Earned = 
	playerStats.gold4Earned = playerStats.gold5Earned = playerStats.gold6Earned = 
	playerStats.gold7Earned = playerStats.gold8Earned = 0;
	cardHolder.forEach(updateFunction);
	function updateFunction(index){
		var effect = index.effect;
		var curDate = new Date();
		var timeStamp = curDate.getTime();
		applyEffect(effect, getCardAmt(index.id), index.upgradeLine);
		var curDate2 = new Date();
		var timeStamp2 = curDate2.getTime();
		var differ = timeStamp2 - timeStamp;
		if(differ > timeValue[0]){
			timeValue[0] = differ;
			timeValue[1] = effect;
		}
	}
	playerStats.cardsOwned = getCardCount();
}
function applyGoldBucket(v, ugl){
	switch(ugl){
		case(1):playerStats.gold1Earned += v; break;
		case(2):playerStats.gold2Earned += v; break;
		case(3):playerStats.gold3Earned += v; break;
		case(4):playerStats.gold4Earned += v; break;
		case(5):playerStats.gold5Earned += v; break;
		case(6):playerStats.gold6Earned += v; break;
		case(7):playerStats.gold7Earned += v; break;
		case(8):playerStats.gold8Earned += v; break;
	}
}
function applyEffect(effect, amt, ugl){
	var effList = effect.split("-");
	effList.forEach(effectFunction);
	function effectFunction(index){
		var effList2 = index.split(";");
		switch(effList2[0]){
			case("gold"): 
				effList2[1] *= amt; 
				effList2[1] = effList2[1] * (playerStats.goldUpgrades[1]+1);
				playerStats.gps += Number(effList2[1]); 
				applyGoldBucket(Number(effList2[1]), ugl); break;
				
			case("cgold"): 
				var goldVal = 0;
				if(amt < 50){
					var perc = Number(effList2[2]) + (playerStats.goldUpgrades[2]*5);

					var goldAmt = Number(effList2[1]);
					for(var x = 0; x < amt; x++){
						if(doLuck(perc)){
							goldVal += goldAmt;
						}
					}
				}
				else{
					var scalVal = Number(effList2[1] * amt/50);
					var perc = Number(effList2[2]) + (playerStats.goldUpgrades[2]*5);
					for(var x = 0; x < 50; x++){
						if(doLuck(perc)){
							goldVal += scalVal;
						}
					}
				}
				goldVal = Math.floor(goldVal);
				playerStats.gps += Number(goldVal); 
				applyGoldBucket(goldVal, ugl);
				break;
			case("mgold"):
				var goldVal = 0;
				if(amt < 50){
					var upperVal = 0;
					var lowerVal = 0;
					var randVals = Number(effList2[2]) + playerStats.goldUpgrades[3];

					var valCont = Number(effList2[1]);
					for(var x=0; x<amt; x++){
						switch(Math.floor(Math.random() * (randVals))){
							case(0):upperVal = doRangeLuck(0, valCont+2, true); break;
							case(1):lowerVal = valCont; upperVal = lowerVal * 2; break;
							case(2):upperVal = doRangeLuck(0, valCont*4, true); break;
							case(3):upperVal = valCont * 25; break;
							case(4):lowerVal = valCont*3; upperVal = lowerVal*2; break;
							case(5):lowerVal = 25; upperVal = lowerVal + (5*valCont);break;
						}
						goldVal += doRangeLuck(lowerVal, upperVal, true);
					}
				}
				else{
					var upperVal = 0;
					var lowerVal = 0;
					var randVals = Number(effList2[2]) + playerStats.goldUpgrades[3];
					var valCont = Number(effList2[1]);
					for(var x=0; x<50; x++){
						switch(Math.floor(Math.random() * (randVals))){
							case(0):upperVal = doRangeLuck(0, valCont+2, true); break;
							case(1):lowerVal = valCont; upperVal = lowerVal * 2; break;
							case(2):upperVal = doRangeLuck(0, valCont*5, true); break;
							case(3):upperVal = valCont * 25; break;
							case(4):lowerVal = valCont*3; upperVal = lowerVal*2; break;
							case(5):lowerVal = 25; upperVal = lowerVal + (5*valCont);break;
						}
						goldVal += (doRangeLuck(lowerVal, upperVal, true) * amt/50);
					}
				}
				goldVal = Math.floor(goldVal);
				playerStats.gps += goldVal;
				applyGoldBucket(goldVal, ugl); break;
			case("rgold"):
				var goldVal = 0;
				if(amt < 50){
					var highVal = Number(effList2[2]);
					var lowVal = Math.floor(Number(effList2[1]) + (playerStats.goldUpgrades[4]*(highVal/3)));

					for(var x = 0; x < amt; x++){
						goldVal += doRangeLuck(lowVal, highVal, true);
					}
				}
				else{
					var highVal = Number(effList2[2]);
					var lowVal = Math.floor(Number(effList2[1]) + (playerStats.goldUpgrades[4]*(highVal/3)));
					for(var x = 0; x < 50; x++){
						goldVal += (doRangeLuck(lowVal, highVal, true) * amt/50);
					}
				}
				playerStats.gps += goldVal;
				applyGoldBucket(goldVal, ugl); break;
				break;
			case("dgold"):
				var goldVal = 0;
				if(amt < 50){
					var perc = Number(effList2[2]);
					var reduc = Number(effList2[3]);
					var baseVal = Number(effList2[1]);
					for(var x = 0; x < amt; x++){
						var keepGoing = true;
						var procs = 0 + playerStats.goldUpgrades[7];
						while(keepGoing){
							if(doLuck(perc)){
								procs++;
								perc = perc * (1-reduc);
							}
							else{
								keepGoing = false;
							}
						}

						goldVal += (baseVal * Math.pow(2,procs));
					}
				}
				else{
					var perc = Number(effList2[2]);
					var reduc = Number(effList2[3]);
					var baseVal = Number(effList2[1] * amt/50);
					for(var x = 0; x < 50; x++){
						var keepGoing = true;
						var procs = 0 + playerStats.goldUpgrades[7];
						while(keepGoing){
							if(doLuck(perc)){
								procs++;
								perc = perc * (1-reduc);
							}
							else{
								keepGoing = false;
							}
						}
						goldVal += (baseVal * Math.pow(2,procs));
					}
				}
				
				playerStats.gps += goldVal;
				applyGoldBucket(goldVal, ugl); 
				break;
			case("tgold"):
				var baseIncrease = 1 + Math.floor(Number(effList2[1])+(playerStats.goldUpgrades[9]*1.5) * Math.log10((1.3+(playerStats.goldUpgrades[9]*2)) * getCardCount())*100)/10000;
				var totalIncrease = Math.floor(baseIncrease * (1+(((1-Math.pow(effList2[2],amt))/(1-effList2[2])))/10)*100)/100;
				playerStats.gps_multi *= totalIncrease;
				applyGoldBucket(((totalIncrease-1)*100), ugl);
			break;
			case("lgold"):
				var goldVal = 0;
				if(amt < 50){
					var lines = Number(effList2[1]) + playerStats.goldUpgrades[8];

					var upper = Number(effList2[2]);
					var luckRoll = getLuckReroll();
					for(var z = 0; z < amt; z++){
						var highValue = 0;
						
						for(var x = 0; x < luckRoll; x++){
							var numHolder = [];
							for(var y = 0; y < lines; y++){
								numHolder.push(doRangeLuck(1, upper, true));
							}
							var highNum = calcLottery(numHolder);
							if(highNum > highValue){
								highValue = highNum;
							}
						}
						goldVal += highValue;
					}
				}
				else{
					var lines = Number(effList2[1]) + playerStats.goldUpgrades[8];
					var upper = Number(effList2[2]);
					var luckRoll = getLuckReroll();
					for(var z = 0; z < 50; z++){
						var highValue = 0;
						
						for(var x = 0; x < luckRoll; x++){
							var numHolder = [];
							for(var y = 0; y < lines; y++){
								numHolder.push(doRangeLuck(1, upper, true));
							}
							var highNum = calcLottery(numHolder);
							if(highNum > highValue){
								highValue = highNum;
							}
						}
						goldVal += (highValue * amt/50);
					}
				}					
				goldVal = Math.floor(goldVal);
				playerStats.gps += goldVal;
				applyGoldBucket(goldVal, ugl);
			break;
			case("kgold"):
				var goldVal = 0;
				if(amt < 50){
					for(var y = 0; y < amt; y++){
						var totGold = 0;
						var times = Math.round(getLuckReroll()/2);
						var upper = effList2[1];
						var pluck = playerStats.luck + playerStats.goldUpgrades[6];

						for(var x = 0; x < times; x++){
							totGold += doRangeLuck(0, upper, true);
							totGold *= 1+((pluck-x)/10);
						}
						goldVal += totGold;
					}
				}	
				else{
					for(var y = 0; y < 50; y++){
						var totGold = 0;
						var times = Math.round(getLuckReroll()/2);
						var upper = effList2[1];
						var pluck = playerStats.luck + playerStats.goldUpgrades[6];
						for(var x = 0; x < times; x++){
							totGold += doRangeLuck(0, upper, true);
							totGold *= 1+((pluck-x)/10);
						}
						goldVal += (totGold * amt/50);
					}
				}
				goldVal = Math.floor(goldVal);
					
				playerStats.gps += goldVal;
				applyGoldBucket(goldVal, ugl);
			break;
		}
	}
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
	for(var x = 0; x < 8; x++){
		var c = getHighestRarityOfLine(x+1);
		if(typeof c !== 'undefined'){
			$('#gold'+x+'BuildingName').text(c.name);
			$('#gold'+x+'BuildingOwned').text(formatNumber(getCardAmt(c.id)));
			if(x != 7){
				$('#gold'+x+'BuildingEarned').text(formatNumber(playerStats["gold"+(x+1)+"Earned"]));
			}
			else{
				$('#gold'+x+'BuildingEarned').text(formatNumber(playerStats["gold"+(x+1)+"Earned"])+"%");
			}
		}
	}
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

function buyPacks(){
	if(playerStats.gold >= onePackCost()){
		if(playerStats.buyAmount == 1){
			playerStats.gold -= onePackCost();
			playerStats.packsBought++;
			for(var x = 0; x < (playerStats.packSize + playerStats.goldUpgrades[0]); x++){
				createRandomCard();
			}
		}
		else{
			var maxPacks = maxPackCost();
			if(maxPacks > 0){
				playerStats.gold -= totalPackCost(maxPacks);
				playerStats.packsBought += maxPacks;
				for(var x = 0; x < ((playerStats.packSize + playerStats.goldUpgrades[0]) * maxPacks); x++){
					createRandomCard();
				}
			}
		}
	}
	updateGameDisplay();
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
		totalCost = onePackCost();
		$('#packCost').text("Cost "+formatNumber(totalCost)+" gold");
	}
	else{
		var maxPacks = maxPackCost();
		totalCost = totalPackCost(maxPacks);
		$('#packCost').text("Cost: "+formatNumber(totalCost)+" gold ("+maxPacks+" packs)");
	}
	
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
	return Math.floor((100 * (1+n) * Math.pow(playerStats.packMulti, n)));
}

function onePackCost(){
	var packVal = playerStats.packsBought;
	if(packVal <= 2){
		packVal = 1;
	}
	if(packVal > 2 && packVal <= 8){
		packVal = (packVal/3);
	}
	if(packVal > 8 && packVal <= 14){
		packVal = (packVal/2);
	}
	
	return Math.floor((100  * (packVal)) * Math.pow(playerStats.packMulti, (playerStats.packsBought)));
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