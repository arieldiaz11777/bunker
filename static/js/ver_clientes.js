function formatDate(dateString) {
    // Si el dato es una cadena ISO, la convertimos a un formato adecuado
    const date = new Date(dateString);

    // Verificamos si es una fecha válida
    if (isNaN(date.getTime())) {
        return dateString; // Si no es una fecha válida, devolvemos el valor original
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const year = date.getFullYear();

    // Retornamos solo la parte de la fecha en formato dd/mm/yyyy
    return `${day}/${month}/${year}`;
}

function fetchData() {
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbznA82O6AsTLCc65dY1Y25lDIRYb7IMRDWY05idH3IYRTmCZrp-aZNxv4RHE_W6KiBA/exec'; // URL del Google Apps Script

    fetch(scriptUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la red: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            displayData(data);
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
            document.getElementById('data-table').innerHTML = '<tr><td colspan="3">Error al cargar los datos.</td></tr>';
        });
}

function displayData(data) {
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = ''; // Limpiar la tabla previa

    data.forEach((row, index) => {
        // Ignorar la primera fila si es un encabezado
        if (index === 0) return;

        const tr = document.createElement('tr');
        row.forEach((cell, cellIndex) => {
            const td = document.createElement('td');

            // Verificar si la columna actual es la de fecha (cambiar el índice si necesario)
            if (cellIndex === 3) { // Ajustar según la columna que contiene la fecha
                td.innerText = formatDate(cell);
            } else {
                td.innerText = cell; // Mostrar el dato tal como está
            }

            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
}

window.onload = function () {
    fetchData();
};
