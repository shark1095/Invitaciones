document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DEL DOM ---
    const enterButton = document.getElementById('enter-button');
    const splashScreen = document.getElementById('splash-screen');
    const invitationContent = document.getElementById('invitacion-content');
    const audio = document.getElementById('nuestra-cancion');
    const googleCalendarLink = document.getElementById('google-calendar-link');

    // --- LÓGICA DE LA PANTALLA DE BIENVENIDA ---
    enterButton.addEventListener('click', () => {
        // Reproduce la música cuando el usuario interactúa
        audio.play().catch(error => console.log("La reproducción automática fue bloqueada por el navegador."));

        // Oculta la pantalla de bienvenida con una transición
        splashScreen.style.opacity = '0';
        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 1000); // Coincide con la duración de la transición en CSS

        // Muestra el contenido de la invitación
        invitationContent.style.display = 'block';
    });

    // --- LÓGICA DE LA CUENTA REGRESIVA ---
    const weddingDate = new Date("December 19, 2026 13:00:00").getTime();

    const countdownFunction = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("countdown").innerHTML = "<h2>¡Llegó el gran día!</h2>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

    }, 1000);

    // --- LÓGICA DEL ENLACE DE GOOGLE CALENDAR ---
    // **CORRECCIÓN IMPORTANTE**: Las fechas deben coincidir con la boda.
    const eventDetails = {
        title: "Boda de Liza & Alexis",
        description: "¡Estás invitado a la boda de Liza Muñoz y Alexis Solis! ¡No te lo pierdas!",
        location: "Salón de Eventos 'El Encanto', Ciudad Ejemplo, País",
        // Usamos la misma fecha de la cuenta regresiva
        startDate: new Date("December 19, 2026 13:00:00"), 
        endDate: new Date("December 19, 2026 20:00:00")    
    };

    function formatGoogleDate(date) {
        return date.toISOString().replace(/-|:|\.\d+/g, '');
    }

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE` +
        `&text=${encodeURIComponent(eventDetails.title)}` +
        `&dates=${formatGoogleDate(eventDetails.startDate)}/${formatGoogleDate(eventDetails.endDate)}` +
        `&details=${encodeURIComponent(eventDetails.description)}` +
        `&location=${encodeURIComponent(eventDetails.location)}`;

    // Asigna la URL al enlace
    googleCalendarLink.href = googleCalendarUrl;

    // --- GENERACIÓN DE ARCHIVO ICS ---
const downloadICSButton = document.getElementById("download-ics");

function generateICS(event) {
    const start = event.startDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const end = event.endDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//TuNombre//TuProducto//ES
BEGIN:VEVENT
UID:${Date.now()}@tuevento.com
DTSTAMP:${start}
DTSTART:${start}
DTEND:${end}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    downloadICSButton.href = url;
}

// Llamamos la función cuando el botón esté disponible
generateICS(eventDetails);

});

// Espera a que todo el contenido de la página se cargue
window.addEventListener('load', function() {

    // (El código del contador de tiempo y de la pantalla de bienvenida ya estaría aquí...)

    // --- LÓGICA PARA DESCARGAR EL PDF ---

    // 1. Selecciona el botón de descarga
    const downloadButton = document.getElementById('download-pdf-button');

    // 2. Selecciona el contenido que quieres convertir a PDF
    const elementToPrint = document.getElementById('invitacion-content');

    // 3. Añade el evento de clic al botón
    downloadButton.addEventListener('click', () => {

        // Opciones para la generación del PDF
        const opt = {
          margin:       0.5, // Margen en pulgadas
          filename:     'Invitacion-Boda-Liza-y-Alexis.pdf',
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 2 }, // Aumenta la escala para mejor resolución
          jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Usa la librería html2pdf para generar el archivo
        html2pdf().from(elementToPrint).set(opt).save();
    });

});