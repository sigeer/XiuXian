import { BuffItem } from "../Constants/BuffMap";
import { Disciple } from "../Disciple";
import { IShouHuo } from "../IShouHuo";
import { BuildingBase } from "./BuildingBase";
import { IGarrison } from "./IGarrison";

export class LingKuang extends BuildingBase implements IShouHuo, IGarrison {
    flag: number = 1;
    constructor(json: any) {
        json = json ?? {};
        super(json);

        this.name = "灵矿"
    }
    get BaseValueOfProduction(): number {
        if (this.Disabled)
            return 0;

        return this.level * (this.level + 1) * 299;
    }
    get ValueOfProduction(): number {
        if (this.Disabled)
            return 0;
        let data = +(this.BaseValueOfProduction * (1 + +(((this.getDisciple()?.meiLi?.quality ?? 0) / 100)).toFixed(4))).toFixed(0)
        if (this.sect?.hasBuffById(BuffItem.灵矿干涸))
            data = +(data / 2).toFixed(0)
        if (this.sect?.hasBuffById(BuffItem.发现新灵矿))
            data = +(data * 3 / 2).toFixed(0)
        return data
    }
    get ValueOfConsumption(): number {
        if (this.Disabled)
            return 0;
        return 0;
    }

    getDisciple(): Disciple | null {
        return this.sect!.discipleList.find(x => x.garrisonBuilding?.name === this.name) ?? null;
    }


    consume(): boolean {
        if (this.Disabled)
            return false;
        return true;
    }

    product(): void {
        if (this.Disabled)
            return;
        if (this.consume()) {
            this.sect!.LingShi.add(this.ValueOfProduction);
        }
    }
}