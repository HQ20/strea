pragma solidity ^0.4.24;

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

/**
 * @title Arbitration Contract
 * @dev The contract used to save arbitration data.
 */
contract Arbitrations {
    using SafeMath for uint256;

    uint256 storedData;

    struct Veredicts {
        bool agreed;
        address tribunal;
    }
    struct Arbitration {
        address bountyHunter;
        uint256 company;
        uint256 emissionsReport;
        bytes32[] inputs;
        //Veredicts[] veredicts;
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
        uint256 _emissionsReport,
        bytes32[] memory _inputs)
        public returns(uint256) {
        arbitration.push(Arbitration(_bountyHunter, _company, _emissionsReport, _inputs));
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
        public view returns(uint256, address, uint256, uint256){
        return(
            arbitration[_index].company,
            arbitration[_index].bountyHunter,
            arbitration[_index].emissionsReport,
            arbitration[_index].inputs.length
            //arbitration[_index].veredicts.length
        );
    }
}
