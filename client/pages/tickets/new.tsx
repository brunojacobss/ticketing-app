import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FormEvent, useState } from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    '& .MuiButton-root': {
      margin: theme.spacing(1),
    },
  },
  title: {
    margin: theme.spacing(1),
  },
}));

const NewTicket: React.FC = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/tickets',
    method: 'post',
    body: {
      title,
      price,
    },
    onSuccess: () => Router.push('/'),
  });

  const titleErr = errors?.find((e) => e.field === 'title');
  const priceErr = errors?.find((e) => e.field === 'price');

  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    doRequest();
  };

  const classes = useStyles();
  return (
    <Container>
      <form className={classes.root} onSubmit={onSubmit}>
        <Typography className={classes.title} variant="h3">
          Create a Ticket
        </Typography>
        <div>
          <TextField
            variant="filled"
            label="Title"
            color="secondary"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={titleErr ? true : false}
            helperText={titleErr?.message}
          ></TextField>
        </div>
        <div>
          <TextField
            variant="filled"
            label="Price"
            color="secondary"
            onBlur={onBlur}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            error={priceErr ? true : false}
            helperText={priceErr?.message}
          ></TextField>
        </div>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default NewTicket;
