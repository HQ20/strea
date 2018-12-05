/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import truffleContract from 'truffle-contract';
import url from 'url';
import getWeb3 from '../../utils/getWeb3';
import CompaniesContract from '../../contracts/Companies.json';
import EmissionsContract from '../../contracts/Emissions.json';


class CompanyReport extends Component {
    constructor() {
        super();
        this.state = {
            companyId: null,
            web3: null,
            accounts: null,
            companiesContract: null,
            emissionsContract: null,
            isOpeningReport: false,
            newTones: 0,
            newDescription: '',
            companyName: '',
            companyEmissions: [],
        };

        this.handleViewEmission = this.handleViewEmission.bind(this);
        this.handleSubmitReport = this.handleSubmitReport.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        // eslint-disable-next-line no-undef
        const parts = url.parse(window.location.href, true);
        const { id } = parts.query;

        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();

        const iCompaniesContract = truffleContract(CompaniesContract);
        iCompaniesContract.setProvider(web3.currentProvider);
        const instanceCompanies = await iCompaniesContract.deployed();

        const iEmissionsContract = truffleContract(EmissionsContract);
        iEmissionsContract.setProvider(web3.currentProvider);
        const instanceEmissions = await iEmissionsContract.deployed();

        const companyName = await web3.utils.toUtf8((await instanceCompanies.get(id))[3]);

        const totalEmissionsCompany = (await instanceCompanies.get(id))[2] * 1;
        console.log(totalEmissionsCompany);
        const companyEmissions = [];
        for (let ce = 0; ce < parseInt(totalEmissionsCompany, 10); ce += 1) {
            // eslint-disable-next-line no-await-in-loop
            const emissionId = (await instanceCompanies.getEmission(id, ce)) * 1;
            console.log(emissionId);
            // eslint-disable-next-line no-await-in-loop
            const emission = await instanceEmissions.get(emissionId);
            companyEmissions.push({
                tons: emission[1] * 1,
                arbitrations: emission[2] * 1,
                description: web3.utils.toUtf8(emission[3]),
            });
        }
        console.log(companyEmissions);
        this.setState({
            web3,
            companiesContract: instanceCompanies,
            emissionsContract: instanceEmissions,
            companyId: id,
            companyName,
            companyEmissions,
            accounts,
        }, this.runExample);
    }

    // Toggle the visibility
    toggleOpeningReport() {
        const { isOpeningReport } = this.state;
        this.setState({
            isOpeningReport: !isOpeningReport,
        });
    }

    // eslint-disable-next-line class-methods-use-this
    viewEmissions(emissionId) {
        // eslint-disable-next-line no-undef
        window.location.href = `/emissions-report?id=${emissionId}`;
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleViewEmission(event) {
        this.viewEmissions(0); // TODO: prego
        event.preventDefault();
    }

    handleSubmitReport(event) {
        const {
            web3,
            newTones,
            newDescription,
            emissionsContract,
            companiesContract,
            companyId,
            accounts,
        } = this.state;
        console.log(newTones, newDescription);
        emissionsContract.upload(
            newTones,
            [],
            web3.utils.toHex(newDescription),
            { from: accounts[0] },
        ).then(async () => {
            const index = (await emissionsContract.getTotal()) * 1;
            await companiesContract.addEmission(companyId, index - 1, { from: accounts[0] });
        });
        event.preventDefault();
    }

    render() {
        const {
            isOpeningReport,
            newTones,
            newDescription,
            companyName,
            companyEmissions,
        } = this.state;
        let buttonsToRender;
        if (!isOpeningReport) {
            buttonsToRender = <button onClick={() => this.toggleOpeningReport()} type="button" className="btn btn__lg btn__Success btn__Center">NEW REPORT</button>;
        }
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
                            <p>{companyName}</p>
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
                            {buttonsToRender}
                        </li>

                    </ul>
                </div>
                {isOpeningReport === false ? (
                    <ul className="Company__Grid">

                        {
                            companyEmissions.map(ce => (
                                <li key={ce.tons} className="Company__Card">
                                    <p className="Company__CardTitle">456</p>
                                    <p className="Company__CardTitle">48 Suppliers</p>
                                    <p className="Company__CardTitle">18 Emissions</p>
                                    <p className="Company__CardTitle">
                                        {ce.tons}
                                        {' '}
                                        Tons of Carbon
                                    </p>
                                    <p className="Company__CardTitle">{ce.description}</p>
                                    <form onSubmit={this.handleViewEmission}>
                                        <input
                                            type="submit"
                                            className="btn btn__Success btn__Center"
                                            value="VIEW"
                                        />
                                    </form>
                                </li>
                            ))
                        }

                    </ul>)
                    : (
                        <div className="Company__Grid Company__Grid--NoBorder">
                            <form onSubmit={this.handleSubmitReport}>
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
                                        <input
                                            type="text"
                                            name="newTones"
                                            value={newTones}
                                            onChange={this.handleChange}
                                            className="Submit__Description--Small"
                                        />
                                    </li>

                                    <li className="Submit__Card">
                                        <p>Description:</p>
                                        <input
                                            type="text"
                                            name="newDescription"
                                            value={newDescription}
                                            onChange={this.handleChange}
                                            className="Submit__Description"
                                        />
                                    </li>
                                </ul>
                                <div className="btn__Container">
                                    <input type="submit" className="btn btn__lg btn__Success btn__Center btn__NoMargin" value="SUBMIT REPORT" />
                                    <button className="btn btn__lg btn__Danger btn__Center btn__NoMargin" onClick={() => this.toggleOpeningReport()} type="button">CANCEL</button>
                                </div>
                            </form>
                        </div>
                    )}

            </div>
        );
    }
}


export default CompanyReport;
