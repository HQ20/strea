pragma solidity ^0.4.24;

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

/**
 * @title Arbitration Contract
 * @dev The contract used to save arbitration data.
 */
contract Arbitrations {
    using SafeMath for uint256;

    uint256 storedData;

    struct Arbitration {
        uint256 company;
        address bountyHunter;
        bytes32 emissionsReport;
    }

    Arbitration[] private arbitration;
    uint256 totalArbitration;

    /**
     * @dev Constructor
     */
    constructor() public {
        totalArbitration = 0;
    }

    /**
     * @dev Upload information about emissions
     * @return An uint256 with the emission id
     */
    function upload(
        uint256 _company,
        address _bountyHunter,
        bytes32 _emissionsReport)
        public returns(uint256) {
        arbitration.push(Arbitration(_company, _bountyHunter, _emissionsReport));
        totalArbitration = totalArbitration.add(1);
        return totalArbitration;
    }

    /**
     * @dev Gets total arbitrations.
     * @return Total arbitrations.
     */
    function getTotal() public view returns (uint256) {
        return totalArbitration;
    }

    /**
     * @dev Get arbitration information
     */
    function get(uint256 _index)
        public view returns(uint256, address, bytes32){
        return(
            arbitration[_index].company,
            arbitration[_index].bountyHunter,
            arbitration[_index].emissionsReport
        );
    }
}
