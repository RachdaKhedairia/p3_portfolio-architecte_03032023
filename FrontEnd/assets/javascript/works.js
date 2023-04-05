//On stocke le contenu de l'API dans le loocalStorage pour pouvoir l'utiliser sur toutes les pages
const url = "http://localhost:5678/api/works";

//Récupère les données de tous les travaux
const fetchWorks = () => {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            getAll(data, 0);
        })
        .catch(function (err) {
            // Une erreur est survenue
        });
};

//Affichage des projets selon la catégorie
const getAll = (projets, categorie) => {
    //Vider la gallerie pour afficher les projets filtrés
    document.querySelector(".gallery").innerHTML = "";

    //Boucle d'affichage du projet
    for (let i = 0; i < projets.length; i++) {
        //Création de l'élément figcaption
        const figCaption = document.createElement("figcaption");
        figCaption.textContent = projets[i].title;

        //Création de l'élément img
        const img = document.createElement("img");
        img.src = projets[i].imageUrl;
        img.alt = projets[i].title;

        //Création de l'élément figure
        const figure = document.createElement("figure");
        figure.dataset.work = projets[i].id;

        //Assemblage des éléments
        figure.appendChild(img);
        figure.appendChild(figCaption);
        if (categorie == 0 || categorie == projets[i].category.id) {
            document.querySelector(".gallery").appendChild(figure);
        }
    }
};
fetchWorks();

//Récupération des catégories
fetch("http://localhost:5678/api/categories")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        setCategorie(data);
    })
    .catch(function (err) {
        // Une erreur est survenue
    });

//Affichage des catégories
const setCategorie = (categories) => {
    const filters = document.createElement("div");
    filters.classList.add("filters");
    const portfolio = document.querySelector("#portfolio");

    document.querySelector("#portfolio").insertBefore(filters, portfolio.children[1]);

    categories.unshift({ id: 0, name: "Tous" });

    //Affichage des catégories
    for (const categorie of categories) {
        const categorieElement = document.createElement("button");
        document.querySelector(".filters").appendChild(categorieElement);

        categorieElement.innerText = categorie.name;
        categorieElement.dataset.work = categorie.id;
        /*if (categorie.id == O) {
            categorieElement.classList.add("active");
        }*/

        //Création de l'EventListener
        categorieElement.addEventListener("click", () => {
            fetch(url)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    //Création d'une classe "active" pour garder le bouton de filtre actif
                    const buttons = document.querySelector(".filters").children;
                    console.log(buttons);
                    for (const button of buttons) {
                        button.classList.remove("active");
                    }
                    categorieElement.classList.add("active");
                    getAll(data, categorieElement.dataset.work);
                })
                .catch(function (err) {
                    // Une erreur est survenue
                });
        });
    }
};
