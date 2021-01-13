import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F9FBE7',
      dark: '#C6C8B5',
      light: '#FFFFFF',
    },
    secondary: {
      main: '#827717',
      dark: '#524C00',
      light: '#B4A647',
    },
  },
  overrides: {
    MuiTextField: {
      root: {
        width: 300,
      },
    },
  },
});

export default theme;
