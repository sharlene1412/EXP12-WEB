
import React, { useState, useEffect, useMemo } from "react";
import "./App.css";

const initialProducts = [
  { id: 1, name: "Royal Red Apples", category: "Fruits", price: 149, old: 180, unit: "1 kg", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600", rating: 4.8, stock: 40 },
  { id: 2, name: "Fresh Bananas", category: "Fruits", price: 49, old: 60, unit: "6 pcs", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600", rating: 4.7, stock: 55 },
  { id: 3, name: "Sweet Oranges", category: "Fruits", price: 90, old: 110, unit: "1 kg", image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=600", rating: 4.5, stock: 30 },
  { id: 4, name: "Fresh Strawberries", category: "Fruits", price: 120, old: 150, unit: "250 g", image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600", rating: 4.8, stock: 20 },
  { id: 5, name: "Green Broccoli", category: "Vegetables", price: 65, old: 80, unit: "500 g", image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=600", rating: 4.6, stock: 35 },
  { id: 6, name: "Fresh Tomatoes", category: "Vegetables", price: 35, old: 45, unit: "1 kg", image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600", rating: 4.4, stock: 60 },
  { id: 7, name: "Organic Carrots", category: "Vegetables", price: 45, old: 55, unit: "500 g", image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=600", rating: 4.5, stock: 40 },
  { id: 8, name: "Fresh Spinach", category: "Vegetables", price: 30, old: 40, unit: "1 bunch", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600", rating: 4.3, stock: 25 },
  { id: 9, name: "Farm Fresh Milk", category: "Dairy", price: 60, old: 65, unit: "1 litre", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600", rating: 4.8, stock: 70 },
  { id: 10, name: "Fresh Cheese", category: "Dairy", price: 110, old: 130, unit: "200 g", image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600", rating: 4.5, stock: 25 },
  { id: 11, name: "Creamy Butter", category: "Dairy", price: 55, old: 65, unit: "100 g", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600", rating: 4.6, stock: 30 },
  { id: 12, name: "Whole Wheat Bread", category: "Bakery", price: 45, old: 55, unit: "1 pack", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600", rating: 4.7, stock: 40 },
  { id: 13, name: "Chocolate Cookies", category: "Snacks", price: 75, old: 90, unit: "1 pack", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600", rating: 4.6, stock: 50 },
  { id: 14, name: "Mixed Nuts", category: "Snacks", price: 160, old: 190, unit: "250 g", image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=600", rating: 4.8, stock: 25 },
  { id: 15, name: "Fresh Orange Juice", category: "Beverages", price: 85, old: 100, unit: "1 litre", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600", rating: 4.5, stock: 30 },
  { id: 16, name: "Green Tea", category: "Beverages", price: 120, old: 145, unit: "1 pack", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600", rating: 4.4, stock: 20 }
];

const categories = [
  { name: "All", icon: "🛒" },
  { name: "Fruits", icon: "🍎" },
  { name: "Vegetables", icon: "🥦" },
  { name: "Dairy", icon: "🥛" },
  { name: "Bakery", icon: "🥖" },
  { name: "Snacks", icon: "🍪" },
  { name: "Beverages", icon: "🧃" }
];

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [page, setPage] = useState("home");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [cart, setCart] = useState(() => readStorage("fmCart", []));
  const [wishlist, setWishlist] = useState(() => readStorage("fmWishlist", []));
  const [orders, setOrders] = useState(() => readStorage("fmOrders", []));
  const [user, setUser] = useState(() => readStorage("fmUser", null));
  const [registeredUsers, setRegisteredUsers] = useState(
    () => readStorage("fmCustomers", [])
  );
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const [toast, setToast] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [pinMessage, setPinMessage] = useState("");
  const [payment, setPayment] = useState("UPI");
  const [address, setAddress] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(null);

  useEffect(() => {
    localStorage.setItem("fmCart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("fmWishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("fmOrders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("fmUser", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("fmCustomers", JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  function notify(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2500);
  }

  function navigate(destination) {
    setPage(destination);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function addToCart(product) {
    setCart(old => {
      const existing = old.find(item => item.id === product.id);
      if (existing) {
        return old.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...old, { ...product, quantity: 1 }];
    });
    notify(product.name + " added to basket!");
  }

  function changeQuantity(id, amount) {
    setCart(old =>
      old
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }

  function toggleWishlist(id) {
    setWishlist(old => {
      const exists = old.includes(id);
      notify(exists ? "Removed from wishlist" : "Added to wishlist ❤️");
      return exists ? old.filter(item => item !== id) : [...old, id];
    });
  }

  const visibleProducts = useMemo(() => {
    let result = initialProducts.filter(product => {
      const matchesCategory =
        category === "All" || product.category === category;
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);
    if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [category, search, sort]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discount = appliedCoupon ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal === 0 || subtotal >= 499 ? 0 : 30;
  const total = subtotal - discount + delivery;

  function applyCoupon() {
    if (coupon.trim().toUpperCase() === "FRESH10" && subtotal > 0) {
      setAppliedCoupon(true);
      notify("10% discount applied successfully!");
    } else {
      setAppliedCoupon(false);
      notify("Invalid coupon. Try FRESH10");
    }
  }

  function checkPin() {
    if (!/^[0-9]{6}$/.test(pin)) {
      setPinMessage("Enter a valid 6-digit PIN code.");
    } else {
      setPinMessage("PIN accepted for demo. Delivery availability needs verification.");
    }
  }

  function register(e) {
    e.preventDefault();

    if (registeredUsers.some(u => u.email === email)) {
      notify("Email already registered. Please login.");
      return;
    }

    const newUser = {
      name: customerName,
      email,
      password,
      mobile
    };

    setRegisteredUsers(old => [...old, newUser]);
    setUser({ name: customerName, email, mobile });
    notify("Welcome to FreshMart! Registration successful.");
    navigate("home");
  }

  function login(e) {
    e.preventDefault();

    const found = registeredUsers.find(
      u => u.email === email && u.password === password
    );

    if (!found) {
      notify("Invalid details. Register first or check your password.");
      return;
    }

    setUser({
      name: found.name,
      email: found.email,
      mobile: found.mobile
    });

    notify("Login successful. Welcome back!");
    navigate("home");
  }

  function logout() {
    setUser(null);
    notify("Logged out successfully.");
    navigate("home");
  }

  function placeOrder(e) {
    e.preventDefault();

    if (!cart.length) {
      notify("Your basket is empty.");
      return;
    }

    if (!user) {
      notify("Please login before placing your order.");
      navigate("login");
      return;
    }

    if (!address.trim() || !/^[0-9]{10}$/.test(mobile)) {
      notify("Please enter a delivery address and valid mobile number.");
      return;
    }

    const newOrder = {
      id: "FM" + Date.now().toString().slice(-8),
      date: new Date().toLocaleString(),
      items: cart,
      subtotal,
      discount,
      delivery,
      total,
      payment,
      address,
      status: "Order Placed"
    };

    setOrders(old => [newOrder, ...old]);
    setOrderPlaced(newOrder);
    setCart([]);
    setCoupon("");
    setAppliedCoupon(false);
    navigate("success");
  }

  function ProductCard({ product }) {
    const saved = wishlist.includes(product.id);
    const percentage = Math.round(
      ((product.old - product.price) / product.old) * 100
    );

    return (
      <article className="product-card">
        <div className="product-image">
          <img src={product.image} alt={product.name} loading="lazy" />
          <span className="discount-label">{percentage}% OFF</span>
          <button
            className={`heart ${saved ? "heart-active" : ""}`}
            onClick={() => toggleWishlist(product.id)}
            aria-label="Toggle wishlist"
          >
            {saved ? "♥" : "♡"}
          </button>
        </div>

        <div className="product-details">
          <small className="product-category">{product.category}</small>
          <h3>{product.name}</h3>
          <div className="rating">★ {product.rating} <span> | Fresh choice</span></div>
          <p className="price">
            ₹{product.price}
            <del>₹{product.old}</del>
            <small> / {product.unit}</small>
          </p>
          <p className="stock">● In Stock</p>
          <button className="add-button" onClick={() => addToCart(product)}>
            + Add to Basket
          </button>
        </div>
      </article>
    );
  }

  function ProductSection({ items }) {
    return (
      <div className="product-grid">
        {items.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
        {items.length === 0 && (
          <div className="empty-state">
            <h2>No products found</h2>
            <p>Try another category or search term.</p>
          </div>
        )}
      </div>
    );
  }

  function Header() {
    return (
      <>
        <div className="announcement">
          <span>🌿 Fresh picks, happy homes</span>
          <span>Free delivery on orders above ₹499</span>
        </div>

        <header className="main-header">
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>

          <button className="logo" onClick={() => navigate("home")}>
            🧺 FreshMart
            <small>GOOD FOOD. GOOD MOOD.</small>
          </button>

          <div className="delivery-check">
            <small>Delivering to</small>
            <div className="pin-control">
              <input
                maxLength="6"
                value={pin}
                placeholder="Enter PIN code"
                onChange={e => setPin(e.target.value.replace(/\D/g, ""))}
              />
              <button onClick={checkPin}>Check</button>
            </div>
            {pinMessage && <small className="pin-message">{pinMessage}</small>}
          </div>

          <div className="header-actions">
            <button className="account-button" onClick={() => navigate(user ? "profile" : "login")}>
              ♙ {user ? user.name.split(" ")[0] : "Login"}
            </button>
            <button className="cart-button" onClick={() => navigate("cart")}>
              🛒 My Cart <b>{cartCount}</b>
            </button>
          </div>
        </header>

        <nav className={`main-nav ${menuOpen ? "nav-open" : ""}`}>
          <button onClick={() => navigate("home")}>Home</button>
          <button onClick={() => navigate("shop")}>Shop</button>
          <button onClick={() => navigate("offers")}>Offers</button>
          <button onClick={() => navigate("wishlist")}>♥ Wishlist ({wishlist.length})</button>
          <button onClick={() => navigate("orders")}>My Orders</button>
          <button onClick={() => navigate("about")}>About Us</button>
          <button onClick={() => navigate("contact")}>Contact</button>
          {!user ? (
            <button className="nav-register" onClick={() => navigate("register")}>
              Register
            </button>
          ) : (
            <button className="nav-register" onClick={logout}>Logout</button>
          )}
        </nav>
      </>
    );
  }

  function Footer() {
    return (
      <footer className="footer">
        <div>
          <h2>🧺 FreshMart</h2>
          <p>Good food. Good mood.</p>
          <p>Fresh groceries delivered to your doorstep.</p>
        </div>
        <div>
          <h3>Quick Links</h3>
          <button onClick={() => navigate("shop")}>Shop Products</button>
          <button onClick={() => navigate("offers")}>Special Offers</button>
          <button onClick={() => navigate("orders")}>My Orders</button>
        </div>
        <div>
          <h3>Customer Service</h3>
          <p>Help & Support</p>
          <p>Delivery Information</p>
          <p>Return Policy</p>
        </div>
        <div>
          <h3>Contact Us</h3>
          <p>support@freshmart.com</p>
          <p>+91 98765 43210</p>
          <p>Monday – Saturday</p>
        </div>
        <small>© 2026 FreshMart Online Grocery Store. All Rights Reserved.</small>
      </footer>
    );
  }

  function HomePage() {
    return (
      <>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">FRESHNESS DELIVERED DAILY</span>
            <h1>Good Food Starts With <em>Fresh Choices.</em></h1>
            <p>
              Discover fresh fruits, vegetables, dairy products and everyday
              grocery essentials at amazing prices.
            </p>
            <button className="primary-button" onClick={() => navigate("shop")}>
              Shop Now →
            </button>
            <div className="hero-points">
              ✓ Farm fresh quality &nbsp; ✓ Easy shopping &nbsp; ✓ Quick delivery
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1100"
              alt="Fresh vegetables and groceries"
            />
            <div className="floating-card">
              <b>Up to 30% OFF</b>
              <span>Fresh picks of the week</span>
            </div>
          </div>
        </section>

        <section className="benefits">
          <div>🚚 <b>Fast Delivery</b><small>At your doorstep</small></div>
          <div>🌱 <b>Fresh Products</b><small>Quality guaranteed</small></div>
          <div>🔒 <b>Safe Shopping</b><small>Secure demo checkout</small></div>
          <div>💚 <b>Best Prices</b><small>Everyday savings</small></div>
        </section>

        <section className="section">
          <div className="section-title centered">
            <span className="eyebrow">EXPLORE OUR STORE</span>
            <h2>Shop By Category</h2>
            <p>Everything you need, all in one place.</p>
          </div>

          <div className="category-grid">
            {categories.map(item => (
              <button
                key={item.name}
                className="category-card"
                onClick={() => {
                  setCategory(item.name);
                  navigate("shop");
                }}
              >
                <span>{item.icon}</span>
                <b>{item.name === "All" ? "All Products" : item.name}</b>
                <small>Explore products →</small>
              </button>
            ))}
          </div>
        </section>

        <section className="offer-banner">
          <div>
            <span>FRESHMART SPECIAL</span>
            <h2>Fresh Deals.<br />Better Savings.</h2>
            <p>Get 10% off your grocery basket with our special coupon.</p>
            <button onClick={() => navigate("offers")}>Explore Offers →</button>
          </div>
          <div className="offer-art">🛍️</div>
        </section>

        <section className="section">
          <div className="section-title">
            <span className="eyebrow">HANDPICKED FOR YOU</span>
            <h2>Our Fresh Products</h2>
            <button className="view-all" onClick={() => navigate("shop")}>
              View All Products →
            </button>
          </div>
          <ProductSection items={initialProducts.slice(0, 8)} />
        </section>

        <section className="newsletter">
          <div>
            <span className="eyebrow">STAY FRESH</span>
            <h2>Get Fresh Deals in Your Inbox!</h2>
            <p>Discover special offers and grocery savings.</p>
          </div>
          <button onClick={() => navigate("offers")}>View Latest Offers →</button>
        </section>
      </>
    );
  }

  function ShopPage() {
    return (
      <main className="inner-page">
        <span className="eyebrow">FRESH FROM OUR STORE</span>
        <h1>Shop Groceries</h1>
        <p>Explore our carefully selected everyday essentials.</p>

        <div className="shop-search">
          <input
            value={search}
            placeholder="Search fruits, vegetables, milk..."
            onChange={e => setSearch(e.target.value)}
          />
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        <div className="filter-pills">
          {categories.map(item => (
            <button
              key={item.name}
              className={category === item.name ? "active" : ""}
              onClick={() => setCategory(item.name)}
            >
              {item.icon} {item.name}
            </button>
          ))}
        </div>

        <p className="result-count">{visibleProducts.length} products found</p>
        <ProductSection items={visibleProducts} />
      </main>
    );
  }

  function WishlistPage() {
    const saved = initialProducts.filter(p => wishlist.includes(p.id));

    return (
      <main className="inner-page">
        <span className="eyebrow">YOUR FAVOURITES</span>
        <h1>My Wishlist ♥</h1>
        <p>Your saved grocery products.</p>
        <ProductSection items={saved} />
        {saved.length === 0 && (
          <div className="empty-state">
            <h2>Your wishlist is empty!</h2>
            <button className="primary-button" onClick={() => navigate("shop")}>
              Explore Products
            </button>
          </div>
        )}
      </main>
    );
  }

  function OffersPage() {
    const offers = [
      { code: "FRESH10", title: "10% OFF", desc: "Save 10% on your grocery basket.", condition: "Valid on orders with products in your basket." },
      { code: "WELCOME", title: "WELCOME OFFER", desc: "Special offer for new customers.", condition: "Demo coupon for new customer orders." },
      { code: "SAVE50", title: "SAVE ₹50", desc: "Enjoy ₹50 off your next order.", condition: "Demo offer. Conditions apply." }
    ];

    return (
      <main className="inner-page">
        <span className="eyebrow">GREAT DEALS FOR YOU</span>
        <h1>FreshMart Offers & Deals</h1>
        <p>Enjoy more savings on your everyday grocery shopping.</p>

        <div className="coupon-grid">
          {offers.map(offer => (
            <div className="coupon-card" key={offer.code}>
              <span>FRESHMART EXCLUSIVE</span>
              <h2>{offer.title}</h2>
              <p>{offer.desc}</p>
              <div className="coupon-code">{offer.code}</div>
              <small>{offer.condition}</small>
              <button onClick={() => {
                setCoupon(offer.code);
                navigate("cart");
                notify("Coupon copied to your cart. Apply it there.");
              }}>
                Use This Offer →
              </button>
            </div>
          ))}
        </div>
      </main>
    );
  }

  function AuthPage({ isRegister }) {
    return (
      <main className="auth-page">
        <form className="auth-card" onSubmit={isRegister ? register : login}>
          <div className="auth-logo">🧺</div>
          <span className="eyebrow">WELCOME TO FRESHMART</span>
          <h1>{isRegister ? "Create Your Account" : "Welcome Back!"}</h1>
          <p>
            {isRegister
              ? "Register to enjoy convenient grocery shopping."
              : "Login to continue shopping with FreshMart."}
          </p>

          {isRegister && (
            <>
              <label>Full Name</label>
              <input
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                placeholder="Enter your name"
                required
              />
              <label>Mobile Number</label>
              <input
                value={mobile}
                onChange={e => setMobile(e.target.value.replace(/\D/g, ""))}
                placeholder="10-digit mobile number"
                maxLength="10"
                required
              />
            </>
          )}

          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter password"
            minLength="6"
            required
          />

          <button className="primary-button full-button" type="submit">
            {isRegister ? "Create Account" : "Login"}
          </button>

          <p className="switch-auth">
            {isRegister ? "Already have an account?" : "New to FreshMart?"}
            <button
              type="button"
              onClick={() => navigate(isRegister ? "login" : "register")}
            >
              {isRegister ? "Login" : "Register"}
            </button>
          </p>
          <small className="demo-note">
            Classroom demonstration only. Authentication is stored locally.
          </small>
        </form>
      </main>
    );
  }

  function CartPage() {
    return (
      <main className="inner-page">
        <span className="eyebrow">YOUR SHOPPING BASKET</span>
        <h1>My Shopping Cart</h1>
        <p>Review your products before checkout.</p>

        {cart.length === 0 ? (
          <div className="empty-state">
            <div>🛒</div>
            <h2>Your basket is empty</h2>
            <p>Let's fill it with something fresh!</p>
            <button className="primary-button" onClick={() => navigate("shop")}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="checkout-layout">
            <div className="cart-box">
              <h2>Basket Items ({cartCount})</h2>
              {cart.map(item => (
                <div className="cart-row" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>{item.unit}</p>
                    <b>₹{item.price}</b>
                  </div>
                  <div className="quantity">
                    <button onClick={() => changeQuantity(item.id, -1)}>−</button>
                    <b>{item.quantity}</b>
                    <button onClick={() => changeQuantity(item.id, 1)}>+</button>
                  </div>
                  <b>₹{item.price * item.quantity}</b>
                </div>
              ))}
              <button className="text-button" onClick={() => setCart([])}>
                Remove All Items
              </button>
            </div>

            <div className="summary-box">
              <h2>Order Summary</h2>
              <div className="summary-line"><span>Subtotal</span><b>₹{subtotal}</b></div>
              <div className="summary-line"><span>Delivery</span><b>{delivery === 0 ? "FREE" : `₹${delivery}`}</b></div>
              <div className="summary-line discount"><span>Discount</span><b>- ₹{discount}</b></div>
              <div className="coupon-entry">
                <input
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                  placeholder="Coupon code"
                />
                <button onClick={applyCoupon}>Apply</button>
              </div>
              {appliedCoupon && <p className="success-message">Coupon applied successfully!</p>}
              <hr />
              <div className="total-line"><span>Total Amount</span><b>₹{total}</b></div>
              <button
                className="primary-button full-button"
                onClick={() => {
                  if (!user) {
                    notify("Please login before checkout.");
                    navigate("login");
                  } else {
                    navigate("checkout");
                  }
                }}
              >
                Proceed to Checkout →
              </button>
              <p className="secure-note">🔒 Safe and secure demo checkout</p>
            </div>
          </div>
        )}
      </main>
    );
  }

  function CheckoutPage() {
    return (
      <main className="inner-page">
        <span className="eyebrow">ALMOST THERE</span>
        <h1>Secure Checkout</h1>
        <p>Enter your delivery information and choose your payment method.</p>

        <form className="checkout-layout" onSubmit={placeOrder}>
          <div className="cart-box">
            <h2>Delivery Information</h2>

            <label>Customer Name</label>
            <input value={user?.name || ""} readOnly />

            <label>Mobile Number</label>
            <input
              value={mobile || user?.mobile || ""}
              onChange={e => setMobile(e.target.value.replace(/\D/g, ""))}
              maxLength="10"
              placeholder="Enter 10-digit mobile"
              required
            />

            <label>Delivery Address</label>
            <textarea
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="House number, street, area, city, PIN code"
              required
            />

            <h2 className="payment-title">Choose Payment Method</h2>

            {["UPI", "Card", "Cash on Delivery"].map(method => (
              <label className="payment-option" key={method}>
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={payment === method}
                  onChange={e => setPayment(e.target.value)}
                />
                {method === "UPI" ? "📱 UPI / QR Demo" :
                  method === "Card" ? "💳 Debit / Credit Card Demo" :
                    "💵 Cash on Delivery"}
              </label>
            ))}

            {payment === "UPI" && (
              <div className="demo-payment">
                <h3>UPI Payment Demonstration</h3>
                <div className="fake-qr">DEMO<br />QR</div>
                <b>Amount: ₹{total}</b>
                <p>This is a visual payment demo, not a real payment QR.</p>
              </div>
            )}

            {payment === "Card" && (
              <div className="demo-note">
                Card payment is simulated for the college demonstration.
                No real card details are collected.
              </div>
            )}

            <button className="primary-button full-button" type="submit">
              Place Demo Order – ₹{total}
            </button>
          </div>

          <div className="summary-box">
            <h2>Order Summary</h2>
            {cart.map(item => (
              <div className="summary-line" key={item.id}>
                <span>{item.name} × {item.quantity}</span>
                <b>₹{item.price * item.quantity}</b>
              </div>
            ))}
            <hr />
            <div className="summary-line"><span>Subtotal</span><b>₹{subtotal}</b></div>
            <div className="summary-line"><span>Discount</span><b>-₹{discount}</b></div>
            <div className="summary-line"><span>Delivery</span><b>₹{delivery}</b></div>
            <div className="total-line"><span>Total</span><b>₹{total}</b></div>
          </div>
        </form>
      </main>
    );
  }

  function SuccessPage() {
    return (
      <main className="inner-page success-page">
        <div className="success-icon">✓</div>
        <span className="eyebrow">THANK YOU FOR SHOPPING</span>
        <h1>Order Placed Successfully!</h1>
        <p>Your FreshMart demo order has been saved in this browser.</p>
        {orderPlaced && (
          <div className="order-confirmation">
            <h2>Order Details</h2>
            <p>Order ID: <b>{orderPlaced.id}</b></p>
            <p>Payment: {orderPlaced.payment} (Demo)</p>
            <p>Total Amount: <b>₹{orderPlaced.total}</b></p>
            <p>Status: <span className="status">{orderPlaced.status}</span></p>
          </div>
        )}
        <button className="primary-button" onClick={() => navigate("orders")}>
          View My Orders
        </button>
        <button className="secondary-button" onClick={() => navigate("shop")}>
          Continue Shopping
        </button>
      </main>
    );
  }

  function OrdersPage() {
    return (
      <main className="inner-page">
        <span className="eyebrow">YOUR SHOPPING HISTORY</span>
        <h1>My Orders</h1>
        <p>View your previous FreshMart orders.</p>

        {orders.length === 0 ? (
          <div className="empty-state">
            <h2>No orders yet</h2>
            <button className="primary-button" onClick={() => navigate("shop")}>
              Start Shopping
            </button>
          </div>
        ) : orders.map(order => (
          <div className="order-card" key={order.id}>
            <div className="order-heading">
              <b>Order #{order.id}</b>
              <span className="status">{order.status}</span>
            </div>
            <p>{order.date}</p>
            {order.items.map(item => (
              <p key={item.id}>{item.name} × {item.quantity}</p>
            ))}
            <div className="order-heading">
              <span>Payment: {order.payment} (Demo)</span>
              <b>₹{order.total}</b>
            </div>
            <p>Delivery address: {order.address}</p>
          </div>
        ))}
      </main>
    );
  }

  function ProfilePage() {
    return (
      <main className="inner-page">
        <span className="eyebrow">YOUR ACCOUNT</span>
        <h1>My Profile</h1>
        <div className="profile-card">
          <div className="profile-avatar">👤</div>
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
          <p>{user?.mobile}</p>
          <button className="primary-button" onClick={() => navigate("orders")}>
            My Orders
          </button>
          <button className="secondary-button" onClick={logout}>Logout</button>
        </div>
      </main>
    );
  }

  function InformationPage({ contact = false }) {
    return (
      <main className="inner-page information-page">
        <span className="eyebrow">{contact ? "WE ARE HERE TO HELP" : "OUR STORY"}</span>
        <h1>{contact ? "Contact FreshMart" : "About FreshMart"}</h1>
        {contact ? (
          <>
            <p>We are happy to help with your shopping experience.</p>
            <div className="information-card">
              <h3>Customer Support</h3>
              <p>Email: support@freshmart.com</p>
              <p>Phone: +91 98765 43210</p>
              <p>Working Hours: Monday – Saturday</p>
            </div>
          </>
        ) : (
          <div className="information-card">
            <p>
              FreshMart is an online grocery store designed to make everyday
              grocery shopping convenient. Customers can explore fresh fruits,
              vegetables, dairy products, bakery items, snacks and beverages.
            </p>
            <p>
              Our aim is to provide a user-friendly online shopping experience
              with product search, shopping cart, discounts, customer
              registration and convenient demo checkout.
            </p>
          </div>
        )}
      </main>
    );
  }

  function PageContent() {
    switch (page) {
      case "home": return <HomePage />;
      case "shop": return <ShopPage />;
      case "wishlist": return <WishlistPage />;
      case "offers": return <OffersPage />;
      case "register": return <AuthPage isRegister />;
      case "login": return <AuthPage isRegister={false} />;
      case "cart": return <CartPage />;
      case "checkout": return <CheckoutPage />;
      case "success": return <SuccessPage />;
      case "orders": return <OrdersPage />;
      case "profile": return <ProfilePage />;
      case "about": return <InformationPage />;
      case "contact": return <InformationPage contact />;
      default: return <HomePage />;
    }
  }

  return (
    <div className="freshmart">
      {toast && <div className="toast">{toast}</div>}

      <Header />

      <PageContent />

      <Footer />
    </div>
  );
}

export default App;
