const TruckOptions = [
  { value: 'Cruise', label: 'Cruise', icon:"bi bi-speedometer " },
  { value: 'Diff Lock', label: 'Diff Lock', icon:"bi bi-lock-fill" },
  { value: 'A/C', label: 'A/C', icon:"bi bi-fan" },
  { value: 'Radio Equipment', label: 'Radio Equipment', icon:"bi bi-broadcast" },
  { value: 'Bumper', label: 'Bumper', icon:"bi bi-view-list" }
]

const trailerTypeList = [
"B-Train",
"Bulk",
"Car Carrier",
"Cargo Trailer",
"Containers/Storage",
"Curtain Side",
"Dolley trailer",
"Drop Deck",
"Dry Van",
"Dump",
"Enclosed",
"Flat",
"Floats",
"Goose neck",
"Grain",
"Heavy Equipment",
"Highboy",
"Hopper",
"Horse",
"Live Floor",
"Live Stock",
"Living Quarters",
"Logging & Forestry",
"Lowboy",
"OTHER Specialty Trailer",
"Reefer",
"Roll-off",
"Tag Trailer",
"Tandem",
"Tanker Trailer",
"Tiltbed",
"Heater",
"Tri-Axle",
"Quad-Axle"
];

const trailerMakes = [
  "A &amp; W",
  "ABS",
  "ABU",
  "ACE Trailers",
  "Advance",
  "Advantage",
  "Airtow Trailers",
  "Alcom",
  "Altec",
  "Aluma",
  "Alum-Line",
  "Alutrec",
  "Amera-Lite",
  "American Hauler",
  "Apogee",
  "Arctic",
  "Arnes",
  "Artisanal",
  "Aspen",
  "AT",
  "ATC",
  "Atlas Specialty Trailers",
  "Aztec",
  "B&amp;B",
  "BAY-LYNX",
  "Beall",
  "Bear Trailers",
  "Bearco",
  "Beau-Roc",
  "Bibeau",
  "Big Iron",
  "Big Tex Trailers",
  "Bison",
  "Boat Hauler",
  "Boydstun",
  "Brandon",
  "Brandt",
  "Bravo",
  "Bravo Trailers",
  "Brenner",
  "Bri-Mar",
  "BWS",
  "CAM Superline",
  "Canada Trailers",
  "Canadian Trailer Company",
  "Can-Am",
  "Cancade",
  "Canuck",
  "Car Mate Trailers",
  "Cargo Express",
  "Cargo Mate",
  "Cargo Pro",
  "CARRIER",
  "CARRY ON",
  "Chaparral",
  "Cheetah",
  "China",
  "Cimarron",
  "CIMC",
  "CJay Trailers",
  "Classic",
  "Clement",
  "Cobra",
  "Columbia",
  "Commercial",
  "CONTINENTAL CARGO",
  "ComPro",
  "COTTRELL",
  "Coyote",
  "Cradle Ride",
  "Cross Country",
  "Cross Trailers",
  "Custom",
  "Custom Built",
  "Deloupe",
  "Demco",
  "Denali Decks",
  "Denray",
  "Diamond C",
  "DI-MOND",
  "Discovery",
  "Dobson",
  "Doepker",
  "Doonan",
  "Dorsey",
  "Double A",
  "Dragon",
  "Durabody",
  "Duralite",
  "Duratrail",
  "East",
  "EASY HAUL",
  "Easy Hauler",
  "Eby",
  "Entrepot",
  "Equinox",
  "Ethier",
  "ETM",
  "Etnyre",
  "Excalibur",
  "Exiss",
  "Exosent",
  "Extreme Trailers",
  "E-Z Hauler",
  "EZ Loader",
  "Équipement Remorque Général",
  "Equipment Manufacturing Lim",
  "Fait Sur Mesure",
  "Featherlite",
  "Felling",
  "Float King",
  "Floe",
  "Fontaine",
  "Forest River",
  "Formula Trailers",
  "Fort Fabrication",
  "Frontier",
  "FRS",
  "Fruehauf",
  "Gator",
  "General Farm Equipment",
  "General Trailer Equipment",
  "Germanic",
  "Gincor",
  "Gin-Cor",
  "Great Dane",
  "Great Northern",
  "Hart",
  "Haulin",
  "Haulmark",
  "HEIL",
  "Hendrickson",
  "Heritage",
  "High Country",
  "Highland",
  "Homemade",
  "Hutchinson",
  "Hyundai",
  "ideal",
  "Ideal Cargo",
  "Impact",
  "Impact Trailers",
  "inTech",
  "IRONHORSE",
  "Isabel",
  "J &amp; J",
  "J.C. Trailers",
  "Jackson",
  "Jamco",
  "Jasper",
  "JDJ",
  "Jelano",
  "John B.M.",
  "Jumping Jack",
  "Kayln Siebert",
  "Karavan",
  "Karavan Trailers",
  "Kargo MAx",
  "Kaufman",
  "Kendon",
  "Kentucky",
  "King",
  "King Trail",
  "K-Line",
  "Knight",
  "Komatsu",
  "K-Trail",
  "Kubota",
  "Lakota",
  "Lakota Trailers",
  "Lanau",
  "LAnd Pride",
  "Landoll",
  "Laroche",
  "Larochelle",
  "Lazer",
  "Lefebvre",
  "Legend",
  "Liberty",
  "Lightning",
  "Load King",
  "Load Line",
  "Load Rite",
  "Load Trail",
  "Lode King",
  "Look",
  "Mac",
  "Magic Tilt",
  "MAGNOLIA",
  "Manac",
  "Marlon",
  "Martin",
  "Master Tow",
  "Maverick",
  "Max-Atlas",
  "Maxi-Roule",
  "MAXXD",
  "Maxxforce",
  "Maxxim",
  "Mayhem Trailers",
  "Metal Valley Manufacturing",
  "Midland",
  "Milano Trailers",
  "Millroad",
  "Miracle",
  "Miska Trailers",
  "Mission Trailers",
  "Monarch",
  "Mond",
  "N&amp;N",
  "NEO",
  "Neustar",
  "Nitro Trailers",
  "North Country",
  "Olympic",
  "Pace American",
  "Parco-Hesse",
  "Paron",
  "Peach Cargo",
  "Peak",
  "Peerless",
  "Performance Trailers",
  "Pitts",
  "PJ Trailers",
  "Polar",
  "Prairie Road",
  "Precision Trailer",
  "Precision Trailers",
  "Primo",
  "Pro-Par",
  "Quality Steel",
  "Raglan",
  "Rainbow Trailers",
  "Raja",
  "Ramec",
  "Rance",
  "RAVENS",
  "RC Trailers",
  "Red River",
  "REITNOUER",
  "Reneq",
  "Remorque Fermé",
  "Renn",
  "Richardson",
  "Richelieu",
  "Rogers",
  "Royal Cargo",
  "Royal T",
  "RSK-I",
  "Savage",
  "Scona",
  "Sea-Can",
  "Sea-Doo/BRP",
  "Shorelandr",
  "Sidump'r",
  "SLEDSHED",
  "SMC",
  "Snake River",
  "Snowbear",
  "Southland",
  "Stargate",
  "STE",
  "Stealth Trailers",
  "Stehl Tow",
  "Stellar",
  "STEPHENS",
  "Stinger",
  "Stirling",
  "Stoughton",
  "Strick",
  "Stronghaul",
  "Summit",
  "Sundowner",
  "Sundowner Trailers",
  "Superior",
  "Sure-Tac",
  "Talbert",
  "Taylor-Wharton",
  "Team Spirit",
  "Temisko",
  "Ter-O Concept",
  "Thermo King",
  "Thor",
  "Thruway",
  "Timmins",
  "Titan",
  "TNT",
  "TNT Trailer",
  "Tow Tech Trailers",
  "Tow Tek",
  "Toe-Tek Trailers",
  "Trail King",
  "Trailer Parts",
  "TRAILERMAN",
  "Trailers Unlimited",
  "Trail-Eze",
  "Trailmaster",
  "Trailmobile",
  "Trails West",
  "Trailtech",
  "Transcraft",
  "Transit",
  "TeansWorld",
  "Travelaire",
  "Trekker",
  "Tremcar",
  "Triton",
  "Triumph Trailers",
  "Trout River",
  "Tuff Trailer",
  "Tusco",
  "Tycrop",
  "United",
  "Universal",
  "US Cargo",
  "Utility",
  "Vanguard",
  "VANTAGE",
  "Venture",
  "Voyager",
  "Wabash",
  "Walinga",
  "Weberlane",
  "Well Cargo",
  "Western",
  "West-Mark",
  "Westmor",
  "WESTTANK",
  "Wilson",
  "Wolf",
  "Wolverine",
  "wolverine Trailers",
  "WRT",
  "XL",
  "XL SPECIALIZED",
  "Xpress",
  "Yacht Club",
  "ZEIMAN",
  "EAGLE",
  "Tandem",]
export default {TruckOptions, trailerTypeList, trailerMakes};