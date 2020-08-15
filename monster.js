function enterCombat(x){
	var mm;
	if(!playerStats.isBoss)
		mm = mob[Math.floor(Math.random()*mob.length)];
	else
		mm = bossMob[Math.floor(Math.random()*bossMob.length)];
	
	mm  = scaleMob(mm, x);
	playerStats.monster = mm;
	var mobSplit = playerStats.monster.split(";");

	playerStats.monName = mobSplit[0];
	playerStats.monHp = Number(mobSplit[1]);
	playerStats.monHpMax = Number(mobSplit[1]);
	playerStats.monCDmg = Number(mobSplit[2]);
	playerStats.monDmg = Number(mobSplit[3]);
	playerStats.monSpd =Number( mobSplit[4]);
	playerStats.monArmor = Number(mobSplit[5]);
	playerStats.monResist = Number(mobSplit[6]);
	playerStats.monSwing = mobSplit[7];
	playerStats.monLevel = Number(mobSplit[8]);
	
	var aan = "a";
	var charVal = mobSplit[0].charAt(0).toLowerCase;
	if(charVal == "a" || charVal == "e" || charVal == "i" || charVal == "o" || charVal == "u")
		aan = "an"
	if(x > 0)
		aan = "a <span style='font-weight:bold'>*POWERFUL*</span>";
	var ss;
	if(!playerStats.isBoss)
		ss = "You encountered "+aan+" <span style='color:#C18AB5'>"+mobSplit[0]+"</span>! It's time to fight.";
	else
		ss = "You encountered <span style='color:#9500FF'>"+mobSplit[0]+"</span>! "+gestureQuote[Math.floor(Math.random()*gestureQuote.length)];
	playerStats.inCombat = true;
	return ss;
}
function scaleMob(m, y){
	var lvl = getMobLevel(y);
	var bm = m.split(";");
	var reassign = "";
	var scalVal = genericScale(1+Math.floor(lvl/15),20);
	scalVal = Math.pow(1.01,scalVal);
	scalVal = genericScaleNoFloor(scalVal,1.25);
	reassign = bm[0];
	for(var x=1; x< bm.length;x++){
		var bigScale;
		switch(x){
			case(1): bigScale = 3.5;break;
			case(2): bigScale = .95;break;
			case(3): bigScale = .9; break;
			case(4): bigScale = .7; break;
			case(5): bigScale = 1.2; break;
			case(6): bigScale = 1.2; break;
		}
		if(x!=7){
			if(lvl >= 100){
				if(lvl >= 500){
					bigScale = Math.pow(bigScale,1.3);
				}
				reassign += ";"+Math.floor(Number(bm[x])*lvl*scalVal * bigScale);
			}
			else
				reassign += ";"+Math.floor(Number(bm[x])*lvl*scalVal);
		}
		else{
			reassign += ";"+bm[x];
		}
	}
	reassign += ";"+lvl;
	return reassign;
}
function getMobLevel(y){
	var ll = playerStats.qlevel;
	return Math.floor(ll*y + getRandomRange(ll,.1));
}
function getRandomRange(x, y){
	var per = Math.floor(x*y);
	var num = Math.floor(Math.random()*per);
	num *= Math.floor(Math.random()*2)==1?1:-1;
	num = Math.round(x+num);
	return num>0?num:1;
}
function getRandomRangeNoFloor(x, y){
	var per = (x*y);
	var num = (Math.random()*per);
	num *= (Math.random()*2)==1?1:-1;
	num = (x+num);
	return Math.abs(num);
}
var gestureQuote = [
"Good luck, you'll need it.",
"Are you ready to rumble?!?",
"It's too late to turn back! GET READY!",
"Let's a go!",
"Bad timing, you just noticed your shoe is untied!",
"You ready your weapon and prepare for the bloodbath",
"Showtime!",
"Show them who's small-time.",
];
var mob = [
//name;hp;critDmg;dmg;speed;armor;resist
"Imp;3;1.8;.9;.2;.15;7;swings",
"Goblin;4;1.1;.85;.25;.55;4;slashes",
"Blob;6;.3;.3;.45;.25;.1;spits",
"Zombie;4;.8;.8;.35;.5;3.5;hits",
"Robot;3;1.2;.55;.55;.8;4.3;blasts",
"Rat;2;4;.88;.45;.1;.1;bites",
"Fugitive Mage;3;1.5;1;.3;.1;5;shoots fireballs",
"Renegade Warrior;5;1;.85;.4;.65;4;slashes",
"Bandit;3.5;2;.45;.75;.45;3;stabs",
"Ghost;4;.8;.8;.4;.3;5;screams",
"Giant;6.5;.4;1.05;.2;.45;3;stomps",
"Scorpion;4.5;3;.7;.35;.25;4;snips",
"Evil Hawk;4.4;3;.45;.65;.25;7;pecks",
"Drunken Cop;5.5;7;.6;.3;.35;2;shoots",
"Pebble;2;.1;.5;.5;.85;50;rolls",
"Boulder;4.5;1;.75;.35;.85;50;rains rocks",
]
var bossMob = [
//name;hp;critDmg;dmg;speed;armor;resist
"Galzon, The Impaler;9;3;.66;.5;.65;.1;stabs",
"The Immortal Shield, Bui;11;1.2;.78;.35;.7;10;bashes",
"Grand Duke Manard;10;1.2;.65;.4;.9;5;swings",
"Seltya, the Relentless;10.5;4;.4;.75;.1;.1;swings",
"Arcmage Ulimazz;9;1;.75;.2;.1;25;slings magic missiles",
"The Smiling Titan, Jifius;12;.5;1.1;.2;.8;8;stomps",
"Zulja, the Wall;12;1;.75;.35;.5;20;bashes", 
"Voz'dhaunun, Shadow Incarnate;9;1;.4;.55;.1;15;sends shadows", 
"Sekdox, the Dream Eater;10.5;3;.7;.3;.4;15;bites", 
"Dark Genie, Yuffeti;8.5;2.2;.7;.37;.45;7;snaps her fingers",
]
/*







] */