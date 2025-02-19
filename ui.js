let appliedPromo = null; 

document.getElementById("apply-promo").addEventListener("click", applyPromoCode);

function applyPromoCode() {
    const promoInput = document.getElementById("promo-code").value.trim().toLowerCase();
    const promoMessage = document.getElementById("promo-message");

    const validPromoCodes = {
        "ostad10": 0.10, 
        "ostad5": 0.05    
    };

    if (appliedPromo) {
        promoMessage.textContent = "You have already applied a promo code!";
        promoMessage.classList.add("text-danger");
        return;
    }

    if (validPromoCodes[promoInput]) {
        appliedPromo = promoInput;
        promoMessage.textContent = `Promo Code Applied! ${validPromoCodes[promoInput] * 100}% Discount.`;
        promoMessage.classList.remove("text-danger");
        promoMessage.classList.add("text-success");
        updateUI();
    } else {
        promoMessage.textContent = "Invalid promo code!";
        promoMessage.classList.add("text-danger");
    }
}

function updateUI() {
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);

    cartItems.innerHTML = "";
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
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

    let discount = 0;
    if (appliedPromo) {
        const discountRate = appliedPromo === "ostad10" ? 0.10 : 0.05;
        discount = subtotal * discountRate;
    }

    let finalTotal = subtotal - discount;

    document.getElementById("cart-total").textContent = finalTotal.toFixed(2);

    let summaryHTML = `
        <h5>Subtotal: $${subtotal.toFixed(2)}</h5>
        <h5>Discount: -$${discount.toFixed(2)}</h5>
        <h4>Final Total: $${finalTotal.toFixed(2)}</h4>
    `;
    document.getElementById("cart-summary").innerHTML = summaryHTML;

    document.querySelectorAll(".cart-quantity").forEach(input => {
        input.addEventListener("change", event => updateCart(event.target.dataset.id, parseInt(event.target.value)));
    });

    document.querySelectorAll(".remove-from-cart").forEach(button => {
        button.addEventListener("click", event => removeFromCart(event.target.dataset.id));
    });


    document.getElementById("clear-cart").addEventListener("click", clearCart);

}
