// const btnCart = document.querySelector('.cart-icon');
// const Cart = document.querySelector('.cart');
// const btnClose = document.querySelector('#cart-close');

// // show cart
// btnCart.addEventListener('click', () => {
//     Cart.classList.add('cart-active');
// });

// // remove cart
// btnClose.addEventListener('click', () => {
//     Cart.classList.remove('cart-active');
// });

// // load content when page loaded
// document.addEventListener('DOMContentLoaded', loadPage);

// function loadPage() {
//     loadContent();
// }

// function loadContent() {
//     //remove item from cart
//     let btnRemove = document.querySelectorAll('.cart-remove');
//     btnRemove.forEach((btn) => {
//         btn.addEventListener('click', removeItem);
//     });
//     // remove item
//     function removeItem() {

//         // check item in cart
//         // if (confirm('Are you sure to Remove')) {
//         this.parentElement.remove();
//         // } 
//     }
//     // product item change event
//     let qtyElement = this.document.querySelectorAll('.cart-quantity')
//     qtyElement.forEach((input) => {
//         input.addEventListener('change', ChangeQty);
//     });

//     // change quantity
//     function ChangeQty() {
//         if (isNaN(this.value) || this.value < 1) {
//             this.value = 1;
//         }
//     }



//     // product cart
//     let cartBtns = document.querySelectorAll('.add-cart');
//     // console.log(cartBtns);
//     cartBtns.forEach((btn) => {
//         btn.addEventListener('click', addCart);
//     });

// }

// // Add to cart
// function addCart() {
//     // console.log('check');
//     let dress = this.parentElement;
//     let title = dress.querySelector('.dress-title1').innerHTML;
//     let price = dress.querySelector('.dress-price1').innerHTML;
//     let imgSrc = dress.querySelector('.dress-img1').src;
//     console.log(title,price,imgSrc);


//     let newProductElement = createCartProduct(title, price, imgSrc);
//     let element = document.createElement('div');
//     element.innerHTML = newProductElement;
//     let cartBasket = document.querySelector('.cart-content');
//     cartBasket.append(element);
//     loadContent();
// }

// function createCartProduct(title, price, imgSrc) {
//     return `<div class="cart-box">
//     <img src="${imgSrc}" class="cart-img">
//     <div class="detail-box">
//         <div class="dress-title">${title}</div>
//         <div class="price-box">
//             <div class="cart-price">${price}</div>
//             <div class="cart-amt">${price}</div>
//         </div>
//         <input type="number" value="1" class="cart-quantity">
//     </div>
    
//     <i class="fa-regular fa-trash-can cart-remove"></i>
// </div>
// `;
// }
// update total
// function updateTotal() {
//     const cartItems = document.querySelectorAll('.cart-box');
//     const totalValue = document.querySelector('.total-price');

//     let total = 0;

//     cartItems.forEach(product => {
//         let priceElement = product.querySelector('.cart-price');
//         let price = parseFloat(priceElement.innerHTML.replace("$", ""));
//         let qty = product.querySelector('.cart-quantity').value;
//         total += (price * qty);
//         product.querySelector('.cart-amt').innerText = "$" + (price * qty);

//     });

//     totalValue.innerHTML = '$' + total;
//     // Add Product Count in Cart Icon

//     const cartCount = document.querySelector('.cart-count');
//     let count = itemList.length;
//     cartCount.innerHTML = count;

//     if (count == 0) {
//         cartCount.style.display = 'none';
//     } else {
//         cartCount.style.display = 'block';
//     }
// }




// script.js
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if(bar){
  bar.addEventListener('click',()=>{
    nav.classList.add('active');
  })
}
if(close){
  close.addEventListener('click',()=>{
    nav.classList.remove('active');
  })
}
// Function to add the selected product to the cart
function addToCart() {
    const productName = document.querySelector('.dress-title1').textContent;
    const productPrice = document.querySelector('.dress-price1').textContent;
    const selectedSize = document.querySelector('select').value;
    let quantity = parseInt(document.querySelector('input[type="number"]').value);
  
    // Validate the quantity and adjust it to a minimum of 1
    if (isNaN(quantity) || quantity < 1) {
      quantity = 1;
    }
  
    const product = {
      name: productName,
      price: productPrice,
      size: selectedSize,
      quantity: quantity
    };
  
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let existingProductIndex = -1;
  
    // Check if the product already exists in the cart
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].name === product.name && cartItems[i].size === product.size) {
        existingProductIndex = i;
        break;
      }
    }
  
    if (existingProductIndex > -1) {
      // If the product already exists, update the quantity
      cartItems[existingProductIndex].quantity += quantity;
    } else {
      // Otherwise, add the product to the cart
      cartItems.push(product);
    }
  
    localStorage.setItem('cart', JSON.stringify(cartItems));
  
    populateCart();
    updateCartCount();
  }
  
  function removeFromCart(index) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  
    if (index >= 0 && index < cartItems.length) {
      cartItems.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  
    populateCart();
    updateCartCount();
  }
  
  function updateCartCount() {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('#cart-count');
    if (cartCount) {
      cartCount.textContent = cartItems.length;
      cartCount.style.display = cartItems.length > 0 ? 'block' : 'none';
    }
  }
  
  function populateCart() {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartBody = document.querySelector('.cart-body');
    let cartSubtotal = 0;
  
    if (cartBody) {
      cartBody.innerHTML = '';
  
      cartItems.forEach((item, index) => {
        const subtotal = parseFloat(item.price.slice(1)) * parseInt(item.quantity);
        cartSubtotal += subtotal;
  
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td><i class="fa-regular fa-circle-xmark cart-remove"></i></td>
          <td><img src="images/f1.jpg" alt=""></td>
          <td>${item.name}</td>
          <td>${item.price}</td>
          <td><input type="number" value="${item.quantity}" class="cart-quantity" min="1"></td>
          <td>$${subtotal.toFixed(2)}</td>
        `;
  
        cartBody.appendChild(newRow);
      });
    }
  
    const cartSubtotalElement = document.querySelector('#subtotal table tr:first-child td:last-child');
    const cartTotalElement = document.querySelector('#subtotal table tr:last-child td:last-child');
  
    if (cartSubtotalElement) {
      cartSubtotalElement.textContent = `$${cartSubtotal.toFixed(2)}`;
    }
  
    if (cartTotalElement) {
      cartTotalElement.textContent = `$${cartSubtotal.toFixed(2)}`;
    }
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const placeOrderButton = document.querySelector('#subtotal button');
    if (placeOrderButton) {
      placeOrderButton.addEventListener('click', function() {
        // Clear the cart when the "Place Order" button is clicked
        localStorage.removeItem('cart');
        populateCart();
        updateCartCount();
      });
    }
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const addToCartButton = document.querySelector('.add-cart1');
    if (addToCartButton) {
      addToCartButton.addEventListener('click', function() {
        addToCart();
      });
    }
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const cartBody = document.querySelector('.cart-body');
    if (cartBody) {
      cartBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('cart-remove')) {
          const removeIcon = event.target;
          const rowIndex = removeIcon.closest('tr').rowIndex - 1;
          removeFromCart(rowIndex);
        }
      });
    }
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const cartBody = document.querySelector('.cart-body');
    if (cartBody) {
      cartBody.addEventListener('change', function(event) {
        if (event.target.classList.contains('cart-quantity')) {
          const quantityInput = event.target;
          const rowIndex = quantityInput.closest('tr').rowIndex - 1;
          const newQuantity = parseInt(quantityInput.value);
  
          if (isNaN(newQuantity) || newQuantity < 1) {
            quantityInput.value = 1;
          }
  
          let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
          if (rowIndex >= 0 && rowIndex < cartItems.length) {
            cartItems[rowIndex].quantity = quantityInput.value;
            localStorage.setItem('cart', JSON.stringify(cartItems));
          }
  
          populateCart();
        }
      });
    }
  });
  
  document.addEventListener('DOMContentLoaded', populateCart);
    
  function showAlert() {
    alert("Order placed successfully!");
  }


  
  

  
  











































