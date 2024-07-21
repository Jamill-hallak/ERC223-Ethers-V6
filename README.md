# ERC223Token

![Screenshot 2024-07-21 151337](https://github.com/user-attachments/assets/142fcbc4-0341-4082-86c0-fa8794ef27d5)

This repository contains an ERC-223 compatible token implementation on the Ethereum blockchain. The ERC-223 standard improves upon the ERC-20 standard by preventing accidental token loss and offering a more efficient transfer process.

## Contract Details

- **Name**: ERC223Token
- **Symbol**: ERC223
- **Decimals**: 18

The `ERC223Token` contract inherits from OpenZeppelin's `ERC20` contract and adds support for the ERC-223 standard by implementing a `transfer` function that accepts a `bytes` parameter and handles token reception by contracts.

## Custom Errors

- **ERC20InsufficientBalance**: Thrown when attempting to transfer more tokens than the sender's balance.
- **ERC20TransferAmountMustBeGreaterThanZero**: Thrown when attempting to transfer zero tokens.

## Unit Tests

Unit tests are written using Hardhat and TypeScript, covering:

- Deployment and initial balance checks.
- Successful token transfers and event emissions.
- Contract transfers and `tokenFallback` calls.
- Reversion conditions for insufficient balance and zero value transfers.

### Using ethers.js v6

This project uses ethers.js v6. Function calls and custom error handling have been updated to align with ethers.js v6 changes.
