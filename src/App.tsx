import { createAppKit } from '@reown/appkit/react'

import { WagmiProvider } from 'wagmi'
import { useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ActionButtonList } from './components/ActionButtonList'
import { SmartContractActionButtonList } from './components/SmartContractActionButtonList'
import { InfoList } from './components/InfoList'
import { projectId, metadata, networks, wagmiAdapter } from './config'

import "./App.css"

const queryClient = new QueryClient()

const generalConfig = {
  projectId,
  networks,
  metadata,
  themeMode: 'light' as const,
  themeVariables: {
    '--w3m-accent': '#000000',
  }
}

// Create modal
createAppKit({
  adapters: [wagmiAdapter],
  ...generalConfig,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

export function App() {
  const [transactionHash, setTransactionHash] = useState<`0x${string}` | undefined>(undefined);
  const [signedMsg, setSignedMsg] = useState('');
  const [balance, setBalance] = useState('');

  /**
   * Callback function to receive a transaction hash from the ActionButtonList component
   * and update the state with the transaction hash
   * @param hash The transaction hash
   */
  const receiveHash = (hash: `0x${string}`) => {
    setTransactionHash(hash); // Update the state with the transaction hash
  };

  /**
   * Callback function to receive a signed message from the ActionButtonList component
   * and update the state with the signed message
   * @param signedMsg The signed message
   */
  const receiveSignedMsg = (signedMsg: string) => {
    setSignedMsg(signedMsg); // Update the state with the transaction hash
  };

/**
 * Callback function to receive a balance from the ActionButtonList component
 * and update the state with the received balance.
 * @param balance The balance string to be set in the state.
 */

  const receivebalance = (balance: string) => {
    setBalance(balance)
  }

  return (
    <div className={"pages"} style={{"margin": "20px"}}>
      <h1>Testing App</h1>
      <em><pre>AppKit + Wagmi</pre></em>
      <hr/>
      <WagmiProvider config={wagmiAdapter.wagmiConfig}>
        <QueryClientProvider client={queryClient}>
            <button style={{padding: "15px", fontSize: "20px", backgroundColor: "rgba(0, 0, 0, 0.05)", color: "white"}} type="button">         
                <appkit-button size="xxl" label="Connecter un Wallet" />
            </button>
            <ActionButtonList sendHash={receiveHash} sendSignMsg={receiveSignedMsg} sendBalance={receivebalance}/>
            <SmartContractActionButtonList />
            <InfoList hash={transactionHash} signedMsg={signedMsg} balance={balance}/>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  )
}

export default App
