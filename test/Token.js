const {ethers} = require('hardhat');
const { expect } = require('chai');
const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether');
}


describe("Token", () => {
  let token,accounts,deployer,reciever
 beforeEach(async () => {
  

  const Token = await ethers.getContractFactory("Token");
  token =  await Token.deploy('Dream coin','DC', '1000000');
 accounts = await ethers.getSigners();
  deployer = accounts[0];
  reciever = accounts[1];
 });


 describe('Deployment', () => {
    it('should pass the name', async() => {
      expect(await token.name()).to.equal('Dream coin');
    })
    it('should pass the symbol', async() => {
      expect(await token.symbol()).to.equal('DC');
    })
    it('should pass the totalsupply', async() => {
      expect(await token.totalSupply()).to.equal(tokens(1000000))
    })
    it('should pass the totalsupply', async() => {
      expect(await token.balanceOf(deployer.address)).to.equal(tokens(1000000))
    })
  })
  

 describe("it should transfer",() => {
    let value = tokens(1);
   
    beforeEach(async () => {
      let transaction = await token.connect(deployer).transfer(reciever.address,value);
      let result = await transaction.wait();
    })

    it('should pass transfer', async () => {
      it('should pass the totalsupply', async() => {
        expect(await token.balanceOf(reciever.address)).to.equal(value)
      })

    })



  })


})