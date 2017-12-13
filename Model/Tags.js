import DI from 'FuseJS/DI'

class Tag {
	constructor(title) {
		this.title = title
	}
}

export default class Tags {
	constructor(storage = DI("storage")) {
		this.storage = storage
		// this.list = [
		// 	new Tag(""),
		// 	new Tag("Test One"),
		// 	new Tag("Test Two"),
		// 	new Tag("Test Three")
		// ]
		this.list = [new Tag("")]
		this.selected = null
		this.readStoredTags()
		// this.writeTags()
	}

	readStoredTags() {
		this.list.push.apply(this.list, this.storage.readTags())
	}

	writeTags() {
		this.storage.writeTags(this.list)
	}

	get isSelected() {
		return !(this.selected === null)
	}

	get selectedLabel() {
		return this.isSelected ? this.selected : "No tag selected"
	}

	select(tag) {
		if (tag == "") {
			this.clear()
		} else {
			this.stopTimer()
			this.selected = tag
		}
	}

	clear() {
		this.stopTimer()
		this.selected = null
	}

	stopTimer() {
		let timer = DI("timer")
		timer.stopTimer()
	}
}
