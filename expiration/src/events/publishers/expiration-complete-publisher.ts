import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from '@bjsticketing/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
