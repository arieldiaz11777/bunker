// Función para cargar la página seleccionada en el iframe
function loadPage(page) {
    document.getElementById('content-frame').src = page;
}

// Cargar una página predeterminada (Inicio) al abrir la web
window.onload = function () {
    loadPage('inicio.html');
};
