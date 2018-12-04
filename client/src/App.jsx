/* globals document */
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './pages/Main';

export default function renderApp() {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
