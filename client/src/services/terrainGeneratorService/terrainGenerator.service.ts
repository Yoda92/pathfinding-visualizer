import { Injectable } from '@angular/core';
import { Node } from 'src/models/node.model';
import { TerrainGeneratorVisitor } from 'src/models/terrainGeneratorVisitor.model';
import { TerrainGeneratorType } from 'src/models/terrainGeneratorType.model';
import { RecursiveMazeTerrainGenerator } from './terrainGenerators/recursiveMaze.terrainGenerator';
import { Grid } from 'src/models/grid.model';
import { SleepToken } from 'src/tokens/sleep.token';
import { CancellationToken } from 'src/tokens/cancelation.token';
import { CancelError } from 'src/errors/cancel.error';
import { RandomObstaclesTerrainGenerator } from './terrainGenerators/randomObstacles.terrainGenerator';

@Injectable({
  providedIn: 'root',
})
export class TerrainGeneratorService implements TerrainGeneratorVisitor {
  constructor() {}

  public async run(
    grid: Grid,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken,
    terrainGeneratorType: TerrainGeneratorType
  ): Promise<void> {
    return terrainGeneratorType.accept(
      this,
      grid,
      sleepToken,
      cancellationToken
    );
  }

  public async runRecursiveMazeTerrainGenerator(
    grid: Grid,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken
  ): Promise<void> {
    return RecursiveMazeTerrainGenerator.run(
      grid,
      sleepToken,
      cancellationToken
    ).catch(this.handleError);
  }

  public async runRandomObstaclesTerrainGenerator(
    grid: Grid,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken
  ): Promise<void> {
    return RandomObstaclesTerrainGenerator.run(
      grid,
      sleepToken,
      cancellationToken
    ).catch(this.handleError);
  }

  private handleError(error: unknown): void {
    if (error instanceof CancelError) {
      return;
    }

    throw error;
  }
}
