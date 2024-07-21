import { expect } from "chai";
import { ethers } from "hardhat";

describe("ERC223Token", function () {
  let Token: any;
  let token: any;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("ERC223Token");
    [owner, addr1, addr2] = await ethers.getSigners();
    token = await Token.deploy(ethers.parseUnits("1000", 18));
    // await token.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner balance", async function () {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(ownerBalance).to.equal(ethers.parseUnits("1000",36));
    });

    it("Should have the correct name and symbol", async function () {
      expect(await token.name()).to.equal("ERC223Token");
      expect(await token.symbol()).to.equal("ERC223");
    });

    it("Should have the correct decimals", async function () {
      expect(await token.decimals()).to.equal(18);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens correctly", async function () {
      await token["transfer(address,uint256,bytes)"](addr1.address, ethers.parseUnits("50"), "0x");
      const ownerBalance = await token.balanceOf(owner.address);
      const addr1Balance = await token.balanceOf(addr1.address);
      expect(ownerBalance).to.equal(ethers.parseUnits("999999999999999999950", 18));
      expect(addr1Balance).to.equal(ethers.parseUnits("50", 18));
    });

    it("Should emit Transfer event on successful transfer", async function () {
      await expect(token["transfer(address,uint256,bytes)"](addr1.address, ethers.parseUnits("50", 18), "0x"))
        .to.emit(token, "Transfer(address,address,uint256)") // Specify the full event signature
        .withArgs(owner.address, addr1.address, ethers.parseUnits("50", 18));
    });
    

    it("Should call tokenFallback on contract transfer", async function () {
      const recipient = await (await ethers.getContractFactory("TestERC223Recipient")).deploy();
      // await recipient.deployed();
    
      await expect(token["transfer(address,uint256,bytes)"](recipient.getAddress(), ethers.parseUnits("50", 18), "0x"))
        .to.emit(token, "Transfer(address,address,uint256)") // Specify the full event signature
        .withArgs(owner.address, recipient.getAddress(), ethers.parseUnits("50", 18));
    });
    
    it("Should revert on insufficient balance", async function () {
      await expect(token["transfer(address,uint256,bytes)"](addr1.address, ethers.parseUnits("1001", 36), "0x"))
        .to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");
    });
    
    it("Should revert on zero value transfer", async function () {
      await expect(token["transfer(address,uint256,bytes)"](addr1.address, ethers.parseUnits("0", 18), "0x"))
        .to.be.revertedWith("ERC20: transfer amount must be greater than zero");
    });
    
    

  });
});
