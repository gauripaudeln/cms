import { Client } from "../client";
import { ContractsByClientFilter } from "../contracts-by-client-filter";
import { XylonGridColumnConfig } from "../grid-config/xylon-grid-column-config";

export interface ContractByClientState {
  clients: Client[],
  years :number[],
  columns: XylonGridColumnConfig[],
  filteredClients: Client[]
  selectedFilter: ContractsByClientFilter;
  tops :number[];
}