import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import BuyCrypto from "./BuyCrypto";

import DepositForm from "./DepositForm";

function Deposit() {
  const [key, setKey] = useState("deposit");

  return (
    <div className="container">
    <div className="row justify-content-lg-end justify-content-between">
      <div className="col-xl-10 col-lg-10  deposit-tab">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="deposit" title="Deposit">
            <DepositForm />
          </Tab>
          <Tab eventKey="buy_crypto" title="Buy Crypto">
            <BuyCrypto />
          </Tab>
        </Tabs>
      </div>
    </div>
    </div>
  );
}

export default Deposit;
