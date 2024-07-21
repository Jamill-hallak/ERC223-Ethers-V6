// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC223Token.sol";

contract TestERC223Recipient is IERC223Recipient {
    event TokenReceived(address from, uint value, bytes data);

    function tokenFallback(address from, uint value, bytes calldata data) external override {
        emit TokenReceived(from, value, data);
    }
}
