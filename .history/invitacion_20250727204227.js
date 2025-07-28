window.addEventListener('load', () => {
            const enterButton = document.getElementById('enter-button');
            const splashScreen = document.getElementById('splash-screen');
            const invitationContent = document.getElementById('invitacion-content');
            
            const audio = document.getElementById('nuestra-cancion');

            enterButton.addEventListener('click', () => {
                audio.play();

                splashScreen.style.opacity = '0';
                setTimeout(() => {
                    splashScreen.style.display = 'none';
                }, 1000); 

        invitationContent.style.display = 'block';
    });
});

const weddingDate = new Date("December 25, 2025 18:00:00").getTime();

// Actualizar la cuenta regresiva cada segundo
const countdownFunction = setInterval(() => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Cálculos de tiempo
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Mostrar los resultados en los elementos del HTML
    document.getElementById("days").innerText = days < 10 ? '0' + days : days;
    document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;

    // Si la cuenta regresiva termina
    if (distance < 0) {
        clearInterval(countdownFunction);
        document.getElementById("countdown").innerHTML = "<h2>¡Llegó el gran día!</h2>";
    }
}, 1000);

// --- LÓGICA PARA EL ENLACE DE GOOGLE CALENDAR ---

// ****** ¡EDITA LOS DETALLES DE TU BODA AQUÍ! ******
const eventDetails = {
    title: "Boda de Liza & Alexis",
    description: "¡Estás invitado a la boda de Liza Muñoz y Alexis Solis! ¡No te lo pierdas!",
    location: "Salón de Eventos 'El Encanto', Ciudad Ejemplo, País",
    // IMPORTANTE: Pon la fecha y hora de inicio y fin en TU HORA LOCAL.
    // El script se encargará de convertirlo a la hora universal (UTC) que Google necesita.
    startDate: new Date("October 25, 2024 18:00:00"), // Ejemplo: 25 de Octubre a las 6:00 PM
    endDate: new Date("October 25, 2024 23:30:00")    // Ejemplo: Termina a las 11:30 PM
};

// Función para formatear la fecha al formato que Google necesita (YYYYMMDDTHHMMSSZ)
function formatGoogleDate(date) {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
}

// Construir el enlace
const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE` +
    `&text=${encodeURIComponent(eventDetails.title)}` +
    `&dates=${formatGoogleDate(eventDetails.startDate)}/${formatGoogleDate(eventDetails.endDate)}` +
    `&details=${encodeURIComponent(eventDetails.description)}` +
    `&location=${encodeURIComponent(eventDetails.location)}`;

// Asignar el enlace generado al botón
document.getElementById('google-calendar-link').href = googleCalendarUrl;