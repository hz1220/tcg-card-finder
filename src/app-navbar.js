const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<header>
<script src="https://kit.fontawesome.com/a12281c58d.js" crossorigin="anonymous"></script>

<nav class="navbar has-shadow is-white">
    <div class="navbar-brand">
        <a href="home.html"><i class="fa fa-bolt fa-lg" id="icon"></i></a>
        <a class="navbar-icon" href="home.html">
        </a>
        <a class="navbar-burger" id="burger">
            <span></span>
            <span></span>
            <span></span>
        </a>
    </div>

    <div class="navbar-menu" id="nav-links">
        <div class="navbar-end">
            <a class="navbar-item is-hoverable" data-nav="home" href="home.html">Home</a>
            <a class="navbar-item is-hoverable" data-nav="app" href="app.html">App</a>
            <a class="navbar-item is-hoverable" data-nav="favorites" href="favorites.html">Favorites</a>
            <a class="navbar-item is-hoverable" data-nav="community" href="community.html">Community</a>
            <a class="navbar-item is-hoverable" data-nav="documentation" href="documentation.html">Documentation</a>
            
        </div>
    </div>
</nav>

</header>
`;

class Navbar extends HTMLElement {
    constructor() {
        super();
        // 1 - attach a shadow DOM tree to this instance - this creates `.shadowRoot` for us
        this.attachShadow({ mode: "open" });

        // 2 - Clone `template` and append it
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // get reference to the burgon icon to toggle the nav bar menu
        const burgerIcon = this.shadowRoot.querySelector('#burger');
        const navbarMenu = this.shadowRoot.querySelector('#nav-links');

        burgerIcon.addEventListener('click', () => {
            navbarMenu.classList.toggle('is-active');
        })

        window.addEventListener("load", () => {
            const navMenus = this.shadowRoot.querySelectorAll("a.navbar-item");
            const pathName = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1];
            navMenus.forEach(menu => {
                let href = menu.href.split("/");
                let currentHref = href[href.length - 1];
                if(pathName === currentHref) {
                    menu.style.background = "hsl(48, 100%, 67%)";
                }
            })
        })
    }

}
customElements.define('app-navbar', Navbar);

