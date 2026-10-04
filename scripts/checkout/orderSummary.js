import {cart} from '../../data/cart-class.js';
import { products,getProduct } from '../../data/products.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryoptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

const today=dayjs();
const deliveryDate=today.add(7,'days');
console.log(deliveryDate.format('dddd, MMMM D'));

cart.updateCartQuantity();
export function renderOrderSummary(){
    let cartSummary='';
    cart.cartItems.forEach((cartItem)=>{
        const productId=cartItem.productId;
        const matchingProduct=getProduct(productId);

        const deliveryOptionId=cartItem.deliveryOptionId;

        const deliveryOption=getDeliveryOption(deliveryOptionId);
        const today=dayjs();
        const deliveryDate=today.add(
            deliveryOption.deliveryDays,'Days'
        );
        const dateString=deliveryDate.format('dddd, MMMM D');

        cartSummary+=`<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date ">
            Delivery date: ${dateString}
            </div>
            <div class="cart-item-details-grid">
            <img class="product-image"
                src="${matchingProduct.image}">

            <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                $${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity">
                <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-cart" data-product-id="${matchingProduct.id}">
                    Update
                </span>
                <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                <span class="save-quantity-link link-primary"
                data-product-id="${matchingProduct.id}">Save</span>
                <span class="delete-quantity-link link-primary
                js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                </span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                Choose a delivery option:
                </div>
                ${deliveryOptionHTML(matchingProduct,cartItem)}
            </div>
            </div>
        </div>`

        function deliveryOptionHTML(matchingProduct,cartItem){
            
            let html='';
            deliveryOptions.forEach((deliveryoption)=>{
            const today=dayjs();
            const deliveryDate=today.add(
                deliveryoption.deliveryDays,'Days'
            );
            const dateString=deliveryDate.format('dddd, MMMM D');
            const priceString = deliveryoption.priceCents ===0? 'FREE':`$${(deliveryoption.priceCents/100).toFixed(2)}`;
                const isChecked=deliveryoption.id===cartItem.deliveryOptionId;

                html+=`<div class="delivery-option js-delivery-option"
                data-product-id="${matchingProduct.id}"
                data-delivery-option-id="${deliveryoption.id}">
                <input type="radio"
                    ${isChecked?'checked':''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                <div>
                    <div class="delivery-option-date">
                    ${dateString}
                    </div>
                    <div class="delivery-option-price">
                    ${priceString}-Shipping
                    </div>
                </div>
                </div>
                `
            })
            return html;
        }
        document.querySelector(".js-order-summary").innerHTML=cartSummary;
        document.querySelectorAll(".js-delete-link").forEach((link)=>{
            link.addEventListener('click',()=>{
                const productId=link.dataset.productId;
                cart.removeFromCart(productId);

                const container=document.querySelector(`.js-cart-item-container-${productId}`);
                container.remove();

                renderPaymentSummary();
            });
        });
        document.querySelectorAll(".js-update-cart").forEach((link)=>{
            link.addEventListener('click',()=>{
                const productId=link.dataset.productId;
                console.log(productId);
                const container=document.querySelector(`.js-cart-item-container-${productId}`);
                container.classList.add("is-editing-quantity");

            });
        });
        document.querySelectorAll(".save-quantity-link").forEach((link)=>{
            link.addEventListener('click',()=>{
                const productId=link.dataset.productId;
    
                const quantityInput=document.querySelector(`.js-quantity-input-${productId}`);
                const newQuantity=Number(quantityInput.value);
                if (newQuantity < 0 || newQuantity >= 1000) {
                    alert('Quantity must be at least 0 and less than 1000');
                    return;
                }

                cart.updateQuantity(productId,newQuantity);

                const quantityLabel = document.querySelector(
                `.js-quantity-label-${productId}`
                );
                quantityLabel.innerHTML = newQuantity;

                const container=document.querySelector(`.js-cart-item-container-${productId}`);

                container.classList.remove("is-editing-quantity");
                cart.updateCartQuantity();
                renderPaymentSummary();
            });
        });
    })

    document.querySelectorAll('.js-delivery-option')
    .forEach((element)=>{
        element.addEventListener('click',()=>{
            const {productId,deliveryOptionId}=element.dataset;
            console.log(productId);
            console.log(deliveryOptionId);
            cart.updateDeliveryOption(productId,deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
}
//renderOrderSummary();