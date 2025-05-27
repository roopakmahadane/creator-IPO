import { createClient, production } from '@lens-protocol/react';
import { createStorage } from '@lens-protocol/storage';
import { createWagmiBindings } from '@lens-protocol/wagmi';

const bindings = createWagmiBindings();
const storage = createStorage();

export const lensClient = createClient({
  environment: production,
  bindings,
  storage,
});