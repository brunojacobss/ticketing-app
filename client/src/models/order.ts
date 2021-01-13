export enum OrderStatus {
  Created = 'created',
  Cancelled = 'cancelled',
  AwaitingPayment = 'awaiting:payment',
  Complete = 'complete',
}

export interface Order {
  id: string;
  status: OrderStatus;
  userId: string;
  expiresAt: Date;
  version: number;
  ticket: {
    id: string;
    price: number;
    title: string;
    version: number;
  };
}
