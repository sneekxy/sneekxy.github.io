var roomEvents = {
	combat:function(){
		return "no combat yet";
	},
	treasure:function(){
		var ss = "Walking into the room, you discover a treasure chest! You open it up.";
		var tt = "";
		var treward = Math.floor(Math.random()*(7-2)+2);
		if(playerStats.bigKey > 0){
			playerStats.bigKey --;
			tt += "<br><span style='color:green'>The Big Key you were dragging around started to vibrate and disappeared! But it looks like the treasure chest has better rewards now!</span>";
			treward += (Math.floor(Math.random()*(4-1)+1));
		}
		switch(Math.floor(Math.random()*3)){
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
		}
		quest2Text(tt);
		return ss;
	},
	locked:function(){
		var ss = "You stumble upon a locked door."
		var tt = "";
		if(playerStats.keys > 0){
			playerStats.keys --;
			tt += "<br> You rummage through your bags and pull out a key. <span style='color:green'>*click*</span> The door opens!"
			var rng = Math.floor(Math.random()*7);
			var keyBonus = 0;
			if(playerStats.bigKey > 0){
				playerStats.bigKey --;
				tt += "<br><span style='color:green'>The Big Key you were dragging around started to vibrate and disappeared! But it looks like the treasure chest has better rewards now!</span>";
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
		tt = "<br><span style='color:green;>You got a key!</span>";
		quest2Text(tt);
		playerStats.keys ++;
		return ss;
	},
	strcheck:function(){
		var ss = "";
		var tt = "";
		var target = Math.floor(2 + playerStats.qlevel* Math.pow(playerStats.qlevel, .1) * (Math.random()*(1.5-.5)+.5));
		switch(Math.floor(Math.random()*4)){
			case(0): ss = "There is a giant wall in this room. It looks like there's something behind it. Maybe you're strong enough to break down the wall?"; break;
			case(1): ss = "You find a box on the ground, it looks heavy. Let's see if you are strong enough to lift it up and see what's under there!";break;
			case(2): ss = "You enter the room and find one of those mallet carnival games. You take a swing to try and hit the bell.";break;
			case(3): ss = "In the room you see a barbell and a guy standing next to it. He says with a Brooklyn accent \"Dis ting is "+formatNumber(target*10)+" pounds. Okay? Do yuh tink yuh can lift it, or what?\" Well, do ya?";break;
		}
		var tcol = "red";
		if(playerStats.Str >= target)
			tcol = "green";
		tt += "<br><br>Strength required to pass: <span style='color:red'>"+target+"</span><br>Your Strength: <span style='color:"+tcol+"'>"+playerStats.Str+"</span><br>";
		if(playerStats.Str >= target){
			var re = getRandomReward().split(";");
			var tVal = Number(re[0]);
			var tType = re[1];
			var color = "";
			switch(tType){
				case("Gold"): questRGold(tVal); color = "gold";break;
				case("Cats"): questRCat(tVal); color = "sandybrown"; break;
				case("Gems"): questRGem(tVal); color = "cyan"; break;
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
		var target = Math.floor(2 + playerStats.qlevel* Math.pow(playerStats.qlevel, .1) * (Math.random()*(1.5-.5)+.5));
		switch(Math.floor(Math.random()*4)){
			case(0): ss = "Inside the room is a large track circle. A sign says if you can do "+formatNumber(target)+" laps without stopping you'll be rewarded. Get to it!"; break;
			case(1): ss = "As you enter the room a giant boulder falls behind you and starts to give chase! Run run run!";break;
			case(2): ss = "You enter the room, and a woman inside challenges you to a breath holding contest. *SHUUUUP*";break;
			case(3): ss = "Entering the room you see a ton of boxes. Your mom asks for help moving all the boxes to the other side of the room. You can't tell your mom no.";break;
		}
		var tcol = "red";
		if(playerStats.Stam >= target)
			tcol = "green";
		tt += "<br><br>Stamina required to pass: <span style='color:red'>"+target+"</span><br>Your Stamina: <span style='color:"+tcol+"'>"+playerStats.Stam+"</span><br>";
		if(playerStats.Stam >= target){
			var re = getRandomReward().split(";");
			var tVal = Number(re[0]);
			var tType = re[1];
			var color = "";
			switch(tType){
				case("Gold"): questRGold(tVal); color = "gold";break;
				case("Cats"): questRCat(tVal); color = "sandybrown"; break;
				case("Gems"): questRGem(tVal); color = "cyan"; break;
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
		var target = Math.floor(2 + playerStats.qlevel* Math.pow(playerStats.qlevel, .1) * (Math.random()*(1.5-.5)+.5));
		switch(Math.floor(Math.random()*4)){
			case(0): ss = "OH GOD A KNIFE IS FLYING RIGHT AT YOU! DODGE!!!!"; break;
			case(1): ss = "You enter the room and earned your Medical Degree! Now it's time to perform open heart surgery, better keep a steady hand.";break;
			case(2): ss = "This room contains a game where you have to catch "+formatNumber(target)+" falling objects within "+(Math.floor((1000/target)*10000)/10000)+" seconds. I think you can do it!";break;
			case(3): ss = "It's time for the Rock Paper Scissor championship. Your in the final round against Ninjy McNinja!";break;
		}
		var tcol = "red";
		if(playerStats.Dex >= target)
			tcol = "green";
		tt += "<br><br>Dexterity required to pass: <span style='color:red'>"+target+"</span><br>Your Dexterity: <span style='color:"+tcol+"'>"+playerStats.Dex+"</span><br>";
		if(playerStats.Dex >= target){
			var re = getRandomReward().split(";");
			var tVal = Number(re[0]);
			var tType = re[1];
			
			var color = "";
			switch(tType){
				case("Gold"): questRGold(tVal); color = "gold";break;
				case("Cats"): questRCat(tVal); color = "sandybrown"; break;
				case("Gems"): questRGem(tVal); color = "cyan"; break;
			}
			tt += "<br>SUCCESS! You displayed exemplary dexterity and have been rewarded. You earned <span style='color:"+color+"'>"+formatNumber(tVal)+" "+tType+"!</span>";
		}
		else
			tt += "<br>Whoopse, looks like someone wasn't dexterous enough. Let's leave and pretend this never happened.";
		
		quest2Text(tt);
		return ss;
	},
	endcheck:function(){
		var ss = "";
		var tt = "";
		var target = Math.floor(2 + playerStats.qlevel* Math.pow(playerStats.qlevel, .1) * (Math.random()*(1.5-.5)+.5));
		switch(Math.floor(Math.random()*4)){
			case(0): ss = "This room is a long hallway filled with microwaves. You'll have to pass through it to get the treasure"; break;
			case(1): ss = "A creepy guy is awaiting you in the room. He whispers \"Let me stab you with these "+target+" needles and I'll give you something good.\" It'd be a bad idea NOT to.";break;
			case(2): ss = "As you enter the room, the ceiling starts to collapse. Thankfully, you're able to hold it up to stop it from falling. Someone runs by and says it'll take them "+target+" hours to fix the room.";break;
			case(3): ss = "You enter the room and see a bowl of nails. You decide to eat them before you realize there isn't any milk.";break;
		}
		var tcol = "red";
		if(playerStats.End >= target)
			tcol = "green";
		tt += "<br><br>Endurance required to pass: <span style='color:red'>"+target+"</span><br>Your Endurance: <span style='color:"+tcol+"'>"+playerStats.End+"</span><br>";
		if(playerStats.End >= target){
			var re = getRandomReward().split(";");
			var tVal = Number(re[0]);
			var tType = re[1];
			
			var color = "";
			switch(tType){
				case("Gold"): questRGold(tVal); color = "gold";break;
				case("Cats"): questRCat(tVal); color = "sandybrown"; break;
				case("Gems"): questRGem(tVal); color = "cyan"; break;
			}
			tt += "<br>SUCCESS! Your resilience is unheard of and for that you will get the reward you deserve. You earned <span style='color:"+color+"'>"+formatNumber(tVal)+" "+tType+"!</span";
		}
		else
			tt += "<br>Struggling to keep it together, you leave the room. It looks like you aren't able to endure as much as you thought.";
		
		quest2Text(tt);
		return ss;
	},
	luckcheck:function(){
		var ss = "";
		var tt = "";
		var target = Math.floor(2 + playerStats.qlevel* Math.pow(playerStats.qlevel, .1) * (Math.random()*(1.5-.5)+.5));
		switch(Math.floor(Math.random()*4)){
			case(0): ss = "You enter the room and...."; break;
			case(1): ss = "As you enter a man yells at you \"HEY PICK A NUMBER BETWEEN 0 AND "+target+"\". So you do.";break;
			case(2): ss = "The room is filled with buttons. Might as well push one!";break;
			case(3): ss = "You peek into the room and see a man standing there. He tells you that luck isn't as good as you might think it is and then disappears.";break;
		}
		var tcol = "red";
		if(playerStats.luck >= target)
			tcol = "green";
		tt += "<br><br>Luck required to pass: <span style='color:red'>"+target+"</span><br>Your Luck: <span style='color:"+tcol+"'>"+playerStats.luck+"</span><br>";
		if(playerStats.luck >= target){
			var re = getRandomReward().split(";");
			var tVal = Number(re[0]);
			var tType = re[1];
			
			var color = "";
			switch(tType){
				case("Gold"): questRGold(tVal); color = "gold";break;
				case("Cats"): questRCat(tVal); color = "sandybrown"; break;
				case("Gems"): questRGem(tVal); color = "cyan"; break;
			}
			tt += "<br>SUCCESS! Don't celebrate too much, you just got lucky. You earned <span style='color:"+color+"'>"+formatNumber(tVal)+" "+tType+"!<span>";
		}
		else
			tt += "<br>Someone isn't very lucky today. Maybe next time.";
		
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
		
		var reduce = doRangeLuck(0,100,false);
		var nroom = Math.floor(playerStats.qroomMax * (reduce/100));
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
			playerStats.maps --;
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
		var xp = Math.floor(playerStats.qlevel * 25 * playerStats.level);
		questRXP(xp);

		return ss;
	},
	bigtreasure:function(){
		var ss = "You walk into the room and see a HUGE treasure chest. This thing is going to be loaded, you just know it.";
		var tt = "";
		var treward = Math.floor(Math.random()*(9-5)+5);
		if(playerStats.bigKey > 0){
			playerStats.bigKey --;
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
			questRGem(tVal);
		}
		quest2Text(tt);
		return ss;
	},
	smalltreasure:function(){
		var ss = "As you enter the room you notice a small treasure chest. You wonder what could be inside and if its even worth your time to open.";
		var tt = "";
		var treward = Math.floor(Math.random()*4);
		if(playerStats.bigKey > 0){
			playerStats.bigKey --;
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
		}
		quest2Text(tt);
		return ss;
	},
	hardcombat:function(){
		return "no combat yet";
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
		var reduce = doRangeLuck(1,50,true);
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
		var nlvl = Math.floor(1+(playerStats.qlevel * (reduce/100)));
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
		tt = "<br><span style='color:green;>You got a bomb!</span>";
		quest2Text(tt);
		playerStats.bombs ++;
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
		tt = "<br><span style='color:green;>You got a map!</span>";
		quest2Text(tt);
		playerStats.maps ++;
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
		tt = "<br><span style='color:green;>You got a big key! I wonder what it does.</span>";
		quest2Text(tt);
		playerStats.bigkey ++;
		return ss;
	},
}
function questRGold(t){
	setTimeout(function(){addGold(t, 1);},(playerStats.questTimer*1000/2));
}
function questRCat(t){
	setTimeout(function(){addCat(t, 1);},(playerStats.questTimer*1000/2));
}
function questRGem(t){
	setTimeout(function(){addGem(t,1)},(playerStats.questTimer*1000/2));
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