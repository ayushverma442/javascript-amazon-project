import {cart} from '../../data/cart-class.js';
import { getProduct } from  '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryoptions.js'; 
import { addOrder } from '../../data/orders.js'; 
export function renderPaymentSummary(){
    let productPriceCents=0;
    let shippingPriceCents=0;
    cart.cartItems.forEach((cartItem)=>{
        const product=getProduct(cartItem.productId);
        productPriceCents+=product.priceCents*cartItem.quantity;

        const delivery=getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents+=delivery.priceCents;
    });
    const  totalPriceCents=productPriceCents+shippingPriceCents;
    const taxCents=totalPriceCents*0.1;
    const totalCents=totalPriceCents+taxCents;
    let cartQuantity=0;
    cart.cartItems.forEach((cartItem)=>{
      cartQuantity+=cartItem.quantity;
    })
    
    const PaymentSummary=`
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money"> $${(productPriceCents/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money"> $${(shippingPriceCents/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money"> $${(totalPriceCents/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">                 $${(taxCents/100).toFixed(2)} </div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money"> $${(totalCents/100).toFixed(2)} </div>
          </div>

          <button class="place-order-button button-primary 
          js-place-order">
            Place your order
          </button>
    `
    document.querySelector(".js-payment-summary").innerHTML=PaymentSummary;

    document.querySelector(".js-place-order").addEventListener('click',     async ()=>{
      try{
      const response=await fetch('https://supersimplebackend.dev/orders',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          cart:cart
        })
      });
        const order= await response.json();
        addOrder(order);
      }catch(error){
        console.log('Unexpected Error. Please try again later');
      }
      cart.clearCart();
      window.location.href='orders.html';
  });
}