#!/usr/bin/env node

const RECIPES = [
  { name: "Chicken Biryani", category: "main-course", servings: 6, prepTime: "30 min", cookTime: "60 min", difficulty: "medium",
    ingredients: ["1 kg chicken pieces","3 cups basmati rice (soaked 30 min)","2 large onions (sliced, fried golden)","1 cup yogurt","2 tomatoes (chopped)","1 tbsp ginger-garlic paste","1 tsp turmeric","1 tsp red chili powder","1 tsp garam masala","1/2 tsp cumin seeds","4 green cardamom","2 bay leaves","4 cloves","1 cinnamon stick","1/2 cup cooking oil","1/4 cup fresh mint leaves","1/4 cup fresh coriander","1 tsp saffron (in 2 tbsp warm milk)","Salt to taste","2 green chilies (slit)"],
    steps: ["Marinate chicken in yogurt, ginger-garlic paste, turmeric, chili powder, salt for 30 minutes","Heat oil, fry onions until golden brown, set half aside for garnish","In same oil, add whole spices (cardamom, bay leaves, cloves, cinnamon)","Add chicken, cook on high heat 5 minutes, add tomatoes, cook until oil separates","Parboil rice in salted water until 70% done, drain","Layer rice over chicken, top with fried onions, mint, coriander, saffron milk, green chilies","Cover tightly, cook on lowest heat (dum) for 25-30 minutes","Rest 5 minutes, gently mix layers before serving"],
    tips: ["Sindhi biryani adds potatoes and more spice; Karachi style uses more tomato and chili"] },
  { name: "Mutton Karahi", category: "main-course", servings: 4, prepTime: "15 min", cookTime: "60 min", difficulty: "medium",
    ingredients: ["1 kg mutton (bone-in)","4 tomatoes (chopped)","1/2 cup cooking oil or ghee","1 tbsp ginger (julienned)","1 tbsp garlic (chopped)","1 tsp red chili powder","1 tsp coriander powder","1/2 tsp cumin powder","1 tsp garam masala","4 green chilies (slit)","Fresh coriander for garnish","Salt to taste"],
    steps: ["Heat oil/ghee in a karahi or wok on high heat","Add mutton, sear for 5 minutes stirring constantly","Add half the ginger and all garlic, cook 2 minutes","Add tomatoes, salt, red chili, coriander powder","Cover, cook on medium-low for 45-50 minutes until mutton tender","Remove lid, increase heat, add cumin, garam masala","Cook until oil separates and gravy thickens","Garnish with remaining ginger, green chilies, fresh coriander"],
    tips: ["Authentic Peshawar karahi uses only tomatoes and salt — no powdered spices"] },
  { name: "Nihari", category: "main-course", servings: 6, prepTime: "20 min", cookTime: "6 hours", difficulty: "hard",
    ingredients: ["1 kg beef shank (bone-in with marrow)","2 large onions (sliced)","1 tbsp ginger-garlic paste","2 tbsp nihari masala","1 tsp red chili powder","1/2 tsp turmeric","2 tbsp wheat flour (roasted in ghee)","1/4 cup ghee or oil","8 cups water","Salt to taste","Garnish: ginger julienne, green chilies, coriander, lemon wedges, fried onions"],
    steps: ["Heat ghee, fry onions until deep golden","Add meat, sear on high heat 5 minutes","Add ginger-garlic paste, all spices, cook 3 minutes","Add water, bring to boil, reduce to lowest simmer","Cook covered for 5-6 hours (or overnight on lowest flame)","Mix roasted wheat flour with water, stir into nihari for thickness","Simmer 30 more minutes, adjust salt","Serve with naan, garnished with ginger, chilies, coriander, lemon"],
    tips: ["Traditional nihari is cooked overnight on the lowest possible flame; a slow cooker works well"] },
  { name: "Haleem", category: "main-course", servings: 8, prepTime: "30 min", cookTime: "4 hours", difficulty: "hard",
    ingredients: ["500g beef or mutton (boneless, cubed)","1/2 cup chana dal","1/2 cup masoor dal","1/4 cup moong dal","1/4 cup wheat (broken)","1/4 cup barley","2 onions (sliced)","1 tbsp ginger-garlic paste","1 tsp red chili powder","1 tsp garam masala","1/2 tsp turmeric","1/4 cup ghee","Salt to taste","Garnish: fried onions, ginger, mint, lemon, green chilies"],
    steps: ["Soak all lentils, wheat, and barley overnight or 4 hours","Boil meat with ginger-garlic paste, turmeric, salt until very tender","Separately boil soaked grains until completely soft and mushy","Combine meat and grains, blend partially (keep some texture)","Heat ghee, fry onions, add chili powder, garam masala","Add to haleem, simmer on low 30 minutes stirring often","Mash with back of ladle until thick porridge consistency","Serve garnished with fried onions, ginger, mint, lemon"],
    tips: ["Haleem improves if refrigerated overnight and reheated — flavors meld"] },
  { name: "Chapli Kebab", category: "main-course", servings: 4, prepTime: "20 min", cookTime: "15 min", difficulty: "easy",
    ingredients: ["500g beef mince","1 onion (finely chopped)","2 tomatoes (finely chopped)","2 green chilies (chopped)","1 tbsp coriander seeds (crushed)","1 tsp cumin seeds","1 tsp red chili flakes","1 egg","2 tbsp corn flour","Fresh coriander (chopped)","Salt to taste","Oil for shallow frying"],
    steps: ["Mix mince with all ingredients except oil","Knead well for 5 minutes until sticky","Divide into 8 portions, flatten into round patties","Heat oil in a flat pan","Fry kebabs 3-4 minutes per side until browned and cooked through","Drain on paper towels","Serve with naan, raita, and salad"],
    tips: ["Authentic Peshawar chapli kebab uses beef tallow for frying"] },
  { name: "Seekh Kebab", category: "main-course", servings: 4, prepTime: "30 min", cookTime: "15 min", difficulty: "medium",
    ingredients: ["500g beef or lamb mince","1 onion (finely grated, squeezed dry)","1 tbsp ginger-garlic paste","2 green chilies (minced)","1 tsp red chili powder","1 tsp cumin powder","1 tsp garam masala","2 tbsp fresh coriander (chopped)","1 tbsp besan (chickpea flour)","1 egg","Salt to taste"],
    steps: ["Combine all ingredients, knead for 5 minutes","Refrigerate 30 minutes for binding","Shape onto metal skewers in long cylinders","Grill on charcoal or cook in oven at 200C for 12-15 minutes","Turn once halfway","Baste with oil if drying out","Serve with mint chutney and naan"],
    tips: ["Add a small piece of raw papaya paste to mince for extra tenderness"] },
  { name: "Dal Chawal", category: "main-course", servings: 4, prepTime: "10 min", cookTime: "30 min", difficulty: "easy",
    ingredients: ["1 cup masoor dal (red lentils)","2 cups water","1 onion (chopped)","2 tomatoes (chopped)","1 tsp ginger-garlic paste","1/2 tsp turmeric","1 tsp red chili powder","1 tsp cumin seeds","2 tbsp oil or ghee","Salt to taste","Fresh coriander for garnish","Tarka: 2 tbsp ghee, 2 cloves garlic sliced, 1 dried red chili"],
    steps: ["Wash dal, boil with water and turmeric until soft (20 min)","Heat oil, add cumin seeds, fry 30 seconds","Add onion, cook until golden","Add ginger-garlic, tomatoes, chili powder, salt","Cook until tomatoes break down","Add boiled dal, simmer 10 minutes","For tarka: heat ghee, fry sliced garlic and dried chili until golden","Pour tarka over dal, garnish with coriander, serve with rice"],
    tips: ["Comfort food staple — can be made with any lentil type"] },
  { name: "Chicken Tikka", category: "main-course", servings: 4, prepTime: "4 hours", cookTime: "15 min", difficulty: "easy",
    ingredients: ["1 kg chicken (boneless, cubed)","1 cup yogurt","1 tbsp ginger-garlic paste","1 tsp red chili powder","1 tsp tikka masala","1/2 tsp turmeric","1 tbsp lemon juice","2 tbsp oil","Salt to taste","Chaat masala for garnish"],
    steps: ["Mix yogurt with all spices, oil, lemon juice","Marinate chicken pieces for minimum 4 hours (overnight best)","Thread onto skewers","Grill on charcoal or bake at 220C for 12-15 minutes","Turn once, baste with remaining marinade","Sprinkle chaat masala and lemon juice before serving"],
    tips: ["For smoky flavor, place a hot charcoal piece in a small bowl in the center of the marinated chicken, add few drops of oil on coal, cover immediately for 2 minutes"] },
  { name: "Aloo Gosht", category: "main-course", servings: 4, prepTime: "15 min", cookTime: "60 min", difficulty: "medium",
    ingredients: ["500g mutton/beef (bone-in)","3 potatoes (quartered)","2 onions (sliced)","2 tomatoes (chopped)","1 tbsp ginger-garlic paste","1 tsp red chili powder","1/2 tsp turmeric","1 tsp coriander powder","1/2 tsp garam masala","1/4 cup oil","Salt to taste","Fresh coriander for garnish"],
    steps: ["Heat oil, fry onions golden","Add meat, sear on high 5 minutes","Add ginger-garlic paste, cook 2 minutes","Add tomatoes, all spices, salt — cook until oil separates","Add 2 cups water, cover, simmer 45 minutes until meat tender","Add potatoes, cook 15 more minutes","Garnish with coriander, serve with roti"],
    tips: ["Add a slit green chili for heat; some add a splash of yogurt for tangier gravy"] },
  { name: "Saag", category: "main-course", servings: 4, prepTime: "20 min", cookTime: "45 min", difficulty: "medium",
    ingredients: ["1 kg fresh spinach (or mustard greens)","1 onion (chopped)","2 tomatoes (chopped)","1 tbsp ginger-garlic paste","2 green chilies","1/2 tsp turmeric","1 tsp red chili powder","2 tbsp ghee or butter","1 tbsp corn flour (mixed in water)","Salt to taste"],
    steps: ["Wash and roughly chop greens","Boil greens with green chilies in minimal water until soft","Blend partially — keep it chunky","Heat ghee, fry onion until golden","Add ginger-garlic paste, tomatoes, spices, cook 5 minutes","Add blended greens, corn flour slurry","Simmer 15 minutes, top with a pat of butter","Serve with makki ki roti or naan"],
    tips: ["Punjabi saag traditionally uses mustard greens (sarson ka saag) with makki ki roti"] },
  { name: "Keema", category: "main-course", servings: 4, prepTime: "10 min", cookTime: "30 min", difficulty: "easy",
    ingredients: ["500g beef mince","1 onion (chopped)","2 tomatoes (chopped)","1 cup peas","1 tbsp ginger-garlic paste","1 tsp red chili powder","1/2 tsp turmeric","1 tsp cumin powder","1/2 tsp garam masala","2 tbsp oil","Salt to taste","Fresh coriander"],
    steps: ["Heat oil, fry onion golden","Add ginger-garlic paste, cook 1 minute","Add mince, break up, cook on high 5 minutes","Add tomatoes, all dry spices, salt","Cook covered on low 15 minutes","Add peas, cook 5 more minutes","Garnish with coriander, serve with naan or paratha"],
    tips: ["Add diced potatoes for keema aloo"] },
  { name: "Pulao", category: "main-course", servings: 4, prepTime: "15 min", cookTime: "25 min", difficulty: "easy",
    ingredients: ["2 cups basmati rice (soaked)","500g chicken or mutton","1 onion (sliced)","1 tbsp ginger-garlic paste","4 cups stock or water","4 green cardamom","2 bay leaves","4 cloves","1 cinnamon stick","1 tsp cumin seeds","2 tbsp oil or ghee","Salt to taste"],
    steps: ["Heat oil, fry onion golden","Add whole spices and cumin, fry 30 seconds","Add meat, sear 5 minutes","Add ginger-garlic paste, cook 2 minutes","Add stock, bring to boil, simmer until meat half tender","Add drained rice, salt — water should be 1 inch above rice","Cook on high until water absorbed, reduce to lowest heat","Cover, steam (dum) 15 minutes, fluff with fork"],
    tips: ["Yakhni pulao uses bone broth for extra flavor"] },
  { name: "Korma", category: "main-course", servings: 4, prepTime: "20 min", cookTime: "60 min", difficulty: "medium",
    ingredients: ["1 kg chicken or mutton","2 onions (sliced, fried golden)","1 cup yogurt","1/2 cup cream","1 tbsp ginger-garlic paste","1 tsp red chili powder","1 tsp coriander powder","1/2 tsp turmeric","1 tsp garam masala","4 green cardamom","2 tbsp ghee","Salt to taste","1 tbsp fried onion paste (blend fried onions)"],
    steps: ["Heat ghee, add cardamom, cook 30 seconds","Add meat, sear on high 5 minutes","Add ginger-garlic paste, cook 2 minutes","Add fried onion paste, yogurt, all dry spices","Cook covered on low 40-50 minutes until tender","Add cream, simmer 5 minutes","Adjust salt, garnish with fried onions"],
    tips: ["Mughlai korma adds almonds and cashew paste for richness"] },
  { name: "Sajji", category: "main-course", servings: 4, prepTime: "30 min", cookTime: "3 hours", difficulty: "hard",
    ingredients: ["1 whole chicken (or leg of lamb)","2 tbsp salt","1 tbsp papaya paste (tenderizer)","1 tsp turmeric","1 cup rice (for stuffing, soaked)","2 tbsp ghee","Skewers or rotisserie"],
    steps: ["Rub chicken/lamb with salt, papaya paste, turmeric","Let rest 30 minutes","Stuff cavity with soaked rice mixed with ghee and salt","Skewer the whole piece","Roast over charcoal pit turning occasionally for 2-3 hours","Meat should be falling off bone, rice cooked from juices","Serve with raita and naan"],
    tips: ["Authentic Balochi sajji is minimally spiced — just salt. The slow roasting does the work."] },
  { name: "Samosa", category: "appetizer", servings: 6, prepTime: "30 min", cookTime: "20 min", difficulty: "medium",
    ingredients: ["For dough: 2 cups flour, 4 tbsp oil, 1/2 tsp salt, water as needed","For filling: 3 potatoes (boiled, mashed), 1 cup peas, 1 onion (chopped), 2 green chilies, 1 tsp cumin, 1 tsp garam masala, 1 tsp amchoor, fresh coriander, salt","Oil for deep frying"],
    steps: ["Make stiff dough with flour, oil, salt, water — rest 20 min","Cook filling: fry onion, add peas, potatoes, all spices, mix well, cool","Roll dough into circles, cut in half","Form cones from semicircles, fill with potato mixture, seal edges with water","Deep fry on medium heat until golden (6-8 minutes)","Drain on paper towels","Serve with imli (tamarind) chutney"],
    tips: ["Fry on medium-low for crispy layers; too hot and outside burns before inside heats"] },
  { name: "Pakora", category: "appetizer", servings: 4, prepTime: "15 min", cookTime: "15 min", difficulty: "easy",
    ingredients: ["1 cup besan (chickpea flour)","1 onion (sliced)","1 potato (thinly sliced)","2 green chilies (chopped)","1/4 cup spinach (chopped)","1/2 tsp red chili powder","1/2 tsp turmeric","1/2 tsp ajwain (carom seeds)","Salt to taste","Water to make thick batter","Oil for deep frying"],
    steps: ["Mix besan with all spices, salt","Add vegetables, mix well","Add water gradually to make thick coating batter","Heat oil for deep frying","Drop spoonfuls into hot oil","Fry until golden and crispy (3-4 minutes)","Drain on paper towels","Serve hot with chutney — essential rainy day snack"],
    tips: ["Add a pinch of baking soda for extra crispiness"] },
  { name: "Chana Chaat", category: "appetizer", servings: 4, prepTime: "15 min", cookTime: "0 min", difficulty: "easy",
    ingredients: ["2 cups boiled chickpeas","1 onion (diced)","1 tomato (diced)","1 cucumber (diced)","2 green chilies (chopped)","1 tbsp lemon juice","1 tsp chaat masala","1/2 tsp cumin powder","1/2 tsp red chili powder","Fresh coriander and mint","Salt to taste","Imli chutney (optional)"],
    steps: ["Combine all ingredients in a bowl","Toss well","Adjust chaat masala and lemon to taste","Serve immediately as a fresh snack"],
    tips: ["Add boiled diced potatoes and pomegranate seeds for extra texture"] },
  { name: "Dahi Bhalla", category: "appetizer", servings: 4, prepTime: "30 min", cookTime: "20 min", difficulty: "medium",
    ingredients: ["1 cup urad dal (soaked 4 hours)","1 cup yogurt (whisked smooth)","Imli chutney","Green chutney","1 tsp roasted cumin powder","1 tsp red chili powder","Chaat masala","Salt to taste","Oil for deep frying"],
    steps: ["Grind soaked dal to smooth paste","Add salt, whip the batter until fluffy","Drop spoonfuls into hot oil, fry until golden","Soak fried bhallas in warm water 20 minutes, squeeze gently","Arrange on plate, pour whisked yogurt over","Drizzle imli and green chutneys","Sprinkle cumin, chili powder, chaat masala"],
    tips: ["Soaking bhallas in warm water makes them soft and spongy"] },
  { name: "Aloo Tikki", category: "appetizer", servings: 4, prepTime: "20 min", cookTime: "15 min", difficulty: "easy",
    ingredients: ["4 potatoes (boiled, mashed)","1 onion (finely chopped)","2 green chilies (minced)","1 tsp cumin powder","1 tsp garam masala","2 tbsp corn flour","Fresh coriander","Salt to taste","Oil for shallow frying"],
    steps: ["Mix mashed potatoes with all ingredients","Shape into flat round patties","Heat oil in a flat pan","Fry tikkis until golden brown on both sides","Serve with yogurt, imli chutney, and chaat masala"],
    tips: ["Stuff with spiced peas or paneer for filling variant"] },
  { name: "Gulab Jamun", category: "dessert", servings: 6, prepTime: "15 min", cookTime: "30 min", difficulty: "medium",
    ingredients: ["1 cup milk powder","1/4 cup flour","1/4 tsp baking soda","2 tbsp ghee","Milk to bind (3-4 tbsp)","Syrup: 2 cups sugar, 1.5 cups water, 4 cardamom, 1 tsp rose water","Oil/ghee for deep frying"],
    steps: ["Make syrup: boil sugar, water, cardamom 10 min, add rose water, keep warm","Mix milk powder, flour, baking soda, ghee","Add milk gradually, make soft sticky dough — do not over-knead","Rest 5 minutes","Roll into smooth balls (no cracks — they'll crack while frying)","Fry on lowest heat until deep brown (8-10 minutes, turn gently)","Drop hot jamuns into warm syrup immediately","Let soak at least 30 minutes before serving"],
    tips: ["Low and slow frying is the key — too hot and they'll be raw inside"] },
  { name: "Kheer", category: "dessert", servings: 6, prepTime: "5 min", cookTime: "45 min", difficulty: "easy",
    ingredients: ["1 liter full cream milk","1/3 cup basmati rice (soaked 30 min)","3/4 cup sugar","4 green cardamom (crushed)","2 tbsp almonds (sliced)","2 tbsp pistachios (sliced)","1 tbsp raisins","1/2 tsp saffron strands (optional)"],
    steps: ["Boil milk in heavy-bottomed pot, stir frequently to prevent burning","Add drained rice, cook on medium-low 30-35 minutes stirring regularly","Milk should reduce by 1/3 and rice be very soft","Add sugar, cardamom, cook 5 more minutes","Add nuts and raisins","Serve warm or chilled — it thickens as it cools"],
    tips: ["Vermicelli kheer (seviyan) replaces rice with roasted thin vermicelli"] },
  { name: "Jalebi", category: "dessert", servings: 6, prepTime: "8 hours", cookTime: "20 min", difficulty: "medium",
    ingredients: ["1 cup flour","2 tbsp besan (chickpea flour)","1/2 tsp baking powder","1 cup warm water","1 tbsp yogurt","Pinch of saffron","Syrup: 1.5 cups sugar, 1 cup water, 1 tsp lemon juice, cardamom","Oil for deep frying"],
    steps: ["Mix flour, besan, baking powder, water, yogurt into smooth batter","Ferment 6-8 hours (or overnight) until bubbly","Make syrup: boil sugar, water, lemon juice until one-string consistency, add cardamom","Heat oil, pour batter from bottle/piping bag in spiral shapes","Fry until crispy and golden on both sides","Dip in warm syrup for 30 seconds","Serve hot and crispy"],
    tips: ["Fermentation is essential for the tangy taste and crispy texture"] },
  { name: "Barfi", category: "dessert", servings: 8, prepTime: "5 min", cookTime: "20 min", difficulty: "easy",
    ingredients: ["2 cups milk powder","1 cup condensed milk","2 tbsp ghee","1/2 tsp cardamom powder","Pistachios and almonds for garnish","Silver leaf (optional)"],
    steps: ["Heat ghee in non-stick pan","Add condensed milk and milk powder","Cook on low heat stirring continuously 10-12 minutes","Mixture will leave sides of pan when ready","Add cardamom, mix well","Pour into greased tray, flatten evenly","Garnish with nuts, press lightly","Let cool completely, cut into diamond shapes"],
    tips: ["Do not overcook — barfi hardens as it cools"] },
  { name: "Ras Malai", category: "dessert", servings: 6, prepTime: "20 min", cookTime: "30 min", difficulty: "medium",
    ingredients: ["For chenna: 1 liter milk, 2 tbsp lemon juice","1 tbsp flour","1 tbsp semolina","Sugar syrup: 2 cups sugar, 4 cups water","Rabri: 1 liter milk, 1/2 cup sugar, 4 cardamom, saffron, pistachios"],
    steps: ["Boil milk, add lemon juice to curdle, strain through cloth","Squeeze dry, knead chenna smooth with flour and semolina (5 min)","Roll into small flat discs","Boil in sugar syrup 15 minutes (they'll double in size)","For rabri: reduce milk to half, add sugar, cardamom, saffron","Squeeze excess syrup from chenna discs","Soak in rabri for at least 2 hours","Serve chilled garnished with pistachios"],
    tips: ["Knead chenna very smooth — graininess means more kneading needed"] },
  { name: "Gajar Ka Halwa", category: "dessert", servings: 6, prepTime: "10 min", cookTime: "45 min", difficulty: "easy",
    ingredients: ["1 kg carrots (grated)","1 liter full cream milk","3/4 cup sugar","4 tbsp ghee","4 green cardamom (crushed)","2 tbsp almonds","2 tbsp cashews","1 tbsp raisins","Khoya/mawa 100g (optional)"],
    steps: ["Cook grated carrots in milk on medium heat, stirring often","Cook until all milk is absorbed (30-35 minutes)","Add ghee, cook 5 minutes","Add sugar, cook until moisture evaporates","Add cardamom, khoya if using","Garnish with nuts","Serve warm"],
    tips: ["Red carrots (desi gajar) give the best color and sweetness — winter specialty"] },
  { name: "Sheer Khurma", category: "dessert", servings: 6, prepTime: "10 min", cookTime: "30 min", difficulty: "easy",
    ingredients: ["1 liter full cream milk","100g fine vermicelli (seviyan)","1/2 cup sugar","3 tbsp ghee","2 tbsp almonds","2 tbsp pistachios","2 tbsp raisins","4-5 dates (chopped)","4 green cardamom (crushed)","1 tbsp rose water"],
    steps: ["Heat ghee, roast vermicelli until golden brown","In a separate pot, boil milk, reduce slightly","Add roasted vermicelli to milk","Cook 10 minutes until vermicelli soft","Add sugar, cardamom, nuts, dates, raisins","Simmer 5 minutes, add rose water","Serve warm — traditional Eid breakfast"],
    tips: ["This is the quintessential Eid ul-Fitr dish served after morning prayers"] },
  { name: "Lassi", category: "beverage", servings: 2, prepTime: "5 min", cookTime: "0 min", difficulty: "easy",
    ingredients: ["2 cups yogurt","1 cup cold water or milk","3 tbsp sugar (or salt for namkeen)","Ice cubes","Pinch of cardamom (for sweet)","Roasted cumin powder (for salty)"],
    steps: ["Blend yogurt, water, sugar/salt until frothy","Add ice, blend briefly","Pour into tall glasses","Garnish: cardamom and cream for sweet, cumin and mint for salty"],
    tips: ["Peshawari lassi is extra thick — less water, more cream"] },
  { name: "Rooh Afza", category: "beverage", servings: 4, prepTime: "5 min", cookTime: "0 min", difficulty: "easy",
    ingredients: ["4 tbsp Rooh Afza syrup","4 cups cold milk or water","Ice cubes","Basil seeds (tukhm malanga) soaked 30 min (optional)","Rose petals for garnish"],
    steps: ["Add Rooh Afza to cold milk or water","Stir well","Add soaked basil seeds if using","Serve over ice","Garnish with rose petals"],
    tips: ["Rooh Afza with milk is called 'doodh soda' at street stalls"] },
  { name: "Kashmiri Chai", category: "beverage", servings: 4, prepTime: "5 min", cookTime: "30 min", difficulty: "medium",
    ingredients: ["2 tbsp Kashmiri tea leaves (green)","1/2 tsp baking soda","4 cups water","2 cups milk","Sugar to taste","Crushed pistachios and almonds","Pinch of salt"],
    steps: ["Boil water with tea leaves and baking soda","Boil vigorously until reduced to 1 cup (deep red color)","Add 1 cup cold water, boil again — repeat 2-3 times (this develops the pink color)","Strain the tea concentrate","Heat milk separately","Mix concentrate with hot milk — it turns pink","Add sugar and salt","Garnish with crushed nuts, serve in cups"],
    tips: ["The repeated boiling with cold water addition is what creates the signature pink color"] },
  { name: "Doodh Patti", category: "beverage", servings: 2, prepTime: "2 min", cookTime: "10 min", difficulty: "easy",
    ingredients: ["2 cups milk","2 tsp loose black tea leaves (Tapal or Lipton)","Sugar to taste","2 green cardamom (optional)"],
    steps: ["Boil milk directly (no water)","Add tea leaves and cardamom","Simmer on low 5-7 minutes until deep brown","Strain into cups","Add sugar to taste"],
    tips: ["True doodh patti uses NO water — pure milk only. Roadside dhaba style."] },
  { name: "Halwa Puri", category: "breakfast", servings: 4, prepTime: "20 min", cookTime: "30 min", difficulty: "medium",
    ingredients: ["Puri: 2 cups flour, 2 tbsp oil, salt, water — stiff dough","Halwa: 1 cup semolina (suji), 1 cup sugar, 2 cups water, 1/2 cup ghee, cardamom, orange food color, nuts","Channay: 2 cups boiled chickpeas, 1 onion, tomato, spices"],
    steps: ["Puri: knead dough, rest 15 min, roll small circles, deep fry until puffed","Halwa: heat ghee, roast suji golden, add sugar-water (carefully!), stir until thick, add color and cardamom","Channay: fry onion, add tomato, spices, boiled chickpeas, cook 10 min","Serve all three together — the classic Sunday breakfast"],
    tips: ["Halwa puri channay is THE Lahori Sunday morning tradition"] },
  { name: "Paratha with Egg", category: "breakfast", servings: 2, prepTime: "10 min", cookTime: "10 min", difficulty: "easy",
    ingredients: ["2 parathas (fresh or frozen)","2 eggs","Salt and pepper","1 tbsp butter or oil","Green chilies (optional)"],
    steps: ["Cook paratha on tawa with oil/butter until golden both sides","Fry or scramble eggs separately with salt, pepper, chilies","Serve paratha with egg, achaar, and chai"],
    tips: ["For anda paratha: spread beaten egg on paratha while cooking on tawa, flip to cook egg side"] },
  { name: "Channay", category: "breakfast", servings: 4, prepTime: "10 min", cookTime: "20 min", difficulty: "easy",
    ingredients: ["2 cups boiled chickpeas","1 onion (chopped)","1 tomato (chopped)","1 tsp ginger (grated)","1 tsp red chili powder","1/2 tsp turmeric","1 tsp coriander powder","1 tsp chana masala","2 tbsp oil","Salt to taste","Fresh coriander, green chilies, lemon"],
    steps: ["Heat oil, fry onion golden","Add ginger, tomato, all spices","Cook until tomatoes soft","Add chickpeas and 1/2 cup water","Simmer 10 minutes, mash some chickpeas for thick gravy","Garnish with coriander, chilies, lemon"],
    tips: ["Serve with puri or kulcha for the full breakfast experience"] },
  { name: "Gol Gappay", category: "street-food", servings: 4, prepTime: "30 min", cookTime: "15 min", difficulty: "medium",
    ingredients: ["Puri: 1 cup semolina, 1/2 cup flour, water — stiff dough","Filling: boiled chickpeas, boiled potato (diced), chaat masala","Pani (water): 1 cup mint, 1/2 cup coriander, 2 green chilies, 1 tbsp tamarind paste, 1 tsp cumin, 1 tsp black salt, cold water, sugar to balance"],
    steps: ["Knead dough, rest 20 min, roll very thin, cut small rounds","Deep fry puris on high heat until puffed and crispy","Blend all pani ingredients with water, strain, chill","To serve: crack top of puri, add filling, dip in pani, eat whole in one bite"],
    tips: ["Also called pani puri or puchka — the pani recipe is what makes or breaks it"] },
  { name: "Bun Kebab", category: "street-food", servings: 4, prepTime: "15 min", cookTime: "15 min", difficulty: "easy",
    ingredients: ["4 burger buns","4 shami kebabs (or aloo tikki)","Chutney: imli + green chutney mixed","1 onion (sliced rings)","Lettuce leaves","Beaten egg for coating bun"],
    steps: ["Toast buns on tawa with butter","Dip bun in beaten egg, cook egg side on tawa until set","Cook shami kebabs on tawa until hot","Assemble: bun, chutney, kebab, onion rings, lettuce, more chutney, top bun","Wrap in paper like street vendors do"],
    tips: ["Karachi bun kebab is THE street food — dipped in egg wash is the authentic way"] },
  { name: "Roll Paratha", category: "street-food", servings: 2, prepTime: "10 min", cookTime: "10 min", difficulty: "easy",
    ingredients: ["2 parathas","Filling options: seekh kebab, chicken tikka, or egg","Onion rings","Green chutney","Lemon juice","Chaat masala"],
    steps: ["Cook paratha golden on tawa","Cook filling (kebab/tikka/scrambled egg)","Place filling in center of paratha","Add onion rings, chutney, squeeze of lemon, chaat masala","Roll tightly, wrap bottom in foil or paper","Serve immediately"],
    tips: ["The Lahori roll paratha stall standard: paratha must be flaky, not soft"] },
  { name: "Dahi Phulki", category: "street-food", servings: 4, prepTime: "20 min", cookTime: "15 min", difficulty: "easy",
    ingredients: ["1 cup besan (chickpea flour)","1/2 tsp baking soda","1/2 tsp turmeric","Water to make batter","2 cups yogurt (whisked smooth)","1 tsp roasted cumin powder","Red chili powder","Chaat masala","Imli chutney","Oil for frying"],
    steps: ["Mix besan, baking soda, turmeric with water — smooth batter","Drop small spoonfuls into hot oil, fry until golden","Soak fried phulkis in warm water 10 minutes","Squeeze gently, arrange on plate","Pour whisked yogurt over generously","Drizzle imli chutney","Sprinkle cumin, chili, chaat masala"],
    tips: ["Lighter and simpler than dahi bhalla — a common home version"] },
  { name: "Raita", category: "condiment", servings: 4, prepTime: "5 min", cookTime: "0 min", difficulty: "easy",
    ingredients: ["2 cups yogurt","1 cucumber (grated, squeezed)","1 onion (finely diced)","1 tomato (diced, optional)","Fresh mint (chopped)","1/2 tsp roasted cumin powder","1/4 tsp red chili powder","Salt to taste"],
    steps: ["Whisk yogurt smooth","Mix in all vegetables and seasonings","Chill before serving","Serve as side with biryani, pulao, or any spicy dish"],
    tips: ["Boondi raita: replace veggies with soaked boondi (tiny fried chickpea drops)"] },
  { name: "Green Chutney", category: "condiment", servings: 4, prepTime: "10 min", cookTime: "0 min", difficulty: "easy",
    ingredients: ["1 cup fresh coriander","1/2 cup fresh mint","2-3 green chilies","1 tbsp lemon juice","1/2 tsp salt","1/2 tsp cumin powder","2-3 tbsp water"],
    steps: ["Blend all ingredients until smooth","Adjust salt and lemon","Store in refrigerator up to 3 days","Serve with kebabs, samosas, pakoras"],
    tips: ["Add a small raw onion for extra zing"] },
  { name: "Imli Chutney", category: "condiment", servings: 6, prepTime: "10 min", cookTime: "15 min", difficulty: "easy",
    ingredients: ["200g tamarind (seedless block)","1.5 cups water","1 cup sugar or gur (jaggery)","1 tsp red chili powder","1 tsp roasted cumin powder","1/2 tsp black salt","Salt to taste"],
    steps: ["Soak tamarind in warm water 30 minutes","Mash and strain through sieve","Cook pulp with sugar, chili, cumin, salts","Simmer 10-15 minutes until thick","Cool — it thickens further","Store in jar, refrigerate up to 2 weeks"],
    tips: ["Using gur (jaggery) instead of sugar gives a deeper, more authentic flavor"] },
  { name: "Achaar (Mixed Pickle)", category: "condiment", servings: 10, prepTime: "30 min", cookTime: "0 min", difficulty: "medium",
    ingredients: ["500g mixed: raw mango, carrot, turnip, green chili, lemon (all cut into pieces)","1/2 cup mustard oil","3 tbsp red chili powder","2 tbsp salt","1 tbsp turmeric","2 tbsp fennel seeds (crushed)","1 tbsp fenugreek seeds","1 tbsp nigella seeds (kalonji)","1 tbsp mustard seeds (rai)"],
    steps: ["Wash and thoroughly dry all cut vegetables (moisture causes spoilage)","Mix all spices together","Toss vegetables in spice mixture","Heat mustard oil until smoking, cool completely","Mix oil with spiced vegetables","Pack into glass jar, ensure oil covers everything","Keep in sun 3-4 days, shake jar daily","Ready when flavors meld and oil turns red"],
    tips: ["Absolutely no water contact — use dry spoon always. Oil must cover everything to prevent mold."] },
  { name: "Palak Paneer", category: "main-course", servings: 4, prepTime: "15 min", cookTime: "25 min", difficulty: "easy",
    ingredients: ["500g spinach (blanched)","200g paneer (cubed)","1 onion (chopped)","2 tomatoes (chopped)","1 tbsp ginger-garlic paste","1 tsp cumin seeds","1/2 tsp garam masala","1/4 cup cream","2 tbsp butter","Salt to taste"],
    steps: ["Blanch spinach 2 minutes, ice bath, blend smooth","Heat butter, add cumin, fry onion golden","Add ginger-garlic paste, tomatoes, cook 5 min","Add spinach puree, salt, garam masala","Simmer 10 minutes","Add paneer cubes and cream, cook 3 minutes","Serve with naan or roti"],
    tips: ["Fry paneer cubes golden before adding for better texture"] }
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
  if (!q) { console.error('Usage: recipes.mjs search --query "<text>"'); process.exit(1); }
  const results = RECIPES.filter(r =>
    r.name.toLowerCase().includes(q) ||
    r.ingredients.some(i => i.toLowerCase().includes(q)) ||
    r.category.includes(q)
  ).map(r => ({ name: r.name, category: r.category, difficulty: r.difficulty, servings: r.servings, prepTime: r.prepTime, cookTime: r.cookTime }));
  console.log(JSON.stringify({ query: q, count: results.length, results }, null, 2));
}

function list(flags) {
  let filtered = RECIPES;
  if (flags.category) filtered = filtered.filter(r => r.category === flags.category);
  const results = filtered.map(r => ({ name: r.name, category: r.category, difficulty: r.difficulty }));
  console.log(JSON.stringify({ count: results.length, recipes: results }, null, 2));
}

function recipe(flags) {
  const name = (flags.name || '').toLowerCase();
  if (!name) { console.error('Usage: recipes.mjs recipe --name "<recipe name>"'); process.exit(1); }
  const r = RECIPES.find(r => r.name.toLowerCase() === name || r.name.toLowerCase().includes(name));
  if (!r) { console.log(JSON.stringify({ error: `Recipe "${flags.name}" not found` }, null, 2)); process.exit(0); }
  console.log(JSON.stringify(r, null, 2));
}

function categories() {
  const cats = {};
  RECIPES.forEach(r => { cats[r.category] = (cats[r.category] || 0) + 1; });
  console.log(JSON.stringify({ categories: Object.entries(cats).map(([name, count]) => ({ name, count })) }, null, 2));
}

const [cmd, ...rest] = process.argv.slice(2);
const flags = parseArgs(rest);
const cmds = { search, list, recipe, categories };
if (!cmds[cmd]) {
  console.error('Usage: recipes.mjs <search|list|recipe|categories> [options]');
  process.exit(1);
}
cmds[cmd](flags);
