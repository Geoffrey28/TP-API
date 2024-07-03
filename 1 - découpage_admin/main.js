const form = document.querySelector('#form');
const regionsSelect = document.querySelector('#regions');
const departmentSelect = document.querySelector('#departments');
const citiesList = document.querySelector('#citiesList');

window.addEventListener('load', () => {
    loadRegions();
    loadDepartments();
});

regionsSelect.addEventListener('change', () => {
    loadDepartments();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    loadCities();
});

function loadRegions() {
    fetch('https://geo.api.gouv.fr/regions').then(response => response.json()).then(response => {
        for (let region of response) {
            let option = document.createElement('option');
            option.textContent = region.nom;
            option.value = region.code
            regionsSelect.append(option);
        }
    });
}


function loadDepartments() {
    departmentSelect.innerHTML = '';
    fetch('https://geo.api.gouv.fr/departements').then(response => response.json()).then(response => {
        for (let department of response) {
            if (regionsSelect.value === department.codeRegion) {
                let option = document.createElement('option');
                option.textContent = department.nom;
                option.value = department.code
                departmentSelect.append(option);
            }
        }
    });
}

function loadCities() {
    citiesList.innerHTML = '';
    fetch('https://geo.api.gouv.fr/communes').then(response => response.json()).then(response => {
        let cities = response;
        cities.sort((a, b) => b.population - a.population);
        for (let city of cities) {
            if (departmentSelect.value === city.codeDepartement) {
                console.log(city);
                let li = document.createElement('li');
                li.classList.add('list-group-item');
                let name = document.createElement('p');
                name.textContent = city.nom;
                let population = document.createElement('p');
                population.textContent = 'Population : ' + city.population;
                name.textContent = city.nom;
                li.append(name, population);
                citiesList.append(li);
            }
        }
    });
}