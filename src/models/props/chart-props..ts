
import {  SeriesType } from "@progress/kendo-react-charts/dist/npm/common/property-types";
import { DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";
import { ContractsByClientFilter } from "../contracts-by-client-filter";
import { XylonGridFilterConfig } from "../grid-config/xylon-grid-filter-config";

export interface ChartProps 
{
    data:any[],
    categoryField:string,
    field: string;
    type?:SeriesType;
    color?:string ;
    background?:string;
    selectedFilter?:ContractsByClientFilter;
}

