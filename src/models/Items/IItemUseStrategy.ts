import { Disciple } from "../Disciple";

export interface IItemUseStrategy {
    use(p: Disciple): void;
}