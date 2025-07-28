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
    const weddingDate = new Date("December 25, 2025 18:00:00").getTime();

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
        startDate: new Date("December 25, 2025 18:00:00"), 
        endDate: new Date("December 25, 2025 23:30:00")    
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
});