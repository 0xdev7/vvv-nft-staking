import React, { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { Row, Col, Image, Button } from "react-bootstrap";
import ConnectWallet from "../ConnectWallet/ConnectWallet";
import "./StakingPad.css";
import { useNFTContract, useStakingContract } from "../../hooks/useContracts";
import { setApprovalForAll, stake } from "../../utils/callHelper";
import { getStakingAddress } from "../../utils/addressHelper";

const StakingPad = ({ setHeaderAddress }) => {
  const [account, setAccount] = useState("");

  const nftContract = useNFTContract();
  const stakingContract = useStakingContract();
  const stakingAddress = getStakingAddress();

  const [isApproved, setIsApproved] = useState(false);
  const [handlingRequest, setHandlingRequest] = useState(false);
  const [fetchFlag, setFetchFlag] = useState(true);
  const [redraw, setRedraw] = useState(false);

  const [unstakedinfo, setUnStakedInfo] = useState();
  const [stakedinfo, setStakedInfo] = useState();

  const [selectedUnStakedTokenIds, setSelectedUnStakedTokenIds] = useState([]);

  const [selectedPeriod, setSelectedPeriod] = useState(1);

  const [refreshTimer, setRefreshTimer] = useState(Date.now());

  const fetchIsApproved = async () => {
    const isApp = await nftContract.isApprovedForAll(account, stakingAddress);
    setIsApproved(isApp);
    return isApp;
  };

  const fetchUnStakedInfo = async () => {
    var result = {
      balance: new BigNumber(0),
      tokenIds: [],
      metadatas: [],
    };
    result.tokenIds = [];
    result.metadatas = [];

    const balance = await nftContract.balanceOf(account);
    result.balance = balance;
    for (let i = 0; i < balance; i++) {
      const tokenId = await nftContract.tokenOfOwnerByIndex(account, i);
      const image =
        "https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/" +
        tokenId +
        ".png";
      result.tokenIds.push(tokenId);
      result.metadatas.push(image);
    }

    return result;
  };

  const fetchStakedInfo = async () => {
    var result = {
      balance: new BigNumber(0),
      tokenIds: [],
      lockPeriods: [],
      metadatas: [],
    };

    const balance = await stakingContract.stakingAmount(account);
    result.balance = balance;
    for (let i = 0; i < balance; i++) {
      const tokenInfo = await stakingContract.userInfo(account, i);
      const image =
        "https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/" +
        tokenInfo.tokenId +
        ".png";
      console.log(tokenInfo.lockTime.toString());
      result.tokenIds.push(tokenInfo.tokenId);
      result.lockPeriods.push(tokenInfo.lockTime);
      result.metadatas.push(image);
    }

    return result;
  };

  const updateUnStatedInfo = async () => {
    let result = await fetchUnStakedInfo();
    if (JSON.stringify(result) !== JSON.stringify(unstakedinfo)) {
      setUnStakedInfo(result);
      setSelectedUnStakedTokenIds([]);
    }
  };

  const updateStatedInfo = async () => {
    let result = await fetchStakedInfo();
    if (JSON.stringify(result) !== JSON.stringify(stakedinfo)) {
      setStakedInfo(result);
    }
  };

  useEffect(() => {
    if (account) {
      setHeaderAddress(account);
      fetchIsApproved();
      updateUnStatedInfo();
      updateStatedInfo();
      setFetchFlag(false);
    }
  }, [account, isApproved, fetchFlag]);

  useEffect(() => {
    if (account) {
      updateUnStatedInfo();
      updateStatedInfo();
    }
    setTimeout(() => setRefreshTimer(Date.now()), 1000);
  }, [refreshTimer]);

  const IsSelected = (type, tokenId) => {
    const list =
      type === 0 ? selectedUnStakedTokenIds : selectedUnStakedTokenIds;
    for (var i = 0; i < list.length; i++) {
      if (list[i] === tokenId) {
        return true;
      }
    }
    return false;
  };

  const removeItemFromArray = (oldlist, tokenId) => {
    var list = oldlist;
    var i = 0;
    for (i = 0; i < list.length; i++) {
      if (list[i] === tokenId) {
        list[i] = list[list.length - 1];
        list.pop();
        break;
      }
    }
    return list;
  };

  const unstakedImageClick = async (tokenId, index) => {
    if (await IsSelected(0, tokenId)) {
      let newlist = await removeItemFromArray(
        selectedUnStakedTokenIds,
        tokenId
      );
      setSelectedUnStakedTokenIds(newlist);
    } else {
      var newlist1 = selectedUnStakedTokenIds;
      newlist1.push(tokenId);
      setSelectedUnStakedTokenIds(newlist1);
    }
    setRedraw(!redraw);
  };

  const approveNFTs = async () => {
    try {
      setHandlingRequest(true);
      await setApprovalForAll(nftContract, stakingContract, account, true);
      setIsApproved(true);
      setHandlingRequest(false);
    } catch {
      console.log("Approve failed");
      setHandlingRequest(false);
    }
  };

  const stakeNFTs = async () => {
    try {
      setHandlingRequest(true);
      await stake(stakingContract, selectedUnStakedTokenIds, selectedPeriod);
      setFetchFlag(true);
      setHandlingRequest(false);
    } catch {
      console.log("Stake failed");
      setHandlingRequest(false);
    }
  };

  return (
    <div className="pad-container">
      <h1 className="mt-5 mb-4">Stake Your vVv Season 1 NFT</h1>
      <div className="pad d-lg-flex d-block p-2 p-lg-4">
        {!account ? (
          <>
            <div>
              <Image src="images/nft.png" />
            </div>
            <div className="pad-info">
              <div>
                <h2>Start Staking</h2>
                <p>
                  <strong>
                    Stake your vVv Season 1 NFT to participate in all
                    investments while your NFT is locked.{" "}
                  </strong>
                  Pick the 12 months staking period if you want to claim your WL
                  spot for the vVv Crypto Fund NFT.
                </p>
                <div className="d-grid gap-2">
                  <ConnectWallet setAccount={setAccount} />
                </div>
                <h3>Warning!</h3>
                <p>
                  <strong>
                    The NFT can NOT be unstaked, transferred or sold during the
                    staking period.
                  </strong>{" "}
                  Are you sure you want to continue?
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="w-100">
            <Row className="pad-action">
              <Col lg="6" xs="12">
                <p>
                  <strong>SELECT NFTS</strong>
                </p>
                <Row>
                  {unstakedinfo &&
                    unstakedinfo.tokenIds &&
                    unstakedinfo.tokenIds.map((tokenId, idx) => {
                      let image = unstakedinfo.metadatas[idx];
                      const isSelected = IsSelected(0, tokenId);
                      return (
                        <Col
                          className="nft-container mb-3"
                          xs="4"
                          onClick={() => unstakedImageClick(tokenId, idx)}
                        >
                          <div
                            style={{
                              backgroundImage: `url(${image})`,
                            }}
                          >
                            <div className={isSelected ? "selected" : ""}>
                              {isSelected && (
                                <Image
                                  className="checker"
                                  src="images/check.png"
                                />
                              )}
                              <Image className="w-100 invisible" src={image} />
                            </div>
                          </div>
                        </Col>
                      );
                    })}
                  {stakedinfo &&
                    stakedinfo.tokenIds &&
                    stakedinfo.tokenIds.map((tokenId, idx) => {
                      let image = stakedinfo.metadatas[idx];
                      let lockPeriod = stakedinfo.lockPeriods[idx];
                      return (
                        <Col className="nft-container mb-3" xs="4">
                          <div
                            style={{
                              backgroundImage: `url(${image})`,
                            }}
                          >
                            <div className="staked">
                              <div>
                                <Image src="images/check.png" />
                                <h2>STAKED</h2>
                                {lockPeriod == 15724800 ? (
                                  <p>6 Months</p>
                                ) : (
                                  <p>1 Year</p>
                                )}
                              </div>
                              <Image className="w-100 invisible" src={image} />
                            </div>
                          </div>
                        </Col>
                      );
                    })}
                </Row>
              </Col>
              <Col lg="6" xs="12">
                <p>
                  <strong>DURATION OF STAKING</strong>
                </p>
                <Button
                  className={`w-100 mb-4 rounded-pill ${
                    selectedPeriod == 1 && "choosed"
                  }`}
                  size="lg"
                  variant="outline-primary"
                  onClick={() => setSelectedPeriod(1)}
                >
                  6 MONTHS
                </Button>
                <Button
                  className={`w-100 mb-4 rounded-pill ${
                    selectedPeriod == 2 && "choosed"
                  }`}
                  size="lg"
                  variant="outline-primary"
                  onClick={() => setSelectedPeriod(2)}
                >
                  12 MONTHS
                </Button>
                <p className="mb-1">
                  <strong>Staking for 6 Months:</strong>
                </p>
                <p>Participated in all investments while the NFT is staked.</p>
                <p className="mb-1">
                  <strong>Staking for 6 Months:</strong>
                </p>
                <p>
                  Same benefit as 6 months + 1 WL spot for the vVv Crypto Fund
                  NFT per 12 months staked vVv S1 NFT.
                </p>
              </Col>
            </Row>
            <Row className="p-4">
              {!isApproved ? (
                <Button
                  className="w-100 rounded-pill mt-1"
                  size="lg"
                  variant="info"
                  disabled={handlingRequest}
                  onClick={approveNFTs}
                >
                  Approve
                </Button>
              ) : (
                <Button
                  className="w-100 rounded-pill mt-1"
                  size="lg"
                  variant="info"
                  disabled={handlingRequest}
                  onClick={stakeNFTs}
                >
                  START STAKING
                </Button>
              )}
            </Row>
          </div>
        )}
      </div>
    </div>
  );
};

export default StakingPad;
