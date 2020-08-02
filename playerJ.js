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
			$('#p'+x+'Val').text(formatNumber(Number(playerStats[x])));
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
	}
}
function showQuestBuildings(){
	if($('#questProducers').is(":visible")){
		$('#questPlayerCurrHp').html(colorHp(playerStats.Hp));
		$('#questPlayerHp').html(formatNumber(Number(playerStats.HpMax)));
		$('#questPlayerLevel').html(colorLevel(playerStats.level));
		$('#questPlayerTNL').html(colorXP(playerStats.tnl));
		$('#questName').html("<br>"+playerStats.qName);
		$('#questLevel').html(playerStats.qlevel);
		$('#questPLevel').html(qPowerLevel(playerStats.qlevel));
		$('#questPLevel2').html(pPowerLevel());
		$('#questRoomsLeft').html(playerStats.qroomMax - playerStats.qroom);
		$('#questRooms').html(playerStats.qroom);
		$('#questKeys').html(playerStats.keys);
		$('#questKeysBig').html(playerStats.bigKey);
		$('#questMaps').html(playerStats.maps);
		$('#questBombs').html(playerStats.bombs);
		/*
		<div class="questInfoLine">Quest: <span id="questName"></span></div>
				<div class="questInfoLine">Quest Level: <span id="questLevel"></span></div>
				<div class="questInfoLine">Quest Power Level: <span id="questPLevel"></span></div>
				<div class="questInfoLine">Your Power Level: <span id="questPLevel2"></span></div>
				<div class="questInfoLine">Rooms Remaining: <span id="questRoomsLeft"></span></div>
				<div class="questInfoLine">Rooms Completed: <span id="questRooms"></span></div>
				<div class="questInfoLine">Keys: <span id="questKeys"></span></div>
				<div class="questInfoLine">Big Keys: <span id="questKeysBig"></span></div>
				<div class="questInfoLine">Maps: <span id="questMaps"></span></div>
				<div class="questInfoLine">Bombs: <span id="questBombs"></span></div>
			*/
	}
}
function gainXP(x){
	playerStats.exp += x;
	var ss = "<span style='color:Fuchsia'>You gain "+x+" Experience Points!</span>";
	if(playerStats.exp >= playerStats.tnl){
		ss += "<br> "+levelUp();
	}
	return ss;
}
function levelUp(){
	playerStats.level++;
	playerStats.qlevel++;
	playerStats.tnl = playerStats.level *100;
	playerStats.exp = 0;
	if(playerStats.level%5 == 0){
		gainRandomStat();
	} 
	return "<br>You leveled up!";
}
function gainRandomStat(){
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
	playerStats["p"+stat] ++;
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
	var color = getColor(1-total/xp);
	var retVal = "<span style=\"color:"+color+"\">"+formatNumber(xp-total)+"</span>";
	return retVal;
}
function colorHp(hp){
	hp = Number(hp);
	max = Number(playerStats.HpMax);
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
		case(x > .24 && x <= .45): retVal = "$D01E44"; break;
		case(x <= .24): retVal = "#FF0000"; break;
	}
	return retVal;
}
function buildEQSlots(){

	for(var x = 0; x< 9; x++){
		var c = getHighestRarityOfLine(x+23);
		if(typeof c !== 'undefined'){
			var rarity = (c.rarity-2);
			if(rarity == 7)
				rarity++;
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
	
	if(a == "onyx"){
		var count = 1;
		var fragHold = playerStats.fragVal*2.5;
		while(frags > 0){
			fragHold *= count;
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
			fragHold *= count;
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
					fragAmt += ((Number(amtSplit[0])-1) * (50+(25*Number(amtSplit[1]))) * getFact(Number(amtSplit[1])));
					cardHolderAmt[Number(amtSplit[2])] = 1;
				}
				else{
					fragAmt += ((Number(amtSplit[0])) * (50+(25*Number(amtSplit[1]))) * getFact(Number(amtSplit[1])));
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
		case("HpMax"):retVal ="Health Points. If this hits 0 you die and the game is over (if you're on hardcore mode), otherwise you just have to wait for it to recover before you can continue exploring.";break;
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
function updateStats(){
	
	setGStats();
	
	playerStats.luck += playerStats.goldUpgrades[14];
	playerStats.luck += playerStats.catUpgrades[6];
	
	playerStats.luck += playerStats.gluck + playerStats.pluck;
	
	playerStats.Str += playerStats.gstr + playerStats.pstr;
	
	playerStats.End += playerStats.gend + playerStats.pend;
	
	playerStats.Stam += playerStats.gstam + playerStats.pstam;
	
	playerStats.Dex += playerStats.gdex + playerStats.pdex;
	
	
	playerStats.Dmg = Math.floor(playerStats.Str/2);
	playerStats.HpMax = Math.floor(10 + (playerStats.Stam) + (Number(playerStats.level)*3));
	playerStats.HpRegen = Math.floor(playerStats.Stam/2);
	playerStats.Spd = 1+(playerStats.Dex/20);
	playerStats.Crit = 5+(playerStats.Dex/15);
	playerStats.CDmg = 150+(playerStats.Str/5);
	playerStats.Armor = Math.floor(playerStats.End * 1.5);
	playerStats.Resist = 1+(playerStats.End/3);
	
	
	playerStats.gdex = playerStats.gstam = playerStats.gend = playerStats.gstr = playerStats.gluck = 
	playerStats.gHpMax = playerStats.gRegen = playerStats.gDmg = playerStats.gAs = 
	playerStats.gCc = playerStats.Gcd = playerStats.gArmor = playerStats.gResist = 0;
}
function scaleArmor(a, mob){
	var retVal;
	if(mob){
		var reducs = Math.floor(a/500);
		if(reducs > 0){
			retVal = 500;
			a -= 500;
			for(var x=0; x<reducs; x++){
				a /= 2;
				reducs = Math.floor(a/500);
				if(reducs > 0){
					a -= 500;
					retVal += 500;
					x = -1;
				}
			}
			retVal += a;
		}
		else{
			retVal = a;
		}
	}
	else{
		retVal = a;
	}
	return Math.floor(retVal); 
}
function scaleResist(r, mob){
	var retVal;
	if(mob){
		retVal = 400/(400+r);
	}
	else{
		var sVal = 50;
		if(playerStats.level > 10)
			sVal = 100;
		if(playerStats.level > 25)
			sVal = 200;
		if(playerStats.level > 35)
			sVal = 400;
		retVal = Math.round((1 - sVal/(sVal + r))*10000)/100;
	}
	return retVal;
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