function init() {
console.log("hello World");
}

class ProjectCard extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = "<h2>New web component, a project-card<h2>";
    }
}


window.addEventListener('DOMContentLoaded', init);
window.customElements.define("project-card", ProjectCard);