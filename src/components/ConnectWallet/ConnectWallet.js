import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { ethers } from "ethers";

const ConnectWallet = ({ setAccount }) => {
  const [selectedAddress, setSelectedAddress] = useState("");

  const connectToMetamask = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setSelectedAddress(accounts[0]);
    if (accounts[0]) {
      setAccount(accounts[0]);
    }
  };

  const renderMetamask = () => {
    if (!selectedAddress) {
      return (
        <Button
          className="w-100"
          variant="info"
          size="lg"
          onClick={() => connectToMetamask()}
        >
          CONNECT WALLET
        </Button>
      );
    } else {
      setAccount("");
      return (
        <Button className="w-100" variant="info" size="lg">
          {selectedAddress}
        </Button>
      );
    }
  };

  return <div>{renderMetamask()}</div>;
};

export default ConnectWallet;
