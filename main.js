document.addEventListener('DOMContentLoaded', () => {
    // Screen management
    const screens = {
        countdown: document.getElementById('screen-countdown'),
        intro: document.getElementById('screen-intro'),
        cake: document.getElementById('screen-cake'),
        balloons: document.getElementById('screen-balloons'),
        moments: document.getElementById('screen-moments'),
        final: document.getElementById('screen-final')
    };



    function showScreen(screenId) {
        Object.values(screens).forEach(screen => screen.classList.remove('active'));
        screens[screenId].classList.add('active');
    }

    // --- Screen 1: Countdown ---
    const countdownNum = document.getElementById('countdown-number');
    let count = 3;
    const countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownNum.textContent = count;
        } else {
            clearInterval(countdownInterval);
            showScreen('intro');
        }
    }, 1500);

    // --- Screen 2: Introduction ---
    const startSurpriseBtn = document.getElementById('start-surprise-btn');
    startSurpriseBtn.addEventListener('click', () => {
        showScreen('cake');
    });

    // --- Screen 3: Cake & Decoration ---
    const decorateBtn = document.getElementById('decorate-btn');
    const lightCandleBtn = document.getElementById('light-candle-btn');
    const litImage = document.getElementById('lit-candle-img');
    const birthdayMsg = document.getElementById('birthday-msg');
    const appContainer = document.getElementById('app');

    decorateBtn.addEventListener('click', () => {
        appContainer.classList.add('decorated');
        decorateBtn.classList.add('hidden');
        lightCandleBtn.classList.remove('hidden');
        initBunting();
    });

    function initBunting() {
        const container = document.getElementById('bunting-container');
        const colors = [
            '#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF',
            '#F24C4C', '#EC994B', '#9772FB', '#00D7FF'
        ];
        const flagCount = 25;

        for (let s = 0; s < 3; s++) {
            const string = document.createElement('div');
            string.className = 'bunting-string';
            string.style.top = `${s * 15}px`;
            string.style.transform = `scaleY(${1 + s * 0.25})`;
            string.style.opacity = 1 - (s * 0.2);
            container.appendChild(string);

            for (let i = 0; i < flagCount; i++) {
                const flag = document.createElement('div');
                flag.className = 'flag';
                const x = (i / (flagCount - 1)) * 100;
                const y = 80 * Math.sin((i / (flagCount - 1)) * Math.PI);
                flag.style.left = `${x}%`;
                flag.style.top = `${y}px`;
                flag.style.borderTopColor = colors[i % colors.length];
                flag.style.animationDelay = `${Math.random() * 2}s`;
                string.appendChild(flag);
            }
        }

        const leftStreamer = document.createElement('div');
        leftStreamer.className = 'streamer streamer-left';
        container.appendChild(leftStreamer);

        const rightStreamer = document.createElement('div');
        rightStreamer.className = 'streamer streamer-right';
        container.appendChild(rightStreamer);
    }

    lightCandleBtn.addEventListener('click', () => {
        const birthdayCake = document.getElementById('birthday-cake');
        const newPhotoSrc = litImage.querySelector('img').src;

        // Replace the cake with the new GIF/Photo
        birthdayCake.src = newPhotoSrc;
        birthdayCake.classList.add('reveal-zoom'); // Add a nice effect

        birthdayMsg.classList.remove('hidden');
        lightCandleBtn.classList.add('hidden');
    });

    const popBalloonsBtn = document.getElementById('pop-balloons-btn');
    popBalloonsBtn.addEventListener('click', () => {
        showScreen('balloons');
        initBalloons();
    });

    // --- Screen 4: Balloon Pop ---
    const balloonContainer = document.getElementById('balloon-container');
    const nextFromBalloons = document.getElementById('next-from-balloons');
    const balloonTexts = ["You", "are", "so", "sweet😘"];
    let balloonsPopped = 0;

    function initBalloons() {
        balloonContainer.innerHTML = '';
        balloonsPopped = 0;
        nextFromBalloons.classList.add('hidden');

        const threadData = [
            { rot: '-45deg', len: '254.5px' },
            { rot: '-18.4deg', len: '189.7px' },
            { rot: '18.4deg', len: '189.7px' },
            { rot: '45deg', len: '254.5px' }
        ];

        for (let i = 0; i < 4; i++) {
            const wrapper = document.createElement('div');
            wrapper.className = 'balloon-wrapper';

            const textEl = document.createElement('div');
            textEl.className = 'hidden-text';
            textEl.textContent = balloonTexts[i];

            const balloon = document.createElement('div');
            balloon.className = 'balloon stationary';
            balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 70%)`;
            balloon.style.animationDelay = `0s`;
            balloon.style.setProperty('--thread-rot', threadData[i].rot);
            balloon.style.setProperty('--thread-len', threadData[i].len);

            balloon.addEventListener('click', () => {
                if (!balloon.classList.contains('popped')) {
                    balloon.classList.add('popped');
                    textEl.classList.add('revealed');

                    balloonsPopped++;
                    if (balloonsPopped === 4) {
                        setTimeout(() => {
                            nextFromBalloons.classList.remove('hidden');
                        }, 500);
                        const knot = document.querySelector('.bunch-knot');
                        if (knot) knot.style.opacity = '0';
                    }
                }
            });

            wrapper.appendChild(textEl);
            wrapper.appendChild(balloon);
            balloonContainer.appendChild(wrapper);
        }

        const knot = document.createElement('div');
        knot.className = 'bunch-knot';
        balloonContainer.appendChild(knot);
    }

    nextFromBalloons.addEventListener('click', () => {
        document.getElementById('app').classList.remove('decorated');
        showScreen('moments');
        startGallery();
    });

    // --- Screen 5: Sweet Moments Gallery ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentMoment = 0;
    let galleryInterval;

    function startGallery() {
        clearInterval(galleryInterval);
        galleryInterval = setInterval(nextMoment, 5000);
    }

    function nextMoment() {
        galleryItems[currentMoment].classList.remove('active');
        currentMoment = (currentMoment + 1) % galleryItems.length;
        galleryItems[currentMoment].classList.add('active');
    }

    // Manual Swipe (simplified click to next)
    const gallery = document.getElementById('gallery');
    gallery.addEventListener('click', () => {
        nextMoment();
        clearInterval(galleryInterval);
        galleryInterval = setInterval(nextMoment, 5000);
    });

    const oneLastThingBtn = document.getElementById('one-last-thing-btn');
    oneLastThingBtn.addEventListener('click', () => {
        showScreen('final');
    });

    // --- Screen 6: Final Gift ---
    const giftBox = document.getElementById('gift-box');
    const finalNote = document.getElementById('final-note');
    const tapText = document.querySelector('.tap-text');

    giftBox.addEventListener('click', () => {
        giftBox.classList.add('hidden');
        tapText.classList.add('hidden');
        finalNote.classList.remove('hidden');
    });

    const replyBtn = document.getElementById('reply-btn');
    replyBtn.addEventListener('click', () => {
        // location.reload() reloads the page, which completely restarts the experience from the countdown screen
        location.reload();
    });
});
