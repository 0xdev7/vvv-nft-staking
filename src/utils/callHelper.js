import { ethers } from "ethers";

export const setApprovalForAll = async (
  nftContract,
  stakingContract,
  approved
) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const nftContractWithSigner = nftContract.connect(signer);

  await nftContractWithSigner
    .setApprovalForAll(stakingContract.address, approved)
    .success(() => {
      console.log("approved 1");
    });
};

export const stake = async (stakingContract, tokenIds, lockTime) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const stakingContractWithSigner = stakingContract.connect(signer);

  await stakingContractWithSigner.stake(tokenIds, lockTime);
};
