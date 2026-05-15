
const Vanguards = [
	"Angela",
	"Captain America",
	"Deadpool (Vanguard)",
	"Devil Dinosaur",
	"Doctor Strange",
	"Emma Frost",
	"Groot",
	"Hulk",
	"Magneto",
	"Peni Parker",
	"Rogue",
	"The Thing",
	"Thor",
	"Venom"
] as const;
type Vanguard = typeof Vanguards[number];

const Duelists = [
	"Black Cat",
	"Black Panther",
	"Black Widow",
	"Blade",
	"Daredevil",
	"Deadpool (Duelist)",
	"Elsa Bloodstone",
	"Hawkeye",
	"Human Torch",
	"Hela",
	"Iron Fist",
	"Iron Man",
	"Magik",
	"Mister Fantastic",
	"Moon Knight",
	"Namor",
	"Phoenix",
	"Psylocke",
	"Scarlet Witch",
	"Spider-Man",
	"Squirrel Girl",
	"Star-Lord",
	"Storm",
	"The Punisher",
	"Winter Soldier",
	"Wolverine",
] as const;
type Duelist = typeof Duelists[number];

const Strategists = [
	"Adam Warlock",
	"Cloak & Dagger",
	"Deadpool (Strategist)",
	"Gambit",
	"Invisible Woman",
	"Jeff the Land Shark",
	"Loki",
	"Luna Snow",
	"Mantis",
	"Rocket Raccoon",
	"Ultron",
	"White Fox",
] as const;
type Strategist = typeof Strategists[number];

type Hero = Vanguard | Duelist | Strategist;

function isVanguard(hero: Hero): boolean {
	return Vanguards.includes(hero as Vanguard);
}

function isDuelist(hero: Hero): boolean {
	return Duelists.includes(hero as Duelist);
}

function isStrategist(hero: Hero): boolean {
	return Strategists.includes(hero as Strategist);
}

class Teamup {
	name: string = "";
	members: Hero[] = [];
}

const Teamups: Teamup[] = [
	{
		name: "Planet X Pals",
		members: [ "Groot", "Rocket Raccoon", "Jeff the Land Shark" ]
	},
	{
		name: "Gamma Fastball",
		members: [ "Wolverine", "Hulk", "The Thing" ]
	},
	{
		name: "Stars Aligned",
		members: [ "Captain America", "Winter Soldier" ]
	},
	{
		name: "Stark Protocol",
		members: [ "Iron Man", "Ultron", "Squirrel Girl" ]
	},
	{
		name: "Symbiote Shenanigans",
		members: [ "Venom", "Jeff the Land Shark", "Hela" ]
	},
	{
		name: "Divine Armory",
		members: [ "Angela", "Thor" ]
	},
	{
		name: "Lunar Force",
		members: [ "Cloak & Dagger", "Moon Knight", "Blade" ]
	},
	{
		name: "Vibrant Vitality",
		members: [ "Mantis", "Groot", "Loki" ]
	},
	{
		name: "First Steps",
		members: [ "Human Torch", "The Thing" ]
	},
	{
		name: "Arcane Order",
		members: [ "Doctor Strange", "Scarlet Witch", "Magik" ]
	},
	{
		name: "Bestial Hunt",
		members: [ "Daredevil", "The Punisher" ]
	},
	{
		name: "Deep Wrath",
		members: [ "Hela", "Namor" ]
	},
	{
		name: "Blade of Khonshu",
		members: [ "Moon Knight", "Blade" ]
	},
	{
		name: "Primal Flame",
		members: [ "Phoenix", "Black Widow", "Wolverine" ]
	},
	{
		name: "Chilling Assault",
		members: [ "Luna Snow", "Iron Fist", "Emma Frost" ]
	},
	{
		name: "Sword of Duality",
		members: [ "Cloak & Dagger", "Hawkeye", "Psylocke" ]
	},
	{
		name: "Explosive Entanglement",
		members: [ "Gambit", "Magneto", "Rogue" ]
	},
	{
		name: "Parker Power-Up",
		members: [ "Peni Parker", "Spider-Man" ]
	},
	{
		name: "Mr Pool's Interdimensional Toy Box",
		members: [ "Deadpool (Vanguard)", "Elsa Bloodstone", "Jeff the Land Shark" ]
	},
	{
		name: "Mr Pool's Interdimensional Toy Box",
		members: [ "Deadpool (Duelist)", "Elsa Bloodstone", "Jeff the Land Shark" ]
	},
	{
		name: "Mr Pool's Interdimensional Toy Box",
		members: [ "Deadpool (Strategist)", "Elsa Bloodstone", "Jeff the Land Shark" ]
	},
	{
		name: "Rocket Network",
		members: [ "Rocket Raccoon", "Star-Lord", "Mister Fantastic" ]
	},
	{
		name: "Gamma Charge",
		members: [ "Hulk", "The Thing", "Black Panther" ]
	},
	{
		name: "Psionite Mayhem",
		members: [ "Invisible Woman", "Doctor Strange" ]
	},
	{
		name: "Cosmic Cyclone",
		members: [ "Storm", "Adam Warlock" ]
	},
	{
		name: "Bless of the Kumiho",
		members: [ "White Fox", "Luna Snow" ]
	},
	{
		name: "Lucky Loan",
		members: [ "Black Cat", "Captain America", "White Fox" ]
	},
	{
		name: "Primal Punishment",
		members: [ "Devil Dinosaur", "The Punisher" ]
	},
]