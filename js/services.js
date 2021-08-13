export const getAllCountries = async () => {
  let request = await fetch("https://restcountries.eu/rest/v2/all");
  let data = await request.json();
  return data;
};

export const getCountryByName = async (nameCountry = "") => {
  const request =
    await fetch(`https://restcountries.eu/rest/v2/name/${nameCountry}
      `);
  const data = await request.json();
  return data;
};

export const getCountriesByListOfCodes = async (arrayOfCodes = "") => {
  let lista = arrayOfCodes.join(";");
  const request =
    await fetch(`https://restcountries.eu/rest/v2/alpha?codes=${lista}
      `);
  const data = await request.json();
  return data;
};
