import { Grid } from 'src/models/grid.model';
import { Node } from 'src/models/node.model';
import { NodeType } from 'src/models/nodeType.model';
import { CancellationToken } from 'src/tokens/cancelation.token';
import { SleepToken } from 'src/tokens/sleep.token';
import { ArrayUtility } from 'src/utilities/array.utility';
import { TerrainGenerator } from './terrainGenerator';

export class RandomObstaclesTerrainGenerator extends TerrainGenerator {
  private static PADDING_SIZE = 1;
  private static MAXIMUM_ITERATIONS_WITH_NO_OBSTACLES_CREATED = 100;
  private static TARGET_OBSTACLE_FILL_RATIO = 0.25;
  private static ALLOWED_OBSTACE_SIZES = [2, 3, 4, 5, 6, 7, 8];

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
    await this.sleep(this.fastSleepToken, cancellationToken);
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

    let currentObstacleFillRatio = 0;
    let iterationsWithNoObstaclesCreated = 0;

    while (
      currentObstacleFillRatio < this.TARGET_OBSTACLE_FILL_RATIO &&
      iterationsWithNoObstaclesCreated <=
        this.MAXIMUM_ITERATIONS_WITH_NO_OBSTACLES_CREATED
    ) {
      emptyNodes = grid.getNodesWithType(NodeType.DEFAULT);
      const randomNode = ArrayUtility.randomElement(emptyNodes);
      const possibleObstacleSizes =
        this.getPossibleObstacleSizesWithStartingNode(grid, randomNode);

      if (ArrayUtility.isEmpty(possibleObstacleSizes)) {
        iterationsWithNoObstaclesCreated++;
        continue;
      }

      const obstacleSize = ArrayUtility.randomElement(possibleObstacleSizes);
      this.createObstacleWithStartingNode(grid, randomNode, obstacleSize);
      const wallNodeCount = grid.getNodesWithType(NodeType.WALL).length;
      const defaultNodeCount = grid.getNodesWithType(NodeType.DEFAULT).length;
      currentObstacleFillRatio =
        wallNodeCount / (defaultNodeCount + wallNodeCount);
    }
  }

  private static createObstacleWithStartingNode(
    grid: Grid,
    startingNode: Node,
    obstacleSize: number
  ) {
    this.getObstacleNodesWithoutPadding(
      grid,
      startingNode,
      obstacleSize
    ).forEach((node) => (node.type = NodeType.WALL));
  }

  private static getPossibleObstacleSizesWithStartingNode(
    grid: Grid,
    node: Node
  ): Array<number> {
    return this.ALLOWED_OBSTACE_SIZES.filter((obstacleSize) =>
      this.isObstacleSizePossible(grid, node, obstacleSize)
    );
  }

  private static isObstacleSizePossible(
    grid: Grid,
    node: Node,
    obstacleSize: number
  ): boolean {
    return !this.getObstacleNodesWithPadding(grid, node, obstacleSize).find(
      (node) => node.type !== NodeType.DEFAULT
    );
  }

  private static getObstacleNodesWithPadding(
    grid: Grid,
    node: Node,
    obstacleSize: number
  ): Array<Node> {
    const left = node.column;
    const top = node.row;
    const right = node.column + obstacleSize + this.PADDING_SIZE;
    const bottom = node.row + obstacleSize + this.PADDING_SIZE;

    return this.getNodesInAreaInclusive(grid, left, top, right, bottom);
  }

  private static getObstacleNodesWithoutPadding(
    grid: Grid,
    node: Node,
    obstacleSize: number
  ): Array<Node> {
    const left = node.column + this.PADDING_SIZE;
    const top = node.row + this.PADDING_SIZE;
    const right = node.column + obstacleSize;
    const bottom = node.row + obstacleSize;

    return this.getNodesInAreaInclusive(grid, left, top, right, bottom);
  }

  private static getNodesInAreaInclusive(
    grid: Grid,
    left: number,
    top: number,
    right: number,
    bottom: number
  ): Array<Node> {
    return grid
      .getNodes()
      .flat()
      .filter((node) => node.column >= left && node.column <= right)
      .filter((node) => node.row >= top && node.row <= bottom);
  }

  private static createOuterWall(grid: Grid): void {
    let rowMaxIndex = grid.getRows() - 1;
    let columnMaxIndex = grid.getColumns() - 1;

    grid.setRowType(0, NodeType.WALL);
    grid.setRowType(rowMaxIndex, NodeType.WALL);
    grid.setColumnType(0, NodeType.WALL);
    grid.setColumnType(columnMaxIndex, NodeType.WALL);
  }
}
