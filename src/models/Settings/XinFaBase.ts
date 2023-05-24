import { Disciple } from "../Disciple";
import { ILingGen } from "../ILingGen";
import { ILevel } from "../Interfaces/ILevel";

import { IXinfa } from "./IXinFa";

export class XinFaBase implements IXinfa, ILevel {
    name: string;
    level: number;
    x : number;
    y: number;
    lingGen: ILingGen;

    constructor(json: any) {
        json = json ?? {};
        this.name = json.name;
        this.level = json.level;
        this.x = json.x;
        this.y = json.y;
        this.lingGen = json.lingGen;
    }

    getLevelUpCost(): number {
        throw new Error("Method not implemented.");
    }

    levelUp(): boolean {
        throw new Error("Method not implemented.");
    }

    get Description(): string {
        return `对${this.lingGen.TypeName}灵根额外加成${this.x * 100}% + ${this.y}`;
    }

    getScore(disciple: Disciple): number {
        return +((disciple.level * 1000 * this.x + this.y) * (1 + disciple.muLingGen.quality / 100)).toFixed(0)
    }

}