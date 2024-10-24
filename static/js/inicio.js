document.addEventListener('DOMContentLoaded', function () {
    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const weekdays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const monthNameEl = document.getElementById('monthName');
    const yearEl = document.getElementById('year');
    const calendarDaysEl = document.getElementById('calendarDays');

    function renderCalendar(month, year) {
        // Mostrar el mes y año actual
        monthNameEl.textContent = monthNames[month];
        yearEl.textContent = year;

        // Obtener el primer día del mes
        const firstDay = (new Date(year, month)).getDay();

        // Obtener el número total de días en el mes
        const daysInMonth = 32 - new Date(year, month, 32).getDate();

        // Limpiar los días anteriores
        calendarDaysEl.innerHTML = "";

        // Agregar espacios vacíos si el mes no comienza el domingo
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('empty-day');
            calendarDaysEl.appendChild(emptyDay);
        }

        // Crear los días del mes
        for (let day = 1; day <= daysInMonth; day++) {
            const dayEl = document.createElement('div');
            dayEl.textContent = day;
            dayEl.classList.add('day');

            // Marcar el día actual
            if (year === currentDate.getFullYear() && month === currentDate.getMonth() && day === currentDate.getDate()) {
                dayEl.classList.add('today');
            }

            // Agregar evento click para los días
            dayEl.addEventListener('click', () => {
                alert(`Has seleccionado el día: ${day} de ${monthNames[month]} del ${year}`);
            });

            calendarDaysEl.appendChild(dayEl);
        }
    }

    // Navegar al mes anterior
    document.querySelector('.prev').addEventListener('click', function () {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });

    // Navegar al mes siguiente
    document.querySelector('.next').addEventListener('click', function () {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });

    // Inicializar el calendario con el mes actual
    renderCalendar(currentMonth, currentYear);
});
