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

    struct Verdicts {
        bool agreed;
        address tribunal;
    }
    struct Arbitration {
        bool isOpen;
        address bountyHunter;
        uint256 timestamp;
        bytes32[] inputs;
    }

    Arbitration[] private arbitration;
    uint256 totalArbitration;

    mapping(uint256 => Verdicts[]) private verdicts;
    mapping(uint256 => uint256) private totalVerdicts;

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
        bytes32[] memory _inputs)
        public onlyBountyHunter returns(uint256) {
        arbitration.push(
            Arbitration(true, msg.sender, block.timestamp, _inputs)
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
        public view returns(bool, address, uint256, uint256){
        return(
            arbitration[_index].isOpen,
            arbitration[_index].bountyHunter,
            arbitration[_index].timestamp,
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
     * @dev Add verdict to arbitration
     */
    function addVerdict(bool _agreed, uint256 _abitration) public onlyTribunal {
        require(arbitration[_abitration].isOpen == true, "");
        verdicts[_abitration].push(Verdicts(_agreed, msg.sender));
        totalVerdicts[_abitration] = totalVerdicts[_abitration].add(1);
        if(totalVerdicts[_abitration] > 4) {
            arbitration[_abitration].isOpen = false;
        }
    }

    /**
     * @dev Get total verdicts by arbitration case
     */
    function getTotalVerdicts(uint256 _abitration) public view returns(uint256) {
        return totalVerdicts[_abitration];
    }

    /**
     * @dev Get a verdict in abitration case
     */
    function getVerdict(uint256 _abitration, uint256 _index) public view returns(bool, address) {
        return (
            verdicts[_abitration][_index].agreed, verdicts[_abitration][_index].tribunal
        );
    }
}
