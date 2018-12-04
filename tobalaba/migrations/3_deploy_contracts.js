const Companies = artifacts.require('./Companies.sol');

module.exports = function (deployer) {
    deployer.deploy(Companies);
};
