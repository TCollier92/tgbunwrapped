document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const slideshowContainer = document.querySelector('.slideshow-container');
    const slides = document.querySelectorAll('.slide');
    const audios = document.querySelectorAll('audio');

    let currentSlide = 0;

    // Disable scroll snapping until the button is clicked
    slideshowContainer.style.scrollSnapType = 'none';


    startButton.addEventListener('click', () => {
        // "Unlock" audio playback by playing and pausing all audio elements
        audios.forEach(audio => {
            const promise = audio.play();
            if (promise !== undefined) {
                promise.then(() => {
                    audio.pause();
                }).catch(error => {
                    console.error("Audio playback failed:", error);
                });
            }
        });

        // Re-enable scroll snapping and start the slideshow
        slideshowContainer.style.overflowY = 'scroll';
        slideshowContainer.style.scrollSnapType = 'y mandatory';

        // Hide the button and scroll to the next slide
        startButton.style.display = 'none';
        slides[1].scrollIntoView({ behavior: 'smooth' });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const slide = entry.target;
            const audio = slide.querySelector('audio');

            if (entry.isIntersecting) {
                if (audio) {
                    audio.play().catch(e => console.error("Autoplay was prevented:", e));
                }
            } else {
                if (audio) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            }
        });
    }, { threshold: 0.5 });

    slides.forEach(slide => {
        observer.observe(slide);
    });
});
