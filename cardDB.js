var commonCards = [
"1:1:Coin:1:A Common Coin. It provides 1 gold a turn!:gold;1",
"2:2:Flip a Coin:1:Flip a Coin, if it's heads you get 4 gold that turn! The coin is heavier on the tails side...:cgold;4;35",
"3:3:Too Random Coin:1:This coin is way too random. It has a random range of gold based on a random value. Best just get lucky:mgold;1;3",
"4:4:Counterfeit Coin:1:Gain between 0 and 4 gold a turn. It just depends on how perceptive the other party is.:rgold;0;4",
"5:5:Lucky COin:1:Gives up to 3 gold a turn. This value is increased by Luck.:kgold;3",
"6:6:Duplication:1:Duplicate your gold! Has a base of 1 gold a turn. Duplication will try to double the gold until it can't. 50% chance to double with 20% less chance each duplication.:dgold;1;50;.20",
"7:7:Lottery Ticket:1:Generate 2 numbers between 1 and 5. You get gold if there's a match!:lgold;3;5",
"8:8:Tax Collection Coin:1:Increases gold earned per turn based on the number of cards owned.:tgold;3.5;.5",
];
var uncommonCards = [
"9:9:Marty:2:Marty will evalulate your cards that provide gold and make them more valuable. Increases gold gained from cards.:ygold;.03",
"10:10:Cat Food:2:Cat food attracts cats which are a great source of wealth. Gives 1 cat a turn.:cat;1",
"11:11:Cat Nip:2:Easiest way to attract cats since cat food. Has a 30% chance a turn to give up to 4 cats.:ncat;30;4",
"12:12:Box:2:Cats like to hide in boxes but not always! The more boxes you have the more likely you are to catch cats!.:bcat;1",
"13:13:Hair Balls:2:Cats shed hair, you collect hair. You build new cats from hair. Gives cats based on total cat production.:hcat;1",
"14:14:Cages:2:We can use the captured Eagles as cat bait. Gain up to 3 cats a turn, this is increased by the number of Eagles attacking.:ecat;3",
"15:15:Taste for Eagles:2:Once a cat has had Eagle it cannot be stopped. Increases the effectiveness of Cats against Eagles.:tcat;2",



"1:16:Upgraded Coin:2:This coin has been upgraded with the power of gold and magic. It provides 4 gold a turn!:gold;4",
"2:17:Mega Flip Coin:2:Flipping coins infused within itself. When it lands on heads you get 12 gold. It's about equal weight:cgold;12;45",
"3:18:Three Random Coin:2:It's not too random anymore, but it's still pretty high randomness.:mgold;4;4",
"4:19:Golden Penny Slug:2:This baby is worth AT LEAST 15 gold a turn....If you can fool the other person.:rgold;0;15",
"5:20:Irish Mint:2:Luckily, this lucky coin is valued at around 11 gold a turn, depending on your luck.:kgold;11",
"6:21:Mitosis:2:Through sheer will your gold can now undergo Mitosis!. Starting with 2 gold it will duplicate at a 75% chance with 15% less chance each duplication.:dgold;2;75;.15",
"7:22:Bingo:2:Get 5 numbers between 1 and 8, if you match then that's a bingo! You get a bonus if all numbers are the same.:lgold;5;8",
"8:23:Vaccume:2:Suck up all the gold around you and call it 'tax'. It's what everyone else does!:tgold;5.5;.8",
];
var rareCards = [
"1:31:Golden Rare Coin:3:OOOOOOH GOLDEN RAREEEEE COIN! It provides 20 gold a turn!:gold;20",
"2:32:Two Face Coin:3:This coin has heads on both sides! However, it can still fail. When it doesn't you get 45 gold.:cgold;45;55",
"3:33:Unpredictable Coin:3:Who knows what this coin will do? Well it'll give you gold that's for sure!:mgold;8;5",
"4:34:Play Money:3:This money is so realistic you can just play with it without worry about someone noticing. Gives up to 63 gold:rgold;0;63",
"5:35:Lucky Rabbit's Foot:3:This foot is super lucky, you can FEEL the luck pouring out of it.:kgold;47",
"6:36:Quadra Cast Duplication:3:Slow down! This spell is insane, you take 5 gold and double it at an 90% chance with only a 11% less chance each duplication! INSANE!:dgold;5;90;.11",
"7:37:Slots:3:Play the slots and get 8 numbers from 1 to 11, line em up and hit the JACKPOT!:lgold;7;11",
"8:38:Magnetic Armor:3:Gold is magnetic...right? Well let's pretend it is and this armor will suck up gold to you!:tgold;10;.9",
"9:39:Marty's cooler half, Murty:3:Murty does a better job than Marty. He makes gold cards even more valuable.:ygold;.115",

"10:40:Tuna:3:A more refined cat food that will attract more cats. Around 5 a turn.:cat;5",
"11:41:Cat Nip Bush:3:The source of Cat Nip, this bush will bring in up to 20 cats a turn. At around a 40% chance.:ncat;40;20",
"12:42:String:3:Cats love strings more than boxes, get a bunch and you'll have a cat army.:bcat;5",
"13:43:Cat Brushes:3:These things collect cat hair like you wouldn't believe! Gives a large ammount of cats based on total cat production.:hcat;5",
"14:44:Bird Traps:3:Like bear traps but for birds. Can get up to 15 cats a turn but the more Eagles attacking the more you will get.:ecat;15",
"15:45:Blood Craze:3:You know what they say, give a cat an eagle.... It's only a matter of time. Increases Cat effectiveness against Eagles:tcat;10",

"16:46:'Sword':3:Pronounced 'Sword', you can swing it around to cut stuff up. Gives you +1 Strength.:str;1",
"17:47:Bascinet:3:Neat little cap that will offer you some protection. Gives you +1 Stamina.:stam;1",
"18:48:Iron Vest:3:Kind of heavy but durable chestplate. Will provide you with +1 Endurance.:end;1",
"19:49:Pants:3:Every hero needs pants. These are loose fitting and give you +1 Dexterity.:dex;1",
"20:50:Spaulder:3:Some kind of metal that protects your shoulders. But you use the weight to swing harder. Gives +1 Strength.:str;1",
"21:51:Leather Belt:3:Make sure the belt is tight around your waist to maximize your intra-abdominal pressure so you can get +1 Stamina.:stam;1",
"22:52:Stompers:3:STOMP STOMP STOMP. Jump around and stomp the ground. Get +1 Endurance while you're at it.:end;1",
"23:53:Fingerless Gloves:3:Super cool gloves for a super cool person like you. Gives +1 Dexterity from the coolness.:dex;1",
"24:54:Shiney Object:3:This strange little object emits a LOT of light. LIke, really. You feel luckier holding it though. +1 Luck.:luck;1",
];
var fabledCards = [];
var exquisiteCards = [];
var legendaryCards = [];
var illustriousCards = [];
var mythicCards = [];
var exaltedCards = [
"1:100:Exalted golden coin of impeccable wealth:9:This coin is insane! It provides 1,000,000 gold a turn!:gold;1000000"];
var gemCards = [
"16:24:Glasses:10:With these glasses you'll have a better chance at identifying gems that cats bring back!:gem1",
"17:25:Gem Infused Cats:10:These cats can smell gems from miles away! They reduce the number of cats you need to find gems.:gem2",
"18:26:Pillows:10:Cats love pillows and will actively seek them out. Each pillow increases the number of cats you earn!:gem3",
"19:27:Cat Infused Gems:10:These gems are made up of cats! They increase the amount of gold your cats give!:gem4",
"20:28:Gems:10:Gems are worth their weight in gold! So much that they increase the amount of gold you get a turn.:gem5",
"21:29:Anti-Eagle Gun:10:Gems can be used to purchase powerful Anti-Eagle Guns. Reducing the scaling of Eagles.:gem6",
"22:30:Gun:10:Reduces the cost of cards.:gem7",
];
var cardDB = [
commonCards,
uncommonCards,
gemCards,
rareCards,
//fabledCards,
//exquisiteCards,
//legendaryCards,
//illustriousCards,
//mythicCards,
//exaltedCards,
]