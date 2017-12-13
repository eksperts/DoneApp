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

	writeCurrent(time) {
		let obj = {}
		if (time > 0) obj.start = time
		FS.writeTextToFileSync(this.paths.current, JSON.stringify(obj))
	}
}
