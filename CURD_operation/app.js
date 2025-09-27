// Fetch the data and display:

let tbody = document.querySelector("tbody");

async function fetchUserData() {
  let data = await window.fetch("http://localhost:8454/users/");
  let finalData = await data.json();

  // clear tbody first
  tbody.innerHTML = "";

  finalData?.forEach((v) => {
    let { name, id, email, phone } = v;
    tbody.innerHTML += `
    <tr>
      <td>${id}</td>
      <td>${name}</td>
      <td>${email}</td>
      <td>${phone}</td>
      <td>
        <button onclick="handleUpdate('${id}')">Update</button>
        <button onclick="readUserData('${id}')">Read</button>
        <button onclick="handleDelete(event, '${id}')">Delete</button>
      </td>
    </tr>
  `;
  });
}

fetchUserData();

//Display the pop form

let addSpanBtn = document.querySelector(".add-data");
let containerAdd = document.querySelector(".container-add");
let closeBtnAdd = document.querySelector(".fa-xmark");

addSpanBtn.onclick = (e) => {
  containerAdd.style.display = "flex";
  closeBtnAdd.addEventListener(
    "click",
    () => (containerAdd.style.display = "none")
  );
};

//ADD USER DATA

let addFormData = document.querySelector(".add-form-data");
addFormData.onsubmit = (e) => {
  e.preventDefault();
  let data = new FormData(addFormData);
  let fD = Object.fromEntries(data);
  addUserData(fD);
};

async function addUserData(FormData) {
  await window.fetch("http://localhost:8454/users", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(FormData),
  });
}

//read the data

async function readUserData(id) {
  let data = await window.fetch(`http://localhost:8454/users/${id}`);
  let finalData = await data.json();
  console.log(finalData);
}

let containerRead = document.querySelector(".container-read");
let closeReadBtn = document.querySelector(".close-read");

closeReadBtn.onclick = () => {
  containerRead.style.display = "none";
};

//display the readed ui data
async function readUserData(id) {
  let data = await window.fetch(`http://localhost:8454/users/${id}`);
  let finalData = await data.json();

  // fill in spans
  document.getElementById("read-id").textContent = finalData.id;
  document.getElementById("read-name").textContent = finalData.name;
  document.getElementById("read-email").textContent = finalData.email;
  document.getElementById("read-phone").textContent = finalData.phone;

  // show popup
  containerRead.style.display = "flex";
}

//Delete

let handleDelete = (e, id) => {
  console.log("Deleting...", id);
  let res = window.confirm("Paaka Delete karna hai na?");
  if (res) {
    window
      .fetch(`http://localhost:8454/users/${id}`, {
        method: "DELETE",
      })
      .then(() => {
        window.location.reload();
      });
  }
};

//UPDATE

function handleUpdate(id) {
  fetch(`http://localhost:8454/users/${id}`)
    .then((res) => res.json())
    .then((user) => {
      // create popup
      let popup = document.createElement("div");
      popup.className = "update-popup";
      popup.style.cssText = `
        position: fixed;
        top:0; left:0; width:100%; height:100%;
        display:flex; justify-content:center; align-items:center;
        background: rgba(0,0,0,0.5); z-index:1000;
      `;
      popup.innerHTML = `
        <div class="update-box" style="background:#fff; padding:20px; border-radius:8px; min-width:300px;">
          <h3>Update User</h3>
          <input type="text" class="upd-name" value="${user.name}" placeholder="Name"><br><br>
          <input type="text" class="upd-email" value="${user.email}" placeholder="Email"><br><br>
          <input type="text" class="upd-phone" value="${user.phone}" placeholder="Phone"><br><br>
          <button class="save-upd">Save</button>
          <button class="cancel-upd">Cancel</button>
        </div>
      `;
      document.body.appendChild(popup);

      // handle cancel
      popup.querySelector(".cancel-upd").onclick = () => popup.remove();

      // handle save
      popup.querySelector(".save-upd").onclick = () => {
        let updatedUser = {
          name: popup.querySelector(".upd-name").value,
          email: popup.querySelector(".upd-email").value,
          phone: popup.querySelector(".upd-phone").value,
        };
        fetch(`http://localhost:8454/users/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        }).then(() => {
          popup.remove();
          fetchUserData(); // refresh table
        });
      };
    });
}
