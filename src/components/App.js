import { useEffect } from 'react';
import { ethers } from 'ethers';
import config from '../config.json';
import { useDispatch } from 'react-redux';
import {loadProvider, loadNetwork, loadAccount, loadTokens, loadExchange } from '../store/interactions';



function App() {

  const dispatch = useDispatch()

  const loadBlockchainData = async () => {
    
 

    // Connect Ethers to blockchain
    const provider = loadProvider(dispatch)
    const chainId = await loadNetwork(provider,dispatch)
     
      await loadAccount(provider,dispatch)
    const DApp = config[chainId].DApp
    const mETH = config[chainId].mETH
      
      //Token smart contract instance
       await loadTokens(provider,[DApp.address,mETH.address],dispatch)

       const exchangeConfig = config[chainId].exchange
       await loadExchange(provider,exchangeConfig.address,dispatch)


       
    
  }

  useEffect(() => {
    loadBlockchainData()
  })

  return (
    <div>

      {/* Navbar */}

      <main className='exchange grid'>
        <section className='exchange__section--left grid'>
       

          {/* Markets */}

          {/* Balance */}

          {/* Order */}

        </section>
        <section className='exchange__section--right grid'>

          {/* PriceChart */}

          {/* Transactions */}

          {/* Trades */}

          {/* OrderBook */}

        </section>
      </main>

      {/* Alert */}

    </div>
  );
}

export default App;
