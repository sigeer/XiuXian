import { BuffItem, BuffMap } from "./Constants/BuffMap";
import { IBuff } from "./IBuff";

export class Buff implements IBuff {
    id: number;
    expired: Date | null;

    constructor(json: any) {
        json = json ?? {};

        this.id = json.id ?? 0;
        this.expired = json.expired ? new Date(json.expired) : null;
    }

    static BiGuang(): Buff {
        return new Buff({ id: 3, duration: -1 });
    }

    static DaoXinPoSui(): Buff {
        return new Buff({ id: BuffItem.道心破碎, expired: new Date(new Date().getTime() + 10 * 60 * 1000) });
    }

    static Empty(): Buff {
        return new Buff({ id: BuffItem.无事发生 });
    }


    get Name(): string {
        return BuffMap[this.id];
    }

    get Description(): string {
        return `${this.Name}: xxxx`;
    }

    extend(unit: number): void {
        if (this.expired === null)
            return;
        this.expired = new Date(this.expired.getTime() + unit * 1000);
    }

    setExpired(expired: Date | null): void {
        this.expired = expired;
    }

}