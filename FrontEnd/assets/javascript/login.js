const element = {
    email: document.querySelector("#email"),
    password: document.querySelector("#password"),
    submit: document.querySelector("#submit"),
};

const buttonLogin = element.submit.addEventListener("click", (e) => {
    e.preventDefault();
    const login = "http://localhost:5678/api/users/login";

    fetch(login, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: element.email.value,
            password: element.password.value,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            const token = data.token;
            const isConnected = true;

            if (data.message || data.error) {
                alert("La paire identifiant - mot de passe est incorrecte.");
            }
            else {
                localStorage.setItem("isConnected", isConnected);
                localStorage.setItem("token", token);
                window.location.href = "./index.html";
            }
            console.log(token, isConnected);
        })
        .catch(function (err) {
            // Une erreur est survenue
        });
});
