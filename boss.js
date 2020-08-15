var bossSpecial = false;
var bossFlag = 0;
var bossScript = {
	"Galzon, The Impaler":function(){
		var retVal;
		var ss = "";
		if(((playerStats.monHp/playerStats.monHpMax) <= .5) && bossFlag == 0){
			bossFlag = 1;
			bossSpecial = true;
			playerStats.monArmor = 0;
			var dmg = playerStats.monDmg *((playerStats.monCDmg/50));
			var aa = playerStats.Armor *-1;
			ss = "<span style='color:#9500FF'>Galzon, The Impaler</span> sheds his armor and skewers you on his weapon dealing %t damage!";
			retVal = "0;0;"+aa+";0;0;"+dmg+";0;0;0;0;"+ss+";false";
		}
		return retVal;
	},
	"The Immortal Shield, Bui":function(){
		var retVal;
		var ss = "";
		if(((playerStats.monHp/playerStats.monHpMax) <= .9) && bossFlag == 0){
			bossFlag = 1;
			bossSpecial = true;
			playerStats.monArmor = Math.round(playerStats.monArmor * 1.2);
			playerStats.monSpd += 2;
			var dmg = playerStats.monDmg * -1;
			ss = "<span style='color:#9500FF'>Bui</span> picks up another shield! \"I'M FLIPPIN INVINCIBLE\" he gloats.";
			retVal = "0;0;0;0;0;"+dmg+";0;0;0;0;"+ss+";false";
		}
		if(((playerStats.monHp/playerStats.monHpMax) <= .75) && bossFlag == 1){
			bossFlag = 2;
			bossSpecial = true;
			playerStats.monArmor = Math.round(playerStats.monArmor * 1.2);
			playerStats.monSpd += 2;
			playerStats.monHp = playerStats.monHpMax;
			var dmg = playerStats.monDmg * -1;
			ss = "<span style='color:#9500FF'>Bui</span> picks up ANOTHER shield! AND DRINKS A POTION! Uh oh";
			retVal = "0;0;0;0;0;"+dmg+";0;0;0;0;"+ss+";false";
		}
		if(((playerStats.monHp/playerStats.monHpMax) <= .95) && bossFlag == 2){
			bossFlag = 3;
			bossSpecial = true;
			playerStats.monArmor *= -1;
			playerStats.monSpd -= 4;
			var dmg = playerStats.monDmg * -1;
			playerStats.monName = "Bui, the Broken";
			ss = "<span style='color:#9500FF'>Bui's</span> armor breaks off. He is immortal no longer";
			retVal = "0;0;0;0;0;"+dmg+";0;0;0;0;"+ss+";false";
		}
		return retVal;
	},
	"Bui, the Broken":function(){
	},
	"Grand Duke Manard"(){
		var retVal;
		var ss = "";
		if(((playerStats.monHp/playerStats.monHpMax) <= .75) && bossFlag == 0){
			bossFlag = 1;
			bossSpecial = true;
			playerStats.monArmor = Math.floor(playerStats.monArmor * .5);
			playerStats.monSpd = Math.round(playerStats.monSpd * 1.5);
			var dmg = playerStats.monDmg* -1;
			ss = "<span style='color:#9500FF'>Grand Duke Manard</span> takes off some of his weighted armor, now he's faster!";
			retVal = "0;0;0;0;0;"+dmg+";0;0;0;0;"+ss+";false";
		}
		if(((playerStats.monHp/playerStats.monHpMax) <= .5) && bossFlag == 1){
			bossFlag = 2;
			bossSpecial = true;
			playerStats.monArmor = 0
			playerStats.monSpd = Math.round(playerStats.monSpd * 1.5);
			var dmg = playerStats.monDmg* -1;
			ss = "<span style='color:#9500FF'>Grand Duke Manard</span> takes off all of his armor. He's at max speed!!";
			retVal = "0;0;0;0;0;"+dmg+";0;0;0;0;"+ss+";false";
		}
		if(((playerStats.monHp/playerStats.monHpMax) <= .25) && bossFlag == 2){
			bossFlag = 3;
			bossSpecial = true;
			playerStats.monArmor = playerStats.Dmg * -1;
			playerStats.monHp  = Math.round(playerStats.monHpMax * .33);
			playerStats.monSpd = Math.round(playerStats.monSpd * 1.5);
			playerStats.monDmg = Math.round(playerStats.monDmg * 1.2);
			var dmg = playerStats.monDmg* -1;
			ss = "<span style='color:#9500FF'>Grand Duke Manard</span> opens up his defenses to shift into <span class=\"rainbow-text\">MAXIMUM OVERDRIVE!!!</span>";
			retVal = "0;0;0;0;0;"+dmg+";0;0;0;0;"+ss+";false";
		}
		return retVal;
	},
	"Seltya, the Relentless"(){
		var retVal = "";
		var ss = "";
		if(bossFlag < 0){
			bossFlag ++;
			bossSpecial = true;
			var dmg = playerStats.monDmg* -1;
			ss = "<span style='color:#9500FF'>Seltya, the Relentless</span> is recovering!";
			if(bossFlag == 0){
				ss +="<br><span style='color:#9500FF'>Seltya, the Relentless</span> is back and for action! WATCH OUT, she is still relentless";
				playerStats.monArmor += playerStats.monLevel;
			}
			retVal = "0;0;0;0;0;"+dmg+";0;0;0;0;"+ss+";false";
		}
		if(bossFlag == 4){
			bossFlag = -2;
			bossSpecial = true;
			var dmg = playerStats.monDmg* -1;
			playerStats.monArmor -= playerStats.monLevel;
			ss = "<span style='color:#9500FF'>Seltya, the Relentless</span> is worn out! Now is your chance to strike!";
			retVal = "0;0;0;0;0;"+dmg+";0;0;0;0;"+ss+";false";
		}
		if(bossFlag == 3){
			bossFlag = 4;
		}
		if(bossFlag == 2){
			bossFlag = 3;
			bossSpecial = true;
			var mval = Math.round(playerStats.monSpd * 1.4);
			mval = mval<2?2:mval;
			playerStats.monSpd = mval;
			var dmg = playerStats.monDmg* -1;
			ss = "<span style='color:#9500FF'>Seltya, the Relentless</span> is going all out!";
			retVal = "0;0;0;0;0;"+dmg+";0;0;0;0;"+ss+";false";
		}
		if(bossFlag == 1){
			bossFlag = 2;
			bossSpecial = false
		}
		if(bossFlag == 0){
			bossFlag = 1;
			bossSpecial = true;
			var mval = Math.round(playerStats.monSpd * 1.4);
			mval = mval<2?2:mval;
			playerStats.monSpd = mval;
			var dmg = playerStats.monDmg* -1;
			ss = "<span style='color:#9500FF'>Seltya, the Relentless</span> starts to go into a frenzy!";
			retVal = "0;0;0;0;0;"+dmg+";0;0;0;0;"+ss+";false";
		}
		return retVal;
	},
	"Arcmage Ulimazz"(){
		var retVal;
		var ss = "";
		var onetime = false;
		var zerk = false;
		if((playerStats.monHp/playerStats.monHpMax)<.3)
				zerk = true;
		if(bossFlag == 1 || zerk){
			bossFlag = 0;
			onetime = true;
			bossSpecial = true;
			var spell = "";
			var mval;
			if(zerk){
				ss += "<br><span style='color:#9500FF'>Arcmage Ulimazz</span> begins to cast a spell!";
				bossFlag = 1;
				zerk = false;
			}
			switch(Math.floor(Math.random()*5)){
				case(0): ss = "<span style='color:#9500FF'>Arcmage Ulimazz</span> chants \"Uzlar mon pargon belnish!\"<br>";
				mval = Math.floor((Math.random()*playerStats.monLevel/1.5)+1);
				mval = mval < 1?1:mval;
				ss += "<span style='color:#9500FF'>Arcmage Ulimazz's</span> armor has increased by "+mval+".";
				retVal = "0;0;0;0;0;0;0;"+mval+";0;0;"+ss+";true"; break;
				case(1): ss = "<span style='color:#9500FF'>Arcmage Ulimazz</span> chants \"Velcor ala'zim!\"<br>";
				mval = Math.floor((Math.random()*playerStats.monLevel/5)+1+(playerStats.monLevel/10));
				mval = mval < 1?1:mval;
				ss += "<span style='color:#9500FF'>Arcmage Ulimazz</span> has increased his speed by "+mval+".";
				retVal = "0;0;0;0;0;0;"+mval+";0;0;0;"+ss+";true"; break;
				case(2): ss = "<span style='color:#9500FF'>Arcmage Ulimazz</span> chants \"Deci kali malvore\"<br>";
				mval = Math.floor((Math.random()*playerStats.monLevel/1.5)+playerStats.monLevel/4);
				mval = mval < 1?1:mval;
				ss += "Your armor has been decreased by "+mval+".";
				retVal = "0;0;"+(mval*-1)+";0;0;0;0;0;0;0;"+ss+";true"; break;
				case(3): ss = "<span style='color:#9500FF'>Arcmage Ulimazz</span> chants \"Blesai helios manara\"<br>";
				mval = Math.floor(Math.floor((Math.random()*25+1)/100 * playerStats.monHpMax));
				ss += "<span style='color:#9500FF'>Arcmage Ulimazz</span> recovers "+mval+" HP.";
				retVal = "0;0;0;0;0;0;0;0;0;"+mval+";"+ss+";true"; break;
				case(4): ss = "<span style='color:#9500FF'>Arcmage Ulimazz</span> chants \"Firius blasa molta\"<br>";
				mval = Math.floor((Math.random()*playerStats.monDmg/3)+(playerStats.monDmg/2));
				mval = mval < 1?1:mval;
				ss += "<span style='color:#9500FF'>Arcmage Ulimazz</span> hurls a massive fireball at you dealing %t damage!";
				retVal = "0;0;0;0;0;"+mval+";0;0;0;0;"+ss+";false"; break;
			}
			
		}
		if((((Math.random()*100 < 35) && bossFlag == 0) && !onetime)){
			bossSpecial = true;
			bossFlag = 1;
			var dmg = playerStats.monDmg * -1
			ss = "<span style='color:#9500FF'>Arcmage Ulimazz</span> begins to cast a spell!";
			retVal = "0;0;0;0;0;"+dmg+";0;0;0;0;"+ss+";false";
		}
		return retVal;
	},
	"The Smiling Titan, Jifius"(){
		var retVal;
		var ss = "";
		var onetime = false;
		if(bossFlag == 0){
		if(playerStats.monArmor < 0)
				playerStats.monArmor *= -1;
		}
		if((Math.random()*100 < 20 && bossFlag == 0)){
			onetime = true;
			bossSpecial = true;
			var dmg = playerStats.monDmg * -1;
			var mval = Math.floor(Math.floor((Math.random()*14+1)/100 * playerStats.monHpMax));
			ss = "<span style='color:#9500FF'>The Smiling Titan, Jifius</span> pulls out a sheep and grins as she eats it, recovering "+mval+" HP!";
			retVal = "0;0;0;0;0;"+dmg+";0;0;0;"+mval+";"+ss+";false";
			
		}
		if((Math.random()*100 < 30 && bossFlag == 0)){
			bossFlag = 1;
			bossSpecial = true;
			onetime = true;
			var dmg = playerStats.monDmg * -1;
			ss = "<span style='color:#9500FF'>The Smiling Titan, Jifius</span> starts stomping around. Watch out!";
			retVal = "0;0;0;0;0;"+dmg+";0;0;0;0;"+ss+";false";
		}
		if((bossFlag == 1) && !onetime){
			bossFlag = 2;
			onetime = true;
			bossSpecial = false;
			playerStats.monSpd *= 3;
			if(playerStats.monLevel >= 150){
				playerStats.monDmg *= 5;
				playerStats.monSpd *= 3;
			}
		}
		if((bossFlag == 2) && !onetime){
			bossFlag = 3;
			onetime = true;
			bossSpecial = true;
			playerStats.monArmor *= -1;
			playerStats.monSpd /= 3;
			if(playerStats.monLevel >= 150){
				playerStats.monDmg /= 5;
				playerStats.monSpd /= 3;
			}
			var dmg = playerStats.monDmg * -1;
			ss = "<span style='color:#9500FF'>The Smiling Titan, Jifius</span> trips and falls. Strike now!";
			retVal = "0;0;0;0;0;"+dmg+";0;0;0;0;"+ss+";false";
		}
		if((bossFlag == 3) && !onetime){
			bossFlag = 0;
			onetime = true;
			bossSpecial = true;
			var dmg = playerStats.monDmg * -1;
			ss = "<span style='color:#9500FF'>The Smiling Titan, Jifius</span> gets back up!";
			retVal = "0;0;0;0;0;"+dmg+";0;0;0;0;"+ss+";false";
		}
		return retVal;
	},
	"Zulja, the Wall"(){
		var retVal;
		var ss = "";
		var onetime = false;
		if((Math.random()*100 < 40 && bossFlag == 0) && !onetime){
			bossFlag = Math.floor(playerStats.monLevel/3);
			bossFlag = bossFlag < 1? 1:bossFlag;
			bossSpecial = true;
			onetime = true;
			var dmg = playerStats.monDmg * -1;
			playerStats.monArmor += playerStats.monLevel;
			ss = "<span style='color:#9500FF'>Zulja</span> raises her shield and shouts \"THE WALL\"!";
			retVal = "0;0;0;0;0;"+dmg+";0;0;0;0;"+ss+";false";
		}
		if((bossFlag > 0 ) && !onetime){
			bossFlag -= Math.round(playerStats.Spd)
			onetime = true;
			bossSpecial = true;
			var dmg = Math.floor(playerStats.monDmg * .6)+1;
			ss = "Your attacks clash against <span style='color:#9500FF'>THE WALL</span>";
			retVal = "0;0;0;0;0;"+dmg+";0;0;0;0;"+ss+";true";
			if(bossFlag <= 0)
				bossFlag = -2;
		}
		if((bossFlag == -2) && !onetime){
			bossFlag ++;
			playerStats.monArmor -= (playerStats.monLevel * 3);
			onetime = true;
			bossSpecial = true;
			var dmg = playerStats.monDmg * -1;
			ss = "<span style='color:#9500FF'>Zulja, the Wall</span> has been broken.";
			retVal = "0;0;0;0;0;"+dmg+";0;0;0;0;"+ss+";false";
		}
		if((bossFlag < 0) && !onetime){
			bossFlag ++;
			onetime = true;
			bossSpecial = true;
			var dmg = playerStats.monDmg * -1;
			if(bossFlag == 0){
				ss = "<span style='color:#9500FF'>Zulja, the Wall</span> has recovered!";
				playerStats.monArmor += (playerStats.monLevel*2);
			}
			else{
				ss = "<span style='color:#9500FF'>Zulja, the Wall</span> is stunned.";
			}
			retVal = "0;0;0;0;0;"+dmg+";0;0;0;0;"+ss+";false";
		}
		return retVal;
	},
	"Voz'dhaunun, Shadow Incarnate"(){
		var retVal;
		var ss = "";
		var onetime = false;
		if(Math.random() < (playerStats.monHp/playerStats.monHpMax + .08)){
			bossSpecial = true;
			var dmg = (playerStats.Dmg * (-.6));
			var dmg2 = (dmg) * -1;
			ss = "<span style='color:#9500FF'>Voz'dhaunun, Shadow Incarnate</span> becomes your shadow, stealing a portion of your damage.";
			retVal = dmg+";0;0;0;0;"+dmg2+";0;0;0;0;"+ss+";true";
		}
		return retVal;
	},
	"Sekdox, the Dream Eater"(){
		var retVal;
		var ss = "";
		var onetime = false;
		if((Math.random() < .4) && bossFlag == 0){
			bossSpecial = true;
			bossFlag = Math.floor(Math.random()*4+1);
			onetime = true;
			ss = "<span style='color:#9500FF'>Sekdox, the Dream Eater</span> hisses \"Sssssleeep\" and ";
			switch(bossFlag){
				case(1): ss+="sends you into a nightmare!<br><span style='color:#AE6DB7'>Your defenses are lowered.</span><br>"; 
				var arm = Math.round((Math.random()* .5+.5) * playerStats.Armor) * -1;
				var res = Math.round((Math.random()* .5+.5) * playerStats.Resist) * -1;
				retVal = "0;0;"+arm+";"+res+";0;0;0;0;0;0;"+ss+";true";
				break;
				case(2): ss+="gives you a vision of fear!<br><span style='color:#21EA10'>Your speed is increased.</span><br>"; 
				var spd = Math.round(((Math.random()* .75)+.75) * playerStats.Spd);
				retVal = "0;"+spd+";0;0;0;0;0;0;0;0;"+ss+";true";break;
				case(3): ss+="gives you a dream of hate!<br><span style='color:#CD001C'>Your damage is increased.</span><br>"; 
				var dmg = Math.round(((Math.random()* .75)+.75) * playerStats.Dmg);
				retVal = dmg+";0;0;0;0;0;0;0;0;0;"+ss+";true";break;
				case(4): ss+="puts you to sleep with a dream of heroism.<br><span style='color:#E2D727'>Your damage and speed is increased!</span><br>"; 
				var spd = Math.round(((Math.random()* .75)+.75) * playerStats.Spd);
				var dmg = Math.round(((Math.random()* .75)+.75) * playerStats.Dmg);
				retVal = dmg+";"+spd+";0;0;0;0;0;0;0;0;"+ss+";true";break;
			}
		}
		if(bossFlag > 0 && !onetime){
			bossSpecial = true;
			onetime = true;
			ss = "<span style='color:#9500FF'>Sekdox, the Dream Eater</span> hisses \"Yesssss\" and ";
			switch(bossFlag){
				case(1): ss+="consumes the nightmare.<br><span style='color:#AE6DB7'><span style='color:#9500FF'>Sekdox's</span> defenses are lowered!</span>"; 
				var hp = Math.round((Math.random()*.03 + .02) * playerStats.monHpMax);
				ss+="<br>Consuming the dream has healed <span style='color:#9500FF'>Sekdox</span> by <span style='color:#E631D4'>"+hp+" HP!</span><br>";
				var arm = Math.round((Math.random()* .75+.75) * playerStats.monArmor) * -1;
				var res = Math.round((Math.random()* .75+.75) * playerStats.monResist) * -1;
				retVal = "0;0;0;0;0;0;0;"+arm+";"+res+";"+hp+";"+ss+";true";
				break;
				case(2): ss+="consumes the fear.<br><span style='color:#21EA10'><span style='color:#9500FF'>Sekdox's</span> speed is increased.</span>"; 
				var hp = Math.round((Math.random()*.03 + .02) * playerStats.monHpMax);
				ss+="<br>Consuming the dream has healed <span style='color:#9500FF'>Sekdox</span> by <span style='color:#E631D4'>"+hp+" HP!</span><br>";
				var spd = Math.round(((Math.random()* .5)+.35) * playerStats.monSpd);
				spd = spd<1?1:spd;
				retVal = "0;0;0;0;0;0;"+spd+";0;0;"+hp+";"+ss+";true";break;
				case(3): ss+="consumes the hate.<br><span style='color:#CD001C'><span style='color:#9500FF'>Sekdox's</span> damage is increased.</span>"; 
				var hp = Math.round((Math.random()*.03 + .02) * playerStats.monHpMax);
				ss+="<br>Consuming the dream has healed <span style='color:#9500FF'>Sekdox</span> by <span style='color:#E631D4'>"+hp+" HP!</span><br>";
				var dmg = Math.round(((Math.random()* .5)+.35) * playerStats.monDmg);
				dmg = dmg<1?1:dmg;
				retVal = "0;0;0;0;0;"+dmg+";0;0;0;"+hp+";"+ss+";true";break;
				case(4): ss+="consumes the dream and becomes the hero.<br><span style='color:#E2D727'><span style='color:#9500FF'>Sekdox's</span> damage and speed is increased!</span>"; 
				var hp = Math.round((Math.random()*.03 + .02) * playerStats.monHpMax);
				ss+="<br>Consuming the dream has healed <span style='color:#9500FF'>Sekdox</span> by <span style='color:#E631D4'>"+hp+" HP!</span><br>";
				var spd = Math.round(((Math.random()* .5)+.35) * playerStats.monSpd);
				spd = spd<1?1:spd;
				var dmg = Math.round(((Math.random()* .5)+.35) * playerStats.monDmg);
				dmg = dmg<1?1:dmg;
				retVal = "0;0;0;0;0;"+dmg+";"+spd+";0;0;"+hp+";"+ss+";true";break;
			}
			bossFlag = 0;
		}
		return retVal;
	},
	"Dark Genie, Yuffeti"(){
		var retVal;
		var ss = "";
		var onetime = false;
		if(((playerStats.monHp/playerStats.monHpMax) <= .8) && bossFlag == 0){
			bossSpecial = true;
			bossFlag = Math.floor(Math.random()*3+1);
			onetime = true;
			switch(bossFlag){
				case(1): ss = "<span style='color:#9500FF'>"+playerStats.monName+"</span> enchants herself to become more swift!";
				playerStats.monName = "Swift Genie, Yuffeti"; break;
				case(2): ss = "<span style='color:#9500FF'>"+playerStats.monName+"</span> becomes filled with rage!";
				playerStats.monName = "Enraged Genie, Yuffeti"; break;
				case(3): ss = "<span style='color:#9500FF'>"+playerStats.monName+"</span> surrounds herself with protective magic!";
				playerStats.monName = "Durable Genie, Yuffeti"; break;
			}
		}
		if(((playerStats.monHp/playerStats.monHpMax) <= .5) && bossFlag  < 4){
			bossSpecial = true;
			bossFlag = Math.floor(Math.random()*3+4);
			onetime = true;
			switch(bossFlag){
				case(4): ss = "<span style='color:#9500FF'>"+playerStats.monName+"</span> shapeshifts into a monkey!";
				playerStats.monName = "Yuffeti, the Savage Monkey"; 
				playerStats.monSwing = "swipes"; break;
				case(5): ss = "<span style='color:#9500FF'>"+playerStats.monName+"</span> transforms into a snake!";
				playerStats.monName = "Slithering Strangler, Yuffeti"; 
				playerStats.monSwing = "bites"; break;
				case(6): ss = "<span style='color:#9500FF'>"+playerStats.monName+"</span> morphs into an elephant!";
				playerStats.monName = "Yuffeti the Trampler"; 
				playerStats.monSwing = "stomps"; break;
			}
		}
		if(((playerStats.monHp/playerStats.monHpMax) <= .3) && bossFlag < 7){
			bossSpecial = true;
			bossFlag = 7
			onetime = true;
			ss = "<span style='color:#9500FF'>"+playerStats.monName+"</span> consumes the pure darkness from the universe!";
			playerStats.monName = "Yuffeti, Ascended Dark Genie"; 
			playerStats.monSwing = "snaps her fingers";
		}
		if(!onetime){
			if(bossFlag > 0){
				switch(bossFlag){
					case(1): var spd = playerStats.monSpd * .4; spd = spd>0?spd:1; 
					var dmg = playerStats.monDmg * .2; dmg = dmg>0?dmg:1;
					dmg = Math.round(dmg) * -1;
					spd = Math.round(spd);
					retVal = "0;0;0;0;0;"+dmg+";"+spd+";0;0;0;"+ss+";true"; break;
					case(2):var dmg = playerStats.monDmg * .35; dmg = dmg>0?dmg:1; 
					dmg = Math.round(dmg);
					retVal = "0;0;0;0;0;"+dmg+";0;0;0;0;"+ss+";true"; break;
					case(3):var dmg = playerStats.monArmor * .4; dmg = dmg>0?dmg:1; 
					dmg = Math.round(dmg);
					var dmg2 = playerStats.monResist * .4; dmg2 = dmg2>0?dmg2:1; 
					dmg2 = Math.round(dmg2);
					retVal = "0;0;0;0;0;0;0;"+dmg+";"+dmg2+";0;"+ss+";true"; break;
					case(4):var spd = playerStats.monSpd * .4; spd = spd>0?spd:1; 
					var dmg = playerStats.monResist * .35; dmg = dmg>0?dmg:1;
					spd = Math.round(spd);
					dmg = Math.round(dmg);
					retVal = "0;0;0;0;0;0;"+spd+";0;"+dmg+";0;"+ss+";true"; break;
					case(5):var spd = playerStats.monSpd * .35; spd = spd>0?spd:1; 
					var dmg = playerStats.monDmg * .35; dmg = dmg>0?dmg:1;
					spd = Math.round(spd);
					dmg = Math.round(dmg);
					retVal = "0;0;0;0;0;"+dmg+";"+spd+";0;0;0;"+ss+";true"; break;
					case(6):
					var spd = playerStats.monArmor * .35; spd = spd>0?spd:1; 
					spd = Math.round(spd);
					var dmg = playerStats.monDmg * .35; dmg = dmg>0?dmg:1;
					dmg = Math.round(dmg);
					retVal = "0;0;0;0;0;"+dmg+";0;"+spd+";0;0;"+ss+";true"; break;
					case(7):
					var spd = playerStats.monArmor * .5; spd = spd>0?spd:1; 
					var spd2 = playerStats.monSpd * .3; spd2 = spd2>0?spd2:1; 
					var dmg = playerStats.monDmg * .3; dmg = dmg>0?dmg:1;
					var dmg2 = playerStats.monResist * .5; dmg2 = dmg2>0?dmg2:1; 
					spd = Math.round(spd);
					dmg = Math.round(dmg);
					spd2 = Math.round(spd2);
					dmg2 = Math.round(dmg2);
					retVal = "0;0;0;0;0;"+dmg+";"+spd2+";"+spd+";"+dmg2+";0;"+ss+";true"; break;
				}
				bossSpecial = true;
			}
		}
		else{
			var dmg = playerStats.monDmg * -1;
			retVal = "0;0;0;0;0;"+dmg+";0;0;0;0;"+ss+";false";
		}
		return retVal;
	},
}

/*
"Dark Genie, Yuffeti;9.8;2.2;.5;.45;.2;15", */