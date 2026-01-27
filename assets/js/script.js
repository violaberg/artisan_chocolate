const addToCartButtons = document.querySelectorAll('.secondary-btn');
const cartCount = document.getElementById('cart-count');

// Load cart from localStorage or initialize
let loadCart = JSON.parse(localStorage.getItem('cart')) || {};
let count = Object.values(loadCart).reduce((acc, item) => acc + item.quantity, 0);
cartCount.textContent = count;

// Add click listener to all 'Add to Cart' buttons for products
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const id = button.dataset.productId;
        const name = button.dataset.productName;
        const price = parseFloat(button.dataset.productPrice);

        if(loadCart[id]) {
            loadCart[id].quantity += 1;
        } else {
            loadCart[id] = { name, price, quantity: 1 };
        }

        // Update total count
        count = Object.values(loadCart).reduce((acc, item) => acc + item.quantity, 0);
        cartCount.textContent = count;

        localStorage.setItem('cart', JSON.stringify(loadCart));

        // Feedback on button for user to show item was added to cart
        button.textContent = "Added!";
        setTimeout(() => { button.textContent = "Add to Cart"; }, 1000);
    });
});
