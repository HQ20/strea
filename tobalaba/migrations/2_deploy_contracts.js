const Emissions = artifacts.require('./Emissions.sol');

module.exports = function (deployer) {
    deployer.deploy(Emissions);
};
