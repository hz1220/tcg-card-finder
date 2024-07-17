import "./app-footer.js";
import "./app-header.js";
import "./app-navbar.js";
import * as app from "./app-card.js";
import * as storage from "./storage.js";

app.appInit();
document.querySelector("#favorite").addEventListener('click', storage.addFavorite);