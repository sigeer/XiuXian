import { getRandom } from "../utils/utils";
import { ITalent } from "./ITalent";

export class LingGen implements ITalent {
    quality: number;

    constructor(quaility: number | null) {
        this.quality = quaility ?? 0
    }

    reset(min: number = 0): void {
        this.quality = getRandom(min);
    }

    get QualityName() {
        if (this.quality < 40)
            return "不足"
        if (this.quality < 60)
            return "平凡"
        if (this.quality < 80)
            return "可造之才"
        if (this.quality < 95)
            return "天赋异禀"
        return "天骄"
    }
}