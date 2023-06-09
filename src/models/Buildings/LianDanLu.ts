import { BuildingBase } from "./BuildingBase";

export class LianDanLu extends BuildingBase {
    constructor(json : any) {
        json = json ?? {};
        super(json);

        this.name = "炼丹炉"
    }

}