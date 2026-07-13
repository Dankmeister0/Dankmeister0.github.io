
/// <reference path = "ratchetReact.ts" />
/// <reference path = "defs.ts" />

type TeamupSetting = "Ignore" | "Random" | "Prioritize" | "Force";

class HeroSelect {
	hero: Hero = new Hero();
	role: Role = "Duelist";
	teamup: Teamup = new Teamup();
}

const gData = {
	teamSize: 1,
	minVanguard: 0,
	maxVanguard: 1000,
	minDuelist: 0,
	maxDuelist: 1000,
	minStrategist: 0,
	maxStrategist: 1000,
	minRole: {["Vanguard"]: 0, ["Duelist"]: 0, ["Strategist"]: 0},
	maxRole: {["Vanguard"]: 3333, ["Duelist"]: 3333, ["Strategist"]: 3333},
	results: [] as HeroSelect[],

	disablePrevHeroes: false,
	allowDuplicates: false,
	teamupMode: "Random" as TeamupSetting,
};

const gHandlers = {
	disableHeroes: (() => {}) as (list: HeroSelect[]) => void,
};

//#region Helpers
function doArraysIntersect<T>(arr1: T[], arr2: T[]): boolean {
	for (const elem of arr1) {
		if (arr2.includes(elem)) {
			return true;
		}
	}
	return false;
}

function getArrayIntersection<T>(arr1: T[], arr2: T[]): T[] {
	const intersection: T[] = [];
	for (const elem of arr1) {
		if (arr2.includes(elem)) {
			intersection.push(elem);
		}
	}
	return intersection;
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
	teamSize += gData.minRole.Vanguard;
	teamSize += gData.minRole.Duelist;
	teamSize += gData.minRole.Strategist;
	return teamSize < 1 ? 1 : teamSize;
}

function getMaxTeamSize(): number {
	let teamSize = 0;
	teamSize += gData.maxRole.Vanguard;
	teamSize += gData.maxRole.Duelist;
	teamSize += gData.maxRole.Strategist;
	return teamSize;
}
//#endregion

//#region Randomizer
function getAllowedRoles(): Role[] {
	const allowedRoles: Role[] = [];
	let cntVang = 0;
	let cntDuel = 0;
	let cntStrat = 0;

	for (const hero of gData.results) {
		if (hero.role === "Vanguard") ++cntVang;
		else if (hero.role === "Duelist") ++cntDuel;
		else if (hero.role === "Strategist") ++cntStrat;
	}

	if (cntVang < gData.minRole.Vanguard) allowedRoles.push("Vanguard");
	if (cntDuel < gData.minRole.Duelist) allowedRoles.push("Duelist");
	if (cntStrat < gData.minRole.Strategist) allowedRoles.push("Strategist");
	if (allowedRoles.length > 0) return allowedRoles;

	if (cntVang < gData.maxRole.Vanguard) allowedRoles.push("Vanguard");
	if (cntDuel < gData.maxRole.Duelist) allowedRoles.push("Duelist");
	if (cntStrat < gData.maxRole.Strategist) allowedRoles.push("Strategist");
	return allowedRoles;

}

function getRandomFromTeamup(hero: Hero): Teamup {
	// Check if possible teamup is already selected
	for (const teamup of hero.teamups) {
		for (const hero of gData.results) {
			if (hero.hero.name === teamup.hero) {
				return teamup;
			}
		}
	}

	// Build list of allowed teamup heroes
	const allowedHeroes: Hero[] = [];
	for (const teamup of hero.teamups) {
		const hero = getHero(teamup.hero);
		if (hero !== null) allowedHeroes.push(hero);
	}

	// Get random hero
	const res = getRandom(allowedHeroes);
	if (res !== null) {
		for (const teamup of hero.teamups) {
			if (teamup.hero === res.hero.name) {
				return teamup;
			}
		}
	}
	return hero.teamups[Math.floor(Math.random() * hero.teamups.length)];
}

function getRandom(heroList: Hero[] = Heroes): HeroSelect | null {
	const allowedHeroes: Hero[] = [];
	const allowedRoles: Role[] = getAllowedRoles();
	if (gData.teamSize <= gData.results.length) return null;
	if (allowedRoles.length === 0) return null;

	// Build list of allowed heroes
	for (const hero of heroList) {
		if (!hero.disabled && !hero.selected && doArraysIntersect(hero.roles, allowedRoles)) {
			allowedHeroes.push(hero);
		}
	}
	if (allowedHeroes.length === 0) return null;

	// Get random hero
	const output = new HeroSelect();
	output.hero = allowedHeroes[Math.floor(Math.random() * allowedHeroes.length)];

	// Get random role
	const heroRoles = getArrayIntersection(output.hero.roles, allowedRoles);
	output.role = heroRoles[Math.floor(Math.random() * heroRoles.length)];

	// Update global data
	gData.results.push(output);
	if (gData.disablePrevHeroes) output.hero.disabled = true;
	if (!gData.allowDuplicates) output.hero.selected = true;

	// Get random teamup
	if (gData.teamupMode === "Random") {
		output.teamup = output.hero.teamups[Math.floor(Math.random() * output.hero.teamups.length)];
	}
	else if (gData.teamupMode === "Force") {
		output.teamup = getRandomFromTeamup(output.hero);
	}
	return output;
}

function randomize(): void {
	// Reset global data
	gData.results.splice(0);
	for (const hero of Heroes) {
		hero.selected = false;
	}

	// Get random heroes
	while (gData.results.length < 10000) {
		const randomHero = getRandom(Heroes);
		if (randomHero === null) break;
	}

	// Get teamups of results
	if (gData.teamupMode === "Prioritize") {
		for (const hero1 of gData.results) {
			for (const hero2 of gData.results) {
				const teamups = shuffle(hero1.hero.teamups);
				for (const teamup of teamups) {
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
	const errMsgRef = RatchetReact.New("small");

	const validateTeamSettings = () => {
		let valid = true;
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

	const setMinMax = (ref: RatchetReact<HTMLInputElement>) => {
		const val = ref.get("valueAsNumber");
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
	}

	return (
		RatchetReact.New("article").open()
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
						.addRef(minVanguardRef).set("type", "number").set("placeholder", "Min").set("oninput", () => setMinMax(minVanguardRef))
						.addRef(maxVanguardRef).set("type", "number").set("placeholder", "Max").set("oninput", () => setMinMax(maxVanguardRef))
					.close()
				.close()
				.add("label").set("textContent", "Duelist").open()
					.add("div").set("role", "group").open()
						.addRef(minDuelistRef).set("type", "number").set("placeholder", "Min").set("oninput", () => setMinMax(minDuelistRef))
						.addRef(maxDuelistRef).set("type", "number").set("placeholder", "Max").set("oninput", () => setMinMax(maxDuelistRef))
					.close()
				.close()
				.add("label").set("textContent", "Strategist").open()
					.add("div").set("role", "group").open()
						.addRef(minStrategistRef).set("type", "number").set("placeholder", "Min").set("oninput", () => setMinMax(minStrategistRef))
						.addRef(maxStrategistRef).set("type", "number").set("placeholder", "Max").set("oninput", () => setMinMax(maxStrategistRef))
					.close()
				.close()
			.close()
			.add("input").setRaw("style", "display: none;").set("ariaInvalid", "true")
			.addRef(errMsgRef)
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

	const enableAll = (list: RatchetReact<HTMLFieldSetElement>, enable: boolean) => {
		for (const child of Array.from(list.get("children"))) {
			const checkbox = child.firstChild as HTMLInputElement;
			checkbox.checked = enable;
			if (checkbox.onchange) checkbox.onchange(new Event(""));
		}
	}

	gHandlers.disableHeroes = (list: HeroSelect[]) => {
		let fieldset: RatchetReact<HTMLFieldSetElement>;
		for (const hero of list) {
			if (hero.role === "Vanguard") {
				fieldset = vanguardListRef;
			}
			else if (hero.role === "Duelist") {
				fieldset = duelistListRef;
			}
			else {
				fieldset = strategistListRef;
			}

			for (const child of Array.from(fieldset.get("children"))) {
				const checkbox = child.firstChild as HTMLInputElement;
				if (checkbox.id === hero.hero.name) {
					checkbox.checked = false;
					if (checkbox.onchange) checkbox.onchange(new Event(""));
					break;
				}
			}
		}
	}

	vanguardListRef.open()
	duelistListRef.open()
	strategistListRef.open()
	for (const hero of Heroes) {
		for (const role of hero.roles) {
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
	vanguardListRef.close()
	duelistListRef.close()
	strategistListRef.close()

	return (
		RatchetReact.New("article").open()
			.add("header").setRaw("style", "text-align: center;").open()
				.add("h3").set("textContent", "Heroes")
			.close()
			.add("div").set("className", "grid").open()
				.add("div").setRaw("style", "text-align: center;").open()
					.add("img").set("src", "img/Vanguard.png").setRaw("style", "padding-bottom: 20px")
					.add("div").set("role", "group").open()
						.addRef(disableVanguardRef).set("type", "submit").set("value", "Disable All").set("onclick", () => enableAll(vanguardListRef, false))
						.addRef(enableVanguardRef).set("type", "submit").set("value", "Enable All").set("onclick", () => enableAll(vanguardListRef, true))
					.close()
					.addRef(vanguardListRef)
				.close()
				.add("div").setRaw("style", "text-align: center;").open()
					.add("img").set("src", "img/Duelist.png").setRaw("style", "padding-bottom: 20px")
					.add("div").set("role", "group").open()
						.addRef(disableDuelistRef).set("type", "submit").set("value", "Disable All").set("onclick", () => enableAll(duelistListRef, false))
						.addRef(enableDuelistRef).set("type", "submit").set("value", "Enable All").set("onclick", () => enableAll(duelistListRef, true))
					.close()
					.addRef(duelistListRef)
				.close()
				.add("div").setRaw("style", "text-align: center;").open()
					.add("img").set("src", "img/Strategist.png").setRaw("style", "padding-bottom: 20px")
					.add("div").set("role", "group").open()
						.addRef(disableStrategistRef).set("type", "submit").set("value", "Disable All").set("onclick", () => enableAll(strategistListRef, false))
						.addRef(enableStrategistRef).set("type", "submit").set("value", "Enable All").set("onclick", () => enableAll(strategistListRef, true))
					.close()
					.addRef(strategistListRef)
				.close()
			.close()
		.close()
	);
}

function HeroEntry(hero: Hero, role: Role): RatchetReact<HTMLElement> {
	const checkbox = RatchetReact.New("input");
	const heroName = hero.roles.length > 1 ? hero.name + " (" + role + ")" : hero.name;
	hero.disabled = false;

	return (
		RatchetReact.New("label").open()
			.addRef(checkbox).set("type", "checkbox").set("checked", true).set("id", hero.name).set("onchange", () => hero.disabled = !checkbox.get("checked"))
			.addRaw(heroName)
		.close()
	);
}

function MiscSettings(): RatchetReact<HTMLElement> {
	const disablePrevHeroRef = RatchetReact.New("input");
	const allowDuplicatesRef = RatchetReact.New("input");
	const teamupIgnoreRef = RatchetReact.New("input");
	const teamupRandomizeRef = RatchetReact.New("input");
	const teamupPrioritizeRef = RatchetReact.New("input");
	const teamupForceRef = RatchetReact.New("input");

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
				.add("fieldset").open()
					.add("legend").open()
						.addRaw("Teamup Settings")
					.close()
					.add("label").open()
						.addRef(teamupIgnoreRef).set("type", "radio").set("name", "teamup").set("onchange", () => { if (teamupIgnoreRef.get("checked")) gData.teamupMode = "Ignore" })
						.add("span").set("textContent", "Disable").setRaw("data-tooltip", "Does not select teamup")
					.close()
					.add("label").open()
						.addRef(teamupRandomizeRef).set("type", "radio").set("name", "teamup").set("checked", true).set("onchange", () => { if (teamupRandomizeRef.get("checked")) gData.teamupMode = "Random" })
						.add("span").set("textContent", "Randomize").setRaw("data-tooltip", "Selects random teamup")
					.close()
					.add("label").open()
						.addRef(teamupPrioritizeRef).set("type", "radio").set("name", "teamup").set("onchange", () => { if (teamupPrioritizeRef.get("checked")) gData.teamupMode = "Prioritize" })
						.add("span").set("textContent", "Prioritize").setRaw("data-tooltip", "Prioritizes upgraded teamups")
					.close()
					.add("label").open()
						.addRef(teamupForceRef).set("type", "radio").set("name", "teamup").set("onchange", () => { if (teamupForceRef.get("checked")) gData.teamupMode = "Force" })
						.add("span").set("textContent", "Force").setRaw("data-tooltip", "Forces team to have upgraded teamups (This can skew characters that have more teamups to show up more often)")
					.close()
				.close()
			.close()
		.close()
	);
}

function RandomizeSection(): RatchetReact<HTMLElement> {
	const resultsRef = RatchetReact.New("div");

	const onRandomize = () => {
		randomize();
		if (gData.disablePrevHeroes) gHandlers.disableHeroes(gData.results);

		resultsRef.setRaw("style", "min-height: " + resultsRef.get("offsetHeight") + "px;");
		resultsRef.elem().replaceChildren();

		resultsRef.open();
		let row: RatchetReact<HTMLDivElement> | null = null;
		let cnt = 0;
		for (const hero of gData.results) {
			if (cnt % 6 === 0 || row === null) {
				row = resultsRef.add("div").set("className", "grid")
			}

			const heroName = hero.hero.roles.length > 1 ? hero.hero.name + " (" + hero.role + ")" : hero.hero.name;
			const h5Ref = RatchetReact.New("h5");
			row.open()
				.add("div").setRaw("style", "text-align: center;").open()
					.add("img").set("src", "img/hero/" + heroName + ".png")
					.addRef(h5Ref).set("textContent", heroName)
				.close()
			.close();

			if (gData.teamupMode !== "Ignore") {
				let boosted = false;
				for (const hero2 of gData.results) {
					if (hero2.hero.name === hero.teamup.hero) {
						boosted = true;
						break;
					}
				}
				const filename = "img/ability/" + hero.teamup.name.replace("//", "^^") + ".png";
				const divRef = RatchetReact.New("div");

				h5Ref.add("img").set("src", filename)
				.addRef(divRef).set("textContent", hero.teamup.name)
				if (boosted) {
					divRef.setRaw("style", "border-bottom: none; font-weight: bold;").setRaw("data-placement", "bottom").setRaw("data-tooltip", "Boosted by " + hero.teamup.hero);
				}
			}

			++cnt;
		}
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
//#endregion

function runSimulation(runs: number = 1000000): void {
	const results: {[key: string]: number} = {};
	const resultsTeamups: number[] = [];
	for(let i = 0; i < runs; ++i) {
		randomize();

		// Count heroes
		let boostedTeamups = 0;
		for (const hero of gData.results) {
			const heroName = hero.hero.roles.length > 1 ? hero.hero.name + " (" + hero.role + ")" : hero.hero.name;
			if (isNaN(results[heroName])) {
				results[heroName] = 0;
			}
			results[heroName] += 1;

			// Count teamups
			for (const hero2 of gData.results) {
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

	console.log("Teamups frequency:");
	let teamupAvg = 0;
	for (let i = 0; i < resultsTeamups.length; ++i) {
		if (resultsTeamups[i] === undefined) continue;
		teamupAvg += (i * resultsTeamups[i]);
		console.log(i + ": " + resultsTeamups[i]);
	}
	teamupAvg /= runs;
	console.log("Average: " + teamupAvg);
}