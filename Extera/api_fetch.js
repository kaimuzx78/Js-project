"use strict";
//1st way to fetch api data using fetch method

let h = document.querySelector(".h1");

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((response) => {
    const f1 = ([response] = response);
    const { userId, id, title } = response;
    console.log(userId, id, title);
  })
  .catch((err) => console.log(err));

//async await
async function getData() {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    let data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(error);
  }
}

const getData1 = () => {
  return fetch(`https://jsonplaceholder.typicode.com/posts`).then((res) =>
    res.json()
  );
};

getData1()
  .then((res) => {
    let { title, body, id } = res[0];
    h.innerHTML = title;
    h.innerHTML = body;
    h.innerHTML = id;
  })
  .catch((error) => console.error(err));
