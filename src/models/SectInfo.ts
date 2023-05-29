import { Disciple } from "./Disciple";
import { BagItem } from "./Items/BagItem";
import { Item } from "./Items/Item";

export class SectInfo {
    items: BagItem[];
    discipleList: Disciple[];

    constructor(json: any) {
        json = json ?? {};

        this.items = (json.items ?? []).map((x: any) => new BagItem(x));
        this.discipleList = (json.discipleList ?? []).map((x: any) => new Disciple(x));
    }

    addItem(item: BagItem) {
        const model = this.items.find(x => x.itemId === item.itemId);
        if (!model) {
            this.items.push(item);
        } else {
            model.add(item.count);
        }
    }

    addItemFromItemId(itemId: number, count: number) {
        const model = this.items.find(x => x.itemId === itemId);
        if (!model) {
            this.items.push(new BagItem({itemId: itemId, count: count}));
        } else {
            model.add(count);
        }
    }


    // addItemFromItem(item: Item, count: number) {
    //     const model = this.items.find(x => x.itemId === item.id);
    //     if (!model) {
    //         this.items.push(new BagItem({itemId: item.id, count: count}));
    //     } else {
    //         model.add(count);
    //     }
    // }


    removeItem(item: Item, count: number): boolean {
        const model = this.items.find(x => x.itemId === item.id);
        if (!model)
            return false;

        return model.remove(count);
    }

    removeItemFromItemId(itemId: number, count: number): boolean {
        const model = this.items.find(x => x.itemId === itemId);
        if (!model)
            return false;

        return model.remove(count);
    }

    hasItem(itemId: number) :boolean {
        return this.items.some(x => x.itemId === itemId && x.count > 0);
    }

    findItem(itemId: number): BagItem | null{
        return this.items.find(x => x.itemId === itemId) ?? null;
    }

    get LingShi(): BagItem {
        let lingShi = this.items.find(x => x.itemId === 1);
        if (!lingShi) {
            lingShi = new BagItem({itemId: 1, count: 1});
            this.items.push(lingShi);
        }
        return lingShi;
    }
}