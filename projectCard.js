window.addEventListener('DOMContentLoaded', init);


function init() {
    saveLocal();
    getRemote().then( 
        document.getElementById("remote-button").disabled= false
    );
    
}

function createLocalData(title, image, alt, description, link){
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
    const project = createLocalData();
    const projectString = JSON.stringify(project);
    localStorage.setItem("project", projectString);
    document.getElementById("local-button").disabled= false;
}

class ProjectCard extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});

        let projectParts;
        if(localStorage.getItem("project")){
           projectParts = JSON.parse(localStorage.getItem("project"));
        } else {
            projectParts = JSON.parse(getRemote());
        }
         
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

async function getRemote(){
    const binID = "64cf310e9d312622a38cae1f";
    const key = "$2b$10$J/ZtAuCvdOmlswtSwYsTj.ubRUwEshZ4KJ/0pmKQC/oJKjkcF00ee";
    const root = "https://api.jsonbin.io/v3/b/";
    let data = await fetch(root + binID ,
        {
            method: "GET",
            headers: {
                'X-Master-Key': key,
            }
        }).then(response => {
            return response.json();
        });

    if (!data.record) {
        throw Error("Did not receive data");
    }
    return data.record;

}


function showProject(){
    let card = document.createElement("project-card");
    let body = document.getElementsByTagName('main')[0];
    body.appendChild(card);
}


window.customElements.define("project-card", ProjectCard);

