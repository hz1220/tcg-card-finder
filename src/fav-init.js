import "./app-footer.js";
import "./app-header.js";
import "./app-card.js";
import "./fav-card.js";
import "./app-navbar.js";
import * as favorite from "./app-fav.js";

window.onload = favorite.loadFav();
favorite.favInit();
