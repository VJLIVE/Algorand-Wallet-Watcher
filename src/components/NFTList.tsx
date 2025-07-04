import React, { useEffect, useState } from "react";
import { useWallet } from "../context/WalletContext";
import { getNFTs, resolveAssetMetadata, type Asset } from "../services/algorand";

type NFT = {
  id: number;
  name: string;
  image: string;
};

const NFTList: React.FC = () => {
  const { account } = useWallet();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!account) return;

    const fetchNFTs = async () => {
      setLoading(true);
      try {
        const assets = await getNFTs(account);

        const resolvedNFTs: NFT[] = await Promise.all(
          assets.map(async (asset: Asset) => {
            const { name, image } = await resolveAssetMetadata(asset["asset-id"]);
            return {
              id: asset["asset-id"],
              name,
              image,
            };
          })
        );

        setNfts(resolvedNFTs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [account]);

  if (!account) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <p className="text-gray-700">Please connect your wallet to see NFTs.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <p className="text-gray-700 animate-pulse">Loading NFTs…</p>
      </div>
    );
  }

  if (nfts.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <p className="text-gray-700">No NFTs found in this wallet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800">NFTs</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {nfts.map((nft) => (
          <div key={nft.id} className="text-center">
            {nft.image ? (
              <img
                src={nft.image}
                alt={nft.name}
                className="mx-auto rounded-lg shadow h-32 object-cover"
              />
            ) : (
              <div className="mx-auto h-32 flex items-center justify-center bg-gray-200 text-gray-500 rounded-lg">
                No image
              </div>
            )}
            <p className="mt-2 text-sm text-gray-700 break-words">{nft.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTList;
