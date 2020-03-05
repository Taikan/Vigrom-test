import {ComponentConstructor} from "./Component";

export interface INode {
    mount(): Node | Node[]
}



export interface ElementDeclaration<P = any, T extends string | ComponentConstructor<any> = string | ComponentConstructor<any>> {
    type: T,
    props: P
}

export type DeclarationText = string | number;

export type DeclarationChild = ElementDeclaration | DeclarationText;

export interface DeclarationNodeArray extends Array<DeclarationNode> {}

export type DeclarationNode = DeclarationChild | DeclarationNodeArray
