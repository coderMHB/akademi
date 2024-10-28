const playersData = {
  salon1: [
    "حسین عطاب",
    "محمدحسین پورجواد",
    "محمدامین احمدی",
    "محمدطاها طاهری",
    "علی لطفی",
    "علی اکبری",
    "علی محمدی",
    "علی خدابخشی",
    "محمدمهدی دشمه",
    "محمدامین تقی زاده",
    "محمدحسن قاسمی",
    "امیراردلان نمازی",
    "محمدامین حبیان",
    "محمدرضا قربانی",
    "علی اصغر بهشتی",
    "امیرمحمد بیگدلی",
    "احسن بیگدلی",
    "عارف کدخدا",
    "بنیامین زارعی",
    "علی حاجی بابایی",
    "محمدامین آسیابانان",
  ],
  salon2: [
    "محمد حسین کریمی",
    "احمدرضا خدری",
    "امیرحسین رسول زاده",
    "محمد گودرزی",
    "محمدحسن اشرفی",
    "محمد هادی قربانی",
    "محمد باقری",
    "(آبی)حسین شم آبادی",
    "حسین شم آبادی(سفید)",
    "طاها شمس نژاد",
    "امیرطاها خیراللهی",
    "ابوالفضل باباجانیان",
    "احمدرضا نحوی نیا",
    "محمد شکوهی",
    "محمد حسین عوادی",
    "علی اکبر امیدی",
    "ابوالفضل عظیمی",
    "علیرضا مظفری",
    "محمدکاظم قلی زاده",
    "محمدمحسن بیگی",
    "صالح میرصالحی",
    "محمدحسین دهقان",
    "علیرضا رحیمی",
  ],
  salon3: ["سارا", "مینا", "فاطمه"],
  salon4: ["علیرضا", "محمد", "یوسف"],
};

const termData = {
  term1: { name: "ترم آبان", price: 450 },
  term2: { name: "ترم آذر", price: 450 },
  term3: { name: "ترم دی", price: 450 },
  term4: { name: "ترم بهمن", price: 450 },
};

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// نمایش بازیکنان هر سالن
function showPlayers(salon) {
  const playerTitle = document.getElementById("player-title");
  playerTitle.innerText = `اسامی بازیکنان این شعبه `;

  const playerList = document.getElementById("player-list");
  playerList.innerHTML = "";

  playersData[salon].forEach((player) => {
    const li = document.createElement("li");
    li.innerText = player;
    li.onclick = () => {
      showTerms(player);
      closeModal("players");
    };
    playerList.appendChild(li);
  });

  openModal("players");
}

// نمایش ترم‌ها برای بازیکن انتخاب‌شده
function showTerms(player) {
  const termList = document.getElementById("term-list");
  termList.innerHTML = "";

  for (const termKey in termData) {
    const term = termData[termKey];

    const li = document.createElement("li");
    li.innerText = `${term.name} - قیمت: ${term.price},000 تومان`;
    li.onclick = () => addToCart(termKey);
    termList.appendChild(li);
  }

  openModal("terms");
}

// افزودن ترم به سبد خرید
function addToCart(term) {
  const termInfo = termData[term];
  cart.push(termInfo);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartMessage(`${termInfo.name} به سبد خرید اضافه شد!`);
}

// نمایش سبد خرید
function displayCart() {
  const cartItemsList = document.getElementById("cart-items");
  cartItemsList.innerHTML = "";
  let totalPrice = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `${item.name} - قیمت: ${item.price},000 تومان`;

    const removeButton = document.createElement("span");
    removeButton.innerText = "✖";
    removeButton.className = "remove-button";
    removeButton.onclick = () => removeFromCart(index);

    li.appendChild(removeButton);
    cartItemsList.appendChild(li);

    totalPrice += item.price;
  });

  const total = document.createElement("li");
  total.innerText = cart.length
    ? `مجموع: ${totalPrice},000 تومان`
    : "سبد خرید خالی است";
  total.style.fontWeight = "bold";
  cartItemsList.appendChild(total);
}

// حذف آیتم از سبد خرید
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  displayCartMessage("آیتم از سبد خرید حذف شد!");
}

// باز و بستن مدال‌ها
document.getElementById("open-cart").onclick = () => {
  displayCart();
  openModal("cart");
};

function openModal(modalId) {
  document.getElementById(modalId).style.display = "flex";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// نمایش پیام
function displayCartMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.innerText = message;
  messageDiv.className = "cart-message";
  document.body.appendChild(messageDiv);
  setTimeout(() => {
    messageDiv.style.opacity = "0";
    setTimeout(() => messageDiv.remove(), 500);
  }, 3000);
}

function downloadInvoice() {
  const invoiceElement = document.getElementById("cart");
  html2canvas(invoiceElement).then((canvas) => {
    const image = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "invoice.png"; // نام فایل فاکتور
    link.click();
  });
}

document
  .getElementById("download-invoice")
  .addEventListener("click", function () {
    // نمایش پاپ‌آپ
    var paymentModal = new bootstrap.Modal(
      document.getElementById("paymentModal")
    );
    paymentModal.show();
  });

const equipment = [
  {
    id: "equipment-1",
    name: "لباس تیم",
    price: 350000,
    image: "./assets/img/lebas.jpg",
  },
  {
    id: "equipment-2",
    name: "کوله ورزشی",
    price: 490000,
    image: "./assets/img/koole.jpg",
  },
  {
    id: "equipment-3",
    name: "آرنج بند asics",
    price: 350000,
    image: "./assets/img/aranj.jpg",
  },
  {
    id: "equipment-4",
    name: "زانوبند asics",
    price: 4500000,
    image: "./assets/img/zanoo.jpg",
  },
  {
    id: "equipment-5",
    name: "مچ بند asics",
    price: 200000,
    image: "./assets/img/dast.jpg",
  },
  {
    id: "equipment-6",
    name: "شلوار دروازه بانی",
    price: 650000,
    image: "./assets/img/shalvar.jpg",
  },
  {
    id: "equipment-7",
    name: "دست کش دروازه بانی",
    price: 700000,
    image: "./assets/img/kesh.jpg",
  },
  {
    id: "equipment-8",
    name: "آرنج بند ساده",
    price: 120000,
    image: "./assets/img/zanoooo.jpg",
  },
  {
    id: "equipment-9",
    name: "زانوبند ساده",
    price: 150000,
    image: "./assets/img/aranjj.jpg",
  },
];

function displayEquipment() {
  const equipmentList = document.getElementById("equipment-list");

  equipment.forEach((item) => {
    const equipmentDiv = document.createElement("div");
    equipmentDiv.className = "col-12 col-md-4 mb-4";
    equipmentDiv.innerHTML = `
        <div class="equipment col-12 col-md-4">
          <img src="${item.image}" alt="${item.name}" class="w-50">
          <h5 style="font-family: 'moraba';">${item.name}</h5>
          <p dir="rtl">${item.price}تومان</p>
          <button class="btn btn-primary btn-add" style="vertical-align: middle;" onclick="addToCart('${item.id}')"> اضافه به سبد خرید </button>
      </div>
      `;
    equipmentList.appendChild(equipmentDiv);
  });
}

displayEquipment();
