export interface Ticket {
  id: string;
  title: string;
  price: string;
  userId: string;
  version: number;
  orderId?: string;
}
