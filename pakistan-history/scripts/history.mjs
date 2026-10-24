#!/usr/bin/env node

const ERAS = [
  { id: "pre-partition", name: "Pre-Partition (1906-1947)", start: 1906, end: 1947 },
  { id: "creation", name: "Creation & Early Years (1947-1958)", start: 1947, end: 1958 },
  { id: "military-rule-1", name: "First Military Rule — Ayub & Yahya (1958-1971)", start: 1958, end: 1971 },
  { id: "east-pakistan-separation", name: "East Pakistan Separation (1971)", start: 1971, end: 1971 },
  { id: "bhutto-era", name: "Bhutto Era (1971-1977)", start: 1971, end: 1977 },
  { id: "zia-era", name: "Zia ul-Haq Era (1977-1988)", start: 1977, end: 1988 },
  { id: "democracy-returns", name: "Return of Democracy (1988-1999)", start: 1988, end: 1999 },
  { id: "musharraf-era", name: "Musharraf Era (1999-2008)", start: 1999, end: 2008 },
  { id: "modern-democracy", name: "Modern Democracy (2008-Present)", start: 2008, end: 2025 }
];

const EVENTS = [
  { year: 1906, month: 12, day: 30, era: "pre-partition", title: "All-India Muslim League Founded", description: "Muslim League established at Dhaka (now Dacca). Key founders: Nawab Viqar-ul-Mulk, Aga Khan III. Purpose: represent Muslim political interests in British India." },
  { year: 1909, month: null, day: null, era: "pre-partition", title: "Morley-Minto Reforms", description: "Separate electorates granted for Muslims in British India legislative councils." },
  { year: 1913, month: null, day: null, era: "pre-partition", title: "Muslim League Adopts Self-Government", description: "Muslim League adopts self-government as its goal at its annual session." },
  { year: 1916, month: 12, day: null, era: "pre-partition", title: "Lucknow Pact", description: "Muslim League and Indian National Congress sign agreement on constitutional reforms and separate electorates." },
  { year: 1930, month: 12, day: 29, era: "pre-partition", title: "Allama Iqbal's Allahabad Address", description: "Iqbal proposes a separate Muslim state in northwest India at the All-India Muslim League session. Considered the intellectual foundation of Pakistan." },
  { year: 1933, month: 1, day: 28, era: "pre-partition", title: "Name 'Pakistan' Coined", description: "Choudhry Rahmat Ali publishes 'Now or Never' pamphlet at Cambridge, coining the name Pakistan (P-Punjab, A-Afghania/NWFP, K-Kashmir, S-Sindh, TAN-Baluchistan)." },
  { year: 1937, month: null, day: null, era: "pre-partition", title: "Provincial Elections", description: "Muslim League performs poorly in 1937 elections. Jinnah begins reorganizing the party." },
  { year: 1940, month: 3, day: 23, era: "pre-partition", title: "Lahore Resolution (Pakistan Resolution)", description: "Muslim League passes the Lahore Resolution at Minar-e-Pakistan (then Minto Park), demanding separate Muslim-majority states. Moved by Fazlul Haq. This date is now Pakistan Day." },
  { year: 1946, month: 8, day: 16, era: "pre-partition", title: "Direct Action Day", description: "Muslim League calls for Direct Action to achieve Pakistan. Leads to widespread communal violence, especially in Calcutta." },
  { year: 1947, month: 6, day: 3, era: "pre-partition", title: "Mountbatten Plan Announced", description: "Lord Mountbatten announces the partition plan. India and Pakistan to become independent dominions." },
  { year: 1947, month: 8, day: 14, era: "creation", title: "Independence of Pakistan", description: "Pakistan gains independence from British India. Muhammad Ali Jinnah becomes first Governor-General. Liaquat Ali Khan becomes first Prime Minister. Capital: Karachi." },
  { year: 1947, month: 10, day: 27, era: "creation", title: "First Kashmir War Begins", description: "Pakistan-India war over Kashmir. Pashtun tribal militias enter Kashmir. India airlifts troops to Srinagar. UN ceasefire in 1949 establishes Line of Control." },
  { year: 1948, month: 9, day: 11, era: "creation", title: "Death of Quaid-e-Azam", description: "Muhammad Ali Jinnah dies of tuberculosis in Karachi at age 71. Khawaja Nazimuddin succeeds as Governor-General." },
  { year: 1949, month: 3, day: 12, era: "creation", title: "Objectives Resolution", description: "Constituent Assembly passes the Objectives Resolution, laying the foundation for Pakistan's constitutional framework. Declares sovereignty belongs to Allah." },
  { year: 1951, month: 10, day: 16, era: "creation", title: "Assassination of Liaquat Ali Khan", description: "First PM Liaquat Ali Khan assassinated during a public meeting in Rawalpindi's Company Bagh (now Liaquat Bagh). Motive remains debated." },
  { year: 1953, month: null, day: null, era: "creation", title: "Anti-Ahmadiyya Riots", description: "Martial law declared in Lahore following anti-Ahmadiyya agitation. First martial law in Pakistan's history (provincial level)." },
  { year: 1955, month: 10, day: 14, era: "creation", title: "One Unit Policy", description: "West Pakistan provinces merged into a single unit. Four provinces become One Unit of West Pakistan. East Pakistan remains separate." },
  { year: 1956, month: 3, day: 23, era: "creation", title: "First Constitution Adopted", description: "Pakistan adopts its first constitution. Becomes Islamic Republic of Pakistan. Iskander Mirza becomes first President." },
  { year: 1958, month: 10, day: 7, era: "military-rule-1", title: "First Martial Law — Ayub Khan", description: "President Iskander Mirza abrogates constitution and declares martial law. General Ayub Khan becomes Chief Martial Law Administrator. Mirza exiled 20 days later." },
  { year: 1960, month: 2, day: 17, era: "military-rule-1", title: "Basic Democracies Referendum", description: "Ayub Khan holds referendum through Basic Democracies system. Elected President through indirect elections." },
  { year: 1960, month: null, day: null, era: "military-rule-1", title: "New Capital — Islamabad", description: "Construction of Islamabad begins as the new federal capital, replacing Karachi. Designed by Greek architect Constantinos Doxiadis." },
  { year: 1962, month: 3, day: 1, era: "military-rule-1", title: "Second Constitution", description: "Ayub Khan promulgates second constitution. Presidential system with Basic Democracies. One Unit retained." },
  { year: 1965, month: 9, day: 6, era: "military-rule-1", title: "1965 India-Pakistan War", description: "17-day war with India. Begins with Operation Grand Slam in Kashmir. Defence of Pakistan Day (6 September). Ceasefire under UN Resolution 211." },
  { year: 1966, month: 1, day: 10, era: "military-rule-1", title: "Tashkent Declaration", description: "Ayub Khan and Indian PM Shastri sign Tashkent Declaration (USSR-mediated) ending 1965 war. Widely criticized in Pakistan." },
  { year: 1966, month: 2, day: 5, era: "military-rule-1", title: "Six Points of Sheikh Mujib", description: "Sheikh Mujibur Rahman presents Six Points demanding maximum autonomy for East Pakistan. Seen as the charter of Bengali nationalism." },
  { year: 1968, month: 11, day: null, era: "military-rule-1", title: "Anti-Ayub Movement", description: "Mass protests against Ayub Khan's rule. Students, workers, and political parties demand democracy. Zulfikar Ali Bhutto emerges as opposition leader." },
  { year: 1969, month: 3, day: 25, era: "military-rule-1", title: "Ayub Resigns — Yahya Takes Over", description: "Ayub Khan hands power to General Yahya Khan. Second martial law. One Unit dissolved, provinces restored. First general elections announced." },
  { year: 1970, month: 11, day: 12, era: "military-rule-1", title: "Bhola Cyclone", description: "Deadliest tropical cyclone in history strikes East Pakistan. Estimated 300,000-500,000 deaths. Government response widely criticized." },
  { year: 1970, month: 12, day: 7, era: "military-rule-1", title: "First General Elections", description: "Pakistan's first general elections. Awami League wins 160/162 East Pakistan seats. PPP wins 81/138 West Pakistan seats. Transfer of power dispute begins." },
  { year: 1971, month: 3, day: 25, era: "east-pakistan-separation", title: "Operation Searchlight", description: "Pakistani military launches Operation Searchlight in East Pakistan. Crackdown on Bengali nationalists, intellectuals, and Awami League. Sheikh Mujib arrested." },
  { year: 1971, month: 3, day: 26, era: "east-pakistan-separation", title: "Bangladesh Declaration of Independence", description: "East Pakistan declares independence as Bangladesh. Indian support for Mukti Bahini (Bengali liberation fighters) intensifies." },
  { year: 1971, month: 12, day: 3, era: "east-pakistan-separation", title: "1971 India-Pakistan War", description: "Full-scale war between India and Pakistan on both eastern and western fronts. Indian forces support Bangladesh liberation." },
  { year: 1971, month: 12, day: 16, era: "east-pakistan-separation", title: "Fall of Dhaka", description: "Pakistani forces surrender to joint India-Bangladesh command in Dhaka. 93,000 POWs. East Pakistan becomes Bangladesh. Pakistan's greatest military defeat." },
  { year: 1971, month: 12, day: 20, era: "bhutto-era", title: "Bhutto Becomes President", description: "Zulfikar Ali Bhutto becomes President and Chief Martial Law Administrator after Yahya Khan's resignation. PPP takes power." },
  { year: 1972, month: 7, day: 2, era: "bhutto-era", title: "Simla Agreement", description: "Bhutto and Indira Gandhi sign Simla Agreement. Both nations agree to resolve Kashmir bilaterally. Line of Control established." },
  { year: 1972, month: null, day: null, era: "bhutto-era", title: "Nationalization Program", description: "Bhutto nationalizes major industries, banks, and educational institutions. Land reforms introduced." },
  { year: 1973, month: 8, day: 14, era: "bhutto-era", title: "Third Constitution", description: "Current constitution of Pakistan adopted. Parliamentary system. Islam declared state religion. Bhutto becomes Prime Minister." },
  { year: 1974, month: 9, day: 7, era: "bhutto-era", title: "Second Amendment", description: "National Assembly declares Ahmadis non-Muslim through constitutional amendment." },
  { year: 1976, month: null, day: null, era: "bhutto-era", title: "Pakistan Steel Mills", description: "Pakistan Steel Mills Corporation established in Karachi with Soviet assistance. Largest industrial complex in Pakistan." },
  { year: 1977, month: 3, day: 7, era: "bhutto-era", title: "1977 Elections & PNA Movement", description: "PPP wins controversial elections. Pakistan National Alliance (PNA) alleges massive rigging. Nationwide protests and civil unrest follow." },
  { year: 1977, month: 7, day: 5, era: "zia-era", title: "Zia ul-Haq's Martial Law", description: "General Zia ul-Haq overthrows Bhutto in Operation Fair Play. Third martial law. Promises elections within 90 days but rules for 11 years." },
  { year: 1979, month: 4, day: 4, era: "zia-era", title: "Execution of Bhutto", description: "Zulfikar Ali Bhutto hanged in Rawalpindi Central Jail after controversial murder trial. Highly controversial — 4-3 Supreme Court verdict." },
  { year: 1979, month: 2, day: 10, era: "zia-era", title: "Islamization Program Begins", description: "Zia introduces Hudood Ordinances, Zakat and Ushr Ordinance, Federal Shariat Court. Blasphemy laws strengthened. Sharia courts established." },
  { year: 1979, month: 11, day: 21, era: "zia-era", title: "US Embassy Islamabad Attacked", description: "Mob burns US Embassy in Islamabad following false reports of US involvement in seizure of Masjid al-Haram in Mecca. Two Americans killed." },
  { year: 1979, month: 12, day: 24, era: "zia-era", title: "Soviet Invasion of Afghanistan", description: "Soviet Union invades Afghanistan. Pakistan becomes frontline state. CIA-ISI cooperation in supporting Afghan mujahideen. Millions of Afghan refugees enter Pakistan." },
  { year: 1984, month: 4, day: null, era: "zia-era", title: "Ordinance XX", description: "Ordinance XX promulgated restricting Ahmadiyya religious practices." },
  { year: 1985, month: 3, day: 23, era: "zia-era", title: "Eighth Amendment", description: "Eighth Amendment to Constitution gives President power to dissolve National Assembly. Non-party elections held. Muhammad Khan Junejo becomes PM." },
  { year: 1986, month: null, day: null, era: "zia-era", title: "Faisal Mosque Completed", description: "Faisal Mosque inaugurated in Islamabad. Designed by Turkish architect Vedat Dalokay. Largest mosque in the world at the time." },
  { year: 1988, month: 5, day: 29, era: "zia-era", title: "Zia Dissolves Assembly", description: "Zia dissolves National Assembly, dismisses PM Junejo. New elections announced." },
  { year: 1988, month: 8, day: 17, era: "democracy-returns", title: "Death of Zia ul-Haq", description: "President Zia, US Ambassador Arnold Raphel, and 30 others killed in mysterious C-130 plane crash near Bahawalpur. Cause never conclusively determined." },
  { year: 1988, month: 12, day: 2, era: "democracy-returns", title: "Benazir Bhutto Becomes PM", description: "Benazir Bhutto becomes first female PM of a Muslim-majority country at age 35. PPP wins elections after Zia's death." },
  { year: 1990, month: 8, day: 6, era: "democracy-returns", title: "First Bhutto Government Dismissed", description: "President Ghulam Ishaq Khan dismisses Benazir's government on corruption charges using Eighth Amendment powers." },
  { year: 1990, month: 11, day: null, era: "democracy-returns", title: "Nawaz Sharif First Term", description: "Nawaz Sharif becomes PM after PML-N wins elections. Begins privatization and economic liberalization." },
  { year: 1993, month: 4, day: 18, era: "democracy-returns", title: "Nawaz Government Dismissed", description: "President Ghulam Ishaq Khan dismisses Nawaz Sharif's government. Supreme Court restores it. Both eventually resign. New elections called." },
  { year: 1993, month: 10, day: null, era: "democracy-returns", title: "Benazir Second Term", description: "Benazir Bhutto becomes PM again after PPP wins 1993 elections." },
  { year: 1996, month: 11, day: 5, era: "democracy-returns", title: "Second Bhutto Government Dismissed", description: "President Farooq Leghari dismisses Benazir's government on corruption charges. New elections announced." },
  { year: 1997, month: 2, day: null, era: "democracy-returns", title: "Nawaz Sharif Second Term", description: "PML-N wins landslide. Nawaz Sharif becomes PM with 2/3 majority. Passes 13th Amendment removing President's dismissal power." },
  { year: 1998, month: 5, day: 28, era: "democracy-returns", title: "Nuclear Tests — Chagai", description: "Pakistan conducts 5 nuclear tests at Chagai Hills, Balochistan (Chagai-I). Response to India's Pokhran-II tests. Pakistan becomes 7th nuclear power. International sanctions follow." },
  { year: 1998, month: 5, day: 30, era: "democracy-returns", title: "Chagai-II Nuclear Test", description: "6th nuclear test at Kharan Desert, Balochistan. Pakistan declares nuclear deterrent complete. Youm-e-Takbir (Day of Greatness) celebrated." },
  { year: 1999, month: 2, day: 21, era: "democracy-returns", title: "Lahore Declaration", description: "Nawaz Sharif and Indian PM Vajpayee sign Lahore Declaration for peace. Bus diplomacy begins." },
  { year: 1999, month: 5, day: null, era: "democracy-returns", title: "Kargil Conflict", description: "Pakistani soldiers and militants occupy positions in Kargil, Indian-administered Kashmir. International pressure forces withdrawal. Relations with India deteriorate." },
  { year: 1999, month: 10, day: 12, era: "musharraf-era", title: "Musharraf's Military Coup", description: "General Pervez Musharraf overthrows Nawaz Sharif in bloodless coup while Sharif tries to prevent his plane from landing. Fourth martial law." },
  { year: 2001, month: 9, day: 12, era: "musharraf-era", title: "Pakistan Joins War on Terror", description: "After 9/11 attacks, Pakistan becomes key US ally in War on Terror. Musharraf allows use of Pakistani airspace and bases. Taliban government in Afghanistan falls." },
  { year: 2002, month: 4, day: 30, era: "musharraf-era", title: "Referendum & Presidency", description: "Musharraf holds referendum to extend presidency for 5 years. Controversial with reported low turnout despite official claims." },
  { year: 2005, month: 10, day: 8, era: "musharraf-era", title: "Kashmir Earthquake", description: "7.6 magnitude earthquake devastates AJK and NWFP. 87,000+ dead, 3.5 million homeless. Worst natural disaster in Pakistan's history. International relief operation." },
  { year: 2007, month: 3, day: 9, era: "musharraf-era", title: "Chief Justice Crisis", description: "Musharraf suspends Chief Justice Iftikhar Chaudhry. Lawyers' Movement begins — massive protests by legal community across Pakistan." },
  { year: 2007, month: 7, day: 3, era: "musharraf-era", title: "Lal Masjid Operation", description: "Military operation against militants holed up in Islamabad's Lal Masjid (Red Mosque). Over 100 killed. Triggers wave of extremist attacks across Pakistan." },
  { year: 2007, month: 12, day: 27, era: "musharraf-era", title: "Benazir Bhutto Assassinated", description: "Benazir Bhutto assassinated in gun-and-bomb attack at Liaquat Bagh, Rawalpindi after PPP rally. Nationwide mourning and violence. Son Bilawal named PPP chairman." },
  { year: 2008, month: 8, day: 18, era: "modern-democracy", title: "Musharraf Resigns", description: "Pervez Musharraf resigns facing impeachment. Asif Ali Zardari elected President. PPP leads coalition government." },
  { year: 2009, month: null, day: null, era: "modern-democracy", title: "Swat Military Operation", description: "Military launches Operation Rah-e-Rast against Taliban in Swat. 2 million displaced. Valley cleared of militant control." },
  { year: 2010, month: 4, day: 8, era: "modern-democracy", title: "18th Amendment", description: "Parliament passes 18th Constitutional Amendment. Restores parliamentary system, removes presidential powers to dissolve assembly, renames NWFP to Khyber Pakhtunkhwa." },
  { year: 2010, month: 7, day: null, era: "modern-democracy", title: "2010 Floods", description: "Worst flooding in Pakistan's history. 20 million affected, 1,985 dead, 1.6 million homes destroyed. One-fifth of country submerged." },
  { year: 2011, month: 5, day: 2, era: "modern-democracy", title: "Osama bin Laden Killed", description: "US Navy SEALs kill Osama bin Laden in compound in Abbottabad, Pakistan. Operation conducted without Pakistani knowledge. Major diplomatic crisis with US." },
  { year: 2013, month: 5, day: 11, era: "modern-democracy", title: "First Democratic Transfer", description: "PML-N wins elections. First democratic transfer of power in Pakistan's history — elected government completes term and transfers to another elected government." },
  { year: 2014, month: 12, day: 16, era: "modern-democracy", title: "APS Peshawar Attack", description: "Taliban militants attack Army Public School in Peshawar. 149 killed including 132 children. Pakistan's deadliest terrorist attack. Leads to National Action Plan against terrorism." },
  { year: 2015, month: 4, day: 20, era: "modern-democracy", title: "CPEC Launch", description: "China-Pakistan Economic Corridor (CPEC) formally launched. $46 billion+ infrastructure project. Part of China's Belt and Road Initiative. Energy, roads, Gwadar port." },
  { year: 2018, month: 7, day: 25, era: "modern-democracy", title: "PTI Wins Elections", description: "Pakistan Tehreek-e-Insaf wins general elections. Imran Khan becomes Prime Minister. First cricketer-turned-PM." },
  { year: 2022, month: 4, day: 10, era: "modern-democracy", title: "No-Confidence Vote Against Imran Khan", description: "National Assembly passes no-confidence motion against PM Imran Khan. First PM removed through no-confidence in Pakistan's history. Shehbaz Sharif becomes PM." },
  { year: 2022, month: 6, day: null, era: "modern-democracy", title: "2022 Floods", description: "Catastrophic monsoon flooding affects 33 million people. Over 1,700 dead. One-third of country submerged. $30+ billion in damages. Climate change cited as major factor." },
  { year: 2023, month: 8, day: 5, era: "modern-democracy", title: "Caretaker Government", description: "Anwaar-ul-Haq Kakar becomes caretaker PM. Elections postponed due to census-based delimitation." }
];

const LEADERS = {
  governorGenerals: [
    { name: "Quaid-e-Azam Muhammad Ali Jinnah", tenure: "14 Aug 1947 – 11 Sep 1948", note: "Founder. Died in office." },
    { name: "Khawaja Nazimuddin", tenure: "14 Sep 1948 – 17 Oct 1951" },
    { name: "Ghulam Muhammad", tenure: "17 Oct 1951 – 7 Oct 1955" },
    { name: "Iskander Mirza", tenure: "7 Oct 1955 – 23 Mar 1956", note: "Last GG, became first President" }
  ],
  presidents: [
    { name: "Iskander Mirza", tenure: "23 Mar 1956 – 27 Oct 1958", note: "First President. Deposed by Ayub Khan." },
    { name: "Ayub Khan", tenure: "27 Oct 1958 – 25 Mar 1969", note: "Military. Field Marshal." },
    { name: "Yahya Khan", tenure: "25 Mar 1969 – 20 Dec 1971", note: "Military. Oversaw 1971 war." },
    { name: "Zulfikar Ali Bhutto", tenure: "20 Dec 1971 – 13 Aug 1973", note: "Civilian. PPP." },
    { name: "Fazal Ilahi Chaudhry", tenure: "14 Aug 1973 – 16 Sep 1978" },
    { name: "Muhammad Zia ul-Haq", tenure: "16 Sep 1978 – 17 Aug 1988", note: "Military. Died in plane crash." },
    { name: "Ghulam Ishaq Khan", tenure: "17 Aug 1988 – 18 Jul 1993" },
    { name: "Farooq Leghari", tenure: "14 Nov 1993 – 2 Dec 1997" },
    { name: "Muhammad Rafiq Tarar", tenure: "1 Jan 1998 – 20 Jun 2001" },
    { name: "Pervez Musharraf", tenure: "20 Jun 2001 – 18 Aug 2008", note: "Military. Resigned facing impeachment." },
    { name: "Asif Ali Zardari", tenure: "9 Sep 2008 – 9 Sep 2013", note: "PPP. First term." },
    { name: "Mamnoon Hussain", tenure: "9 Sep 2013 – 9 Sep 2018" },
    { name: "Arif Alvi", tenure: "9 Sep 2018 – 10 Mar 2024", note: "PTI." },
    { name: "Asif Ali Zardari", tenure: "10 Mar 2024 – present", note: "PPP. Second term." }
  ],
  primeMinistersSelected: [
    { name: "Liaquat Ali Khan", tenure: "15 Aug 1947 – 16 Oct 1951", note: "First PM. Assassinated." },
    { name: "Khawaja Nazimuddin", tenure: "17 Oct 1951 – 17 Apr 1953" },
    { name: "Muhammad Ali Bogra", tenure: "17 Apr 1953 – 12 Aug 1955" },
    { name: "Chaudhry Muhammad Ali", tenure: "12 Aug 1955 – 12 Sep 1956" },
    { name: "Huseyn Shaheed Suhrawardy", tenure: "12 Sep 1956 – 17 Oct 1957" },
    { name: "Ibrahim Ismail Chundrigar", tenure: "17 Oct 1957 – 16 Dec 1957" },
    { name: "Feroz Khan Noon", tenure: "16 Dec 1957 – 7 Oct 1958" },
    { name: "Nurul Amin", tenure: "7 Dec 1971 – 20 Dec 1971", note: "Last PM of united Pakistan." },
    { name: "Zulfikar Ali Bhutto", tenure: "14 Aug 1973 – 5 Jul 1977", note: "PPP. Executed 1979." },
    { name: "Muhammad Khan Junejo", tenure: "23 Mar 1985 – 29 May 1988" },
    { name: "Benazir Bhutto", tenure: "2 Dec 1988 – 6 Aug 1990", note: "First female PM of Muslim country. First term." },
    { name: "Nawaz Sharif", tenure: "6 Nov 1990 – 18 Apr 1993", note: "PML-N. First term." },
    { name: "Benazir Bhutto", tenure: "19 Oct 1993 – 5 Nov 1996", note: "Second term. Assassinated 2007." },
    { name: "Nawaz Sharif", tenure: "17 Feb 1997 – 12 Oct 1999", note: "Second term. Deposed by Musharraf." },
    { name: "Zafarullah Khan Jamali", tenure: "21 Nov 2002 – 26 Jun 2004" },
    { name: "Shaukat Aziz", tenure: "28 Aug 2004 – 15 Nov 2007" },
    { name: "Yousaf Raza Gillani", tenure: "25 Mar 2008 – 19 Jun 2012", note: "PPP. Disqualified by Supreme Court." },
    { name: "Raja Pervez Ashraf", tenure: "22 Jun 2012 – 25 Mar 2013" },
    { name: "Nawaz Sharif", tenure: "5 Jun 2013 – 28 Jul 2017", note: "Third term. Disqualified (Panama Papers)." },
    { name: "Shahid Khaqan Abbasi", tenure: "1 Aug 2017 – 31 May 2018" },
    { name: "Imran Khan", tenure: "18 Aug 2018 – 10 Apr 2022", note: "PTI. Removed by no-confidence." },
    { name: "Shehbaz Sharif", tenure: "11 Apr 2022 – 13 Aug 2023", note: "PML-N. First term." },
    { name: "Shehbaz Sharif", tenure: "3 Mar 2024 – present", note: "PML-N. Second term." }
  ]
};

function run() {
  const args = process.argv.slice(2);
  const cmd = args[0];

  if (!cmd || cmd === 'help') {
    console.log(JSON.stringify({ commands: [
      'search --query <text>',
      'list [--era <era-id>]',
      'year --year <YYYY>',
      'eras',
      'leaders',
      'on-this-day --month <M> --day <D>'
    ]}));
    return;
  }

  if (cmd === 'eras') {
    console.log(JSON.stringify({ count: ERAS.length, eras: ERAS }, null, 2));
    return;
  }

  if (cmd === 'leaders') {
    console.log(JSON.stringify(LEADERS, null, 2));
    return;
  }

  if (cmd === 'list') {
    const eraIdx = args.indexOf('--era');
    let events = EVENTS;
    if (eraIdx !== -1 && args[eraIdx + 1]) {
      const eraId = args[eraIdx + 1].toLowerCase();
      events = events.filter(e => e.era === eraId);
    }
    const summary = events.map(e => ({
      year: e.year, month: e.month, day: e.day,
      title: e.title, era: e.era
    }));
    console.log(JSON.stringify({ count: summary.length, events: summary }, null, 2));
    return;
  }

  if (cmd === 'search') {
    const qIdx = args.indexOf('--query');
    if (qIdx === -1 || !args[qIdx + 1]) {
      process.stderr.write('Usage: search --query <text>\n');
      process.exit(1);
    }
    const query = args[qIdx + 1].toLowerCase();
    const matches = EVENTS.filter(e =>
      e.title.toLowerCase().includes(query) ||
      e.description.toLowerCase().includes(query)
    );
    console.log(JSON.stringify({ query: args[qIdx + 1], count: matches.length, events: matches }, null, 2));
    return;
  }

  if (cmd === 'year') {
    const yIdx = args.indexOf('--year');
    if (yIdx === -1 || !args[yIdx + 1]) {
      process.stderr.write('Usage: year --year <YYYY>\n');
      process.exit(1);
    }
    const year = parseInt(args[yIdx + 1]);
    const matches = EVENTS.filter(e => e.year === year);
    console.log(JSON.stringify({ year, count: matches.length, events: matches }, null, 2));
    return;
  }

  if (cmd === 'on-this-day') {
    const mIdx = args.indexOf('--month');
    const dIdx = args.indexOf('--day');
    if (mIdx === -1 || dIdx === -1) {
      process.stderr.write('Usage: on-this-day --month <M> --day <D>\n');
      process.exit(1);
    }
    const month = parseInt(args[mIdx + 1]);
    const day = parseInt(args[dIdx + 1]);
    const matches = EVENTS.filter(e => e.month === month && e.day === day);
    console.log(JSON.stringify({ month, day, count: matches.length, events: matches }, null, 2));
    return;
  }

  process.stderr.write(`Unknown command: ${cmd}\n`);
  process.exit(1);
}

run();
