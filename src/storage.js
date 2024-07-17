import {addDoc, collection, query, where, getDoc, doc, updateDoc, increment, onSnapshot, getDocs, setDoc,} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
import { db } from "./firebase.js";
const favoriteButton = document.querySelector("#favorite");

//localStorage data
const defaultData = {
    Deck: "My Deck",
    inputState: "",
    selectionState: "",
    appResultState: {},
    favorites: [],
  },
  storeName = "hz1220-p1-settings";

//read the data from localStorage and return them
const readLocalStorage = () => {
  let allValues = null;
  allValues = JSON.parse(localStorage.getItem(storeName)) || defaultData;
  return allValues;
};

//write data into localStorage
const writeLocalStorage = (allValues) => {
  localStorage.setItem(storeName, JSON.stringify(allValues));
};

//clear localStorage
const clearLocalStorage = () => writeLocalStorage(defaultData);

//add the card data to localStorage and firebase storage
const addFavorite = async () => {
  const id = document.querySelector("#art").dataset.id;
  const collectionRef = collection(db, "popularCards");
  const docRef = doc(db, "popularCards", id);
  const docSnap = await getDoc(docRef);
  console.log(docSnap.data());

  try {
    if (document.querySelector("#art").src != "./images/pHolderCard.jpg") {
      console.log("Saving!");
      favoriteButton.className = "button is-danger";
      favoriteButton.disabled = true;
      favoriteButton.innerHTML = "Favorited";
      const allValues = readLocalStorage();
      allValues.favorites.push(document.querySelector("#art").src);
      writeLocalStorage(allValues);
      if (docSnap.exists()) {
        await updateDoc(doc(db, "popularCards", id), {
          counts: increment(1),
        });
      } else {
        await setDoc(doc(collectionRef, id), {
          favorites: document.querySelector("#art").src,
          counts: increment(1),
          pokemonId: id,
        });
      }
    }
  } catch (error) {
    console.log(error);
    alert("oops Error saving to db");
  }
};

//get favorites from localStorage
const getFavorites = () => readLocalStorage().favorites;

//clear all favorites from localStorage
const clearFavorites = () => {
  const allValues = readLocalStorage();

  allValues.favorites = [];
  writeLocalStorage(allValues);
};

//take a particular favorite out of localStorage
const removeFav = (pokemon) => {
  const allValues = readLocalStorage();
  for (let i = 0; i < allValues.favorites.length; i++){
    if (allValues.favorites[i] == pokemon){
      allValues.favorites.splice(i, 1);
      writeLocalStorage(allValues);
    }
  }
}

export { defaultData, readLocalStorage, writeLocalStorage, clearLocalStorage, addFavorite, getFavorites, clearFavorites, removeFav};
