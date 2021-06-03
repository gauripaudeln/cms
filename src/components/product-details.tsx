import React, { Component } from "react";
import '@progress/kendo-theme-default/dist/all.css';
import { Product } from "src/models/product";
import { Window, WindowActionsEvent } from "@progress/kendo-react-dialogs";

function ProductDetail(props: {product: Product, onClose:(e: WindowActionsEvent)=> void}){
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