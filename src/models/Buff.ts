import { BuffItem, BuffMap } from "./Constants/BuffMap";
import { IBuff } from "./IBuff";
import { SystemEngine } from "./SystemEngine";

export class Buff implements IBuff {
    id: number;
    duration: number | null;
    expired: number|null;

    constructor(json: any) {
        json = json ?? {};

        this.id = json.id ?? 0;
        this.duration = json.duration ?? null;
        this.expired =  this.duration === null ? null : (this.duration + SystemEngine.dateTime.value);
    }
    HasExpired(): boolean {
        const d = this.expired === null || this.expired < SystemEngine.dateTime.value
        if (d) {
            SystemEngine.log(`Buff: 【${this.Name}】已过期`)
        }
        return d
    }

    static BiGuang(): Buff {
        return new Buff({ id: BuffItem.闭关 });
    }

    static DaoXinPoSui(): Buff {
        return new Buff({ id: BuffItem.道心破碎, duration: 10 });
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
        if (this.duration === null)
            return;
        this.duration += unit;
    }

    setDuration(expired: number | null): void {
        this.duration = expired;
    }

}