const elements = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function costElements() {
  const arrItems = elements.childNodes;
  const valueElements = [];
  arrItems.forEach((item) => {
    const priceElements = item.innerHTML.split('PRICE: $');
    valueElements.push(parseFloat(priceElements[1]));
  });
  return valueElements;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function cartPrice() {
  const totalToPay = document.querySelector('.total-price');
  totalToPay.innerHTML = costElements().reduce((acc, current) => acc + current, 0);
}
cartPrice();

function cartItemClickListener(event) {
  cartPrice();
  event.target.remove();
}

elements.addEventListener('click', cartItemClickListener);

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  elements.appendChild(li);
}

async function addOnCart(sku) {
  const allItens = await fetchItem(sku);
  const { title: name, price: salePrice, thumbnail: image } = allItens;
  createCartItemElement({ sku, image, name, salePrice });
  saveCartItems(elements.innerHTML);
  cartPrice();
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  const productSection = document.querySelector('.items');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const addButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(addButton);
  productSection.appendChild(section);
  addButton.addEventListener('click', () => {
    saveCartItems(elements.innerHTML);
    addOnCart(sku);
  });
}
const carregaApi = document.querySelector('.loading');
const allProducts = () => {
  fetchProducts('computador').then((response) => {
    response.results.forEach((products) => createProductItemElement(products));
    carregaApi.remove();
  });
};

const setSavedCart = () => {
  const memory = getSavedCartItems();
  elements.innerHTML = memory;
};
// ativa botão de limpar.
const emptyCart = document.querySelector('.empty-cart');
emptyCart.addEventListener('click', () => {
  const allItems = document.querySelector('.cart__items');
  allItems.innerHTML = '';
  cartPrice();
  saveCartItems(elements.innerHTML);
});

window.onload = async () => {
  allProducts();
  setSavedCart();
  cartPrice();
};
/* realizado com auxílio de monitoria, Cadu e 
parceiros de turma Aline Salema, Carol Só, Láecio e Lilian. */