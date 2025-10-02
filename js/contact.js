document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');

    if (!form) return;

    const fields = {
        nombre: form.querySelector('input[name="nombre"]'),
        correo: form.querySelector('input[name="correo"]'),
        telefono: form.querySelector('input[name="telefono"]'),
        tipo: form.querySelector('select[name="tipo"]')
    };

    Object.values(fields).forEach(field => {
        const errorEl = document.createElement('div');
        errorEl.className = 'error-message';
        field.insertAdjacentElement('afterend', errorEl);
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let valid = true;

        Object.values(fields).forEach(field => {
            field.classList.remove('error', 'valid');
            field.nextElementSibling.textContent = '';
        });

        if (!fields.nombre.value.trim()) {
            valid = false;
            fields.nombre.classList.add('error');
            fields.nombre.nextElementSibling.textContent = 'El nombre es obligatorio.';
        } else {
            fields.nombre.classList.add('valid');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!fields.correo.value.trim()) {
            valid = false;
            fields.correo.classList.add('error');
            fields.correo.nextElementSibling.textContent = 'El correo es obligatorio.';
        } else if (!emailRegex.test(fields.correo.value.trim())) {
            valid = false;
            fields.correo.classList.add('error');
            fields.correo.nextElementSibling.textContent = 'El correo no es válido.';
        } else {
            fields.correo.classList.add('valid');
        }

        if (!iti.isValidNumber()) {
            valid = false;
            fields.telefono.classList.add('error');
            fields.telefono.nextElementSibling.textContent = 'Ingrese un número de teléfono válido.';
        } else {
            fields.telefono.classList.add('valid');
            fields.telefono.value = iti.getNumber(); 
        }

        if (!fields.tipo.value) {
            valid = false;
            fields.tipo.classList.add('error');
            fields.tipo.nextElementSibling.textContent = 'Selecciona una opción.';
        } else {
            fields.tipo.classList.add('valid');
        }

        if (valid) form.submit();
    });

    const phoneInput = fields.telefono;
    const iti = window.intlTelInput(phoneInput, {
        initialCountry: "ar",
        preferredCountries: ["ar", "us", "es", "mx"],
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js"
    });
});
