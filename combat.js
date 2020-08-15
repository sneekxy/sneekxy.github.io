function doCombat(){
	
	var boss = playerStats.isBoss;
	var bAI;
	/*
	bAI is the AI object, it contains special instructions for bosses that can manipulate lots of stuff in the battle
	example String:
	playerDmg ; playerSpd ; playerArmor ; playerResist ; playerHp ; monsterDmg ; monsterSpd ; monsterArmor ; monsterResist ; monsterHP ; string
	0;0;0;0;25;0;0;0;0;"big guy slams hard for %t damage"
	
	Would add these values to the combat stats and uses the string at the end instead of normal combat string
	Need to replace %t with monster damage and such.
	%t = monster damage
	%s = monster speed
	
	nothing else should need to be modified
	*/
	
	if(boss){
		var bssName = playerStats.monName;
		if(bssName.includes("Yuffeti"))
			bssName = "Dark Genie, Yuffeti";
		bAI = bossScript[bssName]();
	}
	var pDmgBoss = 0;
	var pSpdBoss = 0;
	var pArmBoss = 0;
	var pResBoss = 0;
	var pHpBoss = 0;
	var mDmgBoss = 0;
	var mSpdBoss = 0;
	var mArmBoss = 0;
	var mResBoss = 0;
	var mHpBoss = 0;
	var sBoss = "";
	var showBossString = "true";
	if(bossSpecial){
		bAI = bAI.split(";");
		pDmgBoss = Number(bAI[0]);
		pSpdBoss = Number(bAI[1]);
		pArmBoss = Number(bAI[2]);
		pResBoss = Number(bAI[3]);
		pHpBoss = Number(bAI[4]);
		mDmgBoss = Number(bAI[5]);
		mSpdBoss = Number(bAI[6]);
		mArmBoss = Number(bAI[7]);
		mResBoss = Number(bAI[8]);
		mHpBoss = Number(bAI[9]);
		sBoss = bAI[10];
		showBossString = bAI[11];
	}
	
	var pDmg = Number(playerStats.Dmg)+pDmgBoss;
	if(boss)
		pDmg = Math.floor(pDmg * .9);
	var vSpd = Number(playerStats.Spd)+pSpdBoss;
	vSpd = Math.floor(getRandomRange(vSpd,.2));
	var pSpd = Math.floor(vSpd)
	var leftOver = vSpd%1;
	var totDmg = 0;
	for(var x=0; x<pSpd; x++){
		var cm = 1;
		if(doLuck(Number(playerStats.Crit))){
			cm = (Number(playerStats.CDmg)/100);
		}
		totDmg += (getRandomRange(pDmg,.25)*cm);
	}
	var avg = totDmg/pSpd;
	totDmg = Math.floor(totDmg + (avg*leftOver));
	var dd = totDmg;
	var mobR = scaleResist(Number(genericScale(playerStats.monResist,750))+mResBoss, true);
	var mobA = genericScale(Number(playerStats.monArmor)+mArmBoss,500);
	if(playerStats.monLevel <= 15 && mobA >= 5)
		mobA -= 2;
	totDmg = Math.floor((totDmg * mobR) - mobA);
	totDmg = totDmg >0?totDmg:1;
	
	var totDmgM = 0;
	
	var vSpd2 = Number(playerStats.monSpd) + mSpdBoss;
	vSpd2 = Math.floor(getRandomRange(vSpd2,.2));
	var mSpd = Math.floor(vSpd2);
	mSpd = genericScale(scaleSpeed(mSpd, true),8);
	mSpd = mSpd>0?mSpd:1;
	var mLO = vSpd2%1;
	
	var mDmg = genericScale(Number(playerStats.monDmg)+mDmgBoss, 100);
	for(var x=0; x<mSpd; x++){
		var cm = 1;
		if(Math.floor(Math.random()*100) <= 25){
			cm = 1+(Number(playerStats.monCDmg)/100);
			cm = genericScale(cm, 2);
		}
		totDmgM += (getRandomRange(mDmg,.25)*cm);
	}
	var avg = totDmgM/mSpd;
	totDmgM = Math.floor(totDmgM + (avg*mLO));
	var ddd = totDmgM;
	var plaR = playerStats.Resist + pResBoss;
	var plaA = playerStats.Armor + pArmBoss;
	totDmgM = Math.floor((totDmgM * (1-plaR/100)));
	totDmgM -= plaA;
	for(var x=0; x<mSpd; x++){
		if(plaA/(2+x) > 1){
			totDmgM -= (plaA/(2+x));
		}
		else
			break;
	}
	totDmgM = Math.floor(totDmgM);
	totDmgM = totDmgM>0?totDmgM:0;
	if(playerStats.isBoss)
		totDmgM++;
	
	var spdColor1 = getColor(pSpd/100);
	var spdColor2 = getColor(mSpd/100);
	var dmgColor1 = getColor((1-(totDmg/playerStats.monHpMax)));
	var dmgColor2 = getColor((1-(totDmgM/playerStats.HpMax)));
	if(playerStats.qlevel >= 500){
		totDmg *= .75;
		totDmg = totDmg >0?Math.floor(totDmg):1;
	}
	
	
	
	var td1 = totDmg;
	var td2 = totDmgM;
	var ttt = "time";
	if(pSpd > 1)
		ttt = "times";
	var ttt2 = "time";
	if(mSpd > 1)
		ttt2 = "times";

	if(spdColor1 == "rainbow"){
		pSpd = "<span class=\"rainbow-text\">"+pSpd+"</span>";
	}
	else{
		pSpd = "<span style=\"color:"+spdColor1+"\">"+pSpd+"</span>";
	}
	if(spdColor2 == "rainbow"){
		mSpd = "<span class=\"rainbow-text\">"+mSpd+"</span>";
	}
	else{
		mSpd = "<span style=\"color:"+spdColor2+"\">"+mSpd+"</span>";
	}
	if(dmgColor1 == "rainbow"){
		totDmg = "<span class=\"rainbow-text\">"+totDmg+"</span>";
	}
	else{
		totDmg = "<span style=\"color:"+dmgColor1+"\">"+totDmg+"</span>";
	}
	if(dmgColor2 == "rainbow"){
		totDmgM = "<span class=\"rainbow-text\">"+totDmgM+"</span>";
	}
	else{
		totDmgM = "<span style=\"color:"+dmgColor2+"\">"+totDmgM+"</span>";
	}
	
	var ss;

	if(!boss){
		ss ="<br><hr><br>You swing at the <span style='color:#C18AB5'>"+playerStats.monName+"</span> "+pSpd+" "+ttt+" dealing "+totDmg+" damage!<br><br>";
		ss +="The <span style='color:#C18AB5'>"+playerStats.monName+"</span> "+playerStats.monSwing+" at you "+mSpd+" "+ttt2+" dealing "+totDmgM+" damage!";
		
	}
	else{
		ss ="<br><hr><br>You swing at <span style='color:#9500FF'>"+playerStats.monName+"</span> "+pSpd+" "+ttt+" dealing "+totDmg+" damage!<br><br>";
		if(!bossSpecial){
			ss +="<span style='color:#9500FF'>"+playerStats.monName+"</span> "+playerStats.monSwing+" at you "+mSpd+" "+ttt2+" dealing "+totDmgM+" damage!";
		}
		else{
			sBoss = sBoss.replace("%t", totDmgM);
			sBoss = sBoss.replace("%s", mSpd);
			ss += sBoss;
			if(showBossString == "true"){
				ss += "<br><span style='color:#9500FF'>"+playerStats.monName+"</span> "+playerStats.monSwing+" at you "+mSpd+" "+ttt2+" dealing "+totDmgM+" damage!";
			}
		}
	}
	if(td2/playerStats.HpMax > .15)
		ss +="<br><span style='color:red'>OUCH!</span>";
	
	playerStats.Hp -= td2;
	playerStats.monHp = playerStats.monHp - td1 + mHpBoss;
	
	if(((playerStats.Hp/playerStats.HpMax) <= .5)&&(playerStats.potions > 0) && playerStats.autoPotion){
		var heal = Math.round(playerStats.HpMax *.33);
		if(playerStats.catUpgrades[17] == 1)
			heal *=2;
		ss +="<br><br><span style='color:#D1D868'>You scramble around in your sack for a potion. *GLUG GLUG GLUG*. Ahhh, much better!<br>You recover "+heal+" HP!</span>";
		playerStats.potions --;
		playerStats.Hp += heal;
	}
	
	var tt = "";
	if(playerStats.monHp <= 0){
		playerStats.monHp = 0;
		tt += doWin();
		quest2Text(tt);
		if(!boss){
			var xp = getXp();
			questRXP(xp);
		}
	}
	else{
		if(playerStats.Hp <= 0){
			if(playerStats.catArmor == 1){
				playerStats.Hp = playerStats.HpMax;
				tt += "<br><br><span style='color:#FDCE8D'>Your Cat Mercenaries sacrifice themselves for you! Don't let their actions be in vain!</span>";
				playerStats.catArmor = 0;
			}
			else{
				playerStats.Hp = 0;
				tt += doDeath();
			}
			quest2Text(tt);
		}
		else{
			tt += "<br><br><br>You are "+getConditionString(Number(playerStats.HpMax), Number(playerStats.Hp))+"!";
			if(!boss)
				tt += "<br><br>The <span style='color:#C18AB5'>"+playerStats.monName+"</span> is "+getConditionString(Number(playerStats.monHpMax),Number(playerStats.monHp))+"!";
			else
				tt += "<br><br><span style='color:#9500FF'>"+playerStats.monName+"</span> is "+getConditionString(Number(playerStats.monHpMax),Number(playerStats.monHp))+"!";
			quest2Text(tt);
		}
	}
	bossSpecial = false;
	
	return ss;
}
function getXp(){
	var xp = Math.floor((Math.pow(Number(playerStats.monLevel),1.03) * 3.5));
	if(playerStats.level - playerStats.monLevel >= 5)
		xp *= .5;
	xp = (getRandomRange(xp,.2));
	return xp;
}
function hideState(){
	setTimeout(function(){
		$('#enemyStats').hide();
		playerStats.inCombat = false;
		playerStats.isBoss = false;
	},(playerStats.questTimer*1000/2)); 
}
function doWin(){
	hideState();
	var ss = "";
	if(!playerStats.isBoss)
		ss = "<br><br><span style='color#00FF4A'>Your attack quickly dispatches the <span style='color:#C18AB5'>"+playerStats.monName+"</span>! You are victorious.";
	else{
		ss = "<br><br><span style='color#00FF4A'>After a long and enduring battle, you have finally slain <span style='color:#9500FF'>"+playerStats.monName+"</span>! You are victorious.";
		completeQuest();
		questDoWinFull();
	}
	
	return ss;
}
function doDeath(){
	hideState();
	var ss = "";
	playerStats.dead = true;
	playerStats.inCombat = false;
	if(!playerStats.isBoss)
		ss = "<br><br><span style='color:red'>The attack from the <span style='color:#C18AB5'>"+playerStats.monName+"</span> kills you!. Or does it? You are just barely alive but you cannot continue in this condition. You will have to wait until you fully recover before you can continue to explore.</span>";
	else
		ss = "<br><br><span style='color:red'>The attack from <span style='color:#9500FF'>"+playerStats.monName+"</span> defeats you!. You will have to wait until you fully recover before you can continue to explore.</span>";
	
	ss += "<br><span style='color:red'>You have to abandon your quest and try for a new one, once you recover.</span>";
	return ss;
}
function getConditionString(x, y){
	var z = Math.floor((y/x)*100);
	var ss = "<span style='color:";
	switch(true){
		case(z < 9): ss +="red'>on the verge of death"; break;
		case(z > 8 && z < 16): ss +="darkred'>gushing tons of blood"; break;
		case(z > 15 && z < 21): ss +="brown'>wishing the blood and pain would stop"; break;
		case(z > 20 && z < 31): ss+="#A85E11'>limping around begging for help"; break;
		case(z > 30 && z < 50): ss+="darkorange'>covered in bloody wounds and bruises"; break;
		case(z > 49 && z < 66): ss+="yellow'>visibly in pain"; break;
		case(z > 65 && z < 79): ss+="green'>in okay condition"; break;
		case(z > 78 && z < 91): ss+="lightgreen'>doing fine"; break;
		case(z > 90 && z < 100): ss+="#50FF64'>in great condition"; break;
		case(z > 99): ss+="#00FF1E'>in perfect condition"; break;
	}
	ss += "</span>";
	return ss;
}