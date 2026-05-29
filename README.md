# barenorth-store
Ecommerce store in JS vanilla

An ecommerce shoes marketplace web application built with HTML, TailwindCSS & vanilla JavaScript.  
Supports user signup/login, account balance management, products, cart, order details, checkout and transaction processing, transaction history, login logs with selfies, and an admin dashboard—all powered by LocalStorage.

---

## 🚀 Features

- **User Authentication**  
  - Sign up with basic validation  
  - Secure login with browser & biometric record 
- **Profile**  
  - View account number, current balance & login duration  
  - Upload/change profile photo or take one with your camera  
  - Change password with strength requirements  
- **Products and Home page**  
  - View products, cart items & prices  
  - add/change number of products in the cart  
  - remove cart items  
- **Money Transfer**  
  - Input account, CVV, expiration date  
  - Insufficient‑balance checks & success/failure popups  
  - History stores while transaction was success or failed  
- **History & Logs**  
  - Transaction history with column‑filtering, search, pagination  
  - Login history capturing timestamp, browser, email & selfie  
- **Admin Panel**  
  - “Super admin” login to view all users and their details  
  - “Super admin” can see the total transactions , failed transations and successful transaction
  - "Super admin" can also manage products by adding and removing them
  - "Super admin" has the record of all order history, transaction history and login history along with the email besides it  
  - **Login Logs**: review user login history with filters for date, browser, and location (with selfies)  
- **Tech Stack**  
  - TailwindCSS (via CDN) for rapid styling  
  - Vanilla JavaScript for DOM manipulation & LocalStorage persistence  
  - No backend—purely client‑side

---

## 📁 Project Structure

```
JSSS/
└── src/
    ├── .vscode/
    │   └── settings.json
    │
    ├── admin/
    │   ├── dashboard.html
    │   └── users.html
    │
    ├── IMG/
    │   ├── canon.png
    │   ├── jacket.png
    │   ├── kit.png
    │   ├── laptop.png
    │   └── toycar.png
    │
    ├── Imgs/
    │   ├── 1770734094459.png
    │   └── pfp.png
    │
    ├── Scripts/
    │   └── home.js
    │
    ├── biometric.html
    ├── checkout.html
    ├── home.html
    ├── input.css
    ├── Login.html
    ├── logs.html
    ├── orderpage.html
    ├── output.css
    ├── products.json
    ├── profilepage.html
    ├── signup.html
    └── transaction.html
```

---

## ⚙️ Installation & Running Locally

1. **Clone the repo**  
   ```bash
   git clone https://github.com/<your‑username>/barenorth-store.git
   cd JSSS
   ```
2. **Open in browser**  
   No build step—just open any `src/*.html` in your favorite browser.  
   Example:  
   ```bash
   open src/home.html
   ```
3. **Test the app**  
   - Sign up with a new email.  
   - Log in and explore dashboard, transfer money, view histories.

---

## 🛠️ Usage Notes

- All data (users, balances, transactions & logs) are stored in `localStorage`—clearing browser data resets the app.
- “Super admin” credentials:  
  - Email: `super@admin.com`  
  - Password: `12345678`
- Selfie capture requires a camera‑enabled device and browser permission.

