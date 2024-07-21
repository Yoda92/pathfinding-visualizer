import { Action } from 'src/models/action.model';
import { ActionVisitor } from 'src/models/actionVisitor.model';

export class SpeedAction implements Action {
  private value: number;

  constructor(value: number) {
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }

  setValue(value: number): void {
    this.value = value;
  }

  accept(visitor: ActionVisitor) {
    visitor.onSpeedAction(this);
  } 
}
