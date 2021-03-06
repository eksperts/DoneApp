import DI from 'FuseJS/DI'
import moment from 'Model/moment'
import Loop from 'FuseJS/Timer'

export default class Timer {
	constructor(tags = DI("tags"), log = DI("log"), storage = DI("storage"), helpers = DI("helpers")) {
		this.tags = tags
		this.log = log
		this.storage = storage
		this.helpers = helpers
		this.running = false
		this.started = null
		this.elapsed = 0
		this.loop = null
		this.checkIfWasRunning()
	}

	checkIfWasRunning() {
		let storedTimer = this.storage.readCurrent()
		if (storedTimer.start != undefined && storedTimer.tag != undefined) {
			this.tags.select(storedTimer.tag)
			this.started = storedTimer.start
			this.running = true
			this.launchLoop()
		}
	}

	get elapsedLabel() {
		return this.helpers.msToTime(this.elapsed)
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
		if (this.loop != null) {
			Loop.delete(this.loop)
			this.loop = null
			this.storage.writeLog(this.started, Date.now(), this.tags.selected)
			this.storage.writeCurrent(0, null)
			this.log.updateLog()
		}
		this.running = false
		this.started = null
		this.elapsed = 0
	}

	startTimer() {
		this.running = true
		this.started = Date.now()
		this.storage.writeCurrent(this.started, this.tags.selected)
		this.launchLoop()
	}

	launchLoop() {
		this.loop = Loop.create(() => {
			this.setElapsed(Math.floor(Date.now() - this.started))
		}, 1000, true)
	}

	setElapsed(v) {
		this.elapsed = v
	}

}
