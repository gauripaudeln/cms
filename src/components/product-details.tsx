import React, { Component } from "react";
import '@progress/kendo-theme-default/dist/all.css';
import { Window  } from "@progress/kendo-react-dialogs";
import { ProductDetailsProps } from "src/models/props/product-details-props";

function ProductDetail(props: ProductDetailsProps ){
    return (
    <Window
                title="Product Details"
                onClose={props.onClose}
                height={250}
            >
                <dl>
                <dt>Product Name</dt>
                <dd>{props.product.ProductName}</dd>
                <dt>Product ID</dt>
                <dd>{props.product.ProductID}</dd>
                <dt>Quantity per Unit</dt>
                <dd>{props.product.QuantityPerUnit}</dd>
                </dl>
            </Window>
    ); 
}

export default ProductDetail;