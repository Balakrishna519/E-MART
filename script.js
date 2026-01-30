const offers = [
  "50% OFF on Electronics – Today Only!",
  "Buy 1 Get 1 Free on Fashion Wear",
  "Flat ₹1000 OFF on Mobiles",
  "30% Discount on Home Appliances",
  "Mega Sale on Shoes – Limited Stock",
  "Free Delivery on Orders Above ₹499"
];

let index = 0;
const offerText = document.getElementById("offer-text");

function showOffer() {
  offerText.textContent = offers[index];
  index = (index + 1) % offers.length;
}

showOffer();
setInterval(showOffer, 3000);


// Hamburger menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.style.display =
    navLinks.style.display === "flex" ? "none" : "flex";
});

// Live search filter
/*
const searchInput = document.getElementById("searchInput");
const products = document.querySelectorAll(".product");

searchInput.addEventListener("keyup", () => {
  const value = searchInput.value.toLowerCase();
  products.forEach(p => {
    p.style.display = p.textContent.toLowerCase().includes(value)
      ? "block"
      : "none";
  });
});

// Cart logic
let cartCount = 0;
const cartDisplay = document.getElementById("cart-count");

products.forEach(product => {
  product.addEventListener("click", () => {
    cartCount++;
    cartDisplay.textContent = cartCount;
  });
});
*/

const products = [
  { name: "Mobiles & Accessories", img: "https://picsum.photos/400?random=1" },
  { name: "Fashion & Clothing", img: "https://picsum.photos/400?random=2" },
  { name: "Footwear", img: "https://picsum.photos/400?random=3" },
  { name: "Home & Furniture", img: "https://picsum.photos/400?random=4" },
  { name: "Grocery & Essentials", img: "https://picsum.photos/400?random=5" },
  { name: "Beauty & Personal Care", img: "https://picsum.photos/400?random=6" },
  { name: "Kitchen & Dining", img: "https://picsum.photos/400?random=7" },
  { name: "Toys & Baby Products", img: "https://picsum.photos/400?random=8" },
  { name: "Sports & Fitness", img: "https://picsum.photos/400?random=9" },
  { name: "Books & Stationery", img: "https://picsum.photos/400?random=10" },
  { name: "Automobile Accessories", img: "https://picsum.photos/400?random=11" },
  { name: "Travel & Luggage", img: "https://picsum.photos/400?random=12" }
];



const track = document.getElementById("carouselTrack");

// create cards
products.forEach(p => {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <img src="${p.img}">
    <h4>${p.name}</h4>
  `;
  track.appendChild(card);
});

// duplicate for infinite feel
products.forEach(p => {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <img src="${p.img}">
    <h4>${p.name}</h4>
  `;
  track.appendChild(card);
});

let position = 0;

setInterval(() => {
  position += 220; // card width + gap
  track.style.transform = `translateX(-${position}px)`;

  // reset when half scrolled
  if (position >= track.scrollWidth / 2) {
    position = 0;
    track.style.transition = "none";
    track.style.transform = `translateX(0)`;
    setTimeout(() => {
      track.style.transition = "transform 0.6s ease";
    }, 50);
  }
}, 2000);




const categoryData = {
  "Mobiles & Accessories": [
    "iPhone", "Samsung Galaxy", "OnePlus", "Power Bank", "Chargers", "Earphones", "Mobile Covers", "Screen Guards", "Smart Bands"
  ],
  "Fashion & Clothing": [
    "T-Shirts", "Jeans", "Shirts", "Dresses", "Jackets", "Sarees", "Kurtas", "Shorts", "Hoodies"
  ],
  "Footwear": [
    "Running Shoes", "Sandals", "Slippers", "Formal Shoes", "Heels", "Boots", "Flip-Flops", "Loafers", "Sneakers"
  ],
  "Home & Furniture": [
    "Sofa", "Dining Table", "Beds", "Chairs", "Wardrobe", "Bookshelf", "TV Unit", "Mattress", "Curtains"
  ],
  "Grocery & Essentials": [
    "Rice", "Cooking Oil", "Snacks", "Beverages", "Fruits", "Vegetables", "Spices", "Biscuits", "Dry Fruits"
  ],
  "Beauty & Personal Care": [
    "Face Cream", "Perfumes", "Shampoo", "Conditioner", "Lipstick", "Face Wash", "Trimmer", "Hair Oil", "Deodorant"
  ],
  "Kitchen & Dining": [
    "Cookware", "Plates", "Glasses", "Knives", "Storage Boxes", "Pressure Cooker", "Mixer Grinder", "Lunch Box", "Flasks"
  ],
  "Toys & Baby Products": [
    "Soft Toys", "Remote Cars", "Building Blocks", "Dolls", "Baby Diapers", "Baby Soap", "Story Books", "Puzzles", "Crayons"
  ],
  "Sports & Fitness": [
    "Dumbbells", "Yoga Mat", "Treadmill", "Cricket Bat", "Football", "Badminton", "Skipping Rope", "Gym Gloves", "Protein Shaker"
  ]
};

const container = document.getElementById("category-sections");

Object.keys(categoryData).forEach(category => {
  const section = document.createElement("div");
  section.className = "category-section";

  section.innerHTML = `
    <div class="category-title">${category}</div>
    <div class="product-grid">
      ${categoryData[category].map(item => {
        const price = Math.floor(Math.random() * 900 + 100);
        return `
          <div class="product-item">
            <img src="https://picsum.photos/300?random=${Math.random()}">
            <h4>${item}</h4>
            <div class="price">₹${price}</div>
            <button class="buy-btn" onclick="addToCart('${item}', ${price})">
              Add to Cart
            </button>
          </div>
        `;
      }).join("")}
    </div>
  `;

  container.appendChild(section);
});



// 1. Build search database first
let searchDatabase = [];

Object.keys(categoryData).forEach(category => {
  categoryData[category].forEach(item => {
    searchDatabase.push({
      name: item,
      category: category
    });
  });
});

// 2. Then attach search logic
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase().trim();
  searchResults.innerHTML = "";

  if (value === "") {
    searchResults.style.display = "none";
    return;
  }

  const matches = searchDatabase.filter(item =>
    item.name.toLowerCase().includes(value) ||
    item.category.toLowerCase().includes(value)
  );

  if (matches.length === 0) {
    searchResults.innerHTML = `<div class="search-item">No results found</div>`;
  } else {
    matches.forEach(item => {
      const div = document.createElement("div");
      div.className = "search-item";
      div.innerHTML = `
        <strong>${item.name}</strong>
        <div class="search-category">${item.category}</div>
      `;

      div.onclick = () => {
        // Scroll to that product
        const productElements = document.querySelectorAll(".product-item h4");
        productElements.forEach(el => {
          if (el.textContent === item.name) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            el.parentElement.style.boxShadow = "0 0 0 3px #ff9900";
            setTimeout(() => {
              el.parentElement.style.boxShadow = "";
            }, 1500);
          }
        });

        searchResults.style.display = "none";
        searchInput.value = "";
      };

      searchResults.appendChild(div);
    });
  }

  searchResults.style.display = "block";
});


let cart = [];

const toggleCart = document.getElementById("toggleCart");
const cartPanel = document.getElementById("cartPanel");
const cartItemsDiv = document.getElementById("cartItems");
const cartCount = document.getElementById("cart-count");
const closeCart = document.getElementById("closeCart");

toggleCart.addEventListener("click", (e) => {
  e.preventDefault();
  cartPanel.classList.toggle("open");
  renderCart();
});

closeCart.addEventListener("click", () => {
  cartPanel.classList.remove("open");
});

function addToCart(name, price) {
  cart.push({ name, price });
  cartCount.textContent = cart.length;
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  cartCount.textContent = cart.length;
  renderCart();
}

function renderCart() {
  cartItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Cart is empty</p>";
    return;
  }

  cart.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name} - ₹${item.price}</span>
      <button onclick="removeFromCart(${i})">X</button>
    `;
    cartItemsDiv.appendChild(div);
  });
}




const loginBtn = document.getElementById("loginBtn");
const modal = document.getElementById("loginModal");
const doLogin = document.getElementById("doLogin");
const usernameInput = document.getElementById("username");
const welcome = document.getElementById("welcome");

// open popup
loginBtn.onclick = (e) => {
  e.preventDefault();
  modal.style.display = "flex";
};

// login
doLogin.onclick = () => {
  const user = usernameInput.value.trim();
  if(user === ""){
    alert("Enter your name");
    return;
  }

  doLogin.innerText = "Logging in...";

  setTimeout(() => {
    localStorage.setItem("user", user);

    // close popup first
    modal.style.display = "none";
    modal.remove();

    // wait before showing welcome (realistic feel)
    setTimeout(() => {
      loginBtn.style.display = "none";
      welcome.style.display = "block";
      welcome.innerHTML = "Hello " + user + " 👋";
    }, 700);   // 0.7 second delay

  }, 500);
};

// auto login after refresh
const savedUser = localStorage.getItem("user");
if(savedUser){
  modal.remove();
  loginBtn.style.display = "none";
  welcome.style.display = "block";
  welcome.innerHTML = "Hello " + savedUser + " 👋";
}
