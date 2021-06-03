import React, { Component } from "react";
import '@progress/kendo-theme-default/dist/all.css';
import './App.css'
import { Category } from "src/models/category";
import { DropDownList, DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";

function Categories(props: {data:Category[],onDropDownChange : (e: DropDownListChangeEvent)=> void, selectedCategory:string}){
    return (<p>
        <DropDownList
          data={props.data}
          dataItemKey="CategoryID"
          textField="CategoryName"
          defaultItem={{
            CategoryID: null,
            CategoryName: "Product categories"
          }}
          onChange={props.onDropDownChange}
        />
        &nbsp; Selected category ID:{" "}
        <strong>{props.selectedCategory}</strong>
      </p>);
}

export default Categories;