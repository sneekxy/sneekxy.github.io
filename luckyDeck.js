var endTime;
var bil = 1000000000;
var timeValue = [0, "none"];
var playerStats = {
	gold: 100,
	gps: 0,
	gps_multi: 1,
	cardsOwned: 0,
	luck: 1,
	gold1Earned: 0,
	buyAmount: 1,
	packsBought: 0,
	packSize: 3,
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
}
function startGame(){
	mainTick(1);
}
function mainLoop(){
	updateGainsThisTick();
	applyGainsThisTick();
	updateGameDisplay();
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
		console.log(playerStats["totalGold"+x+"Earned"]/playerStats.totalGoldEarned);
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
				playerStats.gps += Number(effList2[1]); 
				applyGoldBucket(Number(effList2[1]), ugl); break;
				
			case("cgold"): 
				var goldVal = 0;
				if(amt <= 25){
					if(doLuck(Number(effList2[2]))){
						goldVal = effList2[1] * amt;
					}
				}
				else{
					var randNum = doRangeLuck(0, 100, false);
					var luckPercent = getLuckPercent(effList2[2]);
					if(randNum <= luckPercent){
						goldVal = effList2[1] * amt;
					}
					else{
						var leftOver = (randNum - luckPercent);
						goldVal = Math.floor(effList2[1] * amt * (leftOver/100));
					}
				} 
				playerStats.gps += Number(goldVal); 
				applyGoldBucket(goldVal, ugl);
				break;
			case("rgold"):
				effList2[1] *= amt;
				effList2[2] *= amt;
				var goldGain = Number(doRangeLuck(effList2[1], effList2[2], true)); 
				playerStats.gps += goldGain;
				applyGoldBucket(goldGain, ugl); break;
				break;
			case("dgold"):
				effList2[1] *= amt;
				var keepGoing = true;
				var procs = 0;
				while(keepGoing){
					if(doLuck(effList2[2])){
						procs++;
						effList2[2] = Math.floor(effList2[2] * (1-effList2[3]));
					}
					else{
						keepGoing = false;
					}
				}
				var goldearned = Number(effList2[1] * Math.pow(2,procs)); 
				playerStats.gps += goldearned;
				applyGoldBucket(goldearned, ugl); 
				break;
			case("tgold"):
				var baseIncrease = 1 + Math.floor(effList2[1] * Math.log10(1.3 * getCardCount())*100)/10000;
				var totalIncrease = Math.floor(baseIncrease * (1+(((1-Math.pow(effList2[2],amt))/(1-effList2[2])))/10)*100)/100;
				playerStats.gps_multi *= totalIncrease;
				applyGoldBucket(((totalIncrease-1)*100), ugl);
			break;
			case("lgold"):
				var highValue = 0;
				for(var x = 0; x < getLuckReroll(); x++){
					var numHolder = [];
					for(var y = 0; y < effList2[1]; y++){
						numHolder.push(doRangeLuck(1, effList2[2], true));
					}
					var highNum = calcLottery(numHolder);
					if(highNum > highValue){
						highValue = highNum;
					}
				}
				highValue *= amt; 
				if(highValue == 0){
					highValue = Math.floor(amt * Math.random());
				}
				playerStats.gps += highValue;
				applyGoldBucket(highValue, ugl);
			break;
			case("kgold"):
				var totGold = 0;
				for(var x = 0; x < Math.round(getLuckReroll()/2); x++){
					totGold += doRangeLuck(1, effList2[1], true);
					totGold *= 1+((playerStats.luck-x)/10);
				}
				totGold = Math.floor(totGold * amt);
				playerStats.gps += totGold;
				applyGoldBucket(totGold, ugl);
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
			for(var x = 0; x < playerStats.packSize; x++){
				createRandomCard();
			}
		}
		else{
			var maxPacks = maxPackCost();
			if(maxPacks > 0){
				playerStats.gold -= totalPackCost(maxPacks);
				playerStats.packsBought += maxPacks;
				for(var x = 0; x < (playerStats.packSize * maxPacks); x++){
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
	return Math.floor((100 * (1+n) * Math.pow(1.03, n)));
}

function onePackCost(){
	return Math.floor((100 * (1+playerStats.packsBought) * Math.pow(1.03, playerStats.packsBought)));
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