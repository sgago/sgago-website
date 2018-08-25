"use strict";
/**
 * Reperesents a timer that generates an onElapsed event
 * after a specified number of milliseconds.
 */
class Timer {
    /**
     * Instantiates a new instance of Timer.
     * @param duration Length of the timer in milliseconds.
     * @param onElapseHandler Callback method called when the timer finishes.
     * @param autoStart True to start the timer immediately; otherwise, false.
     */
    constructor(duration, onElapseHandler, autoStart = false) {
        /**
         * The timer's unique ID returned from the window.setTimeout method.
         */
        this.timerId = 0;
        /**
         * Duration of the timer in milliseconds before
         * the timer expires and the onElapse callback method is called.
         */
        this.duration = 0;
        /**
         * The start time of this timer instance.
         */
        this.startTime = null;
        /**
         * The end time of this timer instance.
         */
        this.endTime = null;
        /**
         * True if this timer is running; otherwise, false.
         */
        this.isRunning = false;
        /**
         * Callback method that is called when the timer finishes.
         */
        this.onElapseHandler = function () { };
        this.Duration = duration >= 0 ? duration : 0;
        this.OnElapseHandler = onElapseHandler;
        // Should we start the timer immediately?
        if (autoStart) {
            this.start();
        }
    }
    /**
     * Gets this timer's unique ID.
     */
    get TimerID() {
        return this.timerId;
    }
    /**
     * Sets this timer's unique ID.
     */
    set TimerID(timerId) {
        this.timerId = timerId;
    }
    /**
     * Gets the duration of this timer instance in milliseconds.
     */
    get Duration() {
        return this.duration;
    }
    /**
     * Sets the duration of this timer instance in milliseconds.
     */
    set Duration(duration) {
        this.duration = duration;
    }
    /**
     * Gets this timer's start time.
     */
    get StartTime() {
        return this.startTime;
    }
    /**
     * Sets this timer's start time.
     */
    set StartTime(startTime) {
        this.startTime = startTime;
    }
    /**
     * Gets this timer's end time.
     */
    get EndTime() {
        return this.endTime;
    }
    /**
     * Sets this timer's end time.
     */
    set EndTime(endTime) {
        this.endTime = endTime;
    }
    /**
     * Gets true if this timer is running; otherwise, false.
     */
    get IsRunning() {
        return this.isRunning;
    }
    /**
     * Set to true if this timer is running; otherwise, false.
     */
    set IsRunning(isRunning) {
        this.isRunning = isRunning;
    }
    /**
     * Gets the remaining time before this timer instance elapses.
     */
    get RemainingTime() {
        if (this.IsRunning) {
            return new Date(Math.max(this.EndTime.getTime() - new Date().getTime(), 0));
        }
        else {
            return new Date(Math.max(this.EndTime.getTime() - this.StartTime.getTime(), 0));
        }
    }
    /**
     * Gets the callback method for this timer instance.
     */
    get OnElapseHandler() {
        return this.onElapseHandler;
    }
    /**
     * Sets the callback method for this timer instance.
     */
    set OnElapseHandler(onElapseHandler) {
        this.onElapseHandler = onElapseHandler;
    }
    /**
     * Gets the duration of this timer instance in milliseconds.
     */
    getDuration() {
        return this.Duration;
    }
    /**
     * Gets the start time of this timer instance in milliseconds.
     */
    getStartTime() {
        return this.StartTime.getTime();
    }
    /**
     * Gets the end time of this timer instance in milliseconds.
     */
    getEndTime() {
        return this.EndTime.getTime();
    }
    /**
     * Gets the remaning time left on this timer instance in milliseconds.
     */
    getRemainingTime() {
        var remainingTime = 0;
        if (this.IsRunning) {
            remainingTime = this.RemainingTime.getTime();
        }
        else {
            remainingTime = this.getEndTime() - this.getStartTime();
        }
        return remainingTime;
    }
    /**
     * True if this timer instance is running; otherwise, false.s
     */
    getIsRunning() {
        return this.IsRunning;
    }
    /**
     * Starts this timer instance.
     */
    start() {
        var timeout = 0;
        window.clearTimeout(this.TimerID);
        if (this.EndTime == null || this.StartTime == null) {
            this.StartTime = new Date();
            timeout = this.Duration;
            this.EndTime = new Date(this.StartTime.getTime() + timeout);
        }
        else {
            timeout = this.getRemainingTime();
            //this.EndTime = new Date(
            //this.Duration + this.StartTime.getTime() - this.EndTime.getTime());
            this.EndTime.setTime(this.getRemainingTime() + new Date().getTime());
            this.StartTime = new Date();
        }
        this.TimerID = window.setTimeout(this.OnElapseHandler, timeout);
        this.IsRunning = true;
    }
    /**
     * Pauses this timer instance.  One can resume the timer by calling
     * the start method.
     */
    pause() {
        window.clearTimeout(this.TimerID);
        //this.RemainingTime.setTime(this.getRemainingTime());
        this.StartTime = new Date();
        this.IsRunning = false;
    }
    /**
     * Stops this timer instance.
     */
    stop() {
        window.clearTimeout(this.TimerID);
        this.StartTime = null;
        this.EndTime = null;
        //this.RemainingTime = new Date();
        this.IsRunning = false;
    }
    /**
     * Resets this timer instance.
     */
    reset() {
        this.stop();
        this.start();
    }
}
//# sourceMappingURL=timer.js.map