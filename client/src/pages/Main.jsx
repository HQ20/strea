import React, { Component } from 'react';
import request from 'request';
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
         * @property {number} state.userEther - this is the user ether
         * @property {object} state.web3 - this is the web3 object
         * @property {string[]} state.accounts - this is an array of accounts
         * @property {object} state.contract - this is the contract object
         */
        this.state = {
            userEther: 0, web3: null, accounts: null, companies: null,
        };
    }

    /**
     * @ignore
     */
    async componentDidMount() {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({ web3, accounts }, this.runExample);
        } catch (error) {
            // Catch any errors for any of the above operations.
            console.log('Failed to load web3, accounts, or contract. Check console for details.');
            console.log(error);
        }


        // request('./companiesList.json',
        //     (error, response) => {
        //         const companiesData = JSON.parse(response);
        //         this.setState({ companies: companiesData });
        //         console.log(response);
        //     });
    }

    /**
     * this is an entry method to load info.
     */
    async runExample() {
        const { web3, accounts } = this.state;

        // Update state with the result.
        this.setState({ userEther: web3.utils.fromWei(await web3.eth.getBalance(accounts[0])) });
    }


    /**
     * @ignore
     */
    render() {
        const { web3 } = this.state;
        if (!web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
        }
        return (
            <div className="Component">
                {/* {userEther} */}

                {this.getCompanies}
                <ul className="Company__Grid">
                    <li className="Company__Card Company__Card--Black">
                        <p className="Company__CardTitle Company__CardTitle--Bold">Company Name</p>
                        <p className="Company__CardTitle Company__CardTitle--Bold">Suppliers</p>
                        <p className="Company__CardTitle Company__CardTitle--Bold">Emissions</p>
                        <p className="Company__CardTitle Company__CardTitle--Bold">Tons of Carbon</p>
                        <p className="Company__CardTitle Company__CardTitle--Bold">Date</p>
                    </li>

                    <li className="Company__Card">
                        <p className="Company__CardTitle">Coca-Cola</p>
                        <p className="Company__CardTitle">48 Suppliers</p>
                        <p className="Company__CardTitle">18 Emissions</p>
                        <p className="Company__CardTitle">25 Tons of Carbon</p>
                        <p className="Company__CardTitle">11 Nov 2018</p>
                        <button type="button" className="btn btn__Success btn__Center">VIEW</button>
                    </li>

                    <li className="Company__Card Company__Card__Grey">
                        <p className="Company__CardTitle">Coca-Cola</p>
                        <p className="Company__CardTitle">48 Suppliers</p>
                        <p className="Company__CardTitle">18 Emissions</p>
                        <p className="Company__CardTitle">25 Tons of Carbon</p>
                        <p className="Company__CardTitle">11 Nov 2018</p>
                        <button type="button" className="btn btn__Success btn__Center">VIEW</button>
                    </li>

                    <li className="Company__Card">
                        <p className="Company__CardTitle">Coca-Cola</p>
                        <p className="Company__CardTitle">48 Suppliers</p>
                        <p className="Company__CardTitle">18 Emissions</p>
                        <p className="Company__CardTitle">25 Tons of Carbon</p>
                        <p className="Company__CardTitle">11 Nov 2018</p>
                        <button type="button" className="btn btn__Success btn__Center">VIEW</button>
                    </li>

                    <li className="Company__Card Company__Card__Grey">
                        <p className="Company__CardTitle">Coca-Cola</p>
                        <p className="Company__CardTitle">48 Suppliers</p>
                        <p className="Company__CardTitle">18 Emissions</p>
                        <p className="Company__CardTitle">25 Tons of Carbon</p>
                        <p className="Company__CardTitle">11 Nov 2018</p>
                        <button type="button" className="btn btn__Success btn__Center">VIEW</button>
                    </li>

                    <li className="Company__Card">
                        <p className="Company__CardTitle">Coca-Cola</p>
                        <p className="Company__CardTitle">48 Suppliers</p>
                        <p className="Company__CardTitle">18 Emissions</p>
                        <p className="Company__CardTitle">25 Tons of Carbon</p>
                        <p className="Company__CardTitle">11 Nov 2018</p>
                        <button type="button" className="btn btn__Success btn__Center">VIEW</button>
                    </li>

                    <li className="Company__Card Company__Card__Grey">
                        <p className="Company__CardTitle">Coca-Cola</p>
                        <p className="Company__CardTitle">48 Suppliers</p>
                        <p className="Company__CardTitle">18 Emissions</p>
                        <p className="Company__CardTitle">25 Tons of Carbon</p>
                        <p className="Company__CardTitle">11 Nov 2018</p>
                        <button type="button" className="btn btn__Success btn__Center">VIEW</button>
                    </li>

                    <li className="Company__Card">
                        <p className="Company__CardTitle">Coca-Cola</p>
                        <p className="Company__CardTitle">48 Suppliers</p>
                        <p className="Company__CardTitle">18 Emissions</p>
                        <p className="Company__CardTitle">25 Tons of Carbon</p>
                        <p className="Company__CardTitle">11 Nov 2018</p>
                        <button type="button" className="btn btn__Success btn__Center">VIEW</button>
                    </li>

                    <li className="Company__Card Company__Card__Grey">
                        <p className="Company__CardTitle">Coca-Cola</p>
                        <p className="Company__CardTitle">48 Suppliers</p>
                        <p className="Company__CardTitle">18 Emissions</p>
                        <p className="Company__CardTitle">25 Tons of Carbon</p>
                        <p className="Company__CardTitle">11 Nov 2018</p>
                        <button type="button" className="btn btn__Success btn__Center">VIEW</button>
                    </li>

                </ul>
            </div>
        );
    }
}

export default Main;
