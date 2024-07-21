import { CancellationToken } from 'src/tokens/cancelation.token';
import { SleepToken } from 'src/tokens/sleep.token';
import { Grid } from './grid.model';

export interface PathfindingAlgorithmVisitor {
  runDijkstraPathfindingAlgorithm(
    grid: Grid,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken
  ): void;

  runAStarPathfindingAlgorithm(
    grid: Grid,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken
  ): void;

  runRandomWalkPathfindingAlgorithm(
    grid: Grid,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken
  ): void;
}
