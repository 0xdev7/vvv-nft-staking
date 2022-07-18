import { getNFTAddress, getStakingAddress } from "../utils/addressHelper";
import { ethers } from "ethers";

import stakingABI from "../config/abis/staking.json";
import nftABI from "../config/abis/nft.json";

const useContract = (abi, address) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return new ethers.Contract(address, abi, provider);
};

export const useNFTContract = () => {
  return useContract(nftABI, getNFTAddress());
};

export const useStakingContract = () => {
  return useContract(stakingABI, getStakingAddress());
};

export default useContract;
