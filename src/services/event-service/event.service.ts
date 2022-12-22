import { MessageObjectInterface } from "../../controllers/message-object.interface";
import { SocketStorage } from "../../socket-storage/socket-storage";
import { EventsEnum } from "../../enums/events.enum";

export function eventAttack(messageObject: MessageObjectInterface) {
  console.log(`ATTACK ${messageObject.event_data.target_id}`);
}

export function eventAbility(messageObject: MessageObjectInterface) {
  console.log(`POWER ${messageObject.event_data.target_id}`);
}

export function eventMessage(messageObject: MessageObjectInterface, emitterUserId: string) {
  SocketStorage.sendMessageToAll(emitterUserId,
    {
      event_type: EventsEnum.message,
      event_data: {
        target_id: "qwe-qwe to all",
      }
    });
  console.log("MESSAGE");
}

export function eventRevival(messageObject: MessageObjectInterface) {
  console.log(`REVIVAL ${messageObject.event_data.target_id}`);
}
