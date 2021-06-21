import React from "react";
import { render } from "react-dom";
import "@progress/kendo-theme-default/dist/all.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ContractsByClient from "./dashboard/contracts-by-client";
import ExpiringContracts from "./dashboard/expiring-contracts";
import { Row } from "react-bootstrap";
import LatestAwards from "./dashboard/latest-awards";

const App = () => (
  <div>
    <Row>
      <ContractsByClient />
    </Row>
    <Row>
      <ExpiringContracts />
    </Row>
    <Row>
      <LatestAwards />
    </Row>
  </div>
);
render(<App />, document.getElementById("root"));
export default App;
