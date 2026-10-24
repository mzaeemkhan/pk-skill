#!/usr/bin/env node

const PARTS = [
  { number: 1, title: 'Introductory', articles: '1-6' },
  { number: 2, title: 'Fundamental Rights and Principles of Policy', articles: '8-40' },
  { number: 3, title: 'The Federation of Pakistan', articles: '41-100' },
  { number: 4, title: 'Provinces', articles: '101-140A' },
  { number: 5, title: 'Relations Between Federation and Provinces', articles: '141-159' },
  { number: 6, title: 'Finance, Property, Contracts and Suits', articles: '160-174' },
  { number: 7, title: 'The Judicature', articles: '175-212' },
  { number: 8, title: 'Elections', articles: '213-226' },
  { number: 9, title: 'Islamic Provisions', articles: '227-231' },
  { number: 10, title: 'Emergency Provisions', articles: '232-237' },
  { number: 11, title: 'Amendment of Constitution', articles: '238-239' },
  { number: 12, title: 'Miscellaneous', articles: '240-280' },
];

const ARTICLES = [
  // Part I: Introductory
  { number: 1, part: 1, title: 'The Republic and its territories', text: 'Pakistan shall be a Federal Republic to be known as the Islamic Republic of Pakistan. The territories of Pakistan shall comprise: (a) the Provinces of Balochistan, Khyber Pakhtunkhwa, the Punjab and Sindh; (b) the Islamabad Capital Territory; (c) Federally Administered Tribal Areas; and (d) such States and territories as are or may be included in Pakistan.' },
  { number: 2, part: 1, title: 'Islam to be State religion', text: 'Islam shall be the State religion of Pakistan.' },
  { number: 3, part: 1, title: 'Elimination of exploitation', text: 'The State shall ensure the elimination of all forms of exploitation and the gradual fulfilment of the fundamental principle, from each according to his ability to each according to his work.' },
  { number: 4, part: 1, title: 'Right of individuals to be dealt with in accordance with law', text: 'To enjoy the protection of law and to be treated in accordance with law is the inalienable right of every citizen, wherever he may be, and of every other person for the time being within Pakistan.' },
  { number: 5, part: 1, title: 'Loyalty to State and obedience to Constitution and law', text: 'Loyalty to the State is the basic duty of every citizen. Obedience to the Constitution and law is the inviolable obligation of every citizen.' },
  { number: 6, part: 1, title: 'Validity of laws', text: 'No law shall be contrary to the Injunctions of Islam as laid down in the Holy Quran and Sunnah.' },

  // Part II Chapter 1: Fundamental Rights (Articles 8-28)
  { number: 8, part: 2, title: 'Laws inconsistent with or in derogation of fundamental rights to be void', text: 'Any law, or any custom or usage having the force of law, in so far as it is inconsistent with the rights conferred by this Chapter, shall, to the extent of such inconsistency, be void. The State shall not make any law which takes away or abridges the rights so conferred and any law made in contravention of this clause shall, to the extent of such contravention, be void.' },
  { number: 9, part: 2, title: 'Security of person', text: 'No person shall be deprived of life or liberty save in accordance with law.' },
  { number: 10, part: 2, title: 'Safeguards as to arrest and detention', text: 'No person who is arrested shall be detained in custody without being informed, as soon as may be, of the grounds for such arrest, nor shall he be denied the right to consult and be defended by a legal practitioner of his choice. Every person who is arrested and detained in custody shall be produced before a magistrate within a period of twenty-four hours of such arrest.' },
  { number: '10A', part: 2, title: 'Right to fair trial', text: 'For the determination of his civil rights and obligations or in any criminal charge against him a person shall be entitled to a fair trial and due process.' },
  { number: 11, part: 2, title: 'Slavery, forced labour, etc. prohibited', text: 'Slavery is non-existent and forbidden and no law shall permit or facilitate its introduction into Pakistan in any form. All forms of forced labour and traffic in human beings are prohibited. No child below the age of fourteen years shall be engaged in any factory or mine or any other hazardous employment.' },
  { number: 12, part: 2, title: 'Protection against retrospective punishment', text: 'No law shall authorize the punishment of a person for an act or omission that was not punishable by law at the time of the act or omission, and no person shall be subjected to a punishment more severe than that which could have been inflicted at the time the offence was committed.' },
  { number: 13, part: 2, title: 'Protection against double punishment and self-incrimination', text: 'No person shall be prosecuted or punished for the same offence more than once. No person shall, when accused of an offence, be compelled to be a witness against himself.' },
  { number: 14, part: 2, title: 'Inviolability of dignity of man', text: 'The dignity of man and, subject to law, the privacy of home, shall be inviolable. No person shall be subjected to torture for the purpose of extracting evidence.' },
  { number: 15, part: 2, title: 'Freedom of movement', text: 'Every citizen shall have the right to remain in, and, subject to any reasonable restriction imposed by law in the public interest, enter and move freely throughout Pakistan and to reside and settle in any part thereof.' },
  { number: 16, part: 2, title: 'Freedom of assembly', text: 'Every citizen shall have the right to assemble peacefully and without arms, subject to any reasonable restrictions imposed by law in the interest of public order.' },
  { number: 17, part: 2, title: 'Freedom of association', text: 'Every citizen shall have the right to form associations or unions, subject to any reasonable restrictions imposed by law in the interest of sovereignty or integrity of Pakistan, public order or morality.' },
  { number: 18, part: 2, title: 'Freedom of trade, business or profession', text: 'Subject to such qualifications, if any, as may be prescribed by law, every citizen shall have the right to enter upon any lawful profession or occupation, and to conduct any lawful trade or business.' },
  { number: 19, part: 2, title: 'Freedom of speech', text: 'Every citizen shall have the right to freedom of speech and expression, and there shall be freedom of the press, subject to any reasonable restrictions imposed by law in the interest of the glory of Islam or the integrity, security or defence of Pakistan or any part thereof, friendly relations with foreign States, public order, decency or morality, or in relation to contempt of court, commission of or incitement to an offence.' },
  { number: '19A', part: 2, title: 'Right to information', text: 'Every citizen shall have the right to have access to information in all matters of public importance subject to regulation and reasonable restrictions imposed by law.' },
  { number: 20, part: 2, title: 'Freedom to profess religion and to manage religious institutions', text: 'Subject to law, public order and morality: (a) every citizen shall have the right to profess, practise and propagate his religion; and (b) every religious denomination and every sect thereof shall have the right to establish, maintain and manage its religious institutions.' },
  { number: 21, part: 2, title: 'Safeguard against taxation for purposes of any particular religion', text: 'No person shall be compelled to pay any special tax the proceeds of which are to be spent on the propagation or maintenance of any religion other than his own.' },
  { number: 22, part: 2, title: 'Safeguards as to educational institutions in respect of religion', text: 'No person attending any educational institution shall be required to receive religious instruction, or take part in any religious ceremony, or attend religious worship, if such instruction, ceremony or worship relates to a religion other than his own.' },
  { number: 23, part: 2, title: 'Provision as to property', text: 'Every citizen shall have the right to acquire, hold and dispose of property in any part of Pakistan, subject to the Constitution and any reasonable restrictions imposed by law in the public interest.' },
  { number: 24, part: 2, title: 'Protection of property rights', text: 'No person shall be compulsorily deprived of his property save in accordance with law. No property shall be compulsorily acquired or taken possession of save for a public purpose, and save by the authority of law which provides for compensation therefor and either fixes the amount of compensation or specifies the principles on and the manner in which compensation is to be determined and given.' },
  { number: 25, part: 2, title: 'Equality of citizens', text: 'All citizens are equal before law and are entitled to equal protection of law. There shall be no discrimination on the basis of sex. Nothing in this Article shall prevent the State from making any special provision for the protection of women and children.' },
  { number: '25A', part: 2, title: 'Right to education', text: 'The State shall provide free and compulsory education to all children of the age of five to sixteen years in such manner as may be determined by law.' },
  { number: 26, part: 2, title: 'Non-discrimination in respect of access to public places', text: 'In respect of access to places of public entertainment or resort not intended for religious purposes only, there shall be no discrimination on the ground only of race, religion, caste, sex, residence or place of birth.' },
  { number: 27, part: 2, title: 'Safeguard against discrimination in services', text: 'No citizen otherwise qualified for appointment in the service of Pakistan shall be discriminated against in respect of any such appointment on the ground only of race, religion, caste, sex, residence or place of birth.' },
  { number: 28, part: 2, title: 'Preservation of language, script and culture', text: 'Subject to Article 251 any section of citizens having a distinct language, script or culture shall have the right to preserve and promote the same and subject to law, establish institutions for that purpose.' },

  // Part II Chapter 2: Principles of Policy (Articles 29-40)
  { number: 29, part: 2, title: 'Principles of Policy', text: 'The Principles set out in this Chapter shall be known as the Principles of Policy and it is the responsibility of each organ and authority of the State, and of each person performing functions on behalf of an organ or authority of the State, to act in accordance with those Principles in so far as they relate to the functions of the organ or authority.' },
  { number: 30, part: 2, title: 'Responsibility with respect to Principles of Policy', text: 'The responsibility of deciding whether any action of an organ or authority of the State, or of a person performing functions on behalf of an organ or authority of the State, is in accordance with the Principles of Policy is that of the organ or authority of the State, and of the person concerned.' },
  { number: 31, part: 2, title: 'Islamic way of life', text: 'Steps shall be taken to enable the Muslims of Pakistan, individually and collectively, to order their lives in accordance with the fundamental principles and basic concepts of Islam and to provide facilities whereby they may be enabled to understand the meaning of life according to the Holy Quran and Sunnah.' },
  { number: 32, part: 2, title: 'Promotion of local Government institutions', text: 'The State shall encourage local Government institutions composed of elected representatives of the areas concerned and in such institutions special representation will be given to peasants, workers and women.' },
  { number: 33, part: 2, title: 'Parochial and other similar prejudices to be discouraged', text: 'The State shall discourage parochial, racial, tribal, sectarian and provincial prejudices among the citizens.' },
  { number: 34, part: 2, title: 'Full participation of women in national life', text: 'Steps shall be taken to ensure full participation of women in all spheres of national life.' },
  { number: 35, part: 2, title: 'Protection of family', text: 'The State shall protect the marriage, the family, the mother and the child.' },
  { number: 36, part: 2, title: 'Protection of minorities', text: 'The State shall safeguard the legitimate rights and interests of minorities, including their due representation in the Federal and Provincial services.' },
  { number: 37, part: 2, title: 'Promotion of social justice and eradication of social evils', text: 'The State shall: (a) promote, with special care, the educational and economic interests of backward classes or areas; (b) remove illiteracy and provide free and compulsory secondary education within minimum possible period; (c) make technical and professional education generally available and higher education equally accessible to all on the basis of merit; (d) ensure inexpensive and expeditious justice; (e) make provision for securing just and humane conditions of work, ensuring that children and women are not employed in vocations unsuited to their age or sex; (f) enable people of different areas, through education, training, agricultural and industrial development and other methods, to participate fully in all forms of national activities; (g) prevent prostitution, gambling and taking of injurious drugs, printing, publication, circulation and display of obscene literature and advertisements; (h) prevent the consumption of alcoholic liquor otherwise than for medicinal and, in the case of non-Muslims, religious purposes; and (i) decentralise the Government administration so as to facilitate expeditious disposal of its business to meet the convenience and requirements of the public.' },
  { number: 38, part: 2, title: 'Promotion of social and economic well-being of the people', text: 'The State shall: (a) secure the well-being of the people, irrespective of sex, caste, creed or race, by raising their standard of living; (b) provide for all citizens, within the available resources of the country, facilities for work and adequate livelihood with reasonable rest and leisure; (c) provide for all persons employed in the service of Pakistan or otherwise, social security by compulsory social insurance or other means; (d) provide basic necessities of life, such as food, clothing, housing, education and medical relief, for all citizens who are permanently or temporarily unable to earn their livelihood; (e) reduce disparity in the income and earnings of individuals.' },
  { number: 39, part: 2, title: 'Participation of people in Armed Forces', text: 'The State shall enable people from all parts of Pakistan to participate in the Armed Forces of Pakistan.' },
  { number: 40, part: 2, title: 'Strengthening bonds with Muslim world and promoting international peace', text: 'The State shall endeavour to preserve and strengthen fraternal relations among Muslim countries based on Islamic unity, support the common interests of the peoples of Asia, Africa and Latin America, promote international peace and security, foster goodwill and friendly relations among all nations and encourage the settlement of international disputes by peaceful means.' },

  // Part III: Federation (key articles)
  { number: 41, part: 3, title: 'The President', text: 'There shall be a President of Pakistan who shall be the Head of State and shall represent the unity of the Republic.' },
  { number: 44, part: 3, title: 'Oath of President', text: 'Before entering upon office, the President shall make before the Chief Justice of Pakistan oath in the form set out in the Third Schedule.' },
  { number: 45, part: 3, title: 'Conditions of President\'s office', text: 'The President shall not hold any office of profit in the service of Pakistan or occupy any other position carrying the right to remuneration for the rendering of services.' },
  { number: 48, part: 3, title: 'President to act on advice', text: 'In the exercise of his functions, the President shall act on and in accordance with the advice of the Cabinet or the Prime Minister.' },
  { number: 50, part: 3, title: 'Majlis-e-Shoora (Parliament)', text: 'There shall be a Majlis-e-Shoora (Parliament) of Pakistan consisting of the President and two Houses to be known respectively as the National Assembly and the Senate.' },
  { number: 51, part: 3, title: 'National Assembly', text: 'There shall be three hundred and thirty-six seats of the members in the National Assembly, including seats reserved for women and non-Muslims.' },
  { number: 59, part: 3, title: 'The Senate', text: 'The Senate shall consist of one hundred and four members.' },
  { number: 62, part: 3, title: 'Qualifications for membership of Majlis-e-Shoora', text: 'A person shall not be qualified to be elected or chosen as a member of Majlis-e-Shoora (Parliament) unless he is a citizen of Pakistan, is of the age of twenty-five years or more and is enrolled as a voter, is of good character and is not commonly known as one who violates Islamic Injunctions, has adequate knowledge of Islamic teachings and practises obligatory duties prescribed by Islam as well as abstains from major sins, is sagacious, righteous and non-profligate, honest and ameen.' },
  { number: 73, part: 3, title: 'Procedures at joint sittings', text: 'The National Assembly and the Senate may meet in joint sitting for specific legislative purposes outlined in the Constitution.' },
  { number: 75, part: 3, title: 'President\'s assent to Bills', text: 'When a Bill is passed by the National Assembly and the Senate, it shall be presented to the President for assent.' },
  { number: 89, part: 3, title: 'Ordinance-making power', text: 'The President may, when the National Assembly is not in session and is satisfied that circumstances exist which render it necessary to take immediate action, make and promulgate an Ordinance.' },
  { number: 90, part: 3, title: 'Executive authority of the Federation', text: 'Subject to the Constitution, the executive authority of the Federation shall be exercised in the name of the President by the Federal Government, consisting of the Prime Minister and the Federal Ministers.' },
  { number: 91, part: 3, title: 'The Cabinet', text: 'There shall be a Cabinet of Ministers, with the Prime Minister at its head, to aid and advise the President in the exercise of his functions.' },
  { number: 95, part: 3, title: 'Vote of no-confidence against Prime Minister', text: 'A resolution for a vote of no-confidence moved by not less than twenty per centum of the total membership of the National Assembly may be passed against the Prime Minister by the votes of the majority of the total membership of the National Assembly.' },

  // Part IV: Provinces (key articles)
  { number: 101, part: 4, title: 'Governor', text: 'There shall be a Governor for each Province, who shall be appointed by the President on the advice of the Prime Minister.' },
  { number: 106, part: 4, title: 'Constitution of Provincial Assemblies', text: 'Each Provincial Assembly shall consist of general seats and seats reserved for women and non-Muslims.' },
  { number: 112, part: 4, title: 'Governor\'s assent to Bills', text: 'When a Bill has been passed by the Provincial Assembly, it shall be presented to the Governor for assent.' },
  { number: 130, part: 4, title: 'The Provincial Government', text: 'Subject to the Constitution, the executive authority of the Province shall be exercised in the name of the Governor by the Provincial Government, consisting of the Chief Minister and Provincial Ministers.' },
  { number: 140, part: 4, title: 'Governor\'s rule in Province', text: 'If the Governor is satisfied that a situation has arisen in which the Government of the Province cannot be carried on in accordance with the provisions of the Constitution, the Governor may assume to himself all or any of the functions of the Government of the Province.' },
  { number: '140A', part: 4, title: 'Local government', text: 'Each Province shall, by law, establish a local government system and devolve political, administrative and financial responsibility and authority to the elected representatives of the local governments.' },

  // Part V: Relations between Federation and Provinces
  { number: 141, part: 5, title: 'Extent of Federal and Provincial laws', text: 'Subject to the Constitution, Majlis-e-Shoora (Parliament) may make laws for the whole or any part of Pakistan, and a Provincial Assembly may make laws for the Province or any part thereof.' },
  { number: 142, part: 5, title: 'Subject-matter of Federal and Provincial laws', text: 'Majlis-e-Shoora (Parliament) shall have exclusive power to make laws with respect to any matter in the Federal Legislative List.' },
  { number: 143, part: 5, title: 'Inconsistency between Federal and Provincial law', text: 'If any provision of an Act of a Provincial Assembly is repugnant to any provision of an Act of Majlis-e-Shoora (Parliament), then the Act of Majlis-e-Shoora (Parliament) shall prevail to the extent of the repugnancy.' },
  { number: 153, part: 5, title: 'Council of Common Interests', text: 'There shall be a Council of Common Interests (CCI) consisting of the Chief Ministers of the Provinces and an equal number of members from the Federal Government nominated by the Prime Minister.' },

  // Part VI: Finance
  { number: 160, part: 6, title: 'National Finance Commission', text: 'Within six months of the commencing day and thereafter at intervals of five years, the President shall constitute a National Finance Commission (NFC) to make recommendations on the distribution between the Federation and the Provinces of the net proceeds of taxes.' },
  { number: 161, part: 6, title: 'Natural gas and hydroelectric profits', text: 'Notwithstanding the provisions of Article 78, the net proceeds of the Federal duty of excise on natural gas levied at well-head and collected by the Federal Government, and the royalty collected by the Federal Government on natural gas, oil and minerals, shall not form part of the Federal Consolidated Fund.' },
  { number: 167, part: 6, title: 'Audit', text: 'The accounts of the Federation and of the Provinces shall be kept in such form and in accordance with such principles and methods as the Auditor-General may, with the approval of the President, prescribe.' },

  // Part VII: Judicature
  { number: 175, part: 7, title: 'Establishment and jurisdiction of courts', text: 'There shall be a Supreme Court of Pakistan, a High Court for each Province and such other courts as may be established by law.' },
  { number: 176, part: 7, title: 'Constitution of Supreme Court', text: 'The Supreme Court shall consist of a Chief Justice and so many other Judges as may be determined by Act of Majlis-e-Shoora (Parliament) or, until so determined, as may be fixed by the President.' },
  { number: 177, part: 7, title: 'Appointment of Supreme Court Judges', text: 'The Chief Justice of Pakistan shall be appointed by the President in accordance with Article 175A. Each of the other Judges shall be appointed by the President in accordance with Article 175A.' },
  { number: '175A', part: 7, title: 'Appointment of Judges to the Supreme Court, High Courts and Federal Shariat Court', text: 'There shall be a Judicial Commission of Pakistan for appointment of Judges of the Supreme Court, High Courts and the Federal Shariat Court, and a Parliamentary Committee for confirmation of nominations.' },
  { number: 184, part: 7, title: 'Original jurisdiction of Supreme Court', text: 'The Supreme Court shall, to the exclusion of every other court, have original jurisdiction in any dispute between any two or more Governments. The Supreme Court shall have original jurisdiction if it considers that a question of public importance with reference to the enforcement of any of the Fundamental Rights is involved.' },
  { number: 185, part: 7, title: 'Appellate jurisdiction of Supreme Court', text: 'Subject to this Article, the Supreme Court shall have jurisdiction to hear and determine appeals from judgments, decrees, final orders or sentences of a High Court.' },
  { number: 186, part: 7, title: 'Advisory jurisdiction', text: 'If, at any time, the President considers that it is desirable to obtain the opinion of the Supreme Court on any question of law which he considers of public importance, he may refer the question to the Supreme Court for consideration.' },
  { number: 187, part: 7, title: 'Issue and execution of processes of Supreme Court', text: 'The Supreme Court shall have power to issue such directions, orders or decrees as may be necessary for doing complete justice in any case or matter pending before it.' },
  { number: 192, part: 7, title: 'Constitution of High Court', text: 'A High Court shall consist of a Chief Justice and so many other Judges as may be determined by law or, until so determined, as may be fixed by the President.' },
  { number: 199, part: 7, title: 'Jurisdiction of High Court', text: 'A High Court may, if it is satisfied that no other adequate remedy is provided by law, on the application of any aggrieved person, make an order directing a person performing functions in connection with the affairs of the Federation, a Province or a local authority, to refrain from doing anything he is not permitted by law to do, or to do anything he is required by law to do (writs of mandamus, prohibition, certiorari, habeas corpus and quo warranto).' },
  { number: 203, part: 7, title: 'Federal Shariat Court', text: 'There shall be constituted a court to be called the Federal Shariat Court, which may, either of its own motion or on the petition of a citizen of Pakistan or the Federal Government or a Provincial Government, examine and decide the question whether or not any law or provision of law is repugnant to the Injunctions of Islam.' },

  // Part VIII: Elections
  { number: 213, part: 8, title: 'Chief Election Commissioner and Election Commission', text: 'There shall be a Chief Election Commissioner and an Election Commission consisting of the Chief Election Commissioner and four members.' },
  { number: 218, part: 8, title: 'Election Commission', text: 'It shall be the duty of the Election Commission to organize and conduct the election and to make such arrangements as are necessary to ensure that the election is conducted honestly, justly, fairly and in accordance with law.' },
  { number: 222, part: 8, title: 'Electoral laws', text: 'Subject to the Constitution, Majlis-e-Shoora (Parliament) may by law provide for all matters relating to or connected with elections.' },

  // Part IX: Islamic Provisions
  { number: 227, part: 9, title: 'Provisions relating to the Holy Quran and Sunnah', text: 'All existing laws shall be brought in conformity with the Injunctions of Islam as laid down in the Holy Quran and Sunnah, and no law shall be enacted which is repugnant to such Injunctions.' },
  { number: 228, part: 9, title: 'Composition, etc., of Islamic Council', text: 'There shall be constituted an Islamic Council, referred to as the Council of Islamic Ideology, which shall have a Chairman and such number of other members, being not less than eight and not more than twenty, as the President may determine.' },
  { number: 230, part: 9, title: 'Functions of Islamic Council', text: 'The functions of the Islamic Council shall be to make recommendations to Majlis-e-Shoora (Parliament) and the Provincial Assemblies as to the ways and means of enabling and encouraging the Muslims of Pakistan to order their lives individually and collectively in all respects in accordance with the principles and concepts of Islam.' },

  // Part X: Emergency
  { number: 232, part: 10, title: 'Proclamation of Emergency', text: 'If the President is satisfied that a grave emergency exists in which the security of Pakistan, or any part thereof, is threatened by war or external aggression or by internal disturbance beyond the power of a Provincial Government to control, he may issue a Proclamation of Emergency.' },
  { number: 233, part: 10, title: 'Power to suspend fundamental rights during emergency', text: 'Nothing in Articles 15, 16, 17, 18, 19 and 24 shall restrict the power of the State to make any law or take any executive action which it would, but for the provisions contained in those Articles, be competent to make or take, while a Proclamation of Emergency is in force.' },
  { number: 234, part: 10, title: 'Power to issue Proclamation in case of failure of constitutional machinery in a Province', text: 'If the President, on receipt of a report from the Governor of a Province, is satisfied that a situation has arisen in which the Government of the Province cannot be carried on in accordance with the provisions of the Constitution, the President shall by Proclamation assume to himself, or direct the Governor to assume on behalf of the President, all or any of the functions of the Government of the Province.' },
  { number: 236, part: 10, title: 'Financial emergency', text: 'If the President is satisfied that a situation has arisen whereby the financial stability or credit of Pakistan or any part thereof is threatened, he may, after consultation with the Governors of the Provinces and the Finance Minister, issue a Proclamation of Financial Emergency.' },

  // Part XI: Amendment
  { number: 238, part: 11, title: 'Amendment of Constitution', text: 'The Constitution may be amended by Act of Majlis-e-Shoora (Parliament).' },
  { number: 239, part: 11, title: 'Constitution Amendment Bill', text: 'A Bill to amend the Constitution may originate in either House and, when the Bill has been passed by the votes of not less than two-thirds of the total membership of the House, it shall be transmitted to the other House.' },

  // Part XII: Miscellaneous (key articles)
  { number: 243, part: 12, title: 'Command of Armed Forces', text: 'The Federal Government shall have control and command of the Armed Forces.' },
  { number: 245, part: 12, title: 'Protection of Armed Forces', text: 'The Armed Forces shall, under the directions of the Federal Government, defend Pakistan against external aggression or threat of war, and, subject to law, act in aid of civil power when called upon to do so.' },
  { number: 251, part: 12, title: 'National language', text: 'The National language of Pakistan is Urdu, and arrangements shall be made for its being used for official and other purposes within fifteen years from the commencing day. The English language may be used for official purposes until arrangements are made for its replacement by Urdu. Without prejudice to the status of the National language, a Provincial Assembly may by law prescribe measures for the teaching, promotion and use of a provincial language in addition to the national language.' },
  { number: 256, part: 12, title: 'Private armies forbidden', text: 'No private organization capable of functioning as a military organization shall be formed, and any such organization shall be illegal.' },
  { number: 260, part: 12, title: 'Definitions', text: 'Contains definitions of key terms used in the Constitution, including "Act of Majlis-e-Shoora (Parliament)", "citizen", "Constitution", "Federal Government", etc.' },
  { number: 270, part: 12, title: 'Temporary provisions', text: 'Provisions relating to transitional arrangements and validation of certain laws and actions.' },
  { number: '270AA', part: 12, title: 'Declaration and continuance of laws etc.', text: 'Actions, Ordinances, orders, rules, bye-laws, regulations, notifications and other legal instruments which were made, done, issued, taken or purported to have been made since October 12, 1999, are hereby affirmed, adopted and declared to have been validly made.' },
];

const AMENDMENTS = [
  { number: 1, year: 1974, summary: 'Declared Ahmadis as non-Muslims for purposes of the Constitution; defined the boundaries of Pakistan.' },
  { number: 2, year: 1974, summary: 'Recognition of Bangladesh; related territorial adjustments.' },
  { number: 3, year: 1975, summary: 'Extended period of preventive detention without reference to a review board from one to three months.' },
  { number: 4, year: 1975, summary: 'Restricted fundamental rights; limited jurisdiction of High Courts in certain matters.' },
  { number: 5, year: 1976, summary: 'Extended term of National and Provincial Assemblies from five to six years; increased number of High Court judges.' },
  { number: 6, year: 1976, summary: 'Fixed retirement age for Supreme Court and High Court judges.' },
  { number: 7, year: 1977, summary: 'Provisions for referendum by the Prime Minister; election-related modifications.' },
  { number: 8, year: 1985, summary: 'Major amendment under Zia-ul-Haq: gave President power to dissolve National Assembly (Article 58(2)(b)), appoint armed forces chiefs, governors; Islamization provisions added. Also required PM advice for judges\' appointments.' },
  { number: 9, year: 1985, summary: 'Ensured representation of FATA in the Senate.' },
  { number: 10, year: 1987, summary: 'Seats reserved for women in National Assembly extended for next term.' },
  { number: 11, year: 1989, summary: 'Women seats reservation further extended.' },
  { number: 12, year: 1991, summary: 'Added Article 270-A for continuance of laws under martial law, Shariat enforcement provisions.' },
  { number: 13, year: 1997, summary: 'Removed President\'s power to dissolve National Assembly (Article 58(2)(b)); strengthened PM\'s position; party discipline provisions (Article 63A — floor crossing).' },
  { number: 14, year: 1997, summary: 'Strengthened anti-defection laws; members cannot vote against party line.' },
  { number: 15, year: 1998, summary: 'Provisions for enforcement of Sharia law; added Nizam-e-Shariat clause (never fully implemented).' },
  { number: 16, year: 1999, summary: 'Extended reserved seats for minorities; quota for women in local bodies.' },
  { number: 17, year: 2003, summary: 'Under Musharraf: restored President\'s power to dissolve National Assembly; created National Security Council; graduation requirement for legislators; expanded Senate and Assembly seats.' },
  { number: 18, year: 2010, summary: 'Landmark amendment: removed President\'s power to dissolve assemblies; restored parliamentary sovereignty; renamed NWFP to Khyber Pakhtunkhwa; provincial autonomy strengthened; CCI and NFC enhanced; right to education (25A) and right to information (19A) added; concurrent list abolished; PM empowered for appointments; Judicial Commission established (175A).' },
  { number: 19, year: 2011, summary: 'Modified appointment process for superior court judges; strengthened Judicial Commission and Parliamentary Committee role.' },
  { number: 20, year: 2012, summary: 'Dissolution of FATA as separate entity into Khyber Pakhtunkhwa provisions initiated; caretaker government provisions refined.' },
  { number: 21, year: 2015, summary: 'Established military courts for trial of terrorism-related offences for two years (expired 2017, extended once).' },
  { number: 22, year: 2016, summary: 'Made elections for tribal areas (FATA) on adult franchise basis; removed collective responsibility clause.' },
  { number: 23, year: 2017, summary: 'Extended military courts for another two years; provisions for trial of terrorism offences by military courts.' },
  { number: 24, year: 2017, summary: 'Updated census-based seat allocation; adjusted delimitation timeline provisions.' },
  { number: 25, year: 2018, summary: 'Merged FATA into Khyber Pakhtunkhwa; provided for seats in KP Assembly for tribal districts; transitional provisions for merged areas.' },
  { number: 26, year: 2024, summary: 'Increased Supreme Court bench size; established constitutional courts/benches; modified judicial appointment process; raised retirement age for judges; restructured Supreme Judicial Council.' },
];

function parseArgs(args) {
  const result = { _: [] };
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      const next = args[i + 1];
      if (next && !next.startsWith('--')) { result[key] = next; i++; }
      else result[key] = true;
    } else {
      result._.push(args[i]);
    }
  }
  return result;
}

function matchArticle(num) {
  const s = String(num).toUpperCase();
  return ARTICLES.find(a => String(a.number).toUpperCase() === s);
}

const args = parseArgs(process.argv.slice(2));
const cmd = args._[0];

if (!cmd) {
  console.log(JSON.stringify({ error: 'Usage: constitution.mjs <search|article|part|rights|principles|amendments|parts> [--flags]' }));
  process.exit(1);
}

if (cmd === 'parts') {
  console.log(JSON.stringify({ parts: PARTS, total: PARTS.length }));
} else if (cmd === 'rights') {
  const rights = ARTICLES.filter(a => {
    const n = typeof a.number === 'number' ? a.number : parseInt(a.number);
    return a.part === 2 && n >= 8 && n <= 28;
  });
  // ponytail: also include 10A, 19A, 25A which are string numbers in the range
  const extra = ARTICLES.filter(a => typeof a.number === 'string' && a.part === 2 && ['10A','19A','25A'].includes(a.number));
  const all = [...rights, ...extra].sort((a, b) => {
    const na = parseFloat(String(a.number).replace('A', '.5'));
    const nb = parseFloat(String(b.number).replace('A', '.5'));
    return na - nb;
  });
  // deduplicate
  const seen = new Set();
  const deduped = all.filter(a => { const k = String(a.number); if (seen.has(k)) return false; seen.add(k); return true; });
  console.log(JSON.stringify({ fundamentalRights: deduped, total: deduped.length }));
} else if (cmd === 'principles') {
  const principles = ARTICLES.filter(a => {
    const n = typeof a.number === 'number' ? a.number : parseInt(a.number);
    return a.part === 2 && n >= 29 && n <= 40;
  });
  console.log(JSON.stringify({ principlesOfPolicy: principles, total: principles.length }));
} else if (cmd === 'amendments') {
  console.log(JSON.stringify({ amendments: AMENDMENTS, total: AMENDMENTS.length }));
} else if (cmd === 'article') {
  const num = args.number;
  if (!num) { console.log(JSON.stringify({ error: 'Usage: constitution.mjs article --number <N>' })); process.exit(1); }
  const art = matchArticle(num);
  if (!art) { console.log(JSON.stringify({ error: `Article ${num} not found in database. Note: not all 280 articles are included — key articles from each part are covered.` })); process.exit(1); }
  console.log(JSON.stringify(art));
} else if (cmd === 'part') {
  const num = parseInt(args.number);
  if (!num) { console.log(JSON.stringify({ error: 'Usage: constitution.mjs part --number <N>' })); process.exit(1); }
  const part = PARTS.find(p => p.number === num);
  if (!part) { console.log(JSON.stringify({ error: `Part ${num} not found` })); process.exit(1); }
  const articles = ARTICLES.filter(a => a.part === num);
  console.log(JSON.stringify({ part, articles, totalInDatabase: articles.length }));
} else if (cmd === 'search') {
  const q = (args.query || '').toLowerCase();
  if (!q) { console.log(JSON.stringify({ error: 'Usage: constitution.mjs search --query <keyword>' })); process.exit(1); }
  const results = ARTICLES.filter(a =>
    a.title.toLowerCase().includes(q) || a.text.toLowerCase().includes(q)
  );
  console.log(JSON.stringify({ query: q, results, total: results.length }));
} else {
  console.log(JSON.stringify({ error: `Unknown command: ${cmd}. Use: search, article, part, rights, principles, amendments, parts` }));
  process.exit(1);
}
