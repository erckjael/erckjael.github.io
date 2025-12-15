function toggleSubMenu(id) {
  const submenus = document.querySelectorAll('.submenu');
  submenus.forEach(menu => {
    if (menu.id !== id) {
      menu.style.display = 'none';
    }
  });

  const selectedMenu = document.getElementById(id);
  selectedMenu.style.display = selectedMenu.style.display === 'block' ? 'none' : 'block';
}

function cerrarSesion() {
  localStorage.removeItem('usuarioCorreo'); // limpiar sesión
  window.location.href = 'login.html';
}

function loadModule(moduleName) {
  const mainContent = document.getElementById('main-content');
  mainContent.classList.add('fade');
  setTimeout(() => {
    const tableContent = getModuleTable(moduleName);
    const moduleTitles = {
      'usuarios': 'Gestión de Usuarios',
      'roles': 'Gestión de Roles',
      'clientes': 'Gestión de Clientes',
      'proveedores': 'Gestión de Proveedores',
      'vendedores': 'Gestión de Vendedores',
      'bodegas': 'Gestión de Bodegas',
      'registro-productos': 'Registro de Productos',
      'categorias': 'Categorías de Productos',
      'unidades': 'Unidades de Medida',
      'entradas': 'Entradas de Productos',
      'salidas': 'Salidas de Productos',
      'inventario': 'Informe de Inventario',
      'kardex': 'Kardex'
    };

    const titulo = moduleTitles[moduleName] || 'Módulo';

    let actionsHTML = '';
    if (moduleName === 'inventario' || moduleName === 'kardex') {
      actionsHTML = `
        <div class="actions-bar">
          <input type="text" placeholder="Buscar por código" class="search-input">
          <input type="date" class="search-input">
          <select class="search-input">
            <option value="">Seleccione bodega</option>
            <option value="Bodega Principal">Bodega Principal</option>
            <option value="Bodega Secundaria">Bodega Secundaria</option>
          </select>
          <button class="btn-add" onclick="generarInformePDF('${moduleName}')"><i class="fas fa-file-download"></i> Generar Informe</button>
        </div>`;
    } else {
      actionsHTML = `
        <div class="actions-bar">
          <button class="btn-add" onclick="abrirModal('${moduleName}')"><i class="fas fa-plus"></i> Añadir</button>
          <input type="text" placeholder="Buscar..." class="search-input">
          <i class="fas fa-filter filter-icon"></i>
        </div>`;
    }

    mainContent.innerHTML = `
      <button class="logout-button" onclick="cerrarSesion()" title="Cerrar sesión">
        <i class="fas fa-sign-out-alt"></i>
      </button>
      <section>
        <h2>${titulo}</h2>
        ${actionsHTML}
        ${tableContent}
      </section>
      <div id="modal" class="modal" style="display:none;">
        <div class="modal-content" id="modal-content">
          <span class="close" onclick="cerrarModal()">&times;</span>
          <div id="modal-body">
            <p>Cargando formulario...</p>
          </div>
        </div>
      </div>`;

    mainContent.classList.remove('fade');
  }, 200);
}

function abrirModal(moduleName) {
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  modal.style.display = 'block';
  fetch(`formularios/form-${moduleName}.html`)
    .then(response => {
      if (!response.ok) throw new Error('No se pudo cargar el formulario');
      return response.text();
    })
    .then(html => {
      modalBody.innerHTML = html;
    })
    .catch(error => {
      modalBody.innerHTML = '<p>Error al cargar el formulario.</p>';
      console.error(error);
    });
}

function cerrarModal() {
  document.getElementById('modal').style.display = 'none';
}

function getModuleTable(moduleName) {
  const modules = {
    'usuarios': `<table><tr><th>ID</th><th>NOMBRE</th><th>APELLIDOS</th><th>CORREO ELECTRONICO</th><th>ROL</th><th>ESTADO</th></tr><tr><td>1</td><td>Juan</td><td>Perez</td><td>juan@mail.com</td><td>Admin</td><td>Activo</td></tr></table>`,
    'roles': `<table><tr><th>ID</th><th>NOMBRE ROL</th></tr><tr><td>1</td><td>Administrador</td></tr></table>`,
    'clientes': `<table><tr><th>ID</th><th>NOMBRE</th><th>APELLIDOS</th><th>CORREO ELECTRONICO</th><th>DIRECCION</th><th>TELEFONO</th><th>ESTADO</th></tr><tr><td>1</td><td>Erckjael</td><td>Salazar</td><td>xxxxxx@gmail.com</td><td>calle 123</td><td>654789123</td><td>Activo</td></tr></table>`,
    'proveedores': `<table><tr><th>ID</th><th>NOMBRE</th><th>APELLIDOS</th><th>CORREO ELECTRONICO</th><th>DIRECCION</th><th>TELEFONO</th><th>ESTADO</th></tr><tr><td>1</td><td>Erckjael</td><td>Salazar</td><td>xxxxxx@gmail.com</td><td>calle 123</td><td>654789123</td><td>Activo</td></tr></table>`,
    'vendedores': `<table><tr><th>ID</th><th>NOMBRE</th><th>APELLIDOS</th><th>CORREO ELECTRONICO</th><th>DIRECCION</th><th>TELEFONO</th><th>ESTADO</th></tr><tr><td>1</td><td>Erckjael</td><td>Salazar</td><td>xxxxxx@gmail.com</td><td>calle 123</td><td>654789123</td><td>Activo</td></tr></table>`,
    'bodegas': `<table><tr><th>ID</th><th>NOMBRE DE BODEGA</th><th>UBICACION</th><th>CAPACIDAD</th><th>ESTADO</th></tr><tr><td>1</td><td>Bodega Principal</td><td>Barrio Norte</td><td>5000 M³</td><td>Activo</td></tr></table>`,
    'registro-productos': `<table><tr><th>ID</th><th>CODIGO</th><th>PRODUCTOS</th><th>CATEGORIA</th><th>CANTIDAD</th><th>COSTO</th><th>PRECIO DE VENTA</th><th>ESTADO</th></tr><tr><td>1</td><td>001</td><td>Mouse</td><td>Accesorio PC</td><td>5</td><td>25.000</td><td>35.000</td><td>Activo</td></tr></table>`,
    'categorias': `<table><tr><th>ID</th><th>CATEGORIA</th></tr><tr><td>1</td><td>Accesorio PC</td></tr></table>`,
    'unidades': `<table><tr><th>ID</th><th>UNIDAD</th></tr><tr><td>1</td><td>Unidad</td></tr></table>`,
    'entradas': `<table><tr><th>ID</th><th>FECHA</th><th>PRODUCTO</th><th>CANTIDAD</th><th>PROVEEDOR</th><th>BODEGA</th><th>COSTO</th><th>OBSERVACIONES</th></tr><tr><td>1</td><td>25/05/2025</td><td>Mouse</td><td>30</td><td>Empresa 2</td><td>Bodega Principal</td><td>1.050.000</td><td>Ninguna</td></tr></table>`,
    'salidas': `<table><tr><th>ID</th><th>FECHA</th><th>PRODUCTO</th><th>CANTIDAD</th><th>PROVEEDOR</th><th>BODEGA</th><th>COSTO</th><th>OBSERVACIONES</th></tr><tr><td>1</td><td>25/05/2025</td><td>Mouse</td><td>30</td><td>Empresa 2</td><td>Bodega Principal</td><td>1.050.000</td><td>Ninguna</td></tr></table>`,
    'inventario': `<table><tr><th>BODEGA</th><th>FECHA</th><th>UBICACION</th><th>CODIGO</th><th>REFERENCIA</th><th>PRODUCTO</th><th>COSTO</th><th>PRECIO DE VENTA</th><th>INVENTARIO</th></tr><tr><td>Bodega Principal</td><td>25/05/2025</td><td>Barrio Norte</td><td>001</td><td>65321</td><td>Mouse</td><td>25.000</td><td>35.000</td><td>1</td></tr></table>`,
    'kardex': `<table><tr><th>BODEGA</th><th>FECHA</th><th>UBICACION</th><th>CODIGO</th><th>REFERENCIA</th><th>PRODUCTO</th><th>COSTO</th><th>PRECIO DE VENTA</th><th>INVENTARIO</th></tr><tr><td>Bodega Principal</td><td>25/05/2025</td><td>Barrio Norte</td><td>001</td><td>65321</td><td>Mouse</td><td>25.000</td><td>35.000</td><td>1</td></tr></table>`
  };

  return modules[moduleName] || '<p>Módulo no disponible.</p>';
}


// Mostrar correo y fecha en interfaz.html
window.addEventListener('DOMContentLoaded', () => {
  const correo = localStorage.getItem('usuarioCorreo');
  const welcomeMessage = document.querySelector('.welcome-message p');

  if (!correo) {
    window.location.href = 'login.html';
    return;
  }

  function actualizarMensaje() {
    const ahora = new Date();

    // Opciones de formato para la fecha
    const opcionesFecha = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    // Hora con segundos
    const hora = ahora.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const fecha = ahora.toLocaleDateString('es-ES', opcionesFecha);

    
    // Mensaje de bienvenida dinámico
    welcomeMessage.innerHTML = `
      🧰 Tu plataforma para gestionar el inventario de manera eficiente y segura.<br>
      👤 Usuario: ${correo}<br>
      📆 Fecha: ${fecha}<br>
      🕒 Hora: ${hora}<br>
      🗂️ Funciones clave:<br>
      ✅ Control total del inventario.<br>
      ✅ Registro y consulta de productos en tiempo real.<br>
      ✅ Generación de informes detallados.<br>
      ✅ Administración de usuarios y permisos.<br>
      🎯 ¡Optimiza tu gestión y mantén el control con nosotros!
    `;
  }

  actualizarMensaje(); // Mostrar al cargar
  setInterval(actualizarMensaje, 1000); // Actualizar cada segundo
});



 // ACCION PARA GENERAR INFORME Y DESCARGAR (MODULO INFORMES)
async function generarInformePDF(modulo) {
  const tabla = document.querySelector('#main-content table');
  if (!tabla) return alert("No hay datos para exportar.");

  const codigoFiltro = document.querySelector('input[placeholder="Buscar por código"]')?.value.toLowerCase();
  const fechaFiltro = document.querySelector('input[type="date"]')?.value;
  const bodegaFiltro = document.querySelector('select')?.value.toLowerCase();

  const filas = Array.from(tabla.querySelectorAll('tr'));
  const encabezados = Array.from(filas[0].querySelectorAll('th')).map(th => th.textContent.trim());

  const datosFiltrados = filas.slice(1).filter(fila => {
    const celdas = fila.querySelectorAll('td');
    const codigo = celdas[3]?.textContent.toLowerCase() || '';
    const fecha = celdas[1]?.textContent || '';
    const bodega = celdas[0]?.textContent.toLowerCase() || '';

    const cumpleCodigo = !codigoFiltro || codigo.includes(codigoFiltro);
    const cumpleFecha = !fechaFiltro || fecha === fechaFiltro;
    const cumpleBodega = !bodegaFiltro || bodega.includes(bodegaFiltro);
    return cumpleCodigo && cumpleFecha && cumpleBodega;
  }).map(fila => Array.from(fila.querySelectorAll('td')).map(td => td.textContent.trim()));

  if (datosFiltrados.length === 0) {
    alert("No se encontraron registros para exportar.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'landscape' });

  const correo = localStorage.getItem('usuarioCorreo') || 'Desconocido';
  const fechaHora = new Date().toLocaleString('es-ES');

  // Logo ((base64 (puedes convertirlo con herramientas online si lo necesitas embebido)))
  const logo = new Image();
  logo.src = 'img/logo-invensys.png';

  // Esperar a que cargue el logo antes de generar el PDF
  logo.onload = () => {
    doc.addImage(logo, 'PNG', 240, 15, 45, 20); // Posición derecha arriba
    doc.setFontSize(12);
    doc.text(`Informe de ${modulo}`, 14, 20);
    doc.text(`Generado por: ${correo}`, 14, 28);
    doc.text(`Fecha y hora: ${fechaHora}`, 14, 36);

    doc.autoTable({
      startY: 45,
      head: [encabezados],
      body: datosFiltrados,
      styles: { fontSize: 8 },
      headStyles: {
        fillColor: [139, 0, 0],
        textColor: [255, 255, 255]
      },
      margin: { left: 14, right: 14 },
    });

    doc.save(`${modulo}-informe.pdf`);
  };
}
