import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { CurrentUser } from './_app';
import { AxiosInstance } from 'axios';
import { AppContext } from 'next/app';
import { Ticket } from '../src/models/ticket';
import { makeStyles } from '@material-ui/core';
import Link from 'next/link';

interface Props {
  currentUser: CurrentUser;
  tickets: Ticket[];
}

const useStyles = makeStyles((theme) => ({
  table: {
    maxWidth: 600,
    marginTop: theme.spacing(2),
  },
  title: {
    marginTop: theme.spacing(1),
  },
}));

const LandingPage = ({ currentUser, tickets }: Props) => {
  const classes = useStyles();

  const ticketList = tickets.map((ticket) => (
    <TableRow key={ticket.id}>
      <TableCell>{ticket.title}</TableCell>
      <TableCell align="right">{ticket.price}</TableCell>
      <TableCell align="right">
        <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
          <Button color="secondary">View</Button>
        </Link>
      </TableCell>
    </TableRow>
  ));

  return (
    <Container>
      <Typography className={classes.title} variant="h3">
        Tickets available
      </Typography>
      <TableContainer className={classes.table} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{ticketList}</TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

LandingPage.getInitialProps = async (
  context: AppContext,
  client: AxiosInstance,
  currentUser: CurrentUser
) => {
  const { data } = await client.get<Ticket[]>('/api/tickets');

  return { tickets: data };
};

export default LandingPage;
