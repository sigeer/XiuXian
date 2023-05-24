import { getItemTypeById, ItemMap } from "./Constants/ItemMap";
import { IItem } from "./IItem";
import { SystemEngine } from "./SystemEngine";

export class Item implements IItem {
    id: number;
    count: number;

    constructor(json: any) {
        json = json ?? {};
        this.id = json.id ?? 0;
        this.count = json.count ?? 0;
    }

    get Name(): string {
        return ItemMap[this.id];
    }

    get Type(): number {
        return getItemTypeById(this.id);
    }

    add(count: number) {
        this.count = +(this.count + count).toFixed(0);
    }

    remove(count: number): boolean {
        if (this.count >= count) {
            this.count = +(this.count - count).toFixed(0);
            this.id !== 1 && SystemEngine.log(`消耗${this.Name} ${count}个`);
            return true;
        } else {
            SystemEngine.log(this.Name + "不足");
        }
        return false;
    }
}