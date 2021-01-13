import { AxiosInstance } from 'axios';
import { Order } from '../../src/models/order';
import Container from '@material-ui/core/Container';

const OrderIndex = ({ orders }) => {
  return (
    <Container>
      <ul>
        {orders.map((order: Order) => (
          <li key={order.id}>
            {order.ticket.title} - {order.status}
          </li>
        ))}
      </ul>
    </Container>
  );
};

OrderIndex.getInitialProps = async (context, client: AxiosInstance) => {
  const { data } = await client.get('/api/orders');
  return { orders: data };
};

export default OrderIndex;
