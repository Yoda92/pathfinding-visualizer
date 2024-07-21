import { CancelError } from 'src/errors/cancel.error';
import { Grid } from 'src/models/grid.model';
import { NodeType } from 'src/models/nodeType.model';
import { GridNodesPipe } from 'src/pipes/gridNodes.pipe';
import { CancellationToken } from 'src/tokens/cancelation.token';
import { SleepToken } from 'src/tokens/sleep.token';

export abstract class TerrainGenerator {
  protected static fastSleepToken: SleepToken = new SleepToken(10);

  public static async run(
    _: Grid,
    __: SleepToken,
    ___: CancellationToken
  ): Promise<void> {
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
