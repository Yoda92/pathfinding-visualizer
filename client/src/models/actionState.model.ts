import { ChoiceItem } from './choiceItem.model';
import { PathfindingAlgorithmType } from './pathfindingAlgorithmType.model';
import { TerrainGeneratorType } from './terrainGeneratorType.model';

export class ActionState {
  speed: number;
  isPlaying: boolean;
  isDisabled: boolean;
  terrainGenerator: ChoiceItem<TerrainGeneratorType>;
  pathfindingAlgorithm: ChoiceItem<PathfindingAlgorithmType>;

  constructor(
    speed: number,
    isPlaying: boolean,
    isDisabled: boolean,
    terrainGenerator: ChoiceItem<TerrainGeneratorType>,
    pathfindingAlgorithm: ChoiceItem<PathfindingAlgorithmType>
  ) {
    this.speed = speed;
    this.isPlaying = isPlaying;
    this.isDisabled = isDisabled;
    this.terrainGenerator = terrainGenerator;
    this.pathfindingAlgorithm = pathfindingAlgorithm;
  }
}
