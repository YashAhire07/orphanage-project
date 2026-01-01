const form = document.getElementById("reportForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nameInput = document.getElementById("name").value.trim();
  const locationInput = document.getElementById("location").value.trim();
  const detailsInput = document.getElementById("details").value.trim();

  // Frontend validation
  if (!nameInput || !locationInput || !detailsInput) {
    message.innerHTML = "❌ All fields are required";
    message.style.color = "red";
    return;
  }

  try {
    const res = await fetch(
      "https://orphanage-project-1.onrender.com/api/reports",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: nameInput,
          location: locationInput,
          details: detailsInput
        })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      message.innerHTML = "❌ " + (data.message || "Submission failed");
      message.style.color = "red";
      return;
    }

    message.innerHTML = "✅ Report submitted successfully";
    message.style.color = "green";
    form.reset();

  } catch (error) {
    message.innerHTML = "❌ Server error";
    message.style.color = "red";
  }
});
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
};
document.getElementById("menuToggle").onclick = () => {
  document.getElementById("navLinks").classList.toggle("show");
};
