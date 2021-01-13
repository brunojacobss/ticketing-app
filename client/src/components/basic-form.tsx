import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { FormEvent, useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

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

const BasicForm: React.FC<{ url: string; title: string }> = ({
  url,
  title,
}) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: url,
    method: 'post',
    body: { email, password },
    onSuccess: () => Router.push('/'),
  });
  const emailErr = errors?.find(
    (e) => e.field === 'email' || e.message.includes('Email')
  );
  const passErr = errors?.find((e) => e.field === 'password');
  const invalidErr = errors?.find((e) => e.message.includes('Invalid'));

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    doRequest();
  };

  return (
    <Container>
      <form className={classes.root} onSubmit={onSubmit}>
        <Typography className={classes.title} variant="h3">
          {title}
        </Typography>
        <div>
          <TextField
            variant="filled"
            color="secondary"
            label="Email Address"
            value={email}
            error={emailErr ? true : false || Boolean(invalidErr)}
            helperText={emailErr?.message}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <TextField
            variant="filled"
            color="secondary"
            label="Password"
            type="password"
            error={passErr ? true : false || Boolean(invalidErr)}
            helperText={passErr?.message || invalidErr?.message}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          {title}
        </Button>
      </form>
    </Container>
  );
};

export default BasicForm;
