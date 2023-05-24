import { guid } from "../utils/utils";

export class Person {
    name: string;
    key: string;
    age: number;

    constructor(json: any) {
        json = json ?? {};
        this.key = json.key ?? guid()
        this.name = json.name 
        this.age = json.age ?? 18;
    }

    afterYear():void {
        this.age++;
    }
}