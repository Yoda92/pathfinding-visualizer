import { Grid } from 'src/models/grid.model';
import { Node } from 'src/models/node.model';
import { PathfindingAlgorithmType } from 'src/models/pathfindingAlgorithmType.model';
import { PathfindingAlgorithmVisitor } from 'src/models/pathfindingAlgorithmVisitor.model';
import { CancellationToken } from 'src/tokens/cancelation.token';
import { SleepToken } from 'src/tokens/sleep.token';

export class AStarPathfinding implements PathfindingAlgorithmType {
  public async accept(
    visitor: PathfindingAlgorithmVisitor,
    grid: Grid,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken
  ): Promise<void> {
    return visitor.runAStarPathfindingAlgorithm(grid, sleepToken, cancellationToken);
  }
}
