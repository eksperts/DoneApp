import DI from 'FuseJS/DI'

import Tags from 'Model/Tags'
import ControlCenter from 'Pages/ControlCenter'
import ManageTags from 'Pages/ManageTags'

export class DoneApp {
	constructor() {
		DI(this)
		this.title = "Done"
		this.tags = new Tags()
		this.pages = [new ControlCenter()]
		this.timerIsRunning = false
	}

	get timerIsNotRunning() {
		return ! this.timerIsRunning
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

	timerButtonClicked() {
		if (this.timerIsRunning) {
			
		}
	}
}
