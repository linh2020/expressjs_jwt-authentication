const formDOM = document.querySelector(".form");
const usernameInputDOM = document.querySelector(".username-input");
const passwordInputDOM = document.querySelector(".password-input");
const formAlertDOM = document.querySelector(".form-alert");
const resultDOM = document.querySelector(".result");
const btnDOM = document.querySelector("#data");
const tokenDOM = document.querySelector(".token");

formDOM.addEventListener("submit", async (e) => {
  formAlertDOM.classList.remove("text-success");
  tokenDOM.classList.remove("text-success");

  e.preventDefault();
  const username = usernameInputDOM.value;
  const password = passwordInputDOM.value;
  //   console.log(username, password);

  try {
    const { data } = await axios.post("/api/v1/login", { username, password });
    console.log(data);
    /*  Just for testing
        msg:    "user created"
        token:  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsInVzZXJuYW1lIjoiYWFhYSIsImlhdCI6MTcxNjQ1MTI0MCwiZXhwIjoxNzE2NDUxNTQwfQ.VymI4OdqWDbVKvDE_3FcdvYZQo2bzkVDH2L4Ii8w6Ec"
    */

    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = data.msg; // user created

    formAlertDOM.classList.add("text-success");
    usernameInputDOM.value = "";
    passwordInputDOM.value = "";

    localStorage.setItem("token", data.token);
    resultDOM.innerHTML = "";
    tokenDOM.textContent = "Token Present";
    tokenDOM.classList.add("text-success");
  } catch (error) {
    console.log(error.response); // msg: "Please provide email and password"
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = error.response.data.msg;
    localStorage.removeItem("token");
    resultDOM.innerHTML = "";
    tokenDOM.textContent = "No token present";
    tokenDOM.classList.remove("text-success");
  }
  setTimeout(() => (formAlertDOM.style.display = "none"), 2000); // Please Provide Email And Password
});

btnDOM.addEventListener("click", async () => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await axios.get("/api/v1/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(data);

    resultDOM.innerHTML = `<h5>${data.msg}</h5><p>${data.secret}</p>`;
  } catch (error) {
    console.log(error.response);
    localStorage.removeItem("token");
    resultDOM.innerHTML = `<p>${error.response.data.msg}</p>`;
  }
});

const checkToken = () => {
  tokenDOM.classList.remove("text-success");
  const token = localStorage.getItem("token");
  if (token) {
    tokenDOM.textContent = "Token Present";
    tokenDOM.classList.add("text-success");
  }
};

checkToken();
