const countriesContainer = document.getElementById("countriesContainer");
const selectRegion = document.getElementById("selectRegion");
const inputSearch = document.getElementById("inputSearch");
const formSearch = document.getElementById("formSearch");

const getAllCountries = async () => {
  let request = await fetch("https://restcountries.eu/rest/v2/all");
  let data = await request.json();
  console.log(data);
  return data;
};

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
    cardCountry.innerHTML = `<article class="country">
    
        <img src=${country.flag} alt="" class="country-img" />
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
  });
};

getAllCountries().then((countries) => {
  filterCountriesByRegion(selectRegion, countries, countriesContainer);
  renderCountries(countries, countriesContainer);
});

formSearch.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputSearch.value.trim().length === 0) {
    return;
  }
  searchCountry(inputSearch.value).then((data) =>
    renderCountries(data, countriesContainer)
  );
});
