import { EventTypeEnum } from "../../enums/eventTypeEnum";

interface IEventFactory {
  type: EventTypeEnum;
}

export class AttackEvent implements IEventFactory {
  type: EventTypeEnum;
  userId: string;
}

export class AbilityEvent implements IEventFactory {
  type: EventTypeEnum;
  userId: string;
}

export class MessageEvent implements IEventFactory {
  type: EventTypeEnum;
  message: string;
}

export class RestoreEvent implements IEventFactory {
  type: EventTypeEnum;
}

abstract class EventFactory {
  db: any;

  abstract createEvent(id?: string): IEventFactory;
}

export class AttackEventFactory extends EventFactory {
  createEvent(id: string): AttackEvent {
    const attack = new AttackEvent();
    attack.userId = id;
    attack.type = EventTypeEnum.attack;
    return attack;
  };
}

export class AbilityEventFactory extends EventFactory {
  createEvent(id: string): AbilityEvent {
    const ability = new AbilityEvent();
    ability.userId = id;
    ability.type = EventTypeEnum.ability;
    return ability;
  };
}

export class MessageEventFactory extends EventFactory {
  createEvent(message: string): MessageEvent {
    const newMessageEvent = new MessageEvent();
    newMessageEvent.type = EventTypeEnum.message;
    newMessageEvent.message = message;
    return newMessageEvent;
  };
}

export class RestoreEventFactory extends EventFactory {
  createEvent(): RestoreEvent {
    const newRestoreEvent = new RestoreEvent();
    newRestoreEvent.type = EventTypeEnum.revival;
    return newRestoreEvent;
  };
}
