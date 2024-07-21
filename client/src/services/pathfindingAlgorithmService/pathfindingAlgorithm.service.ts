import { Injectable } from '@angular/core';
import { Node } from 'src/models/node.model';
import { DijkstraPathfindingAlgorithm } from './pathfindingAlgorithms/dijkstra.algorithm';
import { SleepToken } from 'src/tokens/sleep.token';
import { CancellationToken } from 'src/tokens/cancelation.token';
import { CancelError } from 'src/errors/cancel.error';
import { PathfindingAlgorithmType } from 'src/models/pathfindingAlgorithmType.model';
import { PathfindingAlgorithmVisitor } from 'src/models/pathfindingAlgorithmVisitor.model';
import { AStarPathfindingAlgorithm } from './pathfindingAlgorithms/aStar.algorithm';
import { Grid } from 'src/models/grid.model';
import { RandomWalkPathfindingAlgorithm } from './pathfindingAlgorithms/randomWalk.algorithm';
import { AStartWithManhattenHeuristicPathfindingAlgorithm } from './pathfindingAlgorithms/aStarWithManhattenHeuristic.algorithm';

@Injectable({
  providedIn: 'root',
})
export class PathfindingAlgorithmService
  implements PathfindingAlgorithmVisitor
{
  constructor() {}
  public async run(
    grid: Grid,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken,
    pathfindingAlgorithm: PathfindingAlgorithmType
  ): Promise<void> {
    return pathfindingAlgorithm.accept(
      this,
      grid,
      sleepToken,
      cancellationToken
    );
  }

  public async runDijkstraPathfindingAlgorithm(
    grid: Grid,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken
  ): Promise<void> {
    return DijkstraPathfindingAlgorithm.run(
      grid,
      sleepToken,
      cancellationToken
    ).catch(this.handleError);
  }

  public async runAStarPathfindingAlgorithm(
    grid: Grid,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken
  ): Promise<void> {
    return AStartWithManhattenHeuristicPathfindingAlgorithm.run(
      grid,
      sleepToken,
      cancellationToken
    ).catch(this.handleError);
  }

  public async runRandomWalkPathfindingAlgorithm(
    grid: Grid,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken
  ): Promise<void> {
    return RandomWalkPathfindingAlgorithm.run(
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
