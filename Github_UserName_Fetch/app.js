let form = document.querySelector(".form-data");
let username = document.querySelector("#username");
let show = document.querySelector(".display-data");

form.onsubmit = function (event) {
  event.preventDefault();
  let user = username.value;
  if (user) {
    getUser(user);
  }
};

function getUser(user) {
  fetch("https://api.github.com/users/" + user)
    .then(function (res) {
      if (!res.ok) {
        throw new Error("User not found");
      }
      return res.json();
    })
    .then(function (data) {
      let name = data.name || data.login;
      let img = data.avatar_url;
      let id = data.id;
      let loc = data.location || "N/A";
      let comp = data.company || "N/A";
      let link = data.html_url;
      show.innerHTML =
        '<img src="' +
        img +
        '" alt="' +
        name +
        '" />' +
        "<h2>" +
        name +
        "</h2>" +
        "<p><b>ID:</b> " +
        id +
        "</p>" +
        "<p><b>Location:</b> " +
        loc +
        "</p>" +
        "<p><b>Company:</b> " +
        comp +
        "</p>" +
        '<p><a href="' +
        link +
        '" target="_blank">GitHub Profile</a></p>';
    })
    .catch(function (error) {
      show.innerHTML = '<p style="color:red;">Error: ' + error.message + "</p>";
    });
}
