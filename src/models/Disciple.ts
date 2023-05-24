import { formatTime, getArraryFromRandom, getRandom, ifSuccess } from "../utils/utils";
import { Buff } from "./Buff";
import { BiGuanShi } from "./Buildings/BiGuanShi";
import { Build } from "./Buildings/Build";
import { LianGongFang } from "./Buildings/LianGongFang";
import { findMedicineForLevel, ItemMap } from "./Constants/ItemMap";
import { IBuild } from "./IBuild";
import { IItem } from "./IItem";
import { ILevel } from "./Interfaces/ILevel";
import { ITalent } from "./ITalent";
import { Item } from "./Item";
import { LingGen } from "./LingGen";
import { Person } from "./Person";
import { SectInfo } from "./SectInfo";
import { isPoJing, LevelName } from "./Settings/LevelSettings";
import { XinFaBase } from "./Settings/XinFaBase";
import { SystemEngine } from "./SystemEngine";

export class Disciple extends Person implements ILevel {
    level: number;
    jinLingGen: ITalent;
    muLingGen: ITalent;
    shuiLingGen: ITalent;
    huoLingGen: ITalent;
    tuLingGen: ITalent;
    wuxing: ITalent;
    gengGu: ITalent;
    meiLi: ITalent;
    xinFa: XinFaBase | null;
    exp: IItem;
    tuPoSuccessRate: number;

    weaknessBefore: Date | null;
    dyingBefore: Date | null;

    buffList: Buff[] = [];
    garrisonBuilding: IBuild | null;

    constructor(json: any) {
        json = json ?? {};
        super(json);
        this.level = json.level ?? 1;
        this.jinLingGen = new LingGen(json.jinLingGen.quality);
        this.muLingGen = new LingGen(json.muLingGen.quality);
        this.shuiLingGen = new LingGen(json.shuiLingGen.quality);
        this.huoLingGen = new LingGen(json.huoLingGen.quality);
        this.tuLingGen = new LingGen(json.tuLingGen.quality);

        this.wuxing = new LingGen(json.wuxing.quality);
        this.gengGu = new LingGen(json.gengGu.quality);
        this.meiLi = new LingGen(json.meiLi.quality);

        this.xinFa = json.xinFa ? new XinFaBase(json.xinFa) : null
        this.exp = new Item(json.exp);
        this.tuPoSuccessRate = json.tuPoSuccessRate ?? 0;

        this.weaknessBefore = json.weaknessBefore ? new Date(json.weaknessBefore) : null;
        this.dyingBefore = json.dyingBefore ? new Date(json.dyingBefore) : null;
        this.buffList = json.buffList ?? [];
        this.garrisonBuilding = json.garrisonBuilding ? new Build(json.garrisonBuilding) : null;
    }

    getLevelUpCost(): number {
        return this.level * (this.level + 1) * 1000 + this.level * 125;
    }

    levelUp(): boolean {
        if (this.level === 31) {
            // SystemEngine.log(`${this.name}满级了，无法突破`);
            return false;
        }
        if (!ifSuccess(this.TuPoSuccessRate)) {
            SystemEngine.log(`${this.name} 突破失败`);
            if (isPoJing(this.level)) {
                if (ifSuccess(1)) {
                    this.die();
                } else if (ifSuccess(9)) {
                    this.fiasco();
                } else {
                    this.tuPoFailed();
                }
            } else {
                if (ifSuccess(10)) {
                    this.fiasco();
                } else {
                    this.tuPoFailed();
                }
            }

            return false
        }
        this.tuPoSuccessRate = 0;
        this.level++;
        this.exp.count = 0;
        SystemEngine.log(`突破成功, ${this.name}突破到${this.LevelName}`);
        return true
    }

    xiuLian(lianGongFang: LianGongFang | null, biGuanShi: BiGuanShi | null): void {
        if (this.Soul) {
            // 死了 修炼不了
            return;
        }
        if (this.IsWeakness) {
            // 虚弱期 
            return;
        }
        const maxExp = this.getLevelUpCost()
        let getValue = 0;
        if (lianGongFang !== null)
            getValue += this.getIncomeExpByLianGongFang(lianGongFang)
        if (biGuanShi !== null)
            getValue += this.getIncomeExpByBiGuan(biGuanShi);

        const leftValue = maxExp - this.exp.count;
        if (getValue > leftValue) {
            this.exp.count = +(this.exp.count + leftValue).toFixed(0);
        } else {
            this.exp.count = +(this.exp.count + getValue).toFixed(0);
        }
        if (this.exp.count >= maxExp) {
            if (SystemEngine.autoTuPo)
                this.levelUp();
            else if (!isPoJing(this.level))
                this.tuPoSuccessRate = this.tuPoSuccessRate + +(this.TuPoSuccessRate < 100 ? 0.02 : 0).toFixed(2)
        }
    }

    setXinFa(xinFa: XinFaBase) {
        this.xinFa = xinFa;
    }

    getScore(): number {
        return this.level * 1000 + (this.xinFa?.getScore(this) ?? 0);
    }


    work() {
        this.exp.count += (this.gengGu.quality / 100)
    }

    tuPo() {
        this.level++;
        this.exp.count = 0;
    }

    setWeakness(minutes: number) {
        this.weaknessBefore = new Date(new Date().getTime() + minutes * 60 * 1000)
        SystemEngine.log(`${this.name}进入虚弱期，${formatTime(this.weaknessBefore!)}结束`);
    }

    die() {
        this.dyingBefore = new Date(new Date().getTime() + 360 * 60 * 1000)
        this.exp.count = 0;
        this.tuPoSuccessRate = 0;
        SystemEngine.log(`${this.name}死亡，灵魂将在${formatTime(this.dyingBefore!)}时消散`);
    }

    tuPoFailed() {
        this.tuPoSuccessRate += 2;
        const tmp = +(this.exp.count * 0.2).toFixed(0);
        this.exp.count -= tmp;
        SystemEngine.log(`${this.name}损失${tmp}修为`);
        this.setWeakness(0.1);
    }

    fiasco() {
        this.tuPoSuccessRate = 0;
        this.exp.count = 0;
        SystemEngine.log(`${this.name}损失所有修为`);
        this.setWeakness(0.1);
    }

    revive() {
        this.dyingBefore = null;
        this.setWeakness(0.1);
        const lose = getRandom(0, 3);
        if (lose > 0) {
            SystemEngine.log(`${this.name}重铸肉身，下降${lose}级`);
            this.level -= lose;
        }
    }

    setGarrison(building: IBuild) {
        this.garrisonBuilding = building;
    }

    resetTalentCore() {
        const vList = getArraryFromRandom(200, 8);
        this.jinLingGen.reset(vList[0]);
        this.muLingGen.reset(vList[1]);
        this.shuiLingGen.reset(vList[2]);
        this.huoLingGen.reset(vList[3]);
        this.tuLingGen.reset(vList[4]);

        this.meiLi.reset(vList[5]);
        this.wuxing.reset(vList[6]);
        this.gengGu.reset(vList[7]);
    }

    resetTalent(sect: SectInfo) {
        if (sect.LingShi.remove(100000)) {
            this.resetTalentCore();
        }
    }

    get TalentLevel(): string {
        if (this.TalentTotal < 320)
            return "不足"
        if (this.TalentTotal < 480)
            return "平凡"
        if (this.TalentTotal < 640)
            return "可造之才"
        if (this.TalentTotal < 760)
            return "天赋异禀"
        return "天骄"
    }

    get TalentTotal() {
        return this.jinLingGen.quality + this.muLingGen.quality + this.tuLingGen.quality + this.shuiLingGen.quality
            + this.huoLingGen.quality + this.meiLi.quality + this.wuxing.quality + this.gengGu.quality;
    }

    get CanLevelUp() {
        return this.level < 31 && (this.exp.count >= this.getLevelUpCost())
    }

    get TuPoSuccessRate() {
        return +((41 - this.level) + this.tuPoSuccessRate).toFixed(2)
    }

    get Score(): number {
        return this.getScore() + (this.xinFa?.getScore(this) ?? 0)
    }

    get LevelName(): string {
        return LevelName[this.level]
    }

    get IsWeakness(): boolean {
        return this.weaknessBefore !== null && new Date() <= this.weaknessBefore
    }

    get Soul(): boolean {
        return this.dyingBefore !== null && new Date() <= this.dyingBefore
    }

    get Died(): boolean {
        return this.dyingBefore !== null && new Date() > this.dyingBefore
    }

    get ReviveMedicine(): string {
        return ItemMap[findMedicineForLevel(this.level)];
    }

    get StatusName(): string {
        return this.IsWeakness ? '虚弱期' : (this.Soul ? '灵魂状态' : '正常');
    }

    get IsBiGuang(): boolean {
        return this.garrisonBuilding?.name === '闭关室';
    }

    addBuff(buff: Buff) {
        const existedBuff = this.buffList.find(x => x.id === buff.id);
        if (existedBuff) {
            existedBuff.duration = buff.duration;

        } else {
            this.buffList.push(buff);
        }
    }

    removeBuff(buff: Buff) {
        this.buffList = this.buffList.filter(x => x.id !== buff.id);
    }

    getIncomeExpByLianGongFang(lianGongFang: LianGongFang): number {
        if (this.IsWeakness || this.Soul || this.level > 31)
            return 0;
        let baseIncome = +((1 + (+(this.gengGu.quality / 100).toFixed(4))) * lianGongFang.ValueOfProduction * this.level / 31).toFixed(0);
        return baseIncome;
    }

    getIncomeExpByBiGuan(biGuanShi: BiGuanShi): number {
        if (this.IsWeakness || this.Soul || !this.IsBiGuang || this.level > 31)
            return 0;

        return +((1 + (+(this.gengGu.quality / 100).toFixed(4))) * biGuanShi.ValueOfProduction * this.level / 31).toFixed(0);
    }

    getIncomeExpTotal(lianGongFang: LianGongFang, biGuanShi: BiGuanShi): number {
        return +(this.getIncomeExpByBiGuan(biGuanShi) + this.getIncomeExpByLianGongFang(lianGongFang)).toFixed(0);
    }

    useMedicine(item: Item) {
        if (item.Type === 3 && item.remove(1)) {
            this.dyingBefore = null;
            this.fiasco();
        }
    }
}