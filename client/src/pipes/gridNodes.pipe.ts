import { Pipe, PipeTransform } from '@angular/core';
import { Grid } from 'src/models/grid.model';
import { Node } from 'src/models/node.model';

@Pipe({
  name: 'gridNodes',
  pure: true,
})
export class GridNodesPipe implements PipeTransform {
  transform(grid: Grid | undefined): Array<Array<Node>> {
    if (!grid) {
      return [];
    }
    return grid.getNodes();
  }
}
