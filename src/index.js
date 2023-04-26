// write your code here
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/ramens")
    .then((res) => res.json())
    .then((data) => data.forEach(buildRamenCard));
  document.querySelector("#new-ramen").addEventListener("submit", addNewRamen);
});

function buildRamenCard(ramenObj) {
  const ramenMenuDiv = document.querySelector("#ramen-menu");
  let ramenPic = document.createElement("img");
  ramenPic.src = ramenObj.image;
  ramenPic.setAttribute("id", `${generateNewId()}`);
  ramenPic.addEventListener("click", showRamenInfo);
  ramenMenuDiv.append(ramenPic);
}

function showRamenInfo(e) {
  fetch(`http://localhost:3000/ramens/${e.target.id}`)
    .then((res) => res.json())
    .then((data) => {
      const infoDiv = document.querySelector("#ramen-detail");
      infoDiv.children[0].src = data.image;
      infoDiv.children[1].textContent = data.name;
      infoDiv.children[2].textContent = data.restaurant;
      document.querySelector("#rating-display").textContent = data.rating;
      document.querySelector("#comment-display").textContent = data.comment;
    });
}
const generateNewId = idCounterClosure();
function idCounterClosure() {
  let ourId = 0;
  return () => (ourId += 1);
}

function addNewRamen(e) {
  e.preventDefault();
  firstEvent = e;
  let newRamen = document.createElement("img");
  newRamen.src = e.target.querySelector("#new-image").value;
  newRamen.setAttribute("id", `${generateNewId()}`);
  newRamen.addEventListener("click", () => {
    console.log(firstEvent.target);
    const infoPic = document.querySelector("#ramen-detail");
    infoPic.children[0].src = newRamen.src;
    infoPic.children[1].textContent =
      firstEvent.target.querySelector("#new-name").value;
    infoPic.children[2].textContent =
      firstEvent.target.querySelector("#new-restaurant").value;
    document.querySelector("#rating-display").textContent =
      firstEvent.target.querySelector("#new-rating").value;
    document.querySelector("#comment-display").textContent =
      firstEvent.target.querySelector("#new-comment").value;
  });
  document.querySelector("#ramen-menu").append(newRamen);
}
