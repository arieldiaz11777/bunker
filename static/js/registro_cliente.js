document.getElementById('uploadForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener los valores de los campos
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var telefono = document.getElementById('telefono').value;
    var email = document.getElementById('email').value;

    // Formatear la fecha y ajustar la zona horaria
    var fechaInscripcion = formatDate(new Date(document.getElementById('fechaInscripcion').value));

    // Generar ID del cliente
    function generateClientId() {
        const randomNum = Math.floor(Math.random() * 10000);
        const formattedNum = String(randomNum).padStart(4, '0');
        return `idbunker${formattedNum}`;
    }

    var idcliente = generateClientId();
    console.log(`ID Cliente Generado: ${idcliente}`);

    // Preparar los datos para enviar
    var formData = new FormData();
    formData.append('idcliente', idcliente);
    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    formData.append('telefono', telefono);
    formData.append('email', email);
    formData.append('fecha_inscripcion', fechaInscripcion);

    // Mostrar el spinner de carga
    document.getElementById('spinner').style.display = 'block';

    // Enviar los datos al script de Google
    fetch('https://script.google.com/macros/s/AKfycbwSLxOFpJ10HiK6yjqvxkn-h1PUVygWQiZzAGxdVvzb4CHbofNGDKi1r10WnLEkpuyK6g/exec', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            // Manejar la respuesta
            document.getElementById('spinner').style.display = 'none'; // Ocultar el spinner
            return response.text();
        })
        .then(data => {
            // Mostrar respuesta
            document.getElementById("response").innerText = "Datos enviados con éxito!";
            console.log(data);

            // Reiniciar la página
            setTimeout(() => {
                window.location.reload(); // Recargar la página después de un pequeño retraso
            }, 2000); // Espera 2 segundos antes de recargar
        })
        .catch(error => {
            console.error('Error al enviar datos:', error);
            document.getElementById('response').innerText = 'Error al enviar los datos. Intenta nuevamente.';
            document.getElementById('spinner').style.display = 'none'; // Ocultar el spinner
        });

    // Función para formatear la fecha
    function formatDate(date) {
        // Ajustar la hora a la zona horaria local
        date.setHours(date.getHours() + date.getTimezoneOffset() / 60);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`; // Cambiado a dd/mm/yyyy
    }
});
