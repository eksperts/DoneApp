import DI from 'FuseJS/DI'
import moment from 'Model/moment'
import Loop from 'FuseJS/Timer'

export default class Timer {
	constructor(tags = DI("tags"), storage = DI("storage")) {
		this.tags = tags
		this.storage = storage
		this.running = false
		this.started = null
		this.elapsed = 0
		this.loop = null
		this.checkIfWasRunning()
	}

	checkIfWasRunning() {
		let storedTimer = this.storage.readCurrent()
		if (storedTimer.start != undefined) {
			this.started = storedTimer.start
			this.running = true
			this.launchLoop()
		}
	}

	get elapsedLabel() {
		return msToTime(this.elapsed)
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
		this.started = null
		this.elapsed = 0
		if (this.loop != null) {
			Loop.delete(this.loop)
			this.loop = null
		}
		this.storage.writeCurrent(0)
	}

	startTimer() {
		this.running = true
		this.started = Date.now()
		this.storage.writeCurrent(this.started)
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

function msToTime(duration) {
    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}
