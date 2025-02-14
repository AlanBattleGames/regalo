document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('song');
    const loader = document.querySelector('.loader');
    const lyrics = document.querySelectorAll('.lyric-line');
  
    // Array con los tiempos en segundos para cada línea de la letra
    const lyricTimes = [
      0,      // "Para Yeimi el amor de mi vida UwU"
      19,    // "Dame de tu vida y de tu tiempo"
      24.5,    // "Suficientes para ver"
      28,   // "Dentro de tus ojos el momento"
      33,   // "Que me obligue a renacer"
      37,   // "Dame vida y dame aliento"
      42,   // "Que yo ya perdí el conocimiento"
      46,   // "Solo quédate un momento"
      51,     // "Hasta evaporarnos en el viento"
      55,     // "No hay motivos"
      57,   // "Para decirnos adiós tan pronto"
      64,     // "Sigo vivo"
      66,   // "Créemelo, mi amor, no soy tan tonto"
      72,     // "Si tú quisieras esta noche ir a bailar un chachachá"
      81,     // "Yo te puedo enamorar"
      84,     // "notas musicales"
      93,     // "Dame de tu vida y de tu tiempo, oh, oh"
      98.5,     // "Que te quiero conocer"
      102,     // "Déjame sentir el movimiento, oh, oh"
      107,     // "De tu cuerpo al florecer"
      111,     // "Dame vida y dame aliento"
      116,     // "Que yo ya perdí el conocimiento"
      119.7,     // "Solo quédate un momento"
      124.7,     // "Hasta evaporarnos en el viento"
      128,     // "No hay motivos"
      131,     // "Para decirnos adiós tan pronto"
      137,   // "Sigo vivo"
      139,   // "Créemelo, mi amor, no soy tan tonto"
      145,     // "Si tú quisieras esta noche ir a bailar un chachachá"
      154.7,   // "Yo te puedo enamorar"
      160,   // "Sin maquillar"
      165,     // "Feliz San Valentin Mi Niña :3"
      216
    ];

    // Verifica que el audio y el loader existan
    if (!audio || !loader) return;

    const hideLoader = () => {
        loader.style.display = 'none';
        document.body.classList.remove("not-loaded");
    };

    audio.addEventListener('loadeddata', hideLoader); // Cuando los datos iniciales están cargados
    audio.addEventListener('canplay', hideLoader); // Cuando puede reproducirse
    audio.addEventListener('canplaythrough', hideLoader); // Cuando puede reproducirse sin interrupciones
    
    // 2. Timeout de respaldo por si falla la carga
    const backupTimeout = setTimeout(hideLoader, 5000); // 5 segundos máximo
    
    // 3. Manejar errores
    audio.addEventListener('error', () => {
        clearTimeout(backupTimeout);
        hideLoader();
    });

    let isPlaying = false;
    const handlePlayPause = () => {
        if (!isPlaying) {
            audio.play().catch(err => console.log("Esperando interacción..."));
            isPlaying = true;
        } else {
            audio.pause();
            isPlaying = false;
        }
    };
    
    // Agregar ambos tipos de eventos para móvil/desktop
    document.body.addEventListener('click', handlePlayPause);
    document.body.addEventListener('touchstart', handlePlayPause);

    audio.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime;
        lyrics.forEach((lyric, index) => {
            if (currentTime >= lyricTimes[index] && currentTime < lyricTimes[index + 1]) {
                lyric.classList.add('active');
    
                if (index > 0) {
                    lyrics[index - 1].classList.remove('active');
                    lyrics[index - 1].classList.add('exit');
                }
            } else {
                lyric.classList.remove('active');
                lyric.classList.remove('exit');
            }
        });
    });
});

  
  
  
