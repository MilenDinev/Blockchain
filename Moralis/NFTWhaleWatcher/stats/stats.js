const Moralis = require("moralis-v1/node");
const fs = require('fs')

const serverUrl = 'xxx'

const appId = 'xxx'

const contractAddress = '0xFA7E3F898c80E31A3aedeAe8b0C713a3F9666264'; // Akuma

async function getAllOwners() {
  await Moralis.start({ serverUrl: serverUrl, appId: appId })
  let cursor = null
  let owners = {}
  let res
  let accountedTokens = []

  do {
    const response = await Moralis.Web3API.token.getContractNFTTransfers({
      address: contractAddress,
      chain: 'eth',
      limit: 100,
      cursor: cursor,
    })

    res = response
    console.log(
      `Got page ${response.page} of ${Math.ceil(
        response.total / response.page_size,
      )}, ${response.total} total`,
    )

    for (const transfer of res.result) {
      if (!owners[transfer.to_address] &&
        !accountedTokens.includes(transfer.token_id)
      ) {
        owners[transfer.to_address] = {
          address: transfer.to_address,
          amount: Number(transfer.amount),
          tokenId: [transfer.token_id],
          prices: [Number(transfer.value)],
          dates: [transfer.block_timestamp],
        }

        accountedTokens.push(transfer.token_id)
      } else if (!accountedTokens.includes(transfer.token_id)) {
        owners[transfer.to_address].amount++;
        owners[transfer.to_address].tokenId.push(transfer.token_id);
        owners[transfer.to_address].prices.push(Number(transfer.value));
        owners[transfer.to_address].dates.push(transfer.block_timestamp);

        accountedTokens.push(transfer.token_id)
      }
    }

    cursor = res.cursor
  } while (cursor != '' && cursor != null)

  const jsonCOntentOwners = JSON.stringify(owners)

  fs.writeFile('AkumaOwners.json', jsonContentOwners, 'utf8', function (err) {
    if (err) {
      console.log('An error occured while writing JSON Object to File.')
      return console.log(err)
    }

    console.log('JSON file has been saved.')
  });
}

getAllOwners();
