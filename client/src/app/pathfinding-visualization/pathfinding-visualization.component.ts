import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { debounceTime, fromEvent, throttleTime } from 'rxjs';
import { DisabledAction } from 'src/actions/disabled.action';
import { PathfindingAlgorithmChoiceAction } from 'src/actions/pathfindingAlgorithmChoice.action';
import { PlayAction } from 'src/actions/play.action';
import { ResetAction } from 'src/actions/reset.action';
import { SpeedAction } from 'src/actions/speed.action';
import { TerrainGeneratorChoiceAction } from 'src/actions/terrainGeneratorChoice.action';
import { Action } from 'src/models/action.model';
import { ActionState } from 'src/models/actionState.model';
import { ActionVisitor } from 'src/models/actionVisitor.model';
import { ChoiceItem } from 'src/models/choiceItem.model';
import { Grid } from 'src/models/grid.model';
import { NodeType } from 'src/models/nodeType.model';
import { PathfindingAlgorithmType } from 'src/models/pathfindingAlgorithmType.model';
import { TerrainGeneratorType } from 'src/models/terrainGeneratorType.model';
import { PathfindingAlgorithmService } from 'src/services/pathfindingAlgorithmService/pathfindingAlgorithm.service';
import { StateService } from 'src/services/stateService/state.service';
import { TerrainGeneratorService } from 'src/services/terrainGeneratorService/terrainGenerator.service';
import { CancellationToken } from 'src/tokens/cancelation.token';
import { SleepToken } from 'src/tokens/sleep.token';

@Component({
  selector: 'app-pathfinding-visualization',
  templateUrl: './pathfinding-visualization.component.html',
  styleUrls: ['./pathfinding-visualization.component.css'],
})
export class PathfindingVisualizationComponent
  implements ActionVisitor, AfterViewInit
{
  @ViewChild('gridWrapper') gridWrapper!: ElementRef;
  public grid: Grid | undefined;
  private pathfindingAlgorithmChoice: ChoiceItem<PathfindingAlgorithmType>;
  private terrainGeneratorChoice: ChoiceItem<TerrainGeneratorType>;
  private sleepToken: SleepToken;
  private cancellationToken: CancellationToken;
  private readonly CELL_TARGET_SIZE: number = 25;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private stateService: StateService,
    private pathfindingAlgorithmService: PathfindingAlgorithmService,
    private terrainGeneratorService: TerrainGeneratorService
  ) {
    this.stateService
      .observeAction()
      .subscribe((action: Action) => this.handleAction(action));
    let actionState: ActionState = this.stateService.getActionState();
    this.sleepToken = new SleepToken(actionState.speed);
    this.cancellationToken = new CancellationToken(actionState.isPlaying);
    this.pathfindingAlgorithmChoice = actionState.pathfindingAlgorithm;
    this.terrainGeneratorChoice = actionState.terrainGenerator;
    fromEvent(window, 'resize')
      .pipe(throttleTime(250), debounceTime(500))
      .subscribe(() => {
        this.stateService.publishIsPlaying(false);
        this.resetGrid();
      });
  }

  ngAfterViewInit(): void {
    this.resetGrid();
    this.changeDetectorRef.detectChanges();
  }

  private resetGrid(): void {
    let gridWidth: number = this.gridWrapper.nativeElement.offsetWidth;
    let gridHeight: number = this.gridWrapper.nativeElement.offsetHeight;
    let rowCount: number = Math.round(gridHeight / this.CELL_TARGET_SIZE);
    if (rowCount % 2 === 0) {
      rowCount++;
    }
    let columnCount: number = Math.round(gridWidth / this.CELL_TARGET_SIZE);
    if (columnCount % 2 === 0) {
      columnCount++;
    }
    this.grid = new Grid(rowCount, columnCount);
    this.stateService.publishTerrainGeneratorChoice(
      this.terrainGeneratorChoice
    );
  }

  public async onTerrainGeneratorChoiceAction(
    action: TerrainGeneratorChoiceAction
  ): Promise<void> {
    if (!this.grid) {
      return;
    }

    this.terrainGeneratorChoice = action.getValue();
    this.stateService.publishIsDisabled(true);
    await this.terrainGeneratorService.run(
      this.grid,
      this.sleepToken,
      new CancellationToken(false),
      action.getValue().value
    );
    this.stateService.publishIsDisabled(false);
  }

  public onResetAction(_: ResetAction): void {
    this.resetGrid();
  }

  public onPlayAction(action: PlayAction): void {
    if (action.getValue()) {
      this.cancellationToken.setCancelled(false);
      this.clear();
      this.play();
    } else {
      this.cancellationToken.setCancelled(true);
    }
  }

  public onDisabledAction(action: DisabledAction): void {}

  public onSpeedAction(action: SpeedAction): void {
    this.sleepToken.setValue(action.getValue());
  }

  public onPathfindingAlgorithmChoiceAction(
    action: PathfindingAlgorithmChoiceAction
  ): void {
    this.pathfindingAlgorithmChoice = action.getValue();
  }

  private clear(): void {
    if (!this.grid) {
      return;
    }

    this.grid
      .getNodes()
      .flatMap((row) => row)
      .forEach((node) => {
        if (node.type === NodeType.VISITED ||node.type === NodeType.SELECTED) {
          node.type = NodeType.DEFAULT;
        }
      });
  }

  private handleAction(action: Action) {
    action.accept(this);
  }

  private async play() {
    if (!this.grid) {
      return;
    }

    await this.pathfindingAlgorithmService
      .run(
        this.grid,
        this.sleepToken,
        this.cancellationToken,
        this.pathfindingAlgorithmChoice.value
      )
      .finally(() => this.stateService.publishIsPlaying(false));
  }
}
