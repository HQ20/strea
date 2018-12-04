pragma solidity ^0.4.24;

import "../node_modules/openzeppelin-solidity/contracts/access/Roles.sol";

contract TribunalRole {
    using Roles for Roles.Role;

    event TribunalAdded(address indexed account);
    event TribunalRemoved(address indexed account);

    Roles.Role private Tribunals;

    constructor() internal {
        _addTribunal(msg.sender);
    }

    modifier onlyTribunal() {
        require(isTribunal(msg.sender), "");
        _;
    }

    function isTribunal(address account) public view returns (bool) {
        return Tribunals.has(account);
    }

    function addTribunal(address account) public onlyTribunal {
        _addTribunal(account);
    }

    function renounceTribunal() public {
        _removeTribunal(msg.sender);
    }

    function _addTribunal(address account) internal {
        Tribunals.add(account);
        emit TribunalAdded(account);
    }

    function _removeTribunal(address account) internal {
        Tribunals.remove(account);
        emit TribunalRemoved(account);
    }
}
