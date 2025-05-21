import { useState, useEffect } from "react";
import {ethers} from "ethers";


const WalletConnect = () => {
    const [walletAddress, setWalletAddress] = useState("");

    useEffect(() => {
        const wasConnected = sessionStorage.getItem("walletConnected");
        const checkConnectedWallet = async() => {
            if(wasConnected && window.ethereum){
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    const accounts = await provider.send("eth_accounts", []);
                    setWalletAddress(accounts[0]);
                    console.log("Connected address:", walletAddress);
                      
            }
        }
        checkConnectedWallet();
        if(wasConnected && window.ethereum){
            window.ethereum.on('accountsChanged', (accounts) => {
                if(accounts.length > 0){
                    setWalletAddress(accounts[0])
                    sessionStorage.setItem("walletConnected", "true");
                }else {
                    setWalletAddress("");
                    sessionStorage.removeItem("walletConnected");
                }
            })
        }
        return () => {
            if(window.ethereum && window.ethereum.removeListener){
                window.ethereum.removeListener('accountsChanged', () => {});
            }
        }
    })

    async function connectWallet(){
        if(window.ethereum){
            try{
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.send("eth_requestAccounts", []);
                setWalletAddress(accounts[0]);
                sessionStorage.setItem("walletConnected", "true");
                console.log("Connected address:", walletAddress);
            }   
            catch(err) {
                console.error("User rejected connection or error occurred:", err);
            }
           
    }else{
        window.open("https://metamask.io/download/", "_blank");
    }
}

    return (
    <button onClick={connectWallet}>
        {walletAddress? `${walletAddress.slice(0,6)}...${walletAddress.slice(-4)}` : `connect`}
    </button>
)}

export default WalletConnect;