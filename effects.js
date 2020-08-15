function applyEffect(effect, amt, ugl, eid){
	var effList = effect.split("-");
	effList.forEach(effectFunction);
	function effectFunction(index){
		var effList2 = index.split(";");0
		switch(effList2[0]){
			case("gold"): 
				effList2[1] *= amt; 
				effList2[1] = effList2[1] * (playerStats.goldUpgrades[1]+1);
				effList2[1] = effList2[1] + (effList2[1] * playerStats.goldUpgrades[19]*.5);
				applyGoldBucket(Number(effList2[1]), ugl); break;
				
			case("cgold"): 
				var goldVal = 0;
				if(amt < 50){
					var perc = Number(effList2[2]) + (playerStats.goldUpgrades[2]*10);

					var goldAmt = Number(effList2[1]);
					for(var x = 0; x < amt; x++){
						if(doLuck(perc)){
							goldVal += goldAmt;
						}
						else{
							if(playerStats.goldUpgrades[20] == 1){
								if(doLuck(perc)){
									goldVal += goldAmt;
								}
							}
						}
					}
				}
				else{
					var scalVal = Number(effList2[1] * amt/50);
					var perc = Number(effList2[2]) + (playerStats.goldUpgrades[2]*10);
					for(var x = 0; x < 50; x++){
						if(doLuck(perc)){
							goldVal += scalVal;
						}
						else{
							if(playerStats.goldUpgrades[20] == 1){
								if(doLuck(perc)){
									goldVal += scalVal;
								}
							}
						}
					}
				}
				goldVal = Math.floor(goldVal);
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
							case(1):lowerVal = valCont; upperVal = lowerVal * 1.5; break;
							case(2):lowerVal = valCont+2; upperVal = lowerVal * 2; break;
							case(3):lowerVal = valCont*2.5; upperVal = lowerVal * 2; break;
							case(4):upperVal = doRangeLuck(0, valCont*8.5, true); break;
							case(5):lowerVal = valCont*3.5; upperVal = lowerVal*2; break;
							case(6):lowerVal = 25; upperVal = lowerVal + (5*valCont);break;
							case(7):upperVal = valCont * 18; break;
							case(8):upperVal = valCont * 25; break;
							case(9):lowerVal = valCont * 5; upperVal = lowerVal * 5; break;
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
							case(1):lowerVal = valCont+1; upperVal = lowerVal * 1.5; break;
							case(2):lowerVal = valCont+3; upperVal = lowerVal * 2; break;
							case(3):lowerVal = valCont*2.5; upperVal = lowerVal * 2; break;
							case(4):upperVal = doRangeLuck(0, valCont*8.5, true); break;
							case(5):lowerVal = valCont*3.5; upperVal = lowerVal*2; break;
							case(6):lowerVal = 25; upperVal = lowerVal + (5*valCont);break;
							case(7):upperVal = valCont * 18; break;
							case(8):upperVal = valCont * 25; break;
							case(9):lowerVal = valCont * 5; upperVal = lowerVal * 5; break;
						}
						goldVal += (doRangeLuck(lowerVal, upperVal, true) * amt/50);
					}
				}
				if(playerStats.goldUpgrades[21] == 1){
					goldVal *= 1.3;
				}
				goldVal = Math.floor(goldVal);
				applyGoldBucket(goldVal, ugl); break;
			case("rgold"):
				var goldVal = 0;
				if(amt < 50){
					var highVal = Number(effList2[2]) + (playerStats.goldUpgrades[22] * .35 * Number(effList2[2]));
					var lowVal = Math.floor(Number(effList2[1]) + (playerStats.goldUpgrades[4]*(highVal/3)));

					for(var x = 0; x < amt; x++){
						goldVal += doRangeLuck(lowVal, highVal, true);
					}
				}
				else{
					var highVal = Number(effList2[2]) + (playerStats.goldUpgrades[22] * .35 * Number(effList2[2]));
					var lowVal = Math.floor(Number(effList2[1]) + (playerStats.goldUpgrades[4]*(highVal/3)));
					for(var x = 0; x < 50; x++){
						goldVal += (doRangeLuck(lowVal, highVal, true) * amt/50);
					}
				}
				applyGoldBucket(goldVal, ugl); break;
				break;
			case("dgold"):
				var goldVal = 0;
				if(amt < 50){
					var perc = Number(effList2[2]);
					var reduc = Number(effList2[3]);
					reduc = reduc - (reduc * playerStats.goldUpgrades[24] * .25);
					var baseVal = Number(effList2[1]);
					for(var x = 0; x < amt; x++){
						var keepGoing = true;
						var procs = 0 + playerStats.goldUpgrades[7];
						while(keepGoing){
							if(doLuck(perc)){
								procs++;
								perc = perc * (1-reduc);
								if(procs >= (1+(getHighestRarityValOfLine(ugl)*2)))
									keepGoing = false;
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
					reduc = reduc - (reduc * playerStats.goldUpgrades[24] * .25);
					var baseVal = Number(effList2[1] * amt/50);
					for(var x = 0; x < 50; x++){
						var keepGoing = true;
						var procs = 0 + playerStats.goldUpgrades[7];
						while(keepGoing){
							if(doLuck(perc)){
								procs++;
								perc = perc * (1-reduc);
								if(procs >= (1+(getHighestRarityValOfLine(ugl)*2)))
									keepGoing = false;
							}
							else{
								keepGoing = false;
							}
						}
						goldVal += (baseVal * Math.pow(2,procs));
					}
				}
				
				applyGoldBucket(goldVal, ugl); 
				break;
			case("tgold"):
				var baseIncrease = 1 + Math.floor(Number(effList2[1])+(playerStats.goldUpgrades[9]*1.5) * Math.log10((1.3+(playerStats.goldUpgrades[9]*2)) * playerStats.cardsOwned)*100)/10000;
				var totalIncrease = Math.floor(baseIncrease * (1+(((1-Math.pow(effList2[2],amt))/(1-effList2[2])))/10)*100)/100;
				if(playerStats.goldUpgrades[26] == 1){
					totalIncrease *= (1+playerStats.packsBought/2000);
				}
				if(totalIncrease > higherTax){
					higherTax = totalIncrease;
				}
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
								numHolder.push(doRangeLuck(1+(playerStats.goldUpgrades[25]), upper, true));
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
								numHolder.push(doRangeLuck(1+(playerStats.goldUpgrades[25]), upper, true));
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
				applyGoldBucket(goldVal, ugl);
			break;
			case("kgold"):
				var goldVal = 0;
				if(amt < 50){
					for(var y = 0; y < amt; y++){
						var totGold = 0;
						var times = Math.round(getLuckReroll()/2);
						var upper = effList2[1];
						var pluck = genericScale(scaledLuck(playerStats.luck + playerStats.goldUpgrades[6]),3);

						for(var x = 0; x < times; x++){
							totGold += (doRangeLuck(0, upper, true)/(x+1));
							totGold *= (1+((pluck-x)/10)/(x+1));
						}
						goldVal += totGold;
					}
				}	
				else{
					for(var y = 0; y < 50; y++){
						var totGold = 0;
						var times = Math.round(getLuckReroll()/2);
						var upper = effList2[1];
						var pluck = genericScale(scaledLuck(playerStats.luck + playerStats.goldUpgrades[6]),3);
						for(var x = 0; x < times; x++){
							totGold += (doRangeLuck(0, upper, true)/(x+1));
							totGold *= (1+((pluck-x)/10)/(x+1));
						}
						goldVal += (totGold * amt/50);
					}
				}
				goldVal = goldVal + (goldVal * .2 * playerStats.goldUpgrades[23]);
				goldVal = Math.floor(goldVal);
					
				applyGoldBucket(goldVal, ugl);
			break;
			case("ygold"):
				var totalIncrease = Math.pow((1+Number(effList2[1])+(playerStats.goldUpgrades[27]*.01)),((amt/4)/(Math.pow(amt,.2))));
				if(totalIncrease > higherMort){
					higherMort = totalIncrease;
				}
			break;
			case("cat"):
				effList2[1] *= amt; 
				if(playerStats.catUpgrades[1] == 1){
					var multi = getCardAmtOfLine(9);
					effList2[1] *= (1+(multi/150));
					effList2[1] = Math.floor(effList2[1]);
				}
				applyCatBucket(Number(effList2[1]), ugl);
			break;
			case("ncat"):
				var catVal = 0;
				if(amt < 50){
					var perc = Number(effList2[1]);
					var catAmt = Number(effList2[2]);
					for(var x = 0; x < amt; x++){
						if(doLuck(perc)){
							catVal += doRangeLuck(1,catAmt,true);
						}
					}
				}
				else{
					var catAmt = Number(effList2[2] * (amt/50));
					var perc = Number(effList2[1]);
					for(var x = 0; x < 50; x++){
						if(doLuck(perc)){
							catVal += doRangeLuck(1,catAmt,true);
						}
					}
				}
				catVal = Math.floor(catVal);
				applyCatBucket(catVal, ugl);
				break;
			break;
			case("bcat"):
				var catVal = 0;
				var perc = Math.round(15+Math.log(amt)*8);
				var catAmt = 1+Math.round(Number(effList2[1]) * Math.log(amt)*.33);
				if(amt < 50){
					for(var x = 0; x < amt; x++){
						if(doLuck(perc)){
							catVal += catAmt;
						}
					}
				}
				else{
					for(var x = 0; x < 50; x++){
						if(doLuck(perc)){
							catVal += catAmt * (amt/50);
						}
					}
				}
				catVal = Math.floor(catVal);
				applyCatBucket(catVal, ugl);
				
			break;
			case("hcat"):
				var baseVal = Number(playerStats.lastCatEarned);
				var catAmt = amt;
				var reducs = Math.floor(catAmt/100);
				if(reducs > 1){
					catAmt = ((1-Math.pow(reducs,.45))/(1-reducs))*catAmt;
				}
				catAmt += 1;
				var catVal = Math.floor(((15+Number(effList2[1])+(Math.log10(catAmt)*4))/100) * baseVal);
				applyCatBucket(catVal, ugl);
			break;
			case("ecat"):
				var loops = amt;
				var catVal = (Number(effList2[1]) * (1+(1-playerStats.lastEagle)));
				var catEarned = 0;
				if(amt > 50){
					loops = 50;
					catVal *= amt/50;
				}
				catVal = Math.round(catVal);
				for(var x = 0; x < loops; x++){
					catEarned += doRangeLuck(0, catVal, true);
				}
				catEarned = Math.floor(catEarned);
				applyCatBucket(catEarned, ugl);
			break;
			case("tcat"):
				var catVal = (((Number(effList2[1])* amt/100)));
				catVal = Math.round(catVal*1000)/1000;
				playerStats.catEagleReduc += catVal;
				applyCatBucket(catVal, ugl);
			break;
			case("gem1"):
				var chance = .1+((amt+1)*.1 * (Math.log10(amt+1)/10));
				chance = Math.round(chance*1000)/1000;
				playerStats.gemChance = chance;
				applyGemBucket(chance*100, ugl);
			break;
			case("gem2"):
				var loops = Math.floor(amt/50);
				var leftOver = amt - (loops*50);
				var reduc = 0;
				if(loops > 0){
					reduc = ((1-Math.pow(.4899,loops+1))/(1-.4899)) - 1;
				}
				reduc += (leftOver/100) * (Math.pow(.4899,loops));
				var h = Math.floor(playerStats.gemCatsNeeded * (1-reduc));
				if(h == 0)
					h = 1;
				playerStats.gemCatsNeeded = h;
				applyGemBucket(reduc*100, ugl);
			break;
			case("gem3"):
				var totalIncrease = 1+ .06 * amt;
				playerStats.gemCatGain = totalIncrease;
				applyGemBucket(Math.round((totalIncrease-1)*100), ugl);
			break;
			case("gem4"):
				var totalIncrease = 1 + .033 * amt;
				playerStats.gemCatMulti = totalIncrease;
				applyGemBucket(Math.round((totalIncrease-1)*100), ugl);
			break;
			case("gem5"):
				var totalIncrease = 1 + .023 * amt;
				playerStats.gemGoldGain = totalIncrease;
				applyGemBucket(Math.round((totalIncrease-1)*100), ugl);
			break;
			case("gem6"):
				var totalIncrease = 1 + .013 * amt;
				playerStats.gemEagleVal = totalIncrease;
				applyGemBucket(Math.round((totalIncrease-1)*100), ugl);
				break;
			case("gem7"):
				var decVal = 1 - ((2/(1+Math.pow(Math.E,(amt/150 * -1))))-1);
				playerStats.gemCardCost = decVal;
				var disVal = Math.round((1-decVal)*1000)/1000;
				applyGemBucket(disVal*100, ugl);
			break;
			case("str"):
				if(eid == getHighestRarityOfLine(ugl).id)
					playerStats.gstr += Number(effList2[1]);
			break;
			case("stam"):
				if(eid == getHighestRarityOfLine(ugl).id)
					playerStats.gstam += Number(effList2[1]);
			break;
			case("end"):
				if(eid == getHighestRarityOfLine(ugl).id)
					playerStats.gend += Number(effList2[1]);
			break;
			case("dex"):
				if(eid == getHighestRarityOfLine(ugl).id)
					playerStats.gdex += Number(effList2[1]);
			break;
			case("luck"):
				if(eid == getHighestRarityOfLine(ugl).id)
					playerStats.gluck += Number(effList2[1]);
			break;
			
		}
	}
}