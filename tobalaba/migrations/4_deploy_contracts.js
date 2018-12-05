const Arbitrations = artifacts.require('./Arbitrations.sol');

module.exports = (deployer) => {
    deployer.deploy(Arbitrations);
};
