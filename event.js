export default class EventEmitter {
    constructor() {
        this.callback = {};
    }
    on(event, cb) {
        if (!this.callback[event]) this.callback[event] = [];
        this.callback[event].push(cb);
    }
    emit(event, data) {
        const cbs = this.callback[event];
        if (cbs) {
            cbs.forEach((cb) => cb(data));
        }
    }
}