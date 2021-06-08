import React, { Component } from "react";
import '@progress/kendo-theme-default/dist/all.css';
import { Grid, GridColumn, GridDataStateChangeEvent, GridRowClickEvent, GridToolbar } from "@progress/kendo-react-grid";
import { process, State } from "@progress/kendo-data-query";
import { ProductsProps } from "src/models/products-props";
import { ExcelExport } from '@progress/kendo-react-excel-export';

function Products(props :ProductsProps) {
      let _export: ExcelExport | null;

        const excelExport = () => {
          if(_export!==null)
             _export.save();
        };
      return (
        
      <ExcelExport data={props.data} ref={(exporter) => (_export = exporter)}>    
      <Grid
        data={process(props.data, props.gridDataState)}
        pageable={true}
        sortable={true}
        {...props.gridDataState}
        onDataStateChange={props.onGridDataStateChange}
        style={{ height: "400px" }}
        onRowClick={props.onGridRowClick}
      >
        <GridToolbar>
          <button
            title="Export Excel"
            className="k-button k-primary"
            onClick={excelExport}
          >
            Export to Excel
          </button>
        </GridToolbar>

        {
        props.gridColumns.map(c=><GridColumn field={c.field} title={c.title} format={c.format}  key={c.field}/>)
        }
        
        
      </Grid>
      </ExcelExport>
      );


}

export default Products;
