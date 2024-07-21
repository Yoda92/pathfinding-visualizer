import { Color } from 'src/models/color.model';
import { Grid } from 'src/models/grid.model';
import { Node } from 'src/models/node.model';
import { NodeType } from 'src/models/nodeType.model';
import { PathfindingAlgorithm } from 'src/services/pathfindingAlgorithmService/pathfindingAlgorithms/pathfindingAlgorithm';
import { CancellationToken } from 'src/tokens/cancelation.token';
import { SleepToken } from 'src/tokens/sleep.token';
import { ArrayUtility } from 'src/utilities/array.utility';

export class RandomWalkPathfindingAlgorithm extends PathfindingAlgorithm {
  static override async run(
    grid: Grid,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken
  ): Promise<void> {
    if (!grid) {
      return;
    }

    let goalNodeFound = false;
    let startNode = grid.getNodesWithType(NodeType.START).pop();

    if (!startNode) {
      throw Error('Missing start node.');
    }

    let randomWalk = new Array<Node>();
    while (!goalNodeFound) {
      randomWalk.forEach((node) => (node.type = NodeType.DEFAULT));
      randomWalk = [];
      let potentialNextSteps = grid
        .getBorderingNodes(startNode)
        .filter(
          (node) =>
            node.type === NodeType.DEFAULT || node.type === NodeType.GOAL
        );
      while (!ArrayUtility.isEmpty(potentialNextSteps)) {
        let randomNode = ArrayUtility.randomElement(potentialNextSteps);
        if (randomNode.type === NodeType.GOAL) {
          goalNodeFound = true;
          break;
        }
        randomNode.type = NodeType.VISITED;
        randomWalk.push(randomNode);
        await this.sleep(sleepToken, cancellationToken);
        potentialNextSteps = grid
          .getBorderingNodes(randomNode)
          .filter(
            (node) =>
              node.type === NodeType.DEFAULT || node.type === NodeType.GOAL
          );
      }
    }

    for (const node of randomWalk) {
      await this.sleep(sleepToken, cancellationToken);
      node.type = NodeType.SELECTED;
    }
  }
}
