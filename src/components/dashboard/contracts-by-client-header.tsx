import {   DropDownList } from "@progress/kendo-react-dropdowns";
import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Button } from "@progress/kendo-react-buttons";
import { ContractsByClientHeaderProps} from 'src/models/props/contracts-by-client-header-props'

const ContractsByClientHeader = (props: ContractsByClientHeaderProps) => (

  <div className="container-fluid mt-2">
    <div className="row">
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-left text-muted"> <h5>Contracts By Client</h5></div>
          <div className="col-md-6   align-right">
            <Row>
              <Col>Year</Col>
              <Col>
                <DropDownList data={props.years} 
                  defaultValue={props.years[0]}                
                 onChange={props.yearDropDownChangeHandler}
                />
              </Col>
              <Col>Top Count </Col>
              <Col>
                <DropDownList data={props.tops} 
                defaultValue={props.tops[0]} 
                onChange={props.topDropDownChangeHandler}
                />
              </Col>
              <Col>
                <Button onClick={props.filterButtonClickHandler} >Filter</Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  </div>

);
export default ContractsByClientHeader;
