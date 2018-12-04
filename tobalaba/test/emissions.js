const EmissionsContract = artifacts.require('./Emissions.sol');

contract('Emissions', (accounts) => {
    let EmissionsContractInstance;

    before(async () => {
        EmissionsContractInstance = await EmissionsContract.deployed();
    });

    describe('Verify Emissions', () => {
        it('Add Emissions', async () => {
            EmissionsContractInstance.upload(12453837293, 4, 2, 'lol');
            EmissionsContractInstance.upload(16347546327, 2, 7, 'cat');
        });

        it('Get total Emissions', async () => {
            const totalEmissions = await EmissionsContractInstance.getTotal();
            assert.equal(totalEmissions * 1, 2, '');
        });

        it('Get Emission', async () => {
            const firstEmission = await EmissionsContractInstance.get(0);
            assert.equal(firstEmission[0], 12453837293);
            assert.equal(firstEmission[1], 4);
            assert.equal(firstEmission[2], 2);
            assert.equal(web3.toUtf8(firstEmission[3]), 'lol');
        });
    });
});
