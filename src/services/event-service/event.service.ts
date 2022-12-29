import { SocketStorage } from "../../socket-storage/socket-storage";
import {
  AbilityEvent, AbilityEventFactory,
  AttackEvent, AttackEventFactory,
  MessageEvent, MessageEventFactory,
  RestoreEvent, RestoreEventFactory
} from "../../controllers/event-factory/event-factory";

export class EventService {
  eventAttack(senderId: string, targetId: string) {
    const newAttackEvent = new AttackEventFactory().createEvent(targetId);
    console.log(`ATTACK`);
  }

  activateAttack(event: AttackEvent, senderId: string) {
    // in this function we should find player
    // who sent event (attacker), and player who has been attacked,
    // and we pass attacked player instance in "attack" method of the attacker
  }

  eventAbility(senderId: string, targetId: string | null) {
    let newAbilityEvent: AbilityEvent;
    if (targetId !== null) {
      newAbilityEvent = new AbilityEventFactory().createEvent(targetId);
    }
    newAbilityEvent = new AbilityEventFactory().createEvent(senderId);
    console.log(`POWER`);
  }

  activateAbility(event: AbilityEvent, senderId: string) {
    // in this function we should find target player
    // and if target player is the player who use ability we call "use ability"
    // in instance of this player, else we make a "mage course" on target player instance
  }

  eventMessage(
    senderId: string,
    target_id: string | null,
    messageText: string,
  ) {
    const newMessage = new MessageEventFactory().createEvent(messageText);
    return this.sendMessage(newMessage, senderId, target_id);
  }

  sendMessage(message: MessageEvent, senderId: string, targetId: string | null): void {
    if (targetId !== null) {
      const targetSocket = SocketStorage.getSocket(targetId);
      if (!targetSocket) {

      }
      targetSocket.send(JSON.stringify(message));
      console.log(`Massage to user ${message.message}`);
      return;
    }
    const allSocketsData = SocketStorage.getAllSockets();
    for (const socketData of allSocketsData) {
      if (socketData.userId === targetId) {
        continue;
      }
      socketData.socket.send(JSON.stringify(message));
    }
    console.log(`Massage to all users ${message.message}`);
    return;
  }

  eventRevival(senderId: string) {
    const newRestoreEvent = new RestoreEventFactory().createEvent();
    console.log(`REVIVAL`);
  }

  activateRestore(event: RestoreEvent, senderId: string) {
    // in this function we should find player's character in mongo db and call restore event on it
  }

}
