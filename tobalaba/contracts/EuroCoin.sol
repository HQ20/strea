pragma solidity ^0.4.24;
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract EuroCoin is ERC20 {
    string public name = "Euro Coin";
    string public symbol = "EUR";
    uint8 public decimals = 18;

    /**
    * @dev Constructor that gives each account 4096 coins.
    */
    constructor(address[10] memory accounts) public {
        uint256 totalTokensPerUser = 4096;
        uint256 INITIAL_SUPPLY = totalTokensPerUser
            * (10 ** uint256(decimals));

        for(uint256 a = 0; a < 10; a ++) {
            _mint(accounts[a], INITIAL_SUPPLY);
        }
    }
}
