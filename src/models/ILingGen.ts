import { ITalent } from "./ITalent";

export interface ILingGen extends ITalent {
    type: number;

    get TypeName(): string;
}