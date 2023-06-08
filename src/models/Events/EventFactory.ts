import { getItemByRandom } from "../../utils/random_utility";
import { EventItem } from "../Constants/EventMap";
import { GameEvent } from "./GameEvent";
import { IGameEvent } from "./IGameEvent";

export class EventFactory {
    static getEvent(): IGameEvent {
        return new GameEvent(getItemByRandom([{ key: EventItem.发现新灵矿, rate: 20 }, { key: EventItem.灵矿干涸, rate: 20 }]))
    }
}