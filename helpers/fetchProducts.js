const fetchProducts = async (product) => {
const fetProdut = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
try {
  const response = await fetch(fetProdut);
  const data = await response.json();
  return data;
} catch (error) {
  return error.messege('You must provide an url');
}
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
// Realizado com auxílio Laecio e Mentoria Cadu;