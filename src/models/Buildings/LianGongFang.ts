import { IShouHuo } from "../IShouHuo";
import { BuildingBase } from "./BuildingBase";

export class LianGongFang extends BuildingBase implements IShouHuo {
    flag: number = 1;
    constructor(json: any) {
        json = json ?? {};
        super(json);
        this.name = "练功房"
    }
    consume(): boolean {
        if (this.Disabled)
            return false;
        return this.sect!.LingShi.remove(this.ValueOfConsumption)
    }

    get ValueOfConsumption(): number {
        if (this.Disabled)
            return 0;
        return this.level * (this.level + 1) * 66;
    }

    product(): void {
        if (this.consume()) {
            this.sect!.discipleList.forEach(member => {
                member.xiuLian(this, null);
            });
        }
    }

    get BaseValueOfProduction(): number {
        if (this.Disabled)
            return 0;
        return this.level * 66;
    }

    get ValueOfProduction(): number {
        if (this.Disabled)
            return 0;
        return this.BaseValueOfProduction;
    }
}