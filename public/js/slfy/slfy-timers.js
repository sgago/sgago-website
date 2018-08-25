"use strict";
class SlfyTimers extends Array {
    get TotalDuration() {
        let duration = 0;
        this.forEach(x => duration += x.getDuration());
        return duration;
    }
    constructor() {
        super();
        this.add(0, () => { }, false);
    }
    start() {
        this.forEach(x => x.start());
    }
    stop() {
        this.forEach(x => x.stop());
    }
    pause() {
        this.forEach(x => x.pause());
    }
    reset() {
        this.forEach(x => x.reset());
    }
    add(duration, onElapseHandler, autoStart = false) {
        let newTimer = new Timer(duration, onElapseHandler, autoStart);
        this.push(newTimer);
    }
    next(duration, onElapseHandler, autoStart = false) {
        let newTimer = new Timer(this[this.length - 1].getDuration() + duration, onElapseHandler, autoStart);
        this.push(newTimer);
    }
}
//# sourceMappingURL=slfy-timers.js.map