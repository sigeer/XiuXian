import { Buff } from "../Buff";
import { EventMaps } from "../Constants/EventMap";
import { IBuff } from "../IBuff";
import { SystemEngine } from "../SystemEngine";
import { IGameEvent } from "./IGameEvent";

export class GameEvent implements IGameEvent {
    id: number;
    handle(): IBuff {
        let buff = Buff.Empty();
        const eventMap = EventMaps.find(x => x.id === this.id)
        if (eventMap)
            buff = new Buff({ id: eventMap.buffId, duration: 5 })
        SystemEngine.log(`获得buff${buff.Name}`);
        return buff;
    }

    constructor(id: number) {
        this.id = id
    }

}