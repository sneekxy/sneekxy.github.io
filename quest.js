var questInterval;
var questTime;
var questShow = true;

function doQuest(){
	if(playerStats.runQuest){
		playerStats.Hp += playerStats.HpRegen;
		if(!playerStats.dead){
			var ss;
			if(!playerStats.inCombat){
				if(playerStats.qroom < playerStats.qroomMax)
					playerStats.qroom++;
				var randRoom = getRandomRoom();
				if(playerStats.qroom >= playerStats.qroomMax)
					randRoom = "bossRoom";
				
				if(!(randRoom in roomStats)){
					roomStats[randRoom] = 1;
				}
				else{
					roomStats[randRoom] += 1;
				}
				
				ss = "<br><hr><br>"+processRoom(randRoom);	
			}
			else{
				ss = doCombat();
			}
			addTextQuest(ss);
		}
		else
			playerStats.Hp += (1 + playerStats.HpRegen*5);
		if((playerStats.Hp >= playerStats.HpMax)){
			playerStats.Hp = playerStats.HpMax;
			if(playerStats.dead){
				playerStats.passed = false;
				playerStats.runQuest = false;
				newQuest();
			}
			playerStats.dead = false;
		}

	}
}
function startQuest(){
	playerStats.runQuest = true;
	questLoop(playerStats.questTimer);
}
function doMultipleQuest(tr){
	if(tr < 1000){
		for(var x =0; x < tr; x++){
			doQuest();
		}
	}
	else{
		var currG = 0;
		var currC = 0;
		var currGm = 0;
		var currF = 0;
		var currx = playerStats.exp;
		var currp = playerStats.qcompleted;
		var currpl = playerStats.qcompletedLvl;
		
		ggoldg = 0;
		gcatg = 0;
		ggemg = 0;
		gfragg = 0;
		
		for(var x =0; x < 1000; x++){
			doQuest();
		}

		var diffG = ggoldg - currG;
		var diffC = gcatg - currC;
		var diffGm = ggemg - currGm;
		var diffF = gfragg - currF;
		var diffx = playerStats.exp - currx;
		var diffp = playerStats.qcompleted - currp;
		var diffpl = playerStats.qcompletedLvl - currpl;
		tr -= 1000;
		
		addGold((Math.floor(diffG/1000 * tr)),1);
		addCat((Math.floor(diffC/1000 * tr)),1);
		addGem((Math.floor(diffGm/1000 * tr)),1);
		questRFrag((Math.floor(diffF/1000 * tr)));
		gainXP((Math.floor(diffx/1000 * tr)));
		playerStats.qcompleted += Math.floor((diffp/1000 * tr));
		playerStats.qcompletedLvl += Math.floor((diffpl/1000 * tr));
		
	}
}
function questLoop(x){
	if(playerStats.runQuest){
		questInterval = setInterval(function() {
			if(isNaN(questTime))
				questTime = Date.now();
			var elapsedTime = questTime - Date.now();
			if(elapsedTime < 0){
				clearInterval(questInterval);
				
				questShow = true;
				var timesRan = Math.floor(Math.abs(elapsedTime)/(x*1000));
				if(timesRan > 232000)
					timesRan = 232000;
				if(timesRan > 1){
					questShow = false;
					doMultipleQuest(timesRan);
				}
				else{
					doQuest();
				}

				questTime = Date.now() + (x*1000);
				
				questLoop(x);
			}
		}, 100);
	}
	else
		clearInterval(questInterval);
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
		playerStats.firstQuest = false;
		$('#firstQuestMessage').hide();
		playerStats.Hp = playerStats.HpMax;
	}
	else{

		var oldLvl = playerStats.qlevel;
		var lvl = playerStats.level;
		
		var newLevel = Math.floor(lvl + (lvl*-.1 + Math.round(Math.random()*(lvl*.1))));
		if(lvl <= 15)
			newLevel = lvl + (-1 + Math.round(Math.random()*2));
		if(!playerStats.passed)
			newLevel = Math.floor(oldLvl * .9);
		newLevel = newLevel < 1?1:newLevel;
		newLevel = newLevel >=5000?5000:newLevel;
		
		
		playerStats.qlevel = newLevel;
		var rooms = Math.floor(doRangeLuck(newLevel*3,Math.floor(newLevel*6 -(Math.random()*newLevel*2)+(Math.random()*newLevel*6)),false));
		
		
		playerStats.qroomMax = rooms;
		playerStats.qroom = 0;
	}
	if(playerStats.catUpgrades[16] == 1)
		playerStats.catArmor = 1;
	playerStats.qName = getNewQuestName();
	var ss = "<br><hr><br>You start out on a quest! Your quest is "+playerStats.qName+"!<br> You will complete the quest by defeating the boss at the end of the dungeon.";
	addText(ss);
	setTimeout(function(){
		startQuest();
	},(playerStats.questTimer*1000));
}
function completeQuest(){
		playerStats.runQuest = false;
		playerStats.passed = true;
		playerStats.qcompleted++;
		if(playerStats.qlevel > playerStats.qcompletedLvl)
			playerStats.qcompletedLvl = playerStats.qlevel;
		var ss = "<br><br><span class=\"rainbow-text\" style='font-weight:bold'>CONGRATULATIONS! YOU COMPLETED THE QUEST!";
		var tVal1 = goldReward(Math.floor(Math.random()*(12-8)+8));
		var tVal2 = catReward(Math.floor(Math.random()*(12-8)+8));
		var tVal3 = gemReward(Math.floor(Math.random()*(12-8)+8));
		var tVal4 = Math.floor(25 + Math.pow(playerStats.qlevel,1.3) * 10);
		ss += "<br>You earned <span style='color:gold'>"+formatNumber(tVal1)+" Gold</span>, <span style='color:sandybrown'>"+formatNumber(tVal2)+" Cats</span>, and <span style='color:cyan'>"+formatNumber(tVal3)+" Gems</span>!";
		ss += "<br><br>And you found a random equpiment card!";
		setTimeout(function(){
			quest2Text(ss);
			questRGold(tVal1);
			questRCat(tVal2);
			questRGem(tVal3);
			questRXP(tVal4);
			createRandomCard(5);
		},(playerStats.questTimer*1000/4));
		setTimeout(function(){
			newQuest();
		},(playerStats.questTimer*1500));
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
	if(playerStats.gemUpgrades[14] == 1)
		x++;
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
	if(x > 7)
		retVal *= 1 + (.25 * (x-7));
	
	retVal *= genericScaleNoFloor(1+(playerStats.qlevel*.005),1.5);
	if(playerStats.gemUpgrades[10] == 1){
		retVal *= 1.2;
	}
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
function fragReward(x){
	var retVal = Math.pow(playerStats.qlevel,1.1) * 75;
	return Math.floor(scaleReward(x,retVal));
}
function getRandomReward(){
	var retVal;
	switch(Math.floor(Math.random()*4)){
		case(0): retVal = (goldReward(Math.floor(Math.random()*8))+";Gold"); break;
		case(1): retVal = (catReward(Math.floor(Math.random()*8))+";Cats"); break;
		case(2): retVal = (gemReward(Math.floor(Math.random()*8))+";Gems"); break;
		case(3): retVal = (fragReward(Math.floor(Math.random()*8))+";Jewel Fragments"); break;
	}
	return retVal;
}
function bigMon(){
	playerStats.gold = 1000000000000;
	playerStats.cat = 1000000000;
	playerStats.gems = 1000000;
}
function qPowerLevel(x){
	var scalVal = genericScale(1+Math.floor(x/15),25);
	scalVal = Math.pow(1.01,scalVal);
	scalVal = genericScale(scalVal,1.25);
	return Math.round(x*6.5*scalVal);
}
function pPowerLevel(){
	var retVal = Number(playerStats.Str*1.5)+Number(playerStats.Dex*1.5)+Number(playerStats.Stam*1.5)+Number(playerStats.End*1.5)+Number(scaledLuck(playerStats.luck)*1.5)+Number(playerStats.level*1.75);
	return Math.round(retVal);
}
function getNewQuestName(){
	var pre = questPre[Math.floor(Math.random()*questPre.length)];
	var name = pre+questSuf[Math.floor(Math.random()*questSuf.length)];
	var ss = "<span style='color:#"+getRandomColor()+"'>"+name+"</span>";
	return ss;
	
}
function getRandomColor(){
	return Math.floor(Math.random()*16777215).toString(16);
}
var questPre=[
"The Hunt for ",
"The Curse of ",
"The Orb of ",
"The Cylix of ",
"The Cursed Mirror of ",
"The Flask of ",
"The Mask of ",
"The Desire for ",
"The Deadly Air of ",
"In Search of ",
"The Hour of ",
"Seeking ",
"In the Portal of ",
"Judgement and ",
"The Mountain of ",
];
var questSuf=[
"The First King's Will",
"The Demon Lord",
"Destiny",
"Sal'lindek",
"The Grand Wizard",
"Justice",
"Annihilation",
"Chaos",
"The Witch",
"Death",
"Silence",
"Peace",
"The Shadows",
"Time",
"the Future",
"Forgiveness",
];
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
"potion",
];