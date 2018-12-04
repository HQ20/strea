/* globals document */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './pages/Main';
import CompanyReport from './pages/CompanyReport/CompanyReport';
import EmissionsReport from './pages/EmissionsReport/EmissionsReport';
import Tribunal from './pages/Tribunal/Tribunal';
import './Reset.module.css';


export default function renderApp() {
    ReactDOM.render(
        <BrowserRouter>
            <div>
                <Route path="/" exact component={Main} />
                <Route path="/company-report" component={CompanyReport} />
                <Route path="/emissions-report" component={EmissionsReport} />
                <Route path="/tribunal" component={Tribunal} />
            </div>
        </BrowserRouter>, document.getElementById('root'),
    );
}
