import { DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";
import { Category } from "../category";

export interface CategoriesProps 
{
    data:Category[],
    onDropDownChange : (e: DropDownListChangeEvent)=> void,
    selectedCategory:string
}

