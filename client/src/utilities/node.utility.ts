import { Color } from 'src/models/color.model';
import { Node } from 'src/models/node.model';
import { NodeType } from 'src/models/nodeType.model';

export class NodeUtility {
  public static mapToColor(nodeType: NodeType): Color {
    switch (nodeType) {
      case NodeType.GOAL: {
        return Color.Yellow;
      }
      case NodeType.START: {
        return Color.Blue;
      }
      case NodeType.WALL: {
        return Color.White;
      }
      case NodeType.VISITED: {
        return Color.Gray;
      }
      case NodeType.SELECTED: {
        return Color.Purple;
      }
      default: {
        return Color.Default;
      }
    }
  }
}
