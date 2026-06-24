

function irLogin() {
    
    window.location.href = "loginUsuario.html"; // Reemplaza con la ruta a tu página
}

// Botones de Turnos: redirigen a turnos.html
document.querySelectorAll('.btn-turno').forEach(function(btn) {
    btn.addEventListener('click', function() {
        window.location.href = 'turnos.html';
    });
});

// Botones de Cómo llegar: abren Google Maps en nueva pestaña
// Cada ficha tiene su propia dirección guardada en el atributo data-direccion
document.querySelectorAll('.btn-llegar').forEach(function(btn) {
    btn.addEventListener('click', function() {
        const direccion = btn.closest('.caja-ficha')
                            .querySelector('.caja-ficha_ubicacion')
                            .textContent;
        const url = 'https://www.google.com/maps?q=' + encodeURIComponent(direccion);
        window.open(url, '_blank');
    });
});