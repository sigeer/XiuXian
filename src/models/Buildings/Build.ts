import { IBuild } from "../IBuild";

export class Build implements IBuild {
    name: string;
    isOpened: boolean = true;
    constructor(json: any) {
        json = json ?? {};
        this.name = json.name
        this.isOpened = json.isOpened ?? true
    }

    toggle() {
        this.isOpened = !this.isOpened;
    }

    get Disabled() {
        return !this.isOpened
    }

}