import React, { Component } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Filter from "./Filter";
import AnalyticsModal from "./AnalyticsModal";
import ToggleChartsButton from "./ToggleChartsButton";
import LoadingWheel from "./LoadingWheel";
import GithubRepoLink from "./GithubRepoLink";
import MessageBox from "./MessageBox";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

let config = {};

const params = new URLSearchParams(window.location.search);

config.params = {
  center: [
    params.get("lat") ? parseFloat(params.get("lat")) : 53,
    params.get("lng") ? parseFloat(params.get("lng")) : -6,
  ],
  scrollwheel: false,
  legends: true,
  infoControl: false,
  attributionControl: true,
  tap: false,
};
config.tileLayer = {
  uri: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  params: {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    id: "",
    accessToken: "",
  },
};

const api_domain = "https://9i4sfrsht5.execute-api.eu-west-1.amazonaws.com";

const matchedMessage =
  "This shows listings matched with the PPR entry (max 1000 at a time, zoom in for more). The colour shows a gradient of how undervalued a property is from green (not undervalued) to red (very undervalued). Grey means we don't know. Click this box to minimize";
const allHistoricalMessage =
  "This shows historical listings (max 1000 at a time, zoom in for more). The colour shows how expensive a property is. Click this box to minimize";

const agents = [
  { value: "all", label: "All" },

  { label: "Sherry Fitzgerald", value: "sherry fitzgerald" },
  { label: "Movehome.ie", value: "movehome.ie" },
  { label: "Five Star", value: "five star" },
  { label: "Lisney", value: "lisney" },
  { label: "Blue Sky", value: "blue sky" },
  { label: "Vincent Finnegan", value: "vincent finnegan" },
  { label: "Kelly Bradshaw", value: "kelly bradshaw" },
  { label: "Finnegan Menton", value: "finnegan menton" },
  { label: "Savills", value: "savills" },
  { label: "Mason Estates", value: "mason estates" },
  { label: "Quillsen", value: "quillsen" },
  { label: "Pat Maguire", value: "pat maguire" },
  { label: "Fox & Gallagher", value: "fox & gallagher" },
  { label: "J. J. O'Brien & Son", value: "j. j. o'brien & son" },
  { label: "Imagine Ireland", value: "imagine ireland" },
  { label: "Knight Frank", value: "knight frank" },
  { label: "Capital", value: "capital" },
  { label: "Iam-Sold", value: "iam-sold" },
  { label: "Re/Max", value: "re/max" },
  { label: "Rentals.ie", value: "rentals.ie" },
  { label: "Gordon Hughes", value: "gordon hughes" },
  { label: "David Ross", value: "david ross" },
  { label: "The Property Shop", value: "the property shop" },
  { label: "Brock Delappe", value: "brock delappe" },
  { label: "Auctioneera.ie", value: "auctioneera.ie" },
  { label: "Donnellan & Joyce", value: "donnellan & joyce" },
  { label: "Era Downey Mccarthy", value: "era downey mccarthy" },
  { label: "Killian Lynch", value: "killian lynch" },
  { label: "Brophy Cusack", value: "brophy cusack" },
  { label: "Oates Breheny", value: "oates breheny" },
  { label: "James G Coughlan", value: "james g coughlan" },
  {
    label: "Sheehy Brothers Auctioneers Ltd.",
    value: "sheehy brothers auctioneers ltd.",
  },
  { label: "Paddy Watters", value: "paddy watters" },
  { label: "Hj Byrne Estate Agents", value: "hj byrne estate agents" },
  { label: "Hume Auctioneers", value: "hume auctioneers" },
  { label: "Caplice Auctioneers", value: "caplice auctioneers" },
  { label: "Janus Estates", value: "janus estates" },
  { label: "Adrian Hassett Auctioneers", value: "adrian hassett auctioneers" },
  {
    label: "Df Properties Auctioneers & Lettings Agents",
    value: "df properties auctioneers & lettings agents",
  },
  {
    label: "Henry Kee & Son Auctioneers",
    value: "henry kee & son auctioneers",
  },
  { label: "Engel & Voelkers", value: "engel & voelkers" },
  { label: "Thomas M. Byrne & Son", value: "thomas m. byrne & son" },
  { label: "Keller Williams Ireland", value: "keller williams ireland" },
  {
    label: "Era Martin Keary Auctioneering",
    value: "era martin keary auctioneering",
  },
  { label: "Molloy Estates", value: "molloy estates" },
  { label: "Raymond Potterton & Co.", value: "raymond potterton & co." },
  {
    label: "Seamus Callanan Auctioneers",
    value: "seamus callanan auctioneers",
  },
  { label: "Rooney Auctioneers", value: "rooney auctioneers" },
  { label: "Fran Grincell Properties", value: "fran grincell properties" },
  {
    label: "Jim Burns & Co Ltd Auctioneers",
    value: "jim burns & co ltd auctioneers",
  },
  { label: "Churches Estate Agents", value: "churches estate agents" },
  { label: "Herbert Property Services", value: "herbert property services" },
  { label: "Phoenix Estates", value: "phoenix estates" },
  {
    label: "Hamill Estate Agents & Valuers",
    value: "hamill estate agents & valuers",
  },
  { label: "Brian O'Leary Auctioneers", value: "brian o'leary auctioneers" },
  { label: "Gvm Auctioneers", value: "gvm auctioneers" },
  { label: "Heffernan Auctioneers", value: "heffernan auctioneers" },
  {
    label: "Damian Lynch Auctioneer & Valuer",
    value: "damian lynch auctioneer & valuer",
  },
  {
    label: "Timothy Sullivan & Associates",
    value: "timothy sullivan & associates",
  },
  { label: "De Courcy", value: "de courcy" },
  {
    label: "Raymond White Auctioneering",
    value: "raymond white auctioneering",
  },
  { label: "Felicity Fox Auctioneers", value: "felicity fox auctioneers" },
  { label: "Hyde Auctioneers", value: "hyde auctioneers" },
  {
    label: "James L. Murtagh Auctioneers",
    value: "james l. murtagh auctioneers",
  },
  { label: "Wyse Estate Agents", value: "wyse estate agents" },
  {
    label: "William Quinlan Auctioneers",
    value: "william quinlan auctioneers",
  },
  { label: "Farrell Bros Auctioneering", value: "farrell bros auctioneering" },
  { label: "Hennelly Auctioneers", value: "hennelly auctioneers" },
  { label: "O'Connor Shannon", value: "o'connor shannon" },
  { label: "Oates Auctioneers", value: "oates auctioneers" },
  {
    label: "Lloyd Daly & Associates Ltd.",
    value: "lloyd daly & associates ltd.",
  },
  { label: "Gallagher Quigley", value: "gallagher quigley" },
  {
    label: "Beirne & Wise Estate Agents",
    value: "beirne & wise estate agents",
  },
  {
    label: "Michael Griffin Auctioneers",
    value: "michael griffin auctioneers",
  },
  {
    label: "Sean O'Boyle Auctioneers & Valuers Ltd.",
    value: "sean o'boyle auctioneers & valuers ltd.",
  },
  {
    label: "William Hennigan Auctioneer",
    value: "william hennigan auctioneer",
  },
  {
    label: "Clodagh Daly Auctioneers Ltd",
    value: "clodagh daly auctioneers ltd",
  },
  { label: "Falcondale Properties Ltd.", value: "falcondale properties ltd." },
  {
    label: "Mcguirk Beggan Property Ltd.",
    value: "mcguirk beggan property ltd.",
  },
  { label: "Noel Kelly Auctioneers", value: "noel kelly auctioneers" },
  { label: "John Quinn Auctioneers", value: "john quinn auctioneers" },
  { label: "Ray Cooke Auctioneers", value: "ray cooke auctioneers" },
  { label: "Satis Property", value: "satis property" },
  { label: "Dooley Auctioneers", value: "dooley auctioneers" },
  { label: "Hooke & Macdonald", value: "hooke & macdonald" },
  {
    label: "Nigel Dineen/Martin Finn Auctioneers",
    value: "nigel dineen/martin finn auctioneers",
  },
  { label: "Kehoe & Associates", value: "kehoe & associates" },
  { label: "Hegarty-Properties", value: "hegarty-properties" },
  {
    label: "Leonard Wilson Keenan Estates & Letting Agents",
    value: "leonard wilson keenan estates & letting agents",
  },
  { label: "Kinsella Estates", value: "kinsella estates" },
  { label: "Flynn & Associates", value: "flynn & associates" },
  { label: "Newcombe Estates", value: "newcombe estates" },
  { label: "Cronin Wall Properties", value: "cronin wall properties" },
  {
    label: "Shane Black Property Advisors & Agents",
    value: "shane black property advisors & agents",
  },
  { label: "Keane Mahony Smith", value: "keane mahony smith" },
  { label: "Jeremy Murphy & Associates", value: "jeremy murphy & associates" },
  { label: "Behan Irwin & Gosling", value: "behan irwin & gosling" },
  { label: "Castle Estate Agents", value: "castle estate agents" },
  {
    label: "Wilson Moore Estate And Letting Agents",
    value: "wilson moore estate and letting agents",
  },
  { label: "City Homes", value: "city homes" },
  { label: "Keane Auctioneers", value: "keane auctioneers" },
  { label: "Hunters Estate Agent", value: "hunters estate agent" },
  { label: "Joe Naughton", value: "joe naughton" },
  {
    label: "Mullery O'Gara Estate Agents",
    value: "mullery o'gara estate agents",
  },
  { label: "Franklins", value: "franklins" },
  { label: "Allen & Jacobs", value: "allen & jacobs" },
  { label: "O'Brien Swaine", value: "o'brien swaine" },
  { label: "Paul Reynolds & Co.", value: "paul reynolds & co." },
  { label: "Cohalan Downing", value: "cohalan downing" },
  {
    label: "Jordan Auctioneers And Chartered Surveyors",
    value: "jordan auctioneers and chartered surveyors",
  },
  {
    label: "Michael Roberts Estate Agents",
    value: "michael roberts estate agents",
  },
  { label: "Lydon Farrell Property", value: "lydon farrell property" },
  {
    label: "Charlie Robinson Auctioneers",
    value: "charlie robinson auctioneers",
  },
  { label: "Ck Properties", value: "ck properties" },
  { label: "Moovingo", value: "moovingo" },
  { label: "Owen Reilly Sales", value: "owen reilly sales" },
  { label: "Tom Maher & Co.", value: "tom maher & co." },
  { label: "Gl Auctioneers", value: "gl auctioneers" },
  { label: "Barry Auctioneers", value: "barry auctioneers" },
  {
    label: "Hodnett Forde Property Services",
    value: "hodnett forde property services",
  },
  { label: "Smith & Butler Estates", value: "smith & butler estates" },
  {
    label: "Smith Harrington Auctioneers",
    value: "smith harrington auctioneers",
  },
  {
    label: "Sherry Property Consultants",
    value: "sherry property consultants",
  },
  {
    label: "Charles Mccarthy Auctioneers",
    value: "charles mccarthy auctioneers",
  },
  {
    label: "Propertyteam Smith Kelly Scott",
    value: "propertyteam smith kelly scott",
  },
  { label: "Martin Shortt Auctioneers", value: "martin shortt auctioneers" },
  { label: "Corry Estates", value: "corry estates" },
  { label: "Mullery Auctioneers Ltd", value: "mullery auctioneers ltd" },
  { label: "M&C Property", value: "m&c property" },
  { label: "Fleming Estate Agents", value: "fleming estate agents" },
  { label: "Mark Kelly & Associates", value: "mark kelly & associates" },
  { label: "Gary O'Driscoll & Co Ltd", value: "gary o'driscoll & co ltd" },
  {
    label: "Brendan French Auctioneer, Valuer & Estate Agent",
    value: "brendan french auctioneer, valuer & estate agent",
  },
  { label: "Quinn Property Management", value: "quinn property management" },
  {
    label: "Barney Kiernan Auctioneers & Valuers",
    value: "barney kiernan auctioneers & valuers",
  },
  {
    label: "Cahalane Skuse Auctioneers & Valuers",
    value: "cahalane skuse auctioneers & valuers",
  },
  { label: "Noel Corcoran Auctioneers", value: "noel corcoran auctioneers" },
  { label: "Paddy Murray Auctioneers", value: "paddy murray auctioneers" },
  { label: "Cox & Walsh Estate Agents", value: "cox & walsh estate agents" },
  { label: "James Cleary & Sons", value: "james cleary & sons" },
  { label: "Olivia Needham", value: "olivia needham" },
  { label: "Tp Walsh Auctioneers", value: "tp walsh auctioneers" },
  {
    label: "Dougan Fitzgerald Estate Agents",
    value: "dougan fitzgerald estate agents",
  },
  { label: "Manor Properties", value: "manor properties" },
  {
    label: "Dunne Auctioneers & Letting Agents",
    value: "dunne auctioneers & letting agents",
  },
  { label: "Premier Properties", value: "premier properties" },
  { label: "Mcloughlin Barry Estates", value: "mcloughlin barry estates" },
  {
    label: "Hickey O'Donoghue Auctioneers Ltd.",
    value: "hickey o'donoghue auctioneers ltd.",
  },
  { label: "Cillin Hill Auctioneers", value: "cillin hill auctioneers" },
  { label: "Michael Mckenna Auctioneer", value: "michael mckenna auctioneer" },
  { label: "Bohan Hyland & Associates", value: "bohan hyland & associates" },
  { label: "Liam Reilly Auctioneers", value: "liam reilly auctioneers" },
  { label: "Elite Estate Agents", value: "elite estate agents" },
  {
    label: "Coldwell Banker Carlton Estates",
    value: "coldwell banker carlton estates",
  },
  { label: "Mccarthy & Morgan", value: "mccarthy & morgan" },
  { label: "Global Properties Ltd", value: "global properties ltd" },
  {
    label: "Barry Murphy Auctioneers Ltd.",
    value: "barry murphy auctioneers ltd.",
  },
  { label: "Derek Lavelle Auctioneers", value: "derek lavelle auctioneers" },
  { label: "Eyeopener Properties", value: "eyeopener properties" },
  { label: "Roberts Auctioneers", value: "roberts auctioneers" },
  { label: "Green Valley Properties", value: "green valley properties" },
  {
    label: "Peter Reynolds Auctioneering",
    value: "peter reynolds auctioneering",
  },
  { label: "Adriatica Properties", value: "adriatica properties" },
  { label: "Atlantic Estate Agents", value: "atlantic estate agents" },
  { label: "Maguire Fay Auctioneers", value: "maguire fay auctioneers" },
  { label: "Lowe & Associates", value: "lowe & associates" },
  { label: "Maura Donohoe Auctioneers", value: "maura donohoe auctioneers" },
  { label: "Youngs Estate Agents", value: "youngs estate agents" },
  { label: "Bidx1", value: "bidx1" },
  { label: "James Kilcoyne Ltd.", value: "james kilcoyne ltd." },
  {
    label: "Lynam Auctioneers & Estate Agents",
    value: "lynam auctioneers & estate agents",
  },
  { label: "Palmer Auctioneers", value: "palmer auctioneers" },
  {
    label: "Matt O'Sullivan Estate Agent Auctioneer & Valuer",
    value: "matt o'sullivan estate agent auctioneer & valuer",
  },
  {
    label: "Michael Dorgan Auctioneers & Valuers",
    value: "michael dorgan auctioneers & valuers",
  },
  { label: "Warren Estates", value: "warren estates" },
  { label: "Chesser Auctioneers", value: "chesser auctioneers" },
  { label: "Brendan Mcglynn Associates", value: "brendan mcglynn associates" },
  { label: "O'Farrell Auctioneers", value: "o'farrell auctioneers" },
  {
    label: "Murray Browne Auctioneers Valuers And Estate Agents",
    value: "murray browne auctioneers valuers and estate agents",
  },
  { label: "Cd Auctioneers", value: "cd auctioneers" },
  { label: "Connaught Property", value: "connaught property" },
  { label: "Kelly Hudson Properties", value: "kelly hudson properties" },
  {
    label: "O'Connor Murphy Auctioneers",
    value: "o'connor murphy auctioneers",
  },
  { label: "Casey & Kingston", value: "casey & kingston" },
  { label: "Kevin Flanigan Estates", value: "kevin flanigan estates" },
  { label: "Dennehy Auctioneers", value: "dennehy auctioneers" },
  { label: "Kehoe Auctioneers", value: "kehoe auctioneers" },
  { label: "Connaughton Auctioneers", value: "connaughton auctioneers" },
  {
    label: "Brophy Estates, Auctioneers And Estate Agents",
    value: "brophy estates, auctioneers and estate agents",
  },
  { label: "Gallivan", value: "gallivan" },
  { label: "Duffy Auctioneers", value: "duffy auctioneers" },
  {
    label: "Moran Auctioneers & Estate Agents",
    value: "moran auctioneers & estate agents",
  },
  { label: "Galvin Property & Finance", value: "galvin property & finance" },
  { label: "Lappin Estates", value: "lappin estates" },
  { label: "P.J. Broderick & Co", value: "p.j. broderick & co" },
  { label: "Mcbride Auctioneers", value: "mcbride auctioneers" },
  { label: "Coonan Property", value: "coonan property" },
  { label: "Mccauley Property", value: "mccauley property" },
  { label: "Frank V Murphy", value: "frank v murphy" },
  { label: "App Kirrane", value: "app kirrane" },
  { label: "Denise Radley", value: "denise radley" },
  { label: "Vincent Walsh", value: "vincent walsh" },
  { label: "Liam Mullins", value: "liam mullins" },
  { label: "O'Reilly Taylor And Tweedy", value: "o'reilly taylor and tweedy" },
  { label: "Mark Nestor", value: "mark nestor" },
  { label: "Dillon Prendiville", value: "dillon prendiville" },
  { label: "Brg Gibson", value: "brg gibson" },
  { label: "P F Quirke", value: "p f quirke" },
  { label: "Tobin Estate Agents", value: "tobin estate agents" },
  { label: "P N O'Gorman", value: "p n o'gorman" },
  { label: "Arthur & Lees", value: "arthur & lees" },
  { label: "Michael Lavelle", value: "michael lavelle" },
  { label: "Gohery Properties", value: "gohery properties" },
  { label: "King Auctioneers", value: "king auctioneers" },
  { label: "Nicholas Maher", value: "nicholas maher" },
  { label: "Ger Carmody", value: "ger carmody" },
  { label: "Bennetts", value: "bennetts" },
  { label: "Colliers", value: "colliers" },
  { label: "Gerry Rowland", value: "gerry rowland" },
  { label: "Murtagh Bros", value: "murtagh bros" },
  { label: "Allsop", value: "allsop" },
  { label: "Hostingpower", value: "hostingpower" },
  { label: "Hogans Irish Cottages", value: "hogans irish cottages" },
  { label: "Bv Commercial", value: "bv commercial" },
  { label: "Morrison Estates", value: "morrison estates" },
  { label: "Rose Property Services", value: "rose property services" },
  { label: "Shamrock Cottages", value: "shamrock cottages" },
  { label: "Alliance Auctioneers", value: "alliance auctioneers" },
  {
    label: "Eoin O'Neill Property Advisers",
    value: "eoin o'neill property advisers",
  },
  { label: "Doran Estates", value: "doran estates" },
  { label: "Iconic Offices", value: "iconic offices" },
  { label: "Relax Ireland", value: "relax ireland" },
  { label: "Click Offices", value: "click offices" },
  { label: "Regus Ireland", value: "regus ireland" },
  { label: "Bespoke Serviced Offices", value: "bespoke serviced offices" },
  {
    label: "Colman Grimes Estate Agents",
    value: "colman grimes estate agents",
  },
  { label: "Mcgovern Estates", value: "mcgovern estates" },
  { label: "Bespoke Property", value: "bespoke property" },
  { label: "Selfcater.Com", value: "selfcater.com" },
  { label: "Wilson Auctions", value: "wilson auctions" },
  { label: "Mcpeake Auctioneers", value: "mcpeake auctioneers" },
  {
    label: "Jordan Town And Country Estate Agents",
    value: "jordan town and country estate agents",
  },
  { label: "Dooley Poynton Auctioneers", value: "dooley poynton auctioneers" },
  { label: "J. P. & M. Doyle", value: "j. p. & m. doyle" },
  { label: "Pat Considine Auctioneers", value: "pat considine auctioneers" },
  { label: "Gerry Mullin Auctioneer", value: "gerry mullin auctioneer" },
  {
    label: "Pat Callanan Property Sales Ltd.",
    value: "pat callanan property sales ltd.",
  },
  { label: "Michael Mccullagh", value: "michael mccullagh" },
  { label: "Liam Murphy Auctioneers", value: "liam murphy auctioneers" },
  { label: "Dearbhla Friel Properties", value: "dearbhla friel properties" },
  { label: "Abbey Property Sales", value: "abbey property sales" },
  { label: "Gallagher Auctioneers Ltd", value: "gallagher auctioneers ltd" },
  {
    label: "Frank Greene Property Sales",
    value: "frank greene property sales",
  },
  { label: "Trading Places", value: "trading places" },
  { label: "Mts Sales & Lettings", value: "mts sales & lettings" },
  { label: "Harry Brann", value: "harry brann" },
  { label: "Morton & Flanagan", value: "morton & flanagan" },
  { label: "Costelloe Estate Agents", value: "costelloe estate agents" },
  {
    label: "Brian Lohan Auctioneers & Financial Services",
    value: "brian lohan auctioneers & financial services",
  },
  {
    label: "Countryside Properties & Auctioneering Ltd.",
    value: "countryside properties & auctioneering ltd.",
  },
  { label: "Coonan Estate Agents Ltd", value: "coonan estate agents ltd" },
  {
    label: "Larmer Property Consultants",
    value: "larmer property consultants",
  },
  { label: "Anderson Auctioneers", value: "anderson auctioneers" },
  { label: "D.M. Auctions Ltd", value: "d.m. auctions ltd" },
  { label: "Property Partners Long", value: "property partners long" },
  { label: "Ganly Walters", value: "ganly walters" },
  { label: "Conerney Estate Agents", value: "conerney estate agents" },
  {
    label: "Property Partners Mcdonnell",
    value: "property partners mcdonnell",
  },
  { label: "Property Partners Earley", value: "property partners earley" },
  { label: "Kearney & Co.", value: "kearney & co." },
  {
    label: "O'Donnellan & Joyce Auctioneers Ltd",
    value: "o'donnellan & joyce auctioneers ltd",
  },
  { label: "Byrne Malone Estate Agents", value: "byrne malone estate agents" },
  {
    label: "Mullery O'Gara Estate Agents",
    value: "mullery o gara estate agents",
  },
  { label: "Dowling Property", value: "dowling property" },
  { label: "Smith Property", value: "smith property" },
  { label: "Gerry Rowland Auctioneer", value: "gerry rowland auctioneer" },
  { label: "Wilsons Auctions", value: "wilsons auctions" },
  { label: "Nolan & Fahy Auctioneers", value: "nolan & fahy auctioneers" },
  { label: "Streets Ahead", value: "streets ahead" },
  { label: "Farrell Auctioneers", value: "farrell auctioneers" },
  { label: "Hanly Donnellan", value: "hanly donnellan" },
  { label: "Murphy Mullan", value: "murphy mullan" },
  { label: "Choices", value: "choices" },
  { label: "IMove", value: "imove" },
  { label: "Bannon", value: "bannon" },
  { label: "CBRE", value: "cbre" },
  { label: "JLL", value: "jll" },
  { label: "MTS Property", value: "mts property" },
  { label: "GWD", value: "gwd" },
  { label: "KMS", value: "kms" },
  { label: "HWP", value: "hwp" },
  { label: "IRES", value: "ires" },
  { label: "BROE", value: "broe" },
  { label: "DMPC", value: "dmpc" },
  { label: "OMD", value: "omd" },
  { label: "DNG", value: "dng" },
  { label: "REA", value: "rea" },
];

const counties = [
  { value: "all", label: "All" },
  { value: "antrim", label: "Antrim" },
  { value: "armagh", label: "Armagh" },
  { value: "carlow", label: "Carlow" },
  { value: "cavan", label: "Cavan" },
  { value: "clare", label: "Clare" },
  { value: "cork", label: "Cork" },
  { value: "derry", label: "Derry" },
  { value: "donegal", label: "Donegal" },
  { value: "down", label: "Down" },
  { value: "dublin", label: "Dublin" },
  { value: "fermanagh", label: "Fermanagh" },
  { value: "galway", label: "Galway" },
  { value: "kerry", label: "Kerry" },
  { value: "kildare", label: "Kildare" },
  { value: "kilkenny", label: "Kilkenny" },
  { value: "laois", label: "Laois" },
  { value: "leitrim", label: "Leitrim" },
  { value: "limerick", label: "Limerick" },
  { value: "longford", label: "Longford" },
  { value: "louth", label: "Louth" },
  { value: "mayo", label: "Mayo" },
  { value: "meath", label: "Meath" },
  { value: "monaghan", label: "Monaghan" },
  { value: "offaly", label: "Offaly" },
  { value: "roscommon", label: "Roscommon" },
  { value: "sligo", label: "Sligo" },
  { value: "tipperary", label: "Tipperary" },
  { value: "tyrone", label: "Tyrone" },
  { value: "waterford", label: "Waterford" },
  { value: "westmeath", label: "Westmeath" },
  { value: "wexford", label: "Wexford" },
  { value: "wicklow", label: "Wicklow" },
];

// TODO: fix data, we have studio and studio_apartment

const propertyTypes = [
  { value: "all", label: "All" },
  { value: "terrace", label: "Terrace" },
  { value: "studio_apartment", label: "Studio Apartment" },
  { value: "duplex", label: "Duplex" },
  { value: "new_development", label: "New Development" },
  { value: "semi_detached", label: "Semi Detached" },
  { value: "end_of_terrace", label: "End of Terrace" },
  { value: "apartment", label: "Apartment" },
  { value: "site", label: "Site" },
  { value: "retail_unit", label: "Retail Unit" },
  { value: "bungalow", label: "Bungalow" },
  { value: "detached", label: "Detached" },
  { value: "commercial_site", label: "Commercial Site" },
  { value: "studio", label: "Studio" },
  { value: "investment_property", label: "Investment Property" },
  { value: "development_land", label: "Development Land" },
  { value: "holiday_home", label: "Holiday Home" },
  { value: "townhouse", label: "Townhouse" },
  { value: "cottage", label: "Cottage" },
  { value: "dormer", label: "Dormer" },
  { value: "house", label: "House" },
  { value: "houses", label: "Houses" },
  { value: "parking", label: "Parking" }, // FIXME: These aren't great
  { value: "office", label: "Office" }, // FIXME: These aren't great
  //{ value: "retail", label: "Retail" },
  //{ value: "restraunt_bar_hotel", label: "Restraunt Bar Hotel" },
  //{ value: "industrual_site", label: "Industrial Site" },
  //{ value: "industrial_unit", label: "Industrial Unit" },
  //{ value: "industrial", label: "Industrial" },
  //{ value: "commercial", label: "Commercial" },
  //{ value: "farm", label: "Farm" },
  //{ value: "agricultural", label: "Agricultural" },
];

class Map extends Component {
  constructor(props) {
    //alert("Data is being updated, check back in 30 when it should all there.");
    super(props);
    this.state = {
      isLoading: false,
      showAnalyticsModal: false,
      data: null,
      map: null,
      tileLayer: null,
      geojsonLayer: null,
      geojson: null,
      startYear: 2023,
      endYear: 2024,
      lastUpdatedDate: new Date(),
      lastUpdatedLat: 0,
      lastUpdatedLng: 0,
      currentLat: 0,
      currentLng: 0,
      lastUpdatedZoom: 0,
      currentZoom: 0,
      filterCounties: [],
      filterCountiesObj: [],
      filterPropertyTypes: [],
      filterPropertyTypesObj: [],
      filterAgents: [],
      filterAgentsObj: [],
      minBeds: 0,
      maxBeds: 10,
      dataOption: "matchedWithPPR",
      messageText: "",
    };
    this._mapNode = null;
    this.updateCounties = this.updateCounties.bind(this);
    this.updatePropertyTypes = this.updatePropertyTypes.bind(this);
    this.updateAgents = this.updateAgents.bind(this);

    this.onEachFeature = this.onEachFeature.bind(this);
    this.pointToLayer = this.pointToLayer.bind(this);
    this.filterFeatures = this.filterFeatures.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleMapMove = this.handleMapMove.bind(this);
    this.handleMapZoomEnd = this.handleMapZoomEnd.bind(this);
    this.handleDataOptionChange = this.handleDataOptionChange.bind(this);

    this.handleMinBeds = this.handleMinBeds.bind(this);
    this.handleMaxBeds = this.handleMaxBeds.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.init(this._mapNode, this.getData);
    this.getData();
    this.timerID = setInterval(() => this.updateStateEverySecond(), 1000);
  }

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {
    this.state.map.remove();
    clearInterval(this.timerID);
  }

  updateStateEverySecond() {
    const updateIfOlder = new Date();
    updateIfOlder.setSeconds(updateIfOlder.getSeconds() - 2);

    if (this.state.lastUpdatedDate < updateIfOlder) {
      if (
        this.state.lastUpdatedZoom !== this.state.currentZoom ||
        this.state.lastUpdatedLat !== this.state.currentLat ||
        this.state.lastUpdatedLng !== this.state.currentLng
      ) {
        this.setState(
          {
            lastUpdatedZoom: this.state.currentZoom,
            lastUpdatedLat: this.state.currentLat,
            lastUpdatedLng: this.state.currentLng,
            lastUpdatedDate: new Date(),
          },
          () => {
            this.getData();
          }
        );
      }
    }
  }

  getData() {
    const { map } = this.state;
    if (!map) return;

    let bbox = {
      minLat: 51.4,
      maxLat: 55.4,
      minLng: -10.6,
      maxLng: -5.4,
    };

    if (map !== null) {
      const bounds = map.getBounds();
      bbox = {
        minLat: bounds.getSouth(),
        maxLat: bounds.getNorth(),
        minLng: bounds.getWest(),
        maxLng: bounds.getEast(),
      };
    }

    bbox.filterCounties = this.state.filterCounties;
    bbox.filterPropertyTypes = this.state.filterPropertyTypes;
    bbox.filterAgents = this.state.filterAgents;

    bbox.minDate = this.state.startYear;
    bbox.maxDate = this.state.endYear;

    bbox.minBeds = this.state.minBeds;
    bbox.maxBeds = this.state.maxBeds;

    const queryParams = new URLSearchParams(bbox).toString();

    let url = `${api_domain}/api/data?${queryParams}`;
    if (this.state.dataOption === "matchedWithPPR") {
      url = `${api_domain}/api/data?${queryParams}`;
    } else if (this.state.dataOption === "allHistoricalListings") {
      url = `${api_domain}/api/data/listings?${queryParams}`;
    }
    this.setState({ isLoading: true });
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        map.eachLayer(function (layer) {
          if (layer instanceof L.GeoJSON) {
            map.removeLayer(layer);
          }
        });

        if (this.geojsonLayer) {
          this.state.map.removeLayer(this.geojsonLayer);
        }

        this.setState(
          {
            geojson: data,
            geojsonLayer: null,
            isLoading: false,
          },
          () => {
            this.addGeoJSONLayer(data);
          }
        );
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }
  updateCounties(e) {
    this.setState(
      { showModal: false, filterCounties: e.map((item) => item.value) },
      () => {
        this.updateUrl();
        this.getData();
      }
    );
  }
  updatePropertyTypes(e) {
    this.setState(
      { showModal: false, filterPropertyTypes: e.map((item) => item.value) },
      () => {
        this.updateUrl();
        this.getData();
      }
    );
  }
  updateAgents(e) {
    this.setState(
      { showModal: false, filterAgents: e.map((item) => item.value) },
      () => {
        this.updateUrl();
        this.getData();
      }
    );
  }

  addGeoJSONLayer(geojson) {
    const geojsonLayer = L.geoJson(geojson, {
      onEachFeature: this.onEachFeature,
      pointToLayer: this.pointToLayer,
      filter: this.filterFeatures,
    });
    geojsonLayer.addTo(this.state.map);
    this.setState({ geojsonLayer });
  }

  filterFeatures(feature, layer) {
    return true;
  }

  pointToLayer(feature, latlng) {
    let radius = 7;

    if (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    ) {
      radius = 15;
    }

    if (this.state.dataOption === "matchedWithPPR") {
      var markerParams = {
        radius: radius,
        fillColor: "grey", // Default to grey if under_pc is null
        color: "black",
        weight: 1,
        opacity: 0.5,
        fillOpacity: 0.8,
      };

      const underPc = feature.properties.under_pc;

      if (underPc !== null) {
        if (underPc <= 0) {
          markerParams.fillColor = "green";
        } else if (underPc >= 20) {
          markerParams.fillColor = "red";
        } else {
          let intensity;
          if (underPc <= 20) {
            intensity = Math.min(underPc / 20, 1);
          } else {
            const adjustedValue = 20 + (underPc - 20) / 4;
            intensity = Math.min(adjustedValue / 100, 1);
          }
          const greenValue = Math.floor(255 * (1 - intensity));
          markerParams.fillColor = `rgb(255,${greenValue},0)`;
        }
      }
    } else if (this.state.dataOption === "allHistoricalListings") {
      var markerParams = {
        radius: radius,
        fillColor: "grey", // Default to grey if under_pc is null
        color: "black",
        weight: 1,
        opacity: 0.5,
        fillOpacity: 0.8,
      };

      let price = feature.properties.price;

      const minValue = 0;
      const maxValue = 850000;

      if (price < minValue) price = minValue;
      if (price > maxValue) price = maxValue;

      const normalizedValue = (price - minValue) / (maxValue - minValue);
      let red, green, blue;
      if (normalizedValue < 0.5) {
        red = Math.round(255 * (1 - 2 * normalizedValue));
        green = 255;
        blue = 0;
      } else {
        red = 255;
        green = Math.round(255 * (2 - 2 * normalizedValue));
        blue = 0;
      }
      markerParams.fillColor =
        "#" +
        red.toString(16).padStart(2, "0") +
        green.toString(16).padStart(2, "0") +
        blue.toString(16).padStart(2, "0");
    }

    return L.circleMarker(latlng, markerParams);
  }

  onEachFeature(feature, layer) {
    // TODO: do not include items where there is not data for it
    layer.on({
      click: () => {
        const queryParams = new URLSearchParams({
          objId: feature.properties._id,
        }).toString();

        let url = `${api_domain}/api/data/property?${queryParams}`;
        if (this.state.dataOption === "matchedWithPPR") {
          url = `${api_domain}/api/data/property?${queryParams}`;
        } else if (this.state.dataOption === "allHistoricalListings") {
          url = `${api_domain}/api/data/listing?${queryParams}`;
        }

        fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            if (this.state.dataOption === "matchedWithPPR") {
              const address = data.ppr_address;
              const county = data.county;
              const eircode = data.eircode_routing_key;
              const agent = data.clean_agent;
              const propertyType = data.property_type;
              const listingPrice = data.price;
              const soldPrice = data.ppr_price;
              const beds = data.beds;
              const baths = data.baths;
              const squareMeters = data.m_squared;
              const constructedDate = data.constructed_date;
              const ber = data.ber;
              const publishedDate = data.published_date;
              const saleDate = data.ppr_sale_date;

              const up = feature.properties.under_pc;

              // TODO: include listing address
              const popupContent = `
    <div class="popup-content">
      <p><b>Address: </b>${address}  <b>County: </b>${county}</p>
      <p><b>Eircode: </b>${eircode}</p>
      <p><b>Agent: </b>${agent}</p>
      <p><b>Property Type: </b>${propertyType}</p>
      <p><b>Listed: </b>${listingPrice}, <b>Sold: </b>${soldPrice}
      <p><b>Beds: </b>${beds}, <b>Baths: </b>${baths}</p>
      <p><b>Square Meters: </b>${squareMeters}</p>
      <p><b>Constructed Date: </b>${constructedDate}</p>
      <p><b>BER: </b>${ber}</p>
      <p><b>Published Date: </b>${publishedDate}</p>
      <p><b>Sale Date: </b>${saleDate}</p>
    </div>
  `;

              const popup = L.popup({
                offset: L.point(0, -20),
              }).setContent(popupContent);

              layer.bindPopup(popup).openPopup();
            } else if (this.state.dataOption === "allHistoricalListings") {
              const address = data.original_address;
              const county = data.county;
              const eircode = data.eircode_routing_key;
              const agent = data.clean_agent;
              const propertyType = data.property_type;
              const listingPrice = data.price;
              const beds = data.beds;
              const baths = data.baths;
              const squareMeters = data.m_squared;
              const constructedDate = data.constructed_date;
              const ber = data.ber;
              const publishedDate = data.published_date;

              const popupContent = `
    <div class="popup-content">
      <p><b>Address: </b>${address}  <b>County: </b>${county}</p>
      <p><b>Eircode: </b>${eircode}</p>
      <p><b>Agent: </b>${agent}</p>
      <p><b>Property Type: </b>${propertyType}</p>
      <p><b>Listed: </b>${listingPrice}
      <p><b>Beds: </b>${beds}, <b>Baths: </b>${baths}</p>
      <p><b>Square Meters: </b>${squareMeters}</p>
      <p><b>Constructed Date: </b>${constructedDate}</p>
      <p><b>BER: </b>${ber}</p>
      <p><b>Published Date: </b>${publishedDate}</p>
    </div>
  `;

              const popup = L.popup({
                offset: L.point(0, -20),
              }).setContent(popupContent);
              layer.bindPopup(popup).openPopup();
            }
          })
          .catch((error) => {
            console.error(
              "There was a problem with your fetch operation:",
              error
            );
          });
      },
    });
  }

  init(id, callback) {
    if (this.state.map) return;
    let map = L.map(id, config.params);

    const filterCounties = JSON.parse(params.get("counties"))
      ? params.get("counties")
      : ["all"];
    const filterCountiesObj = counties.filter((county) =>
      filterCounties.includes(county.value)
    );

    const filterAgents = params.get("agents") ? params.get("agents") : ["all"];
    const filterAgentsObj = agents.filter((agent) =>
      filterAgents.includes(agent.value)
    );

    const filterPropertyTypes = params.get("propertytypes")
      ? params.get("propertytypes")
      : ["all"];
    const filterPropertyTypesObj = propertyTypes.filter((property_type) =>
      filterPropertyTypes.includes(property_type.value)
    );

    const startYear = params.get("startyear") ? params.get("startyear") : 2023;
    const endYear = params.get("endyear") ? params.get("endyear") : 2025;
    const dataOption = params.get("dataoption")
      ? params.get("dataoption")
      : "matchedWithPPR";
    const minBeds = params.get("minbeds") ? params.get("minbeds") : 0;
    const maxBeds = params.get("maxbeds") ? params.get("maxbeds") : 10;

    const zoom = params.get("zoom") ? parseInt(params.get("zoom"), 10) : 8;
    const lat = params.get("lat") ? parseFloat(params.get("lat")) : 53.4;
    const lng = params.get("lng") ? parseFloat(params.get("lng")) : -7.9;

    const irelandCenter = { lat: lat, lng: lng };

    map.setView([irelandCenter.lat, irelandCenter.lng], zoom);

    map.on("move", this.handleMapMove);
    map.on("zoomend", this.handleMapZoomEnd);

    if (map !== null) {
      const center = map.getCenter();
      const zoom = map.getZoom();

      this.setState(
        { currentLat: center.lat, currentLng: center.lng, currentZoom: zoom },
        () => {
          this.updateUrl();
        }
      );
    }

    const tileLayer = L.tileLayer(
      config.tileLayer.uri,
      config.tileLayer.params
    ).addTo(map);

    let messageText = null;
    if (this.state.dataOption === "matchedWithPPR") {
      messageText = matchedMessage;
    } else if (this.state.dataOption === "allHistoricalListings") {
      messageText = allHistoricalListings;
    }

    this.setState(
      {
        filterCounties,
        filterCountiesObj,
        filterAgents,
        filterAgentsObj,
        filterPropertyTypes,
        filterPropertyTypesObj,
        startYear,
        endYear,
        dataOption,
        minBeds,
        maxBeds,
        messageText,
        map,
        tileLayer,
      },
      callback
    );
  }

  handleMapMove() {
    const { map } = this.state;
    if (map !== null) {
      const center = map.getCenter();
      const zoom = map.getZoom();

      this.setState(
        { currentLat: center.lat, currentLng: center.lng, currentZoom: zoom },
        () => {
          this.updateUrl();
        }
      );
    }
  }

  parseUntilArray(jsonString) {
    let result = jsonString;

    if (Object.prototype.toString.call(jsonString) === "[object Array]") {
      return jsonString;
    }

    // Attempt to parse the jsonString and continue doing so until
    // the result is an array.
    while (true) {
      try {
        // Parse the current string.
        result = JSON.parse(result);

        // If the result is an array, break out of the loop.
        if (Array.isArray(result)) {
          break;
        }
      } catch (error) {
        // If JSON.parse fails, log the error and break out of the loop.
        console.error("Failed to parse JSON:", error);
        break;
      }
    }

    return result;
  }

  updateUrl() {
    this.setState(
      {
        filterCounties: this.parseUntilArray(this.state.filterCounties),
        filterAgents: this.parseUntilArray(this.state.filterAgents),
        filterPropertyTypes: this.parseUntilArray(
          this.state.filterPropertyTypes
        ),
      },
      () => {
        const newUrl = `${window.location.pathname}?lat=${
          this.state.currentLat
        }&lng=${this.state.currentLng}&zoom=${
          this.state.currentZoom
        }&counties=${JSON.stringify(
          this.state.filterCounties
        )}&agents=${JSON.stringify(
          this.state.filterAgents
        )}&propertytypes=${JSON.stringify(
          this.state.filterPropertyTypes
        )}&startyear=${this.state.startYear}&endyear=${
          this.state.endYear
        }&dataoption=${this.state.dataOption}&minbeds=${
          this.state.minBeds
        }&maxbeds=${this.state.maxBeds}`;
        window.history.pushState({ path: newUrl }, "", newUrl);
      }
    );
  }

  handleMapZoomEnd() {
    const { map } = this.state;
    this.setState({ currentZoom: map.getZoom() }, () => {
      this.updateUrl();
    });
  }

  handleMinBeds(event) {
    const minBeds = parseInt(event.target.value);
    this.setState({ showModal: false, minBeds: minBeds }, () => {
      this.updateUrl();
      if (this.state.minBeds >= 0 && this.state.minBeds <= 100) {
        this.getData();
      }
    });
  }

  handleMaxBeds(event) {
    const maxBeds = parseInt(event.target.value);
    this.setState({ showModal: false, maxBeds: maxBeds }, () => {
      this.updateUrl();
      if (this.state.maxBeds >= 0 && this.state.maxBeds <= 100) {
        this.getData();
      }
    });
  }

  handleStartChange(event) {
    const year = parseInt(event.target.value);
    this.setState({ showModal: false, startYear: year }, () => {
      this.updateUrl();
      if (this.state.startYear >= 2010 && this.state.startYear <= 2024) {
        this.getData();
      }
    });
  }

  handleEndChange(event) {
    const year = parseInt(event.target.value);
    this.setState({ showModal: false, endYear: year }, () => {
      this.updateUrl();
      if (this.state.startYear >= 2010 && this.state.startYear <= 2024) {
        this.getData();
      }
    });
  }

  handleDataOptionChange(event) {
    let messageText = null;
    if (event.target.value === "matchedWithPPR") {
      messageText = matchedMessage;
    } else if (event.target.value === "allHistoricalListings") {
      messageText = allHistoricalMessage;
    }
    this.setState(
      {
        messageText: messageText,
        showModal: false,
        dataOption: event.target.value,
      },
      () => {
        this.updateUrl();
        this.getData();
      }
    );
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }
  toggleModal() {
    if (this.state.showModal) {
      this.setState({ showModal: false });
    } else {
      this.setState({ showModal: true });
    }
  }

  render() {
    return (
      <div id="mapUI">
        <GithubRepoLink repoUrl="https://github.com/extendedppr/eppr-web" />
        <MessageBox text={this.state.messageText} />
        <LoadingWheel isVisible={this.state.isLoading} />
        {counties.length &&
          this.state.filterCountiesObj.length &&
          this.state.filterAgentsObj.length &&
          this.state.filterPropertyTypesObj && (
            <Filter
              counties={counties}
              selectedCounties={this.state.filterCountiesObj}
              selectedAgents={this.state.filterAgentsObj}
              selectedPropertyTypes={this.state.filterPropertyTypesObj}
              updateCounties={this.updateCounties}
              updatePropertyTypes={this.updatePropertyTypes}
              updateAgents={this.updateAgents}
              property_types={propertyTypes}
              agents={agents}
              startYear={this.state.startYear}
              endYear={this.state.endYear}
              handleStartChange={this.handleStartChange}
              handleEndChange={this.handleEndChange}
              showModal={this.state.showModal}
              minBeds={this.state.minBeds}
              maxBeds={this.state.maxBeds}
              handleMinBeds={this.handleMinBeds}
              handleMaxBeds={this.handleMaxBeds}
              dataOption={this.state.dataOption}
              handleDataOptionChange={this.handleDataOptionChange}
            />
          )}
        <ToggleChartsButton onClick={this.toggleModal} />
        {this.state.showModal && (
          <AnalyticsModal
            dataOption={this.state.dataOption}
            counties={this.state.filterCounties}
            agents={this.state.filterAgents}
            property_types={this.state.filterPropertyTypes}
            startYear={this.state.startYear}
            endYear={this.state.endYear}
            minBeds={this.state.minBeds}
            maxBeds={this.state.maxBeds}
          />
        )}
        <div ref={(node) => (this._mapNode = node)} id="map" />
      </div>
    );
  }
}

export default Map;
