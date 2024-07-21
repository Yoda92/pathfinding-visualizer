import { Node } from 'src/models/node.model';
import { AStarPathfindingAlgorithm } from './aStar.algorithm';

export class AStartWithManhattenHeuristicPathfindingAlgorithm extends AStarPathfindingAlgorithm {
  static override heuristicCostFromNodeToGoal(n: Node, goalNode: Node): number {
    return (
      Math.abs(n.column - goalNode.column) + Math.abs(n.row - goalNode.row)
    );
  }
}
