export let cart=JSON.parse(localStorage.getItem('cart'));
if(!cart){
    cart=[{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:1
    },{
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:1
    }];
}

function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}
export function addToCart(productId){
    const quantitySelector=document.querySelector(`.quantity-selector-${productId}`);
    const quantity=Number(quantitySelector.value);
  let matchingItem;
  cart.forEach((cartItem)=>{
      if(cartItem.productId===productId){
          matchingItem=item;
      }
  });
  if(matchingItem){
      matchingItem.quantity+=quantity;
  }else{
      cart.push({
          productId:productId,
          quantity:quantity
    });
  }
  saveToStorage();
}
const addedMessageTimeouts = {};
export function addedText(productId){
  const addedToCartElement=document.querySelector(`.js-added-to-cart-${productId}`);
         addedToCartElement.classList.add('added-to-cart-visible');

         const previousTimeoutId = addedMessageTimeouts[productId];

        if (previousTimeoutId) {
            clearTimeout(previousTimeoutId);
        }
        const timeoutId = setTimeout(() => {
            addedToCartElement.classList.remove("added-to-cart-visible");
        }, 2000);

        addedMessageTimeouts[productId] = timeoutId;
}

export function removeFromCart(productId){
    const newCart=[];
    cart.forEach((product)=>{
        if(product.productId!==productId)
            newCart.push(product);
    });
    cart=newCart;
    saveToStorage();
}