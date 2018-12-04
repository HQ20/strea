/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import renderApp from '../../App';


class CompanyReport extends Component {
    render() {
        return (
            <div className="Component">

                <div className="ReportCard">
                    <ul className="ReportCard__Items">

                        <li className="ReportCard__Item">
                            <p>Company ID:</p>
                            <p>123</p>
                        </li>

                        <li className="ReportCard__Item">
                            <p>Emissions Reported:</p>
                            <p>18 Emissions</p>
                        </li>

                        <li className="ReportCard__Item">
                            <p>Name:</p>
                            <p>Coca-Cola</p>
                        </li>

                        <li className="ReportCard__Item">
                            <p>Carbon Footprint:</p>
                            <p>25 Tonnes</p>
                        </li>

                        <li className="ReportCard__Item">
                            <p>Suppliers:</p>
                            <p>48</p>
                        </li>

                        <li className="ReportCard__Item">
                            <p>Last Report:</p>
                            <p>11 November 2018</p>
                        </li>

                        <li className="ReportCard__Item" />

                        <li className="ReportCard__Button">
                            <button type="button" className="btn btn__lg btn__Success btn__Center">NEW REPORT</button>
                        </li>

                    </ul>
                </div>
                <ul className="Company__Grid">

                    <li className="Company__Card">
                        <p className="Company__CardTitle">456</p>
                        <p className="Company__CardTitle">48 Suppliers</p>
                        <p className="Company__CardTitle">18 Emissions</p>
                        <p className="Company__CardTitle">25 Tons of Carbon</p>
                        <p className="Company__CardTitle">11 Nov 2018</p>
                    </li>

                    <li className="Company__Card">
                        <p className="Company__CardTitle">456</p>
                        <p className="Company__CardTitle">48 Suppliers</p>
                        <p className="Company__CardTitle">18 Emissions</p>
                        <p className="Company__CardTitle">25 Tons of Carbon</p>
                        <p className="Company__CardTitle">11 Nov 2018</p>
                    </li>

                    <li className="Company__Card">
                        <p className="Company__CardTitle">456</p>
                        <p className="Company__CardTitle">48 Suppliers</p>
                        <p className="Company__CardTitle">18 Emissions</p>
                        <p className="Company__CardTitle">25 Tons of Carbon</p>
                        <p className="Company__CardTitle">11 Nov 2018</p>
                    </li>

                </ul>

            </div>
        );
    }
}


export default CompanyReport;
