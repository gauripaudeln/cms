import React, { Component } from "react";
import { render } from "react-dom";
import "@progress/kendo-theme-default/dist/all.css";
import "./App.css";
import {
  FilterDescriptor,
  process,
  SortDescriptor,
  State,
} from "@progress/kendo-data-query";
import {
  Grid,
  GridColumn,
  GridDataStateChangeEvent,
  GridRowClickEvent,
  GridCell,
  GridCellProps,
} from "@progress/kendo-react-grid";
import {
  DropDownList,
  DropDownListChangeEvent,
} from "@progress/kendo-react-dropdowns";
import { Window, WindowActionsEvent } from "@progress/kendo-react-dialogs";
import { Category } from "src/models/category";
import { Product } from "src/models/product";
import { Client } from "src/models/client";
import Categories from "./categories";

import Products from "./products";
import ProductDetail from "./product-details";
import axios from "axios";
import { AppProps, AppState } from "src/models/app-state";
import { XylonGridConfig } from "src/models/grid-config/xylon-grid-config";
import ChartContainer from "./chart-container";
import { SeriesClickEvent } from "@progress/kendo-react-charts";
import { SeriesType } from "@progress/kendo-react-charts/dist/npm/common/property-types";
import ContractsByClientHeader from "./dashboard/contracts-by-client-header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Col, Row } from "react-bootstrap";
import { XylonGridFilterConfig } from "src/models/grid-config/xylon-grid-filter-config";
import { XylonGridColumnConfig } from "src/models/grid-config/xylon-grid-column-config";
import GridContainer from "./grid-container";

const gridColumns: XylonGridColumnConfig[] = [
  { field: "Name", title: "Name" },
  { field: "Year", title: "Year" },
  { field: "ContractAmount", title: "ContractAmount", format: "{0:c}" },
];

class App extends Component<AppProps, AppState> {
  private api_base: string = "http://localhost:8080";

  async componentDidMount() {
    const clients = await axios.get<Client[]>(`${this.api_base}/clients`);

    let years: number[] = [];
    clients.data.forEach((c) => {
      if (!years.includes(c.Year)) years.push(c.Year);
    });
    
    this.setState({
      clients: clients.data,
      filteredClients: clients.data,
      years: years
    });
  }
  constructor(props: AppProps) {
    super(props);
    //console.log(GridConfigData);
    this.state = {
      clients: [],
      columns: gridColumns,
      years: [],
      filteredClients: [],
      selectedFilter: { Year: new Date().getFullYear()-6, Top: 5 },
    };
  }
  handleYearDropDownChange = (e: DropDownListChangeEvent) => {
    if (e.target.value !== null) {
      let newFilter = { ...this.state.selectedFilter };
      newFilter.Year = e.target.value;
      this.setState({
        selectedFilter: newFilter,
      });
    }
  };

  handleTopDropDownChange = (e: DropDownListChangeEvent) => {
    if (e.target.value !== null) {
      let newFilter = { ...this.state.selectedFilter };
      newFilter.Top = e.target.value;
      this.setState({
        selectedFilter: newFilter,
      });
    }
  };

  handleFilterButtonClicked = () => {
    //console.log("button clicked");
    let filterByYear = this.state.clients.filter(
      (c) => c.Year === this.state.selectedFilter.Year
    );
    if (this.state.selectedFilter.Top < filterByYear.length) {
      let sortByContractAmountDesc = filterByYear.sort((n1, n2) => {
        if (n1.ContractAmount > n2.ContractAmount) {
          return -1;
        }

        if (n1.ContractAmount < n2.ContractAmount) {
          return 1;
        }
        return 0;
      });

      this.setState({
        filteredClients: sortByContractAmountDesc.slice(
          0,
          this.state.selectedFilter.Top
        ),
      });
    } else {
      this.setState({
        filteredClients: filterByYear,
      });
    }
  };

  render() {
    return (
      <Card>
        <Card.Title>
          <div>
            <ContractsByClientHeader
              years={this.state.years}
              yearDropDownChangeHandler={this.handleYearDropDownChange}
              topDropDownChangeHandler={this.handleTopDropDownChange}
              filterButtonClickHandler={this.handleFilterButtonClicked}
            />
          </div>
        </Card.Title>
        <Card.Body>
          <Row>
            <Col className="box-shadow m-2 border">
              <ChartContainer
                data={this.state.filteredClients}
                categoryField="Name"
                field="ContractAmount"
                type="donut"
                color="black"
                background="none"
              />
            </Col>
            <Col className="box-shadow m-2 border">
              <GridContainer data={this.state.filteredClients} columns={gridColumns} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

render(<App />, document.getElementById("root"));

export default App;
