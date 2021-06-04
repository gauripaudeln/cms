import { State } from "@progress/kendo-data-query";
import { Category } from "./category";
import { Product } from "./product";

export interface AppProps {}
export interface AppState {
  products: Product[],
  categories: Category[],
  dropdownlistCategory: string;
  gridDataState: State;
  windowVisible: boolean;
  gridClickedRow: any;
}