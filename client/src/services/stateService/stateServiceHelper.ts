import { ActionState } from 'src/models/actionState.model';
import { PathfindingAlgorithmUtility } from 'src/utilities/pathfindingAlgorithm.utility';
import { TerrainGeneratorUtility } from 'src/utilities/terrainGenerator.utility';

export class StateServiceHelper {
  private static readonly defaultSpeed: number = 250;
  private static readonly defaultIsPlaying: boolean = false;
  private static readonly defaultIsDisabled: boolean = false;
  private static readonly defaultTerrainGeneratorChoice =
    TerrainGeneratorUtility.getTerrainGeneratorChoices()[0];
  private static readonly defaultPathfindingAlgorithmChoice =
    PathfindingAlgorithmUtility.getPathfindingAlgorithmChoices()[0];

  public static createInitActionState(): ActionState {
    let actionState: ActionState = new ActionState(
      StateServiceHelper.defaultSpeed,
      StateServiceHelper.defaultIsPlaying,
      StateServiceHelper.defaultIsDisabled,
      StateServiceHelper.defaultTerrainGeneratorChoice,
      StateServiceHelper.defaultPathfindingAlgorithmChoice
    );

    return actionState;
  }
}
