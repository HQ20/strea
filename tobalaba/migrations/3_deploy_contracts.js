const fs = require('fs');
const Emissions = artifacts.require('./Emissions.sol');

module.exports = (deployer) => {
    return deployer.then(() => deployer.deploy(Emissions)).then(async (instance) => {
        const emissions = JSON.parse(
            fs.readFileSync(`${__dirname}/injections/emissions.json`, 'utf8'),
        );
        for (let c = 0; c < emissions.length; c += 1) {
            instance.upload(
                emissions[c].tons,
                emissions[c].arbitrations,
                emissions[c].description,
            );
        }
    });
};
