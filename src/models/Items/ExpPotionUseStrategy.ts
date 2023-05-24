import { Disciple } from "../Disciple";
import { IItemUseStrategy } from "./IItemUseStrategy";

export class ExpPotionUseStrategy implements IItemUseStrategy {
    use(p: Disciple): void {
        p.exp += 10000;
    }

}