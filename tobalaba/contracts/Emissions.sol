pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

/**
 * @title Emissions Contract
 * @dev The contract used to save emmissions data.
 */
contract Emissions {
    using SafeMath for uint256;

    struct Emission {
        uint256 timestamp;
        uint256 company;
        uint256 tons;
        bytes32 details;
    }

    Emission[] private emissions;
    uint256 totalEmissions;

    /**
     * @dev Constructor
     */
    constructor() public {
        totalEmissions = 0;
    }

    /**
     * @dev Upload information about emissions
     * @param timestamp the moment the report was done
     * @param tons
     * @param details the url for more details
     * @return An uint256 with the emission id
     */
    function upload(
        uint256 _timestamp,
        uint256 _company,
        uint256 _tons,
        bytes32 _details)
        public returns(uint256) {
        emissions.push(Emission(_timestamp, _company, _tons, _details));
        totalEmissions = totalEmissions.add(1);
        return totalEmissions;
    }

    /**
     * @dev Gets all the comapnies.
     * @return The total amount of emissions by all copanies.
     */
    function getTotal() public view returns (uint256) {
        return totalEmissions;
    }

    /**
     * @dev Get emission information
     * @return All the emission information
     */
    function get(uint256 _index)
        public view returns(uint256, uint256, uint256, bytes32) {
        return(
            emissions[_index].timestamp,
            emissions[_index].company,
            emissions[_index].tons,
            emissions[_index].details
        );
    }
}
