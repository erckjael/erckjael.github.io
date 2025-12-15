document.getElementById('recuperar-form').addEventListener('submit', function (e) {
  const correo = document.getElementById('correo');
  const correoError = document.getElementById('correo-error');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  correoError.textContent = '';

  if (!emailRegex.test(correo.value.trim())) {
    correoError.textContent = 'Ingrese un correo electrónico válido.';
    e.preventDefault();
  } else {
    alert("Se ha enviado un enlace de recuperación al correo proporcionado.");
  }
});
