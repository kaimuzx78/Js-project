let form = document.querySelector("#loginForm");

async function LoadData() {
  try {
    let load = await window.fetch("logindata.json");
    let Data = await load.json();
    console.log(Data);
  } catch (err) {
    console.log(err);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let username = document.getElementById("username").value.trim(); //trim se spcae hat jayega etc.. Example: "  hello  ".trim() returns "hello"
  let password = document.getElementById("password").value.trim();

  //load json
  let res = await fetch("logindata.json");
  let data = await res.json();

  //find user
  let found = data.find((u) => u.username === username);

  if (found && found.password == password) {
    //save the session
    sessionStorage.setItem("user", JSON.stringify(found));
    window.location.href = "welcome.html";
  } else {
    alert("Invalid username or password");
    document.getElementById("password").value = "";
  }
});
