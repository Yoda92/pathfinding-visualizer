import { Action } from "src/models/action.model";
import { ActionVisitor } from "src/models/actionVisitor.model";
import { ChoiceItem } from "src/models/choiceItem.model";
import { TerrainGeneratorType as TerrainGeneratorType } from "src/models/terrainGeneratorType.model";

export class TerrainGeneratorChoiceAction implements Action {
    private value: ChoiceItem<TerrainGeneratorType>;
  
    constructor(value: ChoiceItem<TerrainGeneratorType>) {
      this.value = value;
    }
  
    getValue(): ChoiceItem<TerrainGeneratorType> {
      return this.value;
    }
  
    setValue(value: ChoiceItem<TerrainGeneratorType>): void {
      this.value = value;
    }
  
    accept(visitor: ActionVisitor) {
      visitor.onTerrainGeneratorChoiceAction(this);
    } 
  }
  