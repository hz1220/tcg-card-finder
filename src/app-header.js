const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<header>
<script src="https://kit.fontawesome.com/a12281c58d.js" crossorigin="anonymous"></script>
<h1 class="title has-text-warning has-background-link has-text-centered">
<a class="title has-text-warning" href="home.html">Pokemon TCG Card Finder</a></h1>
</header>
`;

class Header extends HTMLElement {
    constructor() {
        super();
        // 1 - attach a shadow DOM tree to this instance - this creates `.shadowRoot` for us
        this.attachShadow({ mode: "open" });

        // 2 - Clone `template` and append it
        this.shadowRoot.appendChild(template.content.cloneNode(true));


    }
}
customElements.define('app-header', Header);