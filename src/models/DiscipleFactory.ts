import { Disciple } from "./Disciple";

export class DiscipleFactory {
    static GetDisciple():Disciple {
        return new Disciple({
            
        });
    }
}