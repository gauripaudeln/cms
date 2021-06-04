import { State } from "@progress/kendo-data-query";
import { WindowActionsEvent } from "@progress/kendo-react-dialogs";
import { Product } from "./product";


export interface ProductDetailsProps 
{
    product: Product, 
    onClose:(e: WindowActionsEvent)=> void
}

