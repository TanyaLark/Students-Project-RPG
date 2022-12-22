import { EventsEnum } from "../enums/events.enum";

export interface MessageObjectInterface {
  event_type: EventsEnum,
  event_data: {
    target_id?: string;
  },
}
