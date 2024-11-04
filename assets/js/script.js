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
  salon3: ["هنوز ثبت نشده"],
  salon4: ["هنوز ثبت نشده"],
};

const termData = {
  salon1: {
    term1: { name: "ترم آبان", price: 300000 },
    term2: { name: "ترم آذر", price: 300000 },
    term3: { name: "ترم دی", price: 300000 },
    term4: { name: "ترم بهمن", price: 300000 },
  },
  salon2: {
    term1: { name: "ترم آبان", price: 450000 },
    term2: { name: "ترم آذر", price: 450000 },
    term3: { name: "ترم دی", price: 450000 },
    term4: { name: "ترم بهمن", price: 450000 },
  },
  salon3: {
    term1: { name: "ترم آبان", price: 350000 },
    term2: { name: "ترم آذر", price: 400000 },
    term3: { name: "ترم دی", price: 450000 },
    term4: { name: "ترم بهمن", price: 500000 },
  },
  salon4: {
    term1: { name: "ترم آبان", price: 450000 },
    term2: { name: "ترم آذر", price: 500000 },
    term3: { name: "ترم دی", price: 550000 },
    term4: { name: "ترم بهمن", price: 600000 },
  },
};

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
    image: "./assets/img/aranjj.jpg",
  },
  {
    id: "equipment-9",
    name: "زانوبند ساده",
    price: 150000,
    image: "./assets/img/zanooooo.jpg",
  },
];

function displayEquipment() {
  const equipmentList = document.getElementById("equipment-list");
  equipment.forEach((item) => {
    let formatedprice = item.price.toLocaleString("fa-IR");
    const equipmentDiv = document.createElement("div");
    equipmentDiv.className = "col-md-4";
    equipmentDiv.innerHTML = `
          <div class="equipment">
              <img src="${item.image}" alt="${item.name}" class="w-50">
              <h5>${item.name}</h5>
              <p dir="rtl">${formatedprice} تومان</p>
              <button class="btn btn-primary btn-add" onclick="addToCart('${item.id}', 'equipment')">اضافه به سبد خرید</button>
          </div>
      `;
    equipmentList.appendChild(equipmentDiv);
  });
}
displayEquipment();

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
      showTerms(player, salon);
      closeModal("players");
    };
    playerList.appendChild(li);
  });

  openModal("players");
}

// نمایش ترم‌ها برای بازیکن انتخاب‌شده
function showTerms(player, salon) {
  const termList = document.getElementById("term-list");
  termList.innerHTML = "";

  const selectedTerms = termData[salon]; // ترم‌های مربوط به سالن انتخاب شده

  for (const termKey in selectedTerms) {
    const term = selectedTerms[termKey];
    let formatedprice = term.price.toLocaleString("fa-IR");
    const li = document.createElement("li");
    li.innerText = `${term.name} - قیمت: ${formatedprice} تومان`;
    li.onclick = () => addToCart(termKey, "term", salon);
    termList.appendChild(li);
  }

  openModal("terms");
}

// افزودن ترم به سبد خرید
function addToCart(itemId, type = "term", salon = null) {
  let itemInfo;

  if (type === "equipment") {
    itemInfo = equipment.find((e) => e.id === itemId);
  } else if (salon) {
    itemInfo = termData[salon][itemId];
  }

  if (itemInfo) {
    cart.push(itemInfo);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartMessage(`${itemInfo.name} !به سبد خرید اضافه شد`);
  } else {
    displayCartMessage("آیتم پیدا نشد!");
  }
}

// نمایش سبد خرید
// نمایش سبد خرید
function displayCart() {
  const cartItemsList = document.getElementById("cart-items");
  cartItemsList.innerHTML = "";
  let totalPrice = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "cart-item";

    // فرمت‌دهی قیمت با ویرگول
    const formattedPrice = item.price.toLocaleString("fa-IR");

    li.innerHTML = `${item.name} - قیمت: ${formattedPrice} تومان`;

    const removeButton = document.createElement("span");
    removeButton.innerText = "✖";
    removeButton.className = "remove-button";
    removeButton.onclick = () => removeFromCart(index);

    li.appendChild(removeButton);
    cartItemsList.appendChild(li);

    // اضافه کردن قیمت به مجموع
    totalPrice += item.price;
  });

  // فرمت‌دهی مجموع قیمت
  const formattedTotalPrice = totalPrice.toLocaleString("fa-IR");

  const total = document.createElement("li");
  total.innerText = cart.length
    ? `مجموع: ${formattedTotalPrice} تومان`
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
  }, 2000);
}

function downloadInvoice() {
  const invoiceElement = document.getElementById("cart");
  html2canvas(invoiceElement).then((canvas) => {
    const image = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "factor.png"; // نام فایل فاکتور
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
