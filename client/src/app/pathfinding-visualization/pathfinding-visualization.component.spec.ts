import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NodeColorClassPipe } from 'src/pipes/nodeColorClass.pipe';
import { NodeWidthStylePipe } from 'src/pipes/nodeWidthStyle.pipe';
import { NodeHeightStylePipe } from 'src/pipes/nodeHeightStyle.pipe';

import { PathfindingVisualizationComponent } from './pathfinding-visualization.component';

describe('SortingVisualizationComponent', () => {
  let component: PathfindingVisualizationComponent;
  let fixture: ComponentFixture<PathfindingVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PathfindingVisualizationComponent,
        NodeColorClassPipe,
        LineHeightStylePipe,
        LineWidthStylePipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PathfindingVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
