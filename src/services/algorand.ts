import axios from "axios";
import { algorandReserveToCID } from "../utils/ipfs";

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
export async function resolveAssetMetadata(
  assetId: number
): Promise<{ name: string; image: string }> {
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
      name = metadataRes.data.name || name;
      image = metadataRes.data.image || "";

      if (image.startsWith("ipfs://")) {
        image = `https://ipfs.io/ipfs/${image.replace("ipfs://", "")}`;
      }
    }

    // ARC69
    else if (params.note) {
      try {
        const noteStr = atob(params.note);
        const json = JSON.parse(noteStr);
        name = json.name || name;
        image = json.image || "";
        if (image.startsWith("ipfs://")) {
          image = `https://ipfs.io/ipfs/${image.replace("ipfs://", "")}`;
        }
      } catch (err) {
        console.warn("ARC69 metadata parsing failed", err);
      }
    }

    // ARC19 (template-ipfs)
    else if (params.url?.startsWith("template-ipfs://{ipfscid")) {
  const reserve = params.reserve;
  if (reserve) {
    const cid = algorandReserveToCID(reserve);

    try {
      // fetch metadata.json inside the CID
      const metaRes = await axios.get(`https://ipfs.io/ipfs/${cid}/metadata.json`);
      const meta = metaRes.data;

      name = meta.name || name;
      image = meta.image || "";

      if (image.startsWith("ipfs://")) {
        image = `https://ipfs.io/ipfs/${image.replace("ipfs://", "")}`;
      } else if (!image.startsWith("http")) {
        // if it's just a filename (e.g., "image.png"), resolve relative to CID
        image = `https://ipfs.io/ipfs/${cid}/${image}`;
      }
    } catch (err) {
      console.error(`Failed to fetch ARC19 metadata for CID ${cid}:`, err);
    }
  }
}

    // Fallback (assume direct URL)
    else if (params.url) {
      image = params.url.startsWith("ipfs://")
        ? `https://ipfs.io/ipfs/${params.url.replace("ipfs://", "")}`
        : params.url;
    }

    return { name, image };
  } catch (err) {
    console.error(`Error resolving metadata for ${assetId}:`, err);
    return { name: `Asset ${assetId}`, image: "" };
  }
}

export async function fetchTransactionsForAddress(address: string): Promise<any[]> {
  const indexerURL = "https://testnet-idx.algonode.cloud"; // or MainNet
  const txns: any[] = [];

  let nextToken = "";
  let hasMore = true;

  while (hasMore && txns.length < 1000) {
    const res = await axios.get(`${indexerURL}/v2/accounts/${address}/transactions`, {
      params: {
        limit: 100,
        "next": nextToken,
      },
    });

    const fetched = res.data.transactions || [];
    txns.push(...fetched);

    if (res.data["next-token"]) {
      nextToken = res.data["next-token"];
    } else {
      hasMore = false;
    }
  }

  return txns;
}