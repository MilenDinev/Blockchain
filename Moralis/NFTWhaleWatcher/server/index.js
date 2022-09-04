const express = require("express");
const cors = require("cors");
const akuma = require("./akumaOwners");
const akumaH = require("./akumaHistory");

const collections = {
    "0xFA7E3F898c80E31A3aedeAe8b0C713a3F9666264":{
        owners: akuma,
        history: akumaH
      },
}

const app = express();

const port = 4000;

app.use(cors());


app.get("/", (req, res) => {
  res.send("Welcome to the Whale NFT server");
});

app.get("/collection", (req, res) => {
    const slug = req.query.slug;
    res.send(collections[slug].owners);
});

app.get("/user", (req, res) => {
    const slug = req.query.slug;
    const address = req.query.address;
    res.send(collections[slug].history[address]);
  });


app.listen(port, () =>
  console.log(`Whale NFT server running on ${port}`)
);