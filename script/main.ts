
/// <reference path = "ratchetReact.ts" />
/// <reference path = "defs.ts" />

const gData = {
	teamSize: NaN,
	minVanguard: NaN,
	maxVanguard: NaN,
	minDuelist: NaN,
	maxDuelist: NaN,
	minStrategist: NaN,
	maxStrategist: NaN,

	selectedVanguards: {} as {[key: string]: boolean},
	selectedDuelists: {} as {[key: string]: boolean},
	selectedStrategists: {} as {[key: string]: boolean},

	disablePrevHeroes: false,
	allowDuplicates: false,
	prioritizeTeamups: 0,
};

const gHandlers = {
	disableHeroes: (() => {}) as (list: Hero[]) => void,
	runSim: runSimulation,
};

RatchetReact.Root = (
	RatchetReact.New("main").set("className", "container").open()
		.add("h1").set("textContent", "Marvel Rivals Randomizer").setRaw("style", "text-align: center;")
		.addRef(TeamSettings())
		.addRef(RandomizeSection())
		.addRef(HeroSettings())
		.addRef(MiscSettings())
	.close()
);

function TeamSettings(): RatchetReact<HTMLElement> {
	const partySizeRef = RatchetReact.New("input");
	const minVanguardRef = RatchetReact.New("input");
	const maxVanguardRef = RatchetReact.New("input");
	const minDuelistRef = RatchetReact.New("input");
	const maxDuelistRef = RatchetReact.New("input");
	const minStrategistRef = RatchetReact.New("input");
	const maxStrategistRef = RatchetReact.New("input");
	const partySizeErrRef = RatchetReact.New("small");

	const updateDefaultPartySize = () => {
		partySizeRef.set("placeholder", getDefaultTeamSize().toString());
	}

	const validatePartySize = () => {
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

	const validateMinMax = (minRef: RatchetReact<HTMLInputElement>, maxRef: RatchetReact<HTMLInputElement>) => {
		if (!minRef.elem || !maxRef.elem) return;

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
	}

	return (
		RatchetReact.New("article").open()
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
						.addRef(minVanguardRef).set("type", "number").set("placeholder", "Min").set("oninput", () => validateMinMax(minVanguardRef, maxVanguardRef))
						.addRef(maxVanguardRef).set("type", "number").set("placeholder", "Max").set("oninput", () => validateMinMax(minVanguardRef, maxVanguardRef))
					.close()
				.close()
				.add("label").set("textContent", "Duelist").open()
					.add("div").set("role", "group").open()
						.addRef(minDuelistRef).set("type", "number").set("placeholder", "Min").set("oninput", () => validateMinMax(minDuelistRef, maxDuelistRef))
						.addRef(maxDuelistRef).set("type", "number").set("placeholder", "Max").set("oninput", () => validateMinMax(minDuelistRef, maxDuelistRef))
					.close()
				.close()
				.add("label").set("textContent", "Strategist").open()
					.add("div").set("role", "group").open()
						.addRef(minStrategistRef).set("type", "number").set("placeholder", "Min").set("oninput", () => validateMinMax(minStrategistRef, maxStrategistRef))
						.addRef(maxStrategistRef).set("type", "number").set("placeholder", "Max").set("oninput", () => validateMinMax(minStrategistRef, maxStrategistRef))
					.close()
				.close()
			.close()
		.close()
	);
}

function HeroSettings(): RatchetReact<HTMLElement> {
	const disableVanguardRef = RatchetReact.New("input");
	const enableVanguardRef = RatchetReact.New("input");
	const disableDuelistRef = RatchetReact.New("input");
	const enableDuelistRef = RatchetReact.New("input");
	const disableStrategistRef = RatchetReact.New("input");
	const enableStrategistRef = RatchetReact.New("input");
	const vanguardListRef = RatchetReact.New("fieldset");
	const duelistListRef = RatchetReact.New("fieldset");
	const strategistListRef = RatchetReact.New("fieldset");

	const onEnableAll = (list: RatchetReact<HTMLFieldSetElement>, enable: boolean) => {
		for (const child of Array.from(list.get("children"))) {
			const checkbox = child.firstChild as HTMLInputElement;
			checkbox.checked = enable;
			if (checkbox.onchange) checkbox.onchange(new Event(""));
		}
	}

	gHandlers.disableHeroes = (list: Hero[]) => {
		let fieldset: RatchetReact<HTMLFieldSetElement>;
		for (const hero of list) {
			if (isVanguard(hero)) {
				fieldset = vanguardListRef;
			}
			else if (isDuelist(hero)) {
				fieldset = duelistListRef;
			}
			else {
				fieldset = strategistListRef;
			}

			for (const child of Array.from(fieldset.get("children"))) {
				const checkbox = child.firstChild as HTMLInputElement;
				if (checkbox.id === hero) {
					checkbox.checked = false;
					if (checkbox.onchange) checkbox.onchange(new Event(""));
					break;
				}
			}
		}
	}

	vanguardListRef.open();
	for (const vanguard of Vanguards) {
		vanguardListRef.addRef(HeroEntry(vanguard, gData.selectedVanguards));
	}
	vanguardListRef.close();

	duelistListRef.open();
	for (const duelist of Duelists) {
		duelistListRef.addRef(HeroEntry(duelist, gData.selectedDuelists));
	}
	duelistListRef.close();

	strategistListRef.open()
	for (const strategist of Strategists) {
		strategistListRef.addRef(HeroEntry(strategist, gData.selectedStrategists));
	}
	strategistListRef.close();

	return (
		RatchetReact.New("article").open()
			.add("header").setRaw("style", "text-align: center;").open()
				.add("h3").set("textContent", "Heroes")
			.close()
			.add("div").set("className", "grid").open()
				.add("div").setRaw("style", "text-align: center;").open()
					.add("img").set("src", "img/Vanguard.png").setRaw("style", "padding-bottom: 20px")
					.add("div").set("role", "group").open()
						.addRef(disableVanguardRef).set("type", "submit").set("value", "Disable All").set("onclick", () => onEnableAll(vanguardListRef, false))
						.addRef(enableVanguardRef).set("type", "submit").set("value", "Enable All").set("onclick", () => onEnableAll(vanguardListRef, true))
					.close()
					.addRef(vanguardListRef)
				.close()
				.add("div").setRaw("style", "text-align: center;").open()
					.add("img").set("src", "img/Duelist.png").setRaw("style", "padding-bottom: 20px")
					.add("div").set("role", "group").open()
						.addRef(disableDuelistRef).set("type", "submit").set("value", "Disable All").set("onclick", () => onEnableAll(duelistListRef, false))
						.addRef(enableDuelistRef).set("type", "submit").set("value", "Enable All").set("onclick", () => onEnableAll(duelistListRef, true))
					.close()
					.addRef(duelistListRef)
				.close()
				.add("div").setRaw("style", "text-align: center;").open()
					.add("img").set("src", "img/Strategist.png").setRaw("style", "padding-bottom: 20px")
					.add("div").set("role", "group").open()
						.addRef(disableStrategistRef).set("type", "submit").set("value", "Disable All").set("onclick", () => onEnableAll(strategistListRef, false))
						.addRef(enableStrategistRef).set("type", "submit").set("value", "Enable All").set("onclick", () => onEnableAll(strategistListRef, true))
					.close()
					.addRef(strategistListRef)
				.close()
			.close()
		.close()
	);
}

function HeroEntry(hero: Hero, heroList: {[key: string]: boolean}): RatchetReact<HTMLElement> {
	const checkbox = RatchetReact.New("input");
	heroList[hero] = true;

	return (
		RatchetReact.New("label").open()
			.addRef(checkbox).set("type", "checkbox").set("checked", true).set("id", hero).set("onchange", () => heroList[hero] = checkbox.get("checked"))
			.addRaw(hero)
		.close()
	);
}

function MiscSettings(): RatchetReact<HTMLElement> {
	const disablePrevHeroRef = RatchetReact.New("input");
	const allowDuplicatesRef = RatchetReact.New("input");
	const prioritizeTeamupsRef = RatchetReact.New("input");
	const prioritizeTeamupsVal = RatchetReact.New("input");

	const updateSlider = () => {
		gData.prioritizeTeamups = prioritizeTeamupsRef.get("valueAsNumber");
		prioritizeTeamupsVal.set("value", gData.prioritizeTeamups.toString());
	};

	const updateVal = () => {
		gData.prioritizeTeamups = Number.parseInt(prioritizeTeamupsVal.get("value"));
		prioritizeTeamupsRef.set("value", gData.prioritizeTeamups.toString());
	};

	return (
		RatchetReact.New("article").open()
			.add("header").setRaw("style", "text-align: center;").open()
				.add("h3").set("textContent", "Misc Settings")
			.close()
			.add("div").set("className", "grid").open()
				.add("fieldset").open()
					.add("label").open()
						.addRef(disablePrevHeroRef).set("type", "checkbox").set("onchange", () => gData.disablePrevHeroes = disablePrevHeroRef.get("checked"))
						.add("span").set("textContent", "Disable Previous Heroes").setRaw("data-tooltip", "Disables heroes as they get rolled.")
					.close()
					.add("label").open()
						.addRef(allowDuplicatesRef).set("type", "checkbox").set("onchange", () => gData.allowDuplicates = allowDuplicatesRef.get("checked"))
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
		.close()
	);
}

function RandomizeSection(): RatchetReact<HTMLElement> {
	const resultsRef = RatchetReact.New("div");
	let res: Hero[] = [];

	const onRandomize = () => {
		res = randomize();
		if (gData.disablePrevHeroes) {
			gHandlers.disableHeroes(res);
		}

		resultsRef.setRaw("style", "min-height: " + resultsRef.get("offsetHeight") + "px;");
		resultsRef.elem().replaceChildren();

		resultsRef.open();
		let row: RatchetReact<HTMLDivElement> | null = null;
		let cnt = 0;
		for (const hero of res) {
			if (cnt % 6 === 0 || row === null) {
				row = resultsRef.add("div").set("className", "grid")
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
		const teamupAnchors = [] as boolean[];
		const teamupMembers = [] as boolean[];
		for (const hero of res) {
			for (let i = 0; i < Teamups.length; ++i) {
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
		for (let i = 0; i < Teamups.length; ++i) {
			if (teamupAnchors[i] === true && teamupMembers[i] === true) {
				const fontSize = Teamups[i].name.length > 26 ? "17" : "21";
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
		let padding = (row.get("offsetWidth") - (cnt * 280)) / 2 - 81;
		if (padding < 0 || isNaN(padding)) padding = 0;
		row.get("style").gridTemplateColumns = padding.toString() + "px " + row.get("style").gridTemplateColumns;
	};

	return (
		RatchetReact.New("article").open()
			.add("header").setRaw("style", "text-align: center;").open()
				.add("h3").set("textContent", "Results")
			.close()
			.add("input").set("type", "submit").set("value", "Randomize").set("onclick", onRandomize)
			.addRef(resultsRef)
		.close()
	);
}

function shuffle<T>(array: T[]): T[] {
	const result = [...array];
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
}

function getMinTeamSize(): number {
	let teamSize = 0;
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

function getMaxTeamSize(): number {
	let teamSize = 0;
	if (!Number.isNaN(gData.maxVanguard)) {
		teamSize += gData.maxVanguard;
	}
	else return 1000;
	if (!Number.isNaN(gData.maxDuelist)) {
		teamSize += gData.maxDuelist;
	}
	else return 1000;
	if (!Number.isNaN(gData.maxStrategist)) {
		teamSize += gData.maxStrategist;
	}
	else return 1000;
	return teamSize;
}

function getDefaultTeamSize(): number {
	let teamSize = 0;
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

function randomize(): Hero[] {
	const teamSize = Number.isNaN(gData.teamSize) ? getDefaultTeamSize() : gData.teamSize;

	const minVanguard = Number.isNaN(gData.minVanguard) ? 0 : gData.minVanguard;
	const minDuelist = Number.isNaN(gData.minDuelist) ? 0 : gData.minDuelist;
	const minStrategist = Number.isNaN(gData.minStrategist) ? 0 : gData.minStrategist;

	const maxVanguard = Number.isNaN(gData.maxVanguard) ? 1000 : gData.maxVanguard;
	const maxDuelist = Number.isNaN(gData.maxDuelist) ? 1000 : gData.maxDuelist;
	const maxStrategist = Number.isNaN(gData.maxStrategist) ? 1000 : gData.maxStrategist;

	let vanguardCnt = 0;
	let duelistCnt = 0;
	let strategistCnt = 0;

	const vanguards = [] as Vanguard[];
	const duelists = [] as Duelist[];
	const strategists = [] as Strategist[];

	const all = [] as Hero[];
	const results = [] as Hero[];

	// Build lists of allowed heroes of each role
	for (const [hero, enabled] of Object.entries(gData.selectedVanguards)) {
		if (enabled) {
			vanguards.push(hero as Vanguard);
			all.push(hero as Hero);
		}
	}
	for (const [hero, enabled] of Object.entries(gData.selectedDuelists)) {
		if (enabled) {
			duelists.push(hero as Duelist);
			all.push(hero as Hero);
		}
	}
	for (const [hero, enabled] of Object.entries(gData.selectedStrategists)) {
		if (enabled) {
			strategists.push(hero as Strategist);
			all.push(hero as Hero);
		}
	}

	// Checks if a given hero can be selected
	const isHeroAllowed = (hero: Hero, strict: boolean) => {
		if (!all.includes(hero)) return false;
		if (results.length == teamSize) return false;

		if (isVanguard(hero)) {
			if (strict) return vanguardCnt < minVanguard;
			return vanguardCnt < maxVanguard;
		}
		if (isDuelist(hero)) {
			if (strict) return duelistCnt < minDuelist;
			return duelistCnt < maxDuelist;
		}
		if (isStrategist(hero)) {
			if (strict) return strategistCnt < minStrategist;
			return strategistCnt < maxStrategist;
		}
		return false;
	}

	// Removes all heroes of a given role from the heroes that can be selected if max is reached
	const removeMaxedRole = (cnt: number, max: number, roleHeroes: string[]) => {
		if (cnt === max) {
			for (let i = all.length - 1; i >= 0; --i) {
				if (roleHeroes.includes(all[i])) {
					all.splice(i, 1);
				}
			}
		}
	};

	// Adds a hero to the results
	const addHero = (hero: Hero) => {
		results.push(hero);

		if (!gData.allowDuplicates && (hero == "Deadpool (Vanguard)" || hero == "Deadpool (Duelist)" || hero == "Deadpool (Strategist)")) {
			let deadpoolPos = all.findIndex((val) => val == "Deadpool (Vanguard)");
			if (deadpoolPos != -1) all.splice(deadpoolPos, 1);
			deadpoolPos = all.findIndex((val) => val == "Deadpool (Duelist)");
			if (deadpoolPos != -1) all.splice(deadpoolPos, 1);
			deadpoolPos = all.findIndex((val) => val == "Deadpool (Strategist)");
			if (deadpoolPos != -1) all.splice(deadpoolPos, 1);

			deadpoolPos = vanguards.findIndex((val) => val == "Deadpool (Vanguard)");
			if (deadpoolPos != -1) vanguards.splice(deadpoolPos, 1);
			deadpoolPos = duelists.findIndex((val) => val == "Deadpool (Duelist)");
			if (deadpoolPos != -1) duelists.splice(deadpoolPos, 1);
			deadpoolPos = strategists.findIndex((val) => val == "Deadpool (Strategist)");
			if (deadpoolPos != -1) strategists.splice(deadpoolPos, 1);
		}
		else if (!gData.allowDuplicates) {
			all.splice(all.findIndex((val) => val == hero), 1);
		}

		if (isVanguard(hero)) {
			if (!gData.allowDuplicates) {
				vanguards.splice(vanguards.findIndex((val) => val == hero), 1);
			}
			++vanguardCnt;
			removeMaxedRole(vanguardCnt, maxVanguard, Vanguards.slice());
		}
		else if (isDuelist(hero)) {
			if (!gData.allowDuplicates) {
				duelists.splice(duelists.findIndex((val) => val == hero), 1);
			}
			++duelistCnt;
			removeMaxedRole(duelistCnt, maxDuelist, Duelists.slice());
		}
		else {
			if (!gData.allowDuplicates) {
				strategists.splice(strategists.findIndex((val) => val == hero), 1);
			}
			++strategistCnt;
			removeMaxedRole(strategistCnt, maxStrategist, Strategists.slice());
		}
	}

	// add the heroes that would make a teamup with the given hero if possible
	const addTeamupHeroes = (hero: Hero, strict: boolean) => {
		if (gData.prioritizeTeamups == 0) return;
		const randomizedTeamups = shuffle(Teamups);
		for (const teamup of randomizedTeamups) {
			if (!teamup.members.includes(hero)) continue;

			// try to add anchor first
			const anchor = teamup.members[0];
			if (!results.includes(anchor)) {
				if (!isHeroAllowed(anchor, strict)) continue;
				if (Math.floor(Math.random() * 100) >= gData.prioritizeTeamups) continue;
				addHero(anchor);
				addTeamupHeroes(anchor, strict);
			}

			// try adding rest of teamup
			for (const teamupHero of shuffle(teamup.members)) {
				if (teamupHero == hero || !isHeroAllowed(teamupHero, strict)) continue;
				if (Math.floor(Math.random() * 100) >= gData.prioritizeTeamups) continue;
				addHero(teamupHero);
				addTeamupHeroes(teamupHero, strict);
			}
		}
	}

	const addMinOfRole = (role: "Vanguard" | "Duelist" | "Strategist") => {
		while (true) {
			let hero: Hero;
			if (role === "Vanguard") {
				if (vanguards.length === 0) break;
				if (vanguardCnt >= minVanguard) break;
				hero = vanguards[Math.floor(Math.random() * vanguards.length)];
			}
			else if (role === "Duelist") {
				if (duelists.length === 0) break;
				if (duelistCnt >= minDuelist) break;
				hero = duelists[Math.floor(Math.random() * duelists.length)];
			}
			else {
				if (strategists.length === 0) break;
				if (strategistCnt >= minStrategist) break;
				hero = strategists[Math.floor(Math.random() * strategists.length)];
			}

			addHero(hero);
			addTeamupHeroes(hero, true);
		}
	}

	// Get the minimum amount of each role
	// We need to randomize the order of this, otherwise deadpool would be most likely to show up on the first role we check
	const getMinOfRoles = shuffle([
		() => { addMinOfRole("Vanguard") },
		() => { addMinOfRole("Duelist") },
		() => { addMinOfRole("Strategist") },
	]);

	for (let i = 0; i < 3; ++i) {
		getMinOfRoles[i]();
	}

	// Get teamups after getting minimums
	for (const hero of results) {
		addTeamupHeroes(hero, false);
	}

	// Get the rest of the results
	while (results.length < teamSize && all.length > 0) {
		const rand = Math.floor(Math.random() * all.length);
		const hero = all[rand];
		addHero(hero);
		addTeamupHeroes(hero, false);
	}

	return shuffle(results);
}

function runSimulation(runs: number = 1000000): void {
	const results: {[key: string]: number} = {};
	for(let i = 0; i < runs; ++i) {
		const randHeroes = randomize();
		for (const res of randHeroes) {
			if (isNaN(results[res])) {
				results[res] = 0;
			}
			results[res] += 1;
		}
	}
	let totCnt = 0;
	const resultsSorted = Object.entries(results).sort((a, b) => b[1] - a[1]);
	for (const [hero, cnt] of resultsSorted) {
		totCnt += cnt;
	}
	const avg = totCnt / resultsSorted.length;
	console.log("Average: " + avg)

	const printHeroResult = (hero: string) => {
		const diff = Math.abs(results[hero] - avg);
		const absDiff = results[hero] >= avg ? "+" + Math.round(diff) : "-" + Math.round(diff);
		const relDiff = results[hero] >= avg ? "+" + (Math.round(diff / avg * 10000) / 100) + "%" : "-" + (Math.round(diff / avg * 10000) / 100) + "%"
		console.log(hero + ": " + results[hero] + " (" + absDiff + " | " + relDiff + ")")
	}

	for (const hero of resultsSorted) {
		printHeroResult(hero[0]);
	}
}