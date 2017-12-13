import DI from 'FuseJS/DI'

export default class Timer {
	constructor(tags = DI("tags"), storage = DI("storage")) {
		this.tags = tags
		this.storage = storage
		this.running = false
		// TODO: this here should check if there was an open timer running
	}

	get isRunning() {
		return this.running
	}

	get notIsRunning() {
		return ! this.running
	}

	toggle() {
		if (this.isRunning) {
			this.stopTimer()
		} else if (this.tags.isSelected) {
			this.startTimer()
		} else {
			// can not start a timer when no tag is selected,
			// or when a timer is already running
		}
	}

	stopTimer() {
		// TODO: log the current record as finished
		this.running = false
	}

	startTimer() {
		// TODO: make a note a new current record started
		this.running = true
	}

}
