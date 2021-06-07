import React, { Component } from "react";
import { render } from "react-dom";
import '@progress/kendo-theme-default/dist/all.css';
import './App.css'
import {   FilterDescriptor, process, SortDescriptor, State } from "@progress/kendo-data-query";
import {
  Grid,
  GridColumn,
  GridDataStateChangeEvent,
  GridRowClickEvent,
  GridCell,
  GridCellProps
} from "@progress/kendo-react-grid";
import {
  DropDownList,
  DropDownListChangeEvent
} from "@progress/kendo-react-dropdowns";
import { Window, WindowActionsEvent } from "@progress/kendo-react-dialogs";
import { Category } from "src/models/category";
import { Product } from "src/models/product";
import Categories from "./categories";



import Products from "./products";
import ProductDetail from "./product-details";
import axios from "axios";
import {AppProps, AppState} from 'src/models/app-state'
import { XylonGridConfig } from "src/models/grid-config/xylon-grid-config";

const GridConfigData : XylonGridConfig = {
  columns: [{field:"ProductName", title:"Product Name"  }, 
            {field:"UnitPrice", title:"Unit Price" , format: "{0:c}"  }, 
            {field:"UnitsInStock", title:"Units In Stock"  }],
  sort: [{field:"ProductName",dir:"asc"}],
  filter: {logic:"and",
           filters : [{
            field: "CategoryID",
            operator: "ne",
            value: ''
          }]
          }
};


class App extends Component<AppProps, AppState> {


  private api_base:string  = "http://localhost:8080"
  
  async componentDidMount(){
    
    const products =  await axios.get<Product[]>(`${this.api_base}/products`);
    const categories = await axios.get<Category[]>(`${this.api_base}/categories`);
    
   this.setState({
      products: products.data ,
      categories: categories.data
    });
  }
  constructor(props: AppProps) {
    super(props);
    //console.log(GridConfigData);
    this.state = {
      products : [] ,
      categories : [] ,

      dropdownlistCategory: '',
      gridDataState: {
        sort: GridConfigData.sort?.map(s=> s as SortDescriptor ),
        skip: 0,
        take: 10,
        filter: {
            logic: GridConfigData.filter.logic,
            filters: GridConfigData.filter?.filters.map(f => f as FilterDescriptor)
          }
      },
      windowVisible: false,
      gridClickedRow: null
    };
  }

  handleDropDownChange = (e: DropDownListChangeEvent) => {
    let newDataState = { ...this.state.gridDataState };
    if (e.target.value.CategoryID !== null) {
      newDataState.filter = {
        logic: "and",
        filters: [
          {
            field: "CategoryID",
            operator: "eq",
            value: e.target.value.CategoryID
          }
        ]
      };
      newDataState.skip = 0;
    } else {
      newDataState.filter = {
        logic: "and",
        filters: [
          {
            field: "CategoryID",
            operator: "ne",
            value: ''
          }
        ]
      };
      newDataState.skip = 0;
    }
    this.setState({
      dropdownlistCategory: e.target.value.CategoryID,
      gridDataState: newDataState
    });
  };

  handleGridDataStateChange = (e: GridDataStateChangeEvent) => {
    this.setState({ gridDataState: e.dataState });
  };

  handleGridRowClick = (e: GridRowClickEvent) => {
    this.setState({
      windowVisible: true,
      gridClickedRow: e.dataItem
    });
  };

  closeWindow = (e: WindowActionsEvent) => {
    this.setState({
      windowVisible: false
    });
  };

  render() {
    return (
      
      
      <div className="kendo-react-getting-started">
        <h1>Kendo Grid Test!</h1>
        <Categories data={ this.state.categories} 
        onDropDownChange = {this.handleDropDownChange} 
        selectedCategory = {this.state.dropdownlistCategory} />

        <Products  data={this.state.products} 
        gridDataState= {this.state.gridDataState}
        onGridDataStateChange = {this.handleGridDataStateChange} 
        onGridRowClick = {this.handleGridRowClick}
        gridColumns= {GridConfigData.columns}
        />

        {this.state.windowVisible && (
          <ProductDetail product={this.state.gridClickedRow} onClose={this.closeWindow} />
        )}
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));

export default App; 
