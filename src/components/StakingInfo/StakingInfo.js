import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import "./StakingInfo.css";

const StakingInfo = () => {
  return (
    <div className="info">
      <Row className="info-card">
        <Col>
          <Image src="images/dolphin.png" />
          <h4>Dolphin</h4>
          <p>Regular MAX allocation amount with multiplier* (FCFS).</p>
        </Col>
        <Col>
          <Image src="images/shark.png" />
          <h4>Shark</h4>
          <p>
            Regular MAX allocation amount BUT always guaranteed spot in all
            investments.
          </p>
        </Col>
        <Col>
          <Image src="images/whale.png" />
          <h4>Whale</h4>
          <p>Very high MAX allocation amount (FCFS).</p>
        </Col>
      </Row>
      <Row>
        <h4 className="text-start">Warning!</h4>
        <p className="text-start">
          The vVv Season 1 NFT is not a speculative asset, nor something which
          will yield any kind of return. Meaning; only mint, buy or stake the
          NFT if you want to use its utility. Do NOT mint, buy or stake the NFT
          in the hopes of it increasing in value or expectations in it yielding
          any sort of return.
        </p>
      </Row>
      <Row>
        <h4 className="text-start">
          Multiplier<sup>1</sup>
        </h4>
        <p className="text-start">
          <strong>
            Stake multiple dolphins to increase your multiplier. ONLY applicable
            to the dolphin NFT,{" "}
          </strong>
          not to sharks or whales. No benefits in staking more than 6 dolphins
          total.
        </p>
        <Col>
          <Row className="info-multi-card">
            <Col>
              <h5>1</h5>
              <h6>Dolphin</h6>
              <p>$1,000 MAX allocation</p>
            </Col>
            <Col>
              <h5>2</h5>
              <h6>Dolphin</h6>
              <p>$1,100 MAX allocation</p>
            </Col>
            <Col>
              <h5>3</h5>
              <h6>Dolphin</h6>
              <p>$1,200 MAX allocation</p>
            </Col>
            <Col>
              <h5>4</h5>
              <h6>Dolphin</h6>
              <p>$1,300 MAX allocation</p>
            </Col>
            <Col>
              <h5>5</h5>
              <h6>Dolphin</h6>
              <p>$1,400 MAX allocation</p>
            </Col>
            <Col>
              <h5>6</h5>
              <h6>Dolphin</h6>
              <p>$1,500 MAX allocation</p>
            </Col>
          </Row>
        </Col>
        <p className="text-start mt-3">
          1) This is an example only. Max allocation sizes might vary at times.
        </p>
      </Row>
      <Row>
        <Col>
          <h4 className="text-start">Dolphins, Shars & Whales Stack!</h4>
          <p className="text-start">
            If you own and stake a shark + whale, you can participate in the
            shark and whale round each. If you own and stake a dolphin (or
            multiple) + a shark, you can participate in FCFS (with the
            multiplier) + grab a guaranteed allocation, too. Same logic if you
            own and stake dolphins + a whale.{" "}
            <strong>But no benefit to owning multiple sharks or whales.</strong>
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default StakingInfo;
