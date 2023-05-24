import { Disciple } from "./Disciple";
import { Item } from "./Item";

export class SectInfo {
    items: Item[];
    discipleList: Disciple[];

    constructor(json: any) {
        json = json ?? {};

        this.items = (json.items ?? []).map((x: any) => new Item(x));
        this.discipleList = (json.discipleList ?? []).map((x: any) => new Disciple(x));
    }

    addItem(item: Item) {
        const model = this.items.find(x => x.id === item.id);
        if (!model) {
            this.items.push(item);
        } else {
            model.add(item.count);
        }
    }


    removeItem(item: Item): boolean {
        const model = this.items.find(x => x.id === item.id);
        if (!model)
            return false;

        return model.remove(item.count);
    }

    get LingShi(): Item {
        let lingShi = this.items.find(x => x.id === 1);
        if (!lingShi) {
            lingShi = new Item({ id: 1, count: 0 });
            this.items.push(lingShi);
        }
        return lingShi;
    }
}