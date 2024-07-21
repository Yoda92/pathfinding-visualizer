import { Grid } from 'src/models/grid.model';
import { TerrainGeneratorType } from 'src/models/terrainGeneratorType.model';
import { TerrainGeneratorVisitor } from 'src/models/terrainGeneratorVisitor.model';
import { CancellationToken } from 'src/tokens/cancelation.token';
import { SleepToken } from 'src/tokens/sleep.token';

export class RandomObstaclesTerrainGenerator implements TerrainGeneratorType {
  public async accept(
    visitor: TerrainGeneratorVisitor,
    grid: Grid,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken
  ): Promise<void> {
    return visitor.runRandomObstaclesTerrainGenerator(
      grid,
      sleepToken,
      cancellationToken
    );
  }
}
