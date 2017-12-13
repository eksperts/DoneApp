import DI from 'FuseJS/DI'

export default class Log {
	constructor(storage = DI("storage")) {
		this.storage = storage
		this.list = this.storage.readLog()
		console.log(JSON.stringify(this.list))
		console.log("ohai")
	}
}
