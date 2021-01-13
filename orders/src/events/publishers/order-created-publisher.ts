import { OrderCreatedEvent, Publisher, Subjects } from '@bjsticketing/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
