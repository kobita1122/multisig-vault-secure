const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MultiSigWallet", function () {
  it("Should deploy and require 2 confirmations", async function () {
    const [owner1, owner2, owner3, receiver] = await ethers.getSigners();
    const MultiSig = await ethers.getContractFactory("MultiSigWallet");
    const wallet = await MultiSig.deploy([owner1.address, owner2.address, owner3.address], 2);

    // Deposit 1 ETH
    await owner1.sendTransaction({ to: await wallet.getAddress(), value: ethers.parseEther("1.0") });

    // Submit a transaction to send 0.5 ETH to receiver
    await wallet.submitTransaction(receiver.address, ethers.parseEther("0.5"), "0x");
    
    // Confirm 1
    await wallet.connect(owner1).confirmTransaction(0);
    // Confirm 2
    await wallet.connect(owner2).confirmTransaction(0);

    // Execute
    const initialBalance = await ethers.provider.getBalance(receiver.address);
    await wallet.executeTransaction(0);
    const finalBalance = await ethers.provider.getBalance(receiver.address);

    expect(finalBalance - initialBalance).to.equal(ethers.parseEther("0.5"));
  });
});
