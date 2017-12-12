import FS from 'FuseJS/FileSystem'

export default class Storage {
	constructor() {
		this.paths = {
			log: FS.dataDirectory + "/" + "doneLog.json",
			tags: FS.dataDirectory + "/" + "doneTags.json",
			current: FS.dataDirectory + "/" + "doneCurrent.json"
		}
	}
}
