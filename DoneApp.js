import DI from 'FuseJS/DI'

import Tags from 'Model/Tags'
import Timer from 'Model/Timer'
import Storage from 'Model/Storage'
import Log from 'Model/Log'

import ControlCenter from 'Pages/ControlCenter'
import ManageTags from 'Pages/ManageTags'
import AddTag from 'Pages/AddTag'

export default class DoneApp {
	constructor() {
		DI(this)
		this.title = "Done"
		this.storage = new Storage()
		this.log = new Log()
		this.tags = new Tags()
		this.timer = new Timer()
		this.pages = [new ControlCenter()]
	}

	tagButtonClicked() {
		this.pages.push(new ManageTags())
	}

	addTagButtonClicked() {
		this.pages.push(new AddTag())
	}

	get haveHistory() {
		return this.pages.length > 1
	}

	onBackButton() {
		if (this.haveHistory) {
			this.pages.pop()
		} else {
			// TODO: if on Android, exit app (perhaps?)
		}
	}

	onResetButton() {
		this.timer.stopTimer()
		this.tags.select("")

		this.storage.reset()
		this.tags.readStoredTags()
		this.log.updateLog()
	}

}
