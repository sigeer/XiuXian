import { BuildingBase } from "./BuildingBase";

export class LianQiShi extends BuildingBase {
    constructor(json : any) {
        json = json ?? {};
        super(json);

        this.name = "炼器室"
    }

}