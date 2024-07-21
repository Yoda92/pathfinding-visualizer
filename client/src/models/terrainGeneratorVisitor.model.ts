import { CancellationToken } from 'src/tokens/cancelation.token';
import { SleepToken } from 'src/tokens/sleep.token';
import { Grid } from './grid.model';

export interface TerrainGeneratorVisitor {
  runRecursiveMazeTerrainGenerator(
    grid: Grid,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken
  ): void;

  runRandomObstaclesTerrainGenerator(
    grid: Grid,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken
  ): void;
}
