import React, { Component} from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Scorecard from "./routes/scorecard";
import Homepage from "./routes/homepage";

class App extends Component{
  render(){
    return(
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage}/>
          <Route exact path="/:session" component={Scorecard}/>
        </Switch>
      </Router>
    );
  }
}

export default App;