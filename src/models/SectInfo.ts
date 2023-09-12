import { Buff } from "./Buff";
import { Disciple } from "./Disciple";
import { IBuff } from "./IBuff";
import { IBuffOwner } from "./IBuffOwner";
import { BagItem } from "./Items/BagItem";
import { Item } from "./Items/Item";

export class SectInfo implements IBuffOwner {
    items: BagItem[];
    discipleList: Disciple[];
    buffList: IBuff[];

    constructor(json: any) {
        json = json ?? {};

        this.items = (json.items ?? []).map((x: any) => new BagItem(x));
        this.discipleList = (json.discipleList ?? []).map((x: any) => new Disciple(x));
        this.buffList = (json.buffList ?? []).map((x: any) => new Buff(x));
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

    get BuffList() : IBuff[] {
        const buffList = this.buffList.filter(x => !x.HasExpired());

        //这里直接赋值给this.buffList会导致无限循环
        if (buffList.length === this.buffList.length)
            return this.buffList;
        this.buffList = buffList;
        return this.buffList;
    }

    hasBuff(buff: IBuff) {
        return this.hasBuffById(buff.id);
    }

    hasBuffById(id: number) {
        const buffData = this.buffList.find(x => x.id === id);
        if (buffData && (buffData.expired === null || buffData.expired > 0)) {
            return true;
        }
        if (buffData && buffData.expired! <= 0) {
            this.removeBuffById(id);
        }
        return false;
    }

    addBuff(buff: IBuff) {
        const existedBuff = this.buffList.find(x => x.id === buff.id);
        if (existedBuff) {
            existedBuff.setDuration(buff.duration)

        } else {
            this.buffList.push(buff);
        }
    }

    removeBuffById(buffId: number) {
        this.buffList = this.buffList.filter(x => x.id !== buffId);
    }

    removeBuff(buff: IBuff) {
        this.removeBuffById(buff.id);
    }
}