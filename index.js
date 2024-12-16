const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let cors = require('cors');
app.use(cors());

// Endpoint 1: Add an Item to the Cart

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

function addToArr(cart, productId, name, price, quantity) {
  cart.push({ productId, name, price, quantity });
  return cart;
}

app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let cartItems = addToArr(cart, productId, name, price, quantity);
  res.json({ cartItems });
});

// Endpoint 2: Edit Quantity of an Item in the Cart

function updateQuantityById(cart, productId, quantity) {
  for ( let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
    }
  }
  return cart;
}

app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let cartItems = updateQuantityById(cart, productId, quantity);
  res.json({ cartItems });
});

// Endpoint 3: Delete an Item from the Cart

function deleteProductById(product, productId) {
  return product.productId !== productId;
}

app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let cartItems = cart.filter(product => deleteProductById(product, productId));
  res.json({ cartItems });
});


// Endpoint 4: Read Items in the Cart

app.get('/cart', (req, res) => {
  res.json({ cartItems: cart })
});


// Endpoint 5: Calculate Total Quantity of Items in the Cart

function calculateTotalQuantity(cart, quantity) {
  let totalQuantity = 0;
  for ( let i = 0; i < cart.length; i++) {
    totalQuantity += cart[i].quantity;
  } 
  return totalQuantity;
}

app.get('/cart/total-quantity', (req, res) => {
  let totalQuantity = calculateTotalQuantity(cart);
  res.json({ totalQuantity });
});


// Endpoint 6: Calculate Total Price of Items in the Cart

function calculateTotalPrice(cart) {
  let totalPrice = 0;
  for ( let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price * cart[i].quantity;
  }
  return totalPrice;
}

app.get('/cart/total-price', (req, res) => {
  let totalPrice = calculateTotalPrice(cart);
  res.json({ totalPrice });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
