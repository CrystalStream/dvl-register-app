import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import {
  Window,
  TitleBar,
  NavPane,
  NavPaneItem,
} from 'react-desktop/windows';

import { remote } from 'electron'

import { Home, Settings } from './screens';
import * as Icons from './assets/icons';

const routes = [{
  path: '/',
  title: 'Registro',
  icon: Icons.formIcon,
  component: Home,
}];

const style = {
  mainContainer: {
    overflow: 'scroll',
    width: '100%',
    height: '100vh',
    paddingBottom: '20px'
  }
}

class App extends Component {
  static defaultProps = {
    theme: 'dark',
    color: '#cc7f29',
  }

  onCloseAppHandler = () => {
    window.close()
  }

  onMinimizeAppHandler = () => {
    remote.BrowserWindow.getFocusedWindow().minimize()
  }

  render() {
    const { history: { replace }, location, theme, color } = this.props; // eslint-disable-line

    return (
      <Window theme={theme} color={color}>
        <TitleBar title="Divertilandia Care & Fun" controls onMinimizeClick={this.onMinimizeAppHandler} onCloseClick={this.onCloseAppHandler}/>
        <NavPane openLength={150} theme={theme} color={color} defaultIsPaneExpanded={false}>
          {routes.map(route => (
            <NavPaneItem
              key={route.path}
              title={route.title}
              icon={route.icon}
              selected={(location.pathname === route.path)}
              onSelect={() => {
                replace(route.path);
              }}
              color={color}
              background="#ffffff"
              theme="light"
              padding="10px 20px"
              push
            >
              <div style={style.mainContainer}>
                <Route exact={route.exact} path={route.path} component={route.component} />
              </div>
            </NavPaneItem>
          ))}
        </NavPane>
      </Window>
    );
  }
}

export default withRouter(App);
