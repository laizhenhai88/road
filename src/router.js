import React, {Component} from 'react'
import {routerRedux, Router, Route, Switch} from 'dva/router';
import dynamic from 'dva/dynamic';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Common from './routes/common'

class ProgressBar extends Component {

  componentWillMount() {
    NProgress.start()
  }
  componentWillUnmount() {
    NProgress.done()
  }

  render() {
    return null
  }
}
dynamic.setDefaultLoadingComponent(() => {
  return <ProgressBar/>
  // return <Spin size="large" className='globalSpin'/>;
});

const {ConnectedRouter} = routerRedux;
function RouterConfig({history, app}) {
  return (<ConnectedRouter history={history}>
    <Switch>
      <Route path="/" component={Common}/>
    </Switch>
  </ConnectedRouter>);
}

export default RouterConfig;
