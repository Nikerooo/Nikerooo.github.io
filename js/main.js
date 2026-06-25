document.addEventListener("DOMContentLoaded", () => {

    // Inicializar todos los tooltips de la página (funciona en index.html y tramites.html)
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(el => new bootstrap.Tooltip(el));

    // El modal solo existe en tramites.html; si no está en la página, se detiene acá
    const modalEl = document.getElementById("modal-tramite");
    if (!modalEl) return;

    // Referencias al modal
    const ventanaModal = new bootstrap.Modal(modalEl);
    const tituloModal  = document.getElementById("titulo-modal");
    const textoModal   = document.getElementById("texto-modal");

    // Al hacer clic en cualquier botón "Ingresar", abrir el modal con el nombre del trámite
    document.querySelectorAll(".btn-ingresar").forEach(boton => {
        boton.addEventListener("click", (e) => {
            e.preventDefault();
            const tramite = boton.getAttribute("data-tramite");
            tituloModal.innerText = `Ingreso a ${tramite}`;
            textoModal.innerHTML  = `Estás ingresando al módulo seguro de <strong>Mutual El Roble</strong> para gestionar tu trámite de <strong>${tramite}</strong>. Por favor, introducí tus credenciales.`;
            ventanaModal.show();
        });
    });

    // Validación del formulario dentro del modal
    document.getElementById("boton-enviar").addEventListener("click", () => {
        const dni = document.getElementById("campo-dni").value.trim();
        if (!dni) {
            alert("Por favor, completá tu número de DNI o Credencial.");
        } else {
            alert(`¡Solicitud enviada! Documento: ${dni}`);
            ventanaModal.hide();
        }
    });

});


// Esta funcion hace que al momento de tocar el logo del usuario, te dirija al login
function irLogin() {
    
    window.location.href = "loginUsuario.html"; // 
}



// Botones de Turnos: redirigen a turnos.html
document.querySelectorAll('.btn-turno').forEach(function(btn) {
    btn.addEventListener('click', function() {  // Cuando se hace click en el btn-turno
        window.location.href = 'turnos.html';   // Te redireccionan a la seccion de turnos
    });
});



// Botones de Cómo llegar: abren Google Maps en nueva pestaña
// Cada ficha tiene su propia dirección guardada en el atributo data-direccion
document.querySelectorAll('.btn-llegar').forEach(function(btn) {
    btn.addEventListener('click', function() {

        const direccion = btn.closest('.caja-ficha').querySelector('.caja-ficha_ubicacion').textContent;
        const url = 'https://www.google.com/maps?q=' + encodeURIComponent(direccion);

        window.open(url, '_blank');
    });
});



document.addEventListener('DOMContentLoaded', function () {

    // Inicializa el modal de Bootstrap
    const modalMedico = new bootstrap.Modal(document.getElementById('modalMedico'));

    // Evita que los botones de la ficha abran el modal
    document.querySelectorAll('.caja-fichaBtns button').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });

    // Al clickear una ficha, carga sus datos y abre el modal manualmente
    document.querySelectorAll('.caja-ficha').forEach(function(ficha) {
        ficha.addEventListener('click', function() {

            const nombre        = ficha.getAttribute('data-nombre');
            const especialidad  = ficha.getAttribute('data-especialidad');
            const ubicacion     = ficha.getAttribute('data-ubicacion');

            document.getElementById('modal-nombre').textContent       = nombre;
            document.getElementById('modal-especialidad').textContent = especialidad;
            document.getElementById('modal-ubicacion').textContent    = ubicacion;

            modalMedico.show(); // Abre el modal manualmente
        });
    });

});





document.addEventListener("DOMContentLoaded", function() {
    
    // Referencias al DOM [9]
    var espSel = document.getElementById("especialidad");
    var profSel = document.getElementById("profesional");
    var fechaSel = document.getElementById("fecha");
    var horaSel = document.getElementById("hora");
    var form = document.getElementById("formTurno");

    // Base de datos específica: 3 médicos ÚNICOS por especialidad
    var staff = {
        "Geriatría": ["Dr. Hugo Salinas", "Dra. Mirta Legrand", "Dr. Oscar González"],
        "Cardiología": ["Dr. Luis Favaloro", "Dra. Inés García", "Dr. Ricardo Darín"],
        "Clínica Médica": ["Dra. Sofía Martínez", "Dr. Alberto Pérez", "Dra. Lucía Soria"],
        "Traumatología": ["Dr. Esteban Quito", "Dra. Yamila Paz", "Dr. Marcos Paz"],
        "Neurología": ["Dr. Facundo Manes", "Dra. Paula Valle", "Dr. Jorge Luis"],
        "Hematología": ["Dra. Rosa Luna", "Dra. Fernando Bos", "Dra. Silvia Jota"],
        "Flebología": ["Dr. Emilio Nani", "Dra. Paula Vern", "Dr. Cristian Uz"]
    };

    // Evento Change para Especialistas [9]
    espSel.addEventListener("change", function() {
        var seleccion = espSel.value;
        profSel.innerHTML = '<option value="" selected disabled>Seleccione médico...</option>';
        profSel.disabled = false;
        
        staff[seleccion].forEach(function(medico) {
            var opt = document.createElement("option");
            opt.value = medico;
            opt.textContent = medico;
            profSel.appendChild(opt);
        });
    });

    // Carga de Fechas y Horas (Intervalos 30 min)
    (function cargarListas() {
        var hoy = new Date();
        for(var i=1; i<=7; i++) {
            var f = new Date(); f.setDate(hoy.getDate() + i);
            var opt = document.createElement("option");
            opt.value = f.toLocaleDateString();
            opt.textContent = f.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });
            fechaSel.appendChild(opt);
        }

        for(var h=8; h<=12; h++) {
            ["00", "30"].forEach(function(m) {
                var optH = document.createElement("option");
                var valor = h + ":" + m;
                optH.value = valor; optH.textContent = valor + " hs";
                horaSel.appendChild(optH);
            });
        }
    })();

    // Evento Submit y Componentes Bootstrap [11]
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        }

        document.getElementById("resumenCita").innerHTML = 
            "Turno agendado con <strong>" + profSel.value + "</strong> para el día <strong>" + fechaSel.value + "</strong> a las <strong>" + horaSel.value + " hs</strong>.";

        new bootstrap.Modal(document.getElementById("modalExito")).show();
        new bootstrap.Toast(document.getElementById("toastFeedback")).show();

        form.reset();
        form.classList.remove("was-validated");
        profSel.disabled = true;
    });

    // Inicializar Tooltips [11]
    var tooltips = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltips.map(function (t) { return new bootstrap.Tooltip(t); });
});


document.addEventListener("DOMContentLoaded", () => {   // Esta pendiente al documento, queda en estado Escucha
    
   
    const iconosRedireccion = document.querySelectorAll('.icono-enlace'); //Tomamos todos los elementos que tengan la clase 'icono-enlace'
 
    
    iconosRedireccion.forEach(icono => { //Recorremos cada uno y le agregamos el evento click
        icono.addEventListener('click', function() {
            
            
            const destino = this.getAttribute('data-url');  // Guardamos la URL que tienen en el data-url
            
            
            if (destino) { //Si el destino existe, redirigimos la página
                window.location.href = destino; // Redireccionamos al destino
            }
        });
    });

});

