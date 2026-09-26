let cart = [];


// Add item to cart
function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    alert(name + " added to your cart! 🍪");
}


// Update cart
function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;
    let itemCount = 0;

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

    } else {

        cart.forEach((item, index) => {

            total += item.price * item.quantity;
            itemCount += item.quantity;

            const cartItem = document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <strong>${item.name}</strong>
                    <small>₹${item.price} each</small>
                </div>

                <div class="quantity">

                    <button onclick="changeQuantity(${index}, -1)">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="changeQuantity(${index}, 1)">
                        +
                    </button>

                </div>

                <button
                    class="remove"
                    onclick="removeItem(${index})"
                >
                    Remove
                </button>
            `;

            cartItems.appendChild(cartItem);
        });
    }

    cartCount.textContent = itemCount;
    cartTotal.textContent = total;
}


// Change quantity
function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}


// Remove item
function removeItem(index) {

    cart.splice(index, 1);

    updateCart();
}


// Open cart
function openCart() {

    document.getElementById("cart-modal").style.display = "flex";

    updateCart();
}


// Close cart
function closeCart() {

    document.getElementById("cart-modal").style.display = "none";
}


// Checkout
function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty! 🍪");
        return;
    }

    let total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    alert(
        "Thank you for your order! 🍪\n\n" +
        "Your total is ₹" + total +
        "\n\nWe will contact you soon."
    );

    cart = [];

    updateCart();
    closeCart();
}


// Contact form
function contactForm(event) {

    event.preventDefault();

    const name =
        document.getElementById("customer-name").value;

    alert(
        "Thank you, " + name +
        "! ❤️\n\n" +
        "We received your message."
    );

    event.target.reset();
}
