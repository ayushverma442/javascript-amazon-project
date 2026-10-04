import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";

//import '../data/backend-practice.js';
import { loadProducts } from "../data/products.js";

new Promise((resolve)=>{
    loadProducts(()=>{
        resolve('value 1');
    })
}).then((value)=>{
    console.log(value);
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});