import DI from 'FuseJS/DI'

export default class ManageTags {
	constructor(tags = DI("tags"), timer = DI("timer"), pages = DI("pages")) {
		this.tags = tags
		this.timer = timer
		this.pages = pages
	}

	tagClicked(args) {
		this.timer.stopTimer()
		this.tags.select(args.data.title)
		this.pages.pop()
	}
}
