export const changeTheme = (idButton) => {
  const button = document.getElementById(idButton);
  const body = document.querySelector("body");
  button.addEventListener("click", () => {
    body.classList.toggle("darkmode");
    storeDarkmode(body.classList.contains("darkmode"));
    if (body.classList.contains("darkmode")) {
      button.innerHTML = `<i class="bx bx-moon"></i>
            Light Mode`;
    } else {
      button.innerHTML = `<i class="bx bx-moon"></i>
            Dark Mode`;
    }
  });
};

export const loadTheme = () => {
  const darkmode = localStorage.getItem("darkmode");
  
  if (!darkmode) {
    storeDarkmode("false");
} else if (darkmode == 'true') {
    document.querySelector("body").classList.add("darkmode");   
}
};

const storeDarkmode = (value) => {
  console.log("guardando el darkmode : ", value);
  localStorage.setItem("darkmode", value);
};
