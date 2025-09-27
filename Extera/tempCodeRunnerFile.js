fetch("https://jsonplaceholder.typicode.com/posts")
  .then((res) => res.json())
  .catch((err) => console.log(err));
