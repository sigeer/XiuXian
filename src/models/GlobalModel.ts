import { reactive } from "vue";
import { getRandom, getRandomName, guid } from "../utils/utils";
import { BiGuanShi } from "./Buildings/BiGuanShi";
import { CangJingGe } from "./Buildings/CangJingGe";
import { LianDanLu } from "./Buildings/LianDanLu";
import { LianGongFang } from "./Buildings/LianGongFang";
import { LianQiShi } from "./Buildings/LianQiShi";
import { LingKuang } from "./Buildings/LingKuang";
import { YaoYuan } from "./Buildings/YaoYuan";
import { findMedicineForLevel } from "./Constants/ItemMap";
import { Disciple } from "./Disciple";
import { BagItem } from "./Items/BagItem";
import { Item } from "./Items/Item";
import { LingGen } from "./LingGen";
import { SectInfo } from "./SectInfo";
import { SystemEngine } from "./SystemEngine";

export class GlobalModel {
    cangJingGe: CangJingGe;
    lianDanLu: LianDanLu;
    yaoYuan: YaoYuan;
    lianQiShi: LianQiShi;
    lianGongFang: LianGongFang;
    biGuanShi: BiGuanShi;
    lingKuang: LingKuang;
    zhangMengKey: string;
    sect: SectInfo;

    constructor(json: any) {
        json = json ?? {};
        this.sect = reactive(new SectInfo(json.sect));

        this.cangJingGe = new CangJingGe(json.cangJingGe);
        this.lianDanLu = new LianDanLu(json.lianDanLu);
        this.yaoYuan = new YaoYuan(json.yaoYuan);
        this.lianGongFang = new LianGongFang(json.lianGongFang);
        this.lianQiShi = new LianQiShi(json.lianQiShi);
        this.lingKuang = new LingKuang(json.lingKuang);
        this.biGuanShi = new BiGuanShi(json.biGuanShi);

        this.zhangMengKey = json.zhangMengKey
        this.init();
    }

    init() {
        this.cangJingGe.bindSect(this.sect);
        this.lianDanLu.bindSect(this.sect);
        this.yaoYuan.bindSect(this.sect);
        this.lianGongFang.bindSect(this.sect);
        this.lianQiShi.bindSect(this.sect);
        this.lingKuang.bindSect(this.sect);
        this.biGuanShi.bindSect(this.sect);
    }

    static create(): GlobalModel {
        const disciple = GlobalModel.generateDisciple();
        const model = new GlobalModel({
            zhangMengKey: disciple.key,
            sect: new SectInfo({
                items: [new BagItem({item: new Item({id: 1}),count: 10000})],
                discipleList: [disciple]
            })
        });
        return model;
    }

    addNewDisciple() {
        if (this.sect.LingShi.remove(100000)) {
            const disciple = GlobalModel.generateDisciple();
            this.sect.discipleList.push(disciple);
            SystemEngine.log(`${disciple.LevelName} - ${disciple.name} 加入了本门`);
        }
    }

    static generateDisciple(): Disciple {
        const key = guid();
        return new Disciple({
            key: key,
            name: getRandomName(),
            age: getRandom(16, 50),
            level: getRandom(0, 21) || 1,
            jinLingGen: new LingGen(getRandom()),
            muLingGen: new LingGen(getRandom()),
            shuiLingGen: new LingGen(getRandom()),
            huoLingGen: new LingGen(getRandom()),
            tuLingGen: new LingGen(getRandom()),

            wuxing: new LingGen(getRandom()),
            gengGu: new LingGen(getRandom()),
            meiLi: new LingGen(getRandom()),
            xinFa: null,
            exp: null
        })
    }


    store() {
        const m = JSON.stringify(this)
        localStorage.setItem('g_xiuxian', m)
    }

    /**
     * 过了一个时辰
     */
    run() {
        this.biGuanShi.product()
        this.lingKuang.product();
        this.lianGongFang.product();
        this.yaoYuan.product();
    }

    revive(disciple: Disciple) {
        const medicine = this.sect.items.find(x => x.item.id === findMedicineForLevel(disciple.level));
        if (medicine?.remove(1)) {
            disciple.revive();
        } else {
            SystemEngine.log(`没有足够的 ${disciple.ReviveMedicine}`);
        }
    }

    dismiss(disciple: Disciple) {
        this.sect.discipleList = this.sect.discipleList.filter(x => x.key !== disciple.key);
        SystemEngine.log(`${disciple.name} 已被逐出`);
        console.log(this.sect);
    }

    get ZhangMeng(): Disciple {
        return this.sect.discipleList.find(x => x.key === this.zhangMengKey)!
    }

    get IncomeOfLingShi(): number {
        return +(this.lingKuang.ValueOfProduction - this.biGuanShi.ValueOfConsumption - this.lianGongFang.ValueOfConsumption - this.yaoYuan.ValueOfConsumption).toFixed(0);
    }
}