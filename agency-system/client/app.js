const API = "http://localhost:3000";

function loadDashboard() {
  document.getElementById("content").innerHTML = `
    <h2 class="text-2xl font-bold mb-6">Dashboard</h2>
    <div class="grid grid-cols-3 gap-6">
      <div class="bg-slate-800 p-6 rounded-xl">Clients</div>
      <div class="bg-slate-800 p-6 rounded-xl">Active Projects</div>
      <div class="bg-slate-800 p-6 rounded-xl">Pending Invoices</div>
    </div>
  `;
}

function loadClients() {
  fetch(API + "/clients")
    .then(res => res.json())
    .then(clients => {
      document.getElementById("content").innerHTML = `
        <h2 class="text-2xl font-bold mb-6">Clients</h2>
        <div class="space-y-4">
          ${clients.map(c => `
            <div class="bg-slate-800 p-4 rounded-lg">
              <p class="font-semibold">${c.name}</p>
              <p class="text-sm text-slate-400">${c.email}</p>
            </div>
          `).join("")}
        </div>
      `;
    });
}

function loadInvoices() {
  fetch(API + "/invoices")
    .then(res => res.json())
    .then(invoices => {
      document.getElementById("content").innerHTML = `
        <h2 class="text-2xl font-bold mb-6">Invoices</h2>
        ${invoices.map(i => `
          <div class="bg-slate-800 p-4 rounded-lg mb-4">
            <p>Invoice #${i.id}</p>
            <p>Amount: $${i.amount}</p>
            <p>Status: ${i.status}</p>
          </div>
        `).join("")}
      `;
    });
}

function logout() {
  localStorage.removeItem("auth");
  window.location.href = "login.html";
}

loadDashboard();
