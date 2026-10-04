import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";

//import '../data/backend-practice.js';
import { loadProducts,loadProductsFetch } from "../data/products.js";


async function loadPage(){
    try{
        // throw 'error1'
        await loadProductsFetch();
    }catch(error){
        console.log('Unexpected Error.Please try again.');
    }
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();
/*
loadProductsFetch().then(()=>{
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});
*/