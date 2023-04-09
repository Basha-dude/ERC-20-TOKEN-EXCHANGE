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
    it(' it should pass the symbol', async() => {
      expect(await token.symbol()).to.equal('DC');
    })
    it(' it should pass the totalsupply', async() => {
      expect(await token.totalSupply()).to.equal(tokens(1000000))
    })
    it(' it should pass the totalsupply', async() => {
      expect(await token.balanceOf(deployer.address)).to.equal(tokens(1000000))
    })
  })
  

  describe("it should transfer",() => {
    let transaction,result,amount = tokens(100);
    describe("Success",() => {
      beforeEach(async () => {
        transaction = await token.connect(deployer).transfer(reciever.address,amount);
        result = await transaction.wait();
       
     })
 
       it('should pass transfer', async () => {
         it('should pass the totalsupply', async() => {
           expect(await token.balanceOf(reciever.address)).to.equal(amount)
          
         })
   
       })
 
       it("should emit an event",async () => {
         const events = result.events[0]
         expect(events.event).to.equal("Transfer")
         const args = events.args
         expect(args.from).to.equal(deployer.address)
         expect(args.to).to.equal(reciever.address)
         expect(args.value).to.equal(amount)
 
       })


    })
   
    describe("Failure",() => {
      it(" it should reject insufficient amount", async () => {
        const invalidAmount = tokens(100000000);
      await expect(token.connect(deployer).transfer(reciever.address,invalidAmount)).to.be.reverted 
      })
      it(" it should reject invalid recipent", async () => {
      
      await expect(token.connect(deployer).transfer('0x0000000000000000000000000000000000000000',amount)).to.be.reverted 
      })
      

    })
    
  })


})