import { EventTypeEnum } from "../enums/eventTypeEnum";
import { EventService } from "../services/event-service/event.service";
import { MessageObjectInterface } from "./message-object.interface";

const eventService = new EventService;

export function handleEvent(messageObject: MessageObjectInterface, senderUserId: string) {
  switch (messageObject.event_type) {

    case EventTypeEnum.attack:
      eventService.eventAttack(senderUserId, messageObject.event_data.target_id);
      break;

    case EventTypeEnum.ability:
      eventService.eventAbility(senderUserId, messageObject.event_data.target_id);
      break;

    case EventTypeEnum.message:
      eventService.eventMessage(senderUserId, messageObject.event_data.target_id, messageObject.message);
      break;

    case EventTypeEnum.revival:
      eventService.eventRevival(senderUserId);
      break;
  }
}