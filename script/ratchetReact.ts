
class RatchetReact<T extends HTMLElement> {
	private htmlElem: T;
	private parentElem: RatchetReact<any> | null = null;
	private children: RatchetReact<any>[] = [];

	private constructor(htmlElem: T) {
		this.htmlElem = htmlElem;
	}

	/**
	 * Creates a new RatchetReact element.
	 * @param tagName HTML tag.
	 * @param args Attributes to set on the tag. Must be in pairs.
	 * @returns Newly created element.
	 */
	public static New<K extends keyof HTMLElementTagNameMap>(tagName: K, ...args: string[]): RatchetReact<HTMLElementTagNameMap[K]> {
		const rReact = new RatchetReact<HTMLElementTagNameMap[K]>(document.createElement(tagName));
		for (let i = 0; i < args.length; i = i + 2) {
			rReact.htmlElem.setAttribute(args[i], args[i+1]);
		}
		return rReact;
	}

	/**
	 * Creates and appends a child element to the current element.
	 * @param tagName HTML tag of the child.
	 * @param args Attributes to set on the child tag. Must be in pairs.
	 * @returns Newly created child element.
	 */
	public child<K extends keyof HTMLElementTagNameMap>(tagName: K, ...args: string[]): RatchetReact<HTMLElementTagNameMap[K]> {
		const child = RatchetReact.New(tagName, ...args);
		child.parentElem = this;
		this.children.push(child);
		this.htmlElem.appendChild(child.htmlElem);
		return child;
	}

	/**
	 * Appends a child element to the current element.
	 * @param elem RatchetReact object to append.
	 * @returns Newly appended element.
	 */
	public append<K extends HTMLElement>(elem: RatchetReact<K>): RatchetReact<K> {
		elem.parentElem = this;
		this.children.push(elem);
		this.htmlElem.appendChild(elem.htmlElem);
		return elem;
	}

	/**
	 * Get the element's parent.
	 * @returns Element's parent. Throws error on failure.
	 */
	public parent<K extends HTMLElement>(): RatchetReact<K> {
		if (this.parentElem === null) throw this;
		return this.parentElem;
	}

	/**
	 * Sets a property on the HTML element.
	 * @param property Property to set.
	 * @param value Value to set the property to.
	 * @returns This element.
	 */
	public set<K extends keyof T>(property: K, value: T[K]): RatchetReact<T> {
		this.htmlElem[property] = value;
		return this;
	}

	/**
	 * Gets a property from the HTML element.
	 * @param property Property to get.
	 * @returns Value of the property.
	 */
	public get<K extends keyof T>(property: K): T[K] {
		return this.htmlElem[property];
	}

	/**
	 * Sets the inner HTML of this element.
	 * @param text Text to set.
	 * @returns This element.
	 */
	public text(text: string): RatchetReact<T> {
		this.htmlElem.innerHTML = text;
		return this;
	}

	/**
	 * Sets the reference to this element.
	 * @param ref Reference to set.
	 * @returns This element.
	 */
	public ref(ref: RatchetRef<T>): RatchetReact<T> {
		ref.elem =this;
		return this;
	}

	/**
	 * Removes a child element by index.
	 * @param idx Index of child to remove.
	 * @returns This element.
	 */
	public removeChild(idx: number): RatchetReact<T> {
		const toRemove = this.children[idx];
		this.children.splice(idx, 1);
		this.htmlElem.removeChild(toRemove.htmlElem);
		return this;
	}

	/**
	 * Removes all child elements.
	 * @returns This element.
	 */
	public removeChildren(): RatchetReact<T> {
		while (this.htmlElem.lastChild) {
			this.htmlElem.removeChild(this.htmlElem.lastChild);
		}
		this.children = [];
		return this;
	}

	/**
	 * Gets a child element by index.
	 * @param idx Index of child.
	 * @returns Child element.
	 */
	public getChild<K extends HTMLElement>(idx: number): RatchetReact<K> {
		return this.children[idx];
	}

	/**
	 * Gets the underlying HTML element.
	 * @returns HTML element.
	 */
	public elem(): T {
		return this.htmlElem;
	}
}

class RatchetRef<T extends HTMLElement> {
	public elem: RatchetReact<T> | null = null;

	public static Use<K extends keyof HTMLElementTagNameMap>(tagName: K): RatchetRef<HTMLElementTagNameMap[K]> {
		return new RatchetRef<HTMLElementTagNameMap[K]>();
	}
};