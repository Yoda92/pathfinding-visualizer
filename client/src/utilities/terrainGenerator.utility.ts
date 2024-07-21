import { ChoiceItem } from 'src/models/choiceItem.model';
import { TerrainGeneratorType } from 'src/models/terrainGeneratorType.model';
import { RandomObstaclesTerrainGenerator } from 'src/terrainGeneratorTypes/randomObstacles.terrainGenerator';
import { RecursiveMazeTerrainGenerator } from 'src/terrainGeneratorTypes/recursiveMaze.terrainGenerator';

export class TerrainGeneratorUtility {
  public static getTerrainGeneratorChoices(): Array<
    ChoiceItem<TerrainGeneratorType>
  > {
    let terrainGeneratorChoices: Array<ChoiceItem<TerrainGeneratorType>> = [
      { label: 'Recursive Maze', value: new RecursiveMazeTerrainGenerator() },
      {
        label: 'Random Obstacles',
        value: new RandomObstaclesTerrainGenerator(),
      },
    ];

    return terrainGeneratorChoices;
  }
}
