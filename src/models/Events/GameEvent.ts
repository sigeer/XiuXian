import { Buff } from "../Buff";
import { EventMaps } from "../Constants/EventMap";
import { IBuff } from "../IBuff";
import { IGameEvent } from "./IGameEvent";

export class GameEvent implements IGameEvent {
    id: number;
    handle(): IBuff {
        const eventMap = EventMaps.find(x => x.id === this.id)
        if (eventMap)
            return new Buff({ id: eventMap.buffId })
        else
            return Buff.Empty();
    }

    constructor(id: number) {
        this.id = id
    }

}