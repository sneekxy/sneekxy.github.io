var roomEvents = {
	combat:function(){
		return enterCombat(0);
	},
	treasure:function(){
		var ss = "Walking into the room, you discover a treasure chest! You open it up.";
		var tt = "";
		var treward = Math.floor(Math.random()*(7-2)+2);
		if(playerStats.bigKey > 0){
			questLoseBKey();
			tt += "<br><span style='color:green'>The Big Key you were dragging around started to vibrate and disappeared! But it looks like the treasure chest has better rewards now!</span>";
			treward += (Math.floor(Math.random()*(4-1)+1));
		}
		switch(Math.floor(Math.random()*4)){
			case(0): var tVal = goldReward(treward);
			tt += "<br>What luck! Inside the chest is <span style='color:gold'>"+formatNumber(tVal)+" Gold!</span> Don't spend it all in one place.";
			questRGold(tVal);
			break;
			case(1): var tVal = catReward(treward);
			tt += "<br>Thank goodness you arrived when you did! The chest was filled with <span style='color:SandyBrown'>"+formatNumber(tVal)+" Cats.</span> You saved their life!";
			questRCat(tVal);
			break;
			case(2): var tVal = gemReward(treward);
			tt += "<br>BLING BLING BLING! YOU'RE THE GEM KING. THE CHEST CONTAINED <span style='color:cyan'>"+formatNumber(tVal)+" GEMS.</span> BLING BLING!";
			questRGem(tVal);
			break;
			case(3): var tVal = fragReward(treward);
			tt += "<br>Oh Sweet! You open the chest and are showered with <span style='color:'color:#DC7AA3'>"+formatNumber(tVal)+" Jewel Fragments!</span>";
			questRFrag(tVal);
			break;
		}
		quest2Text(tt);
		return ss;
	},
	locked:function(){
		var ss = "You stumble upon a locked door."
		var tt = "";
		if(playerStats.keys > 0){
			questLoseKey();
			tt += "<br> You rummage through your bags and pull out a key. <span style='color:green'>*click*</span> The door opens!"
			var rng = Math.floor(Math.random()*7);
			var keyBonus = 0;
			if(playerStats.bigKey > 0){
				questLoseBKey();
				tt += "<br><span style='color:green'>The Big Key you were dragging around started to vibrate and disappeared! But it looks like the room has been magically enhanced!</span>";
				keyBonus += (Math.floor(Math.random()*3));
				rng = 6;
			}
			switch(Math.floor(rng/2)){
				case(0): var tVal = goldReward(Math.floor(Math.random()*(8-4)+4));
				tt += "<br> Behind the door you find a treasure chest that contains <span style='color:gold'>"+formatNumber(tVal)+" Gold!</span";
				questRGold(tVal);
				break;
				case(1): var tVal = catReward(Math.floor(Math.random()*(8-4)+4));
				tt += "<br> Behind the door you find a sack of cats! There are <span style='color:sandybrown'>"+formatNumber(tVal)+" Cats</span> inside. Lucky you.";
				questRCat(tVal);
				break;
				case(2): var tVal = gemReward(Math.floor(Math.random()*(8-4)+4));
				tt += "<br> You open the door and find gems everywhere! You spend a few weeks picking them up and walk out with <span style='color:cyan'>"+formatNumber(tVal)+" Gems!</span>";
				questRGem(tVal);
				break;
				case(3): var tVal1 = goldReward(Math.floor(Math.random()*(9-5)+5)+keyBonus);
				var tVal2 = catReward(Math.floor(Math.random()*(9-5)+5)+keyBonus);
				var tVal3 = gemReward(Math.floor(Math.random()*(9-5)+5)+keyBonus);
				tt += "<br> Inside the room you find a Genie. She says you get one wish and you know exactly what to use it on. You gain <span style='color:gold'>"+formatNumber(tVal1)+" Gold</span>, <span style='color:sandybrown'>"+formatNumber(tVal2)+" Cats</span>, and <span style='color:cyan'>"+formatNumber(tVal3)+" Gems!</span>";
				questRGold(tVal1);
				questRCat(tVal2);
				questRGem(tVal3);
				break;
			}
		}
		else{
			tt +="<br> It doesn't look like you have the key needed for this door. Try again later.";
		}
		quest2Text(tt);
		return ss;
	},
	key:function(){
		var ss = "";
		var tt = "";
		switch(Math.floor(Math.random()*5)){
			case(0):ss = "You enter the room and find a key! What could it be used for?"; break;
			case(1):ss = "You find a key in the room. Picking it up you think to yourself \"Where there is a key, there must be a door\".";break;
			case(2):ss = "The room is empty! You turn around to leave and trip over something. Turns out there was a key on the floor, it's yours now.";break;
			case(3):ss = "Entering the room you see a key hanging up on the wall. You take it, it could be useful later.";break;
			case(4):ss = "You walk into the magical room and magically a key appears inside your bags. Cool!";break;
		}
		var amt = 1;
		if(playerStats.catUpgrades[18] == 1){
			if(doLuck(10))
				amt = 2;
		}
		if(amt == 1)
			tt = "<br><span style='color:green'>You got a key!</span>";
		else
			tt = "<br><span style='color:green'>You got <span class=\"rainbow-text\">two</span> keys! Nice!</span>";
		quest2Text(tt);
		questGetKey(amt);
		return ss;
	},
	strcheck:function(){
		var ss = "";
		var tt = "";
		var target = Math.floor(2 + playerStats.qlevel* Math.pow(playerStats.qlevel, .1) * (Math.random()*(1.2-.2)+.2));
		var rolled = doRangeLuck(1,getRandomRange((playerStats.Str+playerStats.level),1.25),true);
		target = doRangeLuck(2,target,false);
		switch(Math.floor(Math.random()*4)){
			case(0): ss = "There is a giant wall in this room. It looks like there's something behind it. Maybe you're strong enough to break down the wall?"; break;
			case(1): ss = "You find a box on the ground, it looks heavy. Let's see if you are strong enough to lift it up and see what's under there!";break;
			case(2): ss = "You enter the room and find one of those mallet carnival games. You take a swing to try and hit the bell.";break;
			case(3): ss = "In the room you see a barbell and a guy standing next to it. He says with a Brooklyn accent \"Dis ting is "+formatNumber(target*10)+" pounds. Okay? Do yuh tink yuh can lift it, or what?\" Well, do ya?";break;
		}
		var tcol = "red";
		if(rolled >= target)
			tcol = "green";
		tt += "<br><br>Strength required to pass: <span style='color:red'>"+target+"</span><br>Your Strength roll: <span style='color:"+tcol+"'>"+rolled+"</span><br>";
		if(rolled >= target){
			var re = getRandomReward().split(";");
			var tVal = Number(re[0]);
			var tType = re[1];
			var color = "";
			switch(tType){
				case("Gold"): questRGold(tVal); color = "gold";break;
				case("Cats"): questRCat(tVal); color = "sandybrown"; break;
				case("Gems"): questRGem(tVal); color = "cyan"; break;
				case("Jewel Fragments"): questRFrag(tVal); color = "#DC7AA3"; break;
			}
			tt += "<br><span style='color:green'>SUCCESS!</span> You showed your strength and have been rewarded. You earned <span style='color:"+color+"'>"+formatNumber(tVal)+" "+tType+"!</span>";
		}
		else
			tt += "<br> <span style='color:red'>You try with all your might but you are not strong enough. You leave in shame</span>";
		
		quest2Text(tt);
		return ss;
	},
	stamcheck:function(){
		var ss = "";
		var tt = "";
		var target = Math.floor(2 + playerStats.qlevel* Math.pow(playerStats.qlevel, .1) * (Math.random()*(1.2-.2)+.2));
		var rolled = doRangeLuck(1,getRandomRange((playerStats.Stam+playerStats.level),1.25),true);
		target = doRangeLuck(2,target,false);
		switch(Math.floor(Math.random()*4)){
			case(0): ss = "Inside the room is a large track circle. A sign says if you can do "+formatNumber(target)+" laps without stopping you'll be rewarded. Get to it!"; break;
			case(1): ss = "As you enter the room a giant boulder falls behind you and starts to give chase! Run run run!";break;
			case(2): ss = "You enter the room, and a woman inside challenges you to a breath holding contest. *SHUUUUP*";break;
			case(3): ss = "Entering the room you see a ton of boxes. Your mom asks for help moving all the boxes to the other side of the room. You can't tell your mom no.";break;
		}
		var tcol = "red";
		if(rolled >= target)
			tcol = "green";
		tt += "<br><br>Stamina required to pass: <span style='color:red'>"+target+"</span><br>Your Stamina roll: <span style='color:"+tcol+"'>"+rolled+"</span><br>";
		if(rolled >= target){
			var re = getRandomReward().split(";");
			var tVal = Number(re[0]);
			var tType = re[1];
			var color = "";
			switch(tType){
				case("Gold"): questRGold(tVal); color = "gold";break;
				case("Cats"): questRCat(tVal); color = "sandybrown"; break;
				case("Gems"): questRGem(tVal); color = "cyan"; break;
				case("Jewel Fragments"): questRFrag(tVal); color = "#DC7AA3"; break;
			}
			tt += "<br><span style='color:green'>SUCCESS!</span> Your high stamina allowed you to withstand the ordeal and you passed. You earned <span style='color:"+color+"'>"+formatNumber(tVal)+" "+tType+"!</span>";
		}
		else
			tt += "<br><span style='color:red'>You run out of breath and almost pass out. It's probably best to leave the room.</span>";
		
		quest2Text(tt);
		return ss;
	},
	dexcheck:function(){
		var ss = "";
		var tt = "";
		var target = Math.floor(2 + playerStats.qlevel* Math.pow(playerStats.qlevel, .1) * (Math.random()*(1.2-.2)+.2));
		var rolled = doRangeLuck(1,getRandomRange((playerStats.Dex+playerStats.level),1.25),true);
		target = doRangeLuck(2,target,false);
		switch(Math.floor(Math.random()*4)){
			case(0): ss = "OH GOD A KNIFE IS FLYING RIGHT AT YOU! DODGE!!!!"; break;
			case(1): ss = "You enter the room and earned your Medical Degree! Now it's time to perform open heart surgery, better keep a steady hand.";break;
			case(2): ss = "This room contains a game where you have to catch "+formatNumber(target)+" falling objects within "+(Math.floor((1000/target)*10000)/10000)+" seconds. I think you can do it!";break;
			case(3): ss = "It's time for the Rock Paper Scissor championship. You're in the final round against Ninjy McNinja!";break;
		}
		var tcol = "red";
		if(rolled >= target)
			tcol = "green";
		tt += "<br><br>Dexterity required to pass: <span style='color:red'>"+target+"</span><br>Your Dexterity roll: <span style='color:"+tcol+"'>"+rolled+"</span><br>";
		if(rolled >= target){
			var re = getRandomReward().split(";");
			var tVal = Number(re[0]);
			var tType = re[1];
			
			var color = "";
			switch(tType){
				case("Gold"): questRGold(tVal); color = "gold";break;
				case("Cats"): questRCat(tVal); color = "sandybrown"; break;
				case("Gems"): questRGem(tVal); color = "cyan"; break;
				case("Jewel Fragments"): questRFrag(tVal); color = "#DC7AA3"; break;
			}
			tt += "<br><span style='color:green'>SUCCESS!</span> You displayed exemplary dexterity and have been rewarded. You earned <span style='color:"+color+"'>"+formatNumber(tVal)+" "+tType+"!</span>";
		}
		else
			tt += "<br><span style='color:red'>Whoopse, looks like someone wasn't dexterous enough. Let's leave and pretend this never happened.</span>";
		
		quest2Text(tt);
		return ss;
	},
	endcheck:function(){
		var ss = "";
		var tt = "";
		var target = Math.floor(2 + playerStats.qlevel* Math.pow(playerStats.qlevel, .1) * (Math.random()*(1.2-.2)+.2));
		var rolled = doRangeLuck(1,getRandomRange((playerStats.End+playerStats.level),1.25),true);
		target = doRangeLuck(2,target,false);
		switch(Math.floor(Math.random()*4)){
			case(0): ss = "This room is a long hallway filled with microwaves. You'll have to pass through it to get the treasure"; break;
			case(1): ss = "A creepy guy is awaiting you in the room. He whispers \"Let me stab you with these "+target+" needles and I'll give you something good.\" It'd be a bad idea NOT to.";break;
			case(2): ss = "As you enter the room, the ceiling starts to collapse. Thankfully, you're able to hold it up to stop it from falling. Someone runs by and says it'll take them "+target+" hours to fix the room.";break;
			case(3): ss = "You enter the room and see a bowl of nails. You decide to eat them before you realize there isn't any milk.";break;
		}
		var tcol = "red";
		if(rolled >= target)
			tcol = "green";
		tt += "<br><br>Endurance required to pass: <span style='color:red'>"+target+"</span><br>Your Endurance roll: <span style='color:"+tcol+"'>"+rolled+"</span><br>";
		if(rolled >= target){
			var re = getRandomReward().split(";");
			var tVal = Number(re[0]);
			var tType = re[1];
			
			var color = "";
			switch(tType){
				case("Gold"): questRGold(tVal); color = "gold";break;
				case("Cats"): questRCat(tVal); color = "sandybrown"; break;
				case("Gems"): questRGem(tVal); color = "cyan"; break;
				case("Jewel Fragments"): questRFrag(tVal); color = "#DC7AA3"; break;
			}
			tt += "<br><span style='color:green'>SUCCESS!</span> Your resilience is unheard of and for that you will get the reward you deserve. You earned <span style='color:"+color+"'>"+formatNumber(tVal)+" "+tType+"!</span";
		}
		else
			tt += "<br><span style='color:red'>Struggling to keep it together, you leave the room. It looks like you aren't able to endure as much as you thought.</span>";
		
		quest2Text(tt);
		return ss;
	},
	luckcheck:function(){
		var ss = "";
		var tt = "";
		var target = Math.floor(2 + playerStats.qlevel* Math.pow(playerStats.qlevel, .1) * (Math.random()*(1.2-.2)+.2));
		var rolled = doRangeLuck(1,getRandomRange((playerStats.luck+playerStats.level),1.25),true);
		target = doRangeLuck(2,target,false);
		switch(Math.floor(Math.random()*4)){
			case(0): ss = "You enter the room and...."; break;
			case(1): ss = "As you enter a man yells at you \"HEY PICK A NUMBER BETWEEN 0 AND "+target+"\". So you do.";break;
			case(2): ss = "The room is filled with buttons. Might as well push one!";break;
			case(3): ss = "You peek into the room and see a man standing there. He tells you that luck isn't as good as you might think it is and then disappears.";break;
		}
		var tcol = "red";
		if(rolled >= target)
			tcol = "green";
		tt += "<br><br>Luck required to pass: <span style='color:red'>"+target+"</span><br>Your Luck roll: <span style='color:"+tcol+"'>"+rolled+"</span><br>";
		if(rolled >= target){
			var re = getRandomReward().split(";");
			var tVal = Number(re[0]);
			var tType = re[1];
			
			var color = "";
			switch(tType){
				case("Gold"): questRGold(tVal); color = "gold";break;
				case("Cats"): questRCat(tVal); color = "sandybrown"; break;
				case("Gems"): questRGem(tVal); color = "cyan"; break;
				case("Jewel Fragments"): questRFrag(tVal); color = "#DC7AA3"; break;
			}
			tt += "<br><span style='color:green'>SUCCESS!</span> Don't celebrate too much, you just got lucky. You earned <span style='color:"+color+"'>"+formatNumber(tVal)+" "+tType+"!<span>";
		}
		else
			tt += "<br><span style='color:red'>Someone isn't very lucky today. Maybe next time.</span>";
		
		quest2Text(tt);
		return ss;
	},
	shortcut:function(){
		var ss = ""
		switch(Math.floor(Math.random()*4)){
			case(0):ss = "As you're walking through the room your hand pushes a hidden button! A shortcut has opened up.";break;
			case(1):ss = "You enter the room and discover a hidden switch, flipping it you find a shortcut!";break;
			case(2):ss = "Inside the room you see a man handing out maps. You grab one and realize there's a faster path to your goal.";break;
			case(3):ss = "The room has multiple exits. Feeling lucky you close your eyes and pick one randomly!";break;
		}
		var tt = "<br><span style='color:green'>The number of rooms you need to complete the quest has been lowered!</span>"; 
		
		var reduce = doRangeLuck(10,100,false);
		var nroom = 1+Math.floor(playerStats.qroomMax * (reduce/100));
		quest2Text(tt);
		questRRoom(nroom);
		return ss;
	},
	lost:function(){
		var ss = ""
		switch(Math.floor(Math.random()*4)){
			case(0):ss = "As you're walking through the room you trigger a trap! You fall through a trap door.";break;
			case(1):ss = "You enter the room and the lights go out, you stumble around for a while but by the time the lights come back on you're totally lost!";break;
			case(2):ss = "When you enter the room you blink for a little longer than normal. You no longer recognize where you are.";break;
			case(3):ss = "The room has multiple exits. Feeling lucky you close your eyes and pick one randomly!";break;
		}
		if(playerStats.maps > 0){
			questLoseMap();
			tt = "<br><span style='color:green'>Luckily you had a map. You are able to find your way back to where you were without any trouble! The map was destroyed, however.</span>";
		}
		else{
			tt = "<br><span style='color:red'>The number of rooms you need to complete the quest has been increased. Oh No!</span>"; 
			var reduce = doRangeLuck(0,100,false);
			var nroom = Math.floor(playerStats.qroomMax * (1+(reduce/100)));
			questRRoom(nroom);
		}
		quest2Text(tt);
		
		return ss;
	},
	empty:function(){
		var ss = ""
		switch(Math.floor(Math.random()*4)){
			case(0):ss = "You enter the room. Looks like there's nothing here. Better keep moving.";break;
			case(1):ss = "As you enter the room you scan your surroundings for anything. Nope, nothing.";break;
			case(2):ss = "The room is empty! You turn around to leave and try another room.";break;
			case(3):ss = "Looks like there ain't nothing here! Not even us chickens.";break;
		}
		return ss;
	},
	training:function(){
		var ss = ""
		switch(Math.floor(Math.random()*4)){
			case(0):ss = "This room is acutally a gym! Awesome, time to pump iron.";break;
			case(1):ss = "You enter the room and notice that there is an advanced obstacle course here! You spend a few hours training.";break;
			case(2):ss = "Upon searching the room you find a Hyperbolic Time Chamber. You enter it and 1 second later come out much stronger!";break;
			case(3):ss = "There is a TV in this room playing an exercise routine on it. You decide to follow along for as long as you can.";break;
		}
		var con = Math.floor(Math.random()*(30-10)+10);
		var xp = Math.floor(Math.pow(playerStats.qlevel,.45) * con * Math.pow(playerStats.qlevel,.45));
		xp = (getRandomRange(xp,.2));
		questRXP(xp);

		return ss;
	},
	bigtreasure:function(){
		var ss = "You walk into the room and see a HUGE treasure chest. This thing is going to be loaded, you just know it.";
		var tt = "";
		var treward = Math.floor(Math.random()*(9-5)+5);
		if(playerStats.bigKey > 0){
			questLoseBKey();
			tt += "<br><span style='color:green'>The Big Key you were dragging around started to vibrate and disappeared! But it looks like the treasure chest has better rewards now!</span>";
			treward += (Math.floor(Math.random()*(4-1)+1));
		}
		switch(Math.floor(Math.random()*3)){
			case(0): var tVal = goldReward(treward);
			tt += "<br>OH YEAAAAAAAAAAAAAH!!<span style='color:gold'>"+formatNumber(tVal)+" Gold!</span> Thank you treasure chest God!";
			questRGold(tVal);
			break;
			case(1): var tVal = catReward(treward);
			tt += "<br>You were right! This chest is loaded with <span style='color:sandybrown'>Cats! "+formatNumber(tVal)+"</span> to be exact.";
			questRCat(tVal);
			break;
			case(2): var tVal = gemReward(treward);
			tt += "<br>Cool...<span style='color:cyan'>"+formatNumber(tVal)+" Gems.</span> That's really nice, isn't it?";
			questRGem(tVal);break;
			case(3): var tVal = fragReward(treward);
			tt += "<br>JACKPOT BABY! You just earned yourself like <span style='color:#DC7AA3'>"+formatNumber(tVal)+" Jewel Fragments.</span> What ever will you do with them all?";
			questRFrag(tVal); break;
		}
		quest2Text(tt);
		return ss;
	},
	smalltreasure:function(){
		var ss = "As you enter the room you notice a small treasure chest. You wonder what could be inside and if its even worth your time to open.";
		var tt = "";
		var treward = Math.floor(Math.random()*4);
		if(playerStats.bigKey > 0){
			questLoseBKey();
			tt += "<br><span style='color:green'>The Big Key you were dragging around started to vibrate and disappeared! But it looks like the treasure chest has better rewards now!</span>";
			treward += (Math.floor(Math.random()*(4-1)+1));
		}
		switch(Math.floor(Math.random()*3)){
			case(0): var tVal = goldReward(treward);
			tt += "<br>Oh neat! The chest contained <span style='color:gold'>"+formatNumber(tVal)+" Gold.</span> That was probably worth your time";
			questRGold(tVal);
			break;
			case(1): var tVal = catReward(treward);
			tt += "<br>How did <span style='color:sandybrown'>"+formatNumber(tVal)+" Cats</span> even fit inside this chest? Who knows but they are yours now!";
			questRCat(tVal);
			break;
			case(2): var tVal = gemReward(treward);
			tt += "<br>AWWWWW YES! You just scored <span style='color:cyan'>"+formatNumber(tVal)+" Gems.</span>";
			questRGem(tVal);
			break;
			case(3): var tVal = fragReward(treward);
			tt += "<br>Ah it appears this chest had some sweet treasure inside. <span style='color:#DC7AA3'>"+formatNumber(tVal)+" Jewel Fragments to be exact!</span>";
			questRFrag(tVal);
			break;0
		}
		quest2Text(tt);
		return ss;
	},
	hardcombat:function(){
		var lvlRng =  Math.random()*.1+.1;
		var ss = "";
		ss = enterCombat(lvlRng);
		var tt = "";
		if(playerStats.bombs > 0){
			tt+= "<br><br>You pull the bomb out of your bag. \"Ha ha! Not today!\" you shout and throw the bomb at the <span style='color:#C18AB5'>"+playerStats.monName+"</span>. KABOOM!";
			questLoseBomb();
			quest2Text(tt);
			questRXP(getXp());
			hideState();
		}
		return ss
	},
	levelup:function(){
		var ss = ""
		switch(Math.floor(Math.random()*4)){
			case(0):ss = "You enter the room and see a portal. You enter it. WHOA! You're now on a new, more powerful quest!";break;
			case(1):ss = "As you enter the room a wizard shows up infront of you. \"Abandon your quest and take my new one!\" He says calmly, you oblige.";break;
			case(2):ss = "You walk into the room and find an amulet. Touching it teleports you into a new dungeon!";break;
			case(3):ss = "What's this? You enter the room and a mist of magic appears around you and clouds your vision. When it dissipates you find yourself in a new dungeon.";break;
		}
		var tt ="<br> <span style='color:green'>Your quest level has increased.</span>";
		var reduce = doRangeLuck(10,20,true);
		var nlvl = Math.floor(1+(playerStats.qlevel * (1+(reduce/100))));
		questRLvl(nlvl);
		quest2Text(tt);
		return ss;
	},
	leveldown:function(){
		var ss = ""
		switch(Math.floor(Math.random()*4)){
			case(0):ss = "You enter the room realize that you are in the wrong dungeon! Whoopse.";break;
			case(1):ss = "You decided to sleep instead of working on your quest. You were assigned a new quest.";break;
			case(2):ss = "As you enter the room you fall to your feet crying. \"THIS QUEST IS TOO HARD\" you say. The gods take pity on you and make your quest easier.";break;
			case(3):ss = "What's this? You enter the room and a mist of magic appears around you and clouds your vision. When it dissipates you find yourself in a new dungeon.";break;
		}
		var tt ="<br> <span style='color:red'>Your quest level has decreased.</span>";
		var reduce = doRangeLuck(50,99,true);
		var nlvl = Math.floor((playerStats.qlevel * (reduce/100)));
		nlvl = nlvl>1?nlvl:1;
		questRLvl(nlvl);
		quest2Text(tt);
		return ss;
	},
	bomb:function(){
		var ss = "";
		var tt = "";
		switch(Math.floor(Math.random()*5)){
			case(0):ss = "You enter the room and find a bomb! BOOM BABY!"; break;
			case(1):ss = "You decide to apply for a job on the wrecking crew team because you just got a bomb.";break;
			case(2):ss = "They say you should call security if you see random suitcases in an airport. You decided to take it with you instead.";break;
			case(3):ss = "After a few hours of trying to create a new sword you accidentally created a bomb!";break;
			case(4):ss = "You enter the room and find a bomb! But you don't have a bomb bag. Let's put it back.....just kidding!";break;
		}
		
		var amt = 1;
		if(playerStats.catUpgrades[18] == 1){
			if(doLuck(10))
				amt = 2;
		}
		if(amt == 1)
			tt = "<br><span style='color:green'>You got a bomb!</span>";
		else
			tt = "<br><span style='color:green'>You got <span class=\"rainbow-text\">two</span> bombs! Get to Bombing!</span>";

		quest2Text(tt);
		questGetBomb(amt);
		return ss;
	},
	map:function(){
		var ss = "";
		var tt = "";
		switch(Math.floor(Math.random()*5)){
			case(0):ss = "You enter the room and find a map! Now you won't get lost."; break;
			case(1):ss = "The sound of humming fills your head. Looking around you see a creature working on some maps. \"mahim noi cashkade\" He says?? He hands you a map.";break;
			case(2):ss = "As you explore the dungeon you've been taking notes of where you've been. You've created a map!";break;
			case(3):ss = "At the end of this room you see some parchment hung up on the wall. You take it to wipe the sweat off of your head.";break;
			case(4):ss = "You enter the room and a lad throws something at you. \"Who needs a map?\" he says and then teleports away.";break;
		}
		var amt = 1;
		if(playerStats.catUpgrades[18] == 1){
			if(doLuck(10))
				amt = 2;
		}
		if(amt == 1)
			tt = "<br><span style='color:green'>You got a map!</span>";
		else
			tt = "<br><span style='color:green'>You got <span class=\"rainbow-text\">two</span> maps! Now you never have an excuse to be late</span>";
		quest2Text(tt);
		questGetMap(amt);
		return ss;
	},
	bigkey:function(){
		var ss = "";
		var tt = "";
		switch(Math.floor(Math.random()*5)){
			case(0):ss = "You enter the room and find a large key! What could it be used for?"; break;
			case(1):ss = "You find a key in the room. This thing is huge! How are you going to carry it around?";break;
			case(2):ss = "The room is empty! You turn around and *WHAM*, you run into a big key. You take it.";break;
			case(3):ss = "Entering the room you see a giant key laying on the floor. You drag it along with you.";break;
			case(4):ss = "You walk into the magical room and magically a big key appears inside your bags. You fall to the floor!";break;
		}
		var amt = 1;
		if(playerStats.catUpgrades[18] == 1){
			if(doLuck(10))
				amt = 2;
		}
		if(amt == 1)
			tt = "<br><span style='color:green'>You got a Big Key!</span>";
		else
			tt = "<br><span style='color:green'>You got <span class=\"rainbow-text\">two</span> Big Keys! How are you going to carry all these keys?!?</span>";
		quest2Text(tt);
		questGetBKey(amt);
		return ss;
	},
	potion:function(){
		var ss = "";
		var tt = "";
		switch(Math.floor(Math.random()*5)){
			case(0):ss = "You enter the room and potion on the ground. It has a Skull on the label. You take it."; break;
			case(1):ss = "You walk into the room and see a wizard selling potions. He asks if you'd like a free one and you say \"of course!\"";break;
			case(2):ss = "After a few hours of trying to create a bomb you accidentally created a potion!";break;
			case(3):ss = "You joined the Dungeon fraternity, as part of the initiation they make you chug potions. You secretly keep one. SIGMA ALPHA!";break;
			case(4):ss = "As you enter the room you see a corpse! This looks dangerous, however, you loot the body and find some cool stuff!";break;
		}
		var amt = 1;
		if(playerStats.catUpgrades[18] == 1){
			if(doLuck(10))
				amt = 2;
		}
		if(amt == 1)
			tt = "<br><span style='color:green'>You got a potion!</span>";
		else
			tt = "<br><span style='color:green'>You got <span class=\"rainbow-text\">two</span> potions! CHUG! CHUG! CHUG!</span>";
		quest2Text(tt);
		questGetPotion(amt);
		return ss;
	},
	bossRoom: function(){
		playerStats.isBoss = true;
		bossFlag = 0;
		return enterCombat(0);
	}
}
function questGetBomb(x){
	setTimeout(function(){playerStats.bombs+=x;},(playerStats.questTimer*1000/2));
}
function questLoseBomb(){
	setTimeout(function(){playerStats.bombs--;},(playerStats.questTimer*1000/2));
}
function questGetKey(x){
	setTimeout(function(){playerStats.keys+=x;},(playerStats.questTimer*1000/2));
}
function questLoseKey(){
	setTimeout(function(){playerStats.keys--;},(playerStats.questTimer*1000/2));
	}
function questGetMap(x){
	setTimeout(function(){playerStats.maps+=x;},(playerStats.questTimer*1000/2));
}
function questLoseMap(){
	setTimeout(function(){playerStats.maps--;},(playerStats.questTimer*1000/2));
}
function questGetBKey(x){
	setTimeout(function(){playerStats.bigKey+=x;},(playerStats.questTimer*1000/2));
}
function questLoseBKey(){
	setTimeout(function(){playerStats.bigKey--;},(playerStats.questTimer*1000/2));
}
function questGetPotion(x){
	setTimeout(function(){playerStats.potions+=x;},(playerStats.questTimer*1000/2));
}
function questDoWin(){
	setTimeout(function(){
		playerStats.Hp += Math.round(playerStats.HpMax*(Math.random()));
		if(playerStats.Hp > playerStats.HpMax)
			playerStats.Hp = playerStats.HpMax;
		},(playerStats.questTimer*1000/2));
}
function questDoWinFull(){
	setTimeout(function(){
		playerStats.Hp = playerStats.HpMax;
		},(playerStats.questTimer*1000/2));
}
function questRGold(t){
	ggoldg+= t;
	setTimeout(function(){addGold(t, 1);},(playerStats.questTimer*1000/2));
}
function questRCat(t){
	gcatg+= t;
	setTimeout(function(){addCat(t, 1);},(playerStats.questTimer*1000/2));
}
function questRGem(t){
	ggemg+= t;
	setTimeout(function(){addGem(t,1)},(playerStats.questTimer*1000/2));
}
var ggoldg = 0;
var gcatg = 0;
var ggemg = 0;
var gfragg = 0;
function questRFrag(v){
	gfragg += v;
	var r = Math.random();
	var t = Math.random();
	var e = Math.random();
	var a = Math.random();
	var o = Math.random()*.25;
	var z = r+t+e+a+o;
	r = r/z;
	t = t/z;
	e = e/z;
	a = a/z;
	o = o/z;
	setTimeout(function(){
		playerStats.rubyFragment += Math.floor(r*v);
		playerStats.topazFragment += Math.floor(t*v);
		playerStats.amethystFragment += Math.floor(a*v);
		playerStats.emeraldFragment += Math.floor(e*v);
		playerStats.onyxFragment += Math.floor(o*v);
	},(playerStats.questTimer*1000/2));
}
function questRXP(t){
	setTimeout(function(){
	var tt ="<br>"+gainXP(t);
	addText(tt);},(playerStats.questTimer*1000/2));
}
function questRRoom(t){
	setTimeout(function(){
	playerStats.qroomMax = t;},(playerStats.questTimer*1000/2));
}
function questRLvl(t){
	setTimeout(function(){
	playerStats.qlevel = t; },(playerStats.questTimer*1000/2));
}
function quest2Text(ss){
	setTimeout(function(){addText(ss);}, (playerStats.questTimer*1000/2));
}