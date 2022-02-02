import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0xfD629077484316102319B5c8D9c7ED6bfB6ad04f"
);

export default instance;
