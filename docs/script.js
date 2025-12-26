document.getElementById("reportForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    name: this[0].value,
    location: this[1].value,
    details: this[2].value
  };

  const res = await fetch("http://localhost:5000/api/reports", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    document.getElementById("message").innerText =
      "Report submitted successfully";
    this.reset();
  }
});

