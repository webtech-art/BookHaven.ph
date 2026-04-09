const BOOKS = [
	{
		id: 1,
		title: "The Maid",
		author: "Nita Prose",
		category: "Fiction",
		price: 350,
		origPrice: 430,
		discount: 19,
		rating: 4.5,
		reviews: 241,
		stock: 241,
		bestseller: true,
		sale: true,
		cover: "tm.jpg",
		desc: "A charming, witty novel about Molly the maid who stumbles into a murder mystery at the Regency Grand Hotel. A delightful whodunit full of heart.",
	},
	{
		id: 2,
		title: "The Other Slavery",
		author: "Andrés Reséndez",
		category: "Non-Fiction",
		price: 459,
		origPrice: null,
		discount: null,
		rating: 4.8,
		reviews: 139,
		stock: 139,
		bestseller: false,
		sale: false,
		cover: "tos.jpg",
		desc: "A groundbreaking history of Indian enslavement in the Americas, from the Spanish conquest through the 19th century. Essential reading for understanding colonial history.",
	},
	{
		id: 3,
		title: "The Gruffalo",
		author: "Julia Donaldson",
		category: "Children",
		price: 250,
		origPrice: 320,
		discount: 22,
		rating: 4.6,
		reviews: 196,
		stock: 196,
		bestseller: true,
		sale: true,
		cover: "tg.jpg",
		desc: "A mouse takes a walk through the deep dark wood and meets some frightening creatures — but he's got a trick up his sleeve. A beloved children's classic.",
	},
	{
		id: 4,
		title: "The 48 Laws of Power",
		author: "Robert Greene",
		category: "Self-Help",
		price: 399,
		origPrice: null,
		discount: null,
		rating: 4.7,
		reviews: 128,
		stock: 128,
		bestseller: true,
		sale: false,
		cover: "48.jpg",
		desc: "Amoral, cunning, ruthless, and instructive, this boldly captivating guide distills three thousand years of the history of power into 48 essential laws.",
	},
	{
		id: 5,
		title: "Oxford Grammar for EAP",
		author: "Ken Paterson",
		category: "Academic",
		price: 599,
		origPrice: null,
		discount: null,
		rating: 4.5,
		reviews: 100,
		stock: 100,
		bestseller: false,
		sale: false,
		cover: "ogfe.jpg",
		desc: "A comprehensive grammar guide specifically designed for academic English purposes. Ideal for university students and researchers writing in English.",
	},
	{
		id: 6,
		title: "Ding Dong Merrily",
		author: "Old Joe and Friends",
		category: "Academic",
		price: 499,
		origPrice: null,
		discount: null,
		rating: 4.4,
		reviews: 89,
		stock: 89,
		bestseller: false,
		sale: false,
		cover: "ddm.webp",
		desc: "A joyful collection of classic Christmas carols brought to life with vibrant illustrations and singalong music, perfect for young readers and families.",
	},
	{
		id: 7,
		title: "The Let Them Theory",
		author: "Mel Robbins",
		category: "Self-Help",
		price: 699,
		origPrice: null,
		discount: null,
		rating: 4.8,
		reviews: 256,
		stock: 256,
		bestseller: true,
		sale: false,
		cover: "tltt.avif",
		desc: "The #1 New York Times bestseller of 2025. A life-changing guide to stop wasting energy on what you can't control and start focusing on what truly matters — yourself.",
	},
	{
		id: 8,
		title: "The New Famous Five",
		author: "Chris Smith",
		category: "Children",
		price: 349,
		origPrice: null,
		discount: null,
		rating: 4.9,
		reviews: 234,
		stock: 234,
		bestseller: true,
		sale: false,
		cover: "tnff.jpg",
		desc: "A rip-roaring adventure for readers aged 7+, inspired by Enid Blyton. A new group of kids joins the original Famous Five to solve thrilling mysteries.",
	},
	{
		id: 9,
		title: "Wages for Housework",
		author: "Emily Callaci",
		category: "Non-Fiction",
		price: 549,
		origPrice: null,
		discount: null,
		rating: 4.7,
		reviews: 678,
		stock: 678,
		bestseller: false,
		sale: false,
		cover: "wfhw.webp",
		desc: "The revelatory history of the radical feminist movement that demanded wages for unpaid domestic work — a thought-provoking story of activism, power, and care.",
	},
	{
		id: 10,
		title: "A Marriage at Sea",
		author: "Sophie Elmhirst",
		category: "Fiction",
		price: 599,
		origPrice: null,
		discount: null,
		rating: 4.6,
		reviews: 934,
		stock: 934,
		bestseller: true,
		sale: false,
		cover: "amas.webp",
		desc: "A NYT bestseller and one of Obama's favorite books of 2025. The true story of a couple who survived 118 days adrift at sea — a breathtaking tale of love and survival.",
	},
];

let users = [
	{
		id: 1,
		name: "Admin User",
		email: "admin@bookhaven.ph",
		password: "admin123",
		role: "admin",
		joined: "2024-01-01",
	},
	{
		id: 2,
		name: "Demo Reader",
		email: "demo@bookhaven.ph",
		password: "demo123",
		role: "customer",
		joined: "2024-06-15",
	},
];

let orders = [
	{
		id: "BH-001",
		userId: 1,
		items: [{ title: "The Maid", qty: 1, price: 350 }],
		total: 350,
		status: "delivered",
		date: "2025-03-15",
		payment: "GCash",
		address: "Cebu City",
	},
	{
		id: "BH-002",
		userId: 1,
		items: [{ title: "Atomic Habits", qty: 2, price: 420 }],
		total: 840,
		status: "shipped",
		date: "2025-04-01",
		payment: "COD",
		address: "Cebu City",
	},
];

let basket = [];
let currentUser = null;
let currentBookFilter = "All";
let selectedStars = 0;
let currentDetailBook = null;

function showPage(page) {
	if (page === "admin") {
		if (!currentUser || currentUser.role !== "admin") {
			showToast("Access denied. Admin only.", "error");
			return;
		}
	}

	if ((page === "orders" || page === "basket") && !currentUser) {
		openModal("login-modal");
		showToast("Please log in first.", "error");
		return;
	}

	document
		.querySelectorAll(".page")
		.forEach((p) => p.classList.remove("active"));
	const target = document.getElementById(page + "-page");
	if (!target) return;
	target.classList.add("active");

	if (page === "home") renderBooks();
	if (page === "basket") renderBasket();
	if (page === "orders") renderOrders();
	if (page === "admin") renderAdmin();

	window.scrollTo({ top: 0, behavior: "smooth" });
}

function openModal(id) {
	document.getElementById(id).classList.remove("hidden");
}
function closeModal(id) {
	document.getElementById(id).classList.add("hidden");
}
function switchModal(from, to) {
	closeModal(from);
	openModal(to);
}

document.querySelectorAll(".modal-overlay").forEach((overlay) => {
	overlay.addEventListener("click", function (e) {
		if (e.target === this) this.classList.add("hidden");
	});
});

function showToast(msg, type = "success") {
	const t = document.getElementById("toast");
	t.textContent = msg;
	t.className = "show " + type;
	clearTimeout(t._timeout);
	t._timeout = setTimeout(() => {
		t.className = "";
	}, 3200);
}

function updateNavAuth() {
	const loggedIn = !!currentUser;
	const isAdmin = loggedIn && currentUser.role === "admin";

	document.getElementById("auth-btn-area").classList.toggle("hidden", loggedIn);
	document
		.getElementById("user-info-area")
		.classList.toggle("hidden", !loggedIn);
	document.getElementById("orders-nav").classList.toggle("hidden", !loggedIn);
	document.getElementById("admin-nav").classList.toggle("hidden", !isAdmin);

	if (loggedIn) {
		document.getElementById("user-display-name").textContent =
			currentUser.name.split(" ")[0];
	}
}

function clearErrors(...ids) {
	ids.forEach((id) => {
		const el = document.getElementById(id);
		if (el) el.textContent = "";
	});
}
function setError(id, msg) {
	const el = document.getElementById(id);
	if (el) el.textContent = msg;
}

function doLogin() {
	clearErrors("login-email-err", "login-password-err", "login-general-err");
	const email = document.getElementById("login-email").value.trim();
	const pass = document.getElementById("login-password").value.trim();
	let valid = true;
	if (!email) {
		setError("login-email-err", "Email is required.");
		valid = false;
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		setError("login-email-err", "Enter a valid email.");
		valid = false;
	}
	if (!pass) {
		setError("login-password-err", "Password is required.");
		valid = false;
	}
	if (!valid) return;

	const user = users.find(
		(u) => u.email.toLowerCase() === email.toLowerCase() && u.password === pass,
	);
	if (!user) {
		setError("login-general-err", "❌ Invalid email or password.");
		return;
	}

	currentUser = user;
	closeModal("login-modal");
	updateNavAuth();
	document.getElementById("login-email").value = "";
	document.getElementById("login-password").value = "";
	showToast("Welcome back, " + user.name.split(" ")[0] + "! 📖");

	if (user.role === "admin") {
		showPage("admin");
	}
}

function doRegister() {
	clearErrors(
		"reg-name-err",
		"reg-email-err",
		"reg-password-err",
		"reg-confirm-err",
	);
	const name = document.getElementById("reg-name").value.trim();
	const email = document.getElementById("reg-email").value.trim();
	const pass = document.getElementById("reg-password").value.trim();
	const confirm = document.getElementById("reg-confirm").value.trim();
	let valid = true;
	if (!name) {
		setError("reg-name-err", "Full name is required.");
		valid = false;
	}
	if (!email) {
		setError("reg-email-err", "Email is required.");
		valid = false;
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		setError("reg-email-err", "Enter a valid email.");
		valid = false;
	} else if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
		setError("reg-email-err", "Email already registered.");
		valid = false;
	}
	if (!pass) {
		setError("reg-password-err", "Password is required.");
		valid = false;
	} else if (pass.length < 6) {
		setError("reg-password-err", "Password must be at least 6 characters.");
		valid = false;
	}
	if (!confirm) {
		setError("reg-confirm-err", "Please confirm your password.");
		valid = false;
	} else if (pass !== confirm) {
		setError("reg-confirm-err", "Passwords do not match.");
		valid = false;
	}
	if (!valid) return;

	const newUser = {
		id: users.length + 1,
		name,
		email,
		password: pass,
		role: "customer",
		joined: new Date().toISOString().split("T")[0],
	};
	users.push(newUser);
	currentUser = newUser;
	closeModal("register-modal");
	updateNavAuth();
	showToast(
		"Account created! Welcome to BookHaven, " + name.split(" ")[0] + "! 🎉",
	);
}

function logout() {
	currentUser = null;
	basket = [];
	updateNavAuth();
	showPage("home");
	showToast("Logged out. See you soon! 👋");
}

function renderStars(rating) {
	let s = "";
	for (let i = 1; i <= 5; i++) {
		if (rating >= i) s += "★";
		else if (rating >= i - 0.5) s += "½";
		else s += "☆";
	}
	return s;
}

function getFilteredBooks() {
	let books = [...BOOKS];
	const cat = document.getElementById("filter-cat")
		? document.getElementById("filter-cat").value
		: "";
	const maxPrice = document.getElementById("filter-price")
		? parseInt(document.getElementById("filter-price").value)
		: 1000;
	const minRating = document.getElementById("filter-rating")
		? parseFloat(document.getElementById("filter-rating").value)
		: 0;
	const inStock = document.getElementById("filter-instock")
		? document.getElementById("filter-instock").checked
		: false;
	const onSale = document.getElementById("filter-onsale")
		? document.getElementById("filter-onsale").checked
		: false;
	const bestOnly = document.getElementById("filter-bestseller")
		? document.getElementById("filter-bestseller").checked
		: false;
	const search = document.getElementById("search-input")
		? document.getElementById("search-input").value.toLowerCase()
		: "";

	if (currentBookFilter !== "All") {
		if (currentBookFilter === "Bestseller")
			books = books.filter((b) => b.bestseller);
		else if (currentBookFilter === "Sale") books = books.filter((b) => b.sale);
		else books = books.filter((b) => b.category === currentBookFilter);
	}
	if (cat) books = books.filter((b) => b.category === cat);
	books = books.filter((b) => b.price <= maxPrice);
	if (minRating) books = books.filter((b) => b.rating >= minRating);
	if (inStock) books = books.filter((b) => b.stock > 0);
	if (onSale) books = books.filter((b) => b.sale);
	if (bestOnly) books = books.filter((b) => b.bestseller);
	if (search)
		books = books.filter(
			(b) =>
				b.title.toLowerCase().includes(search) ||
				b.author.toLowerCase().includes(search) ||
				b.category.toLowerCase().includes(search),
		);

	const sort = document.getElementById("sort-select")
		? document.getElementById("sort-select").value
		: "default";
	if (sort === "price-asc") books.sort((a, b) => a.price - b.price);
	else if (sort === "price-desc") books.sort((a, b) => b.price - a.price);
	else if (sort === "rating") books.sort((a, b) => b.rating - a.rating);
	else if (sort === "title")
		books.sort((a, b) => a.title.localeCompare(b.title));

	return books;
}

function renderBooks() {
	const books = getFilteredBooks();
	const list = document.getElementById("book-list");
	document.getElementById("result-count").textContent =
		books.length + " book" + (books.length !== 1 ? "s" : "") + " found";

	if (books.length === 0) {
		list.innerHTML =
			'<div style="text-align:center;padding:50px 20px;color:var(--text-light);"><div style="font-size:48px;margin-bottom:12px;">📭</div><p>No books match your filters.</p></div>';
		return;
	}

	list.innerHTML = books
		.map(
			(b) => `
    <div class="book-row">
      <div class="book-cover">
        <img src="${b.cover}" alt="${b.title}" onerror="this.parentElement.innerHTML='<div class=&quot;book-cover-placeholder&quot;>📚</div>'">
      </div>
      <div class="book-info">
        <div class="book-info-top">
          <div class="book-meta">
            <div class="book-badges">
              <span class="badge badge-cat">${b.category}</span>
              ${b.bestseller ? '<span class="badge badge-bestseller">⭐ Bestseller</span>' : ""}
              ${b.sale ? `<span class="badge badge-sale">${b.discount}% OFF</span>` : ""}
            </div>
            <div class="book-title">${b.title}</div>
            <div class="book-author">by ${b.author}</div>
            <div class="book-desc">${b.desc}</div>
            <div style="margin-top:8px;">
              <span class="book-stars">${renderStars(b.rating)}</span>
              <span class="book-reviews">${b.rating} (${b.reviews} reviews)</span>
            </div>
            <div class="book-stock">
              ${
								b.stock > 50
									? '<span class="in-stock">✓ In Stock (' + b.stock + ")</span>"
									: b.stock > 0
										? '<span class="low-stock">⚠ Low Stock (' +
											b.stock +
											" left)</span>"
										: '<span style="color:var(--red-sale);font-weight:700;">✗ Out of Stock</span>'
							}
            </div>
          </div>
          <div class="book-price-area">
            <div>
              ${b.origPrice ? `<div class="book-price-orig">₱${b.origPrice}</div>` : ""}
              <div class="book-price">₱${b.price}</div>
              ${b.discount ? `<div class="book-discount">Save ${b.discount}%</div>` : ""}
            </div>
            <div>
              <button class="btn-add-basket" onclick="addToBasket(${b.id})">🧺 Add to Basket</button>
              <button class="btn-view-book"  onclick="openBookDetail(${b.id})">View Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
		)
		.join("");
}

function handleSearch() {
	applyFilters();
}
function applyFilters() {
	renderBooks();
}

function resetFilters() {
	document.getElementById("filter-cat").value = "";
	document.getElementById("filter-price").value = 1000;
	document.getElementById("price-display").textContent = "₱1000";
	document.getElementById("filter-rating").value = 0;
	document.getElementById("filter-instock").checked = false;
	document.getElementById("filter-onsale").checked = false;
	document.getElementById("filter-bestseller").checked = false;
	document.getElementById("search-input").value = "";
	currentBookFilter = "All";
	document
		.querySelectorAll(".cat-btn")
		.forEach((b) => b.classList.remove("active"));
	document.querySelectorAll(".cat-btn")[0].classList.add("active");
	renderBooks();
}

function filterCategory(cat, btn) {
	currentBookFilter = cat;
	document
		.querySelectorAll(".cat-btn")
		.forEach((b) => b.classList.remove("active"));
	if (btn) btn.classList.add("active");
	document.getElementById("list-title").textContent =
		cat === "All"
			? "All Books"
			: cat === "Bestseller"
				? "⭐ Bestsellers"
				: cat === "Sale"
					? "🔖 On Sale"
					: cat + " Books";
	showPage("home");
	renderBooks();
}

function addToBasket(bookId) {
	if (!currentUser) {
		openModal("login-modal");
		showToast("Please log in to add books to your basket.", "error");
		return;
	}
	const book = BOOKS.find((b) => b.id === bookId);
	if (!book || book.stock === 0) {
		showToast("This book is out of stock.", "error");
		return;
	}
	const existing = basket.find((i) => i.bookId === bookId);
	if (existing) existing.qty++;
	else basket.push({ bookId, qty: 1 });
	updateBasketCount();
	showToast(`📚 "${book.title}" added to basket!`);
}

function updateBasketCount() {
	const total = basket.reduce((s, i) => s + i.qty, 0);
	document.getElementById("basket-count").textContent = total;
}

function renderBasket() {
	const el = document.getElementById("basket-content");
	if (!currentUser) {
		el.innerHTML =
			'<div class="empty-basket"><div class="empty-icon">🔒</div><p>Please log in to view your basket.</p><button class="btn-primary" onclick="openModal(\'login-modal\')">Log In</button></div>';
		return;
	}
	if (basket.length === 0) {
		el.innerHTML =
			'<h2 style="font-family:\'Playfair Display\',serif;font-size:28px;color:var(--brown-dark);margin-bottom:20px;">🧺 Your Basket</h2><div class="empty-basket"><div class="empty-icon">🧺</div><p>Your basket is empty. Start browsing!</p><button class="btn-primary" onclick="showPage(\'home\')">Browse Books</button></div>';
		return;
	}
	const subtotal = basket.reduce((s, i) => {
		const b = BOOKS.find((bk) => bk.id === i.bookId);
		return s + (b ? b.price * i.qty : 0);
	}, 0);
	const shipping = subtotal >= 800 ? 0 : 80;
	const total = subtotal + shipping;

	el.innerHTML = `
    <h2 style="font-family:'Playfair Display',serif;font-size:28px;color:var(--brown-dark);margin-bottom:20px;">🧺 Your Basket</h2>
    ${basket
			.map((item) => {
				const b = BOOKS.find((bk) => bk.id === item.bookId);
				if (!b) return "";
				return `<div class="basket-item">
        <div class="basket-item-img"><img src="${b.cover}" alt="${b.title}" onerror="this.src=''"></div>
        <div class="basket-item-info">
          <div class="basket-item-title">${b.title}</div>
          <div class="basket-item-cat">${b.category} · by ${b.author}</div>
          <div class="basket-item-qty">
            <button class="qty-btn" onclick="changeBasketQty(${b.id}, -1)">−</button>
            <span style="font-weight:700;font-size:15px;">${item.qty}</span>
            <button class="qty-btn" onclick="changeBasketQty(${b.id}, 1)">+</button>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px;">
          <div class="basket-item-price">₱${(b.price * item.qty).toLocaleString()}</div>
          <button class="remove-btn" onclick="removeFromBasket(${b.id})">🗑</button>
        </div>
      </div>`;
			})
			.join("")}
    <div class="basket-summary">
      <div class="summary-row"><span>Subtotal</span><span>₱${subtotal.toLocaleString()}</span></div>
      <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? '<span style="color:var(--green-stock);font-weight:700;">FREE</span>' : "₱" + shipping}</span></div>
      <div class="summary-row summary-total"><span>Total</span><span>₱${total.toLocaleString()}</span></div>
      <button class="btn-primary" style="width:100%;margin-top:16px;" onclick="openModal('checkout-modal')">Proceed to Checkout →</button>
    </div>
  `;
}

function changeBasketQty(bookId, delta) {
	const item = basket.find((i) => i.bookId === bookId);
	if (!item) return;
	item.qty += delta;
	if (item.qty <= 0) basket = basket.filter((i) => i.bookId !== bookId);
	updateBasketCount();
	renderBasket();
}

function removeFromBasket(bookId) {
	basket = basket.filter((i) => i.bookId !== bookId);
	updateBasketCount();
	renderBasket();
}

function placeOrder() {
	clearErrors(
		"co-name-err",
		"co-address-err",
		"co-phone-err",
		"co-payment-err",
	);
	const name = document.getElementById("co-name").value.trim();
	const address = document.getElementById("co-address").value.trim();
	const phone = document.getElementById("co-phone").value.trim();
	const payment = document.getElementById("co-payment").value;
	let valid = true;
	if (!name) {
		setError("co-name-err", "Full name is required.");
		valid = false;
	}
	if (!address) {
		setError("co-address-err", "Delivery address is required.");
		valid = false;
	}
	if (!phone) {
		setError("co-phone-err", "Phone number is required.");
		valid = false;
	} else if (!/^(\+63|0)[0-9]{9,10}$/.test(phone.replace(/\s/g, ""))) {
		setError("co-phone-err", "Enter a valid PH phone number.");
		valid = false;
	}
	if (!payment) {
		setError("co-payment-err", "Please select a payment method.");
		valid = false;
	}
	if (!valid) return;

	const subtotal = basket.reduce((s, i) => {
		const b = BOOKS.find((bk) => bk.id === i.bookId);
		return s + (b ? b.price * i.qty : 0);
	}, 0);
	const shipping = subtotal >= 800 ? 0 : 80;
	const total = subtotal + shipping;
	const items = basket.map((i) => {
		const b = BOOKS.find((bk) => bk.id === i.bookId);
		return { title: b.title, qty: i.qty, price: b.price };
	});
	const orderId = "BH-" + String(orders.length + 1).padStart(3, "0");
	orders.push({
		id: orderId,
		userId: currentUser.id,
		items,
		total,
		status: "pending",
		date: new Date().toISOString().split("T")[0],
		payment,
		address,
	});
	basket = [];
	updateBasketCount();
	closeModal("checkout-modal");
	showToast("🎉 Order " + orderId + " placed successfully!");
	showPage("orders");
}

function renderOrders() {
	const el = document.getElementById("orders-list");
	if (!currentUser) {
		el.innerHTML =
			'<p style="color:var(--text-light);">Please log in to view orders.</p>';
		return;
	}
	const myOrders = orders.filter((o) => o.userId === currentUser.id);
	if (myOrders.length === 0) {
		el.innerHTML =
			'<div class="empty-basket"><div class="empty-icon">📦</div><p>No orders yet. Start shopping!</p><button class="btn-primary" onclick="showPage(\'home\')">Browse Books</button></div>';
		return;
	}
	const statuses = ["pending", "processing", "shipped", "delivered"];
	el.innerHTML = myOrders
		.map((o) => {
			const stepIdx = statuses.indexOf(o.status);
			return `<div class="order-card">
      <div class="order-header">
        <div>
          <div class="order-id">Order ${o.id}</div>
          <div class="order-date">${o.date} · ${o.payment}</div>
        </div>
        <span class="order-status status-${o.status}">${o.status.charAt(0).toUpperCase() + o.status.slice(1)}</span>
      </div>
      <div class="order-items">${o.items.map((i) => i.title + " × " + i.qty).join(", ")}</div>
      <div class="order-total">Total: ₱${o.total.toLocaleString()}</div>
      <div class="tracking-steps">
        ${statuses
					.map(
						(s, i) => `<div class="tracking-step">
          <div class="step-dot ${i < stepIdx ? "done" : i === stepIdx ? "current" : ""}">${i < stepIdx ? "✓" : i + 1}</div>
          <span>${s.charAt(0).toUpperCase() + s.slice(1)}</span>
        </div>`,
					)
					.join("")}
      </div>
    </div>`;
		})
		.join("");
}

function openBookDetail(bookId) {
	const b = BOOKS.find((bk) => bk.id === bookId);
	if (!b) return;
	currentDetailBook = b;
	selectedStars = 0;
	const existingReviews = [
		{
			name: "Maria Santos",
			stars: 5,
			date: "2025-03-10",
			text: "Absolutely loved this book! Highly recommend.",
		},
		{
			name: "Juan Cruz",
			stars: 4,
			date: "2025-02-28",
			text: "Great read, very well written.",
		},
	];
	document.getElementById("book-modal-content").innerHTML = `
    <div class="book-detail-inner">
      <div class="book-detail-img"><img src="${b.cover}" alt="${b.title}" onerror="this.src=''"></div>
      <div class="book-detail-info">
        <div class="book-badges" style="margin-bottom:8px;">
          <span class="badge badge-cat">${b.category}</span>
          ${b.bestseller ? '<span class="badge badge-bestseller">⭐ Bestseller</span>' : ""}
          ${b.sale ? `<span class="badge badge-sale">${b.discount}% OFF</span>` : ""}
        </div>
        <div class="book-detail-title">${b.title}</div>
        <div class="book-detail-author">by ${b.author}</div>
        <div style="margin-bottom:8px;">
          <span class="book-stars">${renderStars(b.rating)}</span>
          <span class="book-reviews">${b.rating} · ${b.reviews} reviews</span>
        </div>
        <div class="book-detail-desc">${b.desc}</div>
        <div class="book-detail-price">
          ₱${b.price}
          ${b.origPrice ? `<span style="font-size:16px;color:var(--text-light);text-decoration:line-through;margin-left:8px;">₱${b.origPrice}</span>` : ""}
        </div>
        <div class="book-stock" style="margin-bottom:12px;">
          ${
						b.stock > 50
							? '<span class="in-stock">✓ In Stock</span>'
							: b.stock > 0
								? `<span class="low-stock">⚠ Only ${b.stock} left</span>`
								: '<span style="color:var(--red-sale);">Out of Stock</span>'
					}
        </div>
        <div class="qty-row">
          <button class="qty-btn" onclick="changeDetailQty(-1)">−</button>
          <input type="number" id="qty-input" value="1" min="1" max="${b.stock}">
          <button class="qty-btn" onclick="changeDetailQty(1)">+</button>
        </div>
        <button class="btn-primary" onclick="addDetailToBasket(${b.id})">🧺 Add to Basket</button>
      </div>
    </div>
    <div class="reviews-section">
      <h4>Customer Reviews</h4>
      ${existingReviews
				.map(
					(r) => `<div class="review-card">
        <div class="review-top"><span class="reviewer-name">${r.name}</span><span class="review-date">${r.date}</span></div>
        <div class="book-stars">${renderStars(r.stars)}</div>
        <div class="review-text" style="margin-top:4px;">${r.text}</div>
      </div>`,
				)
				.join("")}
      <div class="add-review-form">
        <div style="font-weight:700;font-size:14px;color:var(--brown-dark);margin-bottom:8px;">Write a Review</div>
        <div class="star-rating" id="star-rating">
          <span onclick="setStars(1)">★</span>
          <span onclick="setStars(2)">★</span>
          <span onclick="setStars(3)">★</span>
          <span onclick="setStars(4)">★</span>
          <span onclick="setStars(5)">★</span>
        </div>
        <span class="form-error" id="review-star-err"></span>
        <div class="form-group" style="margin-bottom:8px;">
          <input type="text" id="review-name" placeholder="Your name">
          <span class="form-error" id="review-name-err"></span>
        </div>
        <div class="form-group">
          <textarea id="review-text" rows="3" placeholder="Share your thoughts about this book..."></textarea>
          <span class="form-error" id="review-text-err"></span>
        </div>
        <button class="btn-submit" onclick="submitReview()">Post Review</button>
        <div class="form-success hidden" id="review-success">✅ Review posted! Thank you.</div>
      </div>
    </div>
  `;
	openModal("book-modal");
}

function changeDetailQty(delta) {
	const input = document.getElementById("qty-input");
	let val = parseInt(input.value) + delta;
	val = Math.max(
		1,
		Math.min(val, currentDetailBook ? currentDetailBook.stock : 99),
	);
	input.value = val;
}

function addDetailToBasket(bookId) {
	if (!currentUser) {
		closeModal("book-modal");
		openModal("login-modal");
		return;
	}
	const qty = parseInt(document.getElementById("qty-input").value) || 1;
	const book = BOOKS.find((b) => b.id === bookId);
	const existing = basket.find((i) => i.bookId === bookId);
	if (existing) existing.qty += qty;
	else basket.push({ bookId, qty });
	updateBasketCount();
	showToast(`📚 "${book.title}" (×${qty}) added to basket!`);
}

function setStars(n) {
	selectedStars = n;
	document
		.querySelectorAll("#star-rating span")
		.forEach((s, i) => s.classList.toggle("active", i < n));
}

function submitReview() {
	clearErrors("review-star-err", "review-name-err", "review-text-err");
	let valid = true;
	if (!selectedStars) {
		setError("review-star-err", "Please select a star rating.");
		valid = false;
	}
	const name = document.getElementById("review-name").value.trim();
	const text = document.getElementById("review-text").value.trim();
	if (!name) {
		setError("review-name-err", "Your name is required.");
		valid = false;
	}
	if (!text) {
		setError("review-text-err", "Review text is required.");
		valid = false;
	}
	if (!valid) return;
	document.getElementById("review-success").classList.remove("hidden");
	document.getElementById("review-name").value = "";
	document.getElementById("review-text").value = "";
	selectedStars = 0;
	document
		.querySelectorAll("#star-rating span")
		.forEach((s) => s.classList.remove("active"));
}

function submitContact() {
	clearErrors(
		"contact-name-err",
		"contact-email-err",
		"contact-subject-err",
		"contact-msg-err",
	);
	const name = document.getElementById("contact-name").value.trim();
	const email = document.getElementById("contact-email").value.trim();
	const subject = document.getElementById("contact-subject").value.trim();
	const msg = document.getElementById("contact-msg").value.trim();
	let valid = true;
	if (!name) {
		setError("contact-name-err", "Name is required.");
		valid = false;
	}
	if (!email) {
		setError("contact-email-err", "Email is required.");
		valid = false;
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		setError("contact-email-err", "Enter a valid email.");
		valid = false;
	}
	if (!subject) {
		setError("contact-subject-err", "Subject is required.");
		valid = false;
	}
	if (!msg) {
		setError("contact-msg-err", "Message is required.");
		valid = false;
	}
	if (!valid) return;
	document.getElementById("contact-success").classList.remove("hidden");
	document.getElementById("contact-name").value = "";
	document.getElementById("contact-email").value = "";
	document.getElementById("contact-subject").value = "";
	document.getElementById("contact-msg").value = "";
}

function toggleFaq(el) {
	const ans = el.nextElementSibling;
	ans.classList.toggle("open");
	el.querySelector("span").textContent = ans.classList.contains("open")
		? "▲"
		: "▼";
}

function renderAdmin() {
	if (!currentUser || currentUser.role !== "admin") {
		showPage("home");
		return;
	}

	const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
	document.getElementById("admin-stats").innerHTML = `
    <div class="stat-card"><div class="stat-num">${orders.length}</div><div class="stat-label">Total Orders</div></div>
    <div class="stat-card"><div class="stat-num">${users.length}</div><div class="stat-label">Registered Users</div></div>
    <div class="stat-card"><div class="stat-num">₱${totalRevenue.toLocaleString()}</div><div class="stat-label">Total Revenue</div></div>
    <div class="stat-card"><div class="stat-num">${BOOKS.length}</div><div class="stat-label">Books Listed</div></div>
  `;

	document.getElementById("admin-recent-orders").innerHTML = renderOrdersTable(
		orders.slice(-5).reverse(),
	);
	document.getElementById("admin-orders-table").innerHTML = renderOrdersTable(
		[...orders].reverse(),
	);

	document.getElementById("admin-users-table").innerHTML = `
    <table class="data-table">
      <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Orders</th></tr></thead>
      <tbody>${users
				.map(
					(u) => `<tr>
        <td>${u.id}</td>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td><span class="badge ${u.role === "admin" ? "badge-bestseller" : "badge-cat"}">${u.role}</span></td>
        <td>${u.joined}</td>
        <td>${orders.filter((o) => o.userId === u.id).length}</td>
      </tr>`,
				)
				.join("")}</tbody>
    </table>`;

	document.getElementById("admin-inventory-table").innerHTML = `
    <table class="data-table">
      <thead><tr><th>Title</th><th>Author</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th></tr></thead>
      <tbody>${BOOKS.map(
				(b) => `<tr>
        <td>${b.title}</td>
        <td>${b.author}</td>
        <td>${b.category}</td>
        <td>₱${b.price}</td>
        <td>${b.stock}</td>
        <td><span class="inventory-badge ${b.stock > 100 ? "inv-good" : b.stock > 20 ? "inv-low" : "inv-out"}">${b.stock > 100 ? "Good" : b.stock > 20 ? "Low" : "Critical"}</span></td>
      </tr>`,
			).join("")}</tbody>
    </table>`;
}

function renderOrdersTable(list) {
	if (list.length === 0)
		return '<p style="color:var(--text-light);padding:20px 0;">No orders yet.</p>';
	return `<table class="data-table">
    <thead><tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Date</th><th>Status</th><th>Update Status</th></tr></thead>
    <tbody>${list
			.map((o) => {
				const u = users.find((u) => u.id === o.userId);
				return `<tr>
        <td><strong>${o.id}</strong></td>
        <td>${u ? u.name : "Unknown"}</td>
        <td>${o.items.map((i) => i.title + " ×" + i.qty).join("<br>")}</td>
        <td>₱${o.total.toLocaleString()}</td>
        <td>${o.payment}</td>
        <td>${o.date}</td>
        <td><span class="order-status status-${o.status}">${o.status.charAt(0).toUpperCase() + o.status.slice(1)}</span></td>
        <td>
          <select class="admin-select" onchange="updateOrderStatus('${o.id}', this.value)">
            <option value="pending"    ${o.status === "pending" ? "selected" : ""}>Pending</option>
            <option value="processing" ${o.status === "processing" ? "selected" : ""}>Processing</option>
            <option value="shipped"    ${o.status === "shipped" ? "selected" : ""}>Shipped</option>
            <option value="delivered"  ${o.status === "delivered" ? "selected" : ""}>Delivered</option>
            <option value="cancelled"  ${o.status === "cancelled" ? "selected" : ""}>Cancelled</option>
          </select>
        </td>
      </tr>`;
			})
			.join("")}</tbody>
  </table>`;
}

function updateOrderStatus(orderId, newStatus) {
	const order = orders.find((o) => o.id === orderId);
	if (!order) return;
	order.status = newStatus;
	renderAdmin();
	showToast(`Order ${orderId} updated to "${newStatus}".`);
}

function switchAdminTab(tabId, btn) {
	document
		.querySelectorAll(".admin-section")
		.forEach((s) => s.classList.remove("active"));
	document.getElementById(tabId).classList.add("active");
	document
		.querySelectorAll(".admin-nav-item")
		.forEach((b) => b.classList.remove("active"));
	btn.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
	renderBooks();
	updateBasketCount();
	updateNavAuth();
});

function toggleMobileNav() {
	document.querySelector(".nav-links").classList.toggle("open");
}
