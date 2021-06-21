import { DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Client } from "src/models/client";
import { XylonGridColumnConfig } from "src/models/grid-config/xylon-grid-column-config";
import { ContractByClientState } from "src/models/states/contracts-by-client-state";
import FustionChartContainer from "../charts/fusion-chart-container";
import GridContainer from "../grid-container";
import ContractsByClientHeader from "./contracts-by-client-header";

const gridColumns: XylonGridColumnConfig[] = [
  { field: "Name", title: "Name" },
  { field: "Year", title: "Year" },
  { field: "ContractAmount", title: "ContractAmount", format: "{0:c}" },
];
const tops = [3, 5, 10, 15];

const ContractsByClient = () => {
  const [state, setState] = useState({
    clients: [],
    columns: gridColumns,
    years: [],
    filteredClients: [],
    tops: [],
    selectedFilter: { Year: new Date().getFullYear(), Top: 3 },
  } as ContractByClientState);

  const api_base: string = "http://localhost:8080";
  useEffect(() => {
    applyFilter();
  }, [state.selectedFilter]);

  useEffect(() => {
    async function getClients() {
      const clients = await axios.get<Client[]>(`${api_base}/clients`);
      let years: number[] = [];
      clients.data.forEach((c) => {
        if (!years.includes(c.Year)) years.push(c.Year);
      });
      years = years.sort((n1, n2) => n2 - n1);
      setState({
        ...state,
        clients: clients.data,
        filteredClients: clients.data,
        years: years,
        tops: tops,
        selectedFilter: { Year: years[0], Top: tops[0] },
      });
    }
    getClients();
  }, []);

  const handleYearDropDownChange = (e: DropDownListChangeEvent) => {
    if (e.target.value !== null) {
      console.log({ Year: e.target.value });
      let newFilter = { ...state.selectedFilter };
      newFilter.Year = e.target.value;
      setState({
        ...state,
        selectedFilter: newFilter,
      });
    }
  };

  const handleTopDropDownChange = (e: DropDownListChangeEvent) => {
    if (e.target.value !== null) {
      console.log({ Top: e.target.value });
      let newFilter = { ...state.selectedFilter };
      newFilter.Top = e.target.value;
      setState({
        ...state,
        selectedFilter: newFilter,
      });
    }
  };

  const handleFilterButtonClicked = () => {
    applyFilter();
  };

  const applyFilter = () => {
    let filterByYear = state.clients.filter(
      (c) => c.Year === state.selectedFilter.Year
    );
    if (state.selectedFilter.Top < filterByYear.length) {
      let sortByContractAmountDesc = filterByYear.sort(
        (n1, n2) => n2.ContractAmount - n1.ContractAmount
      );
      setState({
        ...state,
        filteredClients: sortByContractAmountDesc.slice(
          0,
          state.selectedFilter.Top
        ),
      });
    } else {
      setState({ ...state, filteredClients: filterByYear });
    }
  };

  return (
    <Card>
      <Card.Title>
        <div>
          <ContractsByClientHeader
            years={state.years}
            tops={state.tops}
            yearDropDownChangeHandler={handleYearDropDownChange}
            topDropDownChangeHandler={handleTopDropDownChange}
            filterButtonClickHandler={handleFilterButtonClicked}
          />
        </div>
      </Card.Title>
      <Card.Body>
        <Row>
          <Col className="box-shadow m-2 border">
            <FustionChartContainer
              data={state.filteredClients}
              categoryField="Name"
              field="ContractAmount"
              selectedFilter={state.selectedFilter}
            />
          </Col>
          <Col className="box-shadow m-2 border">
            <GridContainer data={state.filteredClients} columns={gridColumns} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
export default ContractsByClient;
