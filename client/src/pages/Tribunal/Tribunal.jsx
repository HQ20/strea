/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';


class Tribunal extends Component {
    render() {
        return (
            <div className="Component">

                <div className="ReportCard">
                    <ul className="ReportCard__Items">

                        <li className="ReportCard__Item">
                            <p>Arbitration Case ID:</p>
                            <p>456</p>
                        </li>

                        <li className="ReportCard__Item">
                            <p>Company:</p>
                            <p>Coca-Cola</p>
                        </li>

                        <li className="ReportCard__Item">
                            <p>Bounty Hunter:</p>
                            <p>Greenpeace</p>
                        </li>

                        <li className="ReportCard__Item">
                            <p>Carbon Footprint:</p>
                            <p>25 Tonnes</p>
                        </li>

                        <li className="ReportCard__Item">
                            <p>Date:</p>
                            <p>11 November 2018</p>
                        </li>

                        <li className="ReportCard__Item">
                            <p>Status:</p>
                            <p>Under Tribunal Analysis</p>
                        </li>

                        <li className="ReportCard__Item" />

                        <li className="ReportCard__Button ReportCard__Button--inline">
                            <button type="button" className="btn btn__lg btn__Success btn__Center">AGREE</button>
                            <button type="button" className="btn btn__lg btn__Danger btn__Center">DISAGREE</button>
                        </li>

                    </ul>
                </div>

                <ul className="Company__Grid">

                    <li className="Company__Card Company__Card-fiveColumns">
                        <p className="Company__CardTitle">246</p>
                        <p className="Company__CardTitle">Coca-Cola</p>
                        <p className="Company__CardTitle">11 Nov 2018</p>
                        <p className="Company__CardTitle">Emission Reported</p>
                    </li>

                    <li className="Company__Card Company__Card-fiveColumns">
                        <p className="Company__CardTitle">246</p>
                        <p className="Company__CardTitle">Coca-Cola</p>
                        <p className="Company__CardTitle">11 Nov 2018</p>
                        <p className="Company__CardTitle">Arbitration Case Open</p>
                    </li>

                </ul>

            </div>
        );
    }
}


export default Tribunal;
