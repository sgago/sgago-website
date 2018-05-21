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
   * The start time of this timer instance.
   */
  private startTime: Date = null;

  /**
   * The remaining time left for this timer instance before elapsing.
   */
  private remainingTime: Date = null;

  /**
   * Callback method that is called when the timer finishes.
   */
  private onElapseHandler: (this: void) => void = null;

  /**
   * Gets this timer's unique ID.
   */
  private get TimerID(): number {

    return this.timerId;
  }

  /**
   * Sets this timer's unique ID.
   */
  private set TimerID(timerId: number) {

    this.timerId = timerId;
  }

  /**
   * Gets the duration of this timer instance in milliseconds.
   */
  private get Duration(): number {

    return this.duration;
  }

  /**
   * Sets the duration of this timer instance in milliseconds.
   */
  private set Duration(duration: number) {

    this.duration = duration;
  }

  /**
   * Gets this timer's start time.
   */
  private get StartTime(): Date {

    return this.startTime;
  }

  /**
   * Sets this timer's start time.
   */
  private set StartTime (startTime: Date) {

    this.startTime = startTime;
  }

  /**
   * Gets the remaining time before this timer instance elapses.
   */
  private get RemainingTime(): Date {

    return this.remainingTime;
  }

  /**
   * Sets the remaining time before this timer instance elapses.
   */
  private set RemainingTime(remainingTime: Date) {

    this.remainingTime = remainingTime;
  }

  /**
   * Gets the callback method for this timer instance.
   */
  private get OnElapseHandler(): (this:void) => void {

    return this.onElapseHandler;
  }

  /**
   * Sets the callback method for this timer instance.
   */
  private set OnElapseHandler(onElapseHandler: (this:void) => void ) {

    this.onElapseHandler = onElapseHandler;
  }


  /**
   * Instantiates a new instance of Timer.
   * @param duration Length of the timer in milliseconds.
   * @param onElapseHandler Callback method called when the timer finishes.
   * @param autoStart True to start the timer immediately; otherwise, false.
   */
  constructor (duration: number,
               onElapseHandler: (this: void) => void,
               autoStart: boolean = true) {

    this.Duration = duration >= 0 ? duration : 0;
    this.OnElapseHandler = onElapseHandler;

    // Should we start the timer immediately?
    if (autoStart) {
        this.start();
    }
  }

  public getDuration(): number {
    return this.Duration;
  }

  public getRemainingTime(): number {

    return Math.max(this.RemainingTime.getTime() - new Date().getTime() - this.StartTime.getTime(), 0);
  }

  /**
   * Starts this timer instance.
   */
  public start() {
    
    window.clearTimeout(this.TimerID);

    this.StartTime = new Date();

    if (this.RemainingTime == null) {

      this.RemainingTime = new Date(this.StartTime.getTime() + this.Duration);
    }

    this.TimerID = window.setTimeout(this.OnElapseHandler, this.StartTime.getTime())
  }

  /**
   * Pauses this timer instance.  One can resume the timer by calling
   * the start method.
   */
  public pause() {

    window.clearTimeout(this.TimerID);

    this.RemainingTime.setTime(this.getRemainingTime());
  }

  /**
   * Stops this timer instance.
   */
  public stop() {

    window.clearTimeout(this.TimerID);

    this.RemainingTime = null;
  }

  /**
   * Resets this timer instance.
   */
  public reset() {

    this.stop();
    this.start();
  }
}