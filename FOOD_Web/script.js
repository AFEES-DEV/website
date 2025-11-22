let cart = [];

function addToCart(name, price) {
    let item = cart.find(product =>product.name===name);

    if(item){
        item.quantity += 1;
    } else {
        cart.push({name,price, quantity:1});
    }

    displayCart();

    }

function displayCart() {
    letcartDiv = document.getElementById("cart");
    cartDiv.innerHTML="";

    let total =0;

    cart.forEach((item, index)=> {
        total += item.price * item.quantity;

        cartDiv.innerHTML += `<p style="font-size:18px;">
                 ${item.name} -#${item.price}x ${item.quantity}
                 <button onclick="increase(${index})">+</button>
                 <button onclick="decrease(${index})">-</button>
                 </p>`;
    });
     cartDiv.innerHTML+=`<h3>Total: #${total}</h3>`;
}

function increase (index) {
    cart[index].quantity++;displayCart();
}

function decrease (index) {
    if(cart[index].quantity>1){
        cart[index].quantity--;
    } else{
        cart.splice(index, 1)
    }
    displayCart();
}
