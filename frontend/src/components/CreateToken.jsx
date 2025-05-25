// Inside CreateToken.jsx
import { useWallet } from "../context/WalletContext";
import { useEffect, useState } from "react";
import { getLensProfileData } from "../utils/getLensProfile";
import { calculateScore } from "../utils/calculateScore";
import { calculateTokenPriceUSD } from "../utils/calculateTokenPrice";


export function CreateToken() {
  const { walletAddress } = useWallet();
  const [score, setScore] = useState(0);
  const [profileData, setProfileData] = useState(null);
  const [tokenPrice, setTokenPrice] = useState(0);

  useEffect(() => {
    const fetchData = async() => {
      console.log("createToken", walletAddress)
      if(!walletAddress) return;
      const profileData = await getLensProfileData(walletAddress);
      console.log("profile data", profileData);
      if(!profileData.account.metadata) return;
      setProfileData(profileData)

     const score = await calculateScore(profileData);
     setScore(score);

     const tokenPrice = await calculateTokenPriceUSD(score);
     setTokenPrice(tokenPrice);

    }
    fetchData();
    
  }, [walletAddress]);




  return (
    <>
    {!walletAddress? 
    (
        <h1>Please connect to a wallet
        </h1>
        
    ) : walletAddress && !profileData ? (
        <h1>Create a profile on lens</h1>
    ) : walletAddress && profileData ? (
        <div>
        <h1>Create Token</h1>
        <p>Wallet: {walletAddress}</p>
      </div>
    ):null
}
    </>
   
  );
}
