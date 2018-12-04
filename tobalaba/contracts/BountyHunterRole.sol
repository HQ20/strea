pragma solidity ^0.4.24;

import "../node_modules/openzeppelin-solidity/contracts/access/Roles.sol";

contract BountyHunterRole {
    using Roles for Roles.Role;

    event BountyHunterAdded(address indexed account);
    event BountyHunterRemoved(address indexed account);

    Roles.Role private BountyHunters;

    constructor() internal {
        _addBountyHunter(msg.sender);
    }

    modifier onlyBountyHunter() {
        require(isBountyHunter(msg.sender), "");
        _;
    }

    function isBountyHunter(address account) public view returns (bool) {
        return BountyHunters.has(account);
    }

    function addBountyHunter(address account) public onlyBountyHunter {
        _addBountyHunter(account);
    }

    function renounceBountyHunter() public {
        _removeBountyHunter(msg.sender);
    }

    function _addBountyHunter(address account) internal {
        BountyHunters.add(account);
        emit BountyHunterAdded(account);
    }

    function _removeBountyHunter(address account) internal {
        BountyHunters.remove(account);
        emit BountyHunterRemoved(account);
    }
}
