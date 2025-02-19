let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(product) {
    const existingProduct = cart.find(item => item.id == product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }
    saveCart();
}

function updateCart(id, quantity) {
    const product = cart.find(item => item.id == id);
    if (product) {
        product.quantity = quantity > 0 ? quantity : 1;
        saveCart();
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id != id);
    saveCart();
}

function clearCart() {
    cart = [];
    saveCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateUI();
}
