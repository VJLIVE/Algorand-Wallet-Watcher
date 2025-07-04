import React from "react";

const NFTList: React.FC = () => {
  // mock data
  const nfts = [
    { id: 1, name: "Algorand NFT #1", image: "https://via.placeholder.com/100" },
    { id: 2, name: "Algorand NFT #2", image: "https://via.placeholder.com/100" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        NFTs
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {nfts.map((nft) => (
          <div key={nft.id} className="text-center">
            <img
              src={nft.image}
              alt={nft.name}
              className="mx-auto rounded-lg shadow"
            />
            <p className="mt-2 text-sm text-gray-700">{nft.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTList;
