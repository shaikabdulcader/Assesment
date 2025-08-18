const babysitterForm = document.getElementById("babysitterForm");
const babysitterList = document.getElementById("babysitterList");

let babysitters = [];

// Form Submit Handler
babysitterForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get field values
  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const availability = document.getElementById("availability").value.trim();
  const rate = document.getElementById("rate").value.trim();
  const experience = document.getElementById("experience").value.trim();
  const notes = document.getElementById("notes").value.trim();

  // Clear previous errors
  document.querySelectorAll(".error").forEach(el => el.textContent = "");

  let valid = true;

  // Validation
  if (!name) { document.getElementById("nameError").textContent = "Name is required."; valid = false; }
  if (!age) { document.getElementById("ageError").textContent = "Age is required."; valid = false; }
  if (!contact) { document.getElementById("contactError").textContent = "Contact is required."; valid = false; }
  if (!availability) { document.getElementById("availabilityError").textContent = "Availability is required."; valid = false; }
  if (!rate) { document.getElementById("rateError").textContent = "Rate is required."; valid = false; }
  if (!experience) { document.getElementById("experienceError").textContent = "Experience is required."; valid = false; }

  if (!valid) return;

  // Add babysitter
  babysitters.push({ name, age, contact, availability, rate, experience, notes });
  renderTable();

  babysitterForm.reset();
});

// Render Table
function renderTable() {
  babysitterList.innerHTML = "";

  if (babysitters.length === 0) {
    babysitterList.innerHTML = `<tr><td colspan="8">No babysitters added yet.</td></tr>`;
    return;
  }

  babysitters.forEach((b, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${b.name}</td>
      <td>${b.age}</td>
      <td>${b.contact}</td>
      <td>${b.availability}</td>
      <td>$${b.rate}</td>
      <td>${b.experience} yrs</td>
      <td>${b.notes || "-"}</td>
      <td><button class="remove-btn" onclick="removeBabysitter(${index})">Remove</button></td>
    `;
    babysitterList.appendChild(row);
  });
}

// Remove Babysitter
function removeBabysitter(index) {
  babysitters.splice(index, 1);
  renderTable();
}
