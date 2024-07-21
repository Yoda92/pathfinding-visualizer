export class SleepToken {
  private delay: number;

  constructor(delay: number) {
    this.delay = delay;
  }

  public getValue(): number {
    return this.delay;
  }

  public setValue(value: number) {
    this.delay = value;
  }

  public sleep(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.delay));
  }
}
