import { Grid } from 'src/models/grid.model';
import { Node } from 'src/models/node.model';
import { NodeType } from 'src/models/nodeType.model';
import { PathfindingAlgorithm } from 'src/services/pathfindingAlgorithmService/pathfindingAlgorithms/pathfindingAlgorithm';
import { CancellationToken } from 'src/tokens/cancelation.token';
import { SleepToken } from 'src/tokens/sleep.token';

export abstract class AStarPathfindingAlgorithm extends PathfindingAlgorithm {
  static override async run(
    grid: Grid,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken
  ): Promise<void> {
    if (!grid) {
      return;
    }

    const startNode = grid.getNodesWithType(NodeType.START).pop();
    const goalNode = grid.getNodesWithType(NodeType.GOAL).pop();

    if (!startNode || !goalNode) {
      return;
    }

    const state = new AStarPathfindingAlgorithmState();
    state.getOpenList().push(startNode);

    let goalNodeFound = false;

    while (!goalNodeFound) {
      const currentNode = state
        .getOpenList()
        .filter((node) => !state.getClosedList().includes(node))
        .reduce((a, b) =>
          this.computeEvaluation(a, goalNode, state) >
          this.computeEvaluation(b, goalNode, state)
            ? b
            : a
        );

      if (currentNode.type === NodeType.GOAL) {
        goalNodeFound = true;
        continue;
      }

      state.getClosedList().push(currentNode);

      if (currentNode.type != NodeType.START) {
        currentNode.type = NodeType.VISITED;
      }

      await this.sleep(sleepToken, cancellationToken);

      let traversableNeighborNodes = grid
        .getBorderingNodes(currentNode)
        .filter(
          (node) =>
            node.type === NodeType.DEFAULT || node.type === NodeType.GOAL
        );

      traversableNeighborNodes.forEach((neighborNode) => {
        state.setNodeCost(
          neighborNode,
          Math.min(
            state.getNodeCost(currentNode) + 1,
            state.getNodeCost(neighborNode)
          )
        );

        state.getOpenList().push(neighborNode);
      });
    }

    let currentVisitedNode = goalNode;
    let isShortestPathBacktracked = false;

    while (!isShortestPathBacktracked) {
      let visitedNeighborNodes = grid
        .getBorderingNodes(currentVisitedNode)
        .filter(
          (node) =>
            node.type === NodeType.VISITED || node.type === NodeType.START
        );

      const lowestCostVisitedNeighborNode = visitedNeighborNodes.reduce(
        (a, b) => (state.getNodeCost(a) > state.getNodeCost(b) ? b : a)
      );

      if (lowestCostVisitedNeighborNode.type === NodeType.START) {
        isShortestPathBacktracked = true;
        continue;
      }

      lowestCostVisitedNeighborNode.type = NodeType.SELECTED;

      await this.sleep(sleepToken, cancellationToken);

      currentVisitedNode = lowestCostVisitedNeighborNode;
    }
  }

  static heuristicCostFromNodeToGoal(n: Node, goalNode: Node): number {
    throw new Error('Operation not supported.');
  }

  private static computeEvaluation(
    node: Node,
    goalNode: Node,
    state: AStarPathfindingAlgorithmState
  ): number {
    return (
      state.getNodeCost(node) + this.heuristicCostFromNodeToGoal(node, goalNode)
    );
  }
}

class AStarPathfindingAlgorithmState {
  private openList: Array<Node>;
  private closedList: Array<Node>;
  private nodeCostMap: Map<Node, number>;

  constructor() {
    this.openList = [];
    this.closedList = [];
    this.nodeCostMap = new Map();
  }

  public getOpenList(): Array<Node> {
    return this.openList;
  }

  public getClosedList(): Array<Node> {
    return this.closedList;
  }

  public getNodeCost(node: Node) {
    if (node.type === NodeType.START) {
      return 0;
    }

    const nodeCost = this.nodeCostMap.get(node);

    if (nodeCost === undefined) {
      return Infinity;
    }

    return nodeCost;
  }

  public setNodeCost(node: Node, value: number) {
    this.nodeCostMap.set(node, value);
  }
}
