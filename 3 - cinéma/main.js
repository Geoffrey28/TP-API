const cinemasList = document.querySelector('#cinemasList');
const btnNbrSeat = document.querySelector('#btnNbrSeat');

window.addEventListener('load', () => {
    showCinemas(false);
});

btnNbrSeat.addEventListener('click', () => {
    showCinemas(true);
});

function showCinemas(sort) {
    cinemasList.innerHTML = '';

    const url = "https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records?limit=20";
    fetch(url).then(response => response.json()).then(response => {
        let cinemas = response.results;
        if (sort) {
            cinemas.sort((a, b) => b.fauteuils - a.fauteuils);
        }
        for (let cinema of cinemas) {
            let li = document.createElement('li');
            li.classList.add('list-group-item');
            let name = document.createElement('h3');
            name.textContent = cinema.nom;
            let address = document.createElement('p');
            address.textContent = cinema.code_insee + ' ' + cinema.commune;
            let nbrSeat = document.createElement('p');
            nbrSeat.textContent = 'Nombre de places : ' + cinema.fauteuils;
            li.append(name, address, nbrSeat);
            cinemasList.append(li);
        }
    });
}

function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
        const currentlatitude = position.coords.latitude;
        const longitude = position.coords.longitude;
    });
}