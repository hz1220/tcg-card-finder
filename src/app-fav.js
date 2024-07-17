import * as storage from "./storage.js";

//ref to the clearFav button and init the whole program
function favInit(){
    document.querySelector("#clearFav").addEventListener('click', clearFav);
}

//get the data from localStorage and load in onto the page
function loadFav(){
    let list = storage.getFavorites();
    let favDiv = document.querySelector("#favorites");
    favDiv.innerHTML = "";
    for(let card of list){
        let newDiv = document.createElement("fav-card");
        newDiv.dataset.image = card;
        favDiv.appendChild(newDiv);        
    }
}

//clear localStorage
function clearFav(){
    storage.clearFavorites();
    loadFav();
    console.log("Cleared!");
}

export {favInit, loadFav, clearFav};