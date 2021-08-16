export const getAllCountries = async () => {
  let request = await fetch("https://restcountries.eu/rest/v2/all");
  let data = await request.json();
  return data;
};

export const getCountryByCode = async (codeCountry = "") => {
  const request = await fetch(`https://restcountries.eu/rest/v2/alpha/${codeCountry}`);
  const data = await request.json();
  return data;
};

export const getCountriesByListOfCodes = async (arrayOfCodes = "") => {
  let lista = arrayOfCodes.join(";");
  const request =
    await fetch(`https://restcountries.eu/rest/v2/alpha?codes=${lista}
      `);
  if (request.status === 400)return [];   
  const data = await request.json();
  return data;
};
