// validacion-registro.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registro-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Limpiar mensajes anteriores
    document.querySelectorAll(".error-message").forEach((el) => (el.textContent = ""));

    // Obtener valores
    const nombres = document.getElementById("nombres").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();
    const rol = document.getElementById("rol").value;

    let valido = true;

    if (nombres === "") {
      document.getElementById("nombres-error").textContent = "Ingresa tus nombres";
      valido = false;
    }

    if (apellidos === "") {
      document.getElementById("apellidos-error").textContent = "Ingresa tus apellidos";
      valido = false;
    }

    if (!validarCorreo(correo)) {
      document.getElementById("correo-error").textContent = "Correo no válido";
      valido = false;
    }

    if (contrasena.length < 6) {
      document.getElementById("contrasena-error").textContent = "La contraseña debe tener al menos 6 caracteres";
      valido = false;
    }

    if (rol === "") {
      document.getElementById("rol-error").textContent = "Selecciona un rol";
      valido = false;
    }

    if (valido) {
      alert("Registro exitoso (simulado)");
      form.reset();
    }
  });

  function validarCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  }
});
