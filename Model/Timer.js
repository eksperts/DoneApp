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
		// TODO: this here should check if there was an open timer running
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
	}

	startTimer() {
		// TODO: make a note a new current record started
		this.running = true
		this.started = moment() - 10000000
		this.loop = Loop.create(() => {
			this.setElapsed(Math.floor(moment() - this.started))
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
