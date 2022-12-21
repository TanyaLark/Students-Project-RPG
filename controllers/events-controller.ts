import { EventsEnum } from "../enums/events.enum";
import { eventAttack, eventMessage, eventAbility, eventRevival } from "../services/event-service/event.service";
import { MessageObjectInterface } from "./message-object.interface";

export function handleEvent(messageObject: MessageObjectInterface, senderUserId: string) {
  switch (messageObject.event_type) {
    case EventsEnum.attack:
      //** event service - attack
      eventAttack(messageObject);
      break;
    case EventsEnum.ability:
      eventAbility(messageObject);
      break;
    case EventsEnum.message:
      eventMessage(messageObject, senderUserId);
      break;
    case EventsEnum.revival:
      eventRevival(messageObject);
      break;
  }
}