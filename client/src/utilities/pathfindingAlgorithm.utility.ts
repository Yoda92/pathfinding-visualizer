import { ChoiceItem } from 'src/models/choiceItem.model';
import { PathfindingAlgorithmType } from 'src/models/pathfindingAlgorithmType.model';
import { AStarPathfinding as AStarPathfinding } from 'src/pathfindingTypes/aStarPathfinding';
import { DijkstraPathfinding as DijkstraPathfinding } from 'src/pathfindingTypes/dijkstraPathfinding';
import { RandomWalkPathfinding } from 'src/pathfindingTypes/randomWalkPathfinding';

export class PathfindingAlgorithmUtility {
  public static getPathfindingAlgorithmChoices(): Array<
    ChoiceItem<PathfindingAlgorithmType>
  > {
    let sortingAlgorithmChoices: Array<ChoiceItem<PathfindingAlgorithmType>> = [
      { label: 'A*', value: new AStarPathfinding() },
      { label: 'Dijkstra', value: new DijkstraPathfinding() },
      { label: 'Random Walk', value: new RandomWalkPathfinding() },
    ];

    return sortingAlgorithmChoices;
  }
}
