import { getCountryByCode, getCountriesByListOfCodes } from "./services.js";
import { changeTheme, loadTheme } from './utils.js'

loadTheme();

// Agregamos funcionalidad al boton back
const buttonBack = document.getElementById("buttonBack");
buttonBack.addEventListener("click", () => {
  document.location = "/rest-countries-api";
});

// Funcion que obtiene el valor de un queryparam
const obtenerValorDeQueryParams = (claveParam) => {
  const params = new URLSearchParams(window.location.search);
  const valueParam = params.get(claveParam);
  return valueParam;
};

const asignarEnlaceAbrirDetallePais = (countriesElements = []) => {
    countriesElements.forEach((country) => {
      country.addEventListener("click", () => {
        document.location = `/rest-countries-api/countryDetails.html?country=${country.dataset.country}`;
      });
    });
  };

// Funcion que renderiza los data del pais en un elemento contenedor
const renderizarPais = async (country, idContainer) => {
  const container = document.getElementById(idContainer);

  container.innerHTML = `<div class="country-details__img">
  <img src=${country.flag} alt="" />
</div>
<div class="country-details__info">
  <h2 class="country-name">${country.name}</h2>

  <div class="country-details__data">
    <div>
      <p class="country-detail"><b>Native Name: </b>${country.nativeName}</p>
      <p class="country-detail"><b>Population: </b>${country.population}</p>
      <p class="country-detail"><b>Region: </b>${country.region}</p>
      <p class="country-detail"><b>Sub Region: </b>${country.subregion}</p>
      <p class="country-detail"><b>Capital: </b>${country.capital}</p>
    </div>
    <div>
      <p class="country-detail"><b>Top Level Domain: </b>${
        country.topLevelDomain[0]
      }</p>
      <p class="country-detail"><b>Currencies: ${country.currencies
        .map((currency) => currency.name)
        .join(", ")}</b></p>
      <p class="country-detail">
        <b>Languages: </b>${country.languages
          .map((lang) => lang.name)
          .join(", ")}
      </p>
    </div>
  </div>

  <div class="country-details__border-countries">
    <p class="country-detail"><b>Border Countries: </b></p>
    <div class="border-countries-container">
    ${country.borders.length > 0? country.borders.map(
      (border) => `<button data-country=${border.alpha3Code}
      class="btn border-country">${border.name}</button>`
    ).join("") : "<p style='grid-column: 1 / -1'>- Country without borders</p>"}
      
    </div>
  </div>
</div>`;
};

changeTheme("toggleTheme");


// Consumimos la informacion del pais del queryparam
let countryName = obtenerValorDeQueryParams("country");
getCountryByCode(countryName).then((dataCountry) => {
  // Consumimos la info de los paises fronterizos
  getCountriesByListOfCodes(dataCountry.borders).then((countries) => {
    // Armamos el obj pais que renderizaremos
    let objCountry = {
      ...dataCountry,
      borders: countries,
    };

    // Renderizamos la info del objCountry
    renderizarPais(objCountry, "countryDetails");

    // Asinamos funcionalidad de ver el detalle de cada boton border-country
    let borderCountries = Array.from(document.querySelectorAll(".border-country"));
    asignarEnlaceAbrirDetallePais(borderCountries)
  });
});


