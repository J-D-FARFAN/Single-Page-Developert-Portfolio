const inputs = document.querySelectorAll(".inputContact");
const messageErrors = document.querySelectorAll(".messageError");
const iconErrors = document.querySelectorAll(".bx-error-circle");
const emailForm = document.querySelector("#email");
const submitForm = document.querySelector(".submitForm");
const message = document.querySelector("#message");

const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
};

const validateInput = (input, index) => {
    const errorElement = messageErrors[index];
    const iconElement = iconErrors[index];

    const showError = () => {
        errorElement.style.display = "block";
        input.classList.add("activeErrorForm");
        input.classList.remove("activeSucessForm");
        iconElement.style.display = "block";
    };

    const hideError = () => {
        errorElement.style.display = "none";
        input.classList.remove("activeErrorForm");
        input.classList.add("activeSucessForm");
        iconElement.style.display = "none";
    };

    if (input === emailForm) {
        if (!validateEmail(input.value)) {
            showError();
            return false;
        }
    } else if (input.value === '') {
        showError();
        return false;
    }

    hideError();
    return true;
};

inputs.forEach((input, index) => {
    input.addEventListener("blur", () => validateInput(input, index));
    input.addEventListener("focus", () => {
        const errorElement = messageErrors[index];
        const iconElement = iconErrors[index];
        errorElement.style.display = "none";
        input.classList.remove("activeErrorForm", "activeSucessForm");
        iconElement.style.display = "none";
    });

    input.addEventListener("input", () => {
        if (input === emailForm) {
            if (!validateEmail(input.value)) {
                input.classList.remove("activeSucessForm");
                return;
            }
        } else if (input.value === '') {
            input.classList.remove("activeSucessForm");
            return;
        }
        input.classList.add("activeSucessForm");
    });
});

// Listener para cambiar el color del textarea #message
message.addEventListener("input", () => {
    if (message.value.trim() !== '') {
        message.classList.remove("activeErrorForm");
        message.classList.add("activeSucessForm");
    } else {
        message.classList.remove("activeSucessForm");
        message.classList.add("activeErrorForm");
    }
});

submitForm.addEventListener("click", (event) => {
    event.preventDefault();
    let isFormValid = true;

    inputs.forEach((input, index) => {
        if (!validateInput(input, index)) {
            isFormValid = false;
        }
    });

    if (isFormValid) {
        inputs.forEach((input, index) => {
            input.value = '';
            const errorElement = messageErrors[index];
            const iconElement = iconErrors[index];
            errorElement.style.display = "none";
            input.classList.remove("activeErrorForm", "activeSucessForm");
            iconElement.style.display = "none";
        });
        message.value = '';
        message.classList.remove("activeSucessForm", "activeErrorForm"); // Resetear clases de color
        console.log("Formulario enviado con éxito.");
    } else {
        console.log("Hay errores en el formulario. Por favor, corrígelos antes de enviar.");
    }
});
