import { CancellationToken } from 'src/tokens/cancelation.token';
import { SleepToken } from 'src/tokens/sleep.token';
import { Grid } from './grid.model';
import { Node } from './node.model';
import { TerrainGeneratorVisitor } from './terrainGeneratorVisitor.model';

export interface TerrainGeneratorType {
  accept(
    visitor: TerrainGeneratorVisitor,
    grid: Grid,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken
  ): void;
}
