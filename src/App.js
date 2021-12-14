import { BrowserRouter, Route} from 'react-router-dom';
import Header  from './components/Header';
import './App.css';
import Homepage from './pages/Homepage';
import CoinPage from './pages/CoinPage';
import { makeStyles } from '@material-ui/core/styles';

function App() {
  
  const useStyles =makeStyles(() => ({
    App: {
      backgroundColor:"#14161a",
      color: "white",
      minHeight: "100vh"
    }
  }));

  const classes =useStyles();
  
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header/>
        <Route path="/" component={Homepage} exact />
        <Route path="/coins/:id" component={CoinPage} />
      </div>
    </BrowserRouter>
  );
}

export default App;
