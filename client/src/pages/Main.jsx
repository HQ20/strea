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
        const { companiesContract } = this.state;
        const companies = [];

        const totalCompanies = await companiesContract.getTotal() * 1;
        for (let c = 0; c < totalCompanies; c += 1) {
            // eslint-disable-next-line no-await-in-loop
            companies.push(await companiesContract.get(c));
        }
        this.setState({ companies });
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
                        <p className="Company__CardTitle Company__CardTitle--Bold">Emissions</p>
                        <p className="Company__CardTitle Company__CardTitle--Bold">Tons of Carbon</p>
                        <p className="Company__CardTitle Company__CardTitle--Bold">Date</p>
                    </li>
                    {
                        companies.map(c => (
                            <li className="Company__Card">
                                <p className="Company__CardTitle">{web3.utils.toUtf8(c[3])}</p>
                                <p className="Company__CardTitle">
                                    {c[0] * 1}
                                    {' '}
                                    Suppliers
                                </p>
                                <p className="Company__CardTitle">
                                    {c[1] * 1}
                                    {' '}
                                    Emissions
                                </p>
                                <p className="Company__CardTitle">25 Tons of Carbon</p>
                                <p className="Company__CardTitle">11 Nov 2018</p>
                                <button type="button" className="btn btn__Success btn__Center">VIEW</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default Main;
