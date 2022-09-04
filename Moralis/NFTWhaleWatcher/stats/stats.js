const Moralis = require("moralis/node");
const fs = require("fs");

const serverUrl = "https://9e34jzndbn3u.usemoralis.com:2053/server";

const appId = "Kh2szykWQgGsYkDitm0xl0nUvFhmLKdOtuj4d4vk";

const contractAddress = "0x2953399124F0cBB46d2CbACD8A89cF0599974963"; // Akuma

async function  getAllOwners() {

    await Moralis.start({serverUrl: serverUrl, appId: appId});
    let cursor = null;
    let owners = {};
    let res;
    let accountedTokens = [];



     do {
        
            const response = await Moralis.Web3API.token.getContractNFTTransfers({

                address: contractAddress,
                chain: "eth",
                limit: 100,
                cursor: cursor,
            });

            res = response;
            console.log(
                `Got page ${response.page} of ${Math.ceil(
                    response.total / response.page_size
                )}, ${response.total} total`
            )

        cursor = res.cursor;
     } while (cursor !="" && cursor != null);
}