var tanks = new Array();
var dps = new Array();
var supports = new Array();
var rolledHeroes = new Array();
var appendHero = function (parent, arr, id) {
    var input = document.createElement("input");
    input.type = "checkbox";
    input.checked = true;
    input.id = id;
    var label = document.createElement("label");
    label.appendChild(input);
    label.append(id);
    parent.appendChild(label);
    arr.push(input);
};
var getInputVal = function (id) {
    var el = document.getElementById(id);
    if (el !== null && el instanceof HTMLInputElement) {
        return el.valueAsNumber;
    }
    return NaN;
};
var showOutputSection = function (show) {
    var el = document.getElementById("output-section");
    if (el) {
        el.style.visibility = show ? "visible" : "hidden";
    }
};
var showDisableThisButton = function (show) {
    var el = document.getElementById("disable-these-button");
    if (el) {
        el.style.visibility = show ? "visible" : "hidden";
    }
};
var shuffle = function (array) {
    var _a;
    var currentIndex = array.length;
    while (currentIndex != 0) {
        var randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        _a = [array[randomIndex], array[currentIndex]], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
    }
};
var disableRolledHeroes = function () {
    rolledHeroes.forEach(function (element) {
        var el = document.getElementById(element);
        if (el && el instanceof HTMLInputElement) {
            el.checked = false;
        }
    });
    showDisableThisButton(false);
};
var randomize = function () {
    var maxOutput = getInputVal("max-output");
    var minTank = getInputVal("min-tank");
    var maxTank = getInputVal("max-tank");
    var minDps = getInputVal("min-dps");
    var maxDps = getInputVal("max-dps");
    var minSupport = getInputVal("min-support");
    var maxSupport = getInputVal("max-support");
    var isOutputBlank = false;
    if (isNaN(maxOutput) || maxOutput < 0) {
        isOutputBlank = true;
        maxOutput = 0;
    }
    if (isNaN(minTank) || minTank < 0)
        minTank = 0;
    else if (isOutputBlank && (isNaN(maxTank) || maxTank < 0))
        maxOutput += minTank;
    if (isNaN(minDps) || minDps < 0)
        minDps = 0;
    else if (isOutputBlank && (isNaN(maxDps) || maxDps < 0))
        maxOutput += minDps;
    if (isNaN(minSupport) || minSupport < 0)
        minSupport = 0;
    else if (isOutputBlank && (isNaN(maxSupport) || maxSupport < 0))
        maxOutput += minSupport;
    if (isNaN(maxTank) || maxTank < 0)
        maxTank = -1;
    else if (isOutputBlank)
        maxOutput += maxTank;
    if (isNaN(maxDps) || maxDps < 0)
        maxDps = -1;
    else if (isOutputBlank)
        maxOutput += maxDps;
    if (isNaN(maxSupport) || maxSupport < 0)
        maxSupport = -1;
    else if (isOutputBlank)
        maxOutput += maxSupport;
    if (maxOutput === 0)
        maxOutput = 1;
    var output = new Array();
    var tempTanks = new Array();
    var tempDps = new Array();
    var tempSupports = new Array();
    tanks.forEach(function (element) {
        if (element.checked) {
            tempTanks.push(element.id);
        }
    });
    dps.forEach(function (element) {
        if (element.checked) {
            tempDps.push(element.id);
        }
    });
    supports.forEach(function (element) {
        if (element.checked) {
            tempSupports.push(element.id);
        }
    });
    var numTanks = 0;
    for (var i = 0; i < minTank; ++i) {
        if (tempTanks.length === 0 || output.length === maxOutput)
            break;
        var idx = Math.floor(Math.random() * tempTanks.length);
        output.push(tempTanks[idx]);
        tempTanks.splice(idx, 1);
        ++numTanks;
    }
    var numDps = 0;
    for (var i = 0; i < minDps; ++i) {
        if (tempDps.length === 0 || output.length === maxOutput)
            break;
        var idx = Math.floor(Math.random() * tempDps.length);
        output.push(tempDps[idx]);
        tempDps.splice(idx, 1);
        ++numDps;
    }
    var numSupports = 0;
    for (var i = 0; i < minSupport; ++i) {
        if (tempSupports.length === 0 || output.length === maxOutput)
            break;
        var idx = Math.floor(Math.random() * tempSupports.length);
        output.push(tempSupports[idx]);
        tempSupports.splice(idx, 1);
        ++numSupports;
    }
    while (output.length < maxOutput) {
        var tempAll = new Array();
        if (maxTank === -1 || numTanks < maxTank)
            tempAll = tempAll.concat(tempTanks);
        if (maxDps === -1 || numDps < maxDps)
            tempAll = tempAll.concat(tempDps);
        if (maxSupport === -1 || numSupports < maxSupport)
            tempAll = tempAll.concat(tempSupports);
        if (tempAll.length === 0)
            break;
        var idx = Math.floor(Math.random() * tempAll.length);
        output.push(tempAll[idx]);
        for (var i = 0; i < tempTanks.length; ++i) {
            if (tempTanks[i] === tempAll[idx]) {
                tempTanks.splice(i, 1);
                ++numTanks;
                break;
            }
        }
        for (var i = 0; i < tempDps.length; ++i) {
            if (tempDps[i] === tempAll[idx]) {
                tempDps.splice(i, 1);
                ++numDps;
                break;
            }
        }
        for (var i = 0; i < tempSupports.length; ++i) {
            if (tempSupports[i] === tempAll[idx]) {
                tempSupports.splice(i, 1);
                ++numSupports;
                break;
            }
        }
    }
    showOutputSection(true);
    if (output.length > 0)
        showDisableThisButton(true);
    var outputEl = document.getElementById("output");
    if (outputEl === null)
        return;
    while (outputEl.lastChild) {
        outputEl.removeChild(outputEl.lastChild);
    }
    shuffle(output);
    rolledHeroes = output;
    output.forEach(function (element) {
        var name = document.createElement("h5");
        name.textContent = element;
        outputEl.appendChild(name);
    });
};
window.onload = function () {
    var fieldset = document.getElementById("tanklist");
    if (fieldset !== null) {
        appendHero(fieldset, tanks, "Captain America");
        appendHero(fieldset, tanks, "Doctor Strange");
        appendHero(fieldset, tanks, "Groot");
        appendHero(fieldset, tanks, "Hulk");
        appendHero(fieldset, tanks, "Magneto");
        appendHero(fieldset, tanks, "Peni Parker");
        appendHero(fieldset, tanks, "Thor");
        appendHero(fieldset, tanks, "Venom");
    }
    fieldset = document.getElementById("dpslist");
    if (fieldset != null) {
        appendHero(fieldset, dps, "Black panther");
        appendHero(fieldset, dps, "Black Widow");
        appendHero(fieldset, dps, "Hawkeye");
        appendHero(fieldset, dps, "Hela");
        appendHero(fieldset, dps, "Iron Fist");
        appendHero(fieldset, dps, "Iron Man");
        appendHero(fieldset, dps, "Magik");
        appendHero(fieldset, dps, "Mister Fantastic");
        appendHero(fieldset, dps, "Moon Knight");
        appendHero(fieldset, dps, "Namor");
        appendHero(fieldset, dps, "Psylocke");
        appendHero(fieldset, dps, "Scarlet Witch");
        appendHero(fieldset, dps, "Spider-Man");
        appendHero(fieldset, dps, "Squirrel Girl");
        appendHero(fieldset, dps, "Star-Lord");
        appendHero(fieldset, dps, "Storm");
        appendHero(fieldset, dps, "The Punisher");
        appendHero(fieldset, dps, "Winter Soldier");
        appendHero(fieldset, dps, "Wolverine");
    }
    fieldset = document.getElementById("supportlist");
    if (fieldset !== null) {
        appendHero(fieldset, supports, "Adam Warlock");
        appendHero(fieldset, supports, "Cloak & Dagger");
        appendHero(fieldset, supports, "Invisible Woman");
        appendHero(fieldset, supports, "Jeff the Land Shark");
        appendHero(fieldset, supports, "Loki");
        appendHero(fieldset, supports, "Luna Snow");
        appendHero(fieldset, supports, "Mantis");
        appendHero(fieldset, supports, "Rocket Raccoon");
    }
    var button = document.getElementById("enable-tanks");
    if (button !== null) {
        button.onclick = function () { return tanks.forEach(function (element) { return element.checked = true; }); };
    }
    button = document.getElementById("disable-tanks");
    if (button !== null) {
        button.onclick = function () { return tanks.forEach(function (element) { return element.checked = false; }); };
    }
    button = document.getElementById("enable-dps");
    if (button !== null) {
        button.onclick = function () { return dps.forEach(function (element) { return element.checked = true; }); };
    }
    button = document.getElementById("disable-dps");
    if (button !== null) {
        button.onclick = function () { return dps.forEach(function (element) { return element.checked = false; }); };
    }
    button = document.getElementById("enable-supports");
    if (button !== null) {
        button.onclick = function () { return supports.forEach(function (element) { return element.checked = true; }); };
    }
    button = document.getElementById("disable-supports");
    if (button !== null) {
        button.onclick = function () { return supports.forEach(function (element) { return element.checked = false; }); };
    }
    button = document.getElementById("randomize");
    if (button !== null) {
        button.onclick = randomize;
    }
    button = document.getElementById("disable-these-button");
    if (button !== null) {
        button.onclick = disableRolledHeroes;
    }
    showOutputSection(false);
};
