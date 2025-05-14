import { useEffect } from 'react'
import {
    useAppKitState,
    useAppKitEvents,
    useAppKitAccount,
    useWalletInfo
     } from '@reown/appkit/react'
import { useWaitForTransactionReceipt } from 'wagmi'

interface InfoListProps {
    hash: `0x${string}` | undefined;
    signedMsg: string;
    balance: string;
}

export const InfoList = ({ hash, signedMsg, balance }: InfoListProps) => {
    // const kitTheme = useAppKitTheme(); // AppKit hook to get the theme information and theme actions 
    const state = useAppKitState(); // AppKit hook to get the state
    const {address, caipAddress, isConnected, status, embeddedWalletInfo } = useAppKitAccount(); // AppKit hook to get the account information
    const events = useAppKitEvents() // AppKit hook to get the events
    const { walletInfo } = useWalletInfo() // AppKit hook to get the wallet info

    const { data: receipt } = useWaitForTransactionReceipt({ hash, confirmations: 2,  // Wait for at least 2 confirmation
        timeout: 300000,    // Timeout in milliseconds (5 minutes)
        pollingInterval: 1000,  })

    useEffect(() => {
        console.log("Events: ", events);
    }, [events]);

    useEffect(() => {
        console.log("Embedded Wallet Info: ", embeddedWalletInfo);
    }, [embeddedWalletInfo]);

  return (
    <>
        {balance && (
        <section style={{border: "2px solid darkgreen"}}>
            <h2>Solde: {balance}</h2>
        </section>
        )}
        {hash && (
        <section style={{border: "2px solid darkblue"}}>
            <h2>Signer Transaction</h2>
            <pre>
                Hash: {hash}<br />
                Status: {receipt?.status.toString()}<br />
            </pre>
        </section>
        )}
        {signedMsg && (
        <section style={{border: "2px solid darkred"}}>
            <h2>Signer un msg</h2>
            <pre>
                Message signé: {signedMsg}<br />
            </pre>
        </section>
        )}
        <section>
            <pre>
                Adresse: {address}<br />
                Adresse caip: {caipAddress}<br />
                Connecté: {isConnected.toString()}<br />
                Status: {status}<br />
                Type de compte: {embeddedWalletInfo?.accountType}<br />
                {embeddedWalletInfo?.user?.email && (`Email: ${embeddedWalletInfo?.user?.email}\n`)}
                {embeddedWalletInfo?.user?.username && (`Username: ${embeddedWalletInfo?.user?.username}\n`)}
                {embeddedWalletInfo?.authProvider && (`Provider: ${embeddedWalletInfo?.authProvider}\n`)}
            </pre>
            <pre>
                Id du réseaux sélectionné: {state.selectedNetworkId?.toString()}<br />
                Chain actif: {state.activeChain}<br />
                chargement: {state.loading.toString()}<br />
                ouvert: {state.open.toString()}<br />
            </pre>
        </section>

        <section>
            <h2>Informations de Wallet</h2>
            <pre>
                {JSON.stringify(walletInfo)}<br />
            </pre>
        </section>
    </>
  )
}
