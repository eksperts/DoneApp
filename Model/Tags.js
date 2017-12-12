class Tag {
	constructor(index, title) {
		this.index = index
		this.title = title
	}
}

export default class Tags {
	constructor() {
		this.list = [
			new Tag(null, "Select None"),
			new Tag(1, "Test One"),
			new Tag(2, "Test Two"),
			new Tag(3, "Test Three")
		]
		this.selected = null
	}

	get isSelected() {
		return !(this.selected === null)
	}

	get selectedLabel() {
		return this.isSelected ? this.list[this.selected].title : "No tag selected"
	}

	select(idx) {
		this.selected = idx;
	}

	clear() {
		this.selected = null;
	}
}
