#!/usr/bin/env node

const PROVERBS = [
  { romanized:"Neem hakeem khatrae jaan", urdu:"نیم حکیم خطرائے جان", english:"A little knowledge is a dangerous thing", type:"kahawat", category:"wisdom", example:"He tried to fix the wiring himself — neem hakeem khatrae jaan!" },
  { romanized:"Dhobi ka kutta na ghar ka na ghaat ka", urdu:"دھوبی کا کتا نہ گھر کا نہ گھاٹ کا", english:"Belonging to neither place — caught between two worlds", type:"kahawat", category:"fate", example:"After moving abroad, he felt like dhobi ka kutta." },
  { romanized:"Bandar kya jaane adrak ka swad", urdu:"بندر کیا جانے ادرک کا سواد", english:"A monkey doesn't know the taste of ginger — pearls before swine", type:"kahawat", category:"foolishness", example:"Showing him fine art is like bandar kya jaane adrak ka swad." },
  { romanized:"Oont ke munh mein zeera", urdu:"اونٹ کے منہ میں زیرا", english:"A drop in the ocean — too little for the need", type:"kahawat", category:"wisdom", example:"Giving him 100 rupees for the wedding? Oont ke munh mein zeera." },
  { romanized:"Aam ke aam guthliyon ke daam", urdu:"آم کے آم گٹھلیوں کے دام", english:"Double benefit — having your cake and eating it too", type:"kahawat", category:"wisdom", example:"He sold the milk and kept the cream — aam ke aam guthliyon ke daam." },
  { romanized:"Jaise ko taisa", urdu:"جیسے کو تیسا", english:"Tit for tat — what goes around comes around", type:"kahawat", category:"fate", example:"He cheated everyone, then got cheated himself. Jaise ko taisa." },
  { romanized:"Girti deewar ko dhakka dena", urdu:"گرتی دیوار کو دھکا دینا", english:"To push a falling wall — kick someone when they're down", type:"muhavara", category:"wisdom", example:"Don't give him more bad news now — girti deewar ko dhakka mat do." },
  { romanized:"Jal bin machli nritya bin bijli", urdu:"جل بن مچھلی نرتیہ بن بجلی", english:"Fish without water, dance without lightning — helpless without essentials", type:"kahawat", category:"fate", example:"Without internet, the developer was jal bin machli." },
  { romanized:"Boond boond se sagar banta hai", urdu:"بوند بوند سے ساگر بنتا ہے", english:"Drop by drop the ocean is formed — every little bit counts", type:"kahawat", category:"hard-work", example:"Save daily, even small amounts. Boond boond se sagar banta hai." },
  { romanized:"Kar bhala ho bhala", urdu:"کر بھلا ہو بھلا", english:"Do good, receive good", type:"kahawat", category:"honesty", example:"Help others without expecting return — kar bhala ho bhala." },
  { romanized:"Nek naam marna", urdu:"نیک نام مرنا", english:"To die with a good name — leave a good legacy", type:"muhavara", category:"honesty", example:"His grandfather left nothing but nek naam." },
  { romanized:"Daal mein kuch kaala hai", urdu:"دال میں کچھ کالا ہے", english:"Something fishy — something is not right", type:"muhavara", category:"wisdom", example:"He's being too nice. Daal mein kuch kaala hai." },
  { romanized:"Chor ki daadhi mein tinka", urdu:"چور کی داڑھی میں تنکا", english:"A guilty conscience needs no accuser", type:"kahawat", category:"honesty", example:"He got nervous when police walked by — chor ki daadhi mein tinka." },
  { romanized:"Ab pachtaye hot kya jab chidiya chug gayi khet", urdu:"اب پچھتائے ہوت کیا جب چڑیا چگ گئی کھیت", english:"No use crying over spilled milk", type:"kahawat", category:"wisdom", example:"You should have studied earlier. Ab pachtaye hot kya." },
  { romanized:"Haathi ke daant khaane ke aur dikhane ke aur", urdu:"ہاتھی کے دانت کھانے کے اور دکھانے کے اور", english:"Appearances are deceptive — one thing shown, another done", type:"kahawat", category:"appearance", example:"He acts generous but never pays. Haathi ke daant." },
  { romanized:"Aankhon ka tara", urdu:"آنکھوں کا تارا", english:"Apple of one's eye — dearly beloved", type:"muhavara", category:"family", example:"Her youngest child is aankhon ka tara." },
  { romanized:"Naach na jaane aangan tedha", urdu:"ناچ نہ جانے آنگن ٹیڑھا", english:"A bad workman blames his tools", type:"kahawat", category:"foolishness", example:"He can't code and blames the IDE — naach na jaane aangan tedha." },
  { romanized:"Ghee seedhi ungli se nahi nikalta", urdu:"گھی سیدھی انگلی سے نہیں نکلتا", english:"You can't get things done by being straightforward with crooked people", type:"kahawat", category:"wisdom", example:"You need to be firm with the contractor — ghee seedhi ungli se nahi nikalta." },
  { romanized:"Jab tak hai jaan tab tak hai shaan", urdu:"جب تک ہے جان تب تک ہے شان", english:"While there's life, there's hope and dignity", type:"kahawat", category:"wisdom", example:"Don't give up. Jab tak hai jaan tab tak hai shaan." },
  { romanized:"Khoda pahaad nikli chuhiya", urdu:"کھودا پہاڑ نکلی چوہیا", english:"Much ado about nothing — mountain labored and brought forth a mouse", type:"kahawat", category:"foolishness", example:"After months of preparation, the event was a flop. Khoda pahaad nikli chuhiya." },
  { romanized:"Andher nagri chaupat raja", urdu:"اندھیر نگری چوپٹ راجا", english:"A lawless land with a foolish ruler — total chaos", type:"kahawat", category:"foolishness", example:"No rules, no accountability — andher nagri chaupat raja." },
  { romanized:"Chaadar dekh kar paon phelaao", urdu:"چادر دیکھ کر پاؤں پھیلاؤ", english:"Cut your coat according to your cloth — live within your means", type:"kahawat", category:"wisdom", example:"Don't buy a luxury car on loan. Chaadar dekh kar paon phelaao." },
  { romanized:"Jaisi karni waisi bharni", urdu:"جیسی کرنی ویسی بھرنی", english:"As you sow, so shall you reap", type:"kahawat", category:"fate", example:"He never helped anyone, now nobody helps him. Jaisi karni waisi bharni." },
  { romanized:"Aankh ka andha gaanth ka poora", urdu:"آنکھ کا اندھا گانٹھ کا پورا", english:"Foolish but rich", type:"kahawat", category:"foolishness", example:"He has money but no sense — aankh ka andha gaanth ka poora." },
  { romanized:"Thoothay ka moonh koi nahi dekhta", urdu:"ٹوٹے کا منہ کوئی نہیں دیکھتا", english:"A broken vessel has no face — nobody respects the broken", type:"kahawat", category:"appearance", example:"After bankruptcy, his friends vanished. Thoothay ka moonh koi nahi dekhta." },
  { romanized:"Aap bhalae toh jag bhala", urdu:"آپ بھلے تو جگ بھلا", english:"If you're good, the world is good — see good in others", type:"kahawat", category:"honesty", example:"She always finds good in people — aap bhalae toh jag bhala." },
  { romanized:"Maar ke aage bhoot bhi bhagte hain", urdu:"مار کے آگے بھوت بھی بھاگتے ہیں", english:"Even ghosts run from a beating — action gets results", type:"kahawat", category:"hard-work", example:"Strict deadlines work. Maar ke aage bhoot bhi bhagte hain." },
  { romanized:"Sab se bura haal be-rozgar ka", urdu:"سب سے برا حال بے روزگار کا", english:"The worst condition is that of the unemployed", type:"kahawat", category:"hard-work", example:"He understands now — sab se bura haal be-rozgar ka." },
  { romanized:"Qatre qatre se darya banta hai", urdu:"قطرے قطرے سے دریا بنتا ہے", english:"Drop by drop a river forms — small efforts add up", type:"kahawat", category:"hard-work", example:"Keep learning daily. Qatre qatre se darya banta hai." },
  { romanized:"Nazar ka nasha", urdu:"نظر کا نشہ", english:"Intoxication of the gaze — being mesmerized by beauty", type:"muhavara", category:"appearance", example:"He couldn't look away — nazar ka nasha chadh gaya." },
  { romanized:"Chor machaye shor", urdu:"چور مچائے شور", english:"The thief raises the alarm — the guilty one accuses others first", type:"kahawat", category:"honesty", example:"He blamed everyone else for the missing money. Chor machaye shor." },
  { romanized:"Billi ke sapne mein chuhiya", urdu:"بلی کے سپنے میں چوہیا", english:"A cat dreams of mice — you dream of what you desire", type:"kahawat", category:"animals", example:"Of course the foodie is dreaming about biryani. Billi ke sapne mein chuhiya." },
  { romanized:"Ata gili karna", urdu:"آٹا گیلا کرنا", english:"To waste resources — spoil the flour by wetting it", type:"muhavara", category:"greed", example:"He invested in scams and ata gili kar diya." },
  { romanized:"Do number ka kaam", urdu:"دو نمبر کا کام", english:"Shady/dishonest work", type:"muhavara", category:"honesty", example:"Stay away from do number ka kaam." },
  { romanized:"Zuban pe laga rakhna", urdu:"زبان پہ لگا رکھنا", english:"To keep repeating something constantly", type:"muhavara", category:"wisdom", example:"He has this excuse zuban pe laga rakha hai." },
  { romanized:"Pehle tolo phir bolo", urdu:"پہلے تولو پھر بولو", english:"Think before you speak — weigh your words first", type:"kahawat", category:"wisdom", example:"That comment was rude — pehle tolo phir bolo." },
  { romanized:"Ghar ki murgi daal barabar", urdu:"گھر کی مرغی دال برابر", english:"Familiarity breeds contempt — homegrown talent is undervalued", type:"kahawat", category:"family", example:"They hired from outside while ignoring local talent. Ghar ki murgi daal barabar." },
  { romanized:"Khali dimaag shaitaan ka ghar", urdu:"خالی دماغ شیطان کا گھر", english:"An idle mind is the devil's workshop", type:"kahawat", category:"wisdom", example:"Keep the kids busy — khali dimaag shaitaan ka ghar." },
  { romanized:"Honth ulatna", urdu:"ہونٹ الٹنا", english:"To sulk or pout in displeasure", type:"muhavara", category:"family", example:"When she didn't get the toy, she started honth ulatna." },
  { romanized:"Aag lagana", urdu:"آگ لگانا", english:"To instigate trouble — to stir the pot", type:"muhavara", category:"wisdom", example:"He came and aag laga di between the two friends." },
  { romanized:"Doodh ka jala chhaachh bhi phook phook kar peeta hai", urdu:"دودھ کا جلا چھاچھ بھی پھونک پھونک کر پیتا ہے", english:"Once bitten, twice shy — burned by milk, one blows on buttermilk too", type:"kahawat", category:"wisdom", example:"After the scam, he verifies everything. Doodh ka jala." },
  { romanized:"Jahan chah wahan raah", urdu:"جہاں چاہ وہاں راہ", english:"Where there's a will, there's a way", type:"kahawat", category:"hard-work", example:"Despite all odds he succeeded. Jahan chah wahan raah." },
  { romanized:"Hatheli par sarson ugaana", urdu:"ہتھیلی پر سرسوں اگانا", english:"To accomplish the impossible", type:"muhavara", category:"hard-work", example:"Building a startup from nothing? He hatheli par sarson uga di." },
  { romanized:"Angoor khatte hain", urdu:"انگور کھٹے ہیں", english:"Sour grapes — dismissing what you can't have", type:"muhavara", category:"greed", example:"He says the job wasn't good anyway — angoor khatte hain." },
  { romanized:"Taaleem baap ka sarmaya", urdu:"تعلیم باپ کا سرمایہ", english:"Education is a father's true wealth", type:"kahawat", category:"wisdom", example:"Invest in your children's education — taaleem baap ka sarmaya." },
  { romanized:"Laton ke bhoot baaton se nahi maante", urdu:"لاتوں کے بھوت باتوں سے نہیں مانتے", english:"Some people only understand force, not words", type:"kahawat", category:"hard-work", example:"Polite requests didn't work — laton ke bhoot baaton se nahi maante." },
  { romanized:"Dil ke armaan aansuon mein beh gaye", urdu:"دل کے ارمان آنسوؤں میں بہہ گئے", english:"Heart's desires were washed away in tears", type:"kahawat", category:"fate", example:"His dreams of going abroad remained unfulfilled. Dil ke armaan aansuon mein beh gaye." },
  { romanized:"Bari baat na bolo chhoti baat na tolo", urdu:"بڑی بات نہ بولو چھوٹی بات نہ تولو", english:"Don't boast about big things, don't measure small things", type:"kahawat", category:"wisdom", example:"Be humble and generous — bari baat na bolo." },
  { romanized:"Nau sau chuhe khaa kar billi hajj ko chali", urdu:"نو سو چوہے کھا کر بلی حج کو چلی", english:"After eating 900 mice, the cat goes on pilgrimage — sudden piety after a lifetime of sin", type:"kahawat", category:"honesty", example:"Now he donates after years of corruption. Nau sau chuhe kha kar billi hajj ko chali." },
  { romanized:"Jungle mein mor nacha kisne dekha", urdu:"جنگل میں مور ناچا کس نے دیکھا", english:"A peacock danced in the forest — who saw? Talent is wasted without an audience", type:"kahawat", category:"fate", example:"Your skills need exposure. Jungle mein mor nacha kisne dekha." },
  { romanized:"Bhains ke aage been bajana", urdu:"بھینس کے آگے بین بجانا", english:"Playing a flute before a buffalo — wasting effort on the unappreciative", type:"kahawat", category:"foolishness", example:"Explaining art to him is bhains ke aage been bajana." },
  { romanized:"Ek anar sau bimaar", urdu:"ایک انار سو بیمار", english:"One pomegranate, a hundred sick — too little for too many", type:"kahawat", category:"wisdom", example:"Only 5 seats for 200 applicants — ek anar sau bimaar." },
  { romanized:"Ulta chor kotwal ko daante", urdu:"الٹا چور کوتوال کو ڈانٹے", english:"The thief scolds the policeman — the guilty one accusing the innocent", type:"kahawat", category:"honesty", example:"He stole and then blamed the security guard. Ulta chor kotwal ko daante." },
  { romanized:"Toot kar girna", urdu:"ٹوٹ کر گرنا", english:"To fall apart completely — to be devastated", type:"muhavara", category:"fate", example:"After the loss, he toot kar gir gaya." },
  { romanized:"Dosti mein kami aana", urdu:"دوستی میں کمی آنا", english:"A crack appearing in friendship", type:"muhavara", category:"friendship", example:"Money matters caused dosti mein kami." },
  { romanized:"Yaar ki yari mein kami nahi aani chahiye", urdu:"یار کی یاری میں کمی نہیں آنی چاہیے", english:"True friendship should never diminish", type:"kahawat", category:"friendship", example:"Despite distance, yaar ki yari mein kami nahi aani chahiye." },
  { romanized:"Bin maange moti mile maange mile na bhikh", urdu:"بن مانگے موتی ملے مانگے ملے نہ بھیکھ", english:"Unsought you get pearls, when you beg you don't even get alms — don't be desperate", type:"kahawat", category:"fate", example:"The job offer came when he stopped looking. Bin maange moti mile." },
  { romanized:"Jo garajte hain woh baraste nahi", urdu:"جو گرجتے ہیں وہ برستے نہیں", english:"Those who thunder don't rain — barking dogs seldom bite", type:"kahawat", category:"appearance", example:"He threatens a lot but never acts. Jo garajte hain woh baraste nahi." },
  { romanized:"Kali ko aag nahi jalati", urdu:"کلی کو آگ نہیں جلاتی", english:"A bud is not burned by fire — the innocent are protected", type:"kahawat", category:"honesty", example:"Children survived the ordeal unharmed. Kali ko aag nahi jalati." },
  { romanized:"Gur khaye gulgulay se parhaiz", urdu:"گڑ کھائے گلگلے سے پرہیز", english:"Eats jaggery but avoids sweets — hypocritical avoidance", type:"kahawat", category:"honesty", example:"He drinks cola but won't eat sugar. Gur khaye gulgulay se parhaiz." },
  { romanized:"Chhoti muh bari baat", urdu:"چھوٹی منہ بڑی بات", english:"Big words from a small mouth — speaking above one's station", type:"muhavara", category:"appearance", example:"A junior lecturing the CEO — chhoti muh bari baat." },
  { romanized:"Jaane wale ko kaun rok sakta hai", urdu:"جانے والے کو کون روک سکتا ہے", english:"Who can stop the one who is destined to leave?", type:"kahawat", category:"fate", example:"He was determined to emigrate. Jaane wale ko kaun rok sakta hai." },
  { romanized:"Sasti cheez mein jaan nahi hoti", urdu:"سستی چیز میں جان نہیں ہوتی", english:"Cheap things lack quality", type:"kahawat", category:"wisdom", example:"The cheap phone broke in a week. Sasti cheez mein jaan nahi hoti." },
  { romanized:"Pet mein daadhi", urdu:"پیٹ میں داڑھی", english:"Beard in the belly — outwardly young but inwardly cunning/mature", type:"muhavara", category:"appearance", example:"Don't be fooled by his age — pet mein daadhi hai." },
  { romanized:"Andhon mein kaana raja", urdu:"اندھوں میں کانا راجا", english:"In the land of the blind, the one-eyed is king", type:"kahawat", category:"wisdom", example:"He's not great but better than the rest. Andhon mein kaana raja." },
  { romanized:"Paraye dhan par haath mat rakhna", urdu:"پرائے دھن پر ہاتھ مت رکھنا", english:"Don't put your hand on others' wealth", type:"kahawat", category:"honesty", example:"Paraye dhan par haath mat rakhna — it never ends well." },
  { romanized:"Dimagh kharab hona", urdu:"دماغ خراب ہونا", english:"To lose one's mind — to go crazy", type:"muhavara", category:"foolishness", example:"This traffic has my dimagh kharab." },
  { romanized:"Kaan ka kachcha", urdu:"کان کا کچا", english:"Easily influenced by what one hears — gullible", type:"muhavara", category:"foolishness", example:"Don't tell him rumors, he's kaan ka kachcha." },
  { romanized:"Khoon ka pyaasa", urdu:"خون کا پیاسا", english:"Thirsty for blood — extremely hostile", type:"muhavara", category:"wisdom", example:"The rival team was khoon ka pyaasa after the insult." },
  { romanized:"Munh ki khaana", urdu:"منہ کی کھانا", english:"To eat humble pie — to face defeat or embarrassment", type:"muhavara", category:"fate", example:"He boasted about winning but munh ki kha gaya." },
  { romanized:"Hawa mein baat karna", urdu:"ہوا میں بات کرنا", english:"Talking in the air — talking nonsense or vaguely", type:"muhavara", category:"foolishness", example:"Stop hawa mein baat karna and show me proof." },
  { romanized:"Ghutne tekna", urdu:"گھٹنے ٹیکنا", english:"To kneel — to surrender or give up", type:"muhavara", category:"fate", example:"After months of fighting, the company ghutne tek diye." },
  { romanized:"Teer kamaan se nikal chuka hai", urdu:"تیر کمان سے نکل چکا ہے", english:"The arrow has left the bow — what's done is done", type:"kahawat", category:"fate", example:"The email is sent. Teer kamaan se nikal chuka hai." },
  { romanized:"Haath kangaan ko aarsi kya", urdu:"ہاتھ کنگن کو آرسی کیا", english:"You don't need a mirror to see a bracelet on your hand — the evidence is obvious", type:"kahawat", category:"wisdom", example:"The results speak for themselves. Haath kangaan ko aarsi kya." },
  { romanized:"Daal roti khaana", urdu:"دال روٹی کھانا", english:"To eat dal roti — to live simply/humbly", type:"muhavara", category:"food", example:"We're not rich, just daal roti khate hain." },
  { romanized:"Roti kamaana", urdu:"روٹی کمانا", english:"To earn one's bread — to make a living", type:"muhavara", category:"hard-work", example:"Everyone has to roti kamaani hoti hai." },
  { romanized:"Sabar ka phal meetha hota hai", urdu:"صبر کا پھل میٹھا ہوتا ہے", english:"The fruit of patience is sweet — patience pays off", type:"kahawat", category:"patience", example:"Wait for the right opportunity. Sabar ka phal meetha hota hai." },
  { romanized:"Sabr karo, Allah tumhe ajar dega", urdu:"صبر کرو اللہ تمہیں اجر دے گا", english:"Be patient, Allah will reward you", type:"kahawat", category:"patience", example:"During hardship: sabr karo, Allah tumhe ajar dega." },
  { romanized:"Jaldi ka kaam shaitaan ka", urdu:"جلدی کا کام شیطان کا", english:"Haste is the devil's work — haste makes waste", type:"kahawat", category:"patience", example:"Don't rush the decision. Jaldi ka kaam shaitaan ka." },
  { romanized:"Aadhi choriye saari dijiye", urdu:"آدھی چھوڑیے ساری دیجیے", english:"Leave half, give all — be generous", type:"kahawat", category:"wisdom", example:"In charity, aadhi choriye saari dijiye." },
  { romanized:"Dushman ki dushmani se dost ki dosti bhali", urdu:"دشمن کی دشمنی سے دوست کی دوستی بھلی", english:"A friend's friendship is better than an enemy's enmity", type:"kahawat", category:"friendship", example:"Make allies, not enemies. Dost ki dosti bhali." },
  { romanized:"Apna haath jagannath", urdu:"اپنا ہاتھ جگن ناتھ", english:"Self-help is the best help — rely on yourself", type:"kahawat", category:"hard-work", example:"Don't wait for others. Apna haath jagannath." },
  { romanized:"Koi nahi apna paraya", urdu:"کوئی نہیں اپنا پرایا", english:"Nobody is truly one's own or a stranger", type:"kahawat", category:"family", example:"In tough times you learn who's real. Koi nahi apna paraya." },
  { romanized:"Loha lohe ko kaatta hai", urdu:"لوہا لوہے کو کاٹتا ہے", english:"Iron cuts iron — fight fire with fire", type:"kahawat", category:"wisdom", example:"Set a thief to catch a thief. Loha lohe ko kaatta hai." },
  { romanized:"Maan ki dua jannat ki hawa", urdu:"ماں کی دعا جنت کی ہوا", english:"A mother's prayer is the breeze of paradise", type:"kahawat", category:"family", example:"Never disrespect your mother. Maan ki dua jannat ki hawa." },
  { romanized:"Beta tera, karz mera?", urdu:"بیٹا تیرا قرض میرا؟", english:"Your son, my debt? — it's not my responsibility", type:"kahawat", category:"family", example:"Why should I pay for his mistake? Beta tera karz mera?" },
  { romanized:"Lalach buri bala hai", urdu:"لالچ بری بلا ہے", english:"Greed is a terrible curse", type:"kahawat", category:"greed", example:"He lost everything in the scam. Lalach buri bala hai." },
  { romanized:"Daulat aaye toh doston ki kami nahi", urdu:"دولت آئے تو دوستوں کی کمی نہیں", english:"With wealth come friends — money attracts people", type:"kahawat", category:"greed", example:"Everyone wants to know the lottery winner. Daulat aaye toh doston ki kami nahi." },
  { romanized:"Kutta bhi apni gali mein sher hota hai", urdu:"کتا بھی اپنی گلی میں شیر ہوتا ہے", english:"Even a dog is a lion in his own street — home advantage", type:"kahawat", category:"animals", example:"He's brave only in his neighborhood. Kutta bhi apni gali mein sher." },
  { romanized:"Bail mujhe maar", urdu:"بیل مجھے مار", english:"Asking for trouble — inviting disaster", type:"muhavara", category:"foolishness", example:"Picking a fight with the boss is bail mujhe maar." },
  { romanized:"Bagal mein churi munh mein raam raam", urdu:"بغل میں چھری منہ میں رام رام", english:"Dagger under the arm, prayers on the lips — a wolf in sheep's clothing", type:"kahawat", category:"honesty", example:"He smiles but plots behind your back. Bagal mein churi." },
  { romanized:"Neki kar darya mein daal", urdu:"نیکی کر دریا میں ڈال", english:"Do good and throw it in the river — do good without expecting return", type:"kahawat", category:"honesty", example:"Help people and move on. Neki kar darya mein daal." },
  { romanized:"Chand pe thookna", urdu:"چاند پہ تھوکنا", english:"Spitting at the moon — futile criticism that falls back on you", type:"muhavara", category:"foolishness", example:"Criticizing the teacher publicly? Chand pe thookna hai." },
  { romanized:"Jis ki laathi us ki bhains", urdu:"جس کی لاٹھی اس کی بھینس", english:"He who has the stick has the buffalo — might is right", type:"kahawat", category:"wisdom", example:"In this office, the boss always wins. Jis ki laathi us ki bhains." },
  { romanized:"Khuda ke ghar der hai andher nahi", urdu:"خدا کے گھر دیر ہے اندھیر نہیں", english:"God's court has delay but no darkness — justice may be delayed but not denied", type:"kahawat", category:"fate", example:"He will face consequences eventually. Khuda ke ghar der hai andher nahi." },
  { romanized:"Garajne wale baras nahi sakta", urdu:"گرجنے والے برس نہیں سکتا", english:"Those who thunder cannot rain — more bark than bite", type:"kahawat", category:"appearance", example:"His threats are empty. Garajne wale baras nahi sakta." },
  { romanized:"Aaj ka kaam kal par mat chhodo", urdu:"آج کا کام کل پر مت چھوڑو", english:"Don't leave today's work for tomorrow — don't procrastinate", type:"kahawat", category:"hard-work", example:"Finish the report now. Aaj ka kaam kal par mat chhodo." },
  { romanized:"Uut patang hona", urdu:"اوٹ پٹانگ ہونا", english:"To be absurd or nonsensical", type:"muhavara", category:"foolishness", example:"His business plan was completely uut patang." },
  { romanized:"Nau do gyarah hona", urdu:"نو دو گیارہ ہونا", english:"To run away — to vanish (9+2=11, implying running on two legs)", type:"muhavara", category:"wisdom", example:"When trouble came, he nau do gyarah ho gaya." },
  { romanized:"Aag babula hona", urdu:"آگ ببولا ہونا", english:"To become furious — to explode with anger", type:"muhavara", category:"wisdom", example:"Boss aag babula ho gaya when he saw the report." },
  { romanized:"Chatni mein namak", urdu:"چٹنی میں نمک", english:"A small addition that makes a big difference", type:"muhavara", category:"food", example:"Her jokes were chatni mein namak for the party." },
  { romanized:"Doosron ki thali mein ghee zyada dikhta hai", urdu:"دوسروں کی تھالی میں گھی زیادہ دکھتا ہے", english:"The grass is always greener on the other side", type:"kahawat", category:"greed", example:"You think his life is better? Doosron ki thali mein ghee zyada dikhta hai." },
  { romanized:"Roti tukda na milna", urdu:"روٹی ٹکڑا نہ ملنا", english:"Not getting even a piece of bread — extreme poverty or deprivation", type:"muhavara", category:"food", example:"After losing the job, roti tukda bhi mushkil ho gaya." },
  { romanized:"Pet puja", urdu:"پیٹ پوجا", english:"Worshipping the stomach — living only to eat", type:"muhavara", category:"food", example:"All he thinks about is the next meal. Bas pet puja." },
  { romanized:"Gadhay ko baap banana", urdu:"گدھے کو باپ بنانا", english:"Making a donkey one's father — desperately flattering the unworthy", type:"muhavara", category:"animals", example:"For the promotion, he's gadhay ko baap bana raha hai." },
  { romanized:"Bandar ke haath mein nariyal", urdu:"بندر کے ہاتھ میں ناریل", english:"A coconut in a monkey's hands — a valuable thing with someone who can't use it", type:"kahawat", category:"animals", example:"Giving him a DSLR camera is bandar ke haath mein nariyal." },
  { romanized:"Kuain mein bhaang padna", urdu:"کنویں میں بھانگ پڑنا", english:"Cannabis fell in the well — everyone's gone mad", type:"muhavara", category:"foolishness", example:"Nobody's working today. Kuain mein bhaang padi hai." },
  { romanized:"Apni apni padi hai", urdu:"اپنی اپنی پڑی ہے", english:"Everyone has their own worries", type:"kahawat", category:"wisdom", example:"Don't expect help — apni apni padi hai sabko." },
  { romanized:"Hawa ke ghode par sawaar hona", urdu:"ہوا کے گھوڑے پر سوار ہونا", english:"Riding the horse of wind — extremely fast or ambitious", type:"muhavara", category:"hard-work", example:"She finished the project so fast, hawa ke ghode par sawaar thi." },
  { romanized:"Chiragh tale andhera", urdu:"چراغ تلے اندھیرا", english:"Darkness under the lamp — corruption or ignorance in the house of the learned", type:"kahawat", category:"honesty", example:"The teacher's own children failed. Chiragh tale andhera." },
  { romanized:"Paisa phenk tamasha dekh", urdu:"پیسہ پھینک تماشا دیکھ", english:"Throw money and watch the show — money makes things happen", type:"kahawat", category:"greed", example:"In Pakistan: paisa phenk tamasha dekh — things only move with money." },
  { romanized:"Thook kar chaatna", urdu:"تھوک کر چاٹنا", english:"To spit and then lick it up — to go back on one's word", type:"muhavara", category:"honesty", example:"He promised then backed out. Thook kar chaat liya." },
  { romanized:"Aik haath se taali nahi bajti", urdu:"ایک ہاتھ سے تالی نہیں بجتی", english:"It takes two to clap — it takes two to quarrel", type:"kahawat", category:"wisdom", example:"Both are to blame. Aik haath se taali nahi bajti." },
  { romanized:"Sher ko sawwa sher milna", urdu:"شیر کو سوا شیر ملنا", english:"A lion meeting a bigger lion — meeting one's match", type:"kahawat", category:"wisdom", example:"The bully finally met his match. Sher ko sawwa sher mil gaya." },
  { romanized:"Tukde tukde karna", urdu:"ٹکڑے ٹکڑے کرنا", english:"To tear to pieces — to destroy completely", type:"muhavara", category:"wisdom", example:"The critic tukde tukde kar diya his argument." },
  { romanized:"Chaalis chor machli ka shorba", urdu:"چالیس چور مچھلی کا شوربا", english:"Forty thieves and fish soup — chaos, everyone grabbing what they can", type:"kahawat", category:"greed", example:"The sale was chaalis chor machli ka shorba — pure chaos." },
  { romanized:"Baarah bajana", urdu:"بارہ بجانا", english:"To strike twelve — to ruin someone or make their life miserable", type:"muhavara", category:"fate", example:"The new policy ne sabke baarah baja diye." },
  { romanized:"Topi udhana", urdu:"ٹوپی اڑانا", english:"To fool someone — to pull the wool over their eyes", type:"muhavara", category:"honesty", example:"The shopkeeper topi udha diya with fake goods." },
  { romanized:"Makkhi par makkhi maarna", urdu:"مکھی پر مکھی مارنا", english:"To copy exactly — to plagiarize blindly", type:"muhavara", category:"foolishness", example:"His entire essay was makkhi par makkhi." },
  { romanized:"Paani paani hona", urdu:"پانی پانی ہونا", english:"To be thoroughly embarrassed — to melt with shame", type:"muhavara", category:"appearance", example:"When caught lying, he paani paani ho gaya." },
  { romanized:"Teer se ziyada nishana lagta hai", urdu:"تیر سے زیادہ نشانہ لگتا ہے", english:"Words hurt more than arrows", type:"kahawat", category:"wisdom", example:"Be careful what you say. Teer se ziyada nishana lagta hai." },
  { romanized:"Ek panth do kaaj", urdu:"ایک پنتھ دو کاج", english:"Two tasks in one journey — killing two birds with one stone", type:"kahawat", category:"wisdom", example:"Meeting the client while visiting the city — ek panth do kaaj." },
  { romanized:"Girgit ki tarah rang badalna", urdu:"گرگٹ کی طرح رنگ بدلنا", english:"Changing colors like a chameleon — being two-faced", type:"muhavara", category:"honesty", example:"You can't trust him — girgit ki tarah rang badalta hai." },
  { romanized:"Der aaye durust aaye", urdu:"دیر آئے درست آئے", english:"Better late than never", type:"kahawat", category:"patience", example:"He finally apologized. Der aaye durust aaye." },
  { romanized:"Zameen par paon nahi lagte", urdu:"زمین پر پاؤں نہیں لگتے", english:"Feet don't touch the ground — overjoyed or extremely arrogant", type:"muhavara", category:"appearance", example:"After the promotion, his zameen par paon nahi lagte." }
];

function parseArgs(args) {
  const flags = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      flags[key] = (i + 1 < args.length && !args[i + 1].startsWith('--')) ? args[++i] : true;
    }
  }
  return flags;
}

function search(flags) {
  const q = (flags.query || '').toLowerCase();
  if (!q) { console.error('Usage: proverbs.mjs search --query "<text>"'); process.exit(1); }
  const results = PROVERBS.filter(p =>
    p.romanized.toLowerCase().includes(q) || p.english.toLowerCase().includes(q) ||
    p.urdu.includes(q) || p.category.includes(q) || p.example.toLowerCase().includes(q)
  );
  console.log(JSON.stringify({ query: q, count: results.length, results }, null, 2));
}

function list(flags) {
  let filtered = PROVERBS;
  if (flags.type) filtered = filtered.filter(p => p.type === flags.type);
  if (flags.category) filtered = filtered.filter(p => p.category === flags.category);
  console.log(JSON.stringify({ count: filtered.length, proverbs: filtered.map(p => ({ romanized: p.romanized, english: p.english, type: p.type, category: p.category })) }, null, 2));
}

function random() {
  const p = PROVERBS[Math.floor(Math.random() * PROVERBS.length)];
  console.log(JSON.stringify(p, null, 2));
}

function categories() {
  const cats = {};
  PROVERBS.forEach(p => { cats[p.category] = (cats[p.category] || 0) + 1; });
  const types = {};
  PROVERBS.forEach(p => { types[p.type] = (types[p.type] || 0) + 1; });
  console.log(JSON.stringify({
    categories: Object.entries(cats).map(([name, count]) => ({ name, count })),
    types: Object.entries(types).map(([name, count]) => ({ name, count })),
    total: PROVERBS.length
  }, null, 2));
}

const [cmd, ...rest] = process.argv.slice(2);
const flags = parseArgs(rest);
const cmds = { search, list, random, categories };
if (!cmds[cmd]) {
  console.error('Usage: proverbs.mjs <search|list|random|categories> [options]');
  process.exit(1);
}
cmds[cmd](flags);
