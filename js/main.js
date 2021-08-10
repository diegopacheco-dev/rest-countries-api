const getAllCountries = async () => {
  let request = await fetch("https://restcountries.eu/rest/v2/all");
  let data = await request.json();
  return data;
};

const renderCountries = (countries, idContainer) => {
  const countriesContainer = document.getElementById(idContainer);
  Array.from(countries).forEach((country) => {
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

getAllCountries().then((countries) => renderCountries(countries, 'countriesContainer'));

const filterCountries = () => {
    
}