import React, { Component } from "react";
import '@progress/kendo-theme-default/dist/all.css';
import { Grid, GridColumn, GridDataStateChangeEvent, GridRowClickEvent } from "@progress/kendo-react-grid";
import { process, State } from "@progress/kendo-data-query";
import { ProductsProps } from "src/models/products-props";


function Products(props :ProductsProps) {
  
      return (<Grid
        data={process(props.data, props.gridDataState)}
        pageable={true}
        sortable={true}
        {...props.gridDataState}
        onDataStateChange={props.onGridDataStateChange}
        style={{ height: "400px" }}
        onRowClick={props.onGridRowClick}
      >
        {
        props.gridColumns.map(c=><GridColumn field={c.field} title={c.title} format={c.format}  key={c.field}/>)
        }
        
        
      </Grid>);


}

export default Products;
