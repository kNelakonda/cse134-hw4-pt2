window.addEventListener('DOMContentLoaded', init);


function init() {
    saveLocal();
    getRemote().then( 
        document.getElementById("remote-button").disabled= false
    );
    
}

function createLocalData(){

    /*let projects = [];
    let myProject1 = {"project-title": "Workout Buddy", 
        "project-img": "./assets/ece196project.png",
        "project-img-alt": "Image of my ECE 196 Project",
        "project-desc": "This is a wearable device that connects to an iOS application that will count your reps for specific workouts, as well as the quality of the reps, and display it on the app.",
        "project-link": "https://github.com/gman-ui/ECE196Project/blob/main/index.md"
    };

    let myProject2 = {
        "project-title": "Tasseography",
        "project-img": "./assets/cse110project.png",
        "project-img-alt": "Image of my CSE 110 Project",
        "project-desc": "This is a project that is meant to simulate tea leave fortune telling, or Tasseography. You go through the actions of preparing and drinking tea, and based on the shape of the tea leaves at the bottom, you receive a fortune",
        "project-link": "https://github.com/cse110-sp23-group18/cse110-sp23-group18/blob/prod/README.md"
    };

    projects.push(JSON.stringify(myProject1));
    console.log("THIS IS myPROJECT1 " + projects[0]);
    console.log("THE TYPE OF OF myPROJECT1 " + typeof(projects[0]));
    console.log("NOW I PARSE myPROJECT1 INTO: " + JSON.parse(projects[0]));

    projects.push((myProject2));
    */
    let projects = {
        
        'project1' : {
            'project-title': 'Workout Buddy',
            'project-img': './assets/ece196project.png',
            'project-img-alt': 'Image of my ECE 196 Project',
            'project-desc': 'This is a wearable device that connects to an iOS application that will count your reps for specific workouts, as well as the quality of the reps, and display it on the app.',
            'project-link': 'https://github.com/gman-ui/ECE196Project/blob/main/index.md'
        },
        'project2' : {
            'project-title': 'Tasseography',
            'project-img': './assets/cse110project.png',
            'project-img-alt': "Image of my CSE 110 Project",
            'project-desc': 'This is a project that is meant to simulate tea leave fortune telling, or Tasseography. You go through the actions of preparing and drinking tea, and based on the shape of the tea leaves at the bottom, you receive a fortune',
            'project-link': 'https://github.com/cse110-sp23-group18/cse110-sp23-group18/blob/prod/README.md'
        }
    };
    
    console.log(Object.keys(projects));
    return JSON.stringify(projects);
}


function saveLocal(){
    const projects = createLocalData();
    //const projectString = JSON.stringify(project);
    localStorage.setItem("projects", projects);
    document.getElementById("local-button").disabled= false;
}

class ProjectCard extends HTMLElement{
    constructor(projectParts){
        super();
        this.attachShadow({mode: "open"});
        /*
        let projectParts;
        if(localStorage.getItem("projects")){
           projectParts = JSON.parse(localStorage.getItem("project"));
        } else {
            projectParts = JSON.parse(getRemote());
        }
        */
         
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
        }

        article > img {
            height: 100%;
            width: 100%;
        }
        `;
        this.shadowRoot.appendChild(styleSheet);

    }
}

async function getRemote(){
    const binID = "64cf310e9d312622a38cae1f";
    const key = "$2b$10$J/ZtAuCvdOmlswtSwYsTj.ubRUwEshZ4KJ/0pmKQC/oJKjkcF00ee";
    const root = "https://api.jsonbin.io/v3/b/";
    let data;
    try{
         data = await fetch(root + binID ,
            {
                method: "GET",
                headers: {
                    'X-Master-Key': key,
                }
            }).then(response => {
                return response.json();
            });
    } catch(error){
        console.error("An error fetching data. Error: " + error);
    }
    
    console.log(data.record);
    if (!data.record) {
        throw Error("Did not receive data");
    }
    return data.record;

}


function showProject(){
    let body = document.getElementsByTagName('main')[0];
    body.innerHTML = "";
    let projectParts;
    let projects = localStorage.getItem("projects");
    projects = JSON.parse(projects);
    let keys = Object.keys(projects);
    console.log(keys);
    //projects = JSON.parse(projects);
    if(projects){
        console.log(projects.length);
        for(let i = 0; i < keys.length; i++){
            let project = projects[keys[i]];
            console.log(typeof(projects[keys[i]]));
            let card = new ProjectCard(project);
            body.appendChild(card);

        }
       
    } else {
        projectParts = JSON.parse(getRemote());
    }

   
}


window.customElements.define("project-card", ProjectCard);

