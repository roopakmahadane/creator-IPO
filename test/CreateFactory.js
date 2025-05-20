const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CreateFactory", function () {
  async function deployERC20Factory() {
    const CreatorFactory = await ethers.getContractFactory("CreatorFactory");
    const creatorFactory = await CreatorFactory.deploy();

    return { creatorFactory };
  }

  describe("Should deploy a new creator token", function () {
    it("Should deploy a new creator token", async function () {
      const deployFactory = await deployERC20Factory();
      const { creatorFactory } = deployFactory;
      const tokensLengthBefore = await creatorFactory.allTokens();


       const tx = await creatorFactory.createToken("RoopakToken", "RPK", 100);
       await tx.wait();

       const tokensLengthAfter = await creatorFactory.allTokens();


       expect(tokensLengthAfter.length).to.greaterThan(tokensLengthBefore.length);

    });
    it("Should able to deploy multiple token by same creator", async function () {
      const deployFactory = await deployERC20Factory();
      const { creatorFactory } = deployFactory;
      const tokensLengthBefore = await creatorFactory.allTokens();

       const tx1 = await creatorFactory.createToken("RoopakToken", "RPK", 100);
       await tx1.wait();

       const tx2 = await creatorFactory.createToken("RoopakToken", "RPK", 100);
       await tx2.wait();

       const tokensLengthAfter = await creatorFactory.allTokens();

       expect(tokensLengthAfter.length).to.equal(2);

    });
    it("tokenByCreator[creator] should correctly lists tokens created by the caller", async function () {
      const deployFactory = await deployERC20Factory();
      const { creatorFactory } = deployFactory;
      const [account1, account2] = await ethers.getSigners();

      const account1Address = account1.getAddress();
      const account2Address = account2.getAddress();

       const tx1 = await creatorFactory.connect(account1).createToken("Test1", "T1", 100);
       await tx1.wait();

       const tx2 = await creatorFactory.connect(account1).createToken("Test2", "T2", 100);
       await tx2.wait();

       const tx3 = await creatorFactory.connect(account2).createToken("Test3", "T3", 100);
       await tx3.wait();

      const getTokensByAccount1 = await creatorFactory.getTokensByCreator(account1Address);
      const getTokensByAccount2 = await creatorFactory.getTokensByCreator(account2Address);

      console.log(getTokensByAccount2.length);

       expect(getTokensByAccount1.length).to.equal(2);
       expect(getTokensByAccount2.length).to.equal(1);

    });
    it("tokenMetadata[tokenAddress] should contain the correct name and symbol.", async function () {
      const deployFactory = await deployERC20Factory();
      const { creatorFactory } = deployFactory;
   

       const tx1 = await creatorFactory.createToken("Test1", "T1", 100);
       await tx1.wait();

       const tokensAddress = await creatorFactory.allTokens();
       console.log('token address', tokensAddress[0]);

       const tokenMetaData = await creatorFactory.tokenMetadata(tokensAddress[0]);
        console.log("tokenMetaData",tokenMetaData );

       expect(tokenMetaData.length).to.not.equal(0);

    });

   
  });
 
});
