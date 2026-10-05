class Cart{
    cartItems;
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey=localStorageKey;
        this.#loadFromStorage();
    }
    #loadFromStorage(){
    this.cartItems=JSON.parse(localStorage.getItem(this.#localStorageKey));
        if(!this.cartItems){
            this.cartItems=[{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity:1,
                deliveryOptionId:'1'
            },{
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity:1,
                deliveryOptionId:'1'
            }];
        }
    };
    saveToStorage(){                            localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    };

    addToCart(productId){
        const quantitySelector=document.querySelector(`.quantity-selector-${productId}`);
        const quantity=Number(quantitySelector.value);
        let matchingItem;
        this.cartItems.forEach((cartItem)=>{
            if(cartItem.productId===productId){
                matchingItem=cartItem;
            }
        });
        if(matchingItem){
            matchingItem.quantity+=quantity;
        }else{
            this.cartItems.push({
                productId:productId,
                quantity:quantity,
                deliveryOptionId:'1'
            });
        }
    this.saveToStorage();
    };

    removeFromCart(productId){
        const newCart=[];
        this.cartItems.forEach((product)=>{
            if(product.productId!==productId)
                newCart.push(product);
        });
        this.cartItems=newCart;
        this.saveToStorage();
        this.updateCartQuantity();
    };

    updateDeliveryOption(productId,deliveryOptionId){
        let matchingItem;
        this.cartItems.forEach((cartItem)=>{
            if(cartItem.productId===productId){
                matchingItem=cartItem;
            }
        });

        matchingItem.deliveryOptionId=deliveryOptionId;
        this.saveToStorage();
    };

    updateQuantity(productId, newQuantity) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
            matchingItem = cartItem;
            }
        });

        matchingItem.quantity = newQuantity;

        this.saveToStorage();
    };

    addedMessageTimeouts= {};
    addedText(productId){
        const addedToCartElement=document.querySelector(`.js-added-to-cart-${productId}`);
         addedToCartElement.classList.add('added-to-cart-visible');

         const previousTimeoutId = this.addedMessageTimeouts[productId];

        if (previousTimeoutId) {
            clearTimeout(previousTimeoutId);
        }
        const timeoutId = setTimeout(() => {
            addedToCartElement.classList.remove("added-to-cart-visible");
        }, 2000);

        this.addedMessageTimeouts[productId] = timeoutId;
    };
    clearCart(){
        this.cartItems=[];
        this.saveToStorage();
    }

    updateCartQuantity() {
        let cartQuantity = 0;
        this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });
        const cartElement = document.querySelector(".js-cart");
        if (cartElement) {
            cartElement.innerHTML = cartQuantity;
        }
        const quantitySummary = document.querySelector(".quantity-summary");
        if (quantitySummary) {
            quantitySummary.innerHTML = `Checkout (<a class="return-to-home-link"
                href="amazon.html">${cartQuantity} items</a>)`;
        }
    }
}



export const cart=new Cart('cart-oop')
const businessCart=new Cart('cart-business');

console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);



