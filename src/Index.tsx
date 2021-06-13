
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDom from 'react-dom';

import App from './components/App';


ReactDom.render(<App />, document.getElementById('root') as HTMLElement);
