import { CancellationToken } from 'src/tokens/cancelation.token';
import { SleepToken } from 'src/tokens/sleep.token';
import { Grid } from './grid.model';
import { PathfindingAlgorithmVisitor } from './pathfindingAlgorithmVisitor.model';

export interface PathfindingAlgorithmType {
  accept(
    visitor: PathfindingAlgorithmVisitor,
    grid: Grid,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken
  ): void;
}
