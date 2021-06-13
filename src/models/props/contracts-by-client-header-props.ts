import { DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";

export interface ContractsByClientHeaderProps 
{
    years:number[],
    yearDropDownChangeHandler : (e: DropDownListChangeEvent)=> void,
    topDropDownChangeHandler :  (e: DropDownListChangeEvent)=> void,
    filterButtonClickHandler: () => void
    
}

