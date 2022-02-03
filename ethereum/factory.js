import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0x5d8Ac85F8EC75FfFa3889C7b8ee21A38F6fc105E"
);

export default instance;
