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