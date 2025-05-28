// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Audio elements
    const vhsStartSound = createAudio('https://freesound.org/data/previews/103/103645_1087518-lq.mp3');
    const staticSound = createAudio('https://freesound.org/data/previews/67/67407_606178-lq.mp3', 0.2);
    const channelChangeSound = createAudio('https://freesound.org/data/previews/521/521275_5832380-lq.mp3');
    
    // Elements
    const enterButton = document.getElementById('enter-chaos');
    const mainContent = document.getElementById('main-content');
    const notebook = document.getElementById('menu-notebook');
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.section');
    
    // Add VHS noise
    addVHSNoise();
    
    // Enter button event
    enterButton.addEventListener('click', function() {
        // Play VHS start sound
        vhsStartSound.play();
        
        // Hide enter button
        this.parentElement.style.display = 'none';
        
        // Show main content with TV on effect
        mainContent.classList.remove('hidden');
        mainContent.style.animation = 'tvOn 1s';
        
        // Open notebook after delay
        setTimeout(() => {
            notebook.classList.add('open');
        }, 1000);
    });
    
    // Menu items click event
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Get section ID
            const sectionId = this.getAttribute('data-section');
            
            // Play channel change sound
            channelChangeSound.play();
            
            // Close notebook
            notebook.classList.remove('open');
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.add('hidden');
                section.style.animation = '';
            });
            
            // Show selected section with TV static transition
            setTimeout(() => {
                const selectedSection = document.getElementById(sectionId);
                if (selectedSection) {
                    selectedSection.classList.remove('hidden');
                    selectedSection.style.animation = 'tvStatic 0.5s';
                    
                    // Play static sound
                    staticSound.currentTime = 0;
                    staticSound.play();
                }
            }, 500);
        });
    });
    
    // Random glitch effect on page
    setInterval(randomGlitch, 3000);
    
    // Custom cursor trail
    document.addEventListener('mousemove', createCursorTrail);
});

// Create audio element with optional volume
function createAudio(src, volume = 0.5) {
    const audio = new Audio(src);
    audio.volume = volume;
    return audio;
}

// Add VHS noise overlay
function addVHSNoise() {
    const vhsOverlay = document.querySelector('.vhs-overlay');
    
    // Create canvas for dynamic noise
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '999';
    canvas.style.opacity = '0.05';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Animate noise
    function animateNoise() {
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const noise = Math.floor(Math.random() * 255);
            data[i] = noise;       // Red
            data[i + 1] = noise;   // Green
            data[i + 2] = noise;   // Blue
            data[i + 3] = Math.random() > 0.99 ? 255 : 0; // Alpha (sparse noise)
        }
        
        ctx.putImageData(imageData, 0, 0);
        requestAnimationFrame(animateNoise);
    }
    
    animateNoise();
    
    // Resize canvas on window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Random glitch effect on random elements
function randomGlitch() {
    const elements = [
        document.querySelector('h1.glitch'),
        ...document.querySelectorAll('h2'),
        ...document.querySelectorAll('.episode h3'),
        document.querySelector('.blink-text')
    ].filter(el => el); // Filter out null elements
    
    if (elements.length === 0) return;
    
    // Select random element
    const element = elements[Math.floor(Math.random() * elements.length)];
    
    // Apply glitch effect
    element.style.transform = `translateX(${Math.random() * 10 - 5}px)`;
    element.style.filter = `hue-rotate(${Math.random() * 360}deg) blur(${Math.random() * 2}px)`;
    
    // Remove glitch effect after short delay
    setTimeout(() => {
        element.style.transform = '';
        element.style.filter = '';
    }, 200);
}

// Create cursor trail effect
function createCursorTrail(e) {
    // Limit the rate of trail creation
    if (Math.random() > 0.1) return;
    
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.position = 'fixed';
    trail.style.width = '8px';
    trail.style.height = '8px';
    trail.style.borderRadius = '50%';
    trail.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    trail.style.left = `${e.clientX}px`;
    trail.style.top = `${e.clientY}px`;
    trail.style.pointerEvents = 'none';
    trail.style.zIndex = '998';
    trail.style.opacity = '0.7';
    trail.style.transition = 'transform 0.5s, opacity 0.5s';
    document.body.appendChild(trail);
    
    // Animate and remove
    setTimeout(() => {
        trail.style.transform = `scale(${Math.random() * 3}) translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px)`;
        trail.style.opacity = '0';
    }, 10);
    
    setTimeout(() => {
        document.body.removeChild(trail);
    }, 500);
}

// Add TV on animation
const style = document.createElement('style');
style.textContent = `
    @keyframes tvOn {
        0% {
            opacity: 0;
            transform: scale(0.8);
            filter: brightness(0);
        }
        20% {
            opacity: 1;
            transform: scale(1.05);
            filter: brightness(2) saturate(2);
        }
        40% {
            transform: scale(0.95);
            filter: brightness(0.5) saturate(1.5);
        }
        60% {
            transform: scale(1.02);
            filter: brightness(1.2) saturate(1.2);
        }
        80% {
            transform: scale(0.98);
            filter: brightness(0.9) saturate(1.1);
        }
        100% {
            transform: scale(1);
            filter: brightness(1) saturate(1);
        }
    }
    
    @keyframes tvStatic {
        0%, 100% {
            opacity: 1;
            transform: scale(1);
            filter: brightness(1) saturate(1);
        }
        10%, 30%, 50%, 70%, 90% {
            opacity: 0.8;
            transform: scale(1.01) skew(0.5deg, 0.5deg);
            filter: brightness(1.2) saturate(1.5) hue-rotate(20deg);
        }
        20%, 40%, 60%, 80% {
            opacity: 0.9;
            transform: scale(0.99) skew(-0.5deg, -0.5deg);
            filter: brightness(0.8) saturate(0.8) hue-rotate(-20deg);
        }
    }
`;
document.head.appendChild(style);

// Preload images
function preloadImages() {
    const images = ['logo.jpg', 'banner.png', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png'];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages(); 