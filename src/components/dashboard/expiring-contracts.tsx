import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { ContractExpiration } from "src/models/contract-expiration";

import { XylonGridColumnConfig } from "src/models/grid-config/xylon-grid-column-config";
import { TaskData } from "src/models/props/scheduler-props";
import { ExpiringContractsState } from "src/models/states/expiring-contracts-state";

import GridContainer from "../grid-container";
import SchedulerContainer from "../scheduler-container";

const gridColumns: XylonGridColumnConfig[] = [
  { field: "Name", title: "Contract" },
  { field: "ExpirationDate", title: "Expiration Date" },
  { field: "Days", title: "Expire In Days" },
];

const dateDiffInDays = (date1: Date, date2: Date): number => {
  var diff = Math.abs(date1.getTime() - date2.getTime());
  var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
  return diffDays;
};

const addMinute = (date: Date): Date => {
  var d1 = new Date(date),
    d2 = new Date(d1);
  d2.setMinutes(d1.getMinutes() + 20);
  return d2;
};

const numberOfDays = 30;

const ExpiringContracts = () => {
  const [state, setState] = useState({
    contracts: [],
  } as ExpiringContractsState);

  const api_base: string = "http://localhost:8080";

  useEffect(() => {
    async function getContracts() {
      const contracts = await axios.get<ContractExpiration[]>(
        `${api_base}/contracts?expriesInDays=${numberOfDays}`
      );
      setState({
        ...state,
        contracts: contracts.data.map((c) => {
          return {
            ...c,
            Days: dateDiffInDays(new Date(c.ExpirationDate), new Date()),
          };
        }),
      });
    }
    getContracts();
  }, []);

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col className="box-shadow m-2 border">
            <SchedulerContainer
              startDate={new Date()}
              numberOfDays={numberOfDays}
              data={state.contracts.map((c, i) => {
                return {
                  id: i,
                  start: new Date(c.ExpirationDate),
                  end: addMinute(c.ExpirationDate),
                  title: c.Name,
                  isAllDay: true,
                } as TaskData;
              })}
            />
          </Col>
          <Col className="box-shadow m-2 border">
            <GridContainer data={state.contracts} columns={gridColumns} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
export default ExpiringContracts;
