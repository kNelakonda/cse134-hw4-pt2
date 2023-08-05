function init() {
console.log("hello World");
}


class ProjectCard extends HTMLElement{
    constructor(){
        super();
        this.attachShadow();
    }
}


window.addEventListener('DOMContentLoaded', init);