const CompaniesContract = artifacts.require('./Companies.sol');

contract('Companies', (accounts) => {
    let CompaniesContractInstance;

    before(async () => {
        CompaniesContractInstance = await CompaniesContract.deployed();
    });

    describe('Verify Companies', () => {
        it('Add Company', async () => {
            const suppliers = [2, 4];
            const importedEmissions = [1, 5, 8];
            const emissionsReports = [2, 3, 5, 12];
            const name = 'Some name';

            await CompaniesContractInstance
                .upload(suppliers, importedEmissions, emissionsReports, name);
        });

        it('Add Another Company', async () => {
            const suppliers = [1, 3, 5];
            const importedEmissions = [2, 3, 4];
            const emissionsReports = [1, 4];
            const name = 'Some other name';

            await CompaniesContractInstance
                .upload(suppliers, importedEmissions, emissionsReports, name);
        });

        it('Get total Companies', async () => {
            const totalEmissions = await CompaniesContractInstance.getTotal();
            assert.equal(totalEmissions * 1, 2, '');
        });

        it('Get Company', async () => {
            const firstEmission = await CompaniesContractInstance.get(0);
            assert.equal(firstEmission[0] * 1, 2);
            assert.equal(firstEmission[1] * 1, 3);
            assert.equal(firstEmission[2] * 1, 4);
        });

        it('Get Company Supplier', async () => {
            const firstSupplier = await CompaniesContractInstance.getSupplier(0, 0);
            assert.equal(firstSupplier * 1, 2);
        });
    });
});
