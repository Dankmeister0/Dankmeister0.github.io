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
var Vanguards = [
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
];
var Duelists = [
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
];
var Strategists = [
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
];
function isVanguard(hero) {
    return Vanguards.includes(hero);
}
function isDuelist(hero) {
    return Duelists.includes(hero);
}
function isStrategist(hero) {
    return Strategists.includes(hero);
}
var Teamup = /** @class */ (function () {
    function Teamup() {
        this.name = "";
        this.members = [];
    }
    return Teamup;
}());
var Teamups = [
    {
        name: "Planet X Pals",
        members: ["Groot", "Rocket Raccoon", "Jeff the Land Shark"]
    },
    {
        name: "Gamma Fastball",
        members: ["Wolverine", "Hulk", "The Thing"]
    },
    {
        name: "Stars Aligned",
        members: ["Captain America", "Winter Soldier"]
    },
    {
        name: "Stark Protocol",
        members: ["Iron Man", "Ultron", "Squirrel Girl"]
    },
    {
        name: "Symbiote Shenanigans",
        members: ["Venom", "Jeff the Land Shark", "Hela"]
    },
    {
        name: "Divine Armory",
        members: ["Angela", "Thor"]
    },
    {
        name: "Lunar Force",
        members: ["Cloak & Dagger", "Moon Knight", "Blade"]
    },
    {
        name: "Vibrant Vitality",
        members: ["Mantis", "Groot", "Loki"]
    },
    {
        name: "First Steps",
        members: ["Human Torch", "The Thing"]
    },
    {
        name: "Arcane Order",
        members: ["Doctor Strange", "Scarlet Witch", "Magik"]
    },
    {
        name: "Bestial Hunt",
        members: ["Daredevil", "The Punisher"]
    },
    {
        name: "Deep Wrath",
        members: ["Hela", "Namor"]
    },
    {
        name: "Blade of Khonshu",
        members: ["Moon Knight", "Blade"]
    },
    {
        name: "Primal Flame",
        members: ["Phoenix", "Black Widow", "Wolverine"]
    },
    {
        name: "Chilling Assault",
        members: ["Luna Snow", "Iron Fist", "Emma Frost"]
    },
    {
        name: "Sword of Duality",
        members: ["Cloak & Dagger", "Hawkeye", "Psylocke"]
    },
    {
        name: "Explosive Entanglement",
        members: ["Gambit", "Magneto", "Rogue"]
    },
    {
        name: "Parker Power-Up",
        members: ["Peni Parker", "Spider-Man"]
    },
    {
        name: "Mr Pool's Interdimensional Toy Box",
        members: ["Deadpool (Vanguard)", "Elsa Bloodstone", "Jeff the Land Shark"]
    },
    {
        name: "Mr Pool's Interdimensional Toy Box",
        members: ["Deadpool (Duelist)", "Elsa Bloodstone", "Jeff the Land Shark"]
    },
    {
        name: "Mr Pool's Interdimensional Toy Box",
        members: ["Deadpool (Strategist)", "Elsa Bloodstone", "Jeff the Land Shark"]
    },
    {
        name: "Rocket Network",
        members: ["Rocket Raccoon", "Star-Lord", "Mister Fantastic"]
    },
    {
        name: "Gamma Charge",
        members: ["Hulk", "The Thing", "Black Panther"]
    },
    {
        name: "Psionite Mayhem",
        members: ["Invisible Woman", "Doctor Strange"]
    },
    {
        name: "Cosmic Cyclone",
        members: ["Storm", "Adam Warlock"]
    },
    {
        name: "Bless of the Kumiho",
        members: ["White Fox", "Luna Snow"]
    },
    {
        name: "Lucky Loan",
        members: ["Black Cat", "Captain America", "White Fox"]
    },
    {
        name: "Primal Punishment",
        members: ["Devil Dinosaur", "The Punisher"]
    },
];
/// <reference path = "ratchetReact.ts" />
/// <reference path = "defs.ts" />
var gData = {
    teamSize: NaN,
    minVanguard: NaN,
    maxVanguard: NaN,
    minDuelist: NaN,
    maxDuelist: NaN,
    minStrategist: NaN,
    maxStrategist: NaN,
    selectedVanguards: {},
    selectedDuelists: {},
    selectedStrategists: {},
    disablePrevHeroes: false,
    allowDuplicates: false,
    prioritizeTeamups: 0,
};
var gHandlers = {
    disableHeroes: (function () { }),
    runSim: runSimulation,
};
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
    var partySizeErrRef = RatchetReact.New("small");
    var updateDefaultPartySize = function () {
        partySizeRef.set("placeholder", getDefaultTeamSize().toString());
    };
    var validatePartySize = function () {
        gData.teamSize = partySizeRef.get("valueAsNumber");
        if (gData.teamSize < 1) {
            partySizeRef.set("ariaInvalid", "true");
            partySizeErrRef.set("textContent", "Party size must be at least 1");
        }
        else if (gData.teamSize < getMinTeamSize()) {
            partySizeRef.set("ariaInvalid", "true");
            partySizeErrRef.set("textContent", "The math ain't mathing. The party size must be at least " + getMinTeamSize());
        }
        else if (gData.teamSize > getMaxTeamSize()) {
            partySizeRef.set("ariaInvalid", "true");
            partySizeErrRef.set("textContent", "The math ain't mathing. The party size must be at most " + getMaxTeamSize());
        }
        else {
            partySizeRef.set("ariaInvalid", "");
            partySizeErrRef.set("textContent", "");
        }
    };
    var validateMinMax = function (minRef, maxRef) {
        if (!minRef.elem || !maxRef.elem)
            return;
        if (minRef === minVanguardRef) {
            gData.minVanguard = minRef.get("valueAsNumber");
            gData.maxVanguard = maxRef.get("valueAsNumber");
        }
        else if (minRef === minDuelistRef) {
            gData.minDuelist = minRef.get("valueAsNumber");
            gData.maxDuelist = maxRef.get("valueAsNumber");
        }
        else {
            gData.minStrategist = minRef.get("valueAsNumber");
            gData.maxStrategist = maxRef.get("valueAsNumber");
        }
        if (minRef.get("valueAsNumber") > maxRef.get("valueAsNumber")) {
            minRef.set("ariaInvalid", "true");
            maxRef.set("ariaInvalid", "true");
        }
        else {
            minRef.set("ariaInvalid", "");
            maxRef.set("ariaInvalid", "");
        }
        updateDefaultPartySize();
    };
    return (RatchetReact.New("article").open()
        .add("header").setRaw("style", "text-align: center;").open()
        .add("h3").set("textContent", "Team")
        .close()
        .add("label").open()
        .addRaw("Party Size")
        .addRef(partySizeRef).set("type", "number").set("placeholder", "1").set("oninput", validatePartySize)
        .addRef(partySizeErrRef)
        .close()
        .add("div").set("className", "grid").open()
        .add("label").set("textContent", "Vanguard").open()
        .add("div").set("role", "group").open()
        .addRef(minVanguardRef).set("type", "number").set("placeholder", "Min").set("oninput", function () { return validateMinMax(minVanguardRef, maxVanguardRef); })
        .addRef(maxVanguardRef).set("type", "number").set("placeholder", "Max").set("oninput", function () { return validateMinMax(minVanguardRef, maxVanguardRef); })
        .close()
        .close()
        .add("label").set("textContent", "Duelist").open()
        .add("div").set("role", "group").open()
        .addRef(minDuelistRef).set("type", "number").set("placeholder", "Min").set("oninput", function () { return validateMinMax(minDuelistRef, maxDuelistRef); })
        .addRef(maxDuelistRef).set("type", "number").set("placeholder", "Max").set("oninput", function () { return validateMinMax(minDuelistRef, maxDuelistRef); })
        .close()
        .close()
        .add("label").set("textContent", "Strategist").open()
        .add("div").set("role", "group").open()
        .addRef(minStrategistRef).set("type", "number").set("placeholder", "Min").set("oninput", function () { return validateMinMax(minStrategistRef, maxStrategistRef); })
        .addRef(maxStrategistRef).set("type", "number").set("placeholder", "Max").set("oninput", function () { return validateMinMax(minStrategistRef, maxStrategistRef); })
        .close()
        .close()
        .close()
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
    var onEnableAll = function (list, enable) {
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
            if (isVanguard(hero)) {
                fieldset = vanguardListRef;
            }
            else if (isDuelist(hero)) {
                fieldset = duelistListRef;
            }
            else {
                fieldset = strategistListRef;
            }
            for (var _a = 0, _b = Array.from(fieldset.get("children")); _a < _b.length; _a++) {
                var child = _b[_a];
                var checkbox = child.firstChild;
                if (checkbox.id === hero) {
                    checkbox.checked = false;
                    if (checkbox.onchange)
                        checkbox.onchange(new Event(""));
                    break;
                }
            }
        }
    };
    vanguardListRef.open();
    for (var _i = 0, Vanguards_1 = Vanguards; _i < Vanguards_1.length; _i++) {
        var vanguard = Vanguards_1[_i];
        vanguardListRef.addRef(HeroEntry(vanguard, gData.selectedVanguards));
    }
    vanguardListRef.close();
    duelistListRef.open();
    for (var _a = 0, Duelists_1 = Duelists; _a < Duelists_1.length; _a++) {
        var duelist = Duelists_1[_a];
        duelistListRef.addRef(HeroEntry(duelist, gData.selectedDuelists));
    }
    duelistListRef.close();
    strategistListRef.open();
    for (var _b = 0, Strategists_1 = Strategists; _b < Strategists_1.length; _b++) {
        var strategist = Strategists_1[_b];
        strategistListRef.addRef(HeroEntry(strategist, gData.selectedStrategists));
    }
    strategistListRef.close();
    return (RatchetReact.New("article").open()
        .add("header").setRaw("style", "text-align: center;").open()
        .add("h3").set("textContent", "Heroes")
        .close()
        .add("div").set("className", "grid").open()
        .add("div").setRaw("style", "text-align: center;").open()
        .add("img").set("src", "img/Vanguard.png").setRaw("style", "padding-bottom: 20px")
        .add("div").set("role", "group").open()
        .addRef(disableVanguardRef).set("type", "submit").set("value", "Disable All").set("onclick", function () { return onEnableAll(vanguardListRef, false); })
        .addRef(enableVanguardRef).set("type", "submit").set("value", "Enable All").set("onclick", function () { return onEnableAll(vanguardListRef, true); })
        .close()
        .addRef(vanguardListRef)
        .close()
        .add("div").setRaw("style", "text-align: center;").open()
        .add("img").set("src", "img/Duelist.png").setRaw("style", "padding-bottom: 20px")
        .add("div").set("role", "group").open()
        .addRef(disableDuelistRef).set("type", "submit").set("value", "Disable All").set("onclick", function () { return onEnableAll(duelistListRef, false); })
        .addRef(enableDuelistRef).set("type", "submit").set("value", "Enable All").set("onclick", function () { return onEnableAll(duelistListRef, true); })
        .close()
        .addRef(duelistListRef)
        .close()
        .add("div").setRaw("style", "text-align: center;").open()
        .add("img").set("src", "img/Strategist.png").setRaw("style", "padding-bottom: 20px")
        .add("div").set("role", "group").open()
        .addRef(disableStrategistRef).set("type", "submit").set("value", "Disable All").set("onclick", function () { return onEnableAll(strategistListRef, false); })
        .addRef(enableStrategistRef).set("type", "submit").set("value", "Enable All").set("onclick", function () { return onEnableAll(strategistListRef, true); })
        .close()
        .addRef(strategistListRef)
        .close()
        .close()
        .close());
}
function HeroEntry(hero, heroList) {
    var checkbox = RatchetReact.New("input");
    heroList[hero] = true;
    return (RatchetReact.New("label").open()
        .addRef(checkbox).set("type", "checkbox").set("checked", true).set("id", hero).set("onchange", function () { return heroList[hero] = checkbox.get("checked"); })
        .addRaw(hero)
        .close());
}
function MiscSettings() {
    var disablePrevHeroRef = RatchetReact.New("input");
    var allowDuplicatesRef = RatchetReact.New("input");
    var prioritizeTeamupsRef = RatchetReact.New("input");
    var prioritizeTeamupsVal = RatchetReact.New("input");
    var updateSlider = function () {
        gData.prioritizeTeamups = prioritizeTeamupsRef.get("valueAsNumber");
        prioritizeTeamupsVal.set("value", gData.prioritizeTeamups.toString());
    };
    var updateVal = function () {
        gData.prioritizeTeamups = Number.parseInt(prioritizeTeamupsVal.get("value"));
        prioritizeTeamupsRef.set("value", gData.prioritizeTeamups.toString());
    };
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
        .add("div").open()
        .add("label").open()
        .add("span").set("textContent", "Prioritize Teamups").setRaw("data-tooltip", "Increases the odds of rolling teamups. A higher value means teamups are more frequent.")
        .addRef(prioritizeTeamupsVal).set("value", "0").setRaw("style", "width: 10%; height: 10%; margin-left: 100px; margin-bottom: 0px; padding: 5px 10px;").set("oninput", updateVal)
        .add("br")
        .addRef(prioritizeTeamupsRef).setRaw("style", "width: 50%").set("type", "range").set("value", "0").set("oninput", updateSlider)
        .close()
        .close()
        .close()
        .close());
}
function RandomizeSection() {
    var resultsRef = RatchetReact.New("div");
    var res = [];
    var onRandomize = function () {
        res = randomize();
        if (gData.disablePrevHeroes) {
            gHandlers.disableHeroes(res);
        }
        resultsRef.setRaw("style", "min-height: " + resultsRef.get("offsetHeight") + "px;");
        resultsRef.elem().replaceChildren();
        resultsRef.open();
        var row = null;
        var cnt = 0;
        for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
            var hero = res_1[_i];
            if (cnt % 6 === 0 || row === null) {
                row = resultsRef.add("div").set("className", "grid");
            }
            row.open()
                .add("div").setRaw("style", "text-align: center;").open()
                .add("img").set("src", "img/" + hero + ".png")
                .add("h5").set("textContent", hero)
                .close()
                .close();
            ++cnt;
        }
        // Create teamups section
        var teamupAnchors = [];
        var teamupMembers = [];
        for (var _a = 0, res_2 = res; _a < res_2.length; _a++) {
            var hero = res_2[_a];
            for (var i = 0; i < Teamups.length; ++i) {
                if (Teamups[i].members[0] === hero) {
                    teamupAnchors[i] = true;
                }
                else if (Teamups[i].members.includes(hero)) {
                    teamupMembers[i] = true;
                }
            }
        }
        cnt = 0;
        row = resultsRef.add("div").set("className", "grid").setRaw("style", "overflow-x: auto;");
        row.open().add("div").close(); // Add left padding
        for (var i = 0; i < Teamups.length; ++i) {
            if (teamupAnchors[i] === true && teamupMembers[i] === true) {
                var fontSize = Teamups[i].name.length > 26 ? "17" : "21";
                row.get("style").gridTemplateColumns += " 280px";
                row.open()
                    .add("div").setRaw("style", "min-width: 340px; position: relative;").open()
                    .add("img").set("src", "img/" + Teamups[i].name + ".png")
                    .add("p").set("textContent", Teamups[i].name).setRaw("style", "font-size: " + fontSize + "px; font-weight: bold; position: absolute; left: 21px; bottom: 0px; color: rgb(110, 135, 158);")
                    .close()
                    .close();
                ++cnt;
            }
        }
        resultsRef.close();
        // Calculate left padding
        var padding = (row.get("offsetWidth") - (cnt * 280)) / 2 - 81;
        if (padding < 0 || isNaN(padding))
            padding = 0;
        row.get("style").gridTemplateColumns = padding.toString() + "px " + row.get("style").gridTemplateColumns;
    };
    return (RatchetReact.New("article").open()
        .add("header").setRaw("style", "text-align: center;").open()
        .add("h3").set("textContent", "Results")
        .close()
        .add("input").set("type", "submit").set("value", "Randomize").set("onclick", onRandomize)
        .addRef(resultsRef)
        .close());
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
    if (!Number.isNaN(gData.minVanguard)) {
        teamSize += gData.minVanguard;
    }
    if (!Number.isNaN(gData.minDuelist)) {
        teamSize += gData.minDuelist;
    }
    if (!Number.isNaN(gData.minStrategist)) {
        teamSize += gData.minStrategist;
    }
    return teamSize < 1 ? 1 : teamSize;
}
function getMaxTeamSize() {
    var teamSize = 0;
    if (!Number.isNaN(gData.maxVanguard)) {
        teamSize += gData.maxVanguard;
    }
    else
        return 1000;
    if (!Number.isNaN(gData.maxDuelist)) {
        teamSize += gData.maxDuelist;
    }
    else
        return 1000;
    if (!Number.isNaN(gData.maxStrategist)) {
        teamSize += gData.maxStrategist;
    }
    else
        return 1000;
    return teamSize;
}
function getDefaultTeamSize() {
    var teamSize = 0;
    if (!Number.isNaN(gData.minVanguard)) {
        teamSize += gData.minVanguard;
    }
    else if (!Number.isNaN(gData.maxVanguard)) {
        teamSize += gData.maxVanguard;
    }
    if (!Number.isNaN(gData.minDuelist)) {
        teamSize += gData.minDuelist;
    }
    else if (!Number.isNaN(gData.maxDuelist)) {
        teamSize += gData.maxDuelist;
    }
    if (!Number.isNaN(gData.minStrategist)) {
        teamSize += gData.minStrategist;
    }
    else if (!Number.isNaN(gData.maxStrategist)) {
        teamSize += gData.maxStrategist;
    }
    return teamSize < 1 ? 1 : teamSize;
}
function randomize() {
    var teamSize = Number.isNaN(gData.teamSize) ? getDefaultTeamSize() : gData.teamSize;
    var minVanguard = Number.isNaN(gData.minVanguard) ? 0 : gData.minVanguard;
    var minDuelist = Number.isNaN(gData.minDuelist) ? 0 : gData.minDuelist;
    var minStrategist = Number.isNaN(gData.minStrategist) ? 0 : gData.minStrategist;
    var maxVanguard = Number.isNaN(gData.maxVanguard) ? 1000 : gData.maxVanguard;
    var maxDuelist = Number.isNaN(gData.maxDuelist) ? 1000 : gData.maxDuelist;
    var maxStrategist = Number.isNaN(gData.maxStrategist) ? 1000 : gData.maxStrategist;
    var vanguardCnt = 0;
    var duelistCnt = 0;
    var strategistCnt = 0;
    var vanguards = [];
    var duelists = [];
    var strategists = [];
    var all = [];
    var results = [];
    // Build lists of allowed heroes of each role
    for (var _i = 0, _a = Object.entries(gData.selectedVanguards); _i < _a.length; _i++) {
        var _b = _a[_i], hero = _b[0], enabled = _b[1];
        if (enabled) {
            vanguards.push(hero);
            all.push(hero);
        }
    }
    for (var _c = 0, _d = Object.entries(gData.selectedDuelists); _c < _d.length; _c++) {
        var _e = _d[_c], hero = _e[0], enabled = _e[1];
        if (enabled) {
            duelists.push(hero);
            all.push(hero);
        }
    }
    for (var _f = 0, _g = Object.entries(gData.selectedStrategists); _f < _g.length; _f++) {
        var _h = _g[_f], hero = _h[0], enabled = _h[1];
        if (enabled) {
            strategists.push(hero);
            all.push(hero);
        }
    }
    // Checks if a given hero can be selected
    var isHeroAllowed = function (hero, strict) {
        if (!all.includes(hero))
            return false;
        if (results.length == teamSize)
            return false;
        if (isVanguard(hero)) {
            if (strict)
                return vanguardCnt < minVanguard;
            return vanguardCnt < maxVanguard;
        }
        if (isDuelist(hero)) {
            if (strict)
                return duelistCnt < minDuelist;
            return duelistCnt < maxDuelist;
        }
        if (isStrategist(hero)) {
            if (strict)
                return strategistCnt < minStrategist;
            return strategistCnt < maxStrategist;
        }
        return false;
    };
    // Removes all heroes of a given role from the heroes that can be selected if max is reached
    var removeMaxedRole = function (cnt, max, roleHeroes) {
        if (cnt === max) {
            for (var i = all.length - 1; i >= 0; --i) {
                if (roleHeroes.includes(all[i])) {
                    all.splice(i, 1);
                }
            }
        }
    };
    // Adds a hero to the results
    var addHero = function (hero) {
        results.push(hero);
        if (!gData.allowDuplicates && (hero == "Deadpool (Vanguard)" || hero == "Deadpool (Duelist)" || hero == "Deadpool (Strategist)")) {
            var deadpoolPos = all.findIndex(function (val) { return val == "Deadpool (Vanguard)"; });
            if (deadpoolPos != -1)
                all.splice(deadpoolPos, 1);
            deadpoolPos = all.findIndex(function (val) { return val == "Deadpool (Duelist)"; });
            if (deadpoolPos != -1)
                all.splice(deadpoolPos, 1);
            deadpoolPos = all.findIndex(function (val) { return val == "Deadpool (Strategist)"; });
            if (deadpoolPos != -1)
                all.splice(deadpoolPos, 1);
            deadpoolPos = vanguards.findIndex(function (val) { return val == "Deadpool (Vanguard)"; });
            if (deadpoolPos != -1)
                vanguards.splice(deadpoolPos, 1);
            deadpoolPos = duelists.findIndex(function (val) { return val == "Deadpool (Duelist)"; });
            if (deadpoolPos != -1)
                duelists.splice(deadpoolPos, 1);
            deadpoolPos = strategists.findIndex(function (val) { return val == "Deadpool (Strategist)"; });
            if (deadpoolPos != -1)
                strategists.splice(deadpoolPos, 1);
        }
        else if (!gData.allowDuplicates) {
            all.splice(all.findIndex(function (val) { return val == hero; }), 1);
        }
        if (isVanguard(hero)) {
            if (!gData.allowDuplicates) {
                vanguards.splice(vanguards.findIndex(function (val) { return val == hero; }), 1);
            }
            ++vanguardCnt;
            removeMaxedRole(vanguardCnt, maxVanguard, Vanguards.slice());
        }
        else if (isDuelist(hero)) {
            if (!gData.allowDuplicates) {
                duelists.splice(duelists.findIndex(function (val) { return val == hero; }), 1);
            }
            ++duelistCnt;
            removeMaxedRole(duelistCnt, maxDuelist, Duelists.slice());
        }
        else {
            if (!gData.allowDuplicates) {
                strategists.splice(strategists.findIndex(function (val) { return val == hero; }), 1);
            }
            ++strategistCnt;
            removeMaxedRole(strategistCnt, maxStrategist, Strategists.slice());
        }
    };
    // add the heroes that would make a teamup with the given hero if possible
    var addTeamupHeroes = function (hero, strict) {
        if (gData.prioritizeTeamups == 0)
            return;
        var randomizedTeamups = shuffle(Teamups);
        for (var _i = 0, randomizedTeamups_1 = randomizedTeamups; _i < randomizedTeamups_1.length; _i++) {
            var teamup = randomizedTeamups_1[_i];
            if (!teamup.members.includes(hero))
                continue;
            // try to add anchor first
            var anchor = teamup.members[0];
            if (!results.includes(anchor)) {
                if (!isHeroAllowed(anchor, strict))
                    continue;
                if (Math.floor(Math.random() * 100) >= gData.prioritizeTeamups)
                    continue;
                addHero(anchor);
                addTeamupHeroes(anchor, strict);
            }
            // try adding rest of teamup
            for (var _a = 0, _b = shuffle(teamup.members); _a < _b.length; _a++) {
                var teamupHero = _b[_a];
                if (teamupHero == hero || !isHeroAllowed(teamupHero, strict))
                    continue;
                if (Math.floor(Math.random() * 100) >= gData.prioritizeTeamups)
                    continue;
                addHero(teamupHero);
                addTeamupHeroes(teamupHero, strict);
            }
        }
    };
    var addMinOfRole = function (role) {
        while (true) {
            var hero = void 0;
            if (role === "Vanguard") {
                if (vanguards.length === 0)
                    break;
                if (vanguardCnt >= minVanguard)
                    break;
                hero = vanguards[Math.floor(Math.random() * vanguards.length)];
            }
            else if (role === "Duelist") {
                if (duelists.length === 0)
                    break;
                if (duelistCnt >= minDuelist)
                    break;
                hero = duelists[Math.floor(Math.random() * duelists.length)];
            }
            else {
                if (strategists.length === 0)
                    break;
                if (strategistCnt >= minStrategist)
                    break;
                hero = strategists[Math.floor(Math.random() * strategists.length)];
            }
            addHero(hero);
            addTeamupHeroes(hero, true);
        }
    };
    // Get the minimum amount of each role
    // We need to randomize the order of this, otherwise deadpool would be most likely to show up on the first role we check
    var getMinOfRoles = shuffle([
        function () { addMinOfRole("Vanguard"); },
        function () { addMinOfRole("Duelist"); },
        function () { addMinOfRole("Strategist"); },
    ]);
    for (var i = 0; i < 3; ++i) {
        getMinOfRoles[i]();
    }
    // Get teamups after getting minimums
    for (var _j = 0, results_1 = results; _j < results_1.length; _j++) {
        var hero = results_1[_j];
        addTeamupHeroes(hero, false);
    }
    // Get the rest of the results
    while (results.length < teamSize && all.length > 0) {
        var rand = Math.floor(Math.random() * all.length);
        var hero = all[rand];
        addHero(hero);
        addTeamupHeroes(hero, false);
    }
    return shuffle(results);
}
function runSimulation(runs) {
    if (runs === void 0) { runs = 1000000; }
    var results = {};
    for (var i = 0; i < runs; ++i) {
        var randHeroes = randomize();
        for (var _i = 0, randHeroes_1 = randHeroes; _i < randHeroes_1.length; _i++) {
            var res = randHeroes_1[_i];
            if (isNaN(results[res])) {
                results[res] = 0;
            }
            results[res] += 1;
        }
    }
    var totCnt = 0;
    var resultsSorted = Object.entries(results).sort(function (a, b) { return b[1] - a[1]; });
    for (var _a = 0, resultsSorted_1 = resultsSorted; _a < resultsSorted_1.length; _a++) {
        var _b = resultsSorted_1[_a], hero = _b[0], cnt = _b[1];
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
    for (var _c = 0, resultsSorted_2 = resultsSorted; _c < resultsSorted_2.length; _c++) {
        var hero = resultsSorted_2[_c];
        printHeroResult(hero[0]);
    }
}
