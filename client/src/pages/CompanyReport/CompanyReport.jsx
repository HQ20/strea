/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import url from 'url';
import getWeb3 from '../../utils/getWeb3';
import truffleContract from 'truffle-contract';
import CompaniesContract from '../contracts/Companies.json';


class CompanyReport extends Component {
    constructor() {
        super();
        this.state = {
            isHidden: false,
            companyId: null,
            web3: null,
            companiesContract: null,
        };
    }

    async componentDidMount() {
        // eslint-disable-next-line no-undef
        const parts = url.parse(window.location.href, true);
        const { id } = parts.query;

        const web3 = await getWeb3();

        const iCompaniesContract = truffleContract(CompaniesContract);
        iCompaniesContract.setProvider(web3.currentProvider);
        const instance = await iCompaniesContract.deployed();

        this.setState({ web3, companiesContract: instance, companyId: id }, this.runExample);
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
                            {this.state.isHidden === false ? (
                                <button onClick={() => this.toggleHidden()} type="button" className="btn btn__lg btn__Success btn__Center">NEW REPORT</button>
                            ) : (
                                <button onClick={() => this.toggleHidden()} type="button" className="btn btn__lg btn__Success btn__Center">SUBMIT REPORT</button>
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
                                    <p>Report ID:</p>
                                    <p>457</p>
                                </li>

                                <li className="Submit__Card">
                                    <p>Report Date:</p>
                                    <p>4 December 2018</p>
                                </li>

                                <li className="Submit__Card">
                                    <p>Carbon Tonnes:</p>
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


export default CompanyReport;
