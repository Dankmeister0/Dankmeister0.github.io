var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var RatchetReact = /** @class */ (function () {
    function RatchetReact(htmlElem) {
        this.parentElem = null;
        this.children = [];
        this.htmlElem = htmlElem;
    }
    /**
     * Creates a new RatchetReact element.
     * @param tagName HTML tag.
     * @param args Attributes to set on the tag. Must be in pairs.
     * @returns Newly created element.
     */
    RatchetReact.New = function (tagName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var rReact = new RatchetReact(document.createElement(tagName));
        for (var i = 0; i < args.length; i = i + 2) {
            rReact.htmlElem.setAttribute(args[i], args[i + 1]);
        }
        return rReact;
    };
    /**
     * Creates and appends a child element to the current element.
     * @param tagName HTML tag of the child.
     * @param args Attributes to set on the child tag. Must be in pairs.
     * @returns Newly created child element.
     */
    RatchetReact.prototype.child = function (tagName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var child = RatchetReact.New.apply(RatchetReact, __spreadArray([tagName], args, false));
        child.parentElem = this;
        this.children.push(child);
        this.htmlElem.appendChild(child.htmlElem);
        return child;
    };
    /**
     * Appends a child element to the current element.
     * @param elem RatchetReact object to append.
     * @returns Newly appended element.
     */
    RatchetReact.prototype.append = function (elem) {
        elem.parentElem = this;
        this.children.push(elem);
        this.htmlElem.appendChild(elem.htmlElem);
        return elem;
    };
    /**
     * Get the element's parent.
     * @returns Element's parent. Throws error on failure.
     */
    RatchetReact.prototype.parent = function () {
        if (this.parentElem === null)
            throw this;
        return this.parentElem;
    };
    /**
     * Sets a property on the HTML element.
     * @param property Property to set.
     * @param value Value to set the property to.
     * @returns This element.
     */
    RatchetReact.prototype.set = function (property, value) {
        this.htmlElem[property] = value;
        return this;
    };
    /**
     * Gets a property from the HTML element.
     * @param property Property to get.
     * @returns Value of the property.
     */
    RatchetReact.prototype.get = function (property) {
        return this.htmlElem[property];
    };
    /**
     * Sets the inner HTML of this element.
     * @param text Text to set.
     * @returns This element.
     */
    RatchetReact.prototype.text = function (text) {
        this.htmlElem.innerHTML = text;
        return this;
    };
    /**
     * Sets the reference to this element.
     * @param ref Reference to set.
     * @returns This element.
     */
    RatchetReact.prototype.ref = function (ref) {
        ref.elem = this;
        return this;
    };
    /**
     * Removes a child element by index.
     * @param idx Index of child to remove.
     * @returns This element.
     */
    RatchetReact.prototype.removeChild = function (idx) {
        var toRemove = this.children[idx];
        this.children.splice(idx, 1);
        this.htmlElem.removeChild(toRemove.htmlElem);
        return this;
    };
    /**
     * Removes all child elements.
     * @returns This element.
     */
    RatchetReact.prototype.removeChildren = function () {
        while (this.htmlElem.lastChild) {
            this.htmlElem.removeChild(this.htmlElem.lastChild);
        }
        this.children = [];
        return this;
    };
    /**
     * Gets a child element by index.
     * @param idx Index of child.
     * @returns Child element.
     */
    RatchetReact.prototype.getChild = function (idx) {
        return this.children[idx];
    };
    /**
     * Gets the underlying HTML element.
     * @returns HTML element.
     */
    RatchetReact.prototype.elem = function () {
        return this.htmlElem;
    };
    return RatchetReact;
}());
var RatchetRef = /** @class */ (function () {
    function RatchetRef() {
        this.elem = null;
    }
    RatchetRef.Use = function (tagName) {
        return new RatchetRef();
    };
    return RatchetRef;
}());
;
/// <reference path = "ratchetReact.ts" />
var Vanguards = [
    "Captain America",
    "Doctor Strange",
    "Emma Frost",
    "Groot",
    "Hulk",
    "Magneto",
    "Peni Parker",
    "The Thing",
    "Thor",
    "Venom"
];
var Duelists = [
    "Black Panther",
    "Black Widow",
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
    "Invisible Woman",
    "Jeff the Land Shark",
    "Loki",
    "Luna Snow",
    "Mantis",
    "Rocket Raccoon",
    "Ultron",
];
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
};
var gHandlers = {
    disableHeroes: (function () { }),
};
window.onload = function () {
    gData.selectedDuelists[""];
    var main = document.getElementById("main");
    if (!main)
        return;
    main.appendChild(TeamSettings().elem());
    main.appendChild(RandomizeSection().elem());
    main.appendChild(HeroSettings().elem());
};
function TeamSettings() {
    var partySize = RatchetRef.Use("input");
    var minVanguard = RatchetRef.Use("input");
    var maxVanguard = RatchetRef.Use("input");
    var minDuelist = RatchetRef.Use("input");
    var maxDuelist = RatchetRef.Use("input");
    var minStrategist = RatchetRef.Use("input");
    var maxStrategist = RatchetRef.Use("input");
    var partySizeErr = RatchetRef.Use("small");
    var updateDefaultPartySize = function () {
        if (!partySize.elem)
            return;
        partySize.elem.set("placeholder", getDefaultTeamSize().toString());
    };
    var validatePartySize = function () {
        var _a, _b, _c, _d;
        if (!partySize.elem)
            return;
        gData.teamSize = partySize.elem.get("valueAsNumber");
        if (gData.teamSize < 1) {
            partySize.elem.set("ariaInvalid", "true");
            (_a = partySizeErr.elem) === null || _a === void 0 ? void 0 : _a.text("Party size must be at least 1");
        }
        else if (gData.teamSize < getMinTeamSize()) {
            partySize.elem.set("ariaInvalid", "true");
            (_b = partySizeErr.elem) === null || _b === void 0 ? void 0 : _b.text("The math ain't mathing. The party size must be at least " + getMinTeamSize());
        }
        else if (getMaxTeamSize() && gData.teamSize > getMaxTeamSize()) {
            partySize.elem.set("ariaInvalid", "true");
            (_c = partySizeErr.elem) === null || _c === void 0 ? void 0 : _c.text("The math ain't mathing. The party size must be at most " + getMaxTeamSize());
        }
        else {
            partySize.elem.set("ariaInvalid", "");
            (_d = partySizeErr.elem) === null || _d === void 0 ? void 0 : _d.text("");
        }
    };
    var validateMinMax = function (minRef, maxRef) {
        if (!minRef.elem || !maxRef.elem)
            return;
        if (minRef === minVanguard) {
            gData.minVanguard = minRef.elem.get("valueAsNumber");
            gData.maxVanguard = maxRef.elem.get("valueAsNumber");
        }
        else if (minRef === minDuelist) {
            gData.minDuelist = minRef.elem.get("valueAsNumber");
            gData.maxDuelist = maxRef.elem.get("valueAsNumber");
        }
        else {
            gData.minStrategist = minRef.elem.get("valueAsNumber");
            gData.maxStrategist = maxRef.elem.get("valueAsNumber");
        }
        if (minRef.elem.get("valueAsNumber") > maxRef.elem.get("valueAsNumber")) {
            minRef.elem.set("ariaInvalid", "true");
            maxRef.elem.set("ariaInvalid", "true");
        }
        else {
            minRef.elem.set("ariaInvalid", "");
            maxRef.elem.set("ariaInvalid", "");
        }
        updateDefaultPartySize();
    };
    return (RatchetReact.New("article")
        .child("header", "style", "text-align: center;")
        .child("h3").text("Team")
        .parent()
        .parent()
        .child("label").text("Party Size")
        .child("input", "type", "number", "placeholder", "1").ref(partySize).set("oninput", validatePartySize)
        .parent()
        .child("small").ref(partySizeErr)
        .parent()
        .parent()
        .child("div", "class", "grid")
        .child("label").text("Vanguard")
        .child("div", "role", "group")
        .child("input", "type", "number", "placeholder", "Min").ref(minVanguard).set("oninput", function () { return validateMinMax(minVanguard, maxVanguard); })
        .parent()
        .child("input", "type", "number", "placeholder", "Max").ref(maxVanguard).set("oninput", function () { return validateMinMax(minVanguard, maxVanguard); })
        .parent()
        .parent()
        .parent()
        .child("label").text("Duelist")
        .child("div", "role", "group")
        .child("input", "type", "number", "placeholder", "Min").ref(minDuelist).set("oninput", function () { return validateMinMax(minDuelist, maxDuelist); })
        .parent()
        .child("input", "type", "number", "placeholder", "Max").ref(maxDuelist).set("oninput", function () { return validateMinMax(minDuelist, maxDuelist); })
        .parent()
        .parent()
        .parent()
        .child("label").text("Strategist")
        .child("div", "role", "group")
        .child("input", "type", "number", "placeholder", "Min").ref(minStrategist).set("oninput", function () { return validateMinMax(minStrategist, maxStrategist); })
        .parent()
        .child("input", "type", "number", "placeholder", "Max").ref(maxStrategist).set("oninput", function () { return validateMinMax(minStrategist, maxStrategist); })
        .parent()
        .parent()
        .parent()
        .parent());
}
function HeroSettings() {
    var _a, _b, _c;
    var disableVanguard = RatchetRef.Use("input");
    var enableVanguard = RatchetRef.Use("input");
    var disableDuelist = RatchetRef.Use("input");
    var enableDuelist = RatchetRef.Use("input");
    var disableStrategist = RatchetRef.Use("input");
    var enableStrategist = RatchetRef.Use("input");
    var vanguardList = RatchetRef.Use("fieldset");
    var duelistList = RatchetRef.Use("fieldset");
    var strategistList = RatchetRef.Use("fieldset");
    var onEnableAll = function (list, enable) {
        if (!list.elem)
            return;
        for (var i = 0; i < list.elem.elem().childElementCount; ++i) {
            var checkbox = list.elem.getChild(i).getChild(0);
            checkbox.set("checked", enable);
            checkbox.elem().onchange(new Event(""));
        }
    };
    gHandlers.disableHeroes = function (list) {
        var fieldset;
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var hero = list_1[_i];
            if (Vanguards.includes(hero)) {
                fieldset = vanguardList;
            }
            else if (Duelists.includes(hero)) {
                fieldset = duelistList;
            }
            else {
                fieldset = strategistList;
            }
            if (!fieldset.elem)
                continue;
            for (var i = 0; i < fieldset.elem.elem().childElementCount; ++i) {
                var checkbox = fieldset.elem.getChild(i).getChild(0);
                if (checkbox.get("id") === hero) {
                    checkbox.set("checked", false);
                    checkbox.elem().onchange(new Event(""));
                    continue;
                }
            }
        }
    };
    var article = (RatchetReact.New("article")
        .child("header", "style", "text-align: center;")
        .child("h3").text("Heroes")
        .parent()
        .parent()
        .child("div", "class", "grid")
        .child("div")
        .child("div", "role", "group")
        .child("input", "type", "submit", "value", "Disable All").ref(disableVanguard).set("onclick", function () { return onEnableAll(vanguardList, false); })
        .parent()
        .child("input", "type", "submit", "value", "Enable All").ref(enableVanguard).set("onclick", function () { return onEnableAll(vanguardList, true); })
        .parent()
        .parent()
        .child("fieldset").ref(vanguardList)
        .parent()
        .parent()
        .child("div")
        .child("div", "role", "group")
        .child("input", "type", "submit", "value", "Disable All").ref(disableDuelist).set("onclick", function () { return onEnableAll(duelistList, false); })
        .parent()
        .child("input", "type", "submit", "value", "Enable All").ref(enableDuelist).set("onclick", function () { return onEnableAll(duelistList, true); })
        .parent()
        .parent()
        .child("fieldset").ref(duelistList)
        .parent()
        .parent()
        .child("div")
        .child("div", "role", "group")
        .child("input", "type", "submit", "value", "Disable All").ref(disableStrategist).set("onclick", function () { return onEnableAll(strategistList, false); })
        .parent()
        .child("input", "type", "submit", "value", "Enable All").ref(enableStrategist).set("onclick", function () { return onEnableAll(strategistList, true); })
        .parent()
        .parent()
        .child("fieldset").ref(strategistList)
        .parent()
        .parent()
        .parent());
    for (var _i = 0, Vanguards_1 = Vanguards; _i < Vanguards_1.length; _i++) {
        var vanguard = Vanguards_1[_i];
        (_a = vanguardList.elem) === null || _a === void 0 ? void 0 : _a.append(HeroEntry(vanguard, gData.selectedVanguards));
    }
    for (var _d = 0, Duelists_1 = Duelists; _d < Duelists_1.length; _d++) {
        var duelist = Duelists_1[_d];
        (_b = duelistList.elem) === null || _b === void 0 ? void 0 : _b.append(HeroEntry(duelist, gData.selectedDuelists));
    }
    for (var _e = 0, Strategists_1 = Strategists; _e < Strategists_1.length; _e++) {
        var strategist = Strategists_1[_e];
        (_c = strategistList.elem) === null || _c === void 0 ? void 0 : _c.append(HeroEntry(strategist, gData.selectedStrategists));
    }
    return article;
}
function HeroEntry(hero, heroList) {
    var checkbox = RatchetRef.Use("input");
    var onChange = function () {
        if (!checkbox.elem)
            return;
        heroList[hero] = checkbox.elem.get("checked");
    };
    var label = (RatchetReact.New("label")
        .child("input", "type", "checkbox", "checked", "", "id", hero).ref(checkbox).set("onchange", onChange)
        .parent());
    label.elem().insertAdjacentText("beforeend", hero);
    onChange();
    return label;
}
function RandomizeSection() {
    var results = RatchetRef.Use("div");
    var disableHeroes = RatchetRef.Use("input");
    var res = [];
    var onRandomize = function () {
        var _a;
        if (!results.elem)
            return;
        res = randomize();
        if (res.length > 0)
            (_a = disableHeroes.elem) === null || _a === void 0 ? void 0 : _a.set("hidden", false);
        results.elem.elem().setAttribute("style", "min-height: " + results.elem.get("offsetHeight") + "px;");
        results.elem.removeChildren();
        var cnt = 0;
        var row = results.elem.child("div", "class", "grid");
        for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
            var hero = res_1[_i];
            row.child("div", "style", "text-align: center;")
                .child("img", "src", "img/" + hero + ".png").set("onload", function () { var _a; return (_a = results.elem) === null || _a === void 0 ? void 0 : _a.elem().setAttribute("style", ""); })
                .parent()
                .child("h5").text(hero)
                .parent();
            ++cnt;
            if (cnt % 6 === 0) {
                row = results.elem.child("div", "class", "grid");
            }
        }
    };
    var onDisableHeroes = function () {
        var _a;
        gHandlers.disableHeroes(res);
        (_a = disableHeroes.elem) === null || _a === void 0 ? void 0 : _a.set("hidden", true);
    };
    return (RatchetReact.New("article")
        .child("header", "style", "text-align: center;")
        .child("h3").text("Results")
        .parent()
        .parent()
        .child("input", "type", "submit", "value", "Randomize").set("onclick", onRandomize)
        .parent()
        .child("div").ref(results)
        .parent()
        .child("input", "type", "submit", "value", "Disable These Heroes", "class", "secondary", "hidden", "").ref(disableHeroes).set("onclick", onDisableHeroes)
        .parent());
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
        return null;
    if (!Number.isNaN(gData.maxDuelist)) {
        teamSize += gData.maxDuelist;
    }
    else
        return null;
    if (!Number.isNaN(gData.maxStrategist)) {
        teamSize += gData.maxStrategist;
    }
    else
        return null;
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
    var _a;
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
    for (var _i = 0, _b = Object.entries(gData.selectedVanguards); _i < _b.length; _i++) {
        var _c = _b[_i], hero = _c[0], enabled = _c[1];
        if (enabled)
            vanguards.push(hero);
    }
    for (var _d = 0, _e = Object.entries(gData.selectedDuelists); _d < _e.length; _d++) {
        var _f = _e[_d], hero = _f[0], enabled = _f[1];
        if (enabled)
            duelists.push(hero);
    }
    for (var _g = 0, _h = Object.entries(gData.selectedStrategists); _g < _h.length; _g++) {
        var _j = _h[_g], hero = _j[0], enabled = _j[1];
        if (enabled)
            strategists.push(hero);
    }
    // Get the minimum amount of each role
    for (var i = 0; i < minVanguard; ++i) {
        var rand = Math.floor(Math.random() * vanguards.length);
        results.push(vanguards[rand]);
        vanguards.splice(rand, 1);
        ++vanguardCnt;
    }
    for (var i = 0; i < minDuelist; ++i) {
        var rand = Math.floor(Math.random() * duelists.length);
        results.push(duelists[rand]);
        duelists.splice(rand, 1);
        ++duelistCnt;
    }
    for (var i = 0; i < minStrategist; ++i) {
        var rand = Math.floor(Math.random() * strategists.length);
        results.push(strategists[rand]);
        strategists.splice(rand, 1);
        ++strategistCnt;
    }
    // Build array of all allowed heroes
    for (var _k = 0, vanguards_1 = vanguards; _k < vanguards_1.length; _k++) {
        var hero = vanguards_1[_k];
        all.push(hero);
    }
    for (var _l = 0, duelists_1 = duelists; _l < duelists_1.length; _l++) {
        var hero = duelists_1[_l];
        all.push(hero);
    }
    for (var _m = 0, strategists_1 = strategists; _m < strategists_1.length; _m++) {
        var hero = strategists_1[_m];
        all.push(hero);
    }
    // Remove roles from the list of allowed heroes if we hit their max
    var removeMaxedRole = function (cnt, max, roleHeroes) {
        if (cnt === max) {
            for (var i = all.length - 1; i >= 0; --i) {
                if (roleHeroes.includes(all[i])) {
                    all.splice(i, 1);
                }
            }
        }
    };
    removeMaxedRole(vanguardCnt, maxVanguard, Vanguards.slice());
    removeMaxedRole(duelistCnt, maxDuelist, Duelists.slice());
    removeMaxedRole(strategistCnt, maxStrategist, Strategists.slice());
    // Get the rest of the results
    while (results.length < teamSize && all.length > 0) {
        var rand = Math.floor(Math.random() * all.length);
        var hero = all[rand];
        results.push(hero);
        all.splice(rand, 1);
        if (Vanguards.includes(hero)) {
            ++vanguardCnt;
            removeMaxedRole(vanguardCnt, maxVanguard, Vanguards.slice());
        }
        else if (Duelists.includes(hero)) {
            ++duelistCnt;
            removeMaxedRole(duelistCnt, maxDuelist, Duelists.slice());
        }
        else {
            ++strategistCnt;
            removeMaxedRole(strategistCnt, maxStrategist, Strategists.slice());
        }
    }
    // Randomize the order of the output to make it look more random
    for (var i = 0; i < results.length; ++i) {
        var rand = Math.floor(Math.random() * results.length);
        _a = [results[rand], results[i]], results[i] = _a[0], results[rand] = _a[1];
    }
    return results;
}
