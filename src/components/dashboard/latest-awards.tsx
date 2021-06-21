import { Button, ButtonGroup } from "@progress/kendo-react-buttons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Award } from "src/models/award";
import { XylonGridColumnConfig } from "src/models/grid-config/xylon-grid-column-config";
import { LatestAwardsState } from "src/models/states/latest-awards-state";
import GridContainer from "../grid-container";

const gridColumns: XylonGridColumnConfig[] = [
  { field: "Name", title: "Contract Name" },
  { field: "TO", title: "TO" },
  { field: "MOD", title: "MOD" },
  { field: "TaskDescription", title: "Task Description" },
  { field: "ContractType", title: "Contract Type" },
  { field: "ProjectType", title: "Project Type" },
  { field: "AwardDate", title: "AwardDate" },
  { field: "AwardValue", title: "Award Value", format: "{0:c}" },
];

const LatestAwards = () => {
  const [state, setState] = useState({
    awards: [],
    inLastDays: 7,
  } as LatestAwardsState);

  const api_base: string = "http://localhost:8080";

  useEffect(() => {
    async function getAwards() {
      const awards = await axios.get<Award[]>(
        `${api_base}/awards?days=${state.inLastDays}`
      );
      setState({
        ...state,
        awards: awards.data,
      });
    }
    getAwards();
  }, [state.inLastDays]);

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col className="m-2  text-center">
          <ButtonGroup>
            <Button primary={state.inLastDays==7} onClick={()=>setState({...state,inLastDays:7})}>Last 7 Days</Button>
            <Button  primary={state.inLastDays==30} onClick={()=>setState({...state,inLastDays:30})} >Last Month</Button>
            <Button primary={state.inLastDays==120} onClick={()=>setState({...state,inLastDays:120})}>Last Quarter</Button>
            <Button primary={state.inLastDays==365}  onClick={()=>setState({...state,inLastDays:365})}>Last Year</Button>
        </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col className="box-shadow m-2 border">
            <GridContainer data={state.awards} columns={gridColumns} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
export default LatestAwards;
