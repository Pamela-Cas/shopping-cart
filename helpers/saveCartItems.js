const saveCartItems = (items) => localStorage.setItem('cartItems', items);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
// Realizado com auxílio mentoria Thalles