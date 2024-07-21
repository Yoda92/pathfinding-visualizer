import { CancelError } from 'src/errors/cancel.error';
import { Grid } from 'src/models/grid.model';
import { CancellationToken } from 'src/tokens/cancelation.token';
import { SleepToken } from 'src/tokens/sleep.token';
import { Node } from '../../../models/node.model';

export abstract class PathfindingAlgorithm {
  static async run(_: Grid, __: SleepToken, ___: CancellationToken): Promise<void> {
    throw new Error('Operation not supported.');
  }

  protected static async sleep(
    sleepToken: SleepToken,
    cancellationToken: CancellationToken
  ): Promise<void> {
    if (cancellationToken.isCancelled()) {
      throw new CancelError();
    }
    await sleepToken.sleep();
    if (cancellationToken.isCancelled()) {
      throw new CancelError();
    }
  }
}
