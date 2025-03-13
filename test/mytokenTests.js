const {  loadFixture,} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {

    const tokenName = "MyToken";
    const tokenSymbol = "MTK" 

    const MyToken = await ethers.getContractFactory("MyToken");
    const mytoken = await MyToken.deploy(tokenName,tokenSymbol);

    const [deployer, account] = await ethers.getSigners();

    return { mytoken, tokenName, tokenSymbol, deployer, account };
  }

  it("Should deploy and set the name and symbol correctly", async function () {
    const { mytoken, tokenName, tokenSymbol, deployer } = await loadFixture(
      deployContractAndSetVariables
    );

    const _initialSupply = BigInt(100 * (10 ** 18));

    expect(await mytoken.balanceOf(deployer.address)).to.equal(_initialSupply);
    expect(await mytoken.name()).to.equal(tokenName);
    expect(await mytoken.symbol()).to.equal(tokenSymbol);
  });

  it("Should return the total number of tokens available when the contract is deployed", async function () {
    const { mytoken } = await loadFixture(
      deployContractAndSetVariables
    );

    const _initialSupply = BigInt(100 * (10 ** 18));

    expect(await mytoken.totalSupply()).to.equal(_initialSupply);
  });

  it("Should return the balance of the address passed as a parameter of the function balanceOf", async function () {
    const { mytoken, account } = await loadFixture (
      deployContractAndSetVariables
    );

    const transfer_amount = 200;
    await mytoken.transfer(account.address, transfer_amount);

    expect(await mytoken.balanceOf(account.address)).to.equal(transfer_amount);
  })

  it ("Should revert with the right error if the zero address is passed in transfer()", async function() {
    const { mytoken } = await loadFixture(
      deployContractAndSetVariables
    );

    const receiver_account = ethers.ZeroAddress;

    await expect(mytoken.transfer(receiver_account,200)).to.be.revertedWith("Transfer to the zero address is not allowed.");
  })

  it ("Should return with the right error if sending ammount in transfer() is greater than sender balance", async function() {
    const { mytoken, deployer, account } = await loadFixture(
      deployContractAndSetVariables
    );

    const msg_sender = mytoken.connect(account);

    await expect(msg_sender.transfer(deployer.address,100)).to.be.revertedWith("You dont have enough funds.");
  })

});
