
interface ISlfyTimers {

  add(duration: number,
    onElapseHandler: (this: void) => void,
    autoStart: boolean): void;

  next(duration: number,
    onElapseHandler: (this: void) => void,
    autoStart: boolean): void;

  entries(): IterableIterator<[number, ITimer]>;
  keys(): IterableIterator<number>;
  values(): IterableIterator<ITimer>;

  start(): void;
  pause(): void;
  stop(): void;
  reset(): void;
}


class SlfyTimers extends Array<ITimer> implements ISlfyTimers {

  public get TotalDuration(): number {

    let duration: number = 0;

    this.forEach(x => duration += x.getDuration());

    return duration;
  }

  constructor() {
    super();

    this.add(0, () => {}, false);
  }

  public start() {
    this.forEach(x => x.start());
  }

  public stop() {
    this.forEach(x => x.stop());
  }

  public pause() {
    this.forEach(x => x.pause());
  }

  public reset() {
    this.forEach(x => x.reset());
  }

  public add(duration: number,
    onElapseHandler: (this: void) => void,
    autoStart: boolean = false) {

    let newTimer = new Timer(duration, onElapseHandler, autoStart);

    this.push(newTimer);
  }

  public next(duration: number,
    onElapseHandler: (this: void) => void,
    autoStart: boolean = false) {

    let newTimer = new Timer(this[this.length - 1].getDuration() + duration, onElapseHandler, autoStart);

    this.push(newTimer);
  }
}