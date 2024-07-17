import * as storage from "./storage.js";

//references for the favorite buttons (used to add favorites and disable the button)
const favoriteButton = document.querySelector("#favorite");

const disabledFavoriteButton = document.createElement("div");
disabledFavoriteButton.id = "favorite";
disabledFavoriteButton.className = "button is-danger";
disabledFavoriteButton.setAttribute("disabled", true);
disabledFavoriteButton.innerHTML = "Favorited";

disabledFavoriteButton.id = "favorite";
disabledFavoriteButton.className = "button is-warning";
disabledFavoriteButton.innerHTML = "Favorite";

//custom card element
const template = document.createElement("template");
template.innerHTML = `
<style>
    :host{        
    }
    img{
        display: block;
        width: 220px;
        width: 250px;        
    }
    div{
        padding-left: 3rem;
        padding-top: 1rem;
    }
</style>
<div class = "column is-vcentered resultDiv">
<img src="" alt="result image" id="art" class="column">
<p id="counts"></p>
</div>
`;

class customCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.cardArt = this.shadowRoot.querySelector("#art");
    this.cardCounts = this.shadowRoot.querySelector("#counts");
  }

  connectedCallback() {
    this.cardArt.src = this.dataset.image;
    if (this.dataset.counts)
      this.cardCounts.innerHTML = `${this.dataset.counts} Likes!`;
    }
}
customElements.define("app-card", customCard);

//ref to the search button and init the whole program once clicked
//set up UI state preservation as well
function appInit() {
  const storageState = storage.readLocalStorage();
  const inputStates = JSON.stringify(storageState.inputState);
  const selectionStates = JSON.stringify(storageState.selectionState).slice(3, -2);
  const appStateEmpty = JSON.stringify(storageState.appResultState) === "{}" ? true : false;
  if (appStateEmpty) {
    storage.writeLocalStorage(storage.defaultData);
  } 
  
  else {
    const inputField = document.querySelector("#input");
    const selection = document.querySelector("#selector");
    inputField.value = storageState.inputState;
    selection.value = storageState.selectionState;
    loadResults(storageState.appResultState);
    firstResult(storageState.appResultState.data[0]);
    output.innerText = `More results for "${selectionStates}" ${inputStates} Below:`;
  }
  const search = document.querySelector("#searchButton");
  search.addEventListener("click", getData);
}

//get the data from the api using fetch and load it
function getData() {
  const input = document.querySelector("#input").value.trim();
  const selection = document.querySelector("#selector").value;
  let output = document.querySelector("#output");

  if (input != "") {
    output.innerText = "Loading...";
    let url = `https://api.pokemontcg.io/v2/cards?${selection}${input}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.data.length != 0) {
          firstResult(data.data[0]);
          loadResults(data);
          const allValues = storage.readLocalStorage();
          allValues.appResultState = data;
          allValues.inputState = input;
          allValues.selectionState = selection;
          storage.writeLocalStorage(allValues);
          output.innerHTML = `More results for "${input}" Below:`;
          console.log(data);
        } 
        else {
          output.innerHTML = `Can't find any Pokemon cards with the name "${input}" D;`;
        }
      });
  } 
  else {
    output.innerHTML = "Please enter a search term!";
  }
}

//disable the favorite button when it has been clicked
function setFavoriteButton() {
  favoriteButton.className = "button is-danger";
  favoriteButton.disabled = true;
  favoriteButton.innerHTML = "Favorited";
}

//reset the favorite button
function setFavoritedButton() {
  favoriteButton.className = "button is-warning";
  favoriteButton.disabled = false;
  favoriteButton.innerHTML = "Favorite";
}

//replace the placeholder image with the first result
//disable button is it already has been favorited
function firstResult(data) {
  const storageState = storage.readLocalStorage();
  const favoriteState = storageState.favorites;
  const imageURL = data.images.large;
  const isFavorited = favoriteState.some((url) => url === imageURL);
  if (isFavorited) {
    favoriteButton.className = "button is-danger";
    favoriteButton.disabled = true;
    favoriteButton.innerHTML = "Favorited";
  } 
  else {
    favoriteButton.className = "button is-warning";
    favoriteButton.disabled = false;
    favoriteButton.innerHTML = "Favorite";
  }
  document.querySelector("#name").innerHTML = `Name: ${data.name}`;
  document.querySelector("#types").innerHTML = `Types: ${data.types}`;
  document.querySelector("#rarity").innerHTML = `Rarity: ${data.rarity}`;
  document.querySelector("#purchase").setAttribute('href', data.tcgplayer.url);
  document.querySelector("#artist").innerHTML = `Artist: ${data.artist}`;

  document.querySelector("#art").src = data.images.large;
  document.querySelector("#art").dataset.id = data.id;
}

//make the clicked card the top result then return to top
//disable button is it already has been favorited
function makeFirstResult(e) {
  const storageState = storage.readLocalStorage();
  const favoriteState = storageState.favorites;
  const imageURL = e.target.dataset.image;
  const isFavorited = favoriteState.some((url) => url === imageURL);
  console.log(isFavorited);
  if (isFavorited) {
    favoriteButton.className = "button is-danger";
    favoriteButton.disabled = true;
    favoriteButton.innerHTML = "Favorited";
  } 
  else {
    favoriteButton.className = "button is-warning";
    favoriteButton.disabled = false;
    favoriteButton.innerHTML = "Favorite";
  }
  document.querySelector("#name").innerHTML = `Name: ${e.target.dataset.name}`;
  document.querySelector("#types").innerHTML = `Types: ${e.target.dataset.types}`;
  document.querySelector("#rarity").innerHTML = `Rarity: ${e.target.dataset.rarity}`;
  document.querySelector("#purchase").setAttribute('href', e.target.dataset.purchase);
  document.querySelector("#artist").innerHTML = `Artist: ${e.target.dataset.artist}`;

  document.querySelector("#art").src = e.target.dataset.image;
  document.querySelector("#art").dataset.id = e.target.dataset.id;
  scrollToTop();
}

//jump to top of page
function scrollToTop() {
  window.scrollTo(0, 0);
}

//loop through results and add them to the results div
function loadResults(json) {
  let resultsDiv = document.querySelector("#results");
  resultsDiv.innerHTML = "";
  for (let card of json.data) {
    if (card.images.large != null) {
      let newDiv = document.createElement("app-card");
      newDiv.dataset.image = card.images.large;
      newDiv.dataset.name = card.name;
      newDiv.dataset.types = card.types;
      newDiv.dataset.rarity = card.rarity;
      newDiv.dataset.purchase = card.tcgplayer?.url;
      newDiv.dataset.artist = card.artist;
      newDiv.dataset.id = card.id;
      newDiv.addEventListener("click", makeFirstResult);

      resultsDiv.appendChild(newDiv);
    }
  }
}

export { appInit, getData, firstResult, makeFirstResult, scrollToTop, loadResults, setFavoriteButton, setFavoritedButton};
