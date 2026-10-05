import {orders} from '../data/orders.js';
import { getProduct,loadProductsFetch} from '../data/products.js';
import { products } from '../data/products.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

loadProductsFetch().then(()=>{
    let Orderhtml='';
    orders.forEach((order)=>{
        console.log(order);
        let productsHtml='';
        const orderDate=dayjs(order.orderTime).format('MMMM D');
        order.products.forEach((orderProduct)=>{
            const deliveryDate=dayjs(orderProduct.estimatedDeliveryTime);
            const dateString=deliveryDate.format('MMMM D');
            const product=getProduct(orderProduct.productId);
            console.log(product);
            productsHtml+=`
            <div class="product-image-container">
                    <img src="${product.image}">
                    </div>

                    <div class="product-details">
                    <div class="product-name">
                    ${product.name}
                    </div>
                    <div class="product-delivery-date">
                        Arriving on: ${dateString}
                    </div>
                    <div class="product-quantity">
                        Quantity: ${orderProduct.quantity}
                    </div>
                    <button class="buy-again-button button-primary">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                    </button>
                    </div>
                    <div class="product-actions">
                    <a href="tracking.html">
                        <button class="track-package-button button-secondary">
                            Track package
                        </button>
                    </a>
                </div>
            `
        });
        Orderhtml+=`
         <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderDate}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${(order.totalCostCents/100).toFixed(2)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${productsHtml}
            </div>
          </div>
        `;
    });
    document.querySelector(".orders-grid").innerHTML=Orderhtml;
})

//console.log(orders);