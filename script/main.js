var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// RatchetReact is a simplified React clone.
// It is meant to have a familiar syntax but much simplified.
// v1.0
window.onload = function () {
    RatchetReact.Reload();
};
var RatchetReact = /** @class */ (function () {
    /**
     * Creates a RatchetReact element out of the given HTML element.
     * @param htmlElem Existing element to create wrapper for.
     */
    function RatchetReact(htmlElem) {
        this.htmlElem = htmlElem;
        this.isOpen = false;
    }
    /**
     * Initializes the document with the root node
     */
    RatchetReact.Reload = function () {
        if (document.body && RatchetReact.Root !== undefined) {
            document.body.replaceChildren(RatchetReact.Root.elem());
        }
    };
    RatchetReact.Get = function (id) {
        var elem = document.getElementById(id);
        if (elem === null)
            return null;
        return new RatchetReact(elem);
    };
    /**
     * Creates a new RatchetReact element.
     * @param tagName HTML tag.
     * @returns New RatchetReact element.
     */
    RatchetReact.New = function (tagName) {
        return new RatchetReact(document.createElement(tagName));
    };
    /**
     * Appends a new RatchetReact element.
     * @param elem HTML tag of element to create.
     * @returns Newly-appended RatchetReact element.
     */
    RatchetReact.prototype.add = function (elem) {
        return this.addRef(RatchetReact.New(elem));
    };
    /**
     * Appends an existing RatchetReact element.
     * @param elem Existing RatchetReact element.
     * @returns Newly-appended RatchetReact element.
     */
    RatchetReact.prototype.addRef = function (elem) {
        if (this.isOpen) {
            this.htmlElem.appendChild(elem.htmlElem);
        }
        else {
            if (this.htmlElem.parentElement === null)
                throw this;
            this.htmlElem.parentElement.appendChild(elem.htmlElem);
        }
        return elem;
    };
    /**
     * Appends raw HTML to the underlying HTML.
     * @param rawHtml HTML to append.
     * @returns This RatchetReact element.
     */
    RatchetReact.prototype.addRaw = function (rawHtml) {
        if (this.isOpen) {
            this.htmlElem.insertAdjacentHTML("beforeend", rawHtml);
        }
        else {
            if (this.htmlElem.parentElement === null)
                throw this;
            this.htmlElem.insertAdjacentHTML("afterend", rawHtml);
        }
        return this;
    };
    /**
     * "Opens" the RatchetReact element.
     * Signifies that add() should append the next element as a child.
     * @returns This RatchetReact element.
     */
    RatchetReact.prototype.open = function () {
        this.isOpen = true;
        return this;
    };
    /**
     * "Closes" the RatchetReact element.
     * @returns Parent RatchetReact element.
     */
    RatchetReact.prototype.close = function () {
        if (this.isOpen) {
            this.isOpen = false;
            return this;
        }
        else {
            if (this.htmlElem.parentElement === null)
                throw this;
            return new RatchetReact(this.htmlElem.parentElement);
        }
    };
    /**
     * Sets a property on the underlying HTML element.
     * @param property Property to set.
     * @param value Value to set property to.
     * @returns This RatchetReact element.
     */
    RatchetReact.prototype.set = function (property, value) {
        this.htmlElem[property] = value;
        return this;
    };
    /**
     * Sets an attribute on the underlying HTML element.
     * @param property Attribute to set.
     * @param value Value to set attribute to.
     * @returns This RatchetReact element.
     */
    RatchetReact.prototype.setRaw = function (property, value) {
        this.htmlElem.setAttribute(property, value);
        return this;
    };
    /**
     * Gets a property on the underlying HTML element.
     * @param property Property to get value of.
     * @returns Value of property.
     */
    RatchetReact.prototype.get = function (property) {
        return this.elem()[property];
    };
    /**
     * Get the underlying HTML element.
     * @returns HTML element.
     */
    RatchetReact.prototype.elem = function () {
        return this.htmlElem;
    };
    return RatchetReact;
}());
var Hero = /** @class */ (function () {
    function Hero() {
        this.name = "Adam Warlock";
        this.roles = [];
        this.teamups = [];
        this.disabled = false;
        this.selected = false;
    }
    return Hero;
}());
var Teamup = /** @class */ (function () {
    function Teamup() {
        this.name = "";
        this.hero = "Adam Warlock";
    }
    return Teamup;
}());
var Heroes = [
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
function getHero(name) {
    var result = Heroes.find(function (val) { return val.name === name; });
    return result !== null && result !== void 0 ? result : null;
}
/// <reference path = "ratchetReact.ts" />
/// <reference path = "defs.ts" />
var _a, _b;
var HeroSelect = /** @class */ (function () {
    function HeroSelect() {
        this.hero = new Hero();
        this.role = "Duelist";
        this.teamup = new Teamup();
    }
    return HeroSelect;
}());
var gData = {
    teamSize: 1,
    minVanguard: 0,
    maxVanguard: 1000,
    minDuelist: 0,
    maxDuelist: 1000,
    minStrategist: 0,
    maxStrategist: 1000,
    minRole: (_a = {}, _a["Vanguard"] = 0, _a["Duelist"] = 0, _a["Strategist"] = 0, _a),
    maxRole: (_b = {}, _b["Vanguard"] = 3333, _b["Duelist"] = 3333, _b["Strategist"] = 3333, _b),
    results: [],
    disablePrevHeroes: false,
    allowDuplicates: false,
    teamupMode: "Random",
};
var gHandlers = {
    disableHeroes: (function () { }),
};
//#region Helpers
function doArraysIntersect(arr1, arr2) {
    for (var _i = 0, arr1_1 = arr1; _i < arr1_1.length; _i++) {
        var elem = arr1_1[_i];
        if (arr2.includes(elem)) {
            return true;
        }
    }
    return false;
}
function getArrayIntersection(arr1, arr2) {
    var intersection = [];
    for (var _i = 0, arr1_2 = arr1; _i < arr1_2.length; _i++) {
        var elem = arr1_2[_i];
        if (arr2.includes(elem)) {
            intersection.push(elem);
        }
    }
    return intersection;
}
function shuffle(array) {
    var _a;
    var result = __spreadArray([], array, true);
    for (var i = result.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [result[j], result[i]], result[i] = _a[0], result[j] = _a[1];
    }
    return result;
}
function getMinTeamSize() {
    var teamSize = 0;
    teamSize += gData.minRole.Vanguard;
    teamSize += gData.minRole.Duelist;
    teamSize += gData.minRole.Strategist;
    return teamSize < 1 ? 1 : teamSize;
}
function getMaxTeamSize() {
    var teamSize = 0;
    teamSize += gData.maxRole.Vanguard;
    teamSize += gData.maxRole.Duelist;
    teamSize += gData.maxRole.Strategist;
    return teamSize;
}
//#endregion
//#region Randomizer
function getAllowedRoles() {
    var allowedRoles = [];
    var cntVang = 0;
    var cntDuel = 0;
    var cntStrat = 0;
    for (var _i = 0, _a = gData.results; _i < _a.length; _i++) {
        var hero = _a[_i];
        if (hero.role === "Vanguard")
            ++cntVang;
        else if (hero.role === "Duelist")
            ++cntDuel;
        else if (hero.role === "Strategist")
            ++cntStrat;
    }
    if (cntVang < gData.minRole.Vanguard)
        allowedRoles.push("Vanguard");
    if (cntDuel < gData.minRole.Duelist)
        allowedRoles.push("Duelist");
    if (cntStrat < gData.minRole.Strategist)
        allowedRoles.push("Strategist");
    if (allowedRoles.length > 0)
        return allowedRoles;
    if (cntVang < gData.maxRole.Vanguard)
        allowedRoles.push("Vanguard");
    if (cntDuel < gData.maxRole.Duelist)
        allowedRoles.push("Duelist");
    if (cntStrat < gData.maxRole.Strategist)
        allowedRoles.push("Strategist");
    return allowedRoles;
}
function getRandomFromTeamup(hero) {
    // Check if possible teamup is already selected
    for (var _i = 0, _a = hero.teamups; _i < _a.length; _i++) {
        var teamup = _a[_i];
        for (var _b = 0, _c = gData.results; _b < _c.length; _b++) {
            var hero_1 = _c[_b];
            if (hero_1.hero.name === teamup.hero) {
                return teamup;
            }
        }
    }
    // Build list of allowed teamup heroes
    var allowedHeroes = [];
    for (var _d = 0, _e = hero.teamups; _d < _e.length; _d++) {
        var teamup = _e[_d];
        var hero_2 = getHero(teamup.hero);
        if (hero_2 !== null)
            allowedHeroes.push(hero_2);
    }
    // Get random hero
    var res = getRandom(allowedHeroes);
    if (res !== null) {
        for (var _f = 0, _g = hero.teamups; _f < _g.length; _f++) {
            var teamup = _g[_f];
            if (teamup.hero === res.hero.name) {
                return teamup;
            }
        }
    }
    return hero.teamups[Math.floor(Math.random() * hero.teamups.length)];
}
function getRandom(heroList) {
    if (heroList === void 0) { heroList = Heroes; }
    var allowedHeroes = [];
    var allowedRoles = getAllowedRoles();
    if (gData.teamSize <= gData.results.length)
        return null;
    if (allowedRoles.length === 0)
        return null;
    // Build list of allowed heroes
    for (var _i = 0, heroList_1 = heroList; _i < heroList_1.length; _i++) {
        var hero = heroList_1[_i];
        if (!hero.disabled && !hero.selected && doArraysIntersect(hero.roles, allowedRoles)) {
            allowedHeroes.push(hero);
        }
    }
    if (allowedHeroes.length === 0)
        return null;
    // Get random hero
    var output = new HeroSelect();
    output.hero = allowedHeroes[Math.floor(Math.random() * allowedHeroes.length)];
    // Get random role
    var heroRoles = getArrayIntersection(output.hero.roles, allowedRoles);
    output.role = heroRoles[Math.floor(Math.random() * heroRoles.length)];
    // Update global data
    gData.results.push(output);
    if (gData.disablePrevHeroes)
        output.hero.disabled = true;
    if (!gData.allowDuplicates)
        output.hero.selected = true;
    // Get random teamup
    if (gData.teamupMode === "Random") {
        output.teamup = output.hero.teamups[Math.floor(Math.random() * output.hero.teamups.length)];
    }
    else if (gData.teamupMode === "Force") {
        output.teamup = getRandomFromTeamup(output.hero);
    }
    return output;
}
function randomize() {
    // Reset global data
    gData.results.splice(0);
    for (var _i = 0, Heroes_1 = Heroes; _i < Heroes_1.length; _i++) {
        var hero = Heroes_1[_i];
        hero.selected = false;
    }
    // Get random heroes
    while (gData.results.length < 10000) {
        var randomHero = getRandom(Heroes);
        if (randomHero === null)
            break;
    }
    // Get teamups of results
    if (gData.teamupMode === "Prioritize") {
        for (var _a = 0, _b = gData.results; _a < _b.length; _a++) {
            var hero1 = _b[_a];
            for (var _c = 0, _d = gData.results; _c < _d.length; _c++) {
                var hero2 = _d[_c];
                var teamups = shuffle(hero1.hero.teamups);
                for (var _e = 0, teamups_1 = teamups; _e < teamups_1.length; _e++) {
                    var teamup = teamups_1[_e];
                    if (teamup.hero === hero2.hero.name) {
                        hero1.teamup = teamup;
                    }
                }
            }
            if (hero1.teamup.name === "") {
                hero1.teamup = hero1.hero.teamups[Math.floor(Math.random() * hero1.hero.teamups.length)];
            }
        }
    }
    // Shuffle for added randomness
    gData.results = shuffle(gData.results);
}
//#endregion
//#region UI
RatchetReact.Root = (RatchetReact.New("main").set("className", "container").open()
    .add("h1").set("textContent", "Marvel Rivals Randomizer").setRaw("style", "text-align: center;")
    .addRef(TeamSettings())
    .addRef(RandomizeSection())
    .addRef(HeroSettings())
    .addRef(MiscSettings())
    .close());
function TeamSettings() {
    var partySizeRef = RatchetReact.New("input");
    var minVanguardRef = RatchetReact.New("input");
    var maxVanguardRef = RatchetReact.New("input");
    var minDuelistRef = RatchetReact.New("input");
    var maxDuelistRef = RatchetReact.New("input");
    var minStrategistRef = RatchetReact.New("input");
    var maxStrategistRef = RatchetReact.New("input");
    var errMsgRef = RatchetReact.New("small");
    var validateTeamSettings = function () {
        var valid = true;
        gData.teamSize = partySizeRef.get("valueAsNumber");
        if (isNaN(gData.teamSize)) {
            gData.teamSize = getMinTeamSize();
        }
        if (gData.teamSize < 1) {
            partySizeRef.set("ariaInvalid", "true");
            errMsgRef.set("textContent", "Party size must be at least 1");
            valid = false;
        }
        else if (gData.teamSize < getMinTeamSize()) {
            partySizeRef.set("ariaInvalid", "true");
            errMsgRef.set("textContent", "The math ain't mathing. The party size must be at least " + getMinTeamSize());
            valid = false;
        }
        else if (gData.teamSize > getMaxTeamSize()) {
            partySizeRef.set("ariaInvalid", "true");
            errMsgRef.set("textContent", "The math ain't mathing. The party size must be at most " + getMaxTeamSize());
            valid = false;
        }
        else {
            partySizeRef.set("ariaInvalid", "");
        }
        if (gData.minRole.Vanguard < 0) {
            minVanguardRef.set("ariaInvalid", "true");
            errMsgRef.set("textContent", "You can't have negative vanguards bro");
            valid = false;
        }
        else if (gData.minRole.Vanguard > gData.maxRole.Vanguard) {
            minVanguardRef.set("ariaInvalid", "true");
            maxVanguardRef.set("ariaInvalid", "true");
            errMsgRef.set("textContent", "The minimum cannot be larger than the maximum");
            valid = false;
        }
        else {
            minVanguardRef.set("ariaInvalid", "");
            maxVanguardRef.set("ariaInvalid", "");
        }
        if (gData.minRole.Duelist < 0) {
            minDuelistRef.set("ariaInvalid", "true");
            errMsgRef.set("textContent", "You can't have negative duelists bro");
            valid = false;
        }
        else if (gData.minRole.Duelist > gData.maxRole.Duelist) {
            minDuelistRef.set("ariaInvalid", "true");
            maxDuelistRef.set("ariaInvalid", "true");
            errMsgRef.set("textContent", "The minimum cannot be larger than the maximum");
            valid = false;
        }
        else {
            minDuelistRef.set("ariaInvalid", "");
            maxDuelistRef.set("ariaInvalid", "");
        }
        if (gData.minRole.Strategist < 0) {
            minStrategistRef.set("ariaInvalid", "true");
            errMsgRef.set("textContent", "You can't have negative strategists bro");
            valid = false;
        }
        else if (gData.minRole.Strategist > gData.maxRole.Strategist) {
            minStrategistRef.set("ariaInvalid", "true");
            maxStrategistRef.set("ariaInvalid", "true");
            errMsgRef.set("textContent", "The minimum cannot be larger than the maximum");
            valid = false;
        }
        else {
            minStrategistRef.set("ariaInvalid", "");
            maxStrategistRef.set("ariaInvalid", "");
        }
        if (valid) {
            errMsgRef.set("textContent", "");
        }
    };
    var setMinMax = function (ref) {
        var val = ref.get("valueAsNumber");
        if (ref === minVanguardRef) {
            gData.minRole.Vanguard = isNaN(val) ? 0 : val;
        }
        else if (ref === maxVanguardRef) {
            gData.maxRole.Vanguard = isNaN(val) ? 3333 : val;
        }
        else if (ref === minDuelistRef) {
            gData.minRole.Duelist = isNaN(val) ? 0 : val;
        }
        else if (ref === maxDuelistRef) {
            gData.maxRole.Duelist = isNaN(val) ? 3333 : val;
        }
        else if (ref === minStrategistRef) {
            gData.minRole.Strategist = isNaN(val) ? 0 : val;
        }
        else if (ref === maxStrategistRef) {
            gData.maxRole.Strategist = isNaN(val) ? 3333 : val;
        }
        validateTeamSettings();
        partySizeRef.set("placeholder", getMinTeamSize().toString());
    };
    return (RatchetReact.New("article").open()
        .add("header").setRaw("style", "text-align: center;").open()
        .add("h3").set("textContent", "Team")
        .close()
        .add("label").open()
        .addRaw("Party Size")
        .addRef(partySizeRef).set("type", "number").set("placeholder", "1").set("oninput", validateTeamSettings)
        .close()
        .add("div").set("className", "grid").open()
        .add("label").set("textContent", "Vanguard").open()
        .add("div").set("role", "group").open()
        .addRef(minVanguardRef).set("type", "number").set("placeholder", "Min").set("oninput", function () { return setMinMax(minVanguardRef); })
        .addRef(maxVanguardRef).set("type", "number").set("placeholder", "Max").set("oninput", function () { return setMinMax(maxVanguardRef); })
        .close()
        .close()
        .add("label").set("textContent", "Duelist").open()
        .add("div").set("role", "group").open()
        .addRef(minDuelistRef).set("type", "number").set("placeholder", "Min").set("oninput", function () { return setMinMax(minDuelistRef); })
        .addRef(maxDuelistRef).set("type", "number").set("placeholder", "Max").set("oninput", function () { return setMinMax(maxDuelistRef); })
        .close()
        .close()
        .add("label").set("textContent", "Strategist").open()
        .add("div").set("role", "group").open()
        .addRef(minStrategistRef).set("type", "number").set("placeholder", "Min").set("oninput", function () { return setMinMax(minStrategistRef); })
        .addRef(maxStrategistRef).set("type", "number").set("placeholder", "Max").set("oninput", function () { return setMinMax(maxStrategistRef); })
        .close()
        .close()
        .close()
        .add("input").setRaw("style", "display: none;").set("ariaInvalid", "true")
        .addRef(errMsgRef)
        .close());
}
function HeroSettings() {
    var disableVanguardRef = RatchetReact.New("input");
    var enableVanguardRef = RatchetReact.New("input");
    var disableDuelistRef = RatchetReact.New("input");
    var enableDuelistRef = RatchetReact.New("input");
    var disableStrategistRef = RatchetReact.New("input");
    var enableStrategistRef = RatchetReact.New("input");
    var vanguardListRef = RatchetReact.New("fieldset");
    var duelistListRef = RatchetReact.New("fieldset");
    var strategistListRef = RatchetReact.New("fieldset");
    var enableAll = function (list, enable) {
        for (var _i = 0, _a = Array.from(list.get("children")); _i < _a.length; _i++) {
            var child = _a[_i];
            var checkbox = child.firstChild;
            checkbox.checked = enable;
            if (checkbox.onchange)
                checkbox.onchange(new Event(""));
        }
    };
    gHandlers.disableHeroes = function (list) {
        var fieldset;
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var hero = list_1[_i];
            if (hero.role === "Vanguard") {
                fieldset = vanguardListRef;
            }
            else if (hero.role === "Duelist") {
                fieldset = duelistListRef;
            }
            else {
                fieldset = strategistListRef;
            }
            for (var _a = 0, _b = Array.from(fieldset.get("children")); _a < _b.length; _a++) {
                var child = _b[_a];
                var checkbox = child.firstChild;
                if (checkbox.id === hero.hero.name) {
                    checkbox.checked = false;
                    if (checkbox.onchange)
                        checkbox.onchange(new Event(""));
                    break;
                }
            }
        }
    };
    vanguardListRef.open();
    duelistListRef.open();
    strategistListRef.open();
    for (var _i = 0, Heroes_2 = Heroes; _i < Heroes_2.length; _i++) {
        var hero = Heroes_2[_i];
        for (var _a = 0, _b = hero.roles; _a < _b.length; _a++) {
            var role = _b[_a];
            if (role === "Vanguard") {
                vanguardListRef.addRef(HeroEntry(hero, role));
            }
            else if (role === "Duelist") {
                duelistListRef.addRef(HeroEntry(hero, role));
            }
            else if (role === "Strategist") {
                strategistListRef.addRef(HeroEntry(hero, role));
            }
        }
    }
    vanguardListRef.close();
    duelistListRef.close();
    strategistListRef.close();
    return (RatchetReact.New("article").open()
        .add("header").setRaw("style", "text-align: center;").open()
        .add("h3").set("textContent", "Heroes")
        .close()
        .add("div").set("className", "grid").open()
        .add("div").setRaw("style", "text-align: center;").open()
        .add("img").set("src", "img/Vanguard.png").setRaw("style", "padding-bottom: 20px")
        .add("div").set("role", "group").open()
        .addRef(disableVanguardRef).set("type", "submit").set("value", "Disable All").set("onclick", function () { return enableAll(vanguardListRef, false); })
        .addRef(enableVanguardRef).set("type", "submit").set("value", "Enable All").set("onclick", function () { return enableAll(vanguardListRef, true); })
        .close()
        .addRef(vanguardListRef)
        .close()
        .add("div").setRaw("style", "text-align: center;").open()
        .add("img").set("src", "img/Duelist.png").setRaw("style", "padding-bottom: 20px")
        .add("div").set("role", "group").open()
        .addRef(disableDuelistRef).set("type", "submit").set("value", "Disable All").set("onclick", function () { return enableAll(duelistListRef, false); })
        .addRef(enableDuelistRef).set("type", "submit").set("value", "Enable All").set("onclick", function () { return enableAll(duelistListRef, true); })
        .close()
        .addRef(duelistListRef)
        .close()
        .add("div").setRaw("style", "text-align: center;").open()
        .add("img").set("src", "img/Strategist.png").setRaw("style", "padding-bottom: 20px")
        .add("div").set("role", "group").open()
        .addRef(disableStrategistRef).set("type", "submit").set("value", "Disable All").set("onclick", function () { return enableAll(strategistListRef, false); })
        .addRef(enableStrategistRef).set("type", "submit").set("value", "Enable All").set("onclick", function () { return enableAll(strategistListRef, true); })
        .close()
        .addRef(strategistListRef)
        .close()
        .close()
        .close());
}
function HeroEntry(hero, role) {
    var checkbox = RatchetReact.New("input");
    var heroName = hero.roles.length > 1 ? hero.name + " (" + role + ")" : hero.name;
    hero.disabled = false;
    return (RatchetReact.New("label").open()
        .addRef(checkbox).set("type", "checkbox").set("checked", true).set("id", hero.name).set("onchange", function () { return hero.disabled = !checkbox.get("checked"); })
        .addRaw(heroName)
        .close());
}
function MiscSettings() {
    var disablePrevHeroRef = RatchetReact.New("input");
    var allowDuplicatesRef = RatchetReact.New("input");
    var teamupIgnoreRef = RatchetReact.New("input");
    var teamupRandomizeRef = RatchetReact.New("input");
    var teamupPrioritizeRef = RatchetReact.New("input");
    var teamupForceRef = RatchetReact.New("input");
    return (RatchetReact.New("article").open()
        .add("header").setRaw("style", "text-align: center;").open()
        .add("h3").set("textContent", "Misc Settings")
        .close()
        .add("div").set("className", "grid").open()
        .add("fieldset").open()
        .add("label").open()
        .addRef(disablePrevHeroRef).set("type", "checkbox").set("onchange", function () { return gData.disablePrevHeroes = disablePrevHeroRef.get("checked"); })
        .add("span").set("textContent", "Disable Previous Heroes").setRaw("data-tooltip", "Disables heroes as they get rolled.")
        .close()
        .add("label").open()
        .addRef(allowDuplicatesRef).set("type", "checkbox").set("onchange", function () { return gData.allowDuplicates = allowDuplicatesRef.get("checked"); })
        .add("span").set("textContent", "Allow Duplicates").setRaw("data-tooltip", "Allows duplicate heroes to be rolled.")
        .close()
        .close()
        .add("fieldset").open()
        .add("legend").open()
        .addRaw("Teamup Settings")
        .close()
        .add("label").open()
        .addRef(teamupIgnoreRef).set("type", "radio").set("name", "teamup").set("onchange", function () { if (teamupIgnoreRef.get("checked"))
        gData.teamupMode = "Ignore"; })
        .add("span").set("textContent", "Disable").setRaw("data-tooltip", "Does not select teamup")
        .close()
        .add("label").open()
        .addRef(teamupRandomizeRef).set("type", "radio").set("name", "teamup").set("checked", true).set("onchange", function () { if (teamupRandomizeRef.get("checked"))
        gData.teamupMode = "Random"; })
        .add("span").set("textContent", "Randomize").setRaw("data-tooltip", "Selects random teamup")
        .close()
        .add("label").open()
        .addRef(teamupPrioritizeRef).set("type", "radio").set("name", "teamup").set("onchange", function () { if (teamupPrioritizeRef.get("checked"))
        gData.teamupMode = "Prioritize"; })
        .add("span").set("textContent", "Prioritize").setRaw("data-tooltip", "Prioritizes upgraded teamups")
        .close()
        .add("label").open()
        .addRef(teamupForceRef).set("type", "radio").set("name", "teamup").set("onchange", function () { if (teamupForceRef.get("checked"))
        gData.teamupMode = "Force"; })
        .add("span").set("textContent", "Force").setRaw("data-tooltip", "Forces team to have upgraded teamups (This can skew characters that have more teamups to show up more often)")
        .close()
        .close()
        .close()
        .close());
}
function RandomizeSection() {
    var resultsRef = RatchetReact.New("div");
    var onRandomize = function () {
        randomize();
        if (gData.disablePrevHeroes)
            gHandlers.disableHeroes(gData.results);
        resultsRef.setRaw("style", "min-height: " + resultsRef.get("offsetHeight") + "px;");
        resultsRef.elem().replaceChildren();
        resultsRef.open();
        var row = null;
        var cnt = 0;
        for (var _i = 0, _a = gData.results; _i < _a.length; _i++) {
            var hero = _a[_i];
            if (cnt % 6 === 0 || row === null) {
                row = resultsRef.add("div").set("className", "grid");
            }
            var heroName = hero.hero.roles.length > 1 ? hero.hero.name + " (" + hero.role + ")" : hero.hero.name;
            var h5Ref = RatchetReact.New("h5");
            row.open()
                .add("div").setRaw("style", "text-align: center;").open()
                .add("img").set("src", "img/hero/" + heroName + ".png")
                .addRef(h5Ref).set("textContent", heroName)
                .close()
                .close();
            if (gData.teamupMode !== "Ignore") {
                var boosted = false;
                for (var _b = 0, _c = gData.results; _b < _c.length; _b++) {
                    var hero2 = _c[_b];
                    if (hero2.hero.name === hero.teamup.hero) {
                        boosted = true;
                        break;
                    }
                }
                var filename = "img/ability/" + hero.teamup.name.replace("//", "^^") + ".png";
                var divRef = RatchetReact.New("div");
                h5Ref.add("img").set("src", filename)
                    .addRef(divRef).set("textContent", hero.teamup.name);
                if (boosted) {
                    divRef.setRaw("style", "border-bottom: none; font-weight: bold;").setRaw("data-placement", "bottom").setRaw("data-tooltip", "Boosted by " + hero.teamup.hero);
                }
            }
            ++cnt;
        }
    };
    return (RatchetReact.New("article").open()
        .add("header").setRaw("style", "text-align: center;").open()
        .add("h3").set("textContent", "Results")
        .close()
        .add("input").set("type", "submit").set("value", "Randomize").set("onclick", onRandomize)
        .addRef(resultsRef)
        .close());
}
//#endregion
function runSimulation(runs) {
    if (runs === void 0) { runs = 1000000; }
    var results = {};
    var resultsTeamups = [];
    for (var i = 0; i < runs; ++i) {
        randomize();
        // Count heroes
        var boostedTeamups = 0;
        for (var _i = 0, _a = gData.results; _i < _a.length; _i++) {
            var hero = _a[_i];
            var heroName = hero.hero.roles.length > 1 ? hero.hero.name + " (" + hero.role + ")" : hero.hero.name;
            if (isNaN(results[heroName])) {
                results[heroName] = 0;
            }
            results[heroName] += 1;
            // Count teamups
            for (var _b = 0, _c = gData.results; _b < _c.length; _b++) {
                var hero2 = _c[_b];
                if (hero2.hero.name === hero.teamup.hero) {
                    ++boostedTeamups;
                    break;
                }
            }
        }
        if (resultsTeamups[boostedTeamups] === undefined) {
            resultsTeamups[boostedTeamups] = 1;
        }
        else {
            resultsTeamups[boostedTeamups] += 1;
        }
    }
    var totCnt = 0;
    var resultsSorted = Object.entries(results).sort(function (a, b) { return b[1] - a[1]; });
    for (var _d = 0, resultsSorted_1 = resultsSorted; _d < resultsSorted_1.length; _d++) {
        var _e = resultsSorted_1[_d], hero = _e[0], cnt = _e[1];
        totCnt += cnt;
    }
    var avg = totCnt / resultsSorted.length;
    console.log("Average: " + avg);
    var printHeroResult = function (hero) {
        var diff = Math.abs(results[hero] - avg);
        var absDiff = results[hero] >= avg ? "+" + Math.round(diff) : "-" + Math.round(diff);
        var relDiff = results[hero] >= avg ? "+" + (Math.round(diff / avg * 10000) / 100) + "%" : "-" + (Math.round(diff / avg * 10000) / 100) + "%";
        console.log(hero + ": " + results[hero] + " (" + absDiff + " | " + relDiff + ")");
    };
    for (var _f = 0, resultsSorted_2 = resultsSorted; _f < resultsSorted_2.length; _f++) {
        var hero = resultsSorted_2[_f];
        printHeroResult(hero[0]);
    }
    console.log("Teamups frequency:");
    var teamupAvg = 0;
    for (var i = 0; i < resultsTeamups.length; ++i) {
        if (resultsTeamups[i] === undefined)
            continue;
        teamupAvg += (i * resultsTeamups[i]);
        console.log(i + ": " + resultsTeamups[i]);
    }
    teamupAvg /= runs;
    console.log("Average: " + teamupAvg);
}
