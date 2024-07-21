export class CancellationToken {
  private _isCancelled: boolean;

  constructor(value: boolean) {
    this._isCancelled = value;
  }

  isCancelled(): boolean {
    return this._isCancelled;
  }

  setCancelled(value: boolean): void {
    this._isCancelled = value;
  }
}
