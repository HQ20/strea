const CompaniesContract = artifacts.require('./Companies.sol');

contract('Companies', (accounts) => {
    let CompaniesContractInstance;

    before(async () => {
        CompaniesContractInstance = await CompaniesContract.deployed();
    });

    describe('Verify Companies', () => {
        it('Add Companies', async () => {
            const suppliers = [2, 4];
            const importedEmissions = [1, 5, 8];
            const emissionsReports = [2, 3, 5, 12];

            await CompaniesContractInstance.upload(suppliers, importedEmissions, emissionsReports);
        });

        it('Get total Companies', async () => {
            const totalEmissions = await CompaniesContractInstance.getTotal();
            assert.equal(totalEmissions * 1, 1, '');
        });

        it('Get Company', async () => {
            const firstEmission = await CompaniesContractInstance.get(0);
            assert.equal(firstEmission[0] * 1, 2);
            assert.equal(firstEmission[1] * 1, 3);
            assert.equal(firstEmission[2] * 1, 4);
        });
    });
});
