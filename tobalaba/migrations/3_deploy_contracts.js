const fs = require('fs');
const faker = require('faker');
const Companies = artifacts.require('./Companies.sol');

module.exports = (deployer) => {
    return deployer.then(() => deployer.deploy(Companies)).then(async (instance) => {
        const companies = JSON.parse(
            fs.readFileSync(`${__dirname}/injections/companies.json`, 'utf8'),
        );
        for (let c = 0; c < companies.length; c += 1) {
            const suppliers = [];
            const emissionsReports = [];
            const importedEmissions = [];
            let o;
            for (o = 0; o < parseInt(companies[c].suppliers / 10, 10); o += 1) {
                suppliers.push(faker.random.number());
            }
            for (o = 0; o < parseInt(companies[c].emissionsReports, 10); o += 1) {
                emissionsReports.push(faker.random.number());
                importedEmissions.push(faker.random.number());
            }
            instance.upload(
                suppliers,
                emissionsReports,
                importedEmissions,
                companies[c].name,
            );
        }
    });
};
