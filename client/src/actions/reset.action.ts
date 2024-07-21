import { Action } from 'src/models/action.model';
import { ActionVisitor } from 'src/models/actionVisitor.model';

export class ResetAction implements Action {
  constructor() {}
  accept(visitor: ActionVisitor) {
    visitor.onResetAction(this);
  }
}
