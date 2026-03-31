// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

export const SPORTS_LIST = [
  "Athletics",
] as const;

export const SPORT_CATEGORIES: Record<string, string[]> = {
  Athletics: ["Running", "Hurdles", "Jumping"],
  Swimming: ["Freestyle", "Backstroke", "Breaststroke", "Butterfly", "Individual Medley"],
  Cricket: ["Batting", "Bowling", "Wicket Keeping", "All-Rounder"],
  Football: ["Goalkeeper", "Defender", "Midfielder", "Forward"],
  Badminton: ["Singles", "Doubles", "Mixed Doubles"],
  Tennis: ["Singles", "Doubles", "Mixed Doubles"],
  Boxing: [
    "Light Flyweight", "Flyweight", "Bantamweight", "Featherweight", "Lightweight",
    "Welterweight", "Middleweight", "Super Middleweight", "Light Heavyweight", "Heavyweight",
  ],
  Wrestling: ["Freestyle", "Greco-Roman"],
  Shooting: ["Rifle", "Pistol", "Shotgun"],
  Cycling: ["Road", "Track", "Mountain Bike", "BMX"],
};

export const SPORTS_REQUIRING_DOMINANT_HAND = [
  "Badminton", "Tennis", "Table Tennis", "Cricket", "Baseball",
  "Boxing", "Fencing", "Golf", "Shooting",
];

export const CURRENT_LEVELS = [
  { value: "school", label: "School" },
  { value: "district", label: "District" },
  { value: "state", label: "State" },
  { value: "national", label: "National" },
  { value: "international", label: "International" },
];

export const PREFERRED_TRAINING_TYPES = [
  "Individual Coaching", "Group Training", "Online Coaching",
  "Academy Training", "Self-Training", "Hybrid",
];

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const DISABILITY_CATEGORIES = [
  "Visual Impairment", "Hearing Impairment", "Physical Disability",
  "Intellectual Disability", "Other",
];

export const NATIONALITIES = ["India", "Other"];

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Chandigarh", "Ladakh", "Jammu & Kashmir", "Puducherry",
  "Andaman & Nicobar Islands", "Dadra & Nagar Haveli and Daman & Diu", "Lakshadweep",
];

// ---------------------------------------------------------------------------
// State → Districts
// ---------------------------------------------------------------------------
export const STATE_DISTRICTS: Record<string, string[]> = {
  "Andhra Pradesh": ["Alluri Sitharama Raju","Anakapalli","Anantapur","Annamayya","Bapatla","Chittoor","East Godavari","Eluru","Guntur","Kadapa","Kakinada","Konaseema","Krishna","Kurnool","Nandyal","NTR","Palnadu","Parvathipuram Manyam","Prakasam","Sri Potti Sriramulu Nellore","Sri Sathya Sai","Srikakulam","Tirupati","Visakhapatnam","Vizianagaram","West Godavari"],
  "Arunachal Pradesh": ["Anjaw","Changlang","Dibang Valley","East Kameng","East Siang","Kamle","Kra Daadi","Kurung Kumey","Lepa Rada","Lohit","Longding","Lower Dibang Valley","Lower Siang","Lower Subansiri","Namsai","Pakke-Kessang","Papum Pare","Shi Yomi","Siang","Tawang","Tirap","Upper Siang","Upper Subansiri","West Kameng","West Siang"],
  "Assam": ["Bajali","Baksa","Barpeta","Biswanath","Bongaigaon","Cachar","Charaideo","Chirang","Darrang","Dhemaji","Dhubri","Dibrugarh","Dima Hasao","Goalpara","Golaghat","Hailakandi","Hojai","Jorhat","Kamrup","Kamrup Metropolitan","Karbi Anglong","Karimganj","Kokrajhar","Lakhimpur","Majuli","Morigaon","Nagaon","Nalbari","Sivasagar","Sonitpur","South Salmara-Mankachar","Tinsukia","Udalguri","West Karbi Anglong"],
  "Bihar": ["Araria","Arwal","Aurangabad","Banka","Begusarai","Bhagalpur","Bhojpur","Buxar","Darbhanga","East Champaran","Gaya","Gopalganj","Jamui","Jehanabad","Kaimur","Katihar","Khagaria","Kishanganj","Lakhisarai","Madhepura","Madhubani","Munger","Muzaffarpur","Nalanda","Nawada","Patna","Purnia","Rohtas","Saharsa","Samastipur","Saran","Sheikhpura","Sheohar","Sitamarhi","Siwan","Supaul","Vaishali","West Champaran"],
  "Chhattisgarh": ["Balod","Baloda Bazar","Balrampur","Bastar","Bemetara","Bijapur","Bilaspur","Dantewada","Dhamtari","Durg","Gariaband","Gaurela-Pendra-Marwahi","Janjgir-Champa","Jashpur","Kabirdham","Kanker","Khairagarh","Kondagaon","Korba","Koriya","Mahasamund","Manendragarh","Mohla-Manpur","Mungeli","Narayanpur","Raigarh","Raipur","Rajnandgaon","Sakti","Sarangarh-Bilaigarh","Sukma","Surajpur","Surguja"],
  "Goa": ["North Goa","South Goa"],
  "Gujarat": ["Ahmedabad","Amreli","Anand","Aravalli","Banaskantha","Bharuch","Bhavnagar","Botad","Chhota Udaipur","Dahod","Dang","Devbhoomi Dwarka","Gandhinagar","Gir Somnath","Jamnagar","Junagadh","Kheda","Kutch","Mahisagar","Mehsana","Morbi","Narmada","Navsari","Panchmahal","Patan","Porbandar","Rajkot","Sabarkantha","Surat","Surendranagar","Tapi","Vadodara","Valsad"],
  "Haryana": ["Ambala","Bhiwani","Charkhi Dadri","Faridabad","Fatehabad","Gurugram","Hisar","Jhajjar","Jind","Kaithal","Karnal","Kurukshetra","Mahendragarh","Nuh","Palwal","Panchkula","Panipat","Rewari","Rohtak","Sirsa","Sonipat","Yamunanagar"],
  "Himachal Pradesh": ["Bilaspur","Chamba","Hamirpur","Kangra","Kinnaur","Kullu","Lahaul and Spiti","Mandi","Shimla","Sirmaur","Solan","Una"],
  "Jharkhand": ["Bokaro","Chatra","Deoghar","Dhanbad","Dumka","East Singhbhum","Garhwa","Giridih","Godda","Gumla","Hazaribagh","Jamtara","Khunti","Koderma","Latehar","Lohardaga","Pakur","Palamu","Ramgarh","Ranchi","Sahebganj","Seraikela Kharsawan","Simdega","West Singhbhum"],
  "Karnataka": ["Bagalkot","Ballari","Belagavi","Bengaluru Rural","Bengaluru Urban","Bidar","Chamarajanagar","Chikkaballapur","Chikkamagaluru","Chitradurga","Dakshina Kannada","Davanagere","Dharwad","Gadag","Hassan","Haveri","Kalaburagi","Kodagu","Kolar","Koppal","Mandya","Mysuru","Raichur","Ramanagara","Shivamogga","Tumakuru","Udupi","Uttara Kannada","Vijayapura","Yadgir"],
  "Kerala": ["Alappuzha","Ernakulam","Idukki","Kannur","Kasaragod","Kollam","Kottayam","Kozhikode","Malappuram","Palakkad","Pathanamthitta","Thiruvananthapuram","Thrissur","Wayanad"],
  "Madhya Pradesh": ["Agar Malwa","Alirajpur","Anuppur","Ashoknagar","Balaghat","Barwani","Betul","Bhind","Bhopal","Burhanpur","Chhatarpur","Chhindwara","Damoh","Datia","Dewas","Dhar","Dindori","Guna","Gwalior","Harda","Hoshangabad","Indore","Jabalpur","Jhabua","Katni","Khandwa","Khargone","Maihar","Mandla","Mandsaur","Mauganj","Morena","Narsinghpur","Neemuch","Niwari","Panna","Raisen","Rajgarh","Ratlam","Rewa","Sagar","Satna","Sehore","Seoni","Shahdol","Shajapur","Sheopur","Shivpuri","Sidhi","Singrauli","Tikamgarh","Ujjain","Umaria","Vidisha"],
  "Maharashtra": ["Ahmednagar","Akola","Amravati","Aurangabad","Beed","Bhandara","Buldhana","Chandrapur","Dhule","Gadchiroli","Gondia","Hingoli","Jalgaon","Jalna","Kolhapur","Latur","Mumbai City","Mumbai Suburban","Nagpur","Nanded","Nandurbar","Nashik","Osmanabad","Palghar","Parbhani","Pune","Raigad","Ratnagiri","Sangli","Satara","Sindhudurg","Solapur","Thane","Wardha","Washim","Yavatmal"],
  "Manipur": ["Bishnupur","Chandel","Churachandpur","Imphal East","Imphal West","Jiribam","Kakching","Kamjong","Kangpokpi","Noney","Pherzawl","Senapati","Tamenglong","Tengnoupal","Thoubal","Ukhrul"],
  "Meghalaya": ["East Garo Hills","East Jaintia Hills","East Khasi Hills","Eastern West Khasi Hills","North Garo Hills","Ri Bhoi","South Garo Hills","South West Garo Hills","South West Khasi Hills","West Garo Hills","West Jaintia Hills","West Khasi Hills"],
  "Mizoram": ["Aizawl","Champhai","Hnahthial","Khawzawl","Kolasib","Lawngtlai","Lunglei","Mamit","Saiha","Saitual","Serchhip"],
  "Nagaland": ["Chumoukedima","Dimapur","Kiphire","Kohima","Longleng","Mokokchung","Mon","Niuland","Noklak","Peren","Phek","Shamator","Tseminyu","Tuensang","Wokha","Zunheboto"],
  "Odisha": ["Angul","Balangir","Balasore","Bargarh","Bhadrak","Boudh","Cuttack","Deogarh","Dhenkanal","Gajapati","Ganjam","Jagatsinghpur","Jajpur","Jharsuguda","Kalahandi","Kandhamal","Kendrapara","Kendujhar","Khordha","Koraput","Malkangiri","Mayurbhanj","Nabarangpur","Nayagarh","Nuapada","Puri","Rayagada","Sambalpur","Sonepur","Sundargarh"],
  "Punjab": ["Amritsar","Barnala","Bathinda","Faridkot","Fatehgarh Sahib","Fazilka","Ferozepur","Gurdaspur","Hoshiarpur","Jalandhar","Kapurthala","Ludhiana","Malerkotla","Mansa","Moga","Mohali","Muktsar","Pathankot","Patiala","Rupnagar","Sangrur","Shaheed Bhagat Singh Nagar","Tarn Taran"],
  "Rajasthan": ["Ajmer","Alwar","Banswara","Baran","Barmer","Bharatpur","Bhilwara","Bikaner","Bundi","Chittorgarh","Churu","Dausa","Dholpur","Dungarpur","Hanumangarh","Jaipur","Jaisalmer","Jalore","Jhalawar","Jhunjhunu","Jodhpur","Karauli","Kota","Nagaur","Pali","Pratapgarh","Rajsamand","Sawai Madhopur","Sikar","Sirohi","Sri Ganganagar","Tonk","Udaipur"],
  "Sikkim": ["East Sikkim","North Sikkim","Pakyong","Soreng","South Sikkim","West Sikkim"],
  "Tamil Nadu": ["Ariyalur","Chengalpattu","Chennai","Coimbatore","Cuddalore","Dharmapuri","Dindigul","Erode","Kallakurichi","Kancheepuram","Kanyakumari","Karur","Krishnagiri","Madurai","Mayiladuthurai","Nagapattinam","Namakkal","Nilgiris","Perambalur","Pudukkottai","Ramanathapuram","Ranipet","Salem","Sivaganga","Tenkasi","Thanjavur","Theni","Thoothukudi","Tiruchirappalli","Tirunelveli","Tirupathur","Tiruppur","Tiruvallur","Tiruvannamalai","Tiruvarur","Vellore","Viluppuram","Virudhunagar"],
  "Telangana": ["Adilabad","Bhadradri Kothagudem","Hanumakonda","Hyderabad","Jagtial","Jangaon","Jayashankar Bhupalpally","Jogulamba Gadwal","Kamareddy","Karimnagar","Khammam","Komaram Bheem","Mahabubabad","Mahabubnagar","Mancherial","Medak","Medchal-Malkajgiri","Mulugu","Nagarkurnool","Nalgonda","Narayanpet","Nirmal","Nizamabad","Peddapalli","Rajanna Sircilla","Rangareddy","Sangareddy","Siddipet","Suryapet","Vikarabad","Wanaparthy","Warangal","Yadadri Bhuvanagiri"],
  "Tripura": ["Dhalai","Gomati","Khowai","North Tripura","Sepahijala","Sipahijala","South Tripura","Unakoti","West Tripura"],
  "Uttar Pradesh": ["Agra","Aligarh","Ambedkar Nagar","Amethi","Amroha","Auraiya","Ayodhya","Azamgarh","Baghpat","Bahraich","Ballia","Balrampur","Banda","Barabanki","Bareilly","Basti","Bhadohi","Bijnor","Budaun","Bulandshahr","Chandauli","Chitrakoot","Deoria","Etah","Etawah","Farrukhabad","Fatehpur","Firozabad","Gautam Buddha Nagar","Ghaziabad","Ghazipur","Gonda","Gorakhpur","Hamirpur","Hapur","Hardoi","Hathras","Jalaun","Jaunpur","Jhansi","Kannauj","Kanpur Dehat","Kanpur Nagar","Kasganj","Kaushambi","Kheri","Kushinagar","Lalitpur","Lucknow","Maharajganj","Mahoba","Mainpuri","Mathura","Mau","Meerut","Mirzapur","Moradabad","Muzaffarnagar","Pilibhit","Pratapgarh","Prayagraj","Rae Bareli","Rampur","Saharanpur","Sambhal","Sant Kabir Nagar","Shahjahanpur","Shamli","Shravasti","Siddharthnagar","Sitapur","Sonbhadra","Sultanpur","Unnao","Varanasi"],
  "Uttarakhand": ["Almora","Bageshwar","Chamoli","Champawat","Dehradun","Haridwar","Nainital","Pauri Garhwal","Pithoragarh","Rudraprayag","Tehri Garhwal","Udham Singh Nagar","Uttarkashi"],
  "West Bengal": ["Alipurduar","Bankura","Birbhum","Cooch Behar","Dakshin Dinajpur","Darjeeling","Hooghly","Howrah","Jalpaiguri","Jhargram","Kalimpong","Kolkata","Malda","Murshidabad","Nadia","North 24 Parganas","Paschim Bardhaman","Paschim Medinipur","Purba Bardhaman","Purba Medinipur","Purulia","South 24 Parganas","Uttar Dinajpur"],
  "Delhi": ["Central Delhi","East Delhi","New Delhi","North Delhi","North East Delhi","North West Delhi","Shahdara","South Delhi","South East Delhi","South West Delhi","West Delhi"],
  "Chandigarh": ["Chandigarh"],
  "Ladakh": ["Kargil","Leh"],
  "Jammu & Kashmir": ["Anantnag","Bandipora","Baramulla","Budgam","Doda","Ganderbal","Jammu","Kathua","Kishtwar","Kulgam","Kupwara","Poonch","Pulwama","Rajouri","Ramban","Reasi","Samba","Shopian","Srinagar","Udhampur"],
  "Puducherry": ["Karaikal","Mahe","Puducherry","Yanam"],
  "Andaman & Nicobar Islands": ["Nicobar","North & Middle Andaman","South Andaman"],
  "Dadra & Nagar Haveli and Daman & Diu": ["Dadra & Nagar Haveli","Daman","Diu"],
  "Lakshadweep": ["Lakshadweep"],
};

// ---------------------------------------------------------------------------
// District → Cities / Towns
// ---------------------------------------------------------------------------
export const DISTRICT_CITIES: Record<string, string[]> = {
  // Andhra Pradesh
  "Visakhapatnam": ["Visakhapatnam","Bheemunipatnam","Gajuwaka","Narsipatnam","Paderu"],
  "East Godavari": ["Kakinada","Rajahmundry","Amalapuram","Tuni","Ramachandrapuram"],
  "West Godavari": ["Eluru","Bhimavaram","Tanuku","Narsapur","Palakol"],
  "Krishna": ["Machilipatnam","Vijayawada","Gudivada","Vuyyuru","Nandigama"],
  "Guntur": ["Guntur","Tenali","Narasaraopet","Mangalagiri","Sattenapalle"],
  "Prakasam": ["Ongole","Markapur","Giddalur","Chirala","Kandukur"],
  "Sri Potti Sriramulu Nellore": ["Nellore","Gudur","Kavali","Sullurpeta","Atmakur"],
  "Chittoor": ["Chittoor","Tirupati","Madanapalle","Srikalahasti","Puttur"],
  "Kadapa": ["Kadapa","Proddatur","Cuddapah","Jammalamadugu","Rajampet"],
  "Kurnool": ["Kurnool","Nandyal","Adoni","Dhone","Yemmiganur"],
  "Anantapur": ["Anantapur","Guntakal","Hindupur","Kadiri","Tadipatri"],
  "Tirupati": ["Tirupati","Srikalahasti","Puttur","Sullurpeta","Venkatagiri"],
  "NTR": ["Vijayawada","Nandigama","Jaggayyapeta"],
  "Bapatla": ["Bapatla","Chirala","Repalle"],
  "Eluru": ["Eluru","Bhimavaram","Narsapur"],
  "Palnadu": ["Narasaraopet","Macherla","Gurazala"],
  "Alluri Sitharama Raju": ["Paderu","Narsipatnam","Rampachodavaram"],
  "Anakapalli": ["Anakapalli","Bheemunipatnam","Chodavaram"],
  "Konaseema": ["Amalapuram","Razole","Mummidivaram"],
  "Kakinada": ["Kakinada","Peddapuram","Tuni"],
  "Annamayya": ["Madanapalle","Rayachoti","Rajampet"],
  "Sri Sathya Sai": ["Hindupur","Kadiri","Puttaparthi"],
  "Nandyal": ["Nandyal","Dhone","Allagadda"],
  "Vizianagaram": ["Vizianagaram","Bobbili","Salur"],
  "Srikakulam": ["Srikakulam","Narasannapeta","Palasa"],
  "Parvathipuram Manyam": ["Parvathipuram","Salur","Palakonda"],
  // Tamil Nadu
  "Chennai": ["Chennai","Ambattur","Anna Nagar","Perambur","Tambaram","Velachery","Chrompet","Porur","Adyar","Mylapore"],
  "Coimbatore": ["Coimbatore","Tiruppur","Pollachi","Mettupalayam","Udumalaipettai"],
  "Madurai": ["Madurai","Dindigul","Natham","Tirumangalam","Melur"],
  "Salem": ["Salem","Mettur","Omalur","Namakkal","Rasipuram"],
  "Tiruchirappalli": ["Tiruchirappalli","Lalgudi","Musiri","Srirangam","Thuraiyur"],
  "Tirunelveli": ["Tirunelveli","Tenkasi","Sankarankoil","Ambasamudram","Cheranmahadevi"],
  "Thoothukudi": ["Thoothukudi","Kovilpatti","Sathankulam","Thiruvasagam","Ottapidaram"],
  "Kancheepuram": ["Kancheepuram","Chengalpattu","Tambaram","Uthiramerur","Sriperumbudur"],
  "Vellore": ["Vellore","Ranipet","Wallajapet","Arakkonam","Arcot"],
  "Erode": ["Erode","Bhavani","Gobichettipalayam","Perundurai","Dharapuram"],
  "Tiruppur": ["Tiruppur","Avinashi","Dharapuram","Palladam","Udumalaipettai"],
  "Thanjavur": ["Thanjavur","Kumbakonam","Papanasam","Pattukottai","Orathanadu"],
  "Dindigul": ["Dindigul","Natham","Oddanchatram","Palani","Vedasandur"],
  "Kanyakumari": ["Nagercoil","Padmanabhapuram","Colachel","Thuckalay","Kuzhithurai"],
  "Nagapattinam": ["Nagapattinam","Vedaranyam","Sirkali","Mayiladuthurai","Sirkazhi"],
  "Mayiladuthurai": ["Mayiladuthurai","Sirkazhi","Sirkali","Kollidam"],
  "Pudukkottai": ["Pudukkottai","Aranthangi","Karambakudi","Tirumayam","Alangudi"],
  "Ramanathapuram": ["Ramanathapuram","Rameswaram","Paramakudi","Thiruvadanai","Mudukulathur"],
  "Sivaganga": ["Sivaganga","Karaikudi","Devakottai","Tiruppattur","Manamadurai"],
  "Virudhunagar": ["Virudhunagar","Sivakasi","Sattur","Aruppukkottai","Srivilliputhur"],
  "Theni": ["Theni","Periyakulam","Uthamapalayam","Bodi","Cumbum"],
  "Nilgiris": ["Udhagamandalam","Gudalur","Coonoor","Kotagiri","Panthalur"],
  "Dharmapuri": ["Dharmapuri","Pappireddipatti","Harur","Pennagaram"],
  "Krishnagiri": ["Krishnagiri","Hosur","Bargur","Uthangarai","Veppanapalli"],
  "Namakkal": ["Namakkal","Rasipuram","Tiruchengode","Kumarapalayam","Sankagiri"],
  "Ariyalur": ["Ariyalur","Sendurai","Jayankondam","Andimadam"],
  "Perambalur": ["Perambalur","Kunnam","Alathur","Veppanthattai"],
  "Tiruvannamalai": ["Tiruvannamalai","Arni","Cheyyar","Polur","Vandavasi"],
  "Tiruvarur": ["Tiruvarur","Papanasam","Thiruthuraipoondi","Kodavasal"],
  "Karur": ["Karur","Kulithalai","Aravakurichi","Krishnarayapuram"],
  "Cuddalore": ["Cuddalore","Chidambaram","Panruti","Kattumannarkoil","Virudhachalam"],
  "Kallakurichi": ["Kallakurichi","Ulundurpet","Sankarapuram","Chinnasalem"],
  "Chengalpattu": ["Chengalpattu","Maraimalai Nagar","Sriperumbudur","Tambaram"],
  "Ranipet": ["Ranipet","Walajapet","Arcot","Arakkonam"],
  "Tirupathur": ["Tirupathur","Jolarpet","Vaniyambadi","Ambur"],
  "Tenkasi": ["Tenkasi","Sankarankoil","Courtallam","Kadayanallur"],
  "Viluppuram": ["Viluppuram","Tindivanam","Gingee","Thirukoilur","Vanur"],
  // Karnataka
  "Bengaluru Urban": ["Bengaluru","Yelahanka","Krishnarajapuram","Bommanahalli","Byatarayanapura"],
  "Bengaluru Rural": ["Devanahalli","Doddaballapur","Hosakote","Nelamangala"],
  "Mysuru": ["Mysuru","Nanjangud","Chamrajanagar","T. Narsipur","Hunsur"],
  "Dakshina Kannada": ["Mangaluru","Bantwal","Puttur","Sullia","Belthangady"],
  "Udupi": ["Udupi","Kundapur","Karkala","Brahmavar","Gangolli"],
  "Uttara Kannada": ["Karwar","Sirsi","Kumta","Ankola","Honnavar"],
  "Belagavi": ["Belagavi","Hubli","Dharwad","Gokak","Chikodi"],
  "Dharwad": ["Dharwad","Hubli","Kundgol","Navalgund","Kalghatgi"],
  "Gadag": ["Gadag","Gadag-Betageri","Ron","Shirahatti","Mundargi"],
  "Haveri": ["Haveri","Savanur","Ranibennur","Hanagal","Byadgi"],
  "Vijayapura": ["Vijayapura","Bidar","Basavana Bagewadi","Muddebihal","Sindagi"],
  "Bagalkot": ["Bagalkot","Jamkhandi","Mudhol","Badami","Ilkal"],
  "Ballari": ["Ballari","Hospet","Sandur","Siruguppa","Kudligi"],
  "Raichur": ["Raichur","Sindhanur","Manvi","Lingasugur","Deodurga"],
  "Koppal": ["Koppal","Gangavathi","Kushtagi","Yelburga"],
  "Kalaburagi": ["Kalaburagi","Gulbarga","Afzalpur","Aland","Chincholi"],
  "Yadgir": ["Yadgir","Shorapur","Raichur","Gurmatkal","Shahpur"],
  "Bidar": ["Bidar","Basavakalyan","Bhalki","Aurad","Humnabad"],
  "Chikkaballapur": ["Chikkaballapur","Gauribidanur","Gudibanda","Bagepalli","Chintamani"],
  "Kolar": ["Kolar","KGF","Mulbagal","Srinivaspur","Bangarapet"],
  "Tumakuru": ["Tumakuru","Sira","Pavanagara","Tiptur","Madhugiri"],
  "Hassan": ["Hassan","Belur","Sakleshpur","Alur","Channarayapatna"],
  "Shivamogga": ["Shivamogga","Bhadravati","Sagar","Hosanagara","Thirthahalli"],
  "Chikkamagaluru": ["Chikkamagaluru","Mudigere","Kadur","Tarikere","Aldur"],
  "Kodagu": ["Madikeri","Somwarpet","Virajpet","Kushalnagar"],
  "Mandya": ["Mandya","Nagamangala","Maddur","Malavalli","Srirangapatna"],
  "Ramanagara": ["Ramanagara","Channapatna","Magadi","Kanakapura"],
  "Davanagere": ["Davanagere","Harihar","Harpanahalli","Jagalur","Channagiri"],
  "Chitradurga": ["Chitradurga","Holalkere","Hiriyur","Hosadurga","Challakere"],
  "Chamarajanagar": ["Chamrajanagar","Gundlupete","Yelandur","Kollegala"],
  // Telangana
  "Hyderabad": ["Hyderabad","Secunderabad","Uppal","Kukatpally","Manikonda","Lb Nagar","Mallapur","Hayathnagar"],
  "Rangareddy": ["Rajendranagar","Shamshabad","Maheshwaram","Chevella","Vikarabad"],
  "Medchal-Malkajgiri": ["Malkajgiri","Keesara","Ghatkesar","Medchal","Shamirpet"],
  "Sangareddy": ["Sangareddy","Patancheru","Zaheerabad","Jogipet","Narayankhed"],
  "Warangal": ["Warangal","Hanamkonda","Kazipet","Jangaon","Bhupalpally"],
  "Karimnagar": ["Karimnagar","Huzurabad","Choppadandi","Jagtial","Korutla"],
  "Nizamabad": ["Nizamabad","Bodhan","Armoor","Kamareddy","Banswada"],
  "Khammam": ["Khammam","Kothagudem","Palvancha","Bhadrachalam","Yellandu"],
  "Nalgonda": ["Nalgonda","Suryapet","Miryalaguda","Bhongir","Yadagirigutta"],
  "Mahabubnagar": ["Mahabubnagar","Wanaparthy","Jadcherla","Narayanpet","Gadwal"],
  "Adilabad": ["Adilabad","Nirmal","Bhainsa","Mancherial","Bellampalli"],
  "Medak": ["Medak","Siddipet","Toopran","Gajwel","Shankarampet"],
  // Maharashtra
  "Mumbai City": ["Fort","Churchgate","Dadar","Byculla","Colaba","Nariman Point","Worli","Mahim"],
  "Mumbai Suburban": ["Andheri","Bandra","Borivali","Kandivali","Malad","Goregaon","Kurla","Ghatkopar","Mulund","Powai","Vile Parle"],
  "Pune": ["Pune","Pimpri","Chinchwad","Hadapsar","Kothrud","Baner","Wakad","Hinjawadi","Shivajinagar","Deccan"],
  "Nagpur": ["Nagpur","Kamptee","Wardha","Hingna","Butibori","Kalmeshwar"],
  "Thane": ["Thane","Kalyan","Dombivli","Bhiwandi","Ulhasnagar","Mira Road","Badlapur","Ambernath"],
  "Nashik": ["Nashik","Igatpuri","Sinnar","Malegaon","Niphad"],
  "Aurangabad": ["Aurangabad","Paithan","Gangapur","Kannad","Sillod"],
  "Solapur": ["Solapur","Pandharpur","Akkalkot","Barsi","Mangalvedhe"],
  "Kolhapur": ["Kolhapur","Ichalkaranji","Hatkanangle","Karveer","Shirol"],
  "Raigad": ["Alibag","Panvel","Pen","Mahad","Uran"],
  "Palghar": ["Palghar","Vasai","Virar","Boisar","Dahanu"],
  "Latur": ["Latur","Osmanabad","Nanded","Udgir","Ausa"],
  "Amravati": ["Amravati","Achalpur","Anjangaon","Paratwada","Morshi"],
  "Yavatmal": ["Yavatmal","Wani","Arni","Pusad","Umarkhed"],
  "Nanded": ["Nanded","Deglur","Mukhed","Biloli","Hadgaon"],
  "Jalgaon": ["Jalgaon","Bhusawal","Amalner","Chopda","Pachora"],
  "Sangli": ["Sangli","Miraj","Kupwad","Vita","Islampur"],
  "Satara": ["Satara","Karad","Wai","Phaltan","Koregaon"],
  "Ratnagiri": ["Ratnagiri","Chiplun","Khed","Guhagar","Mandangad"],
  "Sindhudurg": ["Sindhudurg","Sawantwadi","Kudal","Malvan","Devgad"],
  "Chandrapur": ["Chandrapur","Ballarpur","Warora","Rajura","Gadchiroli"],
  "Gadchiroli": ["Gadchiroli","Aheri","Armori","Sironcha"],
  "Bhandara": ["Bhandara","Tumsar","Mohadi","Lakhandur"],
  "Gondia": ["Gondia","Tirora","Goregaon","Arjuni Morgaon"],
  "Wardha": ["Wardha","Hinganghat","Arvi","Deoli","Seloo"],
  "Akola": ["Akola","Akot","Balapur","Telhara","Murtizapur"],
  "Buldhana": ["Buldhana","Malkapur","Khamgaon","Jalgaon Jamod","Chikhli"],
  "Washim": ["Washim","Malegaon","Karanja","Manora","Risod"],
  "Dhule": ["Dhule","Shirpur","Sakri","Shindkheda","Sindkheda"],
  "Jalna": ["Jalna","Ambad","Partur","Badnapur","Bhokardan"],
  "Beed": ["Beed","Parli","Ambajogai","Ausa","Georai"],
  "Osmanabad": ["Osmanabad","Tuljapur","Paranda","Kalamb","Lohara"],
  "Parbhani": ["Parbhani","Gangakhed","Jintur","Selu","Manwath"],
  "Hingoli": ["Hingoli","Kalamnuri","Sengaon","Basmat","Aundha Nagnath"],
  "Nandurbar": ["Nandurbar","Shahada","Navapur","Taloda","Akkalkuwa"],
  "Ahmednagar": ["Ahmednagar","Kopargaon","Sangamner","Shrirampur","Rahuri"],
  // Gujarat
  "Ahmedabad": ["Ahmedabad","Gandhinagar","Sanand","Dholka","Dhandhuka","Bavla"],
  "Surat": ["Surat","Bardoli","Olpad","Mandvi","Kamrej"],
  "Vadodara": ["Vadodara","Anand","Karjan","Halol","Pavi Jetpur"],
  "Rajkot": ["Rajkot","Morbi","Gondal","Jetpur","Junagadh"],
  "Bhavnagar": ["Bhavnagar","Palitana","Ghogha","Mahuva","Botad"],
  "Jamnagar": ["Jamnagar","Dwarka","Khambhalia","Bhanvad","Jamjodhpur"],
  "Gandhinagar": ["Gandhinagar","Kalol","Dehgam","Mansa","Kadi"],
  "Kutch": ["Bhuj","Anjar","Mandvi","Rapar","Nakhatrana"],
  "Mehsana": ["Mehsana","Visnagar","Patan","Unjha","Kheralu"],
  "Banaskantha": ["Palanpur","Deesa","Dhanera","Radhanpur","Tharad"],
  "Patan": ["Patan","Chanasma","Sami","Radhanpur","Siddhpur"],
  "Anand": ["Anand","Vallabh Vidyanagar","Nadiad","Borsad","Petlad"],
  "Kheda": ["Kheda","Nadiad","Matar","Kapadvanj","Mahudha"],
  "Panchmahal": ["Godhra","Lunawada","Halol","Kalol","Shehera"],
  "Dahod": ["Dahod","Limkheda","Devgadh Baria","Fatepura"],
  "Chhota Udaipur": ["Chhota Udaipur","Jetpur Pavi","Kawant","Sankheda"],
  "Baroda": ["Vadodara"],
  // Delhi
  "Central Delhi": ["Karol Bagh","Connaught Place","Paharganj","Rajender Nagar","Daryaganj"],
  "East Delhi": ["Preet Vihar","Laxmi Nagar","Vivek Vihar","Krishna Nagar","Patparganj"],
  "New Delhi": ["New Delhi","Chanakyapuri","Sarojini Nagar","R.K. Puram","Lodi Colony"],
  "North Delhi": ["Rohini","Pitampura","Shalimar Bagh","Model Town","Ashok Vihar"],
  "North East Delhi": ["Yamuna Vihar","Shahdara","Bhajanpura","Jaffrabad","Mustafabad"],
  "North West Delhi": ["Shalimar Bagh","Narela","Bawana","Mangolpuri","Sultanpuri"],
  "Shahdara": ["Shahdara","Dilshad Garden","Jhilmil","Anand Vihar","Karkardooma"],
  "South Delhi": ["Saket","Hauz Khas","Greater Kailash","Malviya Nagar","Vasant Kunj"],
  "South East Delhi": ["Lajpat Nagar","Okhla","Govindpuri","Kalkaji","Nehru Place"],
  "South West Delhi": ["Dwarka","Janakpuri","Uttam Nagar","Kakrola","Palam"],
  "West Delhi": ["Rajouri Garden","Peeragarhi","Tilak Nagar","Paschim Vihar","Moti Nagar"],
  // Kerala
  "Thiruvananthapuram": ["Thiruvananthapuram","Neyyattinkara","Attingal","Varkala","Nedumangad"],
  "Kollam": ["Kollam","Punalur","Karunagappally","Kottarakkara","Paravur"],
  "Pathanamthitta": ["Pathanamthitta","Adoor","Thiruvalla","Ranni","Konni"],
  "Alappuzha": ["Alappuzha","Chengannur","Mavelikkara","Haripad","Kayamkulam"],
  "Kottayam": ["Kottayam","Changanacherry","Pala","Ettumanoor","Vaikom"],
  "Idukki": ["Idukki","Thodupuzha","Munnar","Adimali","Nedumkandam"],
  "Ernakulam": ["Kochi","Perumbavoor","Angamaly","Muvattupuzha","Thrippunithura"],
  "Thrissur": ["Thrissur","Chalakudy","Kodungallur","Kunnamkulam","Guruvayur"],
  "Palakkad": ["Palakkad","Ottappalam","Shornur","Mannarkkad","Pollachi"],
  "Malappuram": ["Malappuram","Tirur","Perinthalmanna","Manjeri","Tiruvambadi"],
  "Kozhikode": ["Kozhikode","Vatakara","Koyilandy","Feroke","Ramanattukara"],
  "Wayanad": ["Mananthavady","Kalpetta","Sultan Bathery","Vythiri","Panamaram"],
  "Kannur": ["Kannur","Thalassery","Iritty","Koothuparamba","Payyanur"],
  "Kasaragod": ["Kasaragod","Kanhangad","Hosdurg","Nileshwar","Manjeshwaram"],
  // Rajasthan
  "Jaipur": ["Jaipur","Sanganer","Chomu","Dudu","Sambhar"],
  "Jodhpur": ["Jodhpur","Pali","Sojat","Bilara","Bhopalgarh"],
  "Udaipur": ["Udaipur","Nathdwara","Rajsamand","Bhilwara","Chittorgarh"],
  "Kota": ["Kota","Baran","Bundi","Jhalawar","Ramganj Mandi"],
  "Ajmer": ["Ajmer","Pushkar","Beawar","Nasirabad","Kishangarh"],
  "Bikaner": ["Bikaner","Nokha","Sri Ganganagar","Hanumangarh","Suratgarh"],
  "Alwar": ["Alwar","Bhiwadi","Behror","Rajgarh","Tijara"],
  "Sikar": ["Sikar","Fatehpur","Lachhmangarh","Neem Ka Thana","Danta Ramgarh"],
  "Jhunjhunu": ["Jhunjhunu","Surajgarh","Nawalgarh","Pilani","Mukundgarh"],
  "Bharatpur": ["Bharatpur","Deeg","Weir","Nagar","Bayana"],
  "Dausa": ["Dausa","Lalsot","Bandikui","Sikrai","Mahwa"],
  "Sawai Madhopur": ["Sawai Madhopur","Gangapur City","Bonli","Khandar"],
  "Chittorgarh": ["Chittorgarh","Nimbahera","Begun","Kapasan","Pratapgarh"],
  // Uttar Pradesh
  "Lucknow": ["Lucknow","Malihabad","Chinhat","Bakshi Ka Talab","Mohan"],
  "Kanpur Nagar": ["Kanpur","Bhitargaon","Ghatampur","Bidhnu","Akbarpur"],
  "Agra": ["Agra","Firozabad","Fatehabad","Kiraoli","Etmadpur"],
  "Varanasi": ["Varanasi","Mughal Sarai","Ramnagar","Sarnath","Pindra"],
  "Prayagraj": ["Prayagraj","Allahabad","Phulpur","Meja","Handia"],
  "Ghaziabad": ["Ghaziabad","Hapur","Modinagar","Muradnagar","Dasna"],
  "Mathura": ["Mathura","Vrindavan","Govardhan","Baldev","Mant"],
  "Meerut": ["Meerut","Hapur","Modipuram","Sardhana","Kharkhoda"],
  "Bareilly": ["Bareilly","Pilibhit","Shahjahanpur","Aonla","Faridpur"],
  "Gorakhpur": ["Gorakhpur","Deoria","Basti","Maharajganj","Kushinagar"],
  "Aligarh": ["Aligarh","Hathras","Kasganj","Etah","Atrauli"],
  "Moradabad": ["Moradabad","Rampur","Sambhal","Amroha","Thakurdwara"],
  "Saharanpur": ["Saharanpur","Deoband","Muzaffarnagar","Roorkee","Gangoh"],
  "Jhansi": ["Jhansi","Lalitpur","Hamirpur","Mahoba","Chhatarpur"],
  "Muzaffarnagar": ["Muzaffarnagar","Shamli","Kairana","Budhana","Khatauli"],
  // Punjab
  "Ludhiana": ["Ludhiana","Khanna","Jagraon","Samrala","Raikot"],
  "Amritsar": ["Amritsar","Tarn Taran","Batala","Gurdaspur","Pathankot"],
  "Jalandhar": ["Jalandhar","Nakodar","Phagwara","Kartarpur","Lohian"],
  "Patiala": ["Patiala","Rajpura","Samana","Nabha","Fatehgarh Sahib"],
  "Mohali": ["Mohali","Kharar","Dera Bassi","Morinda","Ropar"],
  "Bathinda": ["Bathinda","Mansa","Moga","Muktsar","Faridkot"],
  // West Bengal
  "Kolkata": ["Kolkata","Howrah","Dum Dum","Barasat","Salt Lake","Jadavpur","Behala","South Dum Dum"],
  "Howrah": ["Howrah","Uluberia","Bally","Liluah","Domjur","Amta"],
  "Hooghly": ["Chandannagar","Serampore","Chinsurah","Arambag","Tarakeswar"],
  "North 24 Parganas": ["Barrackpore","Barasat","Basirhat","Bongaon","Habra","Naihati"],
  "South 24 Parganas": ["Diamond Harbour","Baruipur","Canning","Kakdwip","Namkhana"],
  "Darjeeling": ["Darjeeling","Siliguri","Kurseong","Kalimpong","Mirik"],
  "Jalpaiguri": ["Jalpaiguri","Alipurduar","Dhupguri","Mal","Rajganj"],
  "Murshidabad": ["Berhampore","Jangipur","Jiaganj","Domkal","Islampur"],
  "Nadia": ["Krishnanagar","Ranaghat","Kalyani","Nabadwip","Chakdah"],
  "Birbhum": ["Suri","Bolpur","Rampurhat","Sriniketan","Nalhati"],
  "Purba Bardhaman": ["Burdwan","Durgapur","Asansol","Kalna","Katwa"],
  "Paschim Bardhaman": ["Paschim Bardhaman","Asansol","Durgapur","Raniganj","Kulti"],
  "Bankura": ["Bankura","Bishnupur","Sonamukhi","Khatra","Onda"],
  "Purulia": ["Purulia","Raghunathpur","Jhalda","Manbazar","Bagmundi"],
  "Paschim Medinipur": ["Midnapore","Jhargram","Kharagpur","Ghatal","Chandrakona"],
  "Purba Medinipur": ["Tamluk","Haldia","Contai","Digha","Mecheda"],
  // Bihar
  "Patna": ["Patna","Danapur","Hajipur","Phulwari Sharif","Bihar Sharif"],
  "Gaya": ["Gaya","Bodh Gaya","Sherghati","Nawada","Aurangabad"],
  "Muzaffarpur": ["Muzaffarpur","Sitamarhi","Sheohar","Vaishali","Hajipur"],
  "Bhagalpur": ["Bhagalpur","Banka","Munger","Jamui","Khagaria"],
  "Darbhanga": ["Darbhanga","Madhubani","Samastipur","Begusarai","Bahera"],
  // Jharkhand
  "Ranchi": ["Ranchi","Hatia","Kanke","Namkum","Ormanjhi"],
  "Dhanbad": ["Dhanbad","Jharia","Sindri","Baghmara","Nirsa"],
  "East Singhbhum": ["Jamshedpur","Dhalbhum","Boram","Ghatsila","Baharagora"],
  // Assam
  "Kamrup Metropolitan": ["Guwahati","Dispur","Jalukbari","Maligaon","Beltola"],
  "Kamrup": ["Rangia","Boko","Chaygaon","Hajo","Palashbari"],
  "Dibrugarh": ["Dibrugarh","Naharkatia","Duliajan","Moran","Lahowal"],
  "Jorhat": ["Jorhat","Titabar","Mariani","Teok","Majuli"],
  "Lakhimpur": ["North Lakhimpur","Bihpuria","Dhakuakhana","Jonai"],
  // Madhya Pradesh
  "Bhopal": ["Bhopal","Berasia","Huzur","Phanda","Mandideep"],
  "Indore": ["Indore","Dewas","Rau","Pithampur","Sagar"],
  "Jabalpur": ["Jabalpur","Katni","Narsinghpur","Chhindwara","Seoni"],
  "Gwalior": ["Gwalior","Bhind","Morena","Sheopur","Datia"],
  "Ujjain": ["Ujjain","Ratlam","Mandsaur","Neemuch","Shajapur"],
  // Himachal Pradesh
  "Shimla": ["Shimla","Rampur","Theog","Rohru","Dodra Kawar"],
  "Kangra": ["Dharamsala","Palampur","Dehra","Nurpur","Baijnath"],
  "Mandi": ["Mandi","Sundernagar","Jogindernagar","Karsog","Sarkaghat"],
  "Kullu": ["Kullu","Manali","Banjar","Anni","Nirmand"],
  "Solan": ["Solan","Parwanoo","Baddi","Nalagarh","Kasauli"],
  // Uttarakhand
  "Dehradun": ["Dehradun","Rishikesh","Mussoorie","Doiwala","Vikasnagar"],
  "Haridwar": ["Haridwar","Roorkee","Laksar","Manglaur","Bhagwanpur"],
  "Nainital": ["Nainital","Haldwani","Ramnagar","Bhowali","Lalkuan"],
  "Udham Singh Nagar": ["Rudrapur","Kashipur","Jaspur","Sitarganj","Khatima"],
  "Pauri Garhwal": ["Pauri","Kotdwar","Srinagar","Lansdowne","Dugadda"],
  // Odisha
  "Khordha": ["Bhubaneswar","Puri","Cuttack","Khordha","Bhubaneswar"],
  "Cuttack": ["Cuttack","Choudwar","Kendrapara","Jagatsinghpur","Athagarh"],
  "Puri": ["Puri","Konark","Nimapara","Brahmagiri","Kakatpur"],
  "Sambalpur": ["Sambalpur","Jharsuguda","Bargarh","Deogarh","Sundergarh"],
  "Ganjam": ["Berhampur","Aska","Chhatrapur","Bhanjanagar","Kabisuryanagar"],
  // Chandigarh
  "Chandigarh": ["Chandigarh","Manimajra","Mohali","Panchkula"],
  // Jammu & Kashmir
  "Srinagar": ["Srinagar","Budgam","Pulwama","Bandipora","Sopore"],
  "Jammu": ["Jammu","Katra","Akhnoor","Udhampur","Samba"],
  "Baramulla": ["Baramulla","Sopore","Uri","Pattan","Kreeri"],
  "Anantnag": ["Anantnag","Pahalgam","Bijbehara","Dooru","Qazigund"],
  // Puducherry
  "Puducherry": ["Puducherry","Ariyankuppam","Mannadipet","Ozhukarai","Villianur"],
  "Karaikal": ["Karaikal","Neravy","Tirumalairayanpattinam"],
  "Mahe": ["Mahe"],
  "Yanam": ["Yanam"],
  // Ladakh
  "Leh": ["Leh","Khaltsi","Nubra","Zanskar","Nyoma"],
  "Kargil": ["Kargil","Drass","Sankoo","Zanskar","Padum"],
  // Goa
  "North Goa": ["Panaji","Mapusa","Calangute","Ponda","Bicholim"],
  "South Goa": ["Margao","Vasco da Gama","Quepem","Canacona","Sanguem"],
  // Andaman & Nicobar
  "South Andaman": ["Port Blair","Wandoor","Bambooflat","Baratang"],
  "North & Middle Andaman": ["Mayabunder","Rangat","Diglipur","Aerial Bay"],
  "Nicobar": ["Car Nicobar","Campbell Bay","Nancowry"],
  // Lakshadweep
  "Lakshadweep": ["Kavaratti","Agatti","Amini","Andrott","Minicoy"],
  // Sikkim
  "East Sikkim": ["Gangtok","Rangpo","Singtam","Ranipool","Pakyong"],
  "West Sikkim": ["Gyalshing","Pelling","Jorethang","Nayabazar","Dentam"],
  "North Sikkim": ["Mangan","Lachung","Lachen","Chungthang"],
  "South Sikkim": ["Namchi","Ravangla","Temi","Jorethang"],
  // Meghalaya
  "East Khasi Hills": ["Shillong","Cherrapunji","Mawlai","Nongthymmai","Mawkyrwat"],
  "West Khasi Hills": ["Nongstoin","Mairang","Mawkyrwat","Khliehriat"],
  "Ri Bhoi": ["Nongpoh","Umroi","Umling","Jirang"],
  "East Garo Hills": ["Williamnagar","Resubelpara","Songsak"],
  "West Garo Hills": ["Tura","Dalu","Tikrikilla","Phulbari"],
  // Manipur
  "Imphal East": ["Imphal","Porompat","Keishamthong","Singjamei"],
  "Imphal West": ["Imphal","Lamphelpat","Wangkhei","Pangei"],
  // Mizoram
  "Aizawl": ["Aizawl","Durtlang","Lengteng","Tlabung"],
  "Lunglei": ["Lunglei","Hnahthial","Lungsen","Bunghmun"],
  // Nagaland
  "Kohima": ["Kohima","Zubza","Viswema","Jakhama","Kigwema"],
  "Dimapur": ["Dimapur","Seithekima","Chumukedima","Medziphema"],
  // Tripura
  "West Tripura": ["Agartala","Jirania","Majlishpur","Sonamura","Bishalgarh"],
  "North Tripura": ["Dharmanagar","Kanchanpur","Kumarghat","Panisagar"],
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function calculateAge(dob: string): string {
  if (!dob) return "";
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age >= 0 ? String(age) : "";
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FormState {
  // Step 1
  name: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  state: string;
  district: string;
  cityTown: string;
  profilePhoto: string;
  height: string;
  weight: string;
  bloodGroup: string;
  // Step 2
  primarySport: string;
  category: string;
  dominantHand: string;
  disabilityStatus: "no" | "yes";
  disabilityCategory: string;
  yearsOfExperience: string;
  currentLevel: string;
  currentAcademy: string;
  currentCoach: string;
  currentlyTraining: "yes" | "no";
  trainingStartYear: string;
  trainingDaysPerWeek: string;
  secondarySports: string;
  preferredTrainingType: string;
}

export const INITIAL_FORM: FormState = {
  name: "", dateOfBirth: "", gender: "", nationality: "Indian",
  state: "", district: "", cityTown: "",
  profilePhoto: "", height: "", weight: "", bloodGroup: "",
  primarySport: "Athletics", category: "", dominantHand: "", disabilityStatus: "no",
  disabilityCategory: "", yearsOfExperience: "",
  currentLevel: "", currentAcademy: "", currentCoach: "",
  currentlyTraining: "no", trainingStartYear: "", trainingDaysPerWeek: "",
  secondarySports: "", preferredTrainingType: "",
};
