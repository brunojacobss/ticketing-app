import { Publisher, Subjects, TicketCreatedEvent } from '@bjsticketing/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
