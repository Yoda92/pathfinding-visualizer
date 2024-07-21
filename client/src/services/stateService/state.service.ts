import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PlayAction } from 'src/actions/play.action';
import { ResetAction } from 'src/actions/reset.action';
import { PathfindingAlgorithmChoiceAction } from 'src/actions/pathfindingAlgorithmChoice.action';
import { SpeedAction } from 'src/actions/speed.action';
import { TerrainGeneratorChoiceAction } from 'src/actions/terrainGeneratorChoice.action';
import { Action } from 'src/models/action.model';
import { ActionState } from 'src/models/actionState.model';
import { ChoiceItem } from 'src/models/choiceItem.model';
import { PathfindingAlgorithmType } from 'src/models/pathfindingAlgorithmType.model';
import { TerrainGeneratorType } from 'src/models/terrainGeneratorType.model';
import { StateServiceHelper } from './stateServiceHelper';
import { DisabledAction } from 'src/actions/disabled.action';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private actionSubject: Subject<Action>;
  private actionState: ActionState;

  private constructor() {
    this.actionSubject = new Subject();
    this.actionState = StateServiceHelper.createInitActionState();
  }

  public getActionState(): ActionState {
    return this.actionState;
  }

  public observeAction(): Observable<Action> {
    return this.actionSubject.asObservable();
  }

  public publishIsPlaying(value: boolean): void {
    this.actionState.isPlaying = value;
    this.publishAction(new PlayAction(this.actionState.isPlaying));
  }

  public publishIsDisabled(value: boolean): void {
    this.actionState.isDisabled = value;
    this.publishAction(new DisabledAction(this.actionState.isDisabled));
  }

  public publishShuffle(): void {
    this.publishAction(new ResetAction());
  }

  public publishSpeed(value: number): void {
    this.actionState.speed = value;
    this.publishAction(new SpeedAction(this.actionState.speed));
  }

  public publishTerrainGeneratorChoice(value: ChoiceItem<TerrainGeneratorType>): void {
    this.actionState.terrainGenerator = value;
    this.publishAction(new TerrainGeneratorChoiceAction(this.actionState.terrainGenerator));
  }

  public publishPathfindingAlgorithmChoice(value: ChoiceItem<PathfindingAlgorithmType>): void {
    this.actionState.pathfindingAlgorithm = value;
    this.publishAction(new PathfindingAlgorithmChoiceAction(this.actionState.pathfindingAlgorithm));
  }

  private publishAction(action: Action): void {
    this.actionSubject.next(action);
  }
}
