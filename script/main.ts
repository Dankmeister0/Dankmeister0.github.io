
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

	allowDuplicates: false,
	prioritizeTeamups: false,
};

const gHandlers = {
	disableHeroes: (() => {}) as (list: Array<Vanguard | Duelist | Strategist>) => void,
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
				.add("div").open()
					.add("div").set("role", "group").open()
						.addRef(disableVanguardRef).set("type", "submit").set("value", "Disable All").set("onclick", () => onEnableAll(vanguardListRef, false))
						.addRef(enableVanguardRef).set("type", "submit").set("value", "Enable All").set("onclick", () => onEnableAll(vanguardListRef, true))
					.close()
					.addRef(vanguardListRef)
				.close()
				.add("div").open()
					.add("div").set("role", "group").open()
						.addRef(disableDuelistRef).set("type", "submit").set("value", "Disable All").set("onclick", () => onEnableAll(duelistListRef, false))
						.addRef(enableDuelistRef).set("type", "submit").set("value", "Enable All").set("onclick", () => onEnableAll(duelistListRef, true))
					.close()
					.addRef(duelistListRef)
				.close()
				.add("div").open()
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
	const allowDuplicatesRef = RatchetReact.New("input");
	const prioritizeTeamupsRef = RatchetReact.New("input");

	return (
		RatchetReact.New("article").open()
			.add("header").setRaw("style", "text-align: center;").open()
				.add("h3").set("textContent", "Misc Settings")
			.close()
			.add("label").open()
				.addRef(allowDuplicatesRef).set("type", "checkbox").set("onchange", () => gData.allowDuplicates = allowDuplicatesRef.get("checked"))
				.addRaw("Allow Duplicates")
			.close()
			.add("label").open()
				.addRef(prioritizeTeamupsRef).set("type", "checkbox").set("onchange", () => gData.prioritizeTeamups = prioritizeTeamupsRef.get("checked"))
				.addRaw("Increase Odds of Teamups")
			.close()
		.close()
	);
}

function RandomizeSection(): RatchetReact<HTMLElement> {
	const resultsRef = RatchetReact.New("div");
	const disableHeroesRef = RatchetReact.New("input");
	let res: Hero[] = [];

	const onRandomize = () => {
		res = randomize();

		if (res.length > 0) disableHeroesRef.set("hidden", false);
		if (res.length === 1) disableHeroesRef.set("value", "Disable This Hero");
		else disableHeroesRef.set("value", "Disable These Heroes");

		resultsRef.setRaw("style", "min-height: " + resultsRef.get("offsetHeight") + "px;");
		resultsRef.elem().replaceChildren();

		resultsRef.open();
		let row = resultsRef.add("div").set("className", "grid");
		let cnt = 0;
		for (const hero of res) {
			row.open()
				.add("div").setRaw("style", "text-align: center;").open()
					.add("img").set("src", "img/" + hero + ".png").set("onload", () => resultsRef.setRaw("style", ""))
					.add("h5").set("textContent", hero)
				.close()
			.close();

			++cnt;
			if (cnt % 6 === 0) {
				row = resultsRef.add("div").set("className", "grid")
			}
		}
		resultsRef.close();
	};

	const onDisableHeroes = () => {
		gHandlers.disableHeroes(res);
		disableHeroesRef.set("hidden", true);
	}

	return (
		RatchetReact.New("article").open()
			.add("header").setRaw("style", "text-align: center;").open()
				.add("h3").set("textContent", "Results")
			.close()
			.add("input").set("type", "submit").set("value", "Randomize").set("onclick", onRandomize)
			.addRef(resultsRef)
			.addRef(disableHeroesRef).set("type", "submit").set("className", "secondary").set("hidden", true).set("onclick", onDisableHeroes)
		.close()
	);
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
		for (const teamup of Teamups) {
			if (!teamup.members.includes(hero)) continue;
			if (teamup.members[0] != hero && !isHeroAllowed(teamup.members[0], strict)) continue;
			for (const teamupHero of teamup.members) {
				if (teamupHero == hero || !isHeroAllowed(teamupHero, strict)) continue;
				if (Math.random() < 0.25) continue;
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
			if (gData.prioritizeTeamups) {
				addTeamupHeroes(hero, true);
			}
		}
	}

	// Get the minimum amount of each role
	// We need to randomize the order of this, otherwise deadpool would be most likely to show up on the first role we check
	const getMinOfRoles = [
		() => { addMinOfRole("Vanguard") },
		() => { addMinOfRole("Duelist") },
		() => { addMinOfRole("Strategist") },
	];

	const randRoleOrder = Math.floor(Math.random() * 3);
	for (let i = 0; i < 3; ++i) {
		getMinOfRoles[(randRoleOrder + i) % 3]();
	}

	// Remove roles from the list of allowed heroes if we hit their max
	removeMaxedRole(vanguardCnt, maxVanguard, Vanguards.slice());
	removeMaxedRole(duelistCnt, maxDuelist, Duelists.slice());
	removeMaxedRole(strategistCnt, maxStrategist, Strategists.slice());

	// Get the rest of the results
	while (results.length < teamSize && all.length > 0) {
		const rand = Math.floor(Math.random() * all.length);
		const hero = all[rand];
		addHero(hero);
		if (gData.prioritizeTeamups) {
			addTeamupHeroes(hero, false);
		}
	}

	// Randomize the order of the output to make it look more random
	for (let i = 0; i <  results.length; ++i) {
		const rand = Math.floor(Math.random() * results.length);
		[results[i], results[rand]] = [results[rand], results[i]];
	}

	return results;
}