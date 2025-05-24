import { useState, useEffect } from "react";
import { ethers } from "ethers";
import  getFarcasterIdentity  from "../../../utils/farcaster.js";

const WalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const wasConnected = sessionStorage.getItem("walletConnected");

    const checkConnectedWallet = async () => {
      if (wasConnected && window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_accounts", []);
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      }
    };

    const handleAccountsChanged = async(accounts) => {
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        sessionStorage.setItem("walletConnected", "true");
      
      } else {
        setWalletAddress("");
        sessionStorage.removeItem("walletConnected");
      }
    };

    checkConnectedWallet();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setWalletAddress(accounts[0]);
        sessionStorage.setItem("walletConnected", "true");
        console.log("Connected address:", accounts[0]);
      } catch (err) {
        console.error("User rejected connection or error occurred:", err);
      }
    } else {
      window.open("https://metamask.io/download/", "_blank");
    }
  };

  return (
    <button className="text-white bg-[#141414] rounded-md m-5 p-3 cursor-pointer hover:bg-[#000000]" onClick={connectWallet}>
      {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect"}
    </button>
  );
};

export default WalletConnect;
