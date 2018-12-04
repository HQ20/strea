const EmissionsContract = artifacts.require('./Emissions.sol');

contract('Emissions', (accounts) => {
    let EmissionsContractInstance;

    before(async () => {
        EmissionsContractInstance = await EmissionsContract.deployed();
    });

    describe('Verify Emissions', () => {
        it('Add Emissions', async () => {
            const arbitrations = [];
            await EmissionsContractInstance.upload(2, arbitrations, 'lol', 'again');
            await EmissionsContractInstance.upload(7, arbitrations, 'cat', 'what');
        });

        it('Get total Emissions', async () => {
            const totalEmissions = await EmissionsContractInstance.getTotal();
            assert.equal(totalEmissions * 1, 2, '');
        });

        it('Get Emission', async () => {
            const firstEmission = await EmissionsContractInstance.get(0);
            assert.equal(firstEmission[1] * 1, 2);
            assert.equal(firstEmission[2], 0);
            assert.equal(web3.toUtf8(firstEmission[3]), 'lol');
            assert.equal(web3.toUtf8(firstEmission[4]), 'again');
        });
    });
});
