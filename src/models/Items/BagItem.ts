import { SystemEngine } from "../SystemEngine";
import { IItem } from "./IItem";
import { Item } from "./Item";

export class BagItem {
    item: IItem;
    count: number;

    constructor(json: { item: IItem, count: number}){
        this.item = new Item(json.item);
        this.count = json.count;
    }

    add(count: number) {
        this.count = +(this.count + count).toFixed(0);
    }

    remove(count: number): boolean {
        if (this.count >= count) {
            this.count = +(this.count - count).toFixed(0);
            this.item.id !== 1 && SystemEngine.log(`消耗${this.item.Name} ${count}个`);
            return true;
        } else {
            SystemEngine.log(this.item.Name + "不足");
        }
        return false;
    }
}