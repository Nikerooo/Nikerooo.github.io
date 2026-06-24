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