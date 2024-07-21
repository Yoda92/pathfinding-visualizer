import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  faCirclePlay,
  faCircleStop,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';
import { PlayAction } from 'src/actions/play.action';
import { ResetAction } from 'src/actions/reset.action';
import { PathfindingAlgorithmChoiceAction } from 'src/actions/pathfindingAlgorithmChoice.action';
import { SpeedAction } from 'src/actions/speed.action';
import { TerrainGeneratorChoiceAction } from 'src/actions/terrainGeneratorChoice.action';
import { Action } from 'src/models/action.model';
import { ActionState } from 'src/models/actionState.model';
import { ActionVisitor } from 'src/models/actionVisitor.model';
import { ChoiceItem } from 'src/models/choiceItem.model';
import { PathfindingAlgorithmType } from 'src/models/pathfindingAlgorithmType.model';
import { TerrainGeneratorType } from 'src/models/terrainGeneratorType.model';
import { StateService } from 'src/services/stateService/state.service';
import { PathfindingAlgorithmUtility } from 'src/utilities/pathfindingAlgorithm.utility';
import { TerrainGeneratorUtility } from 'src/utilities/terrainGenerator.utility';
import { DisabledAction } from 'src/actions/disabled.action';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements ActionVisitor, OnInit {
  @ViewChild('hamburger') hamburger?: ElementRef<HTMLInputElement>;
  @ViewChild('navmenu') navmenu?: ElementRef<HTMLInputElement>;
  public faCirclePlay = faCirclePlay;
  public faCircleStop = faCircleStop;
  public faRefresh = faRefresh;
  public isPlaying: boolean;
  public isDisabled: boolean;
  public speed: number;
  public pathfindingAlgorithmChoices: Array<
    ChoiceItem<PathfindingAlgorithmType>
  >;
  public selectedPathfindingAlgorithm: ChoiceItem<PathfindingAlgorithmType>;
  public terrainGeneratorChoices: Array<ChoiceItem<TerrainGeneratorType>>;
  public selectedTerrainGenerator: ChoiceItem<TerrainGeneratorType>;

  constructor(
    private stateService: StateService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    let actionState: ActionState = this.stateService.getActionState();
    this.isPlaying = actionState.isPlaying;
    this.isDisabled = actionState.isDisabled;
    this.speed = actionState.speed;
    this.selectedPathfindingAlgorithm = actionState.pathfindingAlgorithm;
    this.selectedTerrainGenerator = actionState.terrainGenerator;
    this.pathfindingAlgorithmChoices =
      PathfindingAlgorithmUtility.getPathfindingAlgorithmChoices();
    this.terrainGeneratorChoices =
      TerrainGeneratorUtility.getTerrainGeneratorChoices();
    this.stateService
      .observeAction()
      .subscribe((action: Action) => this.handleAction(action));
  }

  ngOnInit(): void {
    document.querySelectorAll('.nav-item').forEach((navItem) => {
      navItem.addEventListener('click', () => this.closeHamburgerMenu());
    });
  }

  public closeHamburgerMenu(): void {
    this.hamburger?.nativeElement.classList.remove('active');
    this.navmenu?.nativeElement.classList.remove('active');
  }

  public onHamburgerClick(): void {
    this.hamburger?.nativeElement.classList.toggle('active');
    this.navmenu?.nativeElement.classList.toggle('active');
  }

  public onPlayAction(action: PlayAction): void {
    this.isPlaying = action.getValue();
  }

  public onDisabledAction(action: DisabledAction): void {
    this.isDisabled = action.getValue();
    this.changeDetectorRef.detectChanges();
  }

  public onResetAction(_: ResetAction): void {}

  public onSpeedAction(_: SpeedAction): void {}

  public onPathfindingAlgorithmChoiceAction(
    _: PathfindingAlgorithmChoiceAction
  ): void {}

  public onPathfindingAlgorithmChoiceChange(
    item: ChoiceItem<PathfindingAlgorithmType>
  ): void {
    this.stateService.publishPathfindingAlgorithmChoice(item);
  }

  public onTerrainGeneratorChoiceAction(
    _: TerrainGeneratorChoiceAction
  ): void {}

  public onTerrainGeneratorChoiceChange(
    item: ChoiceItem<TerrainGeneratorType>
  ): void {
    this.stateService.publishTerrainGeneratorChoice(item);
  }

  public onStartStopClick(): void {
    this.isPlaying = !this.isPlaying;
    this.stateService.publishIsPlaying(this.isPlaying);
    if (this.isPlaying) {
      this.closeHamburgerMenu();
    }
  }

  public onShuffleClick(): void {
    this.stateService.publishShuffle();
  }

  public onSpeedChange(): void {
    this.stateService.publishSpeed(this.speed);
  }

  private handleAction(action: Action) {
    action.accept(this);
  }
}
