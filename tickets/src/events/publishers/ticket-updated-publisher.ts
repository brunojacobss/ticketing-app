import { Publisher, Subjects, TicketUpdatedEvent } from '@bjsticketing/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
