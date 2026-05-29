let htlBTN = document.getElementById("htl");
let lthBTN = document.getElementById("lth");
const modal = document.getElementById("modal");
const openbtn = document.getElementById("openbtn");
const closebtn = document.getElementById("closebtn");
let listProductHTML = document.getElementById("listProducts");
let currentPage = 1;
let itemsPerPage = 24;

// localStorage access

let currentMail = localStorage.getItem("currentEmail");
if (
  !currentMail ||
  !localStorage.getItem(currentMail + "biometricVerification")
) {
  window.location.href = "login.html";
}

// localStorageaccess

let listProducts = [];
let allProducts = [];
let carts = [];
let listCartHTML = document.getElementById("listCart");
let iconCartSpan = document.getElementById("countOut");

// fetching products

const initApp = () => {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      allProducts = data;
      listProducts = data;
      lthBTN.addEventListener("click", () => {
        htlBTN.classList.remove("activeSort");
        lthBTN.classList.toggle("activeSort");
        applyFiltersAndRender();
      });

      htlBTN.addEventListener("click", () => {
        lthBTN.classList.remove("activeSort");
        htlBTN.classList.toggle("activeSort");
        applyFiltersAndRender();
      });
      addDataToHTML();
      if (localStorage.getItem(currentMail + "_cart")) {
        carts = JSON.parse(localStorage.getItem(currentMail + "_cart"));
        addCarttoHTML();
      }
    });
};
initApp();

// modal

function openM() {
  modal.classList.add("show");
}
function closeM() {
  modal.classList.remove("show");
}
openbtn.addEventListener("click", openM);
closebtn.addEventListener("click", closeM);

modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    closeM();
  }
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeM();
  }
});

// show products

const addDataToHTML = () => {
  listProductHTML.innerHTML = "";

  const totalPages = Math.ceil(listProducts.length / itemsPerPage);

  // ✅ Fix: prevent invalid page numbers
  if (currentPage > totalPages) {
    currentPage = totalPages || 1;
  }

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const paginatedItems = listProducts.slice(start, end);

  if (paginatedItems.length === 0) {
    listProductHTML.innerHTML = "<p>No products found</p>";
  } else {
    paginatedItems.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("item");
      newProduct.dataset.id = product.idProduct;

      newProduct.innerHTML = `
        <div
          class="w-36 h-36 bg-[#f5f5f5] bg-no-repeat bg-center bg-cover rounded-lg flex items-end"
          style="background-image: url('${product.imageProduct}')"
        >
          <p class="w-full h-8 p-1 bg-gray-600 hover:bg-gray-800 cursor-pointer text-white text-sm text-center bottom-0 rounded-b-lg addCart">
            Add to Cart
          </p>
        </div>
        <div class="flex justify-between px-2 py-1">
          <p class="text-xs">${product.nameProduct}</p>
          <p class="text-gray-800 text-xs">$${product.priceProduct}</p>
        </div>
      `;

      listProductHTML.appendChild(newProduct);
    });
  }

  showPagination();
};

// search

let searchValue = "";
let searchInput = document.getElementById("searchData");

searchInput.addEventListener("input", (e) => {
  searchValue = e.target.value.toLowerCase().trim();
  currentPage = 1;
  applyFiltersAndRender();
});

const applyFiltersAndRender = () => {
  // Step 1: Search filter
  let tempProducts = [...allProducts];
  currentPage = 1;

  if (searchValue !== "") {
    tempProducts = tempProducts.filter((product) => {
      return (
        product.nameProduct.toLowerCase().includes(searchValue) ||
        product.priceProduct.toString().includes(searchValue)
      );
    });
  }

  // Step 2: Sorting
  if (lthBTN.classList.contains("activeSort")) {
    tempProducts.sort((a, b) => a.priceProduct - b.priceProduct);
  }

  if (htlBTN.classList.contains("activeSort")) {
    tempProducts.sort((a, b) => b.priceProduct - a.priceProduct);
  }

  // Step 3: Assign final list
  listProducts = tempProducts;

  // Step 4: Render
  addDataToHTML();
};
// add to cart

listProductHTML.addEventListener("click", (event) => {
  if (event.target.classList.contains("addCart")) {
    let pro_id = event.target.closest(".item").dataset.id;
    console.log("Clicked ID:", pro_id);
    addToCart(pro_id);
  }
});

const addToCart = (pro_id) => {
  let positionThisProductInCart = carts.findIndex(
    (value) => value.pro_id == pro_id,
  );
  if (carts.length === 0) {
    carts = [
      {
        pro_id: pro_id,
        quantity: 1,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    carts.push({
      pro_id: pro_id,
      quantity: 1,
    });
  } else {
    carts[positionThisProductInCart].quantity =
      carts[positionThisProductInCart].quantity + 1;
  }
  addCarttoHTML();
  addCartToMemory();
};

// adding to memory

const addCartToMemory = () => {
  localStorage.setItem(currentMail + "_cart", JSON.stringify(carts));
};

// cart in modal

const addCarttoHTML = () => {
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;
  if (carts.length > 0) {
    carts.forEach((cart) => {
      totalQuantity = totalQuantity + cart.quantity;
      let newCart = document.createElement("div");
      newCart.classList.add(
        "item",
        "grid",
        "grid-cols-[70px_150px_50px_1fr]",
        "gap-2.5",
        "h-24",
        "items-center",
        "text-center",
        "bg-gray-400",
        "px-6",
      );

      newCart.dataset.id = cart.pro_id;
      // let positionProduct = listProducts.findIndex(
      //   (value) => value.idProduct == cart.pro_id,
      // );
      // let info = listProducts[positionProduct];
      let info = allProducts.find((value) => value.idProduct == cart.pro_id);
      if (!info) return;
      newCart.innerHTML = `
              <div><img src="${info.imageProduct}" alt="" /></div>
              <div class="name">${info.nameProduct}</div>
              <div class="totalPrice">$${info.priceProduct * cart.quantity}</div>
              <div class="flex gap-2 items-center justify-center">
                <span class="flex p-2 rounded-full cursor-pointer bg-white text-black minus">-</span
                ><span class="flex p-3 rounded-full cursor-pointer bg-white text-black">${cart.quantity}</span
                ><span class="flex p-2 rounded-full cursor-pointer bg-white text-black plus"
                  >+</span
                ><span class="ml-6 cursor-pointer"><button class="remove cursor-pointer z-10">x</button></span>
              </div>
            </div>`;
      listCartHTML.appendChild(newCart);
    });
    let totalAmount = getTotalAmount();
    document.getElementById("totalAmount").innerText = "$" + totalAmount;
  }
  iconCartSpan.innerText = totalQuantity;
};

const getTotalAmount = () => {
  let total = 0;

  carts.forEach((cart) => {
    let product = allProducts.find((value) => value.idProduct == cart.pro_id);
    if (product) {
      total += product.priceProduct * cart.quantity;
    }
  });
  return total;
};

listCartHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  let pro_id = positionClick.closest(".item")?.dataset.id;

  if (!pro_id) return;

  if (positionClick.classList.contains("minus")) {
    changeQuantity(pro_id, "minus");
  }

  if (positionClick.classList.contains("plus")) {
    changeQuantity(pro_id, "plus");
  }

  if (positionClick.classList.contains("remove")) {
    removeProduct(pro_id);
  }
});

const changeQuantity = (pro_id, type) => {
  let positionItemInCart = carts.findIndex((value) => value.pro_id == pro_id);
  if (positionItemInCart >= 0) {
    switch (type) {
      case "plus":
        carts[positionItemInCart].quantity =
          carts[positionItemInCart].quantity + 1;
        break;

      default:
        let valueChange = carts[positionItemInCart].quantity - 1;
        if (valueChange > 0) {
          carts[positionItemInCart].quantity = valueChange;
        } else {
          carts.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToMemory();
  addCarttoHTML();
};

function removeProduct(pro_id) {
  let positionItemInCart = carts.findIndex((value) => value.pro_id == pro_id);

  if (positionItemInCart >= 0) {
    carts.splice(positionItemInCart, 1);
  }

  addCartToMemory();
  addCarttoHTML();
}

function cont() {
  if (!carts || carts.length === 0) {
    alert("Do some shopping first!");
    return;
  }

  const totalAmount = getTotalAmount();

  const cartEntry = {
    items: JSON.parse(JSON.stringify(carts)),
    total: totalAmount,
    date: new Date().toLocaleString(),
  };

  localStorage.setItem(currentMail + "_carts", JSON.stringify(cartEntry));

  console.log("Saved carts:", localStorage.getItem(currentMail + "_carts"));

  console.log(JSON.stringify(cartEntry));

  carts = [];
  localStorage.setItem(currentMail + "_cart", JSON.stringify(carts));
  addCarttoHTML();

  document.getElementById("totalAmount").innerText = "$" + 0;

  window.location.href = "checkout.html";
}

// pagination render

const showPagination = () => {
  const totalPages = Math.ceil(listProducts.length / itemsPerPage);
  const container = document.getElementById("pagination");

  container.innerHTML = "";

  if (totalPages <= 1) return; // hide if only 1 page

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.classList.add("px-3", "py-1", "cursor-pointer", "border");

    if (i === currentPage) {
      btn.classList.add("bg-gray-600", "text-white");
    }

    btn.addEventListener("click", () => {
      currentPage = i;
      addDataToHTML();
    });

    container.appendChild(btn);
  }
};

document.querySelector(".prev").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    addDataToHTML();
  }
});

document.querySelector(".nxt").addEventListener("click", () => {
  const totalPages = Math.ceil(listProducts.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    addDataToHTML();
  }
});

function logout() {
  if (confirm("Do you want to logout?")) {
    localStorage.removeItem("currentEmail");
  } else {
    return;
  }
  localStorage.removeItem(currentMail + "biometricVerification");
  location.reload();
}

let myMoney = localStorage.getItem(currentMail + "_money");
console.log(myMoney);

function getRandomCard(min, max) {
  const genMoney = Math.floor(Math.random() * (max - min) + min);
  return genMoney;
}

if (myMoney == null || myMoney == "") {
  const money = getRandomCard(1111, 9999);
  console.log(money);
  localStorage.setItem(currentMail + "_money", money);
}
