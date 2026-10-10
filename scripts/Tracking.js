import { getProduct,loadProductsFetch} from '../data/products.js';
import { orders } from '../data/orders.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

const url=new URL(window.location.href);
const orderId=url.searchParams.get('orderId');
const productId=url.searchParams.get('productId');

loadProductsFetch().then(()=>{
    const matchingOrder=orders.find((order)=>{
    return order.id===orderId;
});
const matchingProduct=matchingOrder.products.find((product)=>{
    return product.productId===productId;
});

const product=getProduct(matchingProduct.productId);

const deliveryDate=dayjs(matchingProduct.estimatedDeliveryTime);
const dateString=deliveryDate.format('dddd MMMM D');

const today=dayjs();
const isDelivered=today.isAfter(deliveryDate,'Day');

let deliveryDateText;
if(isDelivered){
    deliveryDateText=`Delivered On: ${dateString}`;
}else{
    deliveryDateText=`Arriving On: ${dateString}`
}
let trackingHTML=`
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
            ${deliveryDateText}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${matchingProduct.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label ${isDelivered?'':'current-status'}">
            Shipped
          </div>
          <div class="progress-label ${isDelivered?'current-status':''}">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" 
          style="width:${isDelivered?'100%':'50%'}">
        </div>
        </div>
`
document.querySelector(".js-tracking").innerHTML=trackingHTML;
console.log(product);
console.log(matchingOrder);
console.log(matchingProduct);
});