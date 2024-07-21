import { Area } from 'src/models/area.model';
import { Grid } from 'src/models/grid.model';
import { NodeType } from 'src/models/nodeType.model';
import { CancellationToken } from 'src/tokens/cancelation.token';
import { SleepToken } from 'src/tokens/sleep.token';
import { ArrayUtility } from 'src/utilities/array.utility';
import { MathUtility } from 'src/utilities/math.utility';
import { TerrainGenerator } from './terrainGenerator';

export class RecursiveMazeTerrainGenerator extends TerrainGenerator {
  public static override async run(
    grid: Grid,
    _: SleepToken,
    cancellationToken: CancellationToken
  ): Promise<void> {
    if (!grid) {
      return;
    }

    grid.setToDefault();
    await this.sleep(this.fastSleepToken, cancellationToken);
    this.createOuterWall(grid);
    await this.divide(
      grid,
      new Area(1, 1, grid.getColumns() - 1, grid.getRows() - 1),
      cancellationToken
    );
    let emptyNodes = grid.getNodesWithType(NodeType.DEFAULT);
    let startNode = ArrayUtility.randomElement(emptyNodes);
    startNode.type = NodeType.START;
    emptyNodes = grid.getNodesWithType(NodeType.DEFAULT);
    let expectedMinHorizontalDistance = Math.round(grid.getColumns() / 2) - 5;
    let expectedGoalNodeCandidates = emptyNodes.filter(
      (node) =>
        Math.abs(startNode.column - node.column) > expectedMinHorizontalDistance
    );
    let goalNode = ArrayUtility.randomElement(
      ArrayUtility.isEmpty(expectedGoalNodeCandidates)
        ? emptyNodes
        : expectedGoalNodeCandidates
    );
    goalNode.type = NodeType.GOAL;
  }

  private static createOuterWall(grid: Grid): void {
    let rowMaxIndex = grid.getRows() - 1;
    let columnMaxIndex = grid.getColumns() - 1;

    grid.setRowType(0, NodeType.WALL);
    grid.setRowType(rowMaxIndex, NodeType.WALL);
    grid.setColumnType(0, NodeType.WALL);
    grid.setColumnType(columnMaxIndex, NodeType.WALL);
  }

  private static async divide(
    grid: Grid,
    area: Area,
    cancellationToken: CancellationToken
  ): Promise<void> {
    if (!this.isAreaDividable(area)) {
      return;
    }
    await this.sleep(this.fastSleepToken, cancellationToken);
    let isVertical: boolean =
      Math.random() > area.getHeight() / (area.getHeight() + area.getWidth());

    if (isVertical) {
      await this.verticalDivide(grid, area, cancellationToken);
    } else {
      await this.horizontalDivide(grid, area, cancellationToken);
    }
  }

  private static async verticalDivide(
    grid: Grid,
    area: Area,
    cancellationToken: CancellationToken
  ): Promise<void> {
    let range = MathUtility.range(area.getStartX(), area.getEndX()).filter(
      MathUtility.isEven
    );
    let randomColumn = ArrayUtility.randomElement(range);
    let wall = grid
      .getNodes()
      .filter(ArrayUtility.indexInRange(area.getStartY(), area.getEndY()))
      .map((row) => row[randomColumn]);
    wall.forEach((node) => {
      node.type = NodeType.WALL;
    });
    let gap = ArrayUtility.randomElement(
      wall.filter((_, index) => MathUtility.isEven(index))
    );
    gap.type = NodeType.DEFAULT;
    await this.divide(
      grid,
      new Area(
        area.getStartX(),
        area.getStartY(),
        randomColumn - 1,
        area.getEndY()
      ),
      cancellationToken
    );
    await this.divide(
      grid,
      new Area(
        randomColumn + 1,
        area.getStartY(),
        area.getEndX(),
        area.getEndY()
      ),
      cancellationToken
    );
  }

  private static async horizontalDivide(
    grid: Grid,
    area: Area,
    cancellationToken: CancellationToken
  ): Promise<void> {
    let range = MathUtility.range(area.getStartY(), area.getEndY()).filter(
      MathUtility.isEven
    );
    let randomRow = ArrayUtility.randomElement(range);
    let wall = grid
      .getNodes()
      [randomRow].filter(
        ArrayUtility.indexInRange(area.getStartX(), area.getEndX())
      );
    wall.forEach((node) => {
      node.type = NodeType.WALL;
    });
    let gap = ArrayUtility.randomElement(
      wall.filter((_, index) => MathUtility.isEven(index))
    );
    gap.type = NodeType.DEFAULT;
    await this.divide(
      grid,
      new Area(
        area.getStartX(),
        area.getStartY(),
        area.getEndX(),
        randomRow - 1
      ),
      cancellationToken
    );
    await this.divide(
      grid,
      new Area(area.getStartX(), randomRow + 1, area.getEndX(), area.getEndY()),
      cancellationToken
    );
  }

  private static isAreaDividable(area: Area): boolean {
    return area.getHeight() > 1 && area.getWidth() > 1;
  }
}
