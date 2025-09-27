const playerDiv = document.querySelector(".player");
const titleEl = document.querySelector("h2");
const descEl = document.querySelector("p");
const rightCol = document.querySelector(".right");
const videoEl = document.createElement("video");

fetch("data.json")
  .then((response) => response.json())
  .then((videos) => {
    videoEl.id = "mainVideo";
    videoEl.controls = false;
    videoEl.width = 730;
    videoEl.height = 350;
    playerDiv.appendChild(videoEl);

    loadVideo(videos[0]);
    rightCol.innerHTML = "";
    videos.forEach((vid) => {
      const div = document.createElement("div");
      div.className = "rdiv";
      div.innerHTML = `<img src="${vid.thumbnail}" alt="${vid.title}" style="width:100%; height:auto;">`;
      div.onclick = () => loadVideo(vid);
      rightCol.appendChild(div);
    });
    function loadVideo(vid) {
      videoEl.src = vid.file;
      titleEl.textContent = vid.title;
      descEl.textContent = vid.description;
      videoEl.autoplay = true;
      videoEl.load();
      videoEl.play();
    }
  });
