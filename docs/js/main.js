(() => {
    'use strict'
    const forms = document.getElementsByTagName('form');
    const inputs = document.querySelector("input[type='number']");

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    });
})()