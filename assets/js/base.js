const courses = [
  { id: "course-1", name: "دوره دروازه‌بانی مبتدی", price: 100000, image: "https://via.placeholder.com/150" },
  { id: "course-2", name: "دوره دروازه‌بانی پیشرفته", price: 200000, image: "https://via.placeholder.com/150" },
  { id: "course-3", name: "دوره تکنیک‌های دروازه‌بانی", price: 300000, image: "https://via.placeholder.com/150" },
];

const equipment = [
  { id: "equipment-1", name: "کفش دروازه‌بانی", price: 150000, image: "https://via.placeholder.com/150" },
  { id: "equipment-2", name: "زانوبند", price: 50000, image: "https://via.placeholder.com/150" },
  { id: "equipment-3", name: "دستکش دروازه‌بانی", price: 120000, image: "https://via.placeholder.com/150" },
];

const cart = [];

function displayCourses() {
  const courseList = document.getElementById("course-list");
  courses.forEach(course => {
      const courseDiv = document.createElement("div");
      courseDiv.className = "col-md-4";
      courseDiv.innerHTML = `
          <div class="course">
              <img src="${course.image}" alt="${course.name}">
              <h5>${course.name}</h5>
              <p>${course.price} تومان</p>
              <button class="btn btn-primary btn-add" onclick="addToCart('${course.id}', 'course')">اضافه به سبد خرید</button>
          </div>
      `;
      courseList.appendChild(courseDiv);
  });
}

function displayEquipment() {
  const equipmentList = document.getElementById("equipment-list");
  equipment.forEach(item => {
      const equipmentDiv = document.createElement("div");
      equipmentDiv.className = "col-md-4";
      equipmentDiv.innerHTML = `
          <div class="equipment">
              <img src="${item.image}" alt="${item.name}">
              <h5>${item.name}</h5>
              <p>${item.price} تومان</p>
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
displayCourses();
displayEquipment();


document.getElementById("checkout-button").addEventListener("click", function() {
  // نمایش پاپ‌آپ
  var paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
  paymentModal.show();
});
