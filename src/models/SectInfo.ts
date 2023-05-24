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
        const model = this.items.find(x => x.item.id === item.item.id);
        if (!model) {
            this.items.push(item);
        } else {
            model.add(item.count);
        }
    }


    addItemFromItem(item: Item, count: number) {
        const model = this.items.find(x => x.item.id === item.id);
        if (!model) {
            this.items.push(new BagItem({item: item, count: count}));
        } else {
            model.add(count);
        }
    }


    removeItem(item: Item, count: number): boolean {
        const model = this.items.find(x => x.item.id === item.id);
        if (!model)
            return false;

        return model.remove(count);
    }

    hasItem(itemId: number) :boolean {
        return this.items.some(x => x.item.id === itemId && x.count > 0);
    }

    findItem(itemId: number): BagItem | null{
        return this.items.find(x => x.item.id === itemId) ?? null;
    }

    get LingShi(): BagItem {
        let lingShi = this.items.find(x => x.item.id === 1);
        if (!lingShi) {
            lingShi = new BagItem({item: new Item({id: 1}), count: 1});
            this.items.push(lingShi);
        }
        return lingShi;
    }
}