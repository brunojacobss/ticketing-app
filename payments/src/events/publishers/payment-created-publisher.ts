import { PaymentCreatedEvent, Publisher, Subjects } from '@bjsticketing/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
