import FS from 'FuseJS/FileSystem'

export default class Storage {
	constructor() {
		this.paths = {
			log: FS.dataDirectory + "/" + "doneLog.json",
			tags: FS.dataDirectory + "/" + "doneTags.json",
			current: FS.dataDirectory + "/" + "doneCurrent.json"
		}
	}

	readTags() {
		if (!FS.existsSync(this.paths.tags)) {
			this.writeTags([])
		}
		return JSON.parse(FS.readTextFromFileSync(this.paths.tags))
	}

	writeTags(arr) {
		FS.writeTextToFileSync(this.paths.tags, JSON.stringify(arr))
	}

	readCurrent() {
		if (!FS.existsSync(this.paths.current)) {
			this.writeCurrent(0)
		}
		return JSON.parse(FS.readTextFromFileSync(this.paths.current))
	}

	writeCurrent(time, tag) {
		let obj = {}
		if (time > 0) obj.start = time
		if (tag != null) obj.tag = tag
		FS.writeTextToFileSync(this.paths.current, JSON.stringify(obj))
	}

	readLog() {
		if (!FS.existsSync(this.paths.log)) {
			this.writeEmptyLog()
		}
		return JSON.parse(FS.readTextFromFileSync(this.paths.log))
	}

	writeLog(start, end, tag) {
		let arr = this.readLog()
		arr.unshift({start: start, end: end, tag: tag})
		FS.writeTextToFileSync(this.paths.log, JSON.stringify(arr))
	}

	writeEmptyLog() {
		FS.writeTextToFileSync(this.paths.log, JSON.stringify([]))
	}

}
