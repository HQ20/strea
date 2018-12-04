/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';


class EmissionsReport extends Component {
    constructor() {
        super();
        this.state = {
            isHidden: false,
        };
    }

    // Toggle the visibility
    toggleHidden() {
        const { isHidden } = this.state;
        this.setState({
            isHidden: !isHidden,
        });
    }

    render() {
        return (
            <div className="Component">

                <div className="ReportCard">
                    <ul className="ReportCard__Items">

                        <li className="ReportCard__Item">
                            <p>Emission Report ID:</p>
                            <p>456</p>
                        </li>

                        <li className="ReportCard__Item">
                            <p>Description:</p>
                            <p>Operations Manufacturing</p>
                        </li>

                        <li className="ReportCard__Item">
                            <p>Company:</p>
                            <p>Coca-Cola</p>
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
                            <p>Arbitration Cases:</p>
                            <p>3</p>
                        </li>

                        <li className="ReportCard__Item" />

                        <li className="ReportCard__Button">
                            {this.state.isHidden === false ? (
                                <button onClick={() => this.toggleHidden()} type="button" className="btn btn__lg btn__Black btn__Center">OPEN CASE</button>
                            ) : (
                                <button onClick={() => this.toggleHidden()} type="button" className="btn btn__lg btn__Black btn__Center">SUBMIT CASE</button>
                            )}
                        </li>

                    </ul>
                </div>
                {this.state.isHidden === false ? (
                    <ul className="Company__Grid">

                        <li className="Company__Card Company__Card-fiveColumns">
                            <p className="Company__CardTitle">456</p>
                            <p className="Company__CardTitle">48 Suppliers</p>
                            <p className="Company__CardTitle">18 Emissions</p>
                            <p className="Company__CardTitle">25 Tons of Carbon</p>
                            <p className="Company__CardTitle">11 Nov 2018</p>
                        </li>

                        <li className="Company__Card Company__Card-fiveColumns">
                            <p className="Company__CardTitle">456</p>
                            <p className="Company__CardTitle">48 Suppliers</p>
                            <p className="Company__CardTitle">18 Emissions</p>
                            <p className="Company__CardTitle">25 Tons of Carbon</p>
                            <p className="Company__CardTitle">11 Nov 2018</p>
                        </li>

                        <li className="Company__Card Company__Card-fiveColumns">
                            <p className="Company__CardTitle">456</p>
                            <p className="Company__CardTitle">48 Suppliers</p>
                            <p className="Company__CardTitle">18 Emissions</p>
                            <p className="Company__CardTitle">25 Tons of Carbon</p>
                            <p className="Company__CardTitle">11 Nov 2018</p>
                        </li>

                    </ul>)
                    : (
                        <div className="Company__Grid Company__Grid--NoBorder">
                            <ul>
                                <li className="Submit__Card">
                                    <p>Case ID:</p>
                                    <p>457</p>
                                </li>

                                <li className="Submit__Card">
                                    <p>Case Date:</p>
                                    <p>4 December 2018</p>
                                </li>

                                <li className="Submit__Card">
                                    <p>Bounty Hunter:</p>
                                    <input type="text" className="Submit__Description--Small" />
                                </li>

                                <li className="Submit__Card">
                                    <p>Description:</p>
                                    <input type="text" className="Submit__Description" />
                                </li>
                            </ul>
                        </div>
                    )}

            </div>
        );
    }
}


export default EmissionsReport;
