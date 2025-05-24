import axios from 'axios';

 const getFarcasterIdentity = async (walletAddress) => {
  try {
    const res = await axios.post('http://localhost:3001/link-farcaster', {
      address: walletAddress,
    });
    return res.data; // { fid, username }
  } catch (err) {
    console.error('Error fetching Farcaster identity:', err);
    return null;
  }
};

export default getFarcasterIdentity;