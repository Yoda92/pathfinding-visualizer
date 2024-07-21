import { Node } from 'src/models/node.model';
import { AStarPathfindingAlgorithm } from './aStar.algorithm';

export class DijkstraPathfindingAlgorithm extends AStarPathfindingAlgorithm {
  static override heuristicCostFromNodeToGoal(n: Node, goalNode: Node): number {
    return 0;
  }
}
