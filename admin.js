// Получаем элементы DOM
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const adminPanel = document.getElementById("adminPanel");
const addProductForm = document.getElementById("addProductForm");
const addAdForm = document.getElementById("addAdForm");
const deleteProductForm = document.getElementById("deleteProductForm");
const deleteAdForm = document.getElementById("deleteAdForm");
const changeNavbarColorBtn = document.getElementById("changeNavbarColorBtn");
const navbarColorInput = document.getElementById("navbarColor");

// Пароль для входа в панель администратора
const adminPassword = "password"; // Замените на ваш пароль

// Логика входа
loginBtn.addEventListener("click", () => {
  if (passwordInput.value === adminPassword) {
    adminPanel.style.display = "block";
  } else {
    alert("Неверный пароль");
  }
});

// Массив товаров
let products = [];

// Добавление товара
addProductForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Получаем данные из формы
  const name = document.getElementById("name").value;
  const price = parseFloat(document.getElementById("price").value);
  const currency = document.getElementById("currency").value;
  const date = document.getElementById("date").value;
  const image = document.getElementById("image").files[0];
  const available = document.getElementById("available").checked;

  // Проверка, выбран ли файл изображения
  if (!image) {
    alert("Выберите файл изображения");
    return;
  }

  // Преобразуем файл изображения в URL
  const reader = new FileReader();
  reader.onload = (e) => {
    const imageUrl = e.target.result;

    // Создаем объект товара
    const newProduct = {
      name: name,
      price: price,
      currency: currency,
      date: date,
      image: imageUrl,
      available: available,
    };

    // Добавляем новый товар в массив
    products.push(newProduct);

    // Сохраняем данные товаров в локальное хранилище
    localStorage.setItem("products", JSON.stringify(products));

    // Очищаем форму
    addProductForm.reset();

    // Обновляем отображение товаров на главной странице
    displayProducts();
  };
  reader.readAsDataURL(image);
});

// Массив рекламы
let ads = [];

// Добавление рекламы
addAdForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Получаем данные из формы
  const adImage = document.getElementById("adImage").files[0];
  const adUrl = document.getElementById("adUrl").value;

  // Проверка, выбран ли файл изображения
  if (!adImage) {
    alert("Выберите файл изображения для рекламы");
    return;
  }

  // Преобразуем файл изображения в URL
  const reader = new FileReader();
  reader.onload = (e) => {
    const imageUrl = e.target.result;

    // Создаем объект рекламы
    const newAd = {
      image: imageUrl,
      url: adUrl,
    };

    // Добавляем новую рекламу в массив
    ads.push(newAd);

    // Сохраняем данные рекламы в локальное хранилище
    localStorage.setItem("ads", JSON.stringify(ads));

    // Очищаем форму
    addAdForm.reset();

    // Обновляем отображение рекламы на главной странице
    displayAds();
  };
  reader.readAsDataURL(adImage);
});

// Удаление товара
deleteProductForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Получаем название товара из формы
  const productName = document.getElementById("productName").value;

  // Удаляем товар из массива
  products = products.filter((product) => product.name !== productName);

  // Сохраняем данные товаров в локальное хранилище
  localStorage.setItem("products", JSON.stringify(products));

  // Очищаем форму
  deleteProductForm.reset();

  // Обновляем отображение товаров на главной странице
  displayProducts();
});

// Удаление рекламы
deleteAdForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Получаем URL рекламы из формы
  const adUrl = document.getElementById("adUrl").value;

  // Удаляем рекламу из массива
  ads = ads.filter((ad) => ad.url !== adUrl);

  // Сохраняем данные рекламы в локальное хранилище
  localStorage.setItem("ads", JSON.stringify(ads));

  // Очищаем форму
  deleteAdForm.reset();

  // Обновляем отображение рекламы на главной странице
  displayAds();
});

// Изменение цвета навигационной панели
changeNavbarColorBtn.addEventListener("click", () => {
  const newNavbarColor = navbarColorInput.value;
  updateCSS(`#navbar { background-color: ${newNavbarColor}; }`);
});

// Функция для обновления CSS файла
function updateCSS(style) {
  // Создаем элемент стиля
  const styleElement = document.createElement("style");
  styleElement.textContent = style;

  // Добавляем элемент стиля в DOM
  document.head.appendChild(styleElement);
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
