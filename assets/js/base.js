
const equipment = [
  { id: "equipment-1", name: "آرنج بند", price: 150000, image: "./assets/img/aranj.jpg" },
  { id: "equipment-2", name: "زانوبند", price: 150000, image: "./assets/img/zanoo.jpg" },
  { id: "equipment-3", name: "دستکش دروازه‌بانی", price: 100000, image: "./assets/img/dast.jpg" },
  { id: "equipment-3", name: "شلوار دروازه بانی", price: 120000, image: "./assets/img/shalvar.jpg" },
];

const cart = [];

function displayEquipment() {
  const equipmentList = document.getElementById("equipment-list");
  equipment.forEach(item => {
      const equipmentDiv = document.createElement("div");
      equipmentDiv.className = "col-md-4";
      equipmentDiv.innerHTML = `
          <div class="equipment">
              <img src="${item.image}" alt="${item.name}" class="w-50">
              <h5>${item.name}</h5>
              <p>تومان${item.price}</p>
              <button class="btn btn-primary btn-add" onclick="addToCart('${item.id}', 'equipment')">اضافه به سبد خرید</button>
          </div>
      `;
      equipmentList.appendChild(equipmentDiv);
  });
}

function addToCart(id, type) {
  const item = type === 'course' ? courses.find(c => c.id === id) : equipment.find(e => e.id === id);
  const cartItem = cart.find(i => i.id === id);
  
  if (cartItem) {
      cartItem.quantity += 1;
  } else {
      cart.push({ ...item, quantity: 1 });
  }
  
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  let totalPrice = 0;

  cart.forEach(item => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.textContent = `${item.name} - ${item.price} تومان x ${item.quantity}`;
      
      const removeButton = document.createElement("button");
      removeButton.textContent = "حذف";
      removeButton.className = "btn btn-danger btn-sm";
      removeButton.onclick = () => {
          cart.splice(cart.indexOf(item), 1);
          updateCart();
      };
      
      li.appendChild(removeButton);
      cartItems.appendChild(li);
      totalPrice += item.price * item.quantity;
  });

  document.getElementById("total-price").textContent = totalPrice;
}

// نمایش دوره‌ها و وسایل در صفحه
displayEquipment();


document.getElementById("checkout-button").addEventListener("click", function() {
  // نمایش پاپ‌آپ
  var paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
  paymentModal.show();
});
