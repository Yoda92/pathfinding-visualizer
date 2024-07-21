import { ActionVisitor } from "./actionVisitor.model";

export interface Action {
    accept(visitor: ActionVisitor): void;
}
