import DI from 'FuseJS/DI'

import Tags from 'Model/Tags'
import Timer from 'Model/Timer'
import Storage from 'Model/Storage'

import ControlCenter from 'Pages/ControlCenter'
import ManageTags from 'Pages/ManageTags'

export default class DoneApp {
	constructor() {
		DI(this)
		this.title = "Done"
		this.storage = new Storage()
		this.tags = new Tags()
		this.timer = new Timer()
		this.pages = [new ControlCenter()]
	}

	tagButtonClicked() {
		this.pages.push(new ManageTags())
	}

	onBackButton() {
		if (this.pages.length > 0) {
			this.pages.pop()
		} else {
			// TODO: if on Android, exit app (perhaps?)
		}
	}

	get haveHistory() {
		return this.pages.length > 1
	}

}
