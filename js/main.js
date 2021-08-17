import { getAllCountries } from "./services.js";
import { changeTheme, loadTheme } from "./utils.js";

loadTheme();

const countriesContainer = document.getElementById("countriesContainer");
const selectRegion = document.getElementById("selectRegion");
const inputSearch = document.getElementById("inputSearch");
let countriesCard;

changeTheme("toggleTheme");

const searchCountry = async (country) => {
  let request = await fetch(
    `https://restcountries.eu/rest/v2/name/${encodeURI(country?.trim())}`
  );
  let data = await request.json();
  if (data.status) {
    return [];
  }
  return data;
};

const renderCountries = (countries = [], countriesContainer) => {
  countriesContainer.innerHTML = "";
  if (countries.length === 0) {
    countriesContainer.innerHTML = "<p><b>Sin resultados<b></p>";
    return;
  }

  countries.forEach((country) => {
    let cardCountry = document.createElement("article");
    cardCountry.innerHTML = `<article class="country" data-country=${country.alpha3Code}>
        <div class="country-img-wrapper">
        <img src=${country.flag} alt="" class="country-img" />
        </div>
        <div class="country-info">
          <h3 class="country-name">${country.name}</h3>
          <p class="country-detail"><b>Population: </b>${country.population}</p>
          <p class="country-detail"><b>Region: </b>${country.region}</p>
          <p class="country-detail"><b>Capital: </b>${country.capital}</p>
        </div>
      </article>`;
    countriesContainer.appendChild(cardCountry);
  });
};

const filterCountriesByRegion = (
  selectRegion,
  countries,
  countriesContainer
) => {
  selectRegion.addEventListener("change", (e) => {
    let filtrados = countries.filter(
      (country) => country.region.toLowerCase() === e.target.value.toLowerCase()
    );
    renderCountries(filtrados, countriesContainer);
    // Luego de renderizar, obtenemos todos los elementos paises
    console.log("asignando link al detalle");
    countriesCard = Array.from(document.querySelectorAll(".country"));
    console.log(countriesCard);
    asignarEnlaceAbrirDetallePais(countriesCard);
  });
};

const asignarEnlaceAbrirDetallePais = (countriesElements = []) => {
  countriesElements.forEach((country) => {
    country.addEventListener("click", () => {
      document.location = `/rest-countries-api/countryDetails.html?country=${country.dataset.country}`;
      // window.open(`/rest-countries-api/countryDetails.html?country=${country.dataset.country}`);
    });
  });
};

const renderizadoInicial = () => {
  getAllCountries().then((countries) => {
    filterCountriesByRegion(selectRegion, countries, countriesContainer);
    renderCountries(countries, countriesContainer);
    // Luego de renderizar, obtenemos todos los elementos paises
    countriesCard = Array.from(document.querySelectorAll(".country"));
    asignarEnlaceAbrirDetallePais(countriesCard);
  });
};
renderizadoInicial();

// ===== Buscar país =====
inputSearch.addEventListener("keyup", (e) => {
  // Si el input esta vacio, renderizamos todos los paises
  if (e.target.value.trim().length === 0) {
    renderizadoInicial();
  }
  // Hacemos la busqueda
  searchCountry(e.target.value).then((data) => {
    // Renderizamos la data
    renderCountries(data, countriesContainer);
    // Luego de renderizar, obtenemos todos los elementos paises
    countriesCard = Array.from(document.querySelectorAll(".country"));
    asignarEnlaceAbrirDetallePais(countriesCard);
  });
});
