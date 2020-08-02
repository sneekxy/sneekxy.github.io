var questInterval;
var questTime;
var questShow = true;
function doQuest(){
	var ss;
	if(!playerStats.inCombat){
		playerStats.qroom++;
		ss = "<br><hr><br>"+processRoom(getRandomRoom());	
	}
	else{
		ss = doCombat();
	}
	addTextQuest(ss);
}
function startQuest(){
	questLoop(playerStats.questTimer);
}
function questLoop(x){
	questInterval = setInterval(function() {
		if(isNaN(questTime))
			questTime = Date.now();
		var elapsedTime = questTime - Date.now();
		if(elapsedTime < 0){
			var timesRan = 1+Math.floor(Math.abs(elapsedTime)/(x*1000));
			if(timesRan > 232000)
				timesRan = 232000;
			if(timesRan >= 10){
				questShow = false;
				for(var y=0; y < timesRan; y++){
					doQuest();
				}
			}
			else{
				doQuest();
			}

			clearInterval(questInterval);
			questTime = Date.now() + (x*1000);
			questLoop(x);
		}
	}, 100);

}
function getRandomRoom(){
	roomtbl = buildRoomTable();
	var val = Math.random();
	var slot = -1;
	for(var x = 0; x < roomtbl.length; x++){
		if(val <= roomtbl[x]){
			slot = x;
			x = roomtbl.length;
		}
	}
	if(slot == -1){
		slot = roomtbl.length-1;
	}
	return rooms[slot]
}

function buildRoomTable(){
	var total = playerStats.roomweight.reduce(function(x, y){return x+y;});
	var reducMap = [];
	for(var x=0; x < playerStats.roomweight.length; x++){
		reducMap.push(Math.floor((playerStats.roomweight[x]/total)*100000)/100000);
	}
	var rollTotal = 0;
	for(var x=0; x< reducMap.length; x++){
		rollTotal += reducMap[x];
		reducMap[x] = rollTotal;
	}
	return reducMap;
}
function processRoom(room){
	var ss = roomEvents[room]();
	var tt = gainXP(1);
	return ss;
}
function newQuest(x){
	if(x == 1){
		playerStats.qlevel = 1;
		playerStats.qroomMax = 10;
		playerStats.qroom = 0;
	}
	if(playerStats.qroomMax == 0){
		var complete = playerStats.qcompleted;
		if(playerStats.qlevel > complete)
			complete += (playerStats.qlevel - complete);
		var level = Math.floor(5-(Math.random()*5)+(Math.random()*(2+(complete+1))+(complete/2)));
		if(level == 0){
			level++;
		}
		playerStats.qlevel = level;
		var rooms = Math.floor(doRangeLuck(level*5,Math.floor(level*8 -(Math.random()*level*2)+(Math.random()*level*8)),false));
		playerStats.qroomMax = rooms;
		playerStats.qroom = 0;
		doQuest();
	}
}
function addText(ss){
	if(questShow){
		var baby = $('#questText').html();
		if(baby.length > 20000){
			baby = baby.slice(getStringPosition(baby, "<br>", 20)+4);
		}
		if(Math.abs($('#questText').scrollTop() - ($('#questText').prop("scrollHeight")-399)) <= 5){
			$('#questText').html(baby).append(ss);
			$('#questText').scrollTop($('#questText').prop("scrollHeight"));
		}	
		else{
			$('#questText').html(baby).append(ss);
		}
		if($('#questText').prop("scrollHeight") <= 700)
			$('#questText').scrollTop($('#questText').prop("scrollHeight"));
	}
}
function addTextQuest(ss){
	if(questShow){
		var baby = $('#questText').html();
		if(baby.length > 20000){
			baby = baby.slice(getStringPosition(baby, "<br>", 20)+4);
		}
		if(Math.abs($('#questText').scrollTop() - ($('#questText').prop("scrollHeight")-399)) <= 5){
			$('#questText').html(baby).append(ss);
			$('#questText').scrollTop($('#questText').prop("scrollHeight"));
		}	
		else{
			$('#questText').html(baby).append(ss);
		}
		if($('#questText').prop("scrollHeight") <= 700)
			$('#questText').scrollTop($('#questText').prop("scrollHeight"));
	}
}
function forceScroll(){
	$('#questText').scrollTop($('#questText').prop("scrollHeight"));
}
function scaleReward(x, y){
	var retVal = y;
	if(x == 0)
		retVal *= .15;
	if(x == 1)
		retVal *= .20;
	if(x == 2)
		retVal *= .35;
	if(x == 3)
		retVal *= .40;
	if(x == 4)
		retVal *= .55;
	if(x == 5)
		retVal *= .6;
	if(x == 6)
		retVal *= .75;
	if(x == 7)
		retVal *= .8;
	if(x == 8)
		retVal *= 1.25;
	if(x == 9)
		retVal *= 1.5;
	if(x == 10)
		retVal *= 1.75;
	if(x == 11)
		retVal *= 2;
	return retVal;
}
function goldReward(x){
	var retVal = playerStats.avgGPS * playerStats.questReward;
	return Math.floor(scaleReward(x,retVal));
}
function catReward(x){
	var retVal = playerStats.avgCPS * playerStats.questReward;
	return Math.floor(scaleReward(x,retVal));
}
function gemReward(x){
	var retVal = playerStats.avgGMPS * playerStats.questReward;
	return Math.floor(scaleReward(x,retVal));
}
function getRandomReward(){
	var retVal;
	switch(Math.floor(Math.random()*3)){
		case(0): retVal = (goldReward(Math.floor(Math.random()*8))+";Gold"); break;
		case(1): retVal = (catReward(Math.floor(Math.random()*8))+";Cats"); break;
		case(2): retVal = (gemReward(Math.floor(Math.random()*8))+";Gems"); break;
	}
	return retVal;
}
function bigMon(){
	playerStats.gold = 1000000000000;
	playerStats.cat = 1000000000;
	playerStats.gems = 1000000;
}
function qPowerLevel(x){
	return x;
}
function pPowerLevel(){
	return playerStats.level;
}
var rooms=[
"combat",
"treasure",
"locked",
"key",
"strcheck",
"stamcheck",
"dexcheck",
"endcheck",
"luckcheck",
"shortcut",
"lost",
"empty",
"training",
"bigtreasure",
"smalltreasure",
"hardcombat",
"levelup",
"leveldown",
"bomb",
"map",
"bigkey",
];