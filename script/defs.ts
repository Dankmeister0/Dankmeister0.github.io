
type Role = "Vanguard" | "Duelist" | "Strategist";

type HeroName =
	"Adam Warlock" |
	"Angela" |
	"Black Cat" |
	"Black Panther" |
	"Black Widow" |
	"Blade" |
	"Captain America" |
	"Cloak & Dagger" |
	"Cyclops" |
	"Daredevil" |
	"Deadpool" |
	"Devil Dinosaur" |
	"Doctor Strange" |
	"Elsa Bloodstone" |
	"Emma Frost" |
	"Gambit" |
	"Groot" |
	"Hawkeye" |
	"Hela" |
	"Hulk" |
	"Human Torch" |
	"Invisible Woman" |
	"Iron Fist" |
	"Iron Man" |
	"Jeff the Land Shark" |
	"Jubilee" |
	"Loki" |
	"Luna Snow" |
	"Magik" |
	"Magneto" |
	"Mantis" |
	"Mister Fantastic" |
	"Moon Knight" |
	"Namor" |
	"Peni Parker" |
	"Phoenix" |
	"Psylocke" |
	"Rocket Raccoon" |
	"Rogue" |
	"Scarlet Witch" |
	"Spider-Man" |
	"Squirrel Girl" |
	"Star-Lord" |
	"Storm" |
	"The Hood" |
	"The Punisher" |
	"The Thing" |
	"Thor" |
	"Ultron" |
	"Venom" |
	"White Fox" |
	"Winter Soldier" |
	"Wolverine";

class Hero {
	name: HeroName = "Adam Warlock";
	roles: Role[] = [];
	teamups: Teamup[] = [];
	disabled?: boolean = false;
	selected?: boolean = false;
}

class Teamup {
	name: string = "";
	hero: HeroName = "Adam Warlock";
}

const Heroes: Hero[] = [
	{
		name: "Adam Warlock",
		roles: ["Strategist"],
		teamups: [
			{
				name: "Cosmic Cyclone",
				hero: "Storm"
			},
			{
				name: "Flawless Design",
				hero: "Ultron"
			}
		]
	},
	{
		name: "Angela",
		roles: ["Vanguard"],
		teamups: [
			{
				name: "Asgardians of the Galaxy",
				hero: "Star-Lord"
			},
			{
				name: "Odin's Unacknowledged",
				hero: "Loki"
			}
		]
	},
	{
		name: "Black Cat",
		roles: ["Duelist"],
		teamups: [
			{
				name: "Feline Alliance",
				hero: "Black Panther"
			},
			{
				name: "Binding Ties",
				hero: "Spider-Man"
			}
		]
	},
	{
		name: "Black Panther",
		roles: ["Duelist"],
		teamups: [
			{
				name: "Damisa-Yao",
				hero: "Storm"
			},
			{
				name: "Dimensional Shortcut",
				hero: "Magik"
			}
		]
	},
	{
		name: "Black Widow",
		roles: ["Duelist"],
		teamups: [
			{
				name: "Allied Agents",
				hero: "Hawkeye"
			},
			{
				name: "Burning Bullets",
				hero: "Phoenix"
			}
		]
	},
	{
		name: "Blade",
		roles: ["Duelist"],
		teamups: [
			{
				name: "Blade of Khonshu",
				hero: "Moon Knight"
			},
			{
				name: "Bleed for Battle",
				hero: "Captain America"
			}
		]
	},
	{
		name: "Captain America",
		roles: ["Vanguard"],
		teamups: [
			{
				name: "Stars Aligned",
				hero: "Winter Soldier"
			},
			{
				name: "Voltaic Union",
				hero: "Thor"
			}
		]
	},
	{
		name: "Cloak & Dagger",
		roles: ["Strategist"],
		teamups: [
			{
				name: "Oblivion Shroud",
				hero: "The Hood"
			},
			{
				name: "Frozen Haven",
				hero: "Luna Snow"
			}
		]
	},
	{
		name: "Cyclops",
		roles: ["Duelist"],
		teamups: [
			{
				name: "Slim and Red",
				hero: "Phoenix"
			},
			{
				name: "Kinetic Kin",
				hero: "Gambit"
			}
		]
	},
	{
		name: "Daredevil",
		roles: ["Duelist"],
		teamups: [
			{
				name: "Comprehensive Defense",
				hero: "Iron Fist"
			},
			{
				name: "Devilish Affair",
				hero: "Black Widow"
			}
		]
	},
	{
		name: "Deadpool",
		roles: ["Vanguard", "Duelist", "Strategist"],
		teamups: [
			{
				name: "Hel-Yeah, Honey",
				hero: "Hela"
			},
			{
				name: "Gumbo Chimichangas",
				hero: "Gambit"
			}
		]
	},
	{
		name: "Devil Dinosaur",
		roles: ["Vanguard"],
		teamups: [
			{
				name: "Primal Punishment",
				hero: "The Punisher"
			},
			{
				name: "Surf & Turf",
				hero: "Jeff the Land Shark"
			}
		]
	},
	{
		name: "Doctor Strange",
		roles: ["Vanguard"],
		teamups: [
			{
				name: "Gamma Maelstrom",
				hero: "Hulk"
			},
			{
				name: "Psionic Vortex",
				hero: "Invisible Woman"
			}
		]
	},
	{
		name: "Elsa Bloodstone",
		roles: ["Duelist"],
		teamups: [
			{
				name: "Prehistoric Trap",
				hero: "Devil Dinosaur"
			},
			{
				name: "Loudmouth Mercs",
				hero: "Deadpool"
			},
		]
	},
	{
		name: "Emma Frost",
		roles: ["Vanguard"],
		teamups: [
			{
				name: "Spirit Breaker",
				hero: "Mantis"
			},
			{
				name: "Iced Out Diamond",
				hero: "Luna Snow"
			}
		]
	},
	{
		name: "Gambit",
		roles: ["Strategist"],
		teamups: [
			{
				name: "Favorable Odds",
				hero: "Magneto"
			},
			{
				name: "Sparkling Staff",
				hero: "Jubilee"
			}
		]
	},
	{
		name: "Groot",
		roles: ["Vanguard"],
		teamups: [
			{
				name: "Wild Wall",
				hero: "Mantis"
			},
			{
				name: "Bubble Buddies",
				hero: "Jeff the Land Shark"
			}
		]
	},
	{
		name: "Hawkeye",
		roles: ["Duelist"],
		teamups: [
			{
				name: "Senbonzakura Strike",
				hero: "Psylocke"
			},
			{
				name: "Moonlit Slash",
				hero: "Cloak & Dagger"
			}
		]
	},
	{
		name: "Hela",
		roles: ["Duelist"],
		teamups: [
			{
				name: "Hel Tendrils",
				hero: "Venom"
			},
			{
				name: "Deep Wrath",
				hero: "Namor"
			}
		]
	},
	{
		name: "Hulk",
		roles: ["Vanguard"],
		teamups: [
			{
				name: "Savage Slam",
				hero: "Captain America"
			},
			{
				name: "Gamma Fastball",
				hero: "Wolverine"
			}
		]
	},
	{
		name: "Human Torch",
		roles: ["Duelist"],
		teamups: [
			{
				name: "Fiery Sparks",
				hero: "Jubilee"
			},
			{
				name: "Storming Ignition",
				hero: "Storm"
			}
		]
	},
	{
		name: "Invisible Woman",
		roles: ["Strategist"],
		teamups: [
			{
				name: "United Siblings",
				hero: "Human Torch"
			},
			{
				name: "First Family",
				hero: "Mister Fantastic"
			}
		]
	},
	{
		name: "Iron Fist",
		roles: ["Duelist"],
		teamups: [
			{
				name: "Iron & Stone",
				hero: "The Thing"
			},
			{
				name: "Kumiho Palm",
				hero: "White Fox"
			}
		]
	},
	{
		name: "Iron Man",
		roles: ["Duelist"],
		teamups: [
			{
				name: "Gamma Charge",
				hero: "Hulk"
			},
			{
				name: "Thunder Overdrive",
				hero: "Thor"
			}
		]
	},
	{
		name: "Jeff the Land Shark",
		roles: ["Strategist"],
		teamups: [
			{
				name: "Guardian of the Deep",
				hero: "Venom"
			},
			{
				name: "Mr. Pool's Interdimensional Toy Box",
				hero: "Deadpool"
			},
		]
	},
	{
		name: "Jubilee",
		roles: ["Strategist"],
		teamups: [
			{
				name: "Hellfire Sparks",
				hero: "The Hood"
			},
			{
				name: "Vampiric Kin",
				hero: "Blade"
			}
		]
	},
	{
		name: "Loki",
		roles: ["Strategist"],
		teamups: [
			{
				name: "Villain's Illusion",
				hero: "Hela"
			},
			{
				name: "Vibrant Vitality",
				hero: "Mantis"
			}
		]
	},
	{
		name: "Luna Snow",
		roles: ["Strategist"],
		teamups: [
			{
				name: "Atlas Bond",
				hero: "White Fox"
			},
			{
				name: "Duality Dance",
				hero: "Adam Warlock"
			}
		]
	},
	{
		name: "Magik",
		roles: ["Duelist"],
		teamups: [
			{
				name: "Chain of Cyttorak",
				hero: "Doctor Strange"
			},
			{
				name: "Void Pentagram",
				hero: "The Hood"
			}
		]
	},
	{
		name: "Magneto",
		roles: ["Vanguard"],
		teamups: [
			{
				name: "Metallic Chaos",
				hero: "Scarlet Witch"
			},
			{
				name: "Magnetic Resonance",
				hero: "Emma Frost"
			}
		]
	},
	{
		name: "Mantis",
		roles: ["Strategist"],
		teamups: [
			{
				name: "Star Blossom",
				hero: "Star-Lord"
			},
			{
				name: "Vitality Pact",
				hero: "Adam Warlock"
			}
		]
	},
	{
		name: "Mister Fantastic",
		roles: ["Duelist"],
		teamups: [
			{
				name: "Fantastic Amplifier",
				hero: "Rocket Raccoon"
			},
			{
				name: "Clobberin' Research Dept.",
				hero: "The Thing"
			}
		]
	},
	{
		name: "Moon Knight",
		roles: ["Duelist"],
		teamups: [
			{
				name: "Luminous Moon",
				hero: "Cloak & Dagger"
			},
			{
				name: "Blood Moon",
				hero: "Elsa Bloodstone"
			}
		]
	},
	{
		name: "Namor",
		roles: ["Duelist"],
		teamups: [
			{
				name: "Gamma Monstro",
				hero: "Hulk"
			},
			{
				name: "Chilling Charisma",
				hero: "Luna Snow"
			}
		]
	},
	{
		name: "Peni Parker",
		roles: ["Vanguard"],
		teamups: [
			{
				name: "Vibranium Mech",
				hero: "Black Panther"
			},
			{
				name: "Rocket network",
				hero: "Rocket Raccoon"
			}
		]
	},
	{
		name: "Phoenix",
		roles: ["Duelist"],
		teamups: [
			{
				name: "Circle of Life",
				hero: "Hela"
			},
			{
				name: "Telekinetic beatdown",
				hero: "Rogue"
			}
		]
	},
	{
		name: "Psylocke",
		roles: ["Duelist"],
		teamups: [
			{
				name: "Mental Projection",
				hero: "Emma Frost"
			},
			{
				name: "Light & Dark Darts",
				hero: "Cloak & Dagger"
			}
		]
	},
	{
		name: "Rocket Raccoon",
		roles: ["Strategist"],
		teamups: [
			{
				name: "Mammalian Bond",
				hero: "Squirrel Girl"
			},
			{
				name: "Planet X Pals",
				hero: "Groot"
			}
		]
	},
	{
		name: "Rogue",
		roles: ["Vanguard"],
		teamups: [
			{
				name: "Mr. & Mrs. X",
				hero: "Gambit"
			},
			{
				name: "Explosive Entanglement",
				hero: "Magneto"
			}
		]
	},
	{
		name: "Scarlet Witch",
		roles: ["Duelist"],
		teamups: [
			{
				name: "Sorcerers Supreme",
				hero: "Doctor Strange"
			},
			{
				name: "Hex Fireworks",
				hero: "Jubilee"
			}
		]
	},
	{
		name: "Spider-Man",
		roles: ["Duelist"],
		teamups: [
			{
				name: "Symbiote Bond",
				hero: "Venom"
			},
			{
				name: "Parker Power-Up",
				hero: "Peni Parker"
			}
		]
	},
	{
		name: "Squirrel Girl",
		roles: ["Duelist"],
		teamups: [
			{
				name: "Squirrel Missile",
				hero: "Iron Man"
			},
			{
				name: "ESU Alumnus",
				hero: "Spider-Man"
			}
		]
	},
	{
		name: "Star-Lord",
		roles: ["Duelist"],
		teamups: [
			{
				name: "Flora Munitions",
				hero: "Groot"
			},
			{
				name: "Star-Soul",
				hero: "Adam Warlock"
			}
		]
	},
	{
		name: "Storm",
		roles: ["Duelist"],
		teamups: [
			{
				name: "God of Thunder",
				hero: "Thor"
			},
			{
				name: "Jaws of Fate",
				hero: "Jeff the Land Shark"
			}
		]
	},
	{
		name: "The Punisher",
		roles: ["Duelist"],
		teamups: [
			{
				name: "Bestial Hunt",
				hero: "Daredevil"
			},
			{
				name: "Ammo Overload",
				hero: "Rocket Raccoon"
			}
		]
	},
	{
		name: "The Thing",
		roles: ["Vanguard"],
		teamups: [
			{
				name: "Two in One",
				hero: "Human Torch"
			},
			{
				name: "Unbreakable Forces",
				hero: "Invisible Woman"
			}
		]
	},
	{
		name: "Thor",
		roles: ["Vanguard"],
		teamups: [
			{
				name: "Ragnarok Rebirth",
				hero: "Hela"
			},
			{
				name: "Divine Armory",
				hero: "Angela"
			}
		]
	},
	{
		name: "Ultron",
		roles: ["Strategist"],
		teamups: [
			{
				name: "Stark Protocol",
				hero: "Iron Man"
			},
			{
				name: "SP//DR Sync",
				hero: "Peni Parker"
			}
		]
	},
	{
		name: "Venom",
		roles: ["Vanguard"],
		teamups: [
			{
				name: "Blood Leech",
				hero: "Blade"
			},
			{
				name: "Abyssal Flames",
				hero: "Phoenix"
			}
		]
	},
	{
		name: "White Fox",
		roles: ["Strategist"],
		teamups: [
			{
				name: "Lucky Loan",
				hero: "Black Cat"
			},
			{
				name: "Psionic Fox",
				hero: "Psylocke"
			}
		]
	},
	{
		name: "Winter Soldier",
		roles: ["Duelist"],
		teamups: [
			{
				name: "Timeless Veterans",
				hero: "The Punisher"
			},
			{
				name: "Expert Instinct",
				hero: "Elsa Bloodstone"
			}
		]
	},
	{
		name: "Wolverine",
		roles: ["Duelist"],
		teamups: [
			{
				name: "Blast Slash",
				hero: "Cyclops"
			},
			{
				name: "Pair of Threes",
				hero: "Gambit"
			}
		]
	}
];

function getHero(name: HeroName): Hero | null {
	const result = Heroes.find((val) => val.name === name);
	return result ?? null;
}