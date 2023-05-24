import { IBuild } from "../IBuild";
import { ILevel } from "../Interfaces/ILevel";
import { SectInfo } from "../SectInfo";
import { SystemEngine } from "../SystemEngine";
import { Build } from "./Build";

export class BuildingBase extends Build implements IBuild, ILevel {
    level: number;
    sect: SectInfo | null = null;

    constructor(json: any) {
        json = json ?? {};
        super(json);
        this.level = json.level ?? 1
    }

    bindSect(sect: SectInfo) {
        this.sect = sect;
    }

    getLevelUpCost(): number {
        return this.level * (1 + this.level) * 1000;
    }

    levelUp(): boolean {
        if (this.level >= SystemEngine.maxBuildingLevel)
            return false;
            
        if (this.sect!.LingShi.remove(this.getLevelUpCost())) {
            this.level++;
            SystemEngine.log(`${this.name} 等级提升到了 ${this.level}`)
            return true
        }

        return false
    }

}