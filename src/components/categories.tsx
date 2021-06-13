import React, { Component } from "react";
import '@progress/kendo-theme-default/dist/all.css';
import './App.css'
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { CategoriesProps } from "src/models/props/categories-props";

function Categories(props: CategoriesProps){
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