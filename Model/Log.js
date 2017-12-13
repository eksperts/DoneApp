import DI from 'FuseJS/DI'

class LogEntry {
	constructor(data) {
		this.start = data.start
		this.end = data.end
		this.tag = data.tag
	}

	get duration() {
		let Helpers = DI("helpers")
		return Helpers.msToTime(this.durationInMillis)
	}

	get durationInMillis() {
		let res = 0
		if (this.end != null && this.start != null && (this.end > this.start)) res = this.end - this.start
		return res
	}

	get date() {
		let Helpers = DI("helpers")
		let started = new Date(this.start)
		return Helpers.padNumber(started.getDate())
			+ "." + Helpers.padNumber(started.getMonth()+1)
			+ "." + Helpers.padNumber(started.getFullYear())
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
		this.list.push.apply(this.list, tmp)
	}

	get groupedList() {
		let Helpers = DI("helpers")
		let tmp = {}
		this.list.map((i) => {
			if (tmp[i.date] == undefined) tmp[i.date] = {}
			if (tmp[i.date][i.tag] == undefined) tmp[i.date][i.tag] = 0;
			tmp[i.date][i.tag] += Math.floor(i.durationInMillis / 1000);
		})
		let arr = []
		for (var date in tmp) {
			let dateArr = []
			for (var tag in tmp[date]) {
				dateArr.push({tag: tag, time: Helpers.padNumber(Helpers.msToTime(tmp[date][tag] * 1000))})
			}
			arr.push({date: date, tags: dateArr})
		}
		return arr
	}
}
