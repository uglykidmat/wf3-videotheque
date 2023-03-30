//____________________________________________________SearchParam pour l'id du movie
let urlCurrent = new URL("http://127.0.0.1:5500/movie.html?movieid=");
let searchParams = new URLSearchParams(window.location.search);
let currentMovieId = searchParams.get("movieid");

//____________________________________________________On va fetch le json des Movies

let moviedataObj = {};

fetch("http://localhost:3000/api/movies")
    .then((response) => response.json())
    .then((moviedb) => {
        console.log(moviedb);
        moviedb.forEach((item) => {
                if(item._id == currentMovieId){
                    moviedataObj.titre = item.titre;
                    moviedataObj.realisateur = item.realisateur;
                    moviedataObj.dureeTotale = item.dureeTotale;
                    moviedataObj.description = item.description;
                    moviedataObj.img = item.imageUrl;

                    let titreFilm = document.createElement("h2");
                    titreFilm.innerText = moviedataObj.titre;
                    maincontainer.appendChild(titreFilm);

                    let imageFilm = document.createElement("img");
                    imageFilm.setAttribute("src", moviedataObj.img);
                    maincontainer.appendChild(imageFilm);

                    let descriptionFilmhtml = document.createElement("p");
                    descriptionFilmhtml.innerText = moviedataObj.description;
                    maincontainer.appendChild(descriptionFilmhtml);

                    return moviedataObj;
                }
                else {return}
        });
    console.log(moviedataObj);
    });
    
//____________________________________________________On affiche le titre de la page

const maincontainer = document.getElementById("maincontainer");
const bloctitre = document.querySelector("header");
let titrepage = document.createElement("h1");

let lienaccueil = document.createElement("a");
lienaccueil.setAttribute("href", "./index.html");
lienaccueil.innerText = "Vidéothèque";

titrepage.append(lienaccueil);
bloctitre.append(titrepage);