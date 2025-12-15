// Espera a que cargue el DOM
window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('contrasena');
  
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // 👈 prevenir por defecto desde el inicio
    clearErrors();

    let isValid = true;

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if (emailValue === '') {
      showError(emailInput, 'El correo es obligatorio.');
      isValid = false;
    } else if (!validateEmail(emailValue)) {
      showError(emailInput, 'Ingrese un correo válido.');
      isValid = false;
    }

    if (passwordValue === '') {
      showError(passwordInput, 'La contraseña es obligatoria.');
      isValid = false;
    } else if (passwordValue.length < 6) {
      showError(passwordInput, 'La contraseña debe tener al menos 6 caracteres.');
      isValid = false;
    }

    if (isValid) {
      // ✅ Guardar correo en localStorage y redirigir
      localStorage.setItem('usuarioCorreo', emailValue);
      window.location.href = 'interfaz.html';
    }
  });
});

function showError(input, message) {
  const error = document.createElement('small');
  error.classList.add('error-message');
  error.innerText = message;
  input.parentElement.appendChild(error);
  input.classList.add('input-error');
}

function clearErrors() {
  const errors = document.querySelectorAll('.error-message');
  errors.forEach(error => error.remove());

  const inputs = document.querySelectorAll('.input-error');
  inputs.forEach(input => input.classList.remove('input-error'));
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
