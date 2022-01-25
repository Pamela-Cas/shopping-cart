const fetchItem = async (item) => {
  const produtCar = `https://api.mercadolibre.com/items/${item}`;
  try {
    const response = await fetch(produtCar);
    const itemData = await response.json();
    return itemData;
  } catch (error) {
    return error.messege('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
// realizado com auxílio da mentoria (Cadu); 