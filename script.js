document.addEventListener("DOMContentLoaded", () => {
  // --- Elementos de la página ---
  const pantallaLogin = document.getElementById("pantalla-login");
  const contenidoPlataforma = document.getElementById("contenido-plataforma");
  
  // --- Formularios ---
  const formLogin = document.getElementById("formLoginReal");
  const usuarioInput = document.getElementById("usuarioReal");
  const passwordInput = document.getElementById("passwordReal");
  
  const formRegistro = document.getElementById("formRegistroReal");
  const regUsuario = document.getElementById("regUsuario");
  const regPassword = document.getElementById("regPassword");
  
  const formContacto = document.getElementById("formContacto");
  const btnCerrarSesion = document.getElementById("btnCerrarSesionReal");

  // Crea la memoria del navegador vacía si no existe
  if (!localStorage.getItem("usuariosMate")) {
    localStorage.setItem("usuariosMate", JSON.stringify({}));
  }

  // === EVENTO PARA LOGUEARSE (ENTRAR) ===
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    const db = JSON.parse(localStorage.getItem("usuariosMate"));
    const usuarioDigitado = usuarioInput.value.trim();
    const claveDigitada = passwordInput.value;

    if (db[usuarioDigitado] && db[usuarioDigitado] === claveDigitada) {
      pantallaLogin.style.display = "none";
      contenidoPlataforma.style.display = "block";
    } else {
      alert("❌ Usuario o contraseña incorrectos.");
    }
  });

  // === EVENTO PARA REGISTRARSE ===
  formRegistro.addEventListener("submit", (e) => {
    e.preventDefault();
    const db = JSON.parse(localStorage.getItem("usuariosMate"));
    const nuevoUser = regUsuario.value.trim();
    const nuevaPass = regPassword.value;

    if (db[nuevoUser]) {
      alert("⚠️ Ese usuario ya existe. Intenta con otro.");
      return;
    }

    // Guarda el usuario de verdad
    db[nuevoUser] = nuevaPass;
    localStorage.setItem("usuariosMate", JSON.stringify(db));

    alert("🎉 ¡Cuenta creada con éxito! Entrando...");
    formRegistro.reset();
    
    // Te mete directo a la plataforma
    pantallaLogin.style.display = "none";
    contenidoPlataforma.style.display = "block";
  });

  // === EVENTO PARA CERRAR SESIÓN ===
  btnCerrarSesion.addEventListener("click", () => {
    contenidoPlataforma.style.display = "none";
    pantallaLogin.style.display = "flex";
    formLogin.reset();
  });

  // === EVENTO PARA EL FORMULARIO DE CONTACTO ===
  formContacto.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const tema = document.getElementById("tema").value;

    alert(`📩 ¡Gracias ${nombre}! Tu duda sobre "${tema}" ha sido enviada.`);
    formContacto.reset();
  });

  // === CERRAR MENÚ MÓVIL AUTOMÁTICAMENTE ===
  const linksNavegacion = document.querySelectorAll(".navbar-nav .nav-link:not(#btnCerrarSesionReal)");
  const menuColapsable = document.getElementById("navbarNav");
  
  linksNavegacion.forEach(link => {
    link.addEventListener("click", () => {
      if (menuColapsable.classList.contains("show")) {
        const bCollapse = bootstrap.Collapse.getInstance(menuColapsable);
        if (bCollapse) bCollapse.hide();
      }
    });
  });
});
