import DI from 'FuseJS/DI'

export default class Timer {
	constructor(tags = DI("tags")) {
		this.tags = tags
		this.running = false
	}

	get isRunning() {
		return this.running
	}

	get notIsRunning() {
		return ! this.running
	}

	toggle() {
		if (this.isRunning) {
			// stop timer
			this.stopTimer()
		} else if (this.tags.isSelected) {
			// start timer
			this.startTimer()
		} else {
			// can not start a timer when no tag is selected
			// console.log("nope")
		}
	}

	stopTimer() {
		this.running = false
	}

	startTimer() {
		this.running = true
	}

}
