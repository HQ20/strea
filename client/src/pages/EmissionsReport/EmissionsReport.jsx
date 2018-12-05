/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import truffleContract from 'truffle-contract';
import url from 'url';
import getWeb3 from '../../utils/getWeb3';
import CompaniesContract from '../../contracts/Companies.json';


class EmissionsReport extends Component {
    constructor() {
        super();
        this.state = {
            companyId: null,
            web3: null,
            accounts: null,
            companiesContract: null,
            isOpeningCase: false,
        };

        this.handleViewCase = this.handleViewCase.bind(this);
        this.handleSubmitCase = this.handleSubmitCase.bind(this);
    }

    async componentDidMount() {
        // eslint-disable-next-line no-undef
        const parts = url.parse(window.location.href, true);
        const { id } = parts.query;

        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();

        const iCompaniesContract = truffleContract(CompaniesContract);
        iCompaniesContract.setProvider(web3.currentProvider);
        const instance = await iCompaniesContract.deployed();

        this.setState({
            web3,
            accounts,
            companiesContract: instance,
            companyId: id
        }, this.runExample);
    }

    // Toggle the visibility
    toggleOpeningCase() {
        const { isOpeningCase } = this.state;
        this.setState({
            isOpeningCase: !isOpeningCase,
        });
    }

    // eslint-disable-next-line class-methods-use-this
    viewCase(caseId) {
        // eslint-disable-next-line no-undef
        window.location.href = `/tribunal?id=${caseId}`;
    }

    handleViewCase(event) {
        this.viewCase(0); // TODO: prego
        event.preventDefault();
    }

    handleSubmitCase(event) {
        this.viewCase(0); // TODO: prego
        event.preventDefault();
    }

    render() {
        const { isOpeningCase, accounts } = this.state;
        let buttonsToRender;
        if (!isOpeningCase) {
            buttonsToRender = <button onClick={() => this.toggleOpeningCase()} type="button" className="btn btn__lg btn__Success btn__Center">OPEN CASE</button>;
        }
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
                            {buttonsToRender}
                        </li>

                    </ul>
                </div>
                {isOpeningCase === false ? (
                    <ul className="Company__Grid">

                        <li className="Company__Card">
                            <p className="Company__CardTitle">456</p>
                            <p className="Company__CardTitle">48 Suppliers</p>
                            <p className="Company__CardTitle">18 Emissions</p>
                            <p className="Company__CardTitle">25 Tons of Carbon</p>
                            <p className="Company__CardTitle">11 Nov 2018</p>
                            <form onSubmit={this.handleViewCase}>
                                <input
                                    type="submit"
                                    className="btn btn__Success btn__Center"
                                    value="VIEW"
                                />
                            </form>
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
                            <form onSubmit={this.handleSubmitCase}>
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
                                        <input type="text" disabled value={accounts[0]} className="Submit__Description--Small" />
                                    </li>

                                    <li className="Submit__Card">
                                        <p>Description:</p>
                                        <input type="text" className="Submit__Description" />
                                    </li>
                                </ul>
                                <input type="submit" className="btn btn__lg btn__Success btn__Center" value="SUBMIT CASE"/>
                                <button onClick={() => this.toggleOpeningCase()} type="button">CANCEL</button>
                            </form>
                        </div>
                    )}

            </div>
        );
    }
}


export default EmissionsReport;
