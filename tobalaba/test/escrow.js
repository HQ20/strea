const assert = require('assert');
const EscrowContract = artifacts.require('./Escrow.sol');
const EuroCoinContract = artifacts.require('./EuroCoin.sol');

contract('Escrow', (accounts) => {
    let EscrowContractInstance;
    let EuroCoinContractInstance;

    const twoEther = web3.toWei(2, 'ether') * 1;
    before(async () => {
        EscrowContractInstance = await EscrowContract.deployed();
        EuroCoinContractInstance = await EuroCoinContract.deployed();
    });

    describe('Verify Escrow', () => {
        let oldBalanceUser;
        let oldBalanceCompany;
        let lastCase;
        it('Add Arbitration', async () => {
            oldBalanceUser = (await EuroCoinContractInstance.balanceOf(accounts[1])) * 1;
            oldBalanceCompany = (await EuroCoinContractInstance.balanceOf(accounts[2])) * 1;
            await EscrowContractInstance.escrow(
                accounts[1], twoEther, { from: accounts[2] },
            );
            lastCase = await EscrowContractInstance.getTotalCases() * 1 - 1;
            assert((oldBalanceUser - twoEther / 2)
                >= (await EuroCoinContractInstance.balanceOf(accounts[1])) * 1);
            assert((oldBalanceCompany - twoEther / 2)
                >= (await EuroCoinContractInstance.balanceOf(accounts[2])) * 1);
        });

        it('Resolve it', async () => {
            oldBalanceUser = (await EuroCoinContractInstance.balanceOf(accounts[1])) * 1;
            oldBalanceCompany = (await EuroCoinContractInstance.balanceOf(accounts[2])) * 1;
            await EscrowContractInstance.revertTo(lastCase, true);
            const newBalanceUser = (await EuroCoinContractInstance.balanceOf(accounts[1])) * 1;
            const newBalanceCompany = (await EuroCoinContractInstance.balanceOf(accounts[2])) * 1;
            assert((web3.fromWei(oldBalanceUser) * 1 + web3.fromWei(twoEther) * 1)
                >= web3.fromWei(newBalanceUser) * 1);
            assert.equal(web3.fromWei(oldBalanceCompany) * 1,
                web3.fromWei(newBalanceCompany) * 1);
        });
    });
});
