"use strict";
/**
 * Raises an onElapsed event after a specified number of milliseconds.
 */
class Timer {
    /**
     * Instantiates a new instance of Timer.
     * @param duration Length of the timer in milliseconds.
     * @param onElapseHandler Callback method called when the timer finishes.
     * @param autoStart True to start the timer immediately; otherwise, false.
     */
    constructor(duration, onElapseHandler, autoStart = true) {
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
         * The remaining time left for this timer instance before elapsing.
         */
        this.remainingTime = null;
        /**
         * Callback method that is called when the timer finishes.
         */
        this.onElapseHandler = null;
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
     * Gets the remaining time before this timer instance elapses.
     */
    get RemainingTime() {
        return this.remainingTime;
    }
    /**
     * Sets the remaining time before this timer instance elapses.
     */
    set RemainingTime(remainingTime) {
        this.remainingTime = remainingTime;
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
    getDuration() {
        return this.Duration;
    }
    getRemainingTime() {
        return Math.max(this.RemainingTime.getTime() - new Date().getTime() - this.StartTime.getTime(), 0);
    }
    /**
     * Starts this timer instance.
     */
    start() {
        window.clearTimeout(this.TimerID);
        this.StartTime = new Date();
        if (this.RemainingTime == null) {
            this.RemainingTime = new Date(this.StartTime.getTime() + this.Duration);
        }
        this.TimerID = window.setTimeout(this.OnElapseHandler, this.StartTime.getTime());
    }
    /**
     * Pauses this timer instance.  One can resume the timer by calling
     * the start method.
     */
    pause() {
        window.clearTimeout(this.TimerID);
        this.RemainingTime.setTime(this.getRemainingTime());
    }
    /**
     * Stops this timer instance.
     */
    stop() {
        window.clearTimeout(this.TimerID);
        this.RemainingTime = null;
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