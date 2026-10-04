import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";

//import '../data/backend-practice.js';
import { loadProducts,loadProductsFetch } from "../data/products.js";


loadProductsFetch().then(()=>{
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});