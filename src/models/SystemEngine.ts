import { GlobalModel } from "./GlobalModel";
import { ref } from 'vue';
import { XinFaBase } from "./Settings/XinFaBase";
import { EventFactory } from "./Events/EventFactory";

export class SystemEngine {
    static speed: number = 5;
    static time: number = 5;
    static autoTuPo = ref<boolean>(false);
    static msgList = ref<string[]>([]);
    static maxBuildingLevel: number = 99;
    static xinFaList: XinFaBase[];
    static root: GlobalModel;
    static dateTime = ref<number>(0);

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

                if (this.dateTime.value % 60 === 0) {
                    const event = EventFactory.getEvent();
                    this.root.sect.addBuff(event.handle())
                }

                this.dateTime.value++;
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
        if (this.msgList.value.length >= 30)
            this.msgList.value.pop()
        this.msgList.value.unshift(str)
    }

    static store(): void {
        const strValue = JSON.stringify(this.root);
        localStorage.setItem("c_a", strValue);
        localStorage.setItem("c_a_time", this.dateTime.value.toString());

    }

    static load(): GlobalModel | null {
        try {
            const strValue = localStorage.getItem("c_a");
            this.dateTime.value = +(localStorage.getItem("c_a_time") ?? 0);
            if (strValue)
                return new GlobalModel(JSON.parse(strValue));
            return null;
        }
        catch {
            alert("存档读取失败.");
            return null;
        }
    }

    static clear() {
        localStorage.removeItem("c_a");
    }

    static generateXinFaList(): void {
    }
}