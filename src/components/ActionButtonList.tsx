import { useEffect } from 'react';
import { useDisconnect, useAppKit, useAppKitNetwork, useAppKitAccount  } from '@reown/appkit/react'
import { parseGwei, type Address } from 'viem'
import { useEstimateGas, useSendTransaction, useSignMessage, useBalance } from 'wagmi'
import { networks } from '../config'

// test transaction
const TEST_TX = {
  to: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045" as Address, // vitalik address
  value: parseGwei('0.0001')
}

interface ActionButtonListProps {
  sendHash: (hash: `0x${string}` ) => void;
  sendSignMsg: (hash: string) => void;
  sendBalance: (balance: string) => void;
}

export const ActionButtonList = ({ sendHash, sendSignMsg, sendBalance }: ActionButtonListProps) => {
    const { disconnect } = useDisconnect(); // AppKit hook to disconnect
    const { open } = useAppKit(); // AppKit hook to open the modal
    const { switchNetwork } = useAppKitNetwork(); // AppKithook to switch network
    const { address, isConnected } = useAppKitAccount() // AppKit hook to get the address and check if the user is connected

    const { data: gas } = useEstimateGas({...TEST_TX}); // Wagmi hook to estimate gas
    const { data: hash, sendTransaction, } = useSendTransaction(); // Wagmi hook to send a transaction
    const { signMessageAsync } = useSignMessage() // Wagmi hook to sign a message
    const { refetch } = useBalance({
      address: address as Address
    }); // Wagmi hook to get the balance

    
    useEffect(() => {
        if (hash) {
          sendHash(hash);
        }
    }, [hash, sendHash]);

    // function to send a tx
    const handleSendTx = () => {
      try {
        sendTransaction({
          ...TEST_TX,
          gas // Add the gas to the transaction
        });
      } catch (err) {
        console.log('Error sending transaction:', err);
      }
    }

    // function to sing a msg 
    const handleSignMsg = async () => {
      const msg = `ZedTestApp: Ceci est un message à signer. rand#${Math.floor(Math.random() * 100)}` // message to sign
      const sig = await signMessageAsync({ message: msg, account: address as Address }); 
      sendSignMsg(sig);
    }

    // function to get the balance
    const handleGetBalance = async () => {
      const balance = await refetch()
      sendBalance(`${balance?.data?.value.toString()} ${balance?.data?.symbol.toString()}`)
    }

    const handleDisconnect = async () => {
      try {
        await disconnect();
      } catch (error) {
        console.error("Failed to disconnect:", error);
      }
    };


  return (
    isConnected && (
    <div >
        <button type="button" onClick={() => open()}>Opérations</button>
        <button type="button" onClick={handleDisconnect}>Déconnecter</button>
        <button type="button" onClick={() => switchNetwork(networks[0]) }>Permuter (à mainnet)</button>
        <button type="button" onClick={() => switchNetwork(networks[1]) }>Permuter (à arbitrum)</button>
        <button type="button" onClick={handleSignMsg}>Signer un message</button>
        <button type="button" onClick={handleSendTx}>Initier une transaction</button>
        <button type="button" onClick={handleGetBalance}>Obtenir le solde</button>  
    </div>
    )
  )
}
