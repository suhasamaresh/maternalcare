"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const ConnectionProvider = dynamic(() =>
  import("@solana/wallet-adapter-react").then((mod) => mod.ConnectionProvider)
);
const WalletProvider = dynamic(() =>
  import("@solana/wallet-adapter-react").then((mod) => mod.WalletProvider)
);
const WalletModalProvider = dynamic(() =>
  import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletModalProvider)
);
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";

export default function AppWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [
      // manually add any legacy wallet adapters here
      // new UnsafeBurnerWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}