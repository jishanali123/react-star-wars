import React , {Component} from 'react';
import {Route , Switch , Redirect} from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Logo from './components/UI/Logo/Logo';
import Planets from './containers/Planets/Planet';
import './App.css';

class App extends Component{
    state = {
        isAuth : false
    }
    render() {
        return (
          <div className="App">
            <Logo />
            <Switch>
            <Route path="/" exact component={Auth} />
            <Route path="/planets" exact component={Planets}/>
            <Redirect to="/" />
            </Switch>
          </div>
        );
      }
}
export default App;