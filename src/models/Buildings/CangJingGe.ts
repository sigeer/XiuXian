import { BuildingBase } from "./BuildingBase";

export class CangJingGe extends BuildingBase {
    constructor(json : any) {
        json = json ?? {};
        super(json);

        this.name = "藏经阁"
    }

}