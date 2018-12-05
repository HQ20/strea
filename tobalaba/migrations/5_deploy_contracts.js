const EuroCoin = artifacts.require('./EuroCoin.sol');
const Escrow = artifacts.require('./Escrow.sol');

module.exports = (deployer, network, accounts) => {
    return deployer.then(() => deployer.deploy(EuroCoin, accounts)).then(() => {
        return deployer.deploy(Escrow, accounts[0], EuroCoin.address);
    });
};
