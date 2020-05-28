var endTime;
var playerStats = {
	gold: 0,
	gps: 0,
	gps_multi: 1,
	cardsOwned: 0,
	luck: 1,
};
function pageInit(){
	endTime = Date.now() + 1000;
	startGame();
}
function startGame(){
	//mainTick(1);
}
function mainLoop(){
	updateGainsThisTick();
	applyGainsThisTick();
	updateGameDisplay();
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
	$('#cardList').text(playerStats.cardsOwned);
	$('#gold').text(playerStats.gold);
}

function applyGainsThisTick(){
	playerStats.gps = Number(Math.floor(playerStats.gps * playerStats.gps_multi));
	playerStats.gold += Number(playerStats.gps);
}

function updateGainsThisTick(){
	playerStats.gps = 0;
	playerStats.gps_multi = 1;
	cardHolder.forEach(updateFunction);
	function updateFunction(index){
		var effect = index.effect;
		applyEffect(effect, getCardAmt(index.id));
	}
	playerStats.cardsOwned = getCardCount();
}
function applyEffect(effect, amt){
	var effList = effect.split("-");
	effList.forEach(effectFunction);
	function effectFunction(index){
		var effList2 = index.split(";");
		switch(effList2[0]){
			case("gold"): 
				effList2[1] *= amt; 
				playerStats.gps += Number(effList2[1]); break;
			case("cgold"): 
				effList2[1] *= amt;
				if(doLuck(effList2[2])){
					playerStats.gps += Number(effList2[1]); 
				}break;
			case("rgold"):
				effList2[1] *= amt;
				effList2[2] *= amt;
				playerStats.gps += Number(doRangeLuck(effList2[1], effList2[2], true)); break;
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
				playerStats.gps += Number(effList2[1] * Math.pow(2,procs)); break;
			case("tgold"):
				var baseIncrease = 1 + Math.floor(effList2[1] * Math.log10(1.3 * getCardCount())*100)/10000;
				var totalIncrease = Math.floor(baseIncrease * (1+(((1-Math.pow(effList2[2],amt))/(1-effList2[2])))/10)*100)/100;
				playerStats.gps_multi *= totalIncrease
			break;
		}
	}
}
function doLuck(percent){
	var retVal = false;
	for(var x = 0; x < Math.floor(1 + playerStats.luck/3); x++){
		if((Math.random()*100) <= (Math.floor(percent+(playerStats.luck/2)))){
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
	for(var x = 0; x < Math.floor(1 + playerStats.luck/3); x++){
		var holder = Math.floor(Math.random() * (upper - lower + 1))+lower;
		if(type){
			if(holder >= retVal)
				retVal = holder;
		}
		else{
			if(holder <= retVal)
				retVal = holder;
		}
		
	}
	console.log(retVal);
	return retVal;
}
