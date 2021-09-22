import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import { Grid } from '@material-ui/core';
import Game from './components/Game';

function App() {

  return (
    <Grid>
      <AppHeader />
      <Game />
      <AppFooter />
    </Grid>
  );
}

export default App;
