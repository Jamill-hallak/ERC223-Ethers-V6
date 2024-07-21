// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface IERC223Recipient {
    function tokenFallback(address from, uint256 value, bytes calldata data) external;
}

contract ERC223Token is ERC20 {
    constructor(uint256 initialSupply) ERC20("ERC223Token", "ERC223") {
        _mint(msg.sender, initialSupply * (10 ** uint256(decimals())));
    }

    function transfer(address recipient, uint256 amount, bytes calldata data) public returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        emit Transfer(_msgSender(), recipient, amount, data);

        if (_isContract(recipient)) {
            IERC223Recipient(recipient).tokenFallback(_msgSender(), amount, data);
        }

        return true;
    }

    event Transfer(address indexed from, address indexed to, uint256 value, bytes indexed data);

    function _isContract(address account) private view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
