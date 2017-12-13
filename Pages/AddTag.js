import DI from 'FuseJS/DI'

export default class AddTag {
	constructor(tags = DI("tags"), pages = DI("pages")) {
		this.tags = tags
		this.pages = pages
		this.newTagName = ""
	}

	addTag() {
		if (!this.tags.exists(this.newTagName)) {
			this.tags.add(this.newTagName)
			this.pages.pop()
		} else {
			// TODO: show that the tag already exists or can not be empty
		}
	}
}
