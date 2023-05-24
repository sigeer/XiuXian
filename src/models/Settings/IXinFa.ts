import { Disciple } from "../Disciple";
import { ITalent } from "../ITalent";

export interface IXinfa {
    name: string;
    level: number;
    x: number;
    y: number;
    lingGen: ITalent;


    getScore: (disciple :Disciple) => number;
}