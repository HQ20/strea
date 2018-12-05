import React, { Component } from 'react';
import truffleContract from 'truffle-contract';
import CompaniesContract from '../contracts/Companies.json';
import getWeb3 from '../utils/getWeb3';


import '../App.module.css';

/**
 * This is App.
 */
class Main extends Component {
    /**
     * @ignore
     */
    constructor() {
        super();
        /**
         * @type {Object}
         * @property {object} state.web3 - this is the web3 object
         * @property {object} state.companiesContract - this is the contract object
         */
        this.state = {
            web3: null, companiesContract: null, companies: [],
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * @ignore
     */
    async componentDidMount() {
        try {
            const web3 = await getWeb3();

            const Contract = truffleContract(CompaniesContract);
            Contract.setProvider(web3.currentProvider);
            const instance = await Contract.deployed();

            this.setState({ web3, companiesContract: instance }, this.runExample);
        } catch (error) {
            console.log('Failed to load web3, accounts, or contract. Check console for details.');
            console.log(error);
        }
    }

    /**
     * this is an entry method to load info.
     */
    async runExample() {
        const { web3, companiesContract } = this.state;
        const companies = [];

        const totalCompanies = await companiesContract.getTotal() * 1;
        for (let c = 0; c < totalCompanies; c += 1) {
            // eslint-disable-next-line no-await-in-loop
            const companyData = await companiesContract.get(c);
            // eslint-disable-next-line no-await-in-loop
            companies.push({
                suppliers: (companyData[0] * 1) * 10,
                emissions: (companyData[2] * 1),
                tons: 20000 + Math.floor(Math.random() * Math.floor(100)) * 1000,
                name: (web3.utils.toUtf8(companyData[3])),
                id: c,
            });
        }
        // console.log(companies);
        this.setState({ companies });
    }

    // eslint-disable-next-line class-methods-use-this
    viewCompany(compantId) {
        // eslint-disable-next-line no-undef
        window.location.href = `/company-report?id=${compantId}`;
    }

    handleSubmit(event) {
        this.viewCompany(0); // TODO: prego
        event.preventDefault();
    }

    /**
     * @ignore
     */
    render() {
        const { web3, companies } = this.state;
        if (!web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
        }
        return (
            <div className="Component">
                <ul className="Company__Grid">
                    <li className="Company__Card Company__Card--Black">
                        <p className="Company__CardTitle Company__CardTitle--Bold">Company Name</p>
                        <p className="Company__CardTitle Company__CardTitle--Bold">Suppliers</p>
                        <p className="Company__CardTitle Company__CardTitle--Bold">Reports</p>
                        <p className="Company__CardTitle Company__CardTitle--Bold">Tonnes of Carbon</p>
                        <p className="Company__CardTitle Company__CardTitle--Bold">Date</p>
                    </li>
                    {
                        companies.map(c => (
                            <li className="Company__Card">
                                <p className="Company__CardTitle">{c.name}</p>
                                <p className="Company__CardTitle">
                                    {c.suppliers}
                                    {' '}
                                    Suppliers
                                </p>
                                <p className="Company__CardTitle">
                                    {c.emissions}
                                    {' '}
                                    Reports
                                </p>
                                <p className="Company__CardTitle">
                                    {c.tons}
                                    {' '}
                                    Tonnes of Carbon
                                </p>
                                <p className="Company__CardTitle">11 Nov 2018</p>
                                <form onSubmit={this.handleSubmit}>
                                    <input
                                        type="submit"
                                        className="btn btn__Success btn__Center"
                                        value="VIEW"
                                    />
                                </form>
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default Main;
