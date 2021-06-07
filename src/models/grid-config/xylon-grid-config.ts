import { XylonGridColumnConfig } from "./xylon-grid-column-config";
import { XylonGridFilterConfig } from "./xylon-grid-filter-config";
import { XylonGridSortConfig } from "./xylon-grid-sort-config";

export class XylonGridConfig {

    columns:XylonGridColumnConfig[];
    sort:XylonGridSortConfig[] ;
    filter:XylonGridFilterConfig;
}