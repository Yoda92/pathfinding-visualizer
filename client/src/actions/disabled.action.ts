import { Action } from 'src/models/action.model';
import { ActionVisitor } from 'src/models/actionVisitor.model';

export class DisabledAction implements Action {
  private value: boolean;

  constructor(value: boolean) {
    this.value = value;
  }

  getValue(): boolean {
    return this.value;
  }

  setValue(value: boolean): void {
    this.value = value;
  }

  accept(visitor: ActionVisitor) {
    visitor.onDisabledAction(this);
  } 
}
