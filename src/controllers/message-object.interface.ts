import { EventTypeEnum } from "../enums/eventTypeEnum";

export interface MessageObjectInterface {
  event_type: EventTypeEnum,
  event_data: {
    target_id: string;
  },
  message: string;
}
