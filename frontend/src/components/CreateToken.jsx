// Inside CreateToken.jsx

import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { getLensProfileData } from "../utils/getLensProfile";
import { calculateScore } from "../utils/calculateScore";
import { calculateTokenPriceUSD } from "../utils/calculateTokenPrice";
import { 
  useLogin, 
  useProfilesManaged,
  useProfiles,
  useProfile
} from '@lens-protocol/react-web';

import FetchLensProfile from "./FetchLensProfile";


export default function CreateToken() {
  const { walletAddress } = useAccount();
  const [score, setScore] = useState(0);
  const [profileData, setProfileData] = useState(null);
  const [tokenPrice, setTokenPrice] = useState(0);



  useEffect(() => {
    const fetchData = async() => {
      console.log("createToken", walletAddress)

      if(!walletAddress) return;
  
    //   const profileData = await getLensProfileData(walletAddress);
    //   console.log("profile data", profileData);
    //   if(!profileData.account.metadata) return;
    //   setProfileData(profileData)

    //  const score = await calculateScore(profileData);
    //  setScore(score);

    //  const tokenPrice = await calculateTokenPriceUSD(score);
    //  setTokenPrice(tokenPrice);

    }
    fetchData();
    
  }, [walletAddress]);

  

  const handleLensConnect = async() => {
    
    console.log(LensClientExports);
    // const challenge = await generateChallenge({ address: walletAddress });
    // const signature = await signMessage({ message: challenge.text });
    // const authResult = await authenticate({ address: walletAddress, signature });

    // if (authResult.isAuthenticated) {
    //   console.log('User authenticated successfully');
    // } else {
    //   console.log('Authentication failed');
    // }

  }
  return (
    <>
    <FetchLensProfile />
  
    </>
   
  );
}
