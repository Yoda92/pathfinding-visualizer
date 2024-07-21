import { Action } from "src/models/action.model";
import { ActionVisitor } from "src/models/actionVisitor.model";
import { ChoiceItem } from "src/models/choiceItem.model";
import { PathfindingAlgorithmType } from "src/models/pathfindingAlgorithmType.model";

export class PathfindingAlgorithmChoiceAction implements Action {
    private value: ChoiceItem<PathfindingAlgorithmType>;
  
    constructor(value: ChoiceItem<PathfindingAlgorithmType>) {
      this.value = value;
    }
  
    getValue(): ChoiceItem<PathfindingAlgorithmType> {
      return this.value;
    }
  
    setValue(value: ChoiceItem<PathfindingAlgorithmType>): void {
      this.value = value;
    }
  
    accept(visitor: ActionVisitor) {
      visitor.onPathfindingAlgorithmChoiceAction(this);
    } 
  }
  