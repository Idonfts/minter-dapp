require('dotenv').config();
const basePath = process.cwd();
const fs = require("fs");
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "Space Mau Mafia";
const description = "";
const baseUri = "ipfs://NewUriToReplace"; // This will be replaced automatically

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    growEditionSizeTo: 2749,
    layersOrder: [
      { name: "Background" },
      { name: "Back" },
      { name: "Skin" },
      { name: "Clothes" },
      { name: "Eyes" },
      { name: "Eyewear" },
      { name: "Head" },
      { name: "Mouth" },
    ],
  },
  {
    growEditionSizeTo: 2750,
    layersOrder: [
      { name: "5k Background" },
      { name: "5k Back" },
      { name: "5k Skin" },
      { name: "5k Clothes" },
      { name: "5k Eyes" },
      { name: "5k Eyewear" },
      { name: "5k Head" },
      { name: "5k Mouth" },
    ],
  },
  {
    growEditionSizeTo: 5261,
    layersOrder: [
      { name: "Background" },
      { name: "Back" },
      { name: "Skin" },
      { name: "Clothes" },
      { name: "Eyes" },
      { name: "Eyewear" },
      { name: "Head" },
      { name: "Mouth" },
    ],
  },
  {
    growEditionSizeTo: 5262,
    layersOrder: [
      { name: "10k Background" },
      { name: "10k Back" },
      { name: "10k Skin" },
      { name: "10k Clothes" },
      { name: "10k Eyes" },
      { name: "10k Eyewear" },
      { name: "10k Head" },
      { name: "10k Mouth" },
    ],
  },
  {
    growEditionSizeTo: 8188,
    layersOrder: [
      { name: "Background" },
      { name: "Back" },
      { name: "Skin" },
      { name: "Clothes" },
      { name: "Eyes" },
      { name: "Eyewear" },
      { name: "Head" },
      { name: "Mouth" },
    ],
  },
  {
    growEditionSizeTo: 8189,
    layersOrder: [
      { name: "15k Background" },
      { name: "15k Back" },
      { name: "15k Skin" },
      { name: "15k Clothes" },
      { name: "15k Eyes" },
      { name: "15k Eyewear" },
      { name: "15k Head" },
      { name: "15k Mouth" },
    ],
  },
  {
    growEditionSizeTo: 9999,
    layersOrder: [
      { name: "Background" },
      { name: "Back" },
      { name: "Skin" },
      { name: "Clothes" },
      { name: "Eyes" },
      { name: "Eyewear" },
      { name: "Head" },
      { name: "Mouth" },
    ],
  },
];

const shuffleLayerConfigurations = false;

const debugLogs = false;

const format = {
  width: 3000,
  height: 3000,
  smoothing: false,
};

const extraMetadata = {
  external_url: "https://spacemaumafia.com", // Replace with your website or remove this line if you do not have one.
};

// NFTPort Info

// ** REQUIRED **
const AUTH = process.env.NFTPORT_API_KEY; // Set this in the .env file to prevent exposing your API key when pushing to Github
const LIMIT = 4; // Your API key rate limit
const CHAIN = 'rinkeby'; // only rinkeby or polygon

// REQUIRED CONTRACT DETAILS THAT CANNOT BE UPDATED LATER!
const CONTRACT_NAME = 'Space Mau Mafia';
const CONTRACT_SYMBOL = 'SMM';
const METADATA_UPDATABLE = true; // set to false if you don't want to allow metadata updates after minting
const OWNER_ADDRESS = '0x660daF83f6ca736dA156A84241bB82Abc5e52a59';
const TREASURY_ADDRESS = '0xe27DAcc72B814efdc02818D29dCB1D89b7b120EA';
const MAX_SUPPLY = 9999; // The maximum number of NFTs that can be minted. CANNOT BE UPDATED!
const MINT_PRICE = 0.001; // Minting price per NFT. Rinkeby = ETH, Polygon = MATIC. CANNOT BE UPDATED!
const TOKENS_PER_MINT = 10; // maximum number of NFTs a user can mint in a single transaction. CANNOT BE UPDATED!

// REQUIRED CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PUBLIC_MINT_START_DATE = "2022-04-5T23:50:48+10:00"; // This is required. Eg: 2022-02-08T11:30:48+00:00

// OPTIONAL CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PRESALE_MINT_START_DATE = "2022-03-30T23:50:48+10:00"; // Optional. Eg: 2022-02-08T11:30:48+00:00
const ROYALTY_SHARE = 250; // Percentage of the token price that goes to the royalty address. 100 bps = 1%
const ROYALTY_ADDRESS = "0xE003Ed8228Af4ca3f5df183d2eF257Ac612690C8"; // Address that will receive the royalty
const BASE_URI = null; // only update if you want to manually set the base uri
const PREREVEAL_TOKEN_URI = null; // only update if you want to manually set the prereveal token uri
const PRESALE_WHITELISTED_ADDRESSES = ["0x615738bE1b9188c5C1D67E4F54d893d55b9B8196","0x660daF83f6ca736dA156A84241bB82Abc5e52a59"]; // only update if you want to manually set the whitelisted addresses

// ** OPTIONAL **
let CONTRACT_ADDRESS = "YOUR CONTRACT ADDRESS"; // If you want to manually include it

// Generic Metadata is optional if you want to reveal your NFTs
const GENERIC = true; // Set to true if you want to upload generic metas and reveal the real NFTs in the future
const GENERIC_TITLE = CONTRACT_NAME; // Replace with what you want the generic titles to say if you want it to be different from the contract name.
const GENERIC_DESCRIPTION = "Are you feeling lucky?"; // Replace with what you want the generic descriptions to say.
const GENERIC_IMAGE = "https://ipfs.io/ipfs/bafybeihqh2brkhunbgspr67b7kv2np3ahmkdyag2fp6zcebfa5eu67np34"; // Replace with your generic image that will display for all NFTs pre-reveal.

// Automatically set contract address if deployed using the deployContract.js script
try {
  const rawContractData = fs.readFileSync(
    `${basePath}/build/contract/_contract.json`
  );
  const contractData = JSON.parse(rawContractData);
  if (contractData.response === "OK" && contractData.error === null) {
    CONTRACT_ADDRESS = contractData.contract_address;
  }
} catch (error) {
  // Do nothing, falling back to manual contract address
}
// END NFTPort Info

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 100, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.youtube.com/c/hashlipsnft",
  creators: [
    {
      address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
      share: 1,
    },
  ],
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
  AUTH,
  LIMIT,
  CONTRACT_ADDRESS,
  OWNER_ADDRESS,
  TREASURY_ADDRESS,
  CHAIN,
  GENERIC,
  GENERIC_TITLE,
  GENERIC_DESCRIPTION,
  GENERIC_IMAGE,
  CONTRACT_NAME,
  CONTRACT_SYMBOL,
  METADATA_UPDATABLE,
  ROYALTY_SHARE,
  ROYALTY_ADDRESS,
  MAX_SUPPLY,
  MINT_PRICE,
  TOKENS_PER_MINT,
  PRESALE_MINT_START_DATE,
  PUBLIC_MINT_START_DATE,
  BASE_URI,
  PREREVEAL_TOKEN_URI,
  PRESALE_WHITELISTED_ADDRESSES
};
