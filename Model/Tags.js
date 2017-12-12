import DI from 'FuseJS/DI'

class Tag {
	constructor(index, title) {
		this.index = index
		this.title = title
	}
}

export default class Tags {
	constructor(storage = DI("storage")) {
		this.storage = storage
		// this.list = [
		// 	new Tag(null, "Select None"),
		// 	new Tag(1, "Test One"),
		// 	new Tag(2, "Test Two"),
		// 	new Tag(3, "Test Three")
		// ]
		this.list = []
		this.selected = null
		this.readStoredTags()
		// this.writeTags()
	}

	readStoredTags() {
		this.list = this.storage.readTags()
	}

	writeTags() {
		this.storage.writeTags(this.list)
	}

	get isSelected() {
		return !(this.selected === null)
	}

	get selectedLabel() {
		return this.isSelected ? this.list[this.selected].title : "No tag selected"
	}

	select(idx) {
		this.stopTimer()
		this.selected = idx
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
