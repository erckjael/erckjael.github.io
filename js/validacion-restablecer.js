document.getElementById("restablecer-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Evita el envío inmediato

  // Obtener los valores
  const nuevaContrasena = document.getElementById("nueva-contrasena").value.trim();
  const confirmarContrasena = document.getElementById("confirmar-contrasena").value.trim();

  // Elementos de mensaje de error
  const errorNueva = document.getElementById("nueva-contrasena-error");
  const errorConfirmar = document.getElementById("confirmar-contrasena-error");

  // Limpiar mensajes anteriores
  errorNueva.textContent = "";
  errorConfirmar.textContent = "";

  let valido = true;

  // Validar que no estén vacíos
  if (nuevaContrasena === "") {
    errorNueva.textContent = "Ingresa una nueva contraseña.";
    valido = false;
  }

  if (confirmarContrasena === "") {
    errorConfirmar.textContent = "Confirma tu nueva contraseña.";
    valido = false;
  }

  // Validar que coincidan
  if (nuevaContrasena && confirmarContrasena && nuevaContrasena !== confirmarContrasena) {
    errorConfirmar.textContent = "Las contraseñas no coinciden.";
    valido = false;
  }

  // Si todo está bien, se puede enviar
  if (valido) {
    alert("¡Contraseña actualizada correctamente!");
    this.submit();
  }
});
