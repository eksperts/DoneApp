import DI from 'FuseJS/DI'

export default class Log {
	constructor(storage = DI("storage")) {
		this.storage = storage
		this.list = ["one","two","three"]
	}
}
