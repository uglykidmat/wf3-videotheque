//____________________________________________________Setup URL

let urlIndex = new URL("http://127.0.0.1:5500");
let searchParams = new URLSearchParams(window.location.search);

//____________________________________________________DISPLAY TITRE DE LA PAGE

const maincontainer = document.getElementById("maincontainer");
const bloctitre = document.querySelector("header");
let titrepage = document.createElement("h1");

let lienaccueil = document.createElement("a");
lienaccueil.setAttribute("href", "./index.html");
lienaccueil.innerText = "Vidéothèque";

titrepage.append(lienaccueil);
bloctitre.append(titrepage);

//____________________________________________________Initialisation variable pour display durée complète vidéothèque

let totalvideothequeplaytime = 0;

//____________________________________________________FETCH des données backend (penser à lancer "nodemon start" dans le dossier "API_videotheque")
console.log(fetch("http://localhost:3000/api/movies"));

//____________________________________________________DISPLAY DB MOVIES / Page build
//____________________________________________________Obligé de mettre dans une fonction pour le "totalplaytime" car fetch est asynchrone
//____________________________________________________cf https://stackoverflow.com/questions/68422853/javascript-use-variable-outside-of-fetch-function
const getGlobalInfo = async() => {
    await fetch("http://localhost:3000/api/movies")
    .then(response => response.json())
    .then(data => data.forEach(movie => {
        console.log(movie);

        let moviediv = document.createElement("div");
        moviediv.setAttribute("class","divcontenu");

        //______Clic vers Vue single
        let searchParamMovieId = movie._id;
        let urlMovie = new URL("http://127.0.0.1:5500/movie.html?movieid="+searchParamMovieId);
        console.log(urlMovie);
        console.log(searchParams);
        
        let movieLinkBlock = document.createElement("a");
        movieLinkBlock.setAttribute("href",urlMovie);
        moviediv.append(movieLinkBlock);
        //____________________________________________________Titre etc
        let movietitle = document.createElement("h3");
        movietitle.innerHTML = movie.titre;

        let movieplaytimeminutes = document.createElement("p");
        movieplaytimeminutes.innerHTML = movie.dureeTotale + " minutes";
        //____________________________________________________le fameux playtime
        totalvideothequeplaytime += movie.dureeTotale;
        //____________________________________________________On injecte les éléments dans la page HTML
        maincontainer.appendChild(moviediv);
        movieLinkBlock.append(movietitle);
        movieLinkBlock.append(movieplaytimeminutes)

    }))
    //____________________________________________________On peut récupérer la durée totale pour l'afficher sous le titre
    let totalmoviesplaytimeDiv = document.createElement("h2");
    totalmoviesplaytimeDiv.innerText = "Cette collection fait "+ totalvideothequeplaytime + " minutes au total, ou environ " + Math.round(totalvideothequeplaytime/60)+ " heures.";
    bloctitre.appendChild(totalmoviesplaytimeDiv);
    console.log("MINUTES TOTAL : "+totalvideothequeplaytime);
}

//____________________________________________________On lance la fonction précédemment construite
getGlobalInfo();