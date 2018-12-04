pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

/**
 * @title Companies Contract
 * @dev The contract used to save companies data.
 */
contract Companies {
    using SafeMath for uint256;

    struct Company {
        uint256[] suppliers;
        uint256[] iEmissions;
    }

    Company[] private company;
    uint256 totalCompanies;

    /**
     * @dev Constructor
     */
    constructor() public {
        totalCompanies = 0;
    }

    /**
     * @dev Upload information about emissions
     * @param timestamp the moment the report was done
     * @return An uint256 with the emission id
     */
    function upload(
        uint256[] memory _suppliers,
        uint256[] memory _iEmissions)
        public returns(uint256) {
        company.push(Company(_suppliers, _iEmissions));
        totalCompanies = totalCompanies.add(1);
        return totalCompanies;
    }

    /**
     * @dev Gets the saved number.
     * @return An uint256 representing the saved number.
     */
    function getTotal() public view returns (uint256) {
        return totalCompanies;
    }

    /**
     * Since the structure of a company is a list of things, let's first
     * return those list sizes
     * @dev Get company information (array sizes for example)
     * @return Needed information
     */
    function get(uint256 _index) public view returns (uint256, uint256) {
        return(
            company[_index].suppliers.length,
            company[_index].iEmissions.length
        );
    }

    /**
     * @dev Get supplier information
     * @return Supplier information
     */
    function getSupplier(uint256 _companyIndex, uint256 _supplierIndex)
        public view returns (uint256) {
        return(company[_companyIndex].suppliers[_supplierIndex]);
    }
}
