import DI from 'FuseJS/DI'
import moment from 'Model/moment'
import T from 'FuseJS/Timer'

let oldTimerDelete = T.delete;
T.delete = function() {
	console.log((new Error).stack);

	return oldTimerDelete.apply(this, arguments)
}

let loops = new Map()

export default class Timer {
	constructor(tags = DI("tags"), storage = DI("storage")) {
		this.tags = tags
		this.storage = storage
		this.running = false
		this.started = null
		this.elapsed = "00:00"
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
		if (!loops.has(this)) return;
		// TODO: log the current record as finished
		this.running = false
		this.started = null
		clearTimeout(loops.get(this))
	}

	startTimer() {
		// TODO: make a note a new current record started
		this.running = true
		this.started = moment()
		loops.set(this, setTimeout(() => {
			this.setElapsed(Math.floor((moment() - this.started) / 1000))
		}, 1000))
	}

	setElapsed(v) { this.elapsed = v}

}
