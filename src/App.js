import React, { Component } from "react";
import "./App.css";
import "./css/client/Cart.css";
import routes from "./routes";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import appReducers from "./reducers";
import {
  BrowserRouter,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import thunk from "redux-thunk";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51HO2ZoBA7xz6XAIm0VnMgBMrLzNHB3nZ4FYKrjBY1pGVViGQzxgHw1f3kcFRdYsKT99OgMFJJUEPUdhMzbzf5BK500Ot5FoLhR"
);

export const store = createStore(appReducers, applyMiddleware(thunk));

class App extends Component {
  showContentMenus = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return <Switch>{result}</Switch>;
  };
  render() {
    return (
      <Elements stripe={stripePromise}>
        <Provider store={store}>
          <BrowserRouter>
            <div className="App">{this.showContentMenus(routes)}</div>
          </BrowserRouter>
        </Provider>
      </Elements>
    );
  }
}

export default App;
