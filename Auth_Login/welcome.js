document.addEventListener("DOMContentLoaded", () => {
  let user = JSON.parse(sessionStorage.getItem("user"));

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  let welcomeText = document.getElementById("Welcome");
  welcomeText.textContent = `Welcome, ${user.username} (ID: ${user.id})`;

  let btn = document.createElement("button");
  btn.textContent = "Logout";
  btn.addEventListener("click", () => {
    sessionStorage.removeItem("user");
    window.location.href = "index.html";
  });

  document.body.appendChild(btn);
});
