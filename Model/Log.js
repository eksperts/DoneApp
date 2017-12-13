import DI from 'FuseJS/DI'

class LogEntry {
	constructor(data) {
		this.start = data.start
		this.end = data.end
		this.tag = data.tag
	}

	get duration() {
		let res = "- - : - - : - -"
		if (this.end != null && this.start != null) res = msToTime(this.end - this.start)
		return res
	}

	get date() {
		let started = new Date(this.start)
		return started.getDate() + "." + started.getMonth() + "." + started.getFullYear()
	}
}

export default class Log {
	constructor(storage = DI("storage")) {
		this.storage = storage
		this.list = []
		this.updateLog()
	}

	updateLog() {
		this.list = []
		let tmp = this.storage.readLog().map((e) => {
			return new LogEntry(e)
		})
		console.log(JSON.stringify(tmp))
		this.list.push.apply(this.list, tmp)
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
