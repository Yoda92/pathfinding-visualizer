import { Pipe, PipeTransform } from '@angular/core';
import { Color } from 'src/models/color.model';
import { Node } from 'src/models/node.model';
import { NodeType } from 'src/models/nodeType.model';
import { ColorUtility } from 'src/utilities/color.utility';
import { NodeUtility } from 'src/utilities/node.utility';

@Pipe({
  name: 'nodeColorClass',
  pure: true,
})
export class NodeColorClassPipe implements PipeTransform {
  transform(nodeType: NodeType): String {
    if (!nodeType) {
      return ColorUtility.mapToClass(Color.Default);
    }
    return ColorUtility.mapToClass(NodeUtility.mapToColor(nodeType));
  }
}
