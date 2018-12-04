import React, { Component } from 'react';
import getWeb3 from '../utils/getWeb3';

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
            userEther: 0, web3: null, accounts: null,
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
        const { web3, userEther } = this.state;
        if (!web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
        }
        return (
            <div>
                <h1>Good to Go!</h1>
                <p>Your Truffle Box is installed and ready.</p>
                <div>
                    The userEther value is:
                    {' '}
                    {userEther}
                </div>
            </div>
        );
    }
}

export default Main;
