pragma solidity ^0.4.24;

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

/**
 * @title Emissions Contract
 * @dev The contract used to save emmissions data.
 */
contract Emissions {
    using SafeMath for uint256;

    struct Emission {
        uint256 timestamp;
        uint256 tons;
        uint256[] arbitrations;
        bytes32 description;
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
     * @return An uint256 with the emission id
     */
    function upload(
        uint256 _tons,
        uint256[] memory _arbitrations,
        bytes32 _description)
        public returns(uint256) {
        emissions.push(Emission(
            block.timestamp, _tons, _arbitrations, _description
        ));
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
            emissions[_index].tons,
            emissions[_index].arbitrations.length,
            emissions[_index].description
        );
    }

    function getArbitration(uint256 _indexEmission, uint256 _indexArbitration)
        public view returns(uint256) {
        return (emissions[_indexEmission].arbitrations[_indexArbitration]);
    }
}
