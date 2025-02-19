document.addEventListener("DOMContentLoaded", () => {
  fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then(products => displayProducts(products))
      .catch(error => console.error("Error loading products:", error));
});

function displayProducts(products) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  products.forEach(product => {
      const productCard = `
          <div class="col-md-4 extra-style" >
              <div class="card mb-4 ">
                  <img src="${product.image}" class="card-img-top" alt="${product.title}">
                  <div class="card-body text-center">
                      <h5 class="card-title">${product.title}</h5>
                      <p class="card-text">${product.description.substring(0, 100)}...</p>
                      <h6 class="card-text">$${product.price.toFixed(2)}</h6>
                      <button class="btn btn-primary add-to-cart" data-id="${product.id}" data-name="${product.title}" data-price="${product.price}">
                          Add to Cart
                      </button>
                  </div>
              </div>
          </div>
      `;
      productList.innerHTML += productCard;
  });

  document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", event => {
          const product = {
              id: event.target.dataset.id,
              name: event.target.dataset.name,
              price: parseFloat(event.target.dataset.price),
              quantity: 1
          };
          addToCart(product);
      });
  });
}
