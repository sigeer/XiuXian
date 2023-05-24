import { Disciple } from "../Disciple";

export interface IGarrison {
    getDisciple(): Disciple | null;
}