import { CurrentUser } from '../../pages/_app';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    listStyleType: 'none',
    margin: 0,
    overflow: 'hidden',
  },
}));

const Header: React.FC<CurrentUser> = ({ currentUser }: CurrentUser) => {
  const classes = useStyles();

  const links = [
    !currentUser && { label: 'Sign up', href: '/auth/signup' },
    !currentUser && { label: 'Sign in', href: '/auth/signin' },
    currentUser && { label: 'Sell Tickets', href: '/tickets/new' },
    currentUser && { label: 'My Orders', href: '/orders' },
    currentUser && { label: 'Sign out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} style={{ display: 'inline' }}>
          <Link href={href}>
            <Button color="inherit">{label}</Button>
          </Link>
        </li>
      );
    });

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link href="/">
            <div className={classes.title}>
              <Typography
                variant="h6"
                component="a"
                style={{ cursor: 'pointer' }}
              >
                Ticketing App
              </Typography>
            </div>
          </Link>
          <div>
            <ul className={classes.list}>{links}</ul>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
