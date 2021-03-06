import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import App from './app';


const Application = () => (
  <Router>
    <App />
  </Router>
);

ReactDOM.render(<Application />, document.getElementById('root'));
