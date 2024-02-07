/*
    - Nom du fichier : API_GIF.js
    - Type : fonctionnement
    - Language(s) : JS / JQUERY
*/

/* PARTIE 01 ==> ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- GENERAL ==> */
    const apiKeyAPIGIF = 'AXhqoAacAXRevxc3pOqNZl6gBAEDEnSz'; // clef API

    const buttonP3Down = document.querySelector('.P3_downgift');
    let bubbleContainer;
/* <== PARTIE 01 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- <== GENERAL */

/* PARTIE 02 ==> ------------------------------------------------------------------------------------------------------------------------------------------------------------- RECHERCHE DE GIFS ==> */
    function searchGif() {
        /*const apiKeyAPIGIF = 'AXhqoAacAXRevxc3pOqNZl6gBAEDEnSz'; // Remplacez par votre clé API Giphy*/
        const searchTermAPIGIF = document.getElementById('searchInput').value; // valeur de la zone de saisie

        // Construire l'URL de l'API Giphy sans limiter le nombre de résultats
        const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKeyAPIGIF}&q=${searchTermAPIGIF}`;

        // Effectuer la requête HTTP
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Récupérer tous les GIF de la réponse
            const gifs = data.data;

            // Afficher tous les GIF
            displayGifs(gifs);
        })
        .catch(error => console.error('Erreur de requête :', error));
    }
/* <== PARTIE 02 ------------------------------------------------------------------------------------------------------------------------------------------------------------- <== RECHERCHE DE GIFS */

/* PARTIE 03 ==> ---------------------------------------------------------------------------------------------------------------------------------------------------- BULLE D'AFFICHAGE DES GIFS ==> */
    buttonP3Down.addEventListener('click', function (event) {
        // Supprimer la bulle si elle existe déjà
        if (bubbleContainer) {
            bubbleContainer.remove();
            bubbleContainer = null;
            return;
        }

        // Créer la bulle cliquable
        bubbleContainer = document.createElement('div');
        bubbleContainer.classList.add('bubble-container');

        // Positionner la bulle cliquable juste en dessous du bouton
        const buttonRect = buttonP3Down.getBoundingClientRect();
        bubbleContainer.style.top = buttonRect.bottom + 'px';
        bubbleContainer.style.left = buttonRect.left + 'px';
        
        // En-tête "envoyer GIF"
        const header = document.createElement('div');
        header.classList.add('header');
        header.innerHTML = `<input type="text" id="searchInput" placeholder="Rechercher un GIF">
        <button onclick="searchGif()">voir</button>`;

        bubbleContainer.appendChild(header);

        // Créer la grille 5x6
        const grid = document.createElement('div');
        grid.classList.add('grid');
        bubbleContainer.appendChild(grid);

        // Ajouter la bulle cliquable à la page
        document.body.appendChild(bubbleContainer);

        // Gestionnaire d'événements pour fermer la bulle si l'utilisateur clique ailleurs
        document.addEventListener('click', function (event) {
            if (!bubbleContainer.contains(event.target) && event.target !== buttonP3Down) {
                bubbleContainer.remove();
                bubbleContainer = null;
            }
        });
    });
/* <== PARTIE 03 ---------------------------------------------------------------------------------------------------------------------------------------------------- <== BULLE D'AFFICHAGE DES GIFS */

/* PARTIE 04 ==> ----------------------------------------------------------------------------------------------------------------------------------------------------- SAUVEGARDER LE GIF ENVOYE ==> */
function sauvegarderMessage(messageObjet) { //sauvegarde
        // Implémentez ici la logique pour sauvegarder l'objet JSON
        console.log('Message sauvegardé :', messageObjet);
    }
/* <== PARTIE 04 ----------------------------------------------------------------------------------------------------------------------------------------------------- <== SAUVEGARDER LE GIF ENVOYE */
    
/* PARTIE 05 ==> -------------------------------------------------------------------------------------------------------------------------------------------- AFFICHAGE RESUSULTAT DANS LA BULLE ==> */
function displayGifs(gifs) { //affichage gif
        const grid = document.querySelector('.grid'); // Sélectionnez la grille

        // Effacer le contenu précédent
        grid.innerHTML = '';

        // Afficher chaque GIF dans une balise img
        i="001";

        gifs.forEach(gif => {
            const gifUrl = gif.images.downsized.url;

            const cell = document.createElement('div');
            cell.classList.add('cell');

            const img = document.createElement('img');
            img.classList.add('gifResultat');
            img.setAttribute('id', 'gifChoisi' + i);
            img.src = gifUrl;
            img.alt = 'GIF';
            img.style.width = '50px';
            img.style.height = '50px';

            // Ajouter un écouteur d'événements pour le clic sur la cellule
            cell.addEventListener('click', function () {
                // Récupérer le lien de l'image (vous devrez peut-être ajuster cela en fonction de la façon dont vous souhaitez obtenir le lien)
                const imgElement = this.querySelector('.gifResultat');
                const imageLink = imgElement.getAttribute('src');
                console.log(imageLink);

                // Enregistrer dans l'historiqueS_messages.JSON
                const messageObjet = {
                    tableauTimestamp: Date.now(),
                    typeDuMessage: 'GIPHY',
                    tableauMessage: imageLink
                };
                sauvegarderMessage(messageObjet);
            });
            cell.appendChild(img); // Ajouter l'image à la cellule
            grid.appendChild(cell); // Ajouter la cellule à la grille
            i++;
        });
    }
/* <== PARTIE 05 -------------------------------------------------------------------------------------------------------------------------------------------- <== AFFICHAGE RESUSULTAT DANS LA BULLE */
