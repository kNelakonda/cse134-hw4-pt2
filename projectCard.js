window.addEventListener('DOMContentLoaded', init);


function init() {
    console.log("hello World");
    saveLocal();
    
}

function createData(title, image, alt, description, link){
    let myProject = {
        "project-title": "Project Title",
        "project-img": "./assets/ece196project.png",
        "project-img-alt": "Image of the Project",
        "project-desc": "Project description",
        "project-link": "Project link"
    };

    if(title){
        console.log("there is a title");
        myProject["project-title"] = title; 
    }
    if(image){
        myProject["project-img"] = image; 
    }
    if(alt){
        myProject["project-img-alt"] = alt; 
    }
    if(description){
        myProject["project-desc"] = description; 
    }
    if(link){
        myProject["project-link"] = link; 
    }
    myProject = {
        "project-title": "Workout Buddy",
        "project-img": "./assets/ece196project.png",
        "project-img-alt": "Image of my ECE 196 Project",
        "project-desc": "This is a wearable device that connects to an iOS application that will count your reps for specific workouts, as well as the quality of the reps, and display it on the app.",
        "project-link": "https://github.com/gman-ui/ECE196Project/blob/main/index.md"
    }

    return myProject;
}

function saveLocal(){
    const project = createData();
    const projectString = JSON.stringify(project);
    localStorage.setItem("project", projectString);
    document.getElementById("local-button").disabled= false;
}

class ProjectCard extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});

        const projectParts = JSON.parse(localStorage.getItem("project"));
        let cardHolder = document.createElement("article");
        this.shadowRoot.appendChild(cardHolder)
        let projectTitle = document.createElement("h2");
        projectTitle.innerHTML = projectParts["project-title"];
        cardHolder.appendChild(projectTitle);
        let image = document.createElement("img");
        image.src = projectParts["project-img"];
        image.alt = projectParts["project-img-alt"];
        cardHolder.appendChild(image);
        let description = document.createElement("p");
        description.innerHTML = projectParts["project-desc"];
        cardHolder.appendChild(description);
        let readMore = document.createElement("a");
        readMore.href = projectParts["project-link"];
        readMore.innerHTML = "Read more about the project here";
        cardHolder.appendChild(readMore);
        let styleSheet = document.createElement("style");
        styleSheet.innerHTML = `
        h2 {
            color: red;
        }

        article {
            border: 1px solid black;
            padding: 1%;
            margin-top: 1%;
            width: 25%;
        }
        `;
        this.shadowRoot.appendChild(styleSheet);

    }
}

function showProject(){
    let card = document.createElement("project-card");
    let body = document.getElementsByTagName('main')[0];
    console.log(body);
    body.appendChild(card);
    console.log("it's working!");
}


window.customElements.define("project-card", ProjectCard);