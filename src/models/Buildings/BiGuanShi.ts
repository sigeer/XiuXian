import { Disciple } from "../Disciple";
import { IShouHuo } from "../IShouHuo";
import { BuildingBase } from "./BuildingBase";
import { IGarrison } from "./IGarrison";

export class BiGuanShi extends BuildingBase implements IShouHuo, IGarrison {
    flag: number = 1;

    constructor(json: any) {
        json = json ?? {};
        super(json);

        this.name = "闭关室"
    }

    getDisciple(): Disciple | null {
        return this.sect!.discipleList.find(x => x.garrisonBuilding?.name === this.name) ?? null;
    }

    get Disabled(): boolean {
        return !this.isOpened || this.getDisciple() === null
    }

    get BaseValueOfProduction(): number {
        if (this.Disabled)
            return 0;
        return this.level * 99;
    }
    get ValueOfProduction(): number {
        if (this.Disabled)
            return 0;
        return this.BaseValueOfProduction;
    }
    get ValueOfConsumption(): number {
        if (this.Disabled)
            return 0;
        return this.level * (this.level + 1) * 660;
    }

    consume(): boolean {
        if (this.Disabled)
            return false;
        return this.sect!.LingShi.remove(this.ValueOfConsumption)
    }

    product(): void {
        if (this.Disabled)
            return;

        const biGuan = this.getDisciple();
        if (biGuan) {
            if (this.consume()) {
                biGuan.xiuLian(null, this);
            }
        }
    }
}