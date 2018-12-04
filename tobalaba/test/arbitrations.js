const ArbitrationsContract = artifacts.require('./Arbitrations.sol');

contract('Arbitrations', (accounts) => {
    let ArbitrationsContractInstance;

    before(async () => {
        ArbitrationsContractInstance = await ArbitrationsContract.deployed();
    });

    describe('Verify Arbitrations', () => {
        it('Add Arbitration', async () => {
            const company = 2;
            const bountyHunter = accounts[0];
            const emissionsReport = 1;
            const inputs = ['hmm', 'hee'];

            await ArbitrationsContractInstance.upload(
                company, bountyHunter, emissionsReport, inputs,
            );
        });

        it('Add another Arbitration', async () => {
            const company = 3;
            const bountyHunter = accounts[1];
            const emissionsReport = 3;
            const inputs = ['kx', 'iee', 'ieexxx'];

            await ArbitrationsContractInstance.upload(
                company, bountyHunter, emissionsReport, inputs,
            );
        });

        it('Get total Arbitrations', async () => {
            const totalArbitrations = await ArbitrationsContractInstance.getTotal();
            assert.equal(totalArbitrations * 1, 2, '');
        });

        it('Get Arbitration', async () => {
            const arbitration = await ArbitrationsContractInstance.get(0);
            assert.equal(arbitration[0] * 1, 2, '');
            assert.equal(arbitration[1], accounts[0], '');
            assert.equal(arbitration[2] * 1, 1, '');
            assert.equal(arbitration[3] * 1, 2, '');
        });

        it('Add Tribunal users', async () => {
            await ArbitrationsContractInstance.addTribunal(accounts[2]);
            await ArbitrationsContractInstance.addTribunal(accounts[3]);
        });

        it('Add Veredict to Arbitration', async () => {
            await ArbitrationsContractInstance.addVeredict(true, 2, { from: accounts[2] });
            await ArbitrationsContractInstance.addVeredict(false, 2, { from: accounts[3] });
        });

        it('Get total Veredicts from Arbitration', async () => {
            const total = await ArbitrationsContractInstance.getTotalVeredicts(2);
            assert.equal(total * 1, 2, '');
        });

        it('Get a Veredict from Arbitration', async () => {
            const veredict = await ArbitrationsContractInstance.getVeredict(2, 0);
            assert.equal(veredict[0], true, '');
            assert.equal(veredict[1], accounts[2], '');
        });
    });
});
