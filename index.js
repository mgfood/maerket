// Получаем элементы DOM
const productsContainer = document.getElementById("products");
const adsContainer = document.getElementById("ads");

// Отображение товаров
function displayProducts() {
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    // Добавляем фото товара
    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    productElement.appendChild(image);

    // Добавляем название товара
    const name = document.createElement("h3");
    name.textContent = product.name;
    productElement.appendChild(name);

    // Добавляем цену товара
    const price = document.createElement("p");
    price.textContent = `${product.price} ${product.currency}`;
    price.classList.add("price");
    productElement.appendChild(price);

    // Добавляем статус наличия
    const availability = document.createElement("p");
    if (product.available) {
      availability.textContent = "В наличии";
      availability.classList.add("available");
    } else {
      availability.textContent = "Нет в наличии";
      availability.classList.add("unavailable");
    }
    productElement.appendChild(availability);

    productsContainer.appendChild(productElement);
  });
}

// Отображение рекламы
function displayAds() {
  adsContainer.innerHTML = "";

  ads.forEach((ad) => {
    const adElement = document.createElement("div");
    adElement.classList.add("ad");

    // Добавляем фото рекламы
    const image = document.createElement("img");
    image.src = ad.image;
    image.alt = "Реклама";
    image.addEventListener("click", () => {
      window.open(ad.url, "_blank");
    });
    adElement.appendChild(image);

    adsContainer.appendChild(adElement);
  });
}

// Загрузка товаров и рекламы из локального хранилища
window.addEventListener("load", () => {
  const storedProducts = localStorage.getItem("products");
  if (storedProducts) {
    products = JSON.parse(storedProducts);
  }

  const storedAds = localStorage.getItem("ads");
  if (storedAds) {
    ads = JSON.parse(storedAds);
  }

  // Отображение товаров и рекламы
  displayProducts();
  displayAds();
});
