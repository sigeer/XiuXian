import { SystemEngine } from "../SystemEngine";
import { Item } from "./Item";

export class BagItem {
    count: number;
    itemId: number;

    constructor(json: { itemId: number, count: number}){
        this.itemId = json.itemId;
        this.count = json.count;
    }

    add(count: number) {
        this.count = +(this.count + count).toFixed(0);
    }

    remove(count: number): boolean {
        if (this.count >= count) {
            this.count = +(this.count - count).toFixed(0);
            this.itemId !== 1 && SystemEngine.log(`消耗${this.Item.Name} ${count}个`);
            return true;
        } else {
            SystemEngine.log(this.Item.Name + "不足");
        }
        return false;
    }

    get Item(): Item {
        return new Item({id: this.itemId});
    }
}