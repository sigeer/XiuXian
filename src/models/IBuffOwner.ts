import { IBuff } from "./IBuff";

export interface IBuffOwner {
    buffList: IBuff[];

    addBuff(buff: IBuff):void;
    hasBuff(buff: IBuff): boolean;
    hasBuffById(id: number): boolean;

    removeBuffById(buffId: number): void;
    removeBuff(buff: IBuff): void;
}