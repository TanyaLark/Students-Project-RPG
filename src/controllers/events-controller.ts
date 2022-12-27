import { EventTypeEnum } from "../enums/eventTypeEnum";
import { eventAttack, eventMessage, eventAbility, eventRevival } from "../services/event-service/event.service";
import { MessageObjectInterface } from "./message-object.interface";

export function handleEvent(messageObject: MessageObjectInterface, senderUserId: string) {
  switch (messageObject.event_type) {

    case EventTypeEnum.attack:
      eventAttack(senderUserId, messageObject.event_data.target_id);
      break;

    case EventTypeEnum.ability:
      eventAbility(senderUserId, messageObject.event_data.target_id);
      break;

    case EventTypeEnum.message:
      eventMessage(senderUserId, messageObject.event_data.target_id, messageObject.message);
      break;

    case EventTypeEnum.revival:
      eventRevival(senderUserId);
      break;
  }
}