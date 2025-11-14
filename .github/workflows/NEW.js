let currentPage = "login";

// Fade between pages
function fadeTo(target) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  setTimeout(() => {
    document.getElementById(target).classList.add('active');
    currentPage = target;
  }, 300);
}

// Login function with ESP32 security check
function login() {
  const user = document.getElementById('user-id').value;
  const pass = document.getElementById('password').value;

  fetch("http://192.168.1.10/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: user, password: pass })
  })
  .then(r => r.text())
  .then(result => {
    if (result === "OK") {
      fadeTo('menu-page');  // Login successful
    } else {
      alert("Wrong ID or Password");
      document.getElementById('password').value = '';
    }
  })
  .catch(err => {
    console.error("ESP32 not reachable:", err);
    alert("Cannot connect to ESP32. Check network.");
  });
}

// Menu -> Control page
function gotoControl() {
  fadeTo('control-page');
}

// Back navigation
function goBack() {
  if (currentPage === 'control-page') fadeTo('menu-page');
  else if (currentPage === 'menu-page') fadeTo('login-page');
}

// Lamp control
const lamp = document.getElementById('lamp');
function turnOn() {
  lamp.classList.add('on');
  console.log("Power System: ON");
}
function turnOff() {
  lamp.classList.remove('on');
  console.log("Power System: OFF");
}
