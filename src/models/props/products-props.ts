import { State } from "@progress/kendo-data-query";
import { GridDataStateChangeEvent, GridRowClickEvent } from "@progress/kendo-react-grid";
import { XylonGridColumnConfig } from "../grid-config/xylon-grid-column-config";
import { Product } from "../product";


export interface ProductsProps 
{ 
    data:Product[], 
    gridDataState:State,
    gridColumns : XylonGridColumnConfig[];
    onGridDataStateChange:(e: GridDataStateChangeEvent)=>void,  
    onGridRowClick: (e: GridRowClickEvent)=> void
}

