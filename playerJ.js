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
			if(x != "HpRegen")
				$('#p'+x+'Val').text(formatNumber(Number(playerStats[x])));
			else{
				$('#p'+x+'Val').text(Number(playerStats[x]));
			}
			$('#statTT'+x).html(getStatTT(x));
		}
	}
	if($('#jewelProducers').is(":visible")){
		$('#breakCost').text(formatNumber(getBreakCost()));
		$('#jewel0BuildingEarned').text(formatNumber(playerStats.rubyFragment));
		$('#jewel1BuildingEarned').text(formatNumber(playerStats.emeraldFragment));
		$('#jewel2BuildingEarned').text(formatNumber(playerStats.topazFragment));
		$('#jewel3BuildingEarned').text(formatNumber(playerStats.amethystFragment));
		$('#jewel4BuildingEarned').text(formatNumber(playerStats.onyxFragment));
		if(playerStats.slotsOwned == 7){
			$('#buyJewelSlot').hide();
		}
		else{
			$('#buyJewelSlot').show();
			$('#newSlotCost').text(formatNumber(newSlotCost()));
		}
	}
}
function showQuestBuildings(){
	if($('#questProducers').is(":visible")){
		$('#questStats').show();
		$('#questPlayerCurrHp').html(colorHp(playerStats.Hp, true));
		$('#questPlayerHp').html(formatNumber(Number(playerStats.HpMax)));
		$('#questPlayerLevel').html(colorLevel(playerStats.level));
		$('#questPlayerTNL').html(colorXP(playerStats.tnl));
		$('#questName').html("<br>"+playerStats.qName);
		$('#questPLevel').html(qPowerLevel(playerStats.qlevel));
		$('#questPLevel2').html(pPowerLevel());
		var roomLeft = playerStats.qroomMax - playerStats.qroom;
		roomLeft = roomLeft>0?roomLeft:0;
		$('#questRoomsLeft').html(genericColor(roomLeft,playerStats.qroomMax));
		$('#questRooms').html(genericColor(playerStats.qroom,playerStats.qroomMax));
		$('#questKeys').html(playerStats.keys);
		$('#questKeysBig').html(playerStats.bigKey);
		$('#questMaps').html(playerStats.maps);
		$('#questBombs').html(playerStats.bombs);
		$('#questPotions').html(playerStats.potions);
		
		if(playerStats.inCombat){
			$('#questEnemyLevel').html(colorLevel(playerStats.monLevel));
			$('#questEnemyHp').html(formatNumber(playerStats.monHpMax));
			$('#questEnemyCurrHp').html(colorHp(playerStats.monHp, false));
			if(playerStats.isBoss){
				$('#questEnemyName').html(playerStats.monName);
			}
			else{
				$('#questEnemyName').html("");
			}
			$('#enemyStats').show();
		}
		
	}
}
function gainXP(x){
	if(playerStats.gemUpgrades[8] == 1)
		x = Math.round(x*1.25);
	playerStats.exp += x;
	var ss = ""
	if(x > 0)
		ss = "<br><span style='color:Fuchsia'>You gain "+formatNumber(x)+" Experience Points!</span>";
	while(playerStats.exp >= playerStats.tnl){
		levelUp();
	}
	return ss;
}
function levelUp(){
	showGlowMenu("quest");
	playerStats.level++;
	playerStats.tnl = Math.floor(150+(Math.pow(Number(playerStats.level),2.1) * 100));
	if(playerStats.gemUpgrades[12] == 1)
		playerStats.tnl = Math.floor(playerStats.tnl * .9);
	playerStats.Hp = playerStats.HpMax;
	var ss = "";
	if(playerStats.level%2 == 0){
		if(playerStats.level >= 100){
			if(playerStats.level%10 == 0){
				ss = gainRandomStat(5);
			}
		}
		else{
			ss = gainRandomStat(1+(Math.floor(playerStats.level/20)));
		}
	} 
	setTimeout(function(){
	addText("<br><br><span style='color:#00FF4A'>You leveled up! You are now level "+playerStats.level+"!"+ss+"</span>");
	},playerStats.questTimer*1000*.1);
}
function getOldLevelReq(){
	var retVal = Math.floor(150+(Math.pow(Number(playerStats.level-1),1.8) * 75));
	if(playerStats.gemUpgrades[12] == 1)
		retVal = Math.floor(playerStats.tnl * .85);
	return retVal;
}
function getFullAttriName(x){
	var retVal;
	switch(x){
		case("str"): retVal = "Strength"; break;
		case("end"): retVal = "Endurance"; break;
		case("stam"): retVal = "Stamina"; break;
		case("dex"): retVal = "Dexterity"; break;
		case("luck"): retVal = "Luck"; break;
	}
	return retVal;
}
function gainRandomStat(x){
	x = genericScale(x,3);
	var rng = Math.floor(Math.random()*9);
	var stat = "";
	if(rng == 8){
		stat = "luck";
	}else{
		rng = Math.floor(rng/2);
		switch(rng){
			case(0): stat = "str"; break;
			case(1): stat = "end"; break;
			case(2): stat = "stam"; break;
			case(3): stat = "dex"; break;
		}
	}
	playerStats["p"+stat] += x;
	return "<br>You gained "+x+" "+getFullAttriName(stat)+"!";
}
function genericColor(x,y){
	var color = getColor(Number(x)/Number(y));
	var retVal ="";
	if(color != "rainbow"){
		retVal ="<span style=\"color:"+color+"\">"+x+"</span>";
	}
	else{
		retVal ="<span class=\"rainbow-text\">"+x+"</span>";
	}
	return retVal;
}
function colorLevel(l){
	l = Number(l);
	max = 5000;
	var color= getColor(l/max);
	var retVal;
	l = formatNumber(l);
	if(color != "rainbow"){
		retVal = "<span style=\"color:"+color+"\">"+l+"</span>";
	}
	else{
		retVal = "<span class=\"rainbow-text\">"+l+"</span>";
	}
	return retVal;
}
function colorXP(xp){
	xp = Number(xp);
	total = Number(playerStats.exp);
	var color = getColor(total/xp);
	var retVal = "<span style=\"color:"+color+"\">"+formatNumber(xp-total)+"</span>";
	return retVal;
}
function colorHp(hp, b){
	hp = Number(hp);
	var max;
	if(b){
		max = Number(playerStats.HpMax);
	}
	else{
		max = Number(playerStats.monHpMax);
	}
	var color = getColor(hp/max);
	hp = formatNumber(hp);
	var retVal;
	if(color != "rainbow"){
		retVal = "<span style=\"color:"+color+"\">"+hp+"</span>";
	}
	else{
		retVal = "<span class=\"rainbow-text\">"+hp+"</span>";
	}
	
	return retVal;
}
function getColor(x){
	retVal = "#000000";
	switch(true){
		case(x > 1): retVal = "rainbow"; break;
		case(x == 1): retVal = "#30E0DD"; break;
		case(x > .84 && x < 1): retVal = "#30AFE0"; break;
		case(x > .59 && x <= .84): retVal = "#6A44DD"; break;
		case(x > .45 && x <= .59): retVal = "#B4459D"; break;
		case(x > .24 && x <= .45): retVal = "#D01E44"; break;
		case(x <= .24): retVal = "#FF0000"; break;
	}
	return retVal;
}
function newSlotCost(){
	var retVal = 10000000;
	retVal *= Math.pow(playerStats.slotsOwned,2);
	return retVal;
}
function buyJewelSlot(){
	var cost = newSlotCost();
	if(playerStats.gems >= cost){
		playerStats.gems -= cost;
		playerStats.slotsOwned++;
		buildEQSlots();
	}
}
function buildEQSlots(){
	for(var x = 0; x< 9; x++){
		var c = getHighestRarityOfLine(x+23);
		if(typeof c !== 'undefined'){
			var rarity = playerStats.slotsOwned;
			var htmlString = "";
			for(var y=0; y < rarity; y++){
				htmlString+= "<div class='jewelSlot' ";
				var holder = playerStats[getSlotName(x)].slice();
				if(holder.length > 0 && y < holder.length){
					if(typeof holder[y] !== 'undefined' && holder[y] != null){
						var h = holder[y].split(";");
						htmlString+= "style=\'background-image:URL(\"art/eq/"+h[1]+"0.png\")\'";
					}
				}
				htmlString+= "onclick=selectJewel(\""+x+";"+y+"\")>";
				htmlString+= "<div id=\"selectJewel"+x+"TT"+y+"\" class=\"tooltip\">"+jewelTT(x,y)+"</div></div>";
			}
			$('#jewelSlot'+x+'List').html(htmlString);
		}
	}
}
function jewelTT(x,y){
	var slotName = getSlotName(x);
	var jewel = playerStats[slotName][y];
	var retVal = "Empty Socket";
	if(typeof jewel !== 'undefined' && jewel != null){
		jewel = jewel.split(";");
		var prevVal = formatNumber(Number(jewel[0]));
		jewel = jewel[1];
		jewel2 = jewel.charAt(0).toUpperCase() + jewel.slice(1);
		retVal = "Socketed Jewel: "+jewel2+".<br>+"+prevVal+" "+getAttributeFromJewel(jewel)+"!";
	}
	return retVal;
}
function getSlotName(x){
	retVal = "";
	switch(Number(x)){
		case(0): retVal = "sword"; break;
		case(1): retVal = "helmet"; break;
		case(2): retVal = "chest"; break;
		case(3): retVal = "pants"; break;
		case(4): retVal = "shoulder"; break;
		case(5): retVal = "belt"; break;
		case(6): retVal = "boots"; break;
		case(7): retVal = "gloves"; break;
		case(8): retVal = "trinket"; break;
	}
	return retVal;
}
function selectJewel(js){
	jholder = js;
	$('#jewelSlotPickerHolder').show();
	$('#jewelSlotHolder').hide();
}
function cancelJewel(){
	$('#jewelSlotPickerHolder').hide();
	$('#jewelSlotHolder').show();
	buildEQSlots();
}
function buyJewel(js){
	var a = js.split(";");
	var b = a[0];
	var c = a[1];
	var d = jholder.split(";");
	var e = d[0];
	var f = d[1];
	
	var gemAmount = getJewelCost(b,c);
	var jewelType = getJewelType(b);
	
	if(gemAmount > 0){
		playerStats[getSlotName(e)][f] = gemAmount+";"+jewelType;
		
		var multi = 1;
		if(c == 0)
			multi = .1;
		if(c == 1)
			multi = .5;
		multi = 1-multi;
		playerStats[jewelType+"Fragment"] = Math.floor(playerStats[jewelType+"Fragment"] * multi);	
	}
	$('#jewelSlotPickerHolder').hide();
	$('#jewelSlotHolder').show();
	buildEQSlots();
	updateGameDisplay();

}
function buildJewelTT(js){
	var a = js.split(";");
	var jewelType = a[0];
	var fragPercent = a[1];
	var cost = formatNumber(getJewelCost(jewelType, fragPercent));
	var jewelFull = getJewelType(jewelType);
	jewelFull = jewelFull.charAt(0).toUpperCase() + jewelFull.slice(1);
	var d = jholder.split(";");
	var e = d[0];
	var f = d[1];
	var tt = "";
	var prevSlot = playerStats[getSlotName(e)][f];
	if(typeof prevSlot !== 'undefined'){
		var slotHold = prevSlot.split(";");
		var prevVal = slotHold[0];
		var prevJewel = slotHold[1];
		var prevJewel2 = prevJewel.charAt(0).toUpperCase() + prevJewel.slice(1);
		prevVal = formatNumber(Number(prevVal));
		tt += "This socket currently has a "+prevJewel2+" that is giving you "+prevVal+" "+getAttributeFromJewel(prevJewel)+". If you socket a new jewel you will lose this one!<br>";
	}
	if(cost > 0){
		tt += "Sacrificing your fragments will socket a "+jewelFull+" into this slot that will give you "+cost+" "+getAttributeFromJewel(getJewelType(jewelType))+"!";
	}
	else{
		tt += "Sacrificing your fragments will not produce a Jewel of value.";
	}
	$('#jewel'+jewelType+'TT'+fragPercent).html(tt);
}
function getAttributeFromJewel(tt){
		retVal = "Strength";
		switch(tt){
			case("emerald"): retVal = "Dexterity"; break;
			case("topaz"): retVal = "Stamina"; break;
			case("amethyst"): retVal = "Endurance"; break;
			case("onyx"): retVal = "Luck"; break;
		}
		return retVal;
}
function getAttributeFromJewelShort(tt){
		retVal = "str";
		switch(tt){
			case("emerald"): retVal = "dex"; break;
			case("topaz"): retVal = "stam"; break;
			case("amethyst"): retVal = "end"; break;
			case("onyx"): retVal = "luck"; break;
		}
		return retVal;
}
function getJewelCost(j,f){
	var retVal = 0;
	var a = getJewelType(j);
	var frags = playerStats[a+"Fragment"];
	if(f == 0)
		frags = Math.floor(frags*.1);
	if(f == 1)
		frags = Math.floor(frags*.5);
	
	var divvy = 1;
	if(playerStats.gemUpgrades[7] == 1)
		divvy = 2;
	
	if(a == "onyx"){
		var count = 1;
		var fragHold = playerStats.fragVal*2.5;
		while(frags > 0){
			fragHold *= (count/divvy);
			frags -= fragHold;
			if(frags >= 0){
				count++;
			}
		}
		retVal = count;
	}
	else{
		var count = 1;
		var fragHold = playerStats.fragVal;
		while(frags > 0){
			fragHold *= (count/divvy);
			frags -= fragHold;
			if(frags >= 0){
				count++;
			}
		}
		retVal = count;
	}
	return Math.floor(retVal-1);
}
function getJewelType(x){
	var retVal = "";
	switch(Number(x)){
		case(0): retVal = "ruby"; break;
		case(1): retVal = "emerald"; break;
		case(2): retVal = "topaz"; break;
		case(3): retVal = "amethyst"; break;
		case(4): retVal = "onyx"; break;
	}
	return retVal;
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
			fragAmt = Math.floor(fragAmt * (doRangeLuck(0 + (100*playerStats.gemUpgrades[6]),(scaledLuck(playerStats.luck) + (2*playerStats.gemUpgrades[6]))*100 ,true)/100));
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
		case("HpMax"):retVal ="Health Points. If this hits 0 you die and the game is over (if you're on hardcore mode), otherwise you just have to wait for it to recover before you can continue exploring.";break;
		case("HpRegen"):retVal = "How much HP you recover a turn. It helps you keep exploring faster"; break;
		case("Dmg"):retVal = "How much damage you do on each attack. The higher this is the more <span style='color:red'>dangerous</span> you are."; break;
		case("Spd"):retVal = "How fast you can attack. This number is how many attacks a turn you do."; break;
		case("Crit"):retVal = "You know when you hit someone's weak spot and you do extra damage? That's a Critical Hit. This is how often you'll land one of those hits.";break;
		case("CDmg"):retVal = "What good is a Critical Hit if the damage is the same? This makes those Critical Hits juice!";break;
		case("Armor"):retVal = "Armor reduces the damage you take by a flat amount. It's less effective against consecutive hits. This is applied after Resist.";break;
		case("Resist"):retVal = "Resist redcues the damage you take by a percentage. This is applied before Armor.";break;
	}
	return retVal;
}
function updateStats(){
	
	setGStats();
	
	playerStats.luck = 1;
	playerStats.luck += playerStats.gluck + playerStats.pluck;
	playerStats.luck += playerStats.goldUpgrades[14];
	playerStats.luck += playerStats.catUpgrades[6];
	
	playerStats.Str = playerStats.gstr + playerStats.pstr + (2* playerStats.gemUpgrades[0]) + (2* playerStats.gemUpgrades[4]) + (10* playerStats.gemUpgrades[11]);
	
	playerStats.End = playerStats.gend + playerStats.pend + (2* playerStats.gemUpgrades[2]) + (2* playerStats.gemUpgrades[4]) + (10* playerStats.gemUpgrades[11]);
	
	playerStats.Stam = playerStats.gstam + playerStats.pstam + (2* playerStats.gemUpgrades[1]) + (2* playerStats.gemUpgrades[4]) + (10* playerStats.gemUpgrades[11]);
	
	playerStats.Dex = playerStats.gdex + playerStats.pdex + (2* playerStats.gemUpgrades[3]) + (2* playerStats.gemUpgrades[4]) + (10* playerStats.gemUpgrades[11]);
	
	var hasSensei = playerStats.catUpgrades[20];
	
	
	playerStats.Dmg = genericScale(Math.floor(1.5+genericScale((playerStats.Str *(1+(hasSensei*.3)))/2,50)+genericScale(playerStats.level/10,25)),300);
	playerStats.HpMax = Math.floor(10 + ((playerStats.Stam*(1+(hasSensei*.3)))*4) + (Number(playerStats.level)*3));
	playerStats.HpRegen = Math.round(.2+(playerStats.Stam*(1+(hasSensei*.3)))/10 * 100 + (Number(playerStats.level/3)))/100;
	playerStats.Spd = genericScale(1+(genericScale((playerStats.Dex*(1+(hasSensei*.3)))/20,50))+(genericScale(playerStats.level/25,25)),50);
	playerStats.Crit = critScale();
	playerStats.CDmg = genericScale(Math.floor(150+(genericScale((playerStats.Str*(1+(hasSensei*.3)))/3,50))+(genericScale(playerStats.level/5,25))),400);
	playerStats.Armor = genericScale(Math.round(.25+(playerStats.End*(1+(hasSensei*.3)))/1.35 + playerStats.level/4.5),700);
	playerStats.Resist = scaleResist(5+((playerStats.End*(1+(hasSensei*.3)))/2)+playerStats.level/3.5,false);
	
	
	playerStats.gdex = playerStats.gstam = playerStats.gend = playerStats.gstr = playerStats.gluck = 
	playerStats.gHpMax = playerStats.gRegen = playerStats.gDmg = playerStats.gAs = 
	playerStats.gCc = playerStats.Gcd = playerStats.gArmor = playerStats.gResist = 0;
}
function critScale(){
	var hasSensei = playerStats.catUpgrades[20];
	var retVal = genericScale(5*(1+((genericScale((playerStats.Dex*(1+(hasSensei*.3))),150)/25)+(genericScale(playerStats.level,50)/250))),75);
	retVal = retVal>100?100:retVal;
	return retVal;
}
function genericScaleNoFloor(val, amt){
	var retVal;
	if(Math.floor(val/amt)>0){
		retVal = amt+genericScaleNoFloor(((val-amt)/2),amt);
	}
	else{
		retVal = val;
	}
	return (retVal);
}
function genericScale(val, amt){
	var retVal;
	if(Math.floor(val/amt)>0){
		retVal = amt+genericScale(((val-amt)/2),amt);
	}
	else{
		retVal = val;
	}
	return Math.floor(retVal);
}
function scaleSpeed(s, mob){
	var retVal;
	if(mob){
		retVal = s*(1/(1+(Math.pow(Math.E,(-1*s/500)))));
	}
	if(s <= 4 && s > 1)
		retVal++;
	return Math.round(retVal);
}
function scaleResist(r, mob){
	var retVal;
	if(mob){
		retVal = 400/(400+r);
	}
	else{
		var sVal = 50;
		if(playerStats.level > 100)
			sVal = 100;
		if(playerStats.level > 1000)
			sVal = 200;
		if(playerStats.level > 10000)
			sVal = 400;
		retVal = Math.round((1 - sVal/(sVal + r))*10000)/100;
	}
	return retVal;
}
function autoPotion(){
	$('#autoPotion').text("Off");
	if(playerStats.autoPotion)
		playerStats.autoPotion = false;
	else
		playerStats.autoPotion = true;
	if(playerStats.autoPotion)
		$('#autoPotion').text("On");
}
function setGStats(){
	for(var x=0; x<9;x++){
		var slot = getSlotName(x);
		var slotJewels = playerStats[slot].slice();
		for(var y=0; y < slotJewels.length; y++){
			if((typeof slotJewels[y] !== 'undefined') && (slotJewels[y] != null)){
				var jStats = slotJewels[y].split(";");
				var value = Number(jStats[0]);
				var j = jStats[1];
				var attri = getAttributeFromJewelShort(j);
				playerStats["g"+attri] += value;
			}
		}
	}
}