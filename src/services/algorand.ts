import axios from "axios";

const NETWORK = import.meta.env.VITE_ALGOD_NETWORK || "testnet";

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
 */
export async function getAccountInfo(address: string): Promise<AccountInfo> {
  const { data } = await axios.get(`${BASE_URL}/accounts/${address}`);
  return {
    address: data.address,
    amount: data.amount,
    assets: data.assets || [],
  };
}

/**
 * Get ALGO balance in Algos
 */
export async function getAlgoBalance(address: string): Promise<number> {
  const info = await getAccountInfo(address);
  return info.amount / 1e6;
}

/**
 * Get NFTs (ASA with 1 unit)
 */
export async function getNFTs(address: string): Promise<Asset[]> {
  const info = await getAccountInfo(address);
  return info.assets.filter((asset) => asset.amount === 1);
}

/**
 * Resolve metadata for an asset.
 * Handles ARC3, ARC69, and fallback (direct URL).
 */
export async function resolveAssetMetadata(assetId: number): Promise<{ name: string; image: string }> {
  try {
    const { data } = await axios.get(`${BASE_URL}/assets/${assetId}`);
    const params = data.params;

    let name = params.name || `Asset ${assetId}`;
    let image = "";

    // ARC3
    if (params.url?.endsWith("#arc3")) {
      const metadataUrl = params.url.replace("#arc3", "");
      const resolvedUrl = metadataUrl.startsWith("ipfs://")
        ? `https://ipfs.io/ipfs/${metadataUrl.replace("ipfs://", "")}`
        : metadataUrl;

      const metadataRes = await axios.get(resolvedUrl);
      if (metadataRes.data.image) {
        image = metadataRes.data.image.startsWith("ipfs://")
          ? `https://ipfs.io/ipfs/${metadataRes.data.image.replace("ipfs://", "")}`
          : metadataRes.data.image;

        name = metadataRes.data.name || name;
      }
    }

    // ARC69
    else if (params.note) {
      try {
        const noteString = atob(params.note);
        const noteJSON = JSON.parse(noteString);
        name = noteJSON.name || name;
        image = noteJSON.image || "";
        if (image.startsWith("ipfs://")) {
          image = `https://ipfs.io/ipfs/${image.replace("ipfs://", "")}`;
        }
      } catch (err) {
        console.error("Failed to parse ARC69 metadata", err);
      }
    }

    // fallback: direct URL
    else if (params.url) {
      image = params.url.startsWith("ipfs://")
        ? `https://ipfs.io/ipfs/${params.url.replace("ipfs://", "")}`
        : params.url;
    }

    return { name, image };
  } catch (err) {
    console.error(`Failed to resolve metadata for asset ${assetId}`, err);
    return { name: `Asset ${assetId}`, image: "" };
  }
}
