document.addEventListener("DOMContentLoaded", updateUI);

function updateUI() {
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);

    cartItems.innerHTML = "";
    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        cartItems.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td><input type="number" min="1" value="${item.quantity}" class="form-control cart-quantity" data-id="${item.id}"></td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="btn btn-danger remove-from-cart" data-id="${item.id}">X</button></td>
            </tr>
        `;
    });

    cartTotal.textContent = totalPrice.toFixed(2);

    document.querySelectorAll(".cart-quantity").forEach(input => {
        input.addEventListener("change", event => updateCart(event.target.dataset.id, parseInt(event.target.value)));
    });

    document.querySelectorAll(".remove-from-cart").forEach(button => {
        button.addEventListener("click", event => removeFromCart(event.target.dataset.id));
    });

    document.getElementById("clear-cart").addEventListener("click", clearCart);
}
