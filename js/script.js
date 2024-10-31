let cart = JSON.parse(localStorage.getItem("cart")) || [];
const freeShippingThreshold = 500000;

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${productName} has been added to your cart.`);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartSection = document.getElementById("cart");
    if (!cartSection) return;

    cartSection.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        cartSection.innerHTML += `
            <p>${item.name} - MWK ${item.price}</p>
        </div>
        `;
        total += item.price;
    });
    cartSection.innerHTML += `<p>Total: MWK ${total}</p>`;
    if (total >= freeShippingThreshold) {
        cartSection.innerHTML += "<p>Congratulations! You qualify for free shipping.</p>";
    }
    cartSection.innerHTML += '<button class="checkout-btn" onclick="checkout()">Checkout</button>'
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
    } else {
        cart = [];
        localStorage.removeItem("cart");
        alert("Purchase has been successfully made!");
        updateCartDisplay();
    }
}

function sendMessage() {
    const messageBox = document.getElementById("messageBox");
    if (messageBox.value) {
        alert("Thank you for your message!");
        messageBox.value = "";
    } else {
        alert("Please type a message before submitting.");
    }
}

// Load cart display on each page load
document.addEventListener("DOMContentLoaded", updateCartDisplay);