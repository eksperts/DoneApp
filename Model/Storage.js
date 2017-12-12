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
}
