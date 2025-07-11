
/// <reference path = "ratchetReact.ts" />

const Vanguards = [
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
] as const;
type Vanguard = typeof Vanguards[number];

const Duelists = [
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
] as const;
type Duelist = typeof Duelists[number];

const Strategists = [
	"Adam Warlock",
	"Cloak & Dagger",
	"Invisible Woman",
	"Jeff the Land Shark",
	"Loki",
	"Luna Snow",
	"Mantis",
	"Rocket Raccoon",
	"Ultron",
] as const;
type Strategist = typeof Strategists[number];

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
};

const gHandlers = {
	disableHeroes: (() => {}) as (list: Array<Vanguard | Duelist | Strategist>) => void,
};

window.onload = () => {
	gData.selectedDuelists[""]
	const main = document.getElementById("main");
	if (!main) return;

	main.appendChild(TeamSettings().elem());
	main.appendChild(RandomizeSection().elem());
	main.appendChild(HeroSettings().elem());
};

function TeamSettings(): RatchetReact<HTMLElement> {
	const partySize = RatchetRef.Use("input");
	const minVanguard = RatchetRef.Use("input");
	const maxVanguard = RatchetRef.Use("input");
	const minDuelist = RatchetRef.Use("input");
	const maxDuelist = RatchetRef.Use("input");
	const minStrategist = RatchetRef.Use("input");
	const maxStrategist = RatchetRef.Use("input");
	const partySizeErr = RatchetRef.Use("small");

	const updateDefaultPartySize = () => {
		if (!partySize.elem) return;
		partySize.elem.set("placeholder", getDefaultTeamSize().toString());
	}

	const validatePartySize = () => {
		if (!partySize.elem) return;
		gData.teamSize = partySize.elem.get("valueAsNumber");
		if (gData.teamSize < 1) {
			partySize.elem.set("ariaInvalid", "true");
			partySizeErr.elem?.text("Party size must be at least 1");
		}
		else if (gData.teamSize < getMinTeamSize()) {
			partySize.elem.set("ariaInvalid", "true");
			partySizeErr.elem?.text("The math ain't mathing. The party size must be at least " + getMinTeamSize());
		}
		else if (getMaxTeamSize() && gData.teamSize > (getMaxTeamSize() as number)) {
			partySize.elem.set("ariaInvalid", "true");
			partySizeErr.elem?.text("The math ain't mathing. The party size must be at most " + getMaxTeamSize());
		}
		else {
			partySize.elem.set("ariaInvalid", "");
			partySizeErr.elem?.text("");
		}
	};

	const validateMinMax = (minRef: RatchetRef<HTMLInputElement>, maxRef: RatchetRef<HTMLInputElement>) => {
		if (!minRef.elem || !maxRef.elem) return;

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
	}

	return (
		RatchetReact.New("article")
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
						.child("input", "type", "number", "placeholder", "Min").ref(minVanguard).set("oninput", () => validateMinMax(minVanguard, maxVanguard))
					.parent()
						.child("input", "type", "number", "placeholder", "Max").ref(maxVanguard).set("oninput", () => validateMinMax(minVanguard, maxVanguard))
					.parent()
				.parent()
			.parent()
				.child("label").text("Duelist")
					.child("div", "role", "group")
						.child("input", "type", "number", "placeholder", "Min").ref(minDuelist).set("oninput", () => validateMinMax(minDuelist, maxDuelist))
					.parent()
						.child("input", "type", "number", "placeholder", "Max").ref(maxDuelist).set("oninput", () => validateMinMax(minDuelist, maxDuelist))
					.parent()
				.parent()
			.parent()
				.child("label").text("Strategist")
					.child("div", "role", "group")
						.child("input", "type", "number", "placeholder", "Min").ref(minStrategist).set("oninput", () => validateMinMax(minStrategist, maxStrategist))
					.parent()
						.child("input", "type", "number", "placeholder", "Max").ref(maxStrategist).set("oninput", () => validateMinMax(minStrategist, maxStrategist))
					.parent()
				.parent()
			.parent()
		.parent()
	);
}

function HeroSettings(): RatchetReact<HTMLElement> {
	const disableVanguard = RatchetRef.Use("input");
	const enableVanguard = RatchetRef.Use("input");
	const disableDuelist = RatchetRef.Use("input");
	const enableDuelist = RatchetRef.Use("input");
	const disableStrategist = RatchetRef.Use("input");
	const enableStrategist = RatchetRef.Use("input");
	const vanguardList = RatchetRef.Use("fieldset");
	const duelistList = RatchetRef.Use("fieldset");
	const strategistList = RatchetRef.Use("fieldset");

	const onEnableAll = (list: RatchetRef<HTMLFieldSetElement>, enable: boolean) => {
		if (!list.elem) return;
		for (let i = 0; i < list.elem.elem().childElementCount; ++i) {
			const checkbox = list.elem.getChild(i).getChild(0) as RatchetReact<HTMLInputElement>;
			checkbox.set("checked", enable);
			checkbox.elem().onchange!(new Event(""));
		}
	}

	gHandlers.disableHeroes = (list: Array<Vanguard | Duelist | Strategist>) => {
		let fieldset: RatchetRef<HTMLFieldSetElement>;
		for (const hero of list) {
			if (Vanguards.includes(hero as Vanguard)) {
				fieldset = vanguardList;
			}
			else if (Duelists.includes(hero as Duelist)) {
				fieldset = duelistList;
			}
			else {
				fieldset = strategistList;
			}
			if (!fieldset.elem) continue;

			for (let i = 0; i < fieldset.elem.elem().childElementCount; ++i) {
				const checkbox = fieldset.elem.getChild(i).getChild(0) as RatchetReact<HTMLInputElement>;
				if (checkbox.get("id") === hero) {
					checkbox.set("checked", false);
					checkbox.elem().onchange!(new Event(""));
					continue;
				}
			}
		}
	}

	const article = (
		RatchetReact.New("article")
			.child("header", "style", "text-align: center;")
				.child("h3").text("Heroes")
			.parent()
		.parent()
			.child("div", "class", "grid")
				.child("div")
					.child("div", "role", "group")
						.child("input", "type", "submit", "value", "Disable All").ref(disableVanguard).set("onclick", () => onEnableAll(vanguardList, false))
					.parent()
						.child("input", "type", "submit", "value", "Enable All").ref(enableVanguard).set("onclick", () => onEnableAll(vanguardList, true))
					.parent()
				.parent()
					.child("fieldset").ref(vanguardList)
				.parent()
			.parent()
				.child("div")
					.child("div", "role", "group")
						.child("input", "type", "submit", "value", "Disable All").ref(disableDuelist).set("onclick", () => onEnableAll(duelistList, false))
					.parent()
						.child("input", "type", "submit", "value", "Enable All").ref(enableDuelist).set("onclick", () => onEnableAll(duelistList, true))
					.parent()
				.parent()
					.child("fieldset").ref(duelistList)
				.parent()
			.parent()
				.child("div")
					.child("div", "role", "group")
						.child("input", "type", "submit", "value", "Disable All").ref(disableStrategist).set("onclick", () => onEnableAll(strategistList, false))
					.parent()
						.child("input", "type", "submit", "value", "Enable All").ref(enableStrategist).set("onclick", () => onEnableAll(strategistList, true))
					.parent()
				.parent()
					.child("fieldset").ref(strategistList)
				.parent()
			.parent()
		.parent()
	);

	for (const vanguard of Vanguards) {
		vanguardList.elem?.append(HeroEntry(vanguard, gData.selectedVanguards));
	}

	for (const duelist of Duelists) {
		duelistList.elem?.append(HeroEntry(duelist, gData.selectedDuelists));
	}

	for (const strategist of Strategists) {
		strategistList.elem?.append(HeroEntry(strategist, gData.selectedStrategists));
	}

	return article;
}

function HeroEntry(hero: Vanguard | Duelist | Strategist, heroList: {[key: string]: boolean}): RatchetReact<HTMLLabelElement> {
	const checkbox = RatchetRef.Use("input");

	const onChange = () => {
		if (!checkbox.elem) return;
		heroList[hero] = checkbox.elem.get("checked");
	};

	const label: RatchetReact<HTMLLabelElement> = (
		RatchetReact.New("label")
			.child("input", "type", "checkbox", "checked", "", "id", hero).ref(checkbox).set("onchange", onChange)
		.parent()
	);
	label.elem().insertAdjacentText("beforeend", hero);
	onChange();
	return label;
}

function RandomizeSection(): RatchetReact<HTMLElement> {
	const results = RatchetRef.Use("div");
	const disableHeroes = RatchetRef.Use("input");
	let res: Array<Vanguard | Duelist | Strategist> = [];

	const onRandomize = () => {
		if (!results.elem) return;
		res = randomize();
		if (res.length > 0) disableHeroes.elem?.set("hidden", false);
		results.elem.elem().setAttribute("style", "min-height: " + results.elem.get("offsetHeight") + "px;");
		results.elem.removeChildren();

		let cnt = 0;
		let row = results.elem.child("div", "class", "grid");
		for (const hero of res) {
			row.child("div", "style", "text-align: center;")
				.child("img", "src", "img/" + hero + ".png").set("onload", () => results.elem?.elem().setAttribute("style", ""))
			.parent()
				.child("h5").text(hero)
			.parent()

			++cnt;
			if (cnt % 6 === 0) {
				row = results.elem.child("div", "class", "grid")
			}
		}
	};

	const onDisableHeroes = () => {
		gHandlers.disableHeroes(res);
		disableHeroes.elem?.set("hidden", true);
	}

	return (
		RatchetReact.New("article")
			.child("header", "style", "text-align: center;")
				.child("h3").text("Results")
			.parent()
		.parent()
			.child("input", "type", "submit", "value", "Randomize").set("onclick", onRandomize)
		.parent()
			.child("div").ref(results)
		.parent()
			.child("input", "type", "submit", "value", "Disable These Heroes", "class", "secondary", "hidden", "").ref(disableHeroes).set("onclick", onDisableHeroes)
		.parent()
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

function getMaxTeamSize(): number | null {
	let teamSize = 0;
	if (!Number.isNaN(gData.maxVanguard)) {
		teamSize += gData.maxVanguard;
	}
	else return null;
	if (!Number.isNaN(gData.maxDuelist)) {
		teamSize += gData.maxDuelist;
	}
	else return null;
	if (!Number.isNaN(gData.maxStrategist)) {
		teamSize += gData.maxStrategist;
	}
	else return null;
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

function randomize(): (Vanguard | Duelist | Strategist)[] {
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

	const all = [] as (Vanguard | Duelist | Strategist)[];
	const results = [] as (Vanguard | Duelist | Strategist)[];

	// Build lists of allowed heroes of each role
	for (const [hero, enabled] of Object.entries(gData.selectedVanguards)) {
		if (enabled) vanguards.push(hero as Vanguard);
	}
	for (const [hero, enabled] of Object.entries(gData.selectedDuelists)) {
		if (enabled) duelists.push(hero as Duelist);
	}
	for (const [hero, enabled] of Object.entries(gData.selectedStrategists)) {
		if (enabled) strategists.push(hero as Strategist);
	}

	// Get the minimum amount of each role
	for (let i = 0; i < minVanguard; ++i) {
		const rand = Math.floor(Math.random() * vanguards.length);
		results.push(vanguards[rand]);
		vanguards.splice(rand, 1);
		++vanguardCnt;
	}
	for (let i = 0; i < minDuelist; ++i) {
		const rand = Math.floor(Math.random() * duelists.length);
		results.push(duelists[rand]);
		duelists.splice(rand, 1);
		++duelistCnt;
	}
	for (let i = 0; i < minStrategist; ++i) {
		const rand = Math.floor(Math.random() * strategists.length);
		results.push(strategists[rand]);
		strategists.splice(rand, 1);
		++strategistCnt;
	}

	// Build array of all allowed heroes
	for (const hero of vanguards) {
		all.push(hero);
	}
	for (const hero of duelists) {
		all.push(hero);
	}
	for (const hero of strategists) {
		all.push(hero);
	}

	// Remove roles from the list of allowed heroes if we hit their max
	const removeMaxedRole = (cnt: number, max: number, roleHeroes: string[]) => {
		if (cnt === max) {
			for (let i = all.length - 1; i >= 0; --i) {
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
		const rand = Math.floor(Math.random() * all.length);
		const hero = all[rand];
		results.push(hero);
		all.splice(rand, 1);

		if (Vanguards.includes(hero as Vanguard)) {
			++vanguardCnt;
			removeMaxedRole(vanguardCnt, maxVanguard, Vanguards.slice());
		}
		else if (Duelists.includes(hero as Duelist)) {
			++duelistCnt;
			removeMaxedRole(duelistCnt, maxDuelist, Duelists.slice());
		}
		else {
			++strategistCnt;
			removeMaxedRole(strategistCnt, maxStrategist, Strategists.slice());
		}
	}

	// Randomize the order of the output to make it look more random
	for (let i = 0; i <  results.length; ++i) {
		const rand = Math.floor(Math.random() * results.length);
		[results[i], results[rand]] = [results[rand], results[i]];
	}

	return results;
}