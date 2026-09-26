export const cart=[];
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
}

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