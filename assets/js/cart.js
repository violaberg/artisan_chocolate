const cartItems = document.getElementById('cart-items');
const cartSummary = document.getElementById('cart-summary');
const cartTotalElem = document.getElementById('cart-total');
const emptyMsg = document.getElementById('empty-msg');
const checkoutBtn = document.getElementById('checkout-btn');

let cart = JSON.parse(localStorage.getItem('cart')) || {};

function renderCart() {
    cartItems.innerHTML = '';
    let total = 0;

    if (Object.keys(cart).length === 0) {
        emptyMsg.style.display = 'block';
        cartSummary.style.display = 'none';
        return;
    }

    emptyMsg.style.display = 'none';
    cartSummary.style.display = 'block';

    Object.keys(cart).forEach(id => {
        const item = cart[id];
        const subtotal = (item.price * item.quantity).toFixed(2);
        total += parseFloat(subtotal);

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p class="cart-item-price">€${item.price.toFixed(2)}</p>
            </div>

            <div class="cart-item-controls">
                <div class="quantity">
                    <button class="decrease" data-id="${id}">−</button>
                    <span>${item.quantity}</span>
                    <button class="increase" data-id="${id}">+</button>
                </div>
                <p class="cart-item-subtotal">€${subtotal}</p>
                <button class="remove-btn" data-id="${id}">×</button>
            </div>
        `;

        cartItems.appendChild(cartItem);
    });

    cartTotalElem.textContent = total.toFixed(2);
    addCartListeners();
}

function addCartListeners() {
    document.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            cart[id].quantity++;
            saveAndRender();
        });
    });

    document.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            if (cart[id].quantity > 1) {
                cart[id].quantity--;
            }
            saveAndRender();
        });
    });

    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            delete cart[id];
            saveAndRender();
        });
    });
}

function saveAndRender() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

renderCart();

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        localStorage.removeItem('cart');
        cart = {};
    });
}

