import { AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';
import { Order } from '../../src/models/order';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import StripeCheckout from 'react-stripe-checkout';
import useRequest from '../../hooks/use-request';
import { Alert, AlertTitle } from '@material-ui/lab';
import Router from 'next/router';

interface Props {
  order: Order;
  currentUser: any;
}

const OrderShow = ({ order, currentUser }: Props) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push('/orders'),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt).getTime() - new Date().getTime();
      setTimeLeft(Math.round(msLeft / 1000));
    };
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  if (timeLeft < 0) {
    return (
      <Container>
        <Typography variant="h4">Order expired.</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4">
        {timeLeft} seconds until order expires.
      </Typography>
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_Z5LP1GgX9dG3vXx5QmSDlE8S00Q6zK54Fw"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />

      {errors && (
        <Alert style={{ marginTop: 16 }} severity="error">
          <AlertTitle>Ooops...</AlertTitle>
          {errors[0].message}
        </Alert>
      )}
    </Container>
  );
};

OrderShow.getInitialProps = async (context, client: AxiosInstance) => {
  const { orderId } = context.query;
  const { data } = await client.get<Order>(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
