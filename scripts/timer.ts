/**
 * Raises an onElapsed event after a specified number of milliseconds.
 */
class Timer {

  /**
   * The timer's unique ID returned from the window.setTimeout method.
   */
  private timerId = 0;

  /**
   * Duration of the timer in milliseconds before 
   * the timer expires and the onElapse callback method is called.
   */
  private duration: number = 0;

  /**
   * Callback method that is called when the timer finishes.
   */
  private onElapse: (this:void) => void = null;

  private startTime: Date = null;

  private remainingTime: Date = null;

  /**
   * Instantiates a new instance of Timer.
   * @param duration Length of the timer in milliseconds.
   * @param onElapse Callback method called when the timer finishes.
   * @param autoStart True to start the timer immediately; otherwise, false.
   */
  constructor (duration: number,
               onElapse: (this: void) => void,
               autoStart: boolean = true) {

    this.duration = duration;
    this.onElapse = onElapse;

    if (autoStart) {
        this.start();
    }
  }

  /**
   * Starts this timer instance.
   */
  public start() {
    this.startTime = new Date();
    window.clearTimeout(this.timerId);
    this.timerId = window.setTimeout(this.onElapse, this.remainingTime);
  }

  /**
   * Stops this timer instance.
   */
  public stop() {
    window.clearTimeout(this.timerId);
    this.remainingTime.setTime(this.remainingTime.getTime() -
                                new Date().getTime() -
                                this.startTime.getTime());
  }
}