import * as storage from "./storage.js";
import "./app-card.js";

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
<button id="removeFav" class ="column is-vcentered">X</button>
<p id="counts"></p>
</div>
`;

class favCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.cardArt = this.shadowRoot.querySelector("#art");
    this.cardCounts = this.shadowRoot.querySelector("#counts");
    this.button = this.shadowRoot.querySelector("#removeFav");
  }

  connectedCallback() {
    this.cardArt.src = this.dataset.image;
    const pokemon = this.cardArt.src;
    this.button.addEventListener('click', function() {storage.removeFav(pokemon)});
    this.button.onclick = () => this.remove();
    if (this.dataset.counts)
      this.cardCounts.innerHTML = `${this.dataset.counts} Likes!`;
    }
}
customElements.define("fav-card", favCard);