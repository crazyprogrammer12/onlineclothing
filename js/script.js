// Image Slider Logic
let sliderIndex = 0;
const sliderImages = document.querySelectorAll(".slider img");

function showNextSlide() {
    sliderImages.forEach((img, index) => {
        img.style.transform = `translateX(-${sliderIndex * 100}%)`;
    });

    sliderIndex = (sliderIndex + 1) % sliderImages.length;
}

setInterval(showNextSlide, 3000); // Change slide every 3 seconds

// Cart Logic
const cart = [];
const cartTable = document.querySelector("#cart table tbody");
const cartSummary = document.querySelector(".cart-summary");
let cartTotal = 0;

// Function to add a product to the cart
function addToCart(productName, productPrice) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    updateCart();
}

// Function to update the cart display
function updateCart() {
    cartTable.innerHTML = "";
    cartTotal = 0;

    cart.forEach(item => {
        cartTotal += item.price * item.quantity;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>${(item.price * item.quantity).toFixed(2)}</td>
            <td>
                <button class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</button>
            </td>
        `;
        cartTable.appendChild(row);
    });

    cartSummary.innerHTML = `
        <strong>Total: Rs. ${cartTotal.toFixed(2)}</strong>
        <button onclick="checkout()">Checkout</button>
    `;
}

// Function to remove a product from the cart
function removeFromCart(productName) {
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex > -1) {
        cart.splice(productIndex, 1);
    }
    updateCart();
}

// Function to handle checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Thank you for your purchase! Your total is Rs. " + cartTotal.toFixed(2));
    cart.length = 0; // Clear the cart
    updateCart();
}

// Add event listeners to "Add to Cart" buttons
document.querySelectorAll(".product-card button").forEach(button => {
    button.addEventListener("click", event => {
        const productName = event.target.getAttribute("data-name");
        const productPrice = parseFloat(event.target.getAttribute("data-price"));
        addToCart(productName, productPrice);
    });
});
