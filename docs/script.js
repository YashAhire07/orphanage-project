// document.getElementById("reportForm").addEventListener("submit", async function (e) {
//   e.preventDefault();

//   const data = {
//     name: this[0].value,
//     location: this[1].value,
//     details: this[2].value
//   };

//   const res = await fetch("https://orphanage-project-1.onrender.com/api/reports", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data)
//   });

//   if (res.ok) {
//     document.getElementById("message").innerText =
//       "Report submitted successfully";
//     this.reset();
//   }
// });

const form = document.getElementById("reportForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    location: document.getElementById("location").value,
    details: document.getElementById("details").value
  };

  try {
    const res = await fetch(
      "https://orphanage-project-1.onrender.com/api/reports",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }
    );

    if (res.ok) {
      message.innerHTML = "<span class='text-success fw-bold'>✅ Report submitted successfully!</span>";
      form.reset();
    } else {
      message.innerHTML = "<span class='text-danger'>❌ Failed to submit report</span>";
    }
  } catch (err) {
    message.innerHTML = "<span class='text-danger'>❌ Server error</span>";
  }
});
