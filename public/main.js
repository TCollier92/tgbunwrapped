document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const slideshowContainer = document.querySelector('.slideshow-container');
    const slides = document.querySelectorAll('.slide');
    const audios = document.querySelectorAll('audio');
    const backgroundGifs = document.querySelectorAll('.background-gif');

    let currentAudio = null;
    let currentBackground = null;

    // Disable scroll snapping until the button is clicked
    slideshowContainer.style.scrollSnapType = 'none';

    startButton.addEventListener('click', () => {
        var audio = document.querySelector('#silenceAudio');
        // "Unlock" audio playback by playing and pausing all audio elements
        const promise = audio.play();
        console.log(promise);
        if (promise !== undefined) {
            promise.then(() => {
                audio.pause();
                audio.currentTime = 0;
            }).catch(error => {
                console.error("Audio playback failed:", error);
            });
        }

        // Re-enable scroll snapping and start the slideshow
        slideshowContainer.style.overflowY = 'scroll';
        slideshowContainer.style.scrollSnapType = 'y mandatory';

        // Hide the button and scroll to the next slide
        startButton.style.display = 'none';
        slides[1].scrollIntoView({ behavior: 'smooth' });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const slide = entry.target;
                const audioOnThisSlide = slide.dataset.audio;
                const backgroundGifSelector = slide.dataset.backgroundGif;

                // If the new slide has audio and it's not the one already playing
                if (audioOnThisSlide && audioOnThisSlide !== currentAudio) {
                    var audioEl = document.getElementById(audioOnThisSlide);
                    // Stop and reset the previously playing audio, if any
                    if (audioEl) {
                        var prevAudioEl = document.getElementById(currentAudio);
                        if(prevAudioEl)
                        {
                            prevAudioEl.pause();
                        }
                    }
                    // Set the new audio, loop it, and play it
                    currentAudio = audioOnThisSlide;
                    audioEl.loop = true;
                    audioEl.volume = audioEl.dataset.volume || 1.0;
                    audioEl.play().catch(e => console.error("Autoplay was prevented:", e));
                }

                // Handle background GIFs
                const backgroundToShow = backgroundGifSelector ? document.querySelector(backgroundGifSelector) : null;

                // If there's a background to show and it's different from the current one
                if (backgroundToShow !== currentBackground) {
                    // Fade out the current background if there is one
                    if (currentBackground) {
                        currentBackground.style.opacity = '0';
                        currentBackground.style.visibility = 'hidden';
                    }

                    // Fade in the new background
                    if (backgroundToShow) {
                        backgroundToShow.style.opacity = '1';
                        backgroundToShow.style.visibility = 'visible';
                    }

                    // Update the current background reference
                    currentBackground = backgroundToShow;
                }
            }
        });
    }, { threshold: 0.5 });

    slides.forEach(slide => {
        observer.observe(slide);
    });
});
