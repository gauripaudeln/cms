import { DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";

export interface ContractsByClientProps 
{
    years:number[],
    yearDropDownChangeHandler : (e: DropDownListChangeEvent)=> void,
    topDropDownChangeHandler :  (e: DropDownListChangeEvent)=> void,
    filterButtonClickHandler: () => void
    tops :number[],
    
}

