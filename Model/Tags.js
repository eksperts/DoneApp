import DI from 'FuseJS/DI'

class Tag {
	constructor(title) {
		this.title = title
	}
}

export default class Tags {
	constructor(storage = DI("storage")) {
		this.storage = storage
		this.list = [new Tag("")]
		this.selected = null
		this.readStoredTags()
	}

	readStoredTags() {
		let tmp = this.storage.readTags()
		// tmp.sort()
		this.list = [new Tag("")]
		this.list.push.apply(this.list, tmp)
	}

	writeTags() {
		this.storage.writeTags(this.list.slice(1))
	}

	get isSelected() {
		return !(this.selected === null)
	}

	get selectedLabel() {
		return this.isSelected ? "Selected: " + this.selected : "No tag selected"
	}

	exists(tag) {
		let found = this.list.find((t) => {
			return t.title == tag
		})
		if (found != null) return true
		return false
	}

	add(tag) {
		this.list.push(new Tag(tag))
		// this.list.sort()
		this.writeTags()
	}

	select(tag) {
		if (tag == "") {
			this.selected = null
		} else {
			this.selected = tag
		}
	}

}
