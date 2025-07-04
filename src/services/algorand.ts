import axios from "axios";

const NETWORK = import.meta.env.VITE_ALGOD_NETWORK || "testnet";

// You can also make this configurable at runtime.
const BASE_URL =
  NETWORK === "mainnet"
    ? "https://mainnet-api.algonode.cloud/v2"
    : NETWORK === "betanet"
    ? "https://betanet-api.algonode.cloud/v2"
    : "https://testnet-api.algonode.cloud/v2";

export type Asset = {
  id: number;
  amount: number;
  'asset-id': number;
  'is-frozen': boolean;
};

export type AccountInfo = {
  address: string;
  amount: number;
  assets: Asset[];
};

/**
 * Fetch account info from Algorand Indexer.
 * Includes ALGO balance, assets (NFTs & tokens), etc.
 */
export async function getAccountInfo(address: string): Promise<AccountInfo> {
  try {
    const res = await axios.get(`${BASE_URL}/accounts/${address}`);
    const account = res.data;

    return {
      address: account.address,
      amount: account.amount, // in microAlgos
      assets: account.assets || [],
    };
  } catch (error) {
    console.error(`Failed to fetch account info:`, error);
    throw error;
  }
}

/**
 * Get ALGO balance in Algos (not microalgos)
 */
export async function getAlgoBalance(address: string): Promise<number> {
  const info = await getAccountInfo(address);
  return info.amount / 1e6;
}

/**
 * Get NFTs from account (ASA with 1 unit and usually metadata)
 */
export async function getNFTs(address: string): Promise<Asset[]> {
  const info = await getAccountInfo(address);

  // Filter assets that are likely NFTs (you can adjust the filter logic)
  const nfts = info.assets.filter((asset) => asset.amount === 1);
  return nfts;
}
