/* globals document */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './pages/Main';
import CompanyReport from './pages/CompanyReport/CompanyReport';
import './Reset.module.css';


export default function renderApp() {
    ReactDOM.render(
        <BrowserRouter>
            <div>
                <Route path="/" exact component={Main} />
                <Route path="/company-report" component={CompanyReport} />
            </div>
        </BrowserRouter>, document.getElementById('root'),
    );
}
