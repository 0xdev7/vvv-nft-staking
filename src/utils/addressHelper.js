import addresses from "../config/address";

const chainId = 4;

export const getNFTAddress = () => {
  return addresses.nft[chainId];
};

export const getStakingAddress = () => {
  return addresses.staking[chainId];
};
