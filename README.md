# Multi-Signature Vault Lite

This repository contains an expert-level implementation of a Multi-Sig Wallet. It allows a group of owners to manage funds collectively, ensuring no single individual can move assets without consensus.

## Core Logic
1. **Submit:** Any owner can submit a transaction proposal.
2. **Confirm:** Other owners must approve (confirm) the transaction.
3. **Execute:** Once the required threshold of confirmations is met, the transaction can be sent.

## Key Features
* **Customizable Threshold:** Set the number of required signatures (e.g., 2-of-3, 3-of-5).
* **Security First:** Protects against single points of failure and private key compromises.
* **Gas Optimized:** Efficient storage patterns to minimize Ethereum transaction costs.

## How to Use
1. Deploy `MultiSigWallet.sol` with an array of owner addresses and the required confirmation count.
2. Call `submitTransaction` to propose a spend.
3. Other owners call `confirmTransaction` using the transaction ID.
4. Call `executeTransaction` once the threshold is reached.
