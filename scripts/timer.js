"use strict";
/**
 * Raises an onElapsed event after a specified number of milliseconds.
 */
var Timer = /** @class */ (function () {
    /**
     * Instantiates a new instance of Timer.
     * @param duration Length of the timer in milliseconds.
     * @param onElapse Callback method called when the timer finishes.
     * @param autoStart True to start the timer immediately; otherwise, false.
     */
    function Timer(duration, onElapse, autoStart) {
        if (autoStart === void 0) { autoStart = true; }
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
         * Callback method that is called when the timer finishes.
         */
        this.onElapse = null;
        this.startTime = null;
        this.remainingTime = null;
        this.duration = duration;
        this.onElapse = onElapse;
        if (autoStart) {
            this.start();
        }
    }
    /**
     * Starts this timer instance.
     */
    Timer.prototype.start = function () {
        this.startTime = new Date();
        window.clearTimeout(this.timerId);
        this.timerId = window.setTimeout(this.onElapse, this.remainingTime);
    };
    /**
     * Stops this timer instance.
     */
    Timer.prototype.stop = function () {
        window.clearTimeout(this.timerId);
        this.remainingTime.setTime(this.remainingTime.getTime() -
            new Date().getTime() -
            this.startTime.getTime());
    };
    return Timer;
}());
//# sourceMappingURL=timer.js.map