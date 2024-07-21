import { NodeType } from "./nodeType.model";

export class Node {
    type: NodeType;
    row: number;
    column: number;

    constructor(type: NodeType, row: number, column: number) {
        this.type = type;
        this.row = row;
        this.column = column;
    }
}