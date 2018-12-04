const Arbitrations = artifacts.require('./Arbitrations.sol');

module.exports = function (deployer) {
    deployer.deploy(Arbitrations);
};
