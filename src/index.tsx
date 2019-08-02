import * as React from "react";
import * as ReactDOM from "react-dom";
import { BitmexRestProvider } from "./utils/bitmex";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { IndexPage } from "./containers/IndexPage";
import { NotFoundPage } from "./containers/NotFoundPage";
import "./assets/scss/main.scss";

ReactDOM.render(
  <BitmexRestProvider>
    <Router>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route exact component={NotFoundPage} />
      </Switch>
    </Router>
  </BitmexRestProvider>,
  document.getElementById("root"),
);
