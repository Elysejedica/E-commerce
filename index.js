let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");



cartIcon.onclick = () => {
    cart.classList.add("active");
};

closeCart.onclick = () => {
    cart.classList.remove("active");
};

if (document.readyState == "loading") {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    var quantityInputs = document.getElementsByClassName('cart-quantity');

    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
      
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    document 
    .getElementsByClassName("btn-buy") [0]
    .addEventListener("click", buyBouttonClicked);
}


function buyBouttonClicked(){
    alert("Votre commande est passée");
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    total = 0;
    updatetotal(); 
}


function removeCartItem(event) {
    var buttonClicked = event.target;
    var priceElement = buttonClicked.parentElement.querySelector('.cart-price');
    var price = getTruePrice(priceElement.innerText);
    
    var input = buttonClicked.parentElement.querySelector('.cart-quantity');  
    var totalItemPrice  = price * input.value;

    buttonClicked.parentElement.remove();   
    total -= totalItemPrice;   
    updatetotal();   
}

function quantityChanged(event) {
    var input = event.target;
    var price = input.parentElement.getElementsByClassName('cart-price')[0].innerText;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    total1(getTruePrice(price), input.value);
}
function getTruePrice(price) {
    let truePrice = price.replace('$','');
    return Number(truePrice)
}
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg)
    total1(getTruePrice(price));
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = document.getElementsByClassName('cart-product-title');

    for (var i = 0; i < cartItemsNames.length; i++) {

            if (cartItemsNames[i].innerText == title) {
                alert("Vous avez déjà ajouté cet article au panier");
            return;
            }
    }
    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bxs-trash-alt cart-remove'></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.appendChild(cartShopBox);

    cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener('click', removeCartItem);

    cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener('change', quantityChanged);

    // updatetotal(cart);
}

function updatetotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("$", " "));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = "$" + total;
}
let total = 0;
function total1(price, qtt = 1) {
   
   if (qtt == 1) { 
       total = price;  
   } else {   
      total = (price * qtt) ;     
   } 
  
   document.getElementsByClassName('total-price')[0].innerText = "$" + total;  
   console.log(total);
}


