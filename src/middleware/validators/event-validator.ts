import { EventsEnum } from "../../enums/events.enum";
import WebSocket from "ws";
import { ERRORS_TEXT } from "../../errors/errors-text";
import validator from "validator";

export function eventValidator(message: WebSocket.RawData) {
  const supportedEvents = Object.keys(EventsEnum);
  let parsedMessage;
  try {
    parsedMessage = JSON.parse(message.toString());
  } catch (e) {
    throw new Error(" Failed parse message with error: " + e);
  }

  if (!parsedMessage.hasOwnProperty("event_type")) {
    throw new Error(ERRORS_TEXT.PROPERTY_MISSING("event_type"));
  }
  if (!supportedEvents.includes(parsedMessage.event_type)) {
    throw new Error(ERRORS_TEXT.INVALID_EVENT);
  }

  if (!parsedMessage.hasOwnProperty("event_data")) {
    throw new Error(ERRORS_TEXT.PROPERTY_MISSING("event_data"));
  }

  if (!parsedMessage.event_data.hasOwnProperty("target_id")) {
    throw new Error(ERRORS_TEXT.PROPERTY_MISSING("target_id"));
  }

  if (!validator.isUUID(parsedMessage.event_data.target_id)) {
    throw new Error(ERRORS_TEXT.ID_IS_INCORRECT);

  }
}