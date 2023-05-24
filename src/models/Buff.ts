import { BuffItem, BuffMap } from "./Constants/BuffMap";
import { IBuff } from "./IBuff";

export class Buff implements IBuff {
    id: number;
    duration: number;

    constructor (json: any) {
        json = json ?? {};

        this.id = json.id;
        this.duration = json.duration;
    }

    static BiGuang() : Buff{
        return new Buff({id: 3, duration: -1});
    }

    static DaoXinPoSui() : Buff{
        return new Buff({id: BuffItem.道心破碎, duration: -1});
    }


    get Name() : string {
        return BuffMap[this.id];
    }

    get Description(): string{
        return `${this.Name}: xxxx`;
    }

}