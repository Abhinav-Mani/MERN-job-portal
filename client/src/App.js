import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

//My Components
import Navbar from './components/layout/Navbar';
import Landing from './components/pages/Landing';
import SingleJob from './components/pages/SingleJob';
import Apply from './components/pages/Apply';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Navbar />
          <main role="main">
            <Router>
              <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/posao/:id" component={SingleJob} />
                <Route path="/prijava/:id" component={Apply} />
              </Switch>
            </Router>
          </main>
        </Fragment>
      </Provider>
    );
  }
}

export default App;
