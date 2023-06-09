import React, { useState, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { useNetwork, useAddress } from "@thirdweb-dev/react";

// Using HTTPS
const web3 = createAlchemyWeb3(
  "https://eth-ropsten.alchemyapi.io/v2/-T5dg-en08fCxb3PqWITQgKJKlKD6THL"
);

const Avatar = () => {
  const [collection, setCollection] = useState([]);
  const address = useAddress();

  useEffect(() => {
    (async () => {
      const nfts = await web3.alchemy.getNfts({
        owner: `${address}`,
      });
      setCollection(nfts);
      // console.log(tokenBalance);
    })();
  }, [address]);

  return (
    <>
      {collection.totalCount > 0 ? (
        <>
          {collection.ownedNfts[collection.totalCount - 1] && (
            <img
              src={
                collection.ownedNfts[collection.totalCount - 1].metadata.image
              }
              alt={""}
              className="w-12 h-12 xs:w-8 xm:h-8 rounded-full"
              onClick={() =>
                window.open(
                  collection.ownedNfts[collection.totalCount - 1].metadata
                    .image,
                  "mozillaWindow",
                  "left=100,top=100,width=350,height=350,location=0,titlebar=0,toolbar=0,popup"
                )
              }
            />
          )}
        </>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Avatar;
