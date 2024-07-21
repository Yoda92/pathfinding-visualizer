import { PlayAction } from 'src/actions/play.action';
import { ResetAction } from 'src/actions/reset.action';
import { PathfindingAlgorithmChoiceAction } from 'src/actions/pathfindingAlgorithmChoice.action';
import { SpeedAction } from 'src/actions/speed.action';
import { TerrainGeneratorChoiceAction } from 'src/actions/terrainGeneratorChoice.action';
import { DisabledAction } from 'src/actions/disabled.action';

export interface ActionVisitor {
  onPlayAction(action: PlayAction): void;
  onDisabledAction(action: DisabledAction): void;
  onResetAction(action: ResetAction): void;
  onSpeedAction(action: SpeedAction): void;
  onPathfindingAlgorithmChoiceAction(action: PathfindingAlgorithmChoiceAction): void;
  onTerrainGeneratorChoiceAction(action: TerrainGeneratorChoiceAction): void;
}
