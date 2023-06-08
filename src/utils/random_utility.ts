import { ifSuccess } from "./utils";

export interface IRandomItem {
    key: any;
    rate: number;
}


export function getItemByRandom(items: IRandomItem[]): any {
    let final: any = null;
    items.forEach((item, index) => {
        if (ifSuccess(item.rate))
            final = item.key;
        if (!final && index === items.length - 1) {
            final = item.key;
        }
    });
    return final;
} 