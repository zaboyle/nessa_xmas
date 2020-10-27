import React, { Component } from "react";
import { Link, BrowserRouter, Switch, Route } from 'react-router-dom';
import Scorecard from "./routes/scorecard";
import Homepage from "./routes/homepage";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ProSidebar collapsed={false}>
          <Menu iconShape="square">
            <MenuItem>
              Date Ideas
              <Link to="/date-ideas"></Link>
            </MenuItem>
            <MenuItem>
              Attention
              <Link to="/attention"></Link>
            </MenuItem>
          </Menu>
        </ProSidebar>


        <Switch>
          <Route exact path="/date-ideas" component={Homepage} />
          <Route exact path="/attention" />
        </Switch>


      </BrowserRouter>
    );
  }
}

export default App;