const {  loadFixture,} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("MyToken", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {

    const tokenName = "MyToken";
    const tokenSymbol = "MTK" 

    const MyToken = await ethers.getContractFactory("MyToken");
    const mytoken = await MyToken.deploy(tokenName,tokenSymbol);

    return { mytoken, tokenName, tokenSymbol };
  }

  it("Should deploy and set the name and symbol correctly", async function () {
    const { mytoken, tokenName, tokenSymbol } = await loadFixture(
      deployContractAndSetVariables
    );

    expect(await mytoken.name()).to.equal(tokenName);
    expect(await mytoken.symbol()).to.equal(tokenSymbol);;
  });
});
