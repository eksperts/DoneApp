import DI from 'FuseJS/DI'

export default class ManageTags {
	constructor(tags = DI("tags"), pages = DI("pages")) {
		this.tags = tags
		this.pages = pages
	}

	tagClicked(args) {
		this.tags.select(args.data.title)
		this.pages.pop()
	}
}
