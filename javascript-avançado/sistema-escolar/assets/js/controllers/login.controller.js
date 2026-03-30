const auth = new Auth();

const form = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (errorMessage) {
        errorMessage.classList.add("d-none");
        errorMessage.textContent = "";
    }

    try {
        auth.login(email, password);
    } catch (error) {
        if (errorMessage) {
            errorMessage.textContent = error.message;
            errorMessage.classList.remove("d-none");
        }
    }
});
