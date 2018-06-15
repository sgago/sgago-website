/**
 * Reperesents a timer that generates an onElapsed event
 * after a specified number of milliseconds.
 */
interface ITimer {

  /**
   * Gets the duration of the timer in milliseconds.
   */
  getDuration(): number;

  /**
   * Gets the start time of the timer in milliseconds.
   */
  getStartTime(): number;

  /**
   * Gets the end time of the timer in milliseconds.
   */
  getEndTime(): number;

  /**
   * Gets the remanining time of the timer in milliseconds.
   */
  getRemainingTime(): number;

  /**
   * True if the timer is running; otherwise, false.
   */
  getIsRunning(): boolean;

  /**
   * Starts the timer.
   */
  start(): void;

  /**
   * Pauses the timer.
   */
  pause(): void;

  /**
   * Stops the timer.
   */
  stop(): void;

  /**
   * Resets the timer.
   */
  reset(): void;
}


/**
 * Reperesents a timer that generates an onElapsed event
 * after a specified number of milliseconds.
 */
class Timer implements ITimer {
  
  /**
   * The timer's unique ID returned from the window.setTimeout method.
   */
  private timerId: number = 0;

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
   * The end time of this timer instance.
   */
  private endTime: Date = null;

  /**
   * True if this timer is running; otherwise, false.
   */
  private isRunning: boolean = false;


  /**
   * Callback method that is called when the timer finishes.
   */
  private onElapseHandler: (this: void) => void = function () {};

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
   * Gets this timer's end time.
   */
  private get EndTime(): Date {

    return this.endTime;
  }

  /**
   * Sets this timer's end time.
   */
  private set EndTime(endTime: Date) {

    this.endTime = endTime;
  }

  /**
   * Gets true if this timer is running; otherwise, false.
   */
  private get IsRunning(): boolean {

    return this.isRunning;
  }

  /**
   * Set to true if this timer is running; otherwise, false.
   */
  private set IsRunning(isRunning: boolean) {

    this.isRunning = isRunning;
  }


  /**
   * Gets the remaining time before this timer instance elapses.
   */
  private get RemainingTime(): Date {

    if (this.IsRunning) {
      return new Date(
        Math.max(this.EndTime.getTime() - new Date().getTime(), 0)
      );
    }
    else {
      return new Date(
        Math.max(this.EndTime.getTime() - this.StartTime.getTime(), 0)
      );
    }
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

  /**
   * Gets the duration of this timer instance in milliseconds.
   */
  public getDuration(): number {

    return this.Duration;
  }

  /**
   * Gets the start time of this timer instance in milliseconds.
   */
  public getStartTime(): number {

    return this.StartTime.getTime();
  }

  /**
   * Gets the end time of this timer instance in milliseconds.
   */
  public getEndTime(): number {

    return this.EndTime.getTime();
  }

  /**
   * Gets the remaning time left on this timer instance in milliseconds.
   */
  public getRemainingTime(): number {

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
  public getIsRunning() {

    return this.IsRunning;
  }

  /**
   * Starts this timer instance.
   */
  public start() {

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
  public pause() {

    window.clearTimeout(this.TimerID);

    //this.RemainingTime.setTime(this.getRemainingTime());

    this.StartTime = new Date();

    this.IsRunning = false;
  }

  /**
   * Stops this timer instance.
   */
  public stop() {

    window.clearTimeout(this.TimerID);

    this.StartTime = null;
    this.EndTime = null;

    //this.RemainingTime = new Date();

    this.IsRunning = false;
  }

  /**
   * Resets this timer instance.
   */
  public reset() {

    this.stop();
    this.start();
  }
}
