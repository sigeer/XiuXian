import { GlobalModel } from "./GlobalModel";
import { ref } from 'vue';
import { XinFaBase } from "./Settings/XinFaBase";

export class SystemEngine {
    static speed: number = 5;
    static time: number = 5;
    static autoTuPo: boolean = true;
    static msgList = ref<string[]>([]);
    static maxBuildingLevel: number = 99;
    static xinFaList: XinFaBase[];
    static root: GlobalModel;

    static start(): GlobalModel {
        let model = this.load();
        if (!model) {
            this.root = GlobalModel.create();
        } else {
            this.root = model!;
        }
        const engine = setInterval(() => {
            if (this.check()) {
                this.clearUnusedObject(this.root);
                // DO
                this.root.run();

                this.store();
            } else {
                clearInterval(engine);
            }

        }, this.time * 1000 / this.speed);
        return this.root;
    }

    static check(): boolean {
        if (this.root.ZhangMeng.Died) {
            this.log("游戏结束");
            return false;
        }
        return true;
    }

    static clearUnusedObject(model: GlobalModel) {
        model.sect.discipleList = model.sect.discipleList.filter(x => !x.Died);
    }

    static log(str: string): void {
        this.msgList.value.unshift(str)
    }

    static store(): void {
        const strValue = JSON.stringify(this.root);
        localStorage.setItem("c_a", strValue);

    }

    static load(): GlobalModel | null {
        const strValue = localStorage.getItem("c_a");
        if (strValue)
            return new GlobalModel(JSON.parse(strValue));
        return null;
    }

    static generateXinFaList(): void {
    }
}