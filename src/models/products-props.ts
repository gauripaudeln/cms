import { State } from "@progress/kendo-data-query";
import { GridDataStateChangeEvent, GridRowClickEvent } from "@progress/kendo-react-grid";
import { Product } from "./product";


export interface ProductsProps 
{ 
    data:Product[], 
    gridDataState:State,
    onGridDataStateChange:(e: GridDataStateChangeEvent)=>void,  
    onGridRowClick: (e: GridRowClickEvent)=> void
}

