const ArbitrationsContract = artifacts.require('./Arbitrations.sol');

contract('Arbitrations', (accounts) => {
    let ArbitrationsContractInstance;

    before(async () => {
        ArbitrationsContractInstance = await ArbitrationsContract.deployed();
    });

    describe('Verify Arbitrations', () => {
        it('Add Arbitration', async () => {
            const inputs = ['hmm', 'hee'];

            await ArbitrationsContractInstance.upload(
                inputs, { from: accounts[0] },
            );
        });

        it('Add another Arbitration', async () => {
            const inputs = ['kx', 'iee', 'ieexxx'];

            await ArbitrationsContractInstance.upload(
                inputs, { from: accounts[0] },
            );
        });

        it('Get total Arbitrations', async () => {
            const totalArbitrations = await ArbitrationsContractInstance.getTotal();
            assert.equal(totalArbitrations * 1, 2, '');
        });

        it('Get Arbitration', async () => {
            const arbitration = await ArbitrationsContractInstance.get(0);
            assert.equal(arbitration[0], true, '');
            assert.equal(arbitration[1], accounts[0], '');
            assert.equal(arbitration[3] * 1, 2, '');
        });

        it('Add Tribunal users', async () => {
            await ArbitrationsContractInstance.addTribunal(accounts[2]);
            await ArbitrationsContractInstance.addTribunal(accounts[3]);
        });

        it('Add Verdict to Arbitration', async () => {
            await ArbitrationsContractInstance.addVerdict(true, 0, { from: accounts[2] });
            await ArbitrationsContractInstance.addVerdict(false, 0, { from: accounts[3] });
        });

        it('Get total Verdicts from Arbitration', async () => {
            const total = await ArbitrationsContractInstance.getTotalVerdicts(0);
            assert.equal(total * 1, 2, '');
        });

        it('Get a Verdict from Arbitration', async () => {
            const verdict = await ArbitrationsContractInstance.getVerdict(0, 0);
            assert.equal(verdict[0], true, '');
            assert.equal(verdict[1], accounts[2], '');
        });
    });
});
