import { Node } from './node.model';
import { NodeType } from './nodeType.model';

export class Grid {
  private rows: number;
  private columns: number;
  private nodes: Array<Array<Node>>;

  constructor(rows: number, columns: number) {
    if (rows < 1 || columns < 1) {
      throw Error('Grid must have a minimum size of 1x1.');
    }
    if (rows % 2 === 0 || columns % 2 === 0) {
      throw Error('Grid must have an odd number of rows and columns.');
    }
    this.rows = rows;
    this.columns = columns;
    this.nodes = this.createNodes();
  }

  public getRows(): number {
    return this.rows;
  }

  public getColumns(): number {
    return this.columns;
  }

  public getNodes(): Array<Array<Node>> {
    return this.nodes;
  }

  public getBorderingNodes(node: Node): Array<Node> {
    return this.nodes
      .flat()
      .filter(
        (borderingNode) =>
          Math.abs(borderingNode.column - node.column) +
          Math.abs(borderingNode.row - node.row) === 1
      );
  }

  public getNodesWithType(type: NodeType): Array<Node> {
    return this.nodes.flat().filter((node) => node.type === type);
  }

  public setColumnType(columnIndex: number, type: NodeType): void {
    if (columnIndex < 0 || columnIndex > this.columns - 1) {
      throw Error('Index out of bounds.');
    }

    this.nodes.forEach((row) => {
      row[columnIndex].type = type;
    });
  }

  public setRowType(rowIndex: number, type: NodeType): void {
    if (rowIndex < 0 || rowIndex > this.rows - 1) {
      throw Error('Index out of bounds.');
    }

    this.nodes[rowIndex].forEach((node) => {
      node.type = type;
    });
  }

  public setToDefault(): void {
    this.nodes.forEach((row) => {
      row.forEach((node) => {
        node.type = NodeType.DEFAULT;
      });
    });
  }

  public addRandomStartNode(): void {
    let rowMaxIndex = this.rows - 1;
    let columnMaxIndex = this.columns - 1;

    let randomColumn = Math.round(
      Math.random() * Math.round(columnMaxIndex * 0.25)
    );
    let randomRow = Math.round(Math.random() * rowMaxIndex);

    this.nodes[randomRow][randomColumn].type = NodeType.START;
  }

  public addRandomGoalNode(): void {
    let rowMaxIndex = this.rows - 1;
    let columnMaxIndex = this.columns - 1;

    let randomColumn = Math.round(
      Math.random() * Math.round(columnMaxIndex * 0.25) + 0.75 * columnMaxIndex
    );
    let randomRow = Math.round(Math.random() * rowMaxIndex);

    this.nodes[randomRow][randomColumn].type = NodeType.GOAL;
  }

  private createNodes(): Array<Array<Node>> {
    let _nodes = new Array<Array<Node>>();
    if (!this.rows || !this.columns) {
      return _nodes;
    }
    for (let row = 0; row < this.rows; row++) {
      let _row: Array<Node> = new Array<Node>();
      for (let column = 0; column < this.columns; column++) {
        _row.push(new Node(NodeType.DEFAULT, row, column));
      }
      _nodes.push(_row);
    }
    return _nodes;
  }
}
