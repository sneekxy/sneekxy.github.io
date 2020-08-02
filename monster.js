function doCombat(){
	var pDmg = playerStats.Dmg;
	var pSpd = Math.floor(playerStats.Spd);
	var leftOver = playerStats.Spd%1;
	var totDmg = 0;
	for(var x=0; x<pSpd; x++){
		var cm = 1;
		if(doLuck(playerStats.Crit)){
			cm = (playerStats.CDmg/100);
		}
		totDmg += (getRandomRange(pDmg,.25)*cm);
	}
	var avg = totDmg/pSpd;
	totDmg = Math.floor(totDmg + (avg*leftOver));
	var mobR = scaleResist(playerStats.monResist, true);
	var mobA = scaleArmor(playerStats.monArmor, true);
	totDmg = Math.floor((totDmg * mobR) - mobA);
	totDmg = totDmg >0?totDmg:1;
	
	var totDmgM = 0
	var mSpd = Math.floor(playerStats.monSpd);
	var mLO = playerStats.monSpd%1;
	var mDmg = playerStats.monDmg;
	for(var x=0; x<mSpd; x++){
		var cm = 1;
		if(Math.floor(Math.random()*100) <= 25){
			cm = 1+(playerStats.monCDmg/100);
		}
		totDmgM += (getRandomRange(mDmg,.25)*cm);
	}
	var avg = totDmgM/mSpd;
	totDmgM = Math.floor(totDmgM + (avg*mLO));
	var plaR = scaleResist(playerStats.Resist, false);
	var plaA = playerStats.Armor;
	totDmgM = Math.floor((totDmgM * (1-plaR/100)) - plaA);
}	

function enterCombat(){
	var mm = mob[Math.floor(Math.random()*mob.length)];
	mm  = scaleMob(mm);
	playerStats.monster = mm;
	var mobSplit = playerStats.monster.split(";");

	playerStats.monNam = mobSplit[0];
	playerStats.monHp = mobSplit[1];
	playerStats.monCDmg = mobSplit[2];
	playerStats.monDmg = mobSplit[3];
	playerStats.monSpd = mobSplit[4];
	playerStats.monArmor = mobSplit[5];
	playerStats.monResist = mobSplit[6];
	
	var aan = "a";
	var charVal = mobSplit[0].charAt(0).toLowerCase;
	if(charVal == "a" || charVal == "e" || charVal == "i" || charVal == "o" || charVal == "u")
		aan = "an"
	var ss = "You encountered "+aan+" "+mobSplit[0]+"! It's time to fight.";
	playerStats.inCombat = true;
	return ss;
}
function scaleMob(m){
	var lvl = getMobLevel();
	var bm = m.split(";");
	var reassign = "";
	reassign = bm[0];
	for(var x=1; x< bm.length;x++){
		reassign += ";"+Math.floor(Number(bm[x])*lvl);
	}
	reassign += ";"+lvl;
	return reassign;
}
function getMobLevel(){
	var ll = playerStats.qlevel;
	return getRandomRange(ll,.2);
}
function getRandomRange(x, y){
	var per = Math.floor(x*y);
	var num = Math.floor(Math.random()*per);
	num *= Math.floor(Math.random()*2)==1?1:-1;
	num = Math.round(x+num);
	return num>0?num:1;
}

var mob = [
//name;hp;critDmg;dmg;speed;armor;resist
"Imp;8;.8;.5;.3;1.5;1",
"Goblin;7;1.2;.8;.5;1;.5",
"Blob;11;.3;.3;.5;1.3;1.3",
]