/* MAISON AURORA — front-end demo interactions. Not production authentication. */
document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Footer year
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile navigation
  const toggle = $(".nav-toggle");
  const nav = $(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "✕" : "☰";
    });
    $$("a", nav).forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    }));
  }

  // Demo accounts are stored locally only. Never use this pattern for real authentication.
  const getAccounts = () => {
    try { return JSON.parse(localStorage.getItem("maisonDemoAccounts") || "[]"); }
    catch { return []; }
  };
  const saveAccounts = accounts => localStorage.setItem("maisonDemoAccounts", JSON.stringify(accounts));
  const setMessage = (id, text, isError = false) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = text;
      el.style.color = isError ? "#a33d32" : "#52613d";
    }
  };

  // Sign-up demo
  const signupForm = $("#signupForm");
  if (signupForm) signupForm.addEventListener("submit", event => {
    event.preventDefault();
    const name = $("#signupName").value.trim();
    const email = $("#signupEmail").value.trim().toLowerCase();
    const password = $("#signupPassword").value;
    const confirm = $("#confirmPassword").value;
    if (password !== confirm) return setMessage("signupMessage", "Passwords do not match.", true);
    const accounts = getAccounts();
    if (accounts.some(account => account.email === email)) {
      return setMessage("signupMessage", "An account with this email already exists. Please sign in.", true);
    }
    accounts.push({ name, email, password });
    saveAccounts(accounts);
    setMessage("signupMessage", "Account created in this browser! Taking you to sign in…");
    setTimeout(() => { window.location.href = "login.html"; }, 900);
  });

  // Sign-in demo
  const loginForm = $("#loginForm");
  if (loginForm) loginForm.addEventListener("submit", event => {
    event.preventDefault();
    const email = $("#loginEmail").value.trim().toLowerCase();
    const password = $("#loginPassword").value;
    const account = getAccounts().find(item => item.email === email && item.password === password);
    if (!account) return setMessage("loginMessage", "We couldn't find a matching demo account. Create an account first.", true);
    sessionStorage.setItem("maisonDemoUser", JSON.stringify({ name: account.name, email: account.email }));
    setMessage("loginMessage", `Welcome back, ${account.name}! Redirecting…`);
    setTimeout(() => { window.location.href = "index.html"; }, 800);
  });

  const accountLink = $("#accountLink");
  if (accountLink) {
    try {
      const user = JSON.parse(sessionStorage.getItem("maisonDemoUser") || "null");
      if (user) {
        accountLink.textContent = `Hi, ${user.name.split(" ")[0]} · Sign out`;
        accountLink.href = "#signout";
        accountLink.addEventListener("click", event => {
          event.preventDefault();
          sessionStorage.removeItem("maisonDemoUser");
          window.location.reload();
        });
      }
    } catch {}
  }

  // Demo password reminder — no email service is connected.
  const forgot = $("#forgotPassword");
  if (forgot) forgot.addEventListener("click", event => {
    event.preventDefault();
    setMessage("loginMessage", "Password recovery isn't connected in this front-end demo. Create a new demo account if needed.", true);
  });

  // Menu filters
  const filterButtons = $$(".filter-btn");
  if (filterButtons.length) {
    filterButtons.forEach(button => button.addEventListener("click", () => {
      filterButtons.forEach(item => item.classList.toggle("active", item === button));
      const filter = button.dataset.filter;
      $$(".menu-item").forEach(item => {
        item.hidden = filter !== "all" && item.dataset.category !== filter;
      });
    }));
  }

  // Reservation request demo: stored in this browser only.
  const reservationForm = $("#reservationForm");
  const dateInput = $("#reservationDate");
  if (dateInput) {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
    dateInput.min = localDate;
  }
  if (reservationForm) reservationForm.addEventListener("submit", event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(reservationForm).entries());
    const reservations = JSON.parse(localStorage.getItem("maisonDemoReservations") || "[]");
    reservations.push({ ...data, createdAt: new Date().toISOString() });
    localStorage.setItem("maisonDemoReservations", JSON.stringify(reservations));
    setMessage("reservationMessage", `Thank you, ${data.name}! Your demo request has been saved in this browser.`);
    reservationForm.reset();
  });

  // Newsletter demo
  const newsletterForm = $("#newsletterForm");
  if (newsletterForm) newsletterForm.addEventListener("submit", event => {
    event.preventDefault();
    const email = $("#newsletterEmail").value.trim();
    const subscriptions = JSON.parse(localStorage.getItem("maisonDemoNewsletter") || "[]");
    if (!subscriptions.includes(email)) subscriptions.push(email);
    localStorage.setItem("maisonDemoNewsletter", JSON.stringify(subscriptions));
    setMessage("newsletterMessage", "You're on the demo list — thank you!");
    newsletterForm.reset();
  });
});
