import { OrderCancelledEvent, Publisher, Subjects } from '@bjsticketing/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
