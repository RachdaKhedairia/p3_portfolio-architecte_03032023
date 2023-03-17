//On stocke le contenu de l'API dans le loocalStorage pour pouvoir l'utiliser sur toutes les pages
const url = "http://localhost:5678/api/works";
fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        getAll(data);
    })
    //Si le fetch ne fonctionne pas
    .catch(console.log("error")); 
//function getAll(data) {} = ligne 14
//Récupération des projets
const getAll = (projets) => {
    for (let i = 0; i< projets.length; i++) {
        //Création de l'élément figcaption
        const figCaption = document.createElement("figcaption");
        figCaption.textContent = projets[i].title;

        //Création de l'élément img
        const img = document.createElement("img");
        img.src = projets[i].imageUrl;
        img.alt = projets[i].title;

        //Création de l'élément figure
        const figure = document.createElement ("figure");
        figure.dataset.work = projets[i].id;

        //Assemblage des éléments
        figure.appendChild(img);
        figure.appendChild(figCaption);       
        document
            .querySelector(".gallery")
            .appendChild(figure)
    }
}



