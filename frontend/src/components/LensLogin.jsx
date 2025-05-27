import React from 'react';
import { useAccount } from 'wagmi';
import { getWalletClient } from '@wagmi/core';
import { useLogin } from '@lens-protocol/react';

export function LensLogin() {
  const { address, chainId } = useAccount();
  const { execute: login, loading, error, isSuccess } = useLogin();

  const handleLogin = async () => {
    if (!address || !chainId) {
      alert('Connect your wallet');
      return;
    }

    const walletClient = await getWalletClient({ chainId });
    if (!walletClient) {
      alert('Wallet client not found');
      return;
    }

    await login({ address, signer: walletClient });
  };

  return (
    <div>
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login with Lens'}
      </button>
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
      {isSuccess && <p>✅ Logged in successfully!</p>}
    </div>
  );
}
