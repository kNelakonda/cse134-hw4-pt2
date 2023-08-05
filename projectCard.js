function init() {
console.log("hello World");
}

class ProjectCard extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        let projectTitle = document.createElement("h2");
        projectTitle.innerHTML = "Workout Buddy";
        this.shadowRoot.appendChild(projectTitle);
        let image = document.createElement("img");
        image.src = "./assets/ece196project.png";
        image.alt = "Image of my ECE 196 Project"
        this.shadowRoot.appendChild(image);
        let description = document.createElement("p");
        description.innerHTML = "This is a wearable device that connects to an iOS application that will count your reps for specific workouts, as well as the quality of the reps, and display it on the app.";
        this.shadowRoot.appendChild(description);
        let readMore = document.createElement("a");
        readMore.href = "https://github.com/gman-ui/ECE196Project/blob/main/index.md";
        readMore.innerHTML = "Read more about the project here";
        this.shadowRoot.appendChild(readMore);
    }
}


window.addEventListener('DOMContentLoaded', init);
window.customElements.define("project-card", ProjectCard);