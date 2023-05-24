import { getItemTypeById, ItemMap } from "../Constants/ItemMap";
import { IItem } from "./IItem";

export class Item implements IItem {
    id: number;

    constructor(json: {id: number}) {
        this.id = json.id ?? 0;
    }

    get Name(): string {
        return ItemMap[this.id];
    }

    get Type(): number {
        return getItemTypeById(this.id);
    }
}