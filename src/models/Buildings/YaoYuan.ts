import { generateRandomArrayWithSum, getRandom } from "../../utils/utils";
import { Disciple } from "../Disciple";
import { IShouHuo } from "../IShouHuo";
import { BagItem } from "../Items/BagItem";
import { Item } from "../Items/Item";
import { SystemParameters } from "../Settings/SystemParameters";
import { SystemEngine } from "../SystemEngine";
import { BuildingBase } from "./BuildingBase";
import { IGarrison } from "./IGarrison";

export class YaoYuan extends BuildingBase implements IShouHuo, IGarrison {
    flag: number = SystemParameters.MedicinalMaterialsCycle;

    constructor(json: any) {
        json = json ?? {};
        super(json);
        this.name = '药园';
    }

    getDisciple(): Disciple | null {
        return this.sect!.discipleList.find(x => x.garrisonBuilding?.name === this.name) ?? null;
    }

    product(): void {
        if (this.Disabled)
            return;
        if (this.consume()) {
            if (this.flag === 0) {
                const allResult = this.getYaoCaiLevelByLevel();
                const productionArray = generateRandomArrayWithSum(this.ValueOfProduction, allResult.length);
                const items = allResult.map((x, index) => new BagItem({item: new Item({id: x}), count:productionArray[index]}))
                items.forEach(item => {
                    this.sect!.addItem(item);
                })
                const display = items.reduce((a, b) => `${a} ${b.item.Name} ${b.count}个,`, "");
                SystemEngine.log(`${this.name} 产出了 ${display}`);
                this.flag = SystemParameters.MedicinalMaterialsCycle;
            }
            else
                this.flag--;
        }
    }

    getYaoCaiLevelByLevel() {
        const arr = [2];
        if (this.level > 4) {
            arr.push(3)
        }
        if (this.level > 10) {
            arr.push(4)
        }
        if (this.level > 18) {
            arr.push(4)
        }
        if (this.level > 27) {
            arr.push(5)
        }
        if (this.level > 37) {
            arr.push(6)
        }
        if (this.level > 46) {
            arr.push(7)
        }
        return arr
    }

    get BaseValueOfProduction(): number {
        if (this.Disabled)
            return 0;
        return SystemParameters.MedicinalMaterialsBaseProduction + getRandom(0, this.level);
    }

    get ValueOfProduction(): number {
        if (this.Disabled)
            return 0;
        const base = Math.round(SystemParameters.MedicinalMaterialsBaseProduction * +(1 + ((this.getDisciple()?.meiLi?.quality ?? 0) / 100)).toFixed(4));
        return getRandom(SystemParameters.MedicinalMaterialsBaseProduction, base) + getRandom(0, this.level);
    }

    get ValueOfConsumption(): number {
        if (this.Disabled)
            return 0;
        return this.level * (this.level + 1) * 50;
    }

    consume(): boolean {
        if (this.Disabled)
            return false;
        return this.sect!.LingShi.remove(this.ValueOfConsumption);
    }
}