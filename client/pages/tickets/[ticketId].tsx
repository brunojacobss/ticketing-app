import { AxiosInstance } from 'axios';
import { Ticket } from '../../src/models/ticket';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';
import { Order } from '../../src/models/order';

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(3),
  },
}));

const TicketShow = (ticket: Ticket) => {
  const classes = useStyles();
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order: Order) => {
      console.log(order);
      return Router.push('/orders/[orderId]', `/orders/${order.id}`);
    },
  });

  return (
    <Container>
      <Typography variant="h3" className={classes.margin}>
        {ticket.title}
      </Typography>
      <Typography variant="h4" className={classes.margin}>
        Price: {ticket.price}
      </Typography>
      {errors && (
        <Alert className={classes.button} severity="error">
          <AlertTitle>Ooops...</AlertTitle>
          {errors[0].message}
        </Alert>
      )}

      <Button
        onClick={() => doRequest()}
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Purchase
      </Button>
    </Container>
  );
};

TicketShow.getInitialProps = async (context, client: AxiosInstance) => {
  const { ticketId } = context.query;
  const { data: ticket } = await client.get<Ticket>(`/api/tickets/${ticketId}`);

  return ticket;
};

export default TicketShow;
