pragma solidity ^0.4.24;

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./TribunalRole.sol";
import "./BountyHunterRole.sol";

/**
 * @title Arbitration Contract
 * @dev The contract used to save arbitration data.
 */
contract Arbitrations is BountyHunterRole, TribunalRole {
    using SafeMath for uint256;

    struct Veredicts {
        bool agreed;
        address tribunal;
    }
    struct Arbitration {
        address bountyHunter;
        uint256 company;
        uint256 emissionsReport;
        bytes32[] inputs;
    }

    Arbitration[] private arbitration;
    uint256 totalArbitration;

    mapping(uint256 => Veredicts[]) private veredicts;
    mapping(uint256 => uint256) private totalVeredicts;

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
        public onlyBountyHunter returns(uint256) {
        arbitration.push(
            Arbitration(_bountyHunter, _company, _emissionsReport, _inputs)
        );
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
        );
    }

    /**
     * @dev Get inputs from arbitration
     */
    function getInput(uint256 _arbitrationIndex, uint256 _inputIndex)
        public view returns(bytes32) {
        return (arbitration[_arbitrationIndex].inputs[_inputIndex]);
    }

    /**
     * @dev Add veredict to arbitration
     */
    function addVeredict(bool _agreed, uint256 _company) public onlyTribunal {
        veredicts[_company].push(Veredicts(_agreed, msg.sender));
        totalVeredicts[_company] = totalVeredicts[_company].add(1);
    }

    /**
     * @dev Get total veredicts by company
     */
    function getTotalVeredicts(uint256 _company) public view returns(uint256) {
        return totalVeredicts[_company];
    }

    /**
     * @dev Get a veredict in company
     */
    function getVeredict(uint256 _company, uint256 _index) public view returns(bool, address) {
        return (
            veredicts[_company][_index].agreed, veredicts[_company][_index].tribunal
        );
    }
}
