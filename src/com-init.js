import {getDocs, collection, orderBy, query} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
import { db } from "./firebase.js";

import "./app-footer.js";
import "./app-header.js";
import "./app-card.js";
import "./app-navbar.js";

//display all cards from firebase
function displayCards(list) {
  let comDiv = document.querySelector("#popularCards");
  comDiv.innerHTML = "";
  for (let card of list) {
    let newDiv = document.createElement("app-card");
    newDiv.dataset.image = card.favorites;
    newDiv.dataset.counts = card.counts;
    comDiv.appendChild(newDiv);
  }
}

//order all cards in descending order from highest likes to lowest then display it
window.addEventListener("load", () => {
  const collectionReference = collection(db, "popularCards");
  const q = query(collectionReference, orderBy("counts", "desc"));

  getDocs(q).then((data) => {
    const favorites = [];
    data.docs.forEach((doc) => {
      favorites.push({ ...doc.data(), id: doc.id });
    });
    displayCards(favorites);
    console.log(favorites);
  });
});
